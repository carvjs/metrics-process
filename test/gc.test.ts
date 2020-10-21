/**
 * @jest-environment node
 */
import { promisify } from 'util'

import { Telemetry, TestLogger } from '@carv/telemetry'

import { processGcDuration } from '../src'

jest.useFakeTimers()

const nextTick = promisify(setImmediate)

let telemetry: Telemetry

beforeEach(() => {
  telemetry = new Telemetry({
    logger: new TestLogger(),
  })
})

afterEach(() => telemetry.shutdown())

test('processGcDuration', async () => {
  telemetry.use(processGcDuration)

  await telemetry.ready()

  while ((await telemetry.collect()) === '# no registered metrics') {
    await nextTick()
  }

  const metrics = await telemetry.collect()

  expect(metrics).toMatch(
    '# HELP process_gc_duration_seconds Garbage collection duration by kind, one of major, minor, incremental or weakcb.',
  )
  expect(metrics).toMatch('# TYPE process_gc_duration_seconds histogram')
})
