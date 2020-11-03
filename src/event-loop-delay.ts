import { monitorEventLoopDelay } from 'perf_hooks'

import { Telemetry } from '@carv/telemetry'

import { roundTo } from '@carv/stdlib'
import { nanosToSeconds } from '@carv/time'

import { ProcessEventLoopDelayOptions } from './types'

export const isEventLoopDelaySupported = Boolean(monitorEventLoopDelay)

export function eventLoopDelay(
  telemetry: Telemetry,
  {
    prefix = 'process',
    name = 'event_loop_delay',
    description = 'Approximate mean event loop delay in seconds.',
    labels,
    // The sampling rate in milliseconds
    resolution = 10,
    percentiles = [50, 75, 90, 95, 99],
  }: ProcessEventLoopDelayOptions,
  done: () => void,
) {
  if (!isEventLoopDelaySupported) {
    telemetry.log.warn(
      '[%s] Monitoring the event loop delay is not supported on Node.js %s',
      telemetry.makeName(prefix, name),
      process.version,
    )
    done()
    return
  }

  const delayMinimum = telemetry.createValueRecorder({
    name: telemetry.makeName(prefix, name, 'min_seconds'),
    description: 'The minimum recorded event loop delay.',
  })

  const delayMaximum = telemetry.createValueRecorder({
    name: telemetry.makeName(prefix, name, 'max_seconds'),
    description: 'The maximum recorded event loop delay.',
  })

  const delayMean = telemetry.createValueRecorder({
    name: telemetry.makeName(prefix, name, 'mean_seconds'),
    description,
  })

  const delayStddev = telemetry.createValueRecorder({
    name: telemetry.makeName(prefix, name, 'stddev_seconds'),
    description: 'The standard deviation recorded event loop delay.',
  })

  const quantiles = telemetry.createValueRecorder({
    name: telemetry.makeName(prefix, name, `seconds`),
    description: `The recorded event loop delay quantiles.`,
  })

  const metrics = percentiles.map(percentile =>
    quantiles.bind({ quantile: roundTo(percentile / 100, 3).toString() }),
  )

  const histogram = monitorEventLoopDelay({ resolution })

  const resolutionNanos = resolution * 1e6

  const percentileObservation = (percentile: number, index: number) =>
    metrics[index].observation(
      eventLoopDelayInSeconds(histogram.percentile(percentile), resolutionNanos),
    )

  telemetry.createBatchObserver({ name: prefix + name, labels }, observer => {
    if (
      histogram.min <= histogram.max &&
      !Number.isNaN(histogram.mean) &&
      !Number.isNaN(histogram.stddev)
    ) {
      observer.observe([
        ...percentiles.map(percentileObservation),
        delayMinimum.observation(eventLoopDelayInSeconds(histogram.min, resolutionNanos)),
        delayMaximum.observation(eventLoopDelayInSeconds(histogram.max, resolutionNanos)),
        delayMean.observation(eventLoopDelayInSeconds(histogram.mean, resolutionNanos)),
        delayStddev.observation(eventLoopDelayInSeconds(histogram.stddev, resolutionNanos)),
      ])
    }

    histogram.reset()
  })

  histogram.enable()

  telemetry.onClose((_instance, next) => {
    histogram.disable()
    next()
  })

  done()
}

function eventLoopDelayInSeconds(value: number, resolutionNanos: number) {
  return nanosToSeconds(Math.max(0, value - resolutionNanos))
}
