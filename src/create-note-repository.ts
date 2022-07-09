import { Note } from "./note"

export namespace CreateNoteRepository {
  export type Input = { title: string, content: string }
  export type Output = Note 
}

export interface CreateNoteRepository {
  create: (input: CreateNoteRepository.Input) => Promise<CreateNoteRepository.Output>
}
