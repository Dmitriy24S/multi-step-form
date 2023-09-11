export function pick(object: { [key: string]: any }, keysToPick: string[]) {
  const result: { [key: string]: any } = {}

  keysToPick.forEach((key) => {
    result[key] = object[key]
  })

  return result
}

export function omit(object: { [key: string]: any }, keysToOmit: string[]) {
  const result = Object.assign({}, object)

  keysToOmit.forEach((key) => delete result[key])

  return result
}
