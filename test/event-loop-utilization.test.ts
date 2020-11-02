/**
 * @jest-environment node
 */
import { promisify } from 'util'
import { performance } from 'perf_hooks'

import { Telemetry, TestLogger } from '@carv/telemetry'

import { processEventLoopUtilization, isEventLoopUtilizationSupported } from '../src'

jest.useFakeTimers()

const nextTick = promisify(setImmediate)

let telemetry: Telemetry

beforeEach(() => {
  telemetry = new Telemetry({
    logger: new TestLogger(),
  })
})

afterEach(() => telemetry.shutdown())

if (isEventLoopUtilizationSupported) {
  test('processEventLoopUtilization', async () => {
    telemetry.use(processEventLoopUtilization)

    await telemetry.ready()

    // Do something
    const finishedTimestamp = Date.now() + 23
    while (finishedTimestamp > Date.now()) {
      const endTimestamp = performance.now() + Math.random()
      while (endTimestamp > performance.now()) {}
      await nextTick()
    }

    const metrics = await telemetry.collect()

    expect(metrics).toMatch(
      '# HELP process_event_loop_utilization ELU is similar to CPU utilization, except that it only measures event loop statistics and not CPU usage.',
    )
    expect(metrics).toMatch('# TYPE process_event_loop_utilization gauge')
    expect(metrics).toMatch(/^process_event_loop_utilization \d+(?:\.\d+)? \d{13}$/m)
  })
} else {
  test('processEventLoopUtilization', async () => {
    telemetry.use(processEventLoopUtilization)

    telemetry.log.warn = jest.fn()

    await telemetry.ready()

    expect(telemetry.log.warn).toHaveBeenCalledWith(
      '[%s] Monitoring the event loop utilization is not supported on Node.js %s',
      'process_event_loop_utilization',
      process.version,
    )
  })
}
