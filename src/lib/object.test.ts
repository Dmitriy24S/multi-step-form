import { pick, omit } from './object'

test('pick', () => {
  // expect(pick({ a: 'A', b: 'B' }, ['a'])).toBe({ a: 'A' })
  expect(pick({ a: 'A', b: 'B' }, ['a'])).toStrictEqual({ a: 'A' })
})

test('omit', () => {
  expect(omit({ a: 'A', b: 'B' }, ['a'])).toStrictEqual({ b: 'B' })
})
