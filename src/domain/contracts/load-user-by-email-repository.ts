export namespace LoadUserByEmailRepository {
  export type Input = { email: string }
  export type Output = { email: string, name: string, id: string } | undefined
}

export interface LoadUserByEmailRepository {
  loadByEmail: (input: LoadUserByEmailRepository.Input) => Promise<LoadUserByEmailRepository.Output>
}
