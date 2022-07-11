import { LoadNoteByIdRepository, UpdateNoteTitleByIdRepository } from '@/domain/contracts'
import { NoteNotFoundError } from '@/domain/errors'
import { Note } from '@/domain/models'

type Setup = (loadNoteByIdRepository: LoadNoteByIdRepository, updateNoteTitleByIdRepository: UpdateNoteTitleByIdRepository) => UpdateNoteTitle
type Input = { noteId: string, newTitle: string }
export type UpdateNoteTitle = (input: Input) => Promise<Note>
export const setupUpdateNoteTitle: Setup = (loadNoteByIdRepository, updateNoteTitleByIdRepository) => {
  return async ({ noteId, newTitle }) => {
    const note = await loadNoteByIdRepository.loadById({ id: noteId })
    if (note === undefined) throw new NoteNotFoundError()

    await updateNoteTitleByIdRepository.updateTitleById({ id: noteId, newTitle })
    return {
      content: note.content,
      id: note.id,
      title: newTitle
    }
  }
}
