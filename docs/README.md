> [Globals](undefined) / "index"

# Module: "index"

## Index

### Interfaces

* [ProcessCommonOptions](interfaces/_index_.processcommonoptions.md)
* [ProcessCpuUsageOptions](interfaces/_index_.processcpuusageoptions.md)
* [ProcessEventLoopDelayOptions](interfaces/_index_.processeventloopdelayoptions.md)
* [ProcessEventLoopUtilizationOptions](interfaces/_index_.processeventlooputilizationoptions.md)
* [ProcessGcDurationOptions](interfaces/_index_.processgcdurationoptions.md)
* [ProcessHeapSpaceOptions](interfaces/_index_.processheapspaceoptions.md)
* [ProcessMemoryUsageOptions](interfaces/_index_.processmemoryusageoptions.md)
* [ProcessOptions](interfaces/_index_.processoptions.md)
* [ProcessStartTimeOptions](interfaces/_index_.processstarttimeoptions.md)
* [ProcessUptimeOptions](interfaces/_index_.processuptimeoptions.md)
* [ProcessVersionOptions](interfaces/_index_.processversionoptions.md)

### Variables

* [isEventLoopDelaySupported](README.md#iseventloopdelaysupported)
* [isEventLoopUtilizationSupported](README.md#iseventlooputilizationsupported)

### Functions

* [cpuUsage](README.md#cpuusage)
* [eventLoopDelay](README.md#eventloopdelay)
* [eventLoopUtilization](README.md#eventlooputilization)
* [gcDuration](README.md#gcduration)
* [heapSpace](README.md#heapspace)
* [memoryUsage](README.md#memoryusage)
* [metrics](README.md#metrics)
* [startTime](README.md#starttime)
* [uptime](README.md#uptime)
* [version](README.md#version)

## Variables

### isEventLoopDelaySupported

• `Const` **isEventLoopDelaySupported**: boolean = Boolean(monitorEventLoopDelay)

*Defined in [src/event-loop-delay.ts:10](https://github.com/carvjs/metrics-process/blob/main/src/event-loop-delay.ts#L10)*

___

### isEventLoopUtilizationSupported

• `Const` **isEventLoopUtilizationSupported**: boolean = Boolean(performance.eventLoopUtilization)

*Defined in [src/event-loop-utilization.ts:7](https://github.com/carvjs/metrics-process/blob/main/src/event-loop-utilization.ts#L7)*

## Functions

### cpuUsage

▸ **cpuUsage**(`telemetry`: Telemetry, `__namedParameters`: { description: string = "process CPU time spent in seconds (batch observer)"; labels: undefined \| { [key:string]: string;  } ; name: string = "cpu"; prefix: string = "process" }, `done`: () => void): void

*Defined in [src/cpu-usage.ts:6](https://github.com/carvjs/metrics-process/blob/main/src/cpu-usage.ts#L6)*

#### Parameters:

Name | Type |
------ | ------ |
`telemetry` | Telemetry |
`__namedParameters` | { description: string = "process CPU time spent in seconds (batch observer)"; labels: undefined \| { [key:string]: string;  } ; name: string = "cpu"; prefix: string = "process" } |
`done` | () => void |

**Returns:** void

___

### eventLoopDelay

▸ **eventLoopDelay**(`telemetry`: Telemetry, `__namedParameters`: { description: string = "Approximate mean event loop delay in seconds."; labels: undefined \| { [key:string]: string;  } ; name: string = "event\_loop\_delay"; percentiles: number[] = [50, 75, 90, 95, 99]; prefix: string = "process"; resolution: number = 10 }, `done`: () => void): void

*Defined in [src/event-loop-delay.ts:12](https://github.com/carvjs/metrics-process/blob/main/src/event-loop-delay.ts#L12)*

#### Parameters:

Name | Type |
------ | ------ |
`telemetry` | Telemetry |
`__namedParameters` | { description: string = "Approximate mean event loop delay in seconds."; labels: undefined \| { [key:string]: string;  } ; name: string = "event\_loop\_delay"; percentiles: number[] = [50, 75, 90, 95, 99]; prefix: string = "process"; resolution: number = 10 } |
`done` | () => void |

**Returns:** void

___

### eventLoopUtilization

▸ **eventLoopUtilization**(`telemetry`: Telemetry, `__namedParameters`: { description: string = \`ELU is similar to CPU utilization, except that it only measures event loop statistics and not CPU usage. It represents the percentage of time the event loop has spent outside the event loop's event provider (e.g. epoll\_wait).\`; labels: undefined \| { [key:string]: string;  } ; name: string = "event\_loop\_utilization"; prefix: string = "process" }, `done`: () => void): void

*Defined in [src/event-loop-utilization.ts:9](https://github.com/carvjs/metrics-process/blob/main/src/event-loop-utilization.ts#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`telemetry` | Telemetry |
`__namedParameters` | { description: string = \`ELU is similar to CPU utilization, except that it only measures event loop statistics and not CPU usage. It represents the percentage of time the event loop has spent outside the event loop's event provider (e.g. epoll\_wait).\`; labels: undefined \| { [key:string]: string;  } ; name: string = "event\_loop\_utilization"; prefix: string = "process" } |
`done` | () => void |

**Returns:** void

___

### gcDuration

▸ **gcDuration**(`telemetry`: Telemetry, `__namedParameters`: { description: string = "Garbage collection duration by kind, one of major, minor, incremental or weakcb."; labels: undefined \| { [key:string]: string;  } ; name: string = "gc\_duration\_seconds"; prefix: string = "process"; boundaries: { count: number = 15; start: number = 0.0001 }  }, `done`: () => void): void

*Defined in [src/gc.ts:17](https://github.com/carvjs/metrics-process/blob/main/src/gc.ts#L17)*

#### Parameters:

Name | Type |
------ | ------ |
`telemetry` | Telemetry |
`__namedParameters` | { description: string = "Garbage collection duration by kind, one of major, minor, incremental or weakcb."; labels: undefined \| { [key:string]: string;  } ; name: string = "gc\_duration\_seconds"; prefix: string = "process"; boundaries: { count: number = 15; start: number = 0.0001 }  } |
`done` | () => void |

**Returns:** void

___

### heapSpace

▸ **heapSpace**(`telemetry`: Telemetry, `__namedParameters`: { description: string = "Statistics about the V8 heap spaces (batch observer)"; labels: undefined \| { [key:string]: string;  } ; name: string = "heap\_space\_size"; prefix: string = "process" }, `done`: () => void): void

*Defined in [src/heap-space.ts:7](https://github.com/carvjs/metrics-process/blob/main/src/heap-space.ts#L7)*

#### Parameters:

Name | Type |
------ | ------ |
`telemetry` | Telemetry |
`__namedParameters` | { description: string = "Statistics about the V8 heap spaces (batch observer)"; labels: undefined \| { [key:string]: string;  } ; name: string = "heap\_space\_size"; prefix: string = "process" } |
`done` | () => void |

**Returns:** void

___

### memoryUsage

▸ **memoryUsage**(`telemetry`: Telemetry, `__namedParameters`: { description: string = "Memory usage of the Node.js process (batch observer)"; labels: undefined \| { [key:string]: string;  } ; name: string = ""; prefix: string = "process" }, `done`: () => void): void

*Defined in [src/memory-usage.ts:5](https://github.com/carvjs/metrics-process/blob/main/src/memory-usage.ts#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`telemetry` | Telemetry |
`__namedParameters` | { description: string = "Memory usage of the Node.js process (batch observer)"; labels: undefined \| { [key:string]: string;  } ; name: string = ""; prefix: string = "process" } |
`done` | () => void |

**Returns:** void

___

### metrics

▸ **metrics**(`telemetry`: Telemetry, `__namedParameters`: { cpu: false \| true \| [ProcessCpuUsageOptions](interfaces/_index_.processcpuusageoptions.md) = true; eventLoopDelay: false \| true \| [ProcessEventLoopDelayOptions](interfaces/_index_.processeventloopdelayoptions.md) = isEventLoopDelaySupported; eventLoopUtilization: false \| true \| [ProcessEventLoopUtilizationOptions](interfaces/_index_.processeventlooputilizationoptions.md) = isEventLoopUtilizationSupported; gc: false \| true \| [ProcessGcDurationOptions](interfaces/_index_.processgcdurationoptions.md) = true; heapSpace: false \| true \| [ProcessHeapSpaceOptions](interfaces/_index_.processheapspaceoptions.md) = true; labels: undefined \| { [key:string]: string;  } ; memory: false \| true \| [ProcessMemoryUsageOptions](interfaces/_index_.processmemoryusageoptions.md) = true; name: string = "process"; prefix: string = ""; startTime: false \| true \| [ProcessStartTimeOptions](interfaces/_index_.processstarttimeoptions.md) = true; uptime: false \| true \| [ProcessUptimeOptions](interfaces/_index_.processuptimeoptions.md) = true; version: false \| true \| [ProcessVersionOptions](interfaces/_index_.processversionoptions.md) = true }, `done`: () => void): void

*Defined in [src/process.ts:21](https://github.com/carvjs/metrics-process/blob/main/src/process.ts#L21)*

#### Parameters:

Name | Type |
------ | ------ |
`telemetry` | Telemetry |
`__namedParameters` | { cpu: false \| true \| [ProcessCpuUsageOptions](interfaces/_index_.processcpuusageoptions.md) = true; eventLoopDelay: false \| true \| [ProcessEventLoopDelayOptions](interfaces/_index_.processeventloopdelayoptions.md) = isEventLoopDelaySupported; eventLoopUtilization: false \| true \| [ProcessEventLoopUtilizationOptions](interfaces/_index_.processeventlooputilizationoptions.md) = isEventLoopUtilizationSupported; gc: false \| true \| [ProcessGcDurationOptions](interfaces/_index_.processgcdurationoptions.md) = true; heapSpace: false \| true \| [ProcessHeapSpaceOptions](interfaces/_index_.processheapspaceoptions.md) = true; labels: undefined \| { [key:string]: string;  } ; memory: false \| true \| [ProcessMemoryUsageOptions](interfaces/_index_.processmemoryusageoptions.md) = true; name: string = "process"; prefix: string = ""; startTime: false \| true \| [ProcessStartTimeOptions](interfaces/_index_.processstarttimeoptions.md) = true; uptime: false \| true \| [ProcessUptimeOptions](interfaces/_index_.processuptimeoptions.md) = true; version: false \| true \| [ProcessVersionOptions](interfaces/_index_.processversionoptions.md) = true } |
`done` | () => void |

**Returns:** void

___

### startTime

▸ **startTime**(`telemetry`: Telemetry, `__namedParameters`: { description: string = "Start time of the process since unix epoch in seconds."; labels: undefined \| { [key:string]: string;  } ; name: string = "start\_time\_seconds"; prefix: string = "process" }, `done`: () => void): void

*Defined in [src/start-time.ts:8](https://github.com/carvjs/metrics-process/blob/main/src/start-time.ts#L8)*

#### Parameters:

Name | Type |
------ | ------ |
`telemetry` | Telemetry |
`__namedParameters` | { description: string = "Start time of the process since unix epoch in seconds."; labels: undefined \| { [key:string]: string;  } ; name: string = "start\_time\_seconds"; prefix: string = "process" } |
`done` | () => void |

**Returns:** void

___

### uptime

▸ **uptime**(`telemetry`: Telemetry, `__namedParameters`: { description: string = "The number of seconds the current Node.js process has been running."; labels: undefined \| { [key:string]: string;  } ; name: string = "uptime\_seconds"; prefix: string = "process" }, `done`: () => void): void

*Defined in [src/uptime.ts:5](https://github.com/carvjs/metrics-process/blob/main/src/uptime.ts#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`telemetry` | Telemetry |
`__namedParameters` | { description: string = "The number of seconds the current Node.js process has been running."; labels: undefined \| { [key:string]: string;  } ; name: string = "uptime\_seconds"; prefix: string = "process" } |
`done` | () => void |

**Returns:** void

___

### version

▸ **version**(`telemetry`: Telemetry, `__namedParameters`: { description: string = "Node.js version info."; labels: undefined \| { [key:string]: string;  } ; name: string = "version\_info"; prefix: string = "process" }, `done`: () => void): void

*Defined in [src/version.ts:5](https://github.com/carvjs/metrics-process/blob/main/src/version.ts#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`telemetry` | Telemetry |
`__namedParameters` | { description: string = "Node.js version info."; labels: undefined \| { [key:string]: string;  } ; name: string = "version\_info"; prefix: string = "process" } |
`done` | () => void |

**Returns:** void
