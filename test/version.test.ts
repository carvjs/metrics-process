/**
 * @jest-environment node
 */
import { Telemetry, TestLogger } from '@carv/telemetry'

import { version } from '../src'

jest.useFakeTimers()

let telemetry: Telemetry

beforeEach(() => {
  telemetry = new Telemetry({
    logger: new TestLogger(),
  })
})

afterEach(() => telemetry.shutdown())

test('version', async () => {
  telemetry.use(version)

  await telemetry.ready()

  const metrics = await telemetry.collect()

  expect(metrics).toMatch('# HELP process_version_info Node.js version info.')
  expect(metrics).toMatch('# TYPE process_version_info gauge')
})
