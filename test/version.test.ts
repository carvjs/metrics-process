/**
 * @jest-environment node
 */
import { Telemetry, TestLogger } from '@carv/telemetry'

import { processVersion } from '../src'

jest.useFakeTimers()

let telemetry: Telemetry

beforeEach(() => {
  telemetry = new Telemetry({
    logger: new TestLogger(),
  })
})

afterEach(() => telemetry.shutdown())

test('processVersion', async () => {
  telemetry.use(processVersion)

  await telemetry.ready()

  const metrics = await telemetry.collect()

  expect(metrics).toMatch('# HELP process_version_info Node.js version info.')
  expect(metrics).toMatch('# TYPE process_version_info gauge')
})
