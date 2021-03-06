/**
 * @jest-environment node
 */
import { Telemetry, TestLogger } from '@carv/telemetry'

import { memoryUsage } from '../src'

jest.useFakeTimers()

let telemetry: Telemetry

beforeEach(() => {
  telemetry = new Telemetry({
    logger: new TestLogger(),
  })
})

afterEach(() => telemetry.shutdown())

test('memoryUsage', async () => {
  telemetry.use(memoryUsage)

  await telemetry.ready()

  const metrics = await telemetry.collect()

  expect(metrics).toMatch(
    '# HELP process_heap_size_total_bytes Process heap size from Node.js in bytes.',
  )
  expect(metrics).toMatch('# TYPE process_heap_size_total_bytes gauge')
})
