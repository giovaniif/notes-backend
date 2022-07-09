import { Note } from "./note"

export namespace AddNoteRepository {
  export type Input = { title: string, content: string }
  export type Output = Note 
}

export interface AddNoteRepository {
  create: (input: AddNoteRepository.Input) => Promise<AddNoteRepository.Output>
}
