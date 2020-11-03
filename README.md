# @carv/metrics-process

[Telemetry](https://www.npmjs.com/package/@carv/telemetry) [metrics](https://prometheus.io/) for the Node.JS process.

[![License](https://flat.badgen.net/npm/license/@carv/metrics-process)](https://github.com/carvjs/metrics-process/blob/main/LICENSE)
[![Latest Release](https://flat.badgen.net/npm/v/@carv/metrics-process?label=release)](https://www.npmjs.com/package/@carv/metrics-process)
[![Node Version](https://flat.badgen.net/npm/node/@carv/metrics-process?color=blue)](https://nodejs.org/)
[![Telemetry Version](https://flat.badgen.net/badge/%40carv%2Ftelemetry/1.x/blue)](https://github.com/carvjs/telemetry)
[![Typescript](https://flat.badgen.net/badge/icon/included?icon=typescript&label)](https://unpkg.com/browse/@carv/metrics-process/dist/index.d.ts)
[![Sponsor](https://flat.badgen.net/badge/sponsored%20by/Kenoxa/2980b9)](https://www.kenoxa.com)

## Installation

```sh
npm install @carv/metrics-process
```

## Usage

Register the plugin and if needed pass to it some custom options.

```js
const { Telemetry } = require('@carv/telemetry')

const telemetry = new Telemetry()

// using the defaults
telemetry.use(require('@carv/metrics-process'))

// with custom options
telemetry.use(require('@carv/metrics-process'), { /* ... Options ... */ })

// using only eventLoopDelay metric
telemetry.use(require('@carv/metrics-process').eventLoopDelay)
```

## [API](https://github.com/carvjs/metrics-process/blob/main/docs/README.md)

Each metric is exported as a [@carv/telemetry](https://www.npmjs.com/package/@carv/telemetry) plugin. The [default export](https://github.com/carvjs/metrics-process/blob/main/docs/README.md#metrics) registers all metrics/plugins. The following plugins are available and exported by name:

* [cpuUsage](https://github.com/carvjs/metrics-process/blob/main/docs/README.md#cpuusage): Process CPU time spent in seconds
* [eventLoopDelay](https://github.com/carvjs/metrics-process/blob/main/docs/README.md#eventloopdelay): Approximate event loop delay in seconds
* [eventLoopUtilization](https://github.com/carvjs/metrics-process/blob/main/docs/README.md#eventlooputilization): ELU is similar to CPU utilization, except that it only measures event loop statistics and not CPU usage. It represents the percentage of time the event loop has spent outside the event loop's event provider (e.g. epoll_wait)
* [gcDuration](https://github.com/carvjs/metrics-process/blob/main/docs/README.md#gcduration): Garbage collection duration by kind, one of major, minor, incremental or weakcb
* [heapSpace](https://github.com/carvjs/metrics-process/blob/main/docs/README.md#heapspace): Statistics about the V8 heap spaces
* [memoryUsage](https://github.com/carvjs/metrics-process/blob/main/docs/README.md#memoryusage): Memory usage of the Node.js process
* [startTime](https://github.com/carvjs/metrics-process/blob/main/docs/README.md#starttime): Start time of the process since unix epoch in seconds
* [uptime](https://github.com/carvjs/metrics-process/blob/main/docs/README.md#uptime): The number of seconds the current Node.js process has been running
* [version](https://github.com/carvjs/metrics-process/blob/main/docs/README.md#version): Node.js version info

## Contribute

Thanks for being willing to contribute!

**Working on your first Pull Request?** You can learn how from this _free_ series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

We are following the [Conventional Commits](https://www.conventionalcommits.org) convention.

### Develop

- `yarn test`: Run test suite
- `yarn build`: Generate bundles
- `yarn lint`: Lints code

## Sponsors

[![Kenoxa GmbH](https://images.opencollective.com/kenoxa/9c25796/logo/68.png)](https://www.kenoxa.com) [Kenoxa GmbH](https://www.kenoxa.com)

## License

[MIT](https://github.com/carvjs/metrics-process/blob/main/LICENSE) © [Kenoxa GmbH](https://kenoxa.com)
