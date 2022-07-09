export namespace CreateNoteRepository {
  export type Input = { title: string, content: string }
  export type Output = { title: string, content: string, id: string }
}

export interface CreateNoteRepository {
  create: (input: CreateNoteRepository.Input) => Promise<CreateNoteRepository.Output>
}
