import { AddUserRepository, EmailValidator, LoadUserByEmailRepository } from '@/domain/contracts'
import { EmailAlreadyInUseError, InvalidEmailError } from '@/domain/errors'

type Input = { name: string, email: string }
export type AddUser = (input: Input) => Promise<{ name: string, email: string, id: string }>
type Setup = (emailValidator: EmailValidator, addUserRepository: AddUserRepository, loadUserByEmailRepository: LoadUserByEmailRepository) => AddUser
export const setupAddUser: Setup = (emailValidator, addUserRepository, loadUserByEmailRepository) => {
  return async ({ email, name }) => {
    const emailAlreadyInUse = await loadUserByEmailRepository.loadByEmail({ email })
    if (emailAlreadyInUse !== undefined) throw new EmailAlreadyInUseError(email)
    if (!emailValidator.isValid(email)) {
      throw new InvalidEmailError(email)
    }
    return await addUserRepository.add({ email, name })
  }
}
