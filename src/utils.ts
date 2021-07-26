export const getRandomTag = () => {
  let result = ''
  const characters = 'abcdefghijklmnopqrstuvwxyz'
  const charactersLength = Math.round(Math.random() * 8 + 2)
  for (let i = 0; i < charactersLength; i += 1) {
    result += characters[Math.round(Math.random() * characters.length)]
  }

  return result
}
