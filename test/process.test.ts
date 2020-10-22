/**
 * @jest-environment node
 */
import { promisify } from 'util'
import { performance } from 'perf_hooks'

import { Telemetry, TestLogger } from '@carv/telemetry'

import atLeastNode from 'at-least-node'

import processMetrics from '../src'

jest.useFakeTimers()

const nextTick = promisify(setImmediate)

let telemetry: Telemetry

beforeEach(() => {
  telemetry = new Telemetry({
    logger: new TestLogger(),
  })
})

afterEach(() => telemetry.shutdown())

const eventLoopDelaySupported = atLeastNode('11.10.0')

test('processMetrics', async () => {
  if (!eventLoopDelaySupported) {
    telemetry.log.warn = jest.fn()
  }

  telemetry.use(processMetrics)

  await telemetry.ready()

  if (!eventLoopDelaySupported) {
    expect(telemetry.log.warn).not.toHaveBeenCalled()
  }

  // Do something
  const finishedTimestamp = Date.now() + 23
  while (finishedTimestamp > Date.now()) {
    const endTimestamp = performance.now() + Math.random()
    while (endTimestamp > performance.now()) {}
    await nextTick()
  }

  while (!(await telemetry.collect()).includes('process_gc_duration_seconds')) {
    await nextTick()
  }

  const metrics = await telemetry.collect()

  expect(metrics).toMatch('# TYPE process_cpu_user_seconds_total counter')
  if (eventLoopDelaySupported) {
    expect(metrics).toMatch('# TYPE process_event_loop_delay_min_seconds gauge')
  } else {
    expect(metrics).not.toMatch('# TYPE process_event_loop_delay_min_seconds gauge')
  }
  expect(metrics).toMatch('# TYPE process_gc_duration_seconds histogram')
  expect(metrics).toMatch('# TYPE process_heap_space_size_total_bytes gauge')
  expect(metrics).toMatch('# TYPE process_heap_size_total_bytes gauge')
  expect(metrics).toMatch('# TYPE process_start_time_seconds gauge')
  expect(metrics).toMatch('# TYPE process_uptime_seconds gauge')
  expect(metrics).toMatch('# TYPE process_version_info gauge')
})

if (!eventLoopDelaySupported) {
  test('processMetrics (warn missing event loop monitoring support)', async () => {
    telemetry.log.warn = jest.fn()

    telemetry.use(processMetrics, { eventLoopDelay: true })

    await telemetry.ready()

    expect(telemetry.log.warn).toHaveBeenCalledWith(
      '[%s] Monitoring the event loop delay is not supported on Node.js %s',
      'process_event_loop_delay',
      process.version,
    )
  })
}
