import { AddNoteRepository } from './add-note-repository'
import { Note } from './note'

type Input = { title: string, content: string }
type Output = Note 
export type AddNote = (input: Input) => Promise<Output>

export const setupAddNote = (addNoteRepository: AddNoteRepository): AddNote => {
  return async ({ content, title }) => {
    return await addNoteRepository.create({ content, title })
  }
}