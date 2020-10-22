import { monitorEventLoopDelay } from 'perf_hooks'

import { Telemetry } from '@carv/telemetry'

import { roundTo } from '@carv/stdlib'
import { nanosToSeconds } from '@carv/time'

import { ProcessEventLoopDelayOptions } from './types'

export function processEventLoopDelay(
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
  if (!monitorEventLoopDelay) {
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
    metrics[index].observation(eventLoopDelay(histogram.percentile(percentile), resolutionNanos))

  telemetry.createBatchObserver({ name: prefix + name, labels }, observer => {
    if (
      histogram.min <= histogram.max &&
      !Number.isNaN(histogram.mean) &&
      !Number.isNaN(histogram.stddev)
    ) {
      observer.observe([
        ...percentiles.map(percentileObservation),
        delayMinimum.observation(eventLoopDelay(histogram.min, resolutionNanos)),
        delayMaximum.observation(eventLoopDelay(histogram.max, resolutionNanos)),
        delayMean.observation(eventLoopDelay(histogram.mean, resolutionNanos)),
        delayStddev.observation(eventLoopDelay(histogram.stddev, resolutionNanos)),
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

function eventLoopDelay(value: number, resolutionNanos: number) {
  return nanosToSeconds(Math.max(0, value - resolutionNanos))
}
