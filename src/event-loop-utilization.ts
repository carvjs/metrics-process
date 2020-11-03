import { performance } from 'perf_hooks'

import { Telemetry } from '@carv/telemetry'

import { ProcessEventLoopUtilizationOptions } from './types'

export const isEventLoopUtilizationSupported = Boolean(performance.eventLoopUtilization)

export function eventLoopUtilization(
  telemetry: Telemetry,
  {
    prefix = 'process',
    name = 'event_loop_utilization',
    description = `ELU is similar to CPU utilization, except that it only measures event loop statistics and not CPU usage. It represents the percentage of time the event loop has spent outside the event loop's event provider (e.g. epoll_wait).`,
    labels,
  }: ProcessEventLoopUtilizationOptions,
  done: () => void,
) {
  if (!isEventLoopUtilizationSupported) {
    telemetry.log.warn(
      '[%s] Monitoring the event loop utilization is not supported on Node.js %s',
      telemetry.makeName(prefix, name),
      process.version,
    )
    done()
    return
  }

  const { eventLoopUtilization } = performance

  let last = eventLoopUtilization()

  telemetry.createValueObserver({ prefix, name, description, labels }, () => {
    const current = eventLoopUtilization()

    const { utilization } = eventLoopUtilization(last, current)

    last = current

    return utilization
  })

  done()
}
