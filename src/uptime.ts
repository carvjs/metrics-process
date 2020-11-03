import { Telemetry } from '@carv/telemetry'

import { ProcessUptimeOptions } from './types'

export function uptime(
  telemetry: Telemetry,
  {
    prefix = 'process',
    name = 'uptime_seconds',
    description = 'The number of seconds the current Node.js process has been running.',
    labels,
  }: ProcessUptimeOptions,
  done: () => void,
) {
  telemetry.createValueObserver({ prefix, name, description, labels }, () => process.uptime())

  done()
}
