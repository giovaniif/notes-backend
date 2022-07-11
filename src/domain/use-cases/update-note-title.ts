import { LoadNoteByIdRepository, UpdateNoteTitleByIdRepository } from '@/domain/contracts'
import { NoteNotFoundError } from '@/domain/errors'

type Setup = (loadNoteByIdRepository: LoadNoteByIdRepository, updateNoteTitleByIdRepository: UpdateNoteTitleByIdRepository) => UpdateNoteTitle
type Input = { noteId: string, newTitle: string }
export type UpdateNoteTitle = (input: Input) => Promise<void>
export const setupUpdateNoteTitle: Setup = (loadNoteByIdRepository, updateNoteTitleByIdRepository) => {
  return async ({ noteId, newTitle }) => {
    const note = await loadNoteByIdRepository.loadById({ id: noteId })
    if (note === undefined) throw new NoteNotFoundError()

    await updateNoteTitleByIdRepository.updateTitleById({ id: noteId, newTitle })
  }
}
