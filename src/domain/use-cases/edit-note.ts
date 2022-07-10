import { LoadNoteByIdRepository } from "../../load-note-by-id-repository"
import { Note } from "../../note"
import { NoteNotFoundError } from "../../note-not-found-error"
import { UpdateNoteContentByIdRepository } from "../../update-note-content-by-id-repository"

type Setup = (loadNoteByIdRepository: LoadNoteByIdRepository, updateNoteContentByIdRepository: UpdateNoteContentByIdRepository) => EditNote
type Input = { noteId: string, newContent: string }
export type EditNote = (input: Input) => Promise<Note>

export const setupEditNote: Setup = (loadNoteByIdRepository, updateNoteContentByIdRepository): EditNote => {
  return async ({ noteId, newContent }) => {
    const note = await loadNoteByIdRepository.loadById({ id: noteId })
    if (note === undefined) throw new NoteNotFoundError()

    const updatedNote = await updateNoteContentByIdRepository.updateContentById({ id: noteId, newContent })
    return updatedNote
  }
}