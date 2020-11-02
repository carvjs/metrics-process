import { BoundariesConfig, Labels } from '@carv/telemetry'

export interface ProcessCommonOptions {
  prefix?: string
  name?: string
  description?: string
  labels?: Labels
}

export interface ProcessCpuUsageOptions extends ProcessCommonOptions {}

export interface ProcessEventLoopUtilizationOptions extends ProcessCommonOptions {}

export interface ProcessEventLoopDelayOptions extends ProcessCommonOptions {
  /**
   * The sampling rate in milliseconds (default: `10`)
   */
  resolution?: number

  /**
   * (default: `[50, 75, 90, 95, 99]`)
   */
  percentiles?: number[]
}

export interface ProcessGcDurationOptions extends ProcessCommonOptions {
  /**
   * (default: `{ start: 0.0001, count: 15 }` => `[0.0001, 0.0002, 0.0004, 0.0008, 0.0016, 0.0032, 0.0064, 0.0128, 0.0256, 0.0512, 0.1024, 0.2048, 0.4096, 0.8192, 1.6384]`)
   */
  boundaries?: BoundariesConfig
}

export interface ProcessHeapSpaceOptions extends ProcessCommonOptions {}

export interface ProcessMemoryUsageOptions extends ProcessCommonOptions {}

export interface ProcessStartTimeOptions extends ProcessCommonOptions {}

export interface ProcessUptimeOptions extends ProcessCommonOptions {}

export interface ProcessVersionOptions extends ProcessCommonOptions {}

export interface ProcessOptions {
  prefix?: string
  name?: string
  labels?: Labels

  cpu?: boolean | ProcessCpuUsageOptions
  eventLoopUtilization?: boolean | ProcessEventLoopUtilizationOptions
  eventLoopDelay?: boolean | ProcessEventLoopDelayOptions
  gc?: boolean | ProcessGcDurationOptions
  heapSpace?: boolean | ProcessHeapSpaceOptions
  memory?: boolean | ProcessMemoryUsageOptions
  startTime?: boolean | ProcessStartTimeOptions
  uptime?: boolean | ProcessUptimeOptions
  version?: boolean | ProcessVersionOptions
}
