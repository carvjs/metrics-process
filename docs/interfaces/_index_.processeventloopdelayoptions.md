> [Globals](undefined) / ["index"](../README.md) / ProcessEventLoopDelayOptions

# Interface: ProcessEventLoopDelayOptions

## Hierarchy

* [ProcessCommonOptions](_index_.processcommonoptions.md)

  ↳ **ProcessEventLoopDelayOptions**

## Index

### Properties

* [description](_index_.processeventloopdelayoptions.md#description)
* [labels](_index_.processeventloopdelayoptions.md#labels)
* [name](_index_.processeventloopdelayoptions.md#name)
* [percentiles](_index_.processeventloopdelayoptions.md#percentiles)
* [prefix](_index_.processeventloopdelayoptions.md#prefix)
* [resolution](_index_.processeventloopdelayoptions.md#resolution)

## Properties

### description

• `Optional` **description**: undefined \| string

*Inherited from [ProcessCommonOptions](_index_.processcommonoptions.md).[description](_index_.processcommonoptions.md#description)*

*Defined in [src/types.ts:6](https://github.com/carvjs/metrics-process/blob/main/src/types.ts#L6)*

___

### labels

• `Optional` **labels**: Labels

*Inherited from [ProcessCommonOptions](_index_.processcommonoptions.md).[labels](_index_.processcommonoptions.md#labels)*

*Defined in [src/types.ts:7](https://github.com/carvjs/metrics-process/blob/main/src/types.ts#L7)*

___

### name

• `Optional` **name**: undefined \| string

*Inherited from [ProcessCommonOptions](_index_.processcommonoptions.md).[name](_index_.processcommonoptions.md#name)*

*Defined in [src/types.ts:5](https://github.com/carvjs/metrics-process/blob/main/src/types.ts#L5)*

___

### percentiles

• `Optional` **percentiles**: number[]

*Defined in [src/types.ts:23](https://github.com/carvjs/metrics-process/blob/main/src/types.ts#L23)*

(default: `[50, 75, 90, 95, 99]`)

___

### prefix

• `Optional` **prefix**: undefined \| string

*Inherited from [ProcessCommonOptions](_index_.processcommonoptions.md).[prefix](_index_.processcommonoptions.md#prefix)*

*Defined in [src/types.ts:4](https://github.com/carvjs/metrics-process/blob/main/src/types.ts#L4)*

___

### resolution

• `Optional` **resolution**: undefined \| number

*Defined in [src/types.ts:18](https://github.com/carvjs/metrics-process/blob/main/src/types.ts#L18)*

The sampling rate in milliseconds (default: `10`)
