import { LoadNoteByIdRepository } from '@/domain/contracts'
import { NoteNotFoundError } from '@/domain/errors'

type Setup = (loadNoteByIdRepository: LoadNoteByIdRepository) => UpdateNoteTitle
type Input = { noteId: string, newTitle: string }
export type UpdateNoteTitle = (input: Input) => Promise<void>
export const setupUpdateNoteTitle: Setup = (loadNoteByIdRepository) => {
  return async ({ noteId }) => {
    const note = await loadNoteByIdRepository.loadById({ id: noteId })
    if (note === undefined) throw new NoteNotFoundError()
  }
}
