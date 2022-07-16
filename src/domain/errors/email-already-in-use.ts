export class EmailAlreadyInUseError extends Error {
  constructor (email: string) {
    super()
    this.name = 'EmailAlreadyInUseError'
    this.message = `${email} is already in use`
  }
}
