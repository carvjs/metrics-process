import { Telemetry } from '@carv/telemetry'

import { millisToSeconds } from '@carv/time'

import { ProcessStartTimeOptions } from './types'

export function processStartTime(
  telemetry: Telemetry,
  {
    prefix = 'process_',
    name = 'start_time_seconds',
    description = 'Start time of the process since unix epoch in seconds.',
    labels,
  }: ProcessStartTimeOptions,
  done: () => void,
) {
  const startInSeconds = Math.round(millisToSeconds(Date.now()) - process.uptime())

  telemetry.createValueObserver({ name: prefix + name, description, labels }, () => startInSeconds)

  done()
}
