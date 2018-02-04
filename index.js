'use strict'

const pfn = require('pfn')
const supportBindOperator = require('sbo')

module.exports = supportBindOperator(function ltrimArray (arr, trim) {
  const shouldTrim = pfn(trim, Array.isArray(trim) ? el => trim.includes(el) : el => el === trim)
  let i; for (i = 0; i < arr.length; i++) if (!shouldTrim(arr[i])) break
  return Array.from(arr).slice(i)
})
