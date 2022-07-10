import { Note } from "./note"

export namespace UpdateNoteContentByIdRepository {
  export type Input = { newContent: string, id: string }
  export type Output = Note
}

export interface UpdateNoteContentByIdRepository {
  updateContentById: (input: UpdateNoteContentByIdRepository.Input) => Promise<UpdateNoteContentByIdRepository.Output>
}