import { CreateNoteRepository } from './create-note-repository'

type Input = { title: string, content: string }
type Output = { title: string, content: string, id: string }
export type CreateNote = (input: Input) => Promise<Output>

export const setupCreateNote = (createNoteRepository: CreateNoteRepository): CreateNote => {
  return async ({ content, title }) => {
    return await createNoteRepository.create({ content, title })
  }
}