import { LoadNoteByIdRepository } from "./load-note-by-id-repository"
import { NoteNotFoundError } from "./note-not-found-error"
import { UpdateNoteContentByIdRepository } from "./update-note-content-by-id-repository"

type Setup = (loadNoteByIdRepository: LoadNoteByIdRepository, updateNoteContentByIdRepository: UpdateNoteContentByIdRepository) => EditNote
type Input = { noteId: string, content: string }
export type EditNote = (input: Input) => Promise<void>

export const setupEditNote: Setup = (loadNoteByIdRepository, updateNoteContentByIdRepository): EditNote => {
  return async ({ noteId, content }) => {
    const note = await loadNoteByIdRepository.loadById({ id: noteId })
    if (note === undefined) throw new NoteNotFoundError()

    await updateNoteContentByIdRepository.updateContentById({ id: noteId, newContent: content })
  }
}