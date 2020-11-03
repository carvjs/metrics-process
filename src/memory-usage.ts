import { Telemetry } from '@carv/telemetry'

import { ProcessMemoryUsageOptions } from './types'

export function memoryUsage(
  telemetry: Telemetry,
  {
    prefix = 'process',
    name = '',
    description = 'Memory usage of the Node.js process (batch observer)',
    labels,
  }: ProcessMemoryUsageOptions,
  done: () => void,
) {
  const heapTotal = telemetry.createUpDownCounter({
    name: telemetry.makeName(prefix, name, 'heap_size_total_bytes'),
    description: 'Process heap size from Node.js in bytes.',
  })

  const heapUsed = telemetry.createUpDownCounter({
    name: telemetry.makeName(prefix, name, 'heap_size_used_bytes'),
    description: 'Process heap size used from Node.js in bytes.',
  })

  const external = telemetry.createUpDownCounter({
    name: telemetry.makeName(prefix, name, 'memory_external_bytes'),
    description:
      'Node.js external memory size in bytes (refers to the memory usage of C++ objects bound to JavaScript objects managed by V8).',
  })

  const rss = telemetry.createUpDownCounter({
    name: telemetry.makeName(prefix, name, 'memory_rss_bytes'),
    description:
      'Node.js rss (Resident Set Size) memory size in bytes - the amount of space occupied in the main memory device (that is a subset of the total allocated memory) for the process, including all C++ and JavaScript objects and code.',
  })

  const arrayBuffers = telemetry.createUpDownCounter({
    name: telemetry.makeName(prefix, name, 'array_buffers_bytes'),
    description:
      'Node.js memory allocated for ArrayBuffers and SharedArrayBuffers, including all Node.js Buffers, in bytes. This is also included in the external value. When Node.js is used as an embedded library, this value may be 0 because allocations for ArrayBuffers may not be tracked in that case.',
  })

  telemetry.createBatchObserver(
    { name: telemetry.makeName(prefix, name, 'memory_usage'), description, labels },
    () => {
      const memoryUsage = safeMemoryUsage()

      return (
        memoryUsage && [
          heapTotal.observation(memoryUsage.heapTotal),
          heapUsed.observation(memoryUsage.heapUsed),
          external.observation(memoryUsage.external),
          rss.observation(memoryUsage.rss),
          arrayBuffers.observation(memoryUsage.arrayBuffers || 0),
        ]
      )
    },
  )

  done()
}

// Note: process.memoryUsage() can throw on some platforms, see https://github.com/siimon/prom-client/issues/67
function safeMemoryUsage() {
  try {
    return process.memoryUsage()
  } catch {
    return null
  }
}
