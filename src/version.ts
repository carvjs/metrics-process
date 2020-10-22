import { Telemetry } from '@carv/telemetry'

import { ProcessVersionOptions } from './types'

export function processVersion(
  telemetry: Telemetry,
  {
    prefix = 'process',
    name = 'version_info',
    description = 'Node.js version info.',
    labels,
  }: ProcessVersionOptions,
  done: () => void,
) {
  const { version } = process

  const [major, minor, patch] = version.slice(1).split('.')

  const value = Number([major, minor, patch].map(n => n.padStart(2, '0')).join(''))

  telemetry.createValueObserver(
    {
      prefix,
      name,
      description,
      labels: { ...labels, version, major, minor, patch },
    },
    () => value,
  )

  done()
}
