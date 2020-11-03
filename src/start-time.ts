import { performance } from 'perf_hooks'
import { Telemetry } from '@carv/telemetry'

import { millisToSeconds } from '@carv/time'

import { ProcessStartTimeOptions } from './types'

export function startTime(
  telemetry: Telemetry,
  {
    prefix = 'process',
    name = 'start_time_seconds',
    description = 'Start time of the process since unix epoch in seconds.',
    labels,
  }: ProcessStartTimeOptions,
  done: () => void,
) {
  telemetry.createValueObserver({ prefix, name, description, labels }, () =>
    millisToSeconds(performance.timeOrigin),
  )

  done()
}
