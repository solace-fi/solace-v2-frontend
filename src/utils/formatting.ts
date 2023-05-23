import { TokenInfo } from '../constants/types'
import { rangeFrom0 } from './numeric'
import { formatUnits } from 'viem'

// truncate numbers without rounding
export const fixed = (n: number | string, decimals = 1): number => {
  if (typeof n == 'string') {
    n = parseFloat(formatAmount(n))
  }
  return Math.floor(n * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

// large function that uses other functions together to truncate a number to a certain number of decimals
export const truncateValue = (
  value: number | string,
  decimals = 6,
  abbrev = true
): string => {
  if (typeof value == 'number' && value == 0) return '0'
  if (typeof value == 'string') {
    const pureNumberStr = value.replace('.', '').split('e')[0]
    if (BigInt(pureNumberStr) == BigInt(0)) return '0'
  }
  let str = value.toString()

  // if string is in scientific notation, for example (1.2345e3, or 1.2345e-5)
  str = convertSciNotaToPrecise(str)
  const decimalIndex = str.indexOf('.')

  // if is nonzero whole number
  if (decimalIndex == -1) {
    if (abbrev) return numberAbbreviate(str)
    return str
  }

  // if is nonzero number with decimals
  const cutoffIndex = decimalIndex + decimals
  const truncatedStr = str.substring(0, cutoffIndex + 1)
  if (parseFloat(truncatedStr) == 0)
    return `< ${truncatedStr.slice(0, -1) + '1'}`
  if (abbrev) return numberAbbreviate(truncatedStr)
  return truncatedStr
}

// converts scientific notation like 1.2345e3 or 1.2345e-5 to precise number like 1234.5 or 0.000012345
export const convertSciNotaToPrecise = (str: string): string => {
  // if string is in scientific notation, for example (1.2345e3, or 1.2345e-5), (2)
  if (str.includes('e')) {
    // get number left of 'e'
    const n = str.split('e')[0]

    // get number right of 'e'
    const exponent = str.split('e')[1]

    // remove decimal in advance
    const temp = n.replace('.', '')
    let zeros = ''
    if (exponent.includes('-')) {
      // if exponent has negative sign, it must be negative
      const range = rangeFrom0(parseInt(exponent.slice(1)) - 1)
      range.forEach(() => (zeros += '0'))
      str = '0.'.concat(zeros).concat(temp) // add abs(exponent) - 1 zeros to the left of temp
    } else {
      // if exponent does not have negative sign, it must be positive

      let lengthOfDecimalPlaces = 0

      if (n.includes('.')) {
        // if number contains decimals, this is important
        lengthOfDecimalPlaces = n.split('.')[1].length
      }

      if (lengthOfDecimalPlaces > parseInt(exponent)) {
        // if length of decimal places in string surpasses exponent, must insert decimal point inside
        const decimalIndex = n.indexOf('.')
        const newDecimalIndex = decimalIndex + parseInt(exponent)
        str = temp
          .substring(0, newDecimalIndex)
          .concat('.')
          .concat(temp.substring(newDecimalIndex, temp.length))
      } else {
        // if length of decimal places in string does not surpass exponent, simply append zeros
        const range = rangeFrom0(parseInt(exponent) - lengthOfDecimalPlaces)
        range.forEach(() => (zeros += '0'))
        str = temp.concat(zeros)
      }
    }
  }
  return str
}

export const numberAbbreviate = (
  value: number | string,
  decimals = 2
): string => {
  if (typeof value == 'number' && value == 0) return '0'
  if (typeof value == 'string' && BigInt(value.replace('.', '')) == BigInt(0))
    return '0'
  const str = value.toString()
  const decimalIndex = str.indexOf('.')
  let wholeNumber = str
  if (decimalIndex != -1) {
    wholeNumber = str.substring(0, decimalIndex)
  }
  if (wholeNumber.length <= 3) return str

  const abbreviations: any = {
    [2]: 'K',
    [3]: 'M',
    [4]: 'B',
    [5]: 'T',
  }
  const abbrev = abbreviations[Math.ceil(wholeNumber.length / 3)]
  const cutoff = wholeNumber.length % 3 == 0 ? 3 : wholeNumber.length % 3
  const a = wholeNumber.substring(0, cutoff)
  const b = wholeNumber.substring(cutoff, cutoff + decimals)
  if (!abbrev) {
    return `${a}.${b}e${wholeNumber.length - cutoff}`
  }
  return `${a}.${b}${abbrev}`
}

// shifts decimals of a value to the right by a certain amount
export const accurateMultiply = (
  value: number | string,
  decimals: number
): string => {
  let result = typeof value == 'number' ? value.toString() : value
  const decimalIndex = result.indexOf('.')
  if (decimalIndex == -1) {
    const range = rangeFrom0(decimals)
    range.forEach(() => (result += '0'))
    return result
  }
  if (result.indexOf('.') != result.lastIndexOf('.')) return result
  const currentNumDecimalPlaces = result.length - decimalIndex - 1
  const decimalPlacesToAdd = decimals - currentNumDecimalPlaces

  if (currentNumDecimalPlaces > decimals) {
    // if current number of decimal places is greater than the number of decimals to multiply to,
    // it is time to truncate
    const numCharsToCut = decimals - currentNumDecimalPlaces
    result = result
      .substring(0, decimalIndex)
      .concat(result.substring(decimalIndex + 1, result.length))
    result = result.slice(0, numCharsToCut)
    return result
  }

  result = result
    .substring(0, decimalIndex)
    .concat(result.substring(decimalIndex + 1, result.length))
  const range = rangeFrom0(decimalPlacesToAdd)
  range.forEach(() => (result += '0'))
  const finalRes = result.replace(/^0+/, '')
  if (finalRes == '') return result
  return finalRes
}

export const fixedTokenPositionBalance = (token: TokenInfo): number => {
  return (
    parseFloat(BigInt(token.balance).toString()) / Math.pow(10, token.decimals)
  )
}

export const fixedPositionBalance = (
  balance: string,
  decimals: number
): number => {
  if (!balance) return 0
  return parseFloat(balance) / Math.pow(10, decimals)
}

export const getNonHumanValue = (
  value: bigint | number,
  decimals = 0
): bigint => {
  if (typeof value == 'number') {
    const productStr = accurateMultiply(value, decimals)
    return BigInt(productStr)
  }
  return BigInt(value) * getExponentValue(decimals)
}

export const getGasValue = (price: number): number => {
  return Number(getNonHumanValue(price, 9))
}

export const getExponentValue = (decimals = 0): bigint => {
  return BigInt(Math.pow(10, decimals))
}

export const getHumanValue = (
  value: bigint,
  decimals = 0
): bigint | undefined => {
  return value / getExponentValue(decimals)
}

export const floatUnits = (value: bigint, decimals: number): number =>
  parseFloat(formatUnits(value, decimals))

// used for correctly user amount input before processing
export const filterAmount = (input: string, amount: string): string => {
  const filtered = input.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
  return filtered
}

export const formatAmount = (amount: string): string =>
  // format to 0.0 by default if amount is incomplete
  amount == '0.' || amount == '.' || amount == '' ? '0.0' : amount

export const capitalizeFirstLetter = (str: string): string => {
  if (str.length == 0) return str
  return str.charAt(0).toUpperCase().concat(str.slice(1))
}

export const trim0x = (address: string): string =>
  address.startsWith('0x')
    ? address.slice(2).toLowerCase()
    : address.toLowerCase()

export const equalsIgnoreCase = (
  baseString: string,
  compareString: string
): boolean => {
  return baseString.toUpperCase() === compareString.toUpperCase()
}
