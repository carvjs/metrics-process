/**
 * @jest-environment node
 */
import { Telemetry, TestLogger } from '@carv/telemetry'

import { cpuUsage } from '../src'

jest.useFakeTimers()

let telemetry: Telemetry

beforeEach(() => {
  telemetry = new Telemetry({
    logger: new TestLogger(),
  })
})

afterEach(() => telemetry.shutdown())

test('cpuUsage', async () => {
  telemetry.use(cpuUsage)

  await telemetry.ready()

  const metrics = await telemetry.collect()

  expect(metrics).toMatch(
    '# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_cpu_user_seconds_total counter')
  expect(metrics).toMatch(/^process_cpu_user_seconds_total \d+(?:\.\d+)? \d{13}$/m)

  expect(metrics).toMatch(
    '# HELP process_cpu_system_seconds_total Total system CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_cpu_system_seconds_total counter')
  expect(metrics).toMatch(/^process_cpu_system_seconds_total \d+(?:\.\d+)? \d{13}$/m)

  expect(metrics).toMatch(
    '# HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_cpu_seconds_total counter')
  expect(metrics).toMatch(/^process_cpu_seconds_total \d+(?:\.\d+)? \d{13}$/m)
})

test('cpuUsage (with labels)', async () => {
  telemetry.use(cpuUsage, { labels: { one: 'two' } })

  await telemetry.ready()

  const metrics = await telemetry.collect()

  expect(metrics).toMatch(
    '# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_cpu_user_seconds_total counter')
  expect(metrics).toMatch(/^process_cpu_user_seconds_total\{one="two"} \d+(?:\.\d+)? \d{13}$/m)

  expect(metrics).toMatch(
    '# HELP process_cpu_system_seconds_total Total system CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_cpu_system_seconds_total counter')
  expect(metrics).toMatch(/^process_cpu_system_seconds_total\{one="two"} \d+(?:\.\d+)? \d{13}$/m)

  expect(metrics).toMatch(
    '# HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_cpu_seconds_total counter')
  expect(metrics).toMatch(/^process_cpu_seconds_total\{one="two"} \d+(?:\.\d+)? \d{13}$/m)
})

test('cpuUsage (custom prefix)', async () => {
  telemetry.use(cpuUsage, { prefix: 'nodejs' })

  await telemetry.ready()

  const metrics = await telemetry.collect()

  expect(metrics).toMatch(
    '# HELP nodejs_cpu_user_seconds_total Total user CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE nodejs_cpu_user_seconds_total counter')
  expect(metrics).toMatch(/^nodejs_cpu_user_seconds_total \d+(?:\.\d+)? \d{13}$/m)

  expect(metrics).toMatch(
    '# HELP nodejs_cpu_system_seconds_total Total system CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE nodejs_cpu_system_seconds_total counter')
  expect(metrics).toMatch(/^nodejs_cpu_system_seconds_total \d+(?:\.\d+)? \d{13}$/m)

  expect(metrics).toMatch(
    '# HELP nodejs_cpu_seconds_total Total user and system CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE nodejs_cpu_seconds_total counter')
  expect(metrics).toMatch(/^nodejs_cpu_seconds_total \d+(?:\.\d+)? \d{13}$/m)
})

test('cpuUsage (custom name)', async () => {
  telemetry.use(cpuUsage, { name: 'core' })

  await telemetry.ready()

  const metrics = await telemetry.collect()

  expect(metrics).toMatch(
    '# HELP process_core_user_seconds_total Total user CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_core_user_seconds_total counter')
  expect(metrics).toMatch(/^process_core_user_seconds_total \d+(?:\.\d+)? \d{13}$/m)

  expect(metrics).toMatch(
    '# HELP process_core_system_seconds_total Total system CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_core_system_seconds_total counter')
  expect(metrics).toMatch(/^process_core_system_seconds_total \d+(?:\.\d+)? \d{13}$/m)

  expect(metrics).toMatch(
    '# HELP process_core_seconds_total Total user and system CPU time spent in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_core_seconds_total counter')
  expect(metrics).toMatch(/^process_core_seconds_total \d+(?:\.\d+)? \d{13}$/m)
})
