import { LoadNoteByIdRepository } from "./load-note-by-id-repository"
import { NoteNotFoundError } from "./note-not-found-error"

type Input = { noteId: string, content: string }
export type EditNote = (input: Input) => Promise<void>

export const setupEditNote = (loadNoteByIdRepository: LoadNoteByIdRepository): EditNote => {
  return async ({ noteId }) => {
    const note = await loadNoteByIdRepository.loadById({ id: noteId })
    if (note === undefined) throw new NoteNotFoundError()
  }
}