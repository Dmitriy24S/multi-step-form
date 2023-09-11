import { camelize } from './camelize'

test('camelize', () => {
  expect(camelize('background-color')).toBe('backgroundColor')
  expect(camelize('margin')).toBe('margin')
  expect(camelize('marginLeft')).toBe('marginLeft')
  expect(camelize('')).toBe('')
  expect(camelize('test space')).toBe('testSpace')
})
