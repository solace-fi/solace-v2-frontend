export const rangeFrom1 = (stop: number): number[] => {
  const arr = []
  for (let i = 1; i <= stop; ++i) {
    arr.push(i)
  }
  return arr
}

export const rangeFrom0 = (stop: number): number[] => {
  const arr = []
  for (let i = 0; i < stop; ++i) {
    arr.push(i)
  }
  return arr
}

export const decimals = (d: number): string => {
  let s = '1'
  for (let i = 0; i < d; ++i) {
    s = `${s}0`
  }
  return s
}

export const range = (start: number, stop: number, step = 1): number[] => {
  const arr = []
  for (let i = start; i < stop; i += step) arr.push(i)
  return arr
}
