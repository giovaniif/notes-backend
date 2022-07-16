export class InvalidEmailError extends Error {
  constructor (email: string) {
    super()
    this.message = `${email} is not valid`
    this.name = 'InvalidEmailError'
  }
}
