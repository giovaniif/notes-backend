import { CreateNoteRepository } from './create-note-repository'
import { Note } from './note'

type Input = { title: string, content: string }
type Output = Note 
export type CreateNote = (input: Input) => Promise<Output>

export const setupCreateNote = (createNoteRepository: CreateNoteRepository): CreateNote => {
  return async ({ content, title }) => {
    return await createNoteRepository.create({ content, title })
  }
}