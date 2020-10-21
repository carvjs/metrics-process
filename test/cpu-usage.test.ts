/**
 * @jest-environment node
 */
import { Telemetry, TestLogger } from '@carv/telemetry'

import { processCpuUsage } from '../src'

jest.useFakeTimers()

let telemetry: Telemetry

beforeEach(() => {
  telemetry = new Telemetry({
    logger: new TestLogger(),
  })
})

afterEach(() => telemetry.shutdown())

test('processCpuUsage', async () => {
  telemetry.use(processCpuUsage)

  await telemetry.ready()

  const metrics = await telemetry.collect()

  expect(metrics).toMatch(
    '# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_cpu_user_seconds_total counter')
  expect(metrics).toMatch(/^process_cpu_user_seconds_total \d+\.\d+ \d{13}$/m)

  expect(metrics).toMatch(
    '# HELP process_cpu_system_seconds_total Total system CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_cpu_system_seconds_total counter')
  expect(metrics).toMatch(/^process_cpu_system_seconds_total \d+\.\d+ \d{13}$/m)

  expect(metrics).toMatch(
    '# HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_cpu_seconds_total counter')
  expect(metrics).toMatch(/^process_cpu_seconds_total \d+\.\d+ \d{13}$/m)
})

test('processCpuUsage (with labels)', async () => {
  telemetry.use(processCpuUsage, { labels: { one: 'two' } })

  await telemetry.ready()

  const metrics = await telemetry.collect()

  expect(metrics).toMatch(
    '# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_cpu_user_seconds_total counter')
  expect(metrics).toMatch(/^process_cpu_user_seconds_total\{one="two"} \d+\.\d+ \d{13}$/m)

  expect(metrics).toMatch(
    '# HELP process_cpu_system_seconds_total Total system CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_cpu_system_seconds_total counter')
  expect(metrics).toMatch(/^process_cpu_system_seconds_total\{one="two"} \d+\.\d+ \d{13}$/m)

  expect(metrics).toMatch(
    '# HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_cpu_seconds_total counter')
  expect(metrics).toMatch(/^process_cpu_seconds_total\{one="two"} \d+\.\d+ \d{13}$/m)
})

test('processCpuUsage (custom prefix)', async () => {
  telemetry.use(processCpuUsage, { prefix: 'nodejs_' })

  await telemetry.ready()

  const metrics = await telemetry.collect()

  expect(metrics).toMatch(
    '# HELP nodejs_cpu_user_seconds_total Total user CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE nodejs_cpu_user_seconds_total counter')
  expect(metrics).toMatch(/^nodejs_cpu_user_seconds_total \d+\.\d+ \d{13}$/m)

  expect(metrics).toMatch(
    '# HELP nodejs_cpu_system_seconds_total Total system CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE nodejs_cpu_system_seconds_total counter')
  expect(metrics).toMatch(/^nodejs_cpu_system_seconds_total \d+\.\d+ \d{13}$/m)

  expect(metrics).toMatch(
    '# HELP nodejs_cpu_seconds_total Total user and system CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE nodejs_cpu_seconds_total counter')
  expect(metrics).toMatch(/^nodejs_cpu_seconds_total \d+\.\d+ \d{13}$/m)
})

test('processCpuUsage (custom name)', async () => {
  telemetry.use(processCpuUsage, { name: 'core' })

  await telemetry.ready()

  const metrics = await telemetry.collect()

  expect(metrics).toMatch(
    '# HELP process_core_user_seconds_total Total user CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_core_user_seconds_total counter')
  expect(metrics).toMatch(/^process_core_user_seconds_total \d+\.\d+ \d{13}$/m)

  expect(metrics).toMatch(
    '# HELP process_core_system_seconds_total Total system CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_core_system_seconds_total counter')
  expect(metrics).toMatch(/^process_core_system_seconds_total \d+\.\d+ \d{13}$/m)

  expect(metrics).toMatch(
    '# HELP process_core_seconds_total Total user and system CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_core_seconds_total counter')
  expect(metrics).toMatch(/^process_core_seconds_total \d+\.\d+ \d{13}$/m)
})
