import { LoadNoteByIdRepository } from '@/domain/contracts'

type Setup = (loadNoteByIdRepository: LoadNoteByIdRepository) => UpdateNoteTitle
type Input = { noteId: string, newTitle: string }
export type UpdateNoteTitle = (input: Input) => Promise<void>
export const setupUpdateNoteTitle: Setup = (loadNoteByIdRepository) => {
  return async ({ noteId }) => {
    await loadNoteByIdRepository.loadById({ id: noteId })
  }
}
