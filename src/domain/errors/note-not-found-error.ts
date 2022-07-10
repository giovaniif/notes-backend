export class NoteNotFoundError extends Error {
  constructor() {
    super()
    this.name = 'NotNotFoundError'
    this.message = 'Note not found'
  }
}