const DARK_MODE_KEY = 'darkMode'

export const getDarkMode = () => {
  if (typeof window !== 'undefined') {
    const darkModeValue = localStorage.getItem(DARK_MODE_KEY)
    return darkModeValue == 'dark' // Return false by default if no value found
  }
  return false
}

export const setDarkMode = (value: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(DARK_MODE_KEY, value ? 'dark' : 'light')
  }
}
