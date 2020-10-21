/**
 * @jest-environment node
 */
import { Telemetry, TestLogger } from '@carv/telemetry'

import { processUptime } from '../src'

jest.useFakeTimers()

let telemetry: Telemetry

beforeEach(() => {
  telemetry = new Telemetry({
    logger: new TestLogger(),
  })
})

afterEach(() => telemetry.shutdown())

test('processUptime', async () => {
  telemetry.use(processUptime)

  await telemetry.ready()

  const metrics = await telemetry.collect()

  expect(metrics).toMatch(
    '# HELP process_uptime_seconds The number of seconds the current Node.js process has been running.',
  )
  expect(metrics).toMatch('# TYPE process_uptime_seconds gauge')
})
