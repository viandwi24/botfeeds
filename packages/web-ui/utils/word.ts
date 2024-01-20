export const capitalizeEachWord = (str: string) => {
  return str.replace(/\b[a-z]/g, (char) => char.toUpperCase())
}