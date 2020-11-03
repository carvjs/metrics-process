/**
 * @jest-environment node
 */
import { promisify } from 'util'
import { performance } from 'perf_hooks'

import { Telemetry, TestLogger } from '@carv/telemetry'

import { heapSpace } from '../src'

jest.useFakeTimers()

const nextTick = promisify(setImmediate)

let telemetry: Telemetry

beforeEach(() => {
  telemetry = new Telemetry({
    logger: new TestLogger(),
  })
})

afterEach(() => telemetry.shutdown())

test('heapSpace', async () => {
  telemetry.use(heapSpace)

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
    '# HELP process_heap_space_size_total_bytes Process heap space size total from Node.js in bytes.',
  )
  expect(metrics).toMatch('# TYPE process_heap_space_size_total_bytes gauge')
})
