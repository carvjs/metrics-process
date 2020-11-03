import { PerformanceObserver, constants } from 'perf_hooks'

import { Telemetry, ValueRecorderMetric } from '@carv/telemetry'

import { millisToSeconds } from '@carv/time'

import { ProcessGcDurationOptions } from './types'

type Kind = 'major' | 'minor' | 'incremental' | 'weakcb'

const kinds: Kind[] = []
kinds[constants.NODE_PERFORMANCE_GC_MAJOR] = 'major'
kinds[constants.NODE_PERFORMANCE_GC_MINOR] = 'minor'
kinds[constants.NODE_PERFORMANCE_GC_INCREMENTAL] = 'incremental'
kinds[constants.NODE_PERFORMANCE_GC_WEAKCB] = 'weakcb'

export function gcDuration(
  telemetry: Telemetry,
  {
    prefix = 'process',
    name = 'gc_duration_seconds',
    description = 'Garbage collection duration by kind, one of major, minor, incremental or weakcb.',
    labels,
    // [0.0001, 0.0002, 0.0004, 0.0008, 0.0016, 0.0032, 0.0064, 0.0128, 0.0256, 0.0512, 0.1024, 0.2048, 0.4096, 0.8192, 1.6384]
    boundaries = { start: 0.0001, count: 15 },
  }: ProcessGcDurationOptions,
  done: () => void,
) {
  const instruments: Record<Kind, ValueRecorderMetric | null> = {
    major: null,
    minor: null,
    incremental: null,
    weakcb: null,
  }

  const metric = telemetry.createValueRecorder({
    prefix,
    name,
    description,
    labels,
    boundaries,
  })

  const observer = new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      const kind = kinds[entry.kind as number]

      if (kind) {
        const instrument = instruments[kind] || (instruments[kind] = metric.bind({ kind }))

        instrument.update(millisToSeconds(entry.duration))
      }
    }
  })

  observer.observe({
    entryTypes: ['gc'],
    // We do not expect too many gc events per second, so we do not use buffering
    buffered: false,
  })

  telemetry.onClose((_instance, done) => {
    observer.disconnect()
    done()
  })

  done()
}
