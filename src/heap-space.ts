import v8 from 'v8'

import { Telemetry } from '@carv/telemetry'

import { ProcessHeapSpaceOptions } from './types'

export function processHeapSpace(
  telemetry: Telemetry,
  {
    prefix = 'process_',
    name = 'heap_space_size',
    description = 'Statistics about the V8 heap spaces (batch observer)',
    labels,
  }: ProcessHeapSpaceOptions,
  done: () => void,
) {
  const namePrefix = prefix + name + '_'

  const total = telemetry.createUpDownCounter({
    name: namePrefix + 'total_bytes',
    description: 'Process heap space size total from Node.js in bytes.',
  })

  const used = telemetry.createUpDownCounter({
    name: namePrefix + 'used_bytes',
    description: 'Process heap space size used from Node.js in bytes.',
  })

  const available = telemetry.createUpDownCounter({
    name: namePrefix + 'available_bytes',
    description: 'Process heap space size available from Node.js in bytes.',
  })

  telemetry.createBatchObserver({ name, description, labels }, observer => {
    for (const space of v8.getHeapSpaceStatistics()) {
      observer.observe({ space: clean(space.space_name) }, [
        total.observation(space.space_size),
        used.observation(space.space_used_size),
        available.observation(space.space_available_size),
      ])
    }
  })

  done()
}

function clean(name: string) {
  return name.slice(0, name.indexOf('_space'))
}
