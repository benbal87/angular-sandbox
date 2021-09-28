import { v4 as uuidv4 } from 'uuid'

export function generateUniqueId() {
  return `id_${ uuidv4() }`
}

export function generateNumber(min: number = 0, max: number = 100) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
