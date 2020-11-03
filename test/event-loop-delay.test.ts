/**
 * @jest-environment node
 */
import { promisify } from 'util'
import { performance } from 'perf_hooks'

import { Telemetry, TestLogger } from '@carv/telemetry'

import { eventLoopDelay, isEventLoopDelaySupported } from '../src'

jest.useFakeTimers()

const nextTick = promisify(setImmediate)

let telemetry: Telemetry

beforeEach(() => {
  telemetry = new Telemetry({
    logger: new TestLogger(),
  })
})

afterEach(() => telemetry.shutdown())

if (isEventLoopDelaySupported) {
  test('eventLoopDelay', async () => {
    telemetry.use(eventLoopDelay, { resolution: 1 })

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
      '# HELP process_event_loop_delay_min_seconds The minimum recorded event loop delay.',
    )
    expect(metrics).toMatch('# TYPE process_event_loop_delay_min_seconds gauge')
    expect(metrics).toMatch(/^process_event_loop_delay_min_seconds \d+(?:\.\d+)? \d{13}$/m)

    expect(metrics).toMatch(
      '# HELP process_event_loop_delay_max_seconds The maximum recorded event loop delay.',
    )
    expect(metrics).toMatch('# TYPE process_event_loop_delay_max_seconds gauge')
    expect(metrics).toMatch(/^process_event_loop_delay_max_seconds \d+(?:\.\d+)? \d{13}$/m)

    expect(metrics).toMatch(
      '# HELP process_event_loop_delay_mean_seconds Approximate mean event loop delay in seconds.',
    )
    expect(metrics).toMatch('# TYPE process_event_loop_delay_mean_seconds gauge')
    expect(metrics).toMatch(/^process_event_loop_delay_mean_seconds \d+(?:\.\d+)? \d{13}$/m)

    expect(metrics).toMatch(
      '# HELP process_event_loop_delay_stddev_seconds The standard deviation recorded event loop delay.',
    )
    expect(metrics).toMatch('# TYPE process_event_loop_delay_stddev_seconds gauge')
    expect(metrics).toMatch(/^process_event_loop_delay_stddev_seconds \d+(?:\.\d+)? \d{13}$/m)

    expect(metrics).toMatch(
      '# HELP process_event_loop_delay_seconds The recorded event loop delay quantiles.',
    )
    expect(metrics).toMatch('# TYPE process_event_loop_delay_seconds gauge')
    expect(metrics).toMatch(
      /^process_event_loop_delay_seconds\{quantile="0\.5"} \d+(?:\.\d+)? \d{13}$/m,
    )
    expect(metrics).toMatch(
      /^process_event_loop_delay_seconds\{quantile="0\.75"} \d+(?:\.\d+)? \d{13}$/m,
    )
    expect(metrics).toMatch(
      /^process_event_loop_delay_seconds\{quantile="0\.9"} \d+(?:\.\d+)? \d{13}$/m,
    )
    expect(metrics).toMatch(
      /^process_event_loop_delay_seconds\{quantile="0\.95"} \d+(?:\.\d+)? \d{13}$/m,
    )
    expect(metrics).toMatch(
      /^process_event_loop_delay_seconds\{quantile="0\.99"} \d+(?:\.\d+)? \d{13}$/m,
    )
  })
} else {
  test('eventLoopDelay', async () => {
    telemetry.use(eventLoopDelay)

    telemetry.log.warn = jest.fn()

    await telemetry.ready()

    expect(telemetry.log.warn).toHaveBeenCalledWith(
      '[%s] Monitoring the event loop delay is not supported on Node.js %s',
      'process_event_loop_delay',
      process.version,
    )
  })
}
