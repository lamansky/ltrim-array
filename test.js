'use strict'

const assert = require('assert')
const ltrimArray = require('.')

describe('ltrimArray()', function () {
  it('should trim undefined elements by default', function () {
    const a = ltrimArray([undefined, undefined, 1, 2, 3]) // eslint-disable-line no-undefined
    assert.strictEqual(a.length, 3)
    assert.strictEqual(a[0], 1)
    assert.strictEqual(a[1], 2)
    assert.strictEqual(a[2], 3)
  })

  it('should support trimming elements based on callback', function () {
    const a = ltrimArray([1, '2', 3], el => typeof el === 'number')
    assert.strictEqual(a.length, 2)
    assert.strictEqual(a[0], '2')
    assert.strictEqual(a[1], 3)
  })

  it('should support trimming elements based on strict equality', function () {
    const a = ltrimArray([1, 2, 3], 1)
    assert.strictEqual(a.length, 2)
    assert.strictEqual(a[0], 2)
    assert.strictEqual(a[1], 3)

    assert.strictEqual(ltrimArray([1, 2, 3], '1').length, 3)
  })

  it('should support trimming elements based on blacklist array', function () {
    const a = ltrimArray([1, 2, 3], [1, 2])
    assert.strictEqual(a.length, 1)
    assert.strictEqual(a[0], 3)
  })

  it('should only remove from the end of the array', function () {
    const a = ltrimArray([undefined, 1, undefined, 3]) // eslint-disable-line no-undefined
    assert.strictEqual(a.length, 3)
    assert.strictEqual(a[0], 1)
    assert.strictEqual(typeof a[1], 'undefined')
    assert.strictEqual(a[2], 3)
  })

  it('should return empty array if all elements are trimmable', function () {
    assert.strictEqual(ltrimArray([undefined, undefined, undefined]).length, 0) // eslint-disable-line no-undefined
    assert.strictEqual(ltrimArray([1, 1, 1], 1).length, 0)
  })

  it('should trim nothing if no elements are trimmable', function () {
    const a = ltrimArray([1, 2, 3])
    assert.strictEqual(a.length, 3)
    assert.strictEqual(a[0], 1)
    assert.strictEqual(a[1], 2)
    assert.strictEqual(a[2], 3)
  })

  it('should support the bind operator', function () {
    const a = ltrimArray.call([1, '2', 3], el => typeof el === 'number')
    assert.strictEqual(a.length, 2)
    assert.strictEqual(a[0], '2')
    assert.strictEqual(a[1], 3)
  })
})
