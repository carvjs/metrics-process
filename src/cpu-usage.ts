import { Telemetry } from '@carv/telemetry'
import { microsToSeconds } from '@carv/time'

import { ProcessCpuUsageOptions } from './types'

export function cpuUsage(
  telemetry: Telemetry,
  {
    prefix = 'process',
    name = 'cpu',
    description = 'process CPU time spent in seconds (batch observer)',
    labels,
  }: ProcessCpuUsageOptions,
  done: () => void,
) {
  const cpuUserUsageCounter = telemetry.createSumObserver({
    name: telemetry.makeName(prefix, name, 'user_seconds_total'),
    description: 'Total user CPU time spent in seconds.',
  })

  const cpuSystemUsageCounter = telemetry.createSumObserver({
    name: telemetry.makeName(prefix, name, 'system_seconds_total'),
    description: 'Total system CPU time spent in seconds.',
  })

  const cpuUsageCounter = telemetry.createSumObserver({
    name: telemetry.makeName(prefix, name, 'seconds_total'),
    description: 'Total user and system CPU time spent in seconds.',
  })

  let lastCpuUsage = process.cpuUsage()

  telemetry.createBatchObserver({ name, description, labels }, () => {
    const cpuUsage = process.cpuUsage()

    const userUsageMicros = cpuUsage.user - lastCpuUsage.user
    const systemUsageMicros = cpuUsage.system - lastCpuUsage.system

    lastCpuUsage = cpuUsage

    return [
      cpuUserUsageCounter.observation(microsToSeconds(userUsageMicros)),
      cpuSystemUsageCounter.observation(microsToSeconds(systemUsageMicros)),
      cpuUsageCounter.observation(microsToSeconds(userUsageMicros + systemUsageMicros)),
    ]
  })

  done()
}
