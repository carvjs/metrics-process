/**
 * @jest-environment node
 */
import { Telemetry, TestLogger } from '@carv/telemetry'

import { processStartTime } from '../src'

jest.useFakeTimers()

let telemetry: Telemetry

beforeEach(() => {
  telemetry = new Telemetry({
    logger: new TestLogger(),
  })
})

afterEach(() => telemetry.shutdown())

test('processStartTime', async () => {
  telemetry.use(processStartTime)

  await telemetry.ready()

  const metrics = await telemetry.collect()

  expect(metrics).toMatch(
    '# HELP process_start_time_seconds Start time of the process since unix epoch in seconds.',
  )
  expect(metrics).toMatch('# TYPE process_start_time_seconds gauge')
})
