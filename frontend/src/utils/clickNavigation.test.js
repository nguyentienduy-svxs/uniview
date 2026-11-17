import assert from 'node:assert/strict'
import test from 'node:test'

import { allowsLabelRouteInference } from './clickNavigation.js'

function target(tagName, type = null) {
  return {
    tagName,
    getAttribute(name) {
      return name === 'type' ? type : null
    },
  }
}

test('does not infer navigation from an application action button label', () => {
  assert.equal(allowsLabelRouteInference(target('BUTTON', 'button')), false)
})

test('keeps label inference for legacy links and submit-style CTAs', () => {
  assert.equal(allowsLabelRouteInference(target('A')), true)
  assert.equal(allowsLabelRouteInference(target('BUTTON')), true)
})
