import { Telemetry } from '@carv/telemetry'

import { ProcessOptions, ProcessCommonOptions } from './types'

import { processCpuUsage } from './cpu-usage'
import { processEventLoopDelay, isMonitorEventLoopDelaySupported } from './event-loop-delay'
import {
  isEventLoopUtilizationSupported,
  processEventLoopUtilization,
} from './event-loop-utilization'
import { processGcDuration } from './gc'
import { processHeapSpace } from './heap-space'
import { processMemoryUsage } from './memory-usage'
import { processStartTime } from './start-time'
import { processUptime } from './uptime'
import { processVersion } from './version'

export function processMetrics(
  telemetry: Telemetry,
  {
    prefix = '',
    name = 'process',
    labels,
    version = true,
    startTime = true,
    uptime = true,
    cpu = true,
    memory = true,
    heapSpace = true,
    gc = true,
    eventLoopDelay = isMonitorEventLoopDelaySupported,
    eventLoopUtilization = isEventLoopUtilizationSupported,
  }: ProcessOptions,
  done: () => void,
) {
  const namePrefix = telemetry.makeName(prefix, name)

  const mergeOptions = <T extends ProcessCommonOptions>(config: true | undefined | T): T => {
    const { prefix, ...options } = !config || config === true ? ({} as T) : config

    return {
      ...options,
      prefix: telemetry.makeName(namePrefix, prefix),
      labels: { ...labels, ...options.labels },
    } as T
  }

  if (version !== false) {
    telemetry.use(processVersion, mergeOptions(version))
  }

  if (startTime !== false) {
    telemetry.use(processStartTime, mergeOptions(startTime))
  }

  if (uptime !== false) {
    telemetry.use(processUptime, mergeOptions(uptime))
  }

  if (cpu !== false) {
    telemetry.use(processCpuUsage, mergeOptions(cpu))
  }

  if (memory !== false) {
    telemetry.use(processMemoryUsage, mergeOptions(memory))
  }

  if (heapSpace !== false) {
    telemetry.use(processHeapSpace, mergeOptions(heapSpace))
  }

  if (gc !== false) {
    telemetry.use(processGcDuration, mergeOptions(gc))
  }

  if (eventLoopUtilization !== false) {
    telemetry.use(processEventLoopUtilization, mergeOptions(eventLoopUtilization))
  }

  if (eventLoopDelay !== false) {
    telemetry.use(processEventLoopDelay, mergeOptions(eventLoopDelay))
  }

  done()
}
