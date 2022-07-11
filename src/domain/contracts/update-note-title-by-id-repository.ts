export namespace UpdateNoteTitleByIdRepository {
  export type Input = { id: string, newTitle: string }
}

export interface UpdateNoteTitleByIdRepository {
  updateTitleById: (input: UpdateNoteTitleByIdRepository.Input) => Promise<void>
}
