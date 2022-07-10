export namespace UpdateNoteContentByIdRepository {
  export type Input = { newContent: string, id: string }
}

export interface UpdateNoteContentByIdRepository {
  updateContentById: (input: UpdateNoteContentByIdRepository.Input) => Promise<void>
}