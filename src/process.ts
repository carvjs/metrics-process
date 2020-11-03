import { Telemetry } from '@carv/telemetry'

import { ProcessOptions, ProcessCommonOptions } from './types'

import { cpuUsage as processCpuUsage } from './cpu-usage'
import {
  isEventLoopDelaySupported,
  eventLoopDelay as processEventLoopDelay,
} from './event-loop-delay'
import {
  isEventLoopUtilizationSupported,
  eventLoopUtilization as processEventLoopUtilization,
} from './event-loop-utilization'
import { gcDuration as processGcDuration } from './gc'
import { heapSpace as processHeapSpace } from './heap-space'
import { memoryUsage as processMemoryUsage } from './memory-usage'
import { startTime as processStartTime } from './start-time'
import { uptime as processUptime } from './uptime'
import { version as processVersion } from './version'

export function metrics(
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
    eventLoopDelay = isEventLoopDelaySupported,
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
