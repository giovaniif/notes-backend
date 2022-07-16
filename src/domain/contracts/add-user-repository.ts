export namespace AddUserRepository {
  export type Input = { name: string, email: string }
  export type Output = { name: string, email: string, id: string }
}

export interface AddUserRepository {
  add: (input: AddUserRepository.Input) => Promise<AddUserRepository.Output>
}
