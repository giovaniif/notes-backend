import { LoadNoteByIdRepository } from "./load-note-by-id-repository"

type Input = { noteId: string, content: string }
export type EditNote = (input: Input) => Promise<void>

export const setupEditNote = (loadNoteByIdRepository: LoadNoteByIdRepository): EditNote => {
  return async ({ noteId }) => {
    await loadNoteByIdRepository.loadById({ id: noteId })
  }
}