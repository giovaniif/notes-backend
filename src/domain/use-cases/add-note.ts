import { AddNoteRepository } from '@/domain/contracts/add-note-repository'
import { Note } from '@/domain/models/note'

type Setup = (addNoteRepository: AddNoteRepository) => AddNote
type Input = { title: string, content: string }
type Output = Note
export type AddNote = (input: Input) => Promise<Output>

export const setupAddNote: Setup = (addNoteRepository): AddNote => {
  return async ({ content, title }) => {
    return await addNoteRepository.create({ content, title })
  }
}
