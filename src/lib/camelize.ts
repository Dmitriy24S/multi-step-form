// const hyphenPattern = /-(.)/g
const hyphenOrSpacePattern = /[-\s]+(.)?/g

/**
 * camel-case a hyphenated string
 * @example camelize('background-color') => 'backgroundColor'
 * @example camelize('test string') => 'testString'
 */
export function camelize(stringWithHyphenOrSpace: string) {
  return stringWithHyphenOrSpace.replace(
    hyphenOrSpacePattern,
    function (_, character) {
      // return character.toUpperCase() // for hyphenPattern
      return character ? character.toUpperCase() : '' // for hyphenOrSpacePattern
    },
  )
}
