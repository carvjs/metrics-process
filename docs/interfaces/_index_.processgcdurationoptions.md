> [Globals](undefined) / ["index"](../README.md) / ProcessGcDurationOptions

# Interface: ProcessGcDurationOptions

## Hierarchy

* [ProcessCommonOptions](_index_.processcommonoptions.md)

  ↳ **ProcessGcDurationOptions**

## Index

### Properties

* [boundaries](_index_.processgcdurationoptions.md#boundaries)
* [description](_index_.processgcdurationoptions.md#description)
* [labels](_index_.processgcdurationoptions.md#labels)
* [name](_index_.processgcdurationoptions.md#name)
* [prefix](_index_.processgcdurationoptions.md#prefix)

## Properties

### boundaries

• `Optional` **boundaries**: BoundariesConfig

*Defined in [src/types.ts:30](https://github.com/carvjs/metrics-process/blob/main/src/types.ts#L30)*

(default: `{ start: 0.0001, count: 15 }` => `[0.0001, 0.0002, 0.0004, 0.0008, 0.0016, 0.0032, 0.0064, 0.0128, 0.0256, 0.0512, 0.1024, 0.2048, 0.4096, 0.8192, 1.6384]`)

___

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

### prefix

• `Optional` **prefix**: undefined \| string

*Inherited from [ProcessCommonOptions](_index_.processcommonoptions.md).[prefix](_index_.processcommonoptions.md#prefix)*

*Defined in [src/types.ts:4](https://github.com/carvjs/metrics-process/blob/main/src/types.ts#L4)*
