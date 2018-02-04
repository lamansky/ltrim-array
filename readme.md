# ltrim-array

Removes specified values from the beginning of an array. Analogous to a left-trim operation for strings, except this module tests array elements instead of string characters.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i ltrim-array
```

## API

The module exports a single function.

### Parameters

1. Bindable: `arr` (Array or Array-like): The array that might have starting elements to be removed.
2. Optional: `trim` (any): A Function that tests elements (returning `true` if the element should be trimmed), or an Array of elements to be trimmed, or any single value that should be trimmed. If this argument is omitted, then `undefined` will be trimmed.

### Return Value

A copy of `arr`, with any trimmable elements removed from the beginning.

## Examples

By default, `ltrimArray()` removes `undefined` elements from the beginning of an array.

```javascript
const ltrimArray = require('ltrim-array')
ltrimArray([undefined, undefined, 1, 2, 3]) // [1, 2, 3]
```

This operation is distinct from that of `Array.prototype.filter()` because `ltrimArray()` only removes from the beginning. If a trimmable value (in this case, `undefined`) is found at the end or in the middle of the array, it will not be removed:

```javascript
ltrimArray([undefined, undefined, 1, undefined, 3]) // [1, undefined, 3]
```

If you want to trim something besides `undefined`, provide it as the second argument:

```javascript
ltrimArray([null, undefined, 1, 2, 3], null) // [undefined, 1, 2, 3]
```

If you want more than one value to be trimmed, put the values in an array and provide it as the second argument:

```javascript
ltrimArray([null, false, null, 1, 2, 3], [false, null]) // [1, 2, 3]
```

To do more advanced filtering, provide a callback. Each element at the beginning will be passed to the callback, and if the callback returns true, the element will be trimmed. If the callback returns false, the trimming will stop. In this example, the callback causes the module to trim numbers from the beginning, stopping when it reaches the string:

```javascript
ltrimArray([1, 2, 3, '4', 5], el => typeof el === 'number') // ['4', 5]
```

If every element in the array is trimmable, an empty array will be returned:

```javascript
ltrimArray([undefined]) // []
```

The module also supports the bind operator:

```javascript
const ltrim = require('ltrim-array')
[undefined, undefined, 1, 2, 3]::ltrim() // [1, 2, 3]
[null, undefined, 1, 2, 3]::ltrim(null)  // [undefined, 1, 2, 3]
```

## Related

* [rtrim-array](https://github.com/lamansky/rtrim-array): Removes specified values from the end of an array.
