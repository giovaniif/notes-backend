import { Note } from "./domain/models/note"

export namespace LoadNoteByIdRepository {
  export type Input = { id: string }
  export type Output = Note | undefined
}

export interface LoadNoteByIdRepository {
  loadById: (input: LoadNoteByIdRepository.Input) => Promise<LoadNoteByIdRepository.Output>
}