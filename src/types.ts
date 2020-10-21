import { BoundariesConfig } from '@carv/telemetry'

export type Labels = Record<string, string>

export interface ProcessCommonOptions {
  prefix?: string
  name?: string
  description?: string
  labels?: Labels
}

export interface ProcessCpuUsageOptions extends ProcessCommonOptions {}

export interface ProcessEventLoopDelayOptions extends ProcessCommonOptions {
  /**
   * The sampling rate in milliseconds
   */
  resolution?: number

  percentiles?: number[]
}

export interface ProcessGcDurationOptions extends ProcessCommonOptions {
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
  eventLoopDelay?: boolean | ProcessEventLoopDelayOptions
  gc?: boolean | ProcessGcDurationOptions
  heapSpace?: boolean | ProcessHeapSpaceOptions
  memory?: boolean | ProcessMemoryUsageOptions
  startTime?: boolean | ProcessStartTimeOptions
  uptime?: boolean | ProcessUptimeOptions
  version?: boolean | ProcessVersionOptions
}
