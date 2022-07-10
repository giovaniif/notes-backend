import { LoadNoteByIdRepository, UpdateNoteContentByIdRepository } from '@/domain/contracts'
import { Note } from '@/domain/models'
import { NoteNotFoundError } from '@/domain/errors'

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
