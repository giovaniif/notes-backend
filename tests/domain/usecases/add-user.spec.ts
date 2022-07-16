import { mock, MockProxy } from 'jest-mock-extended'

import { AddUser, setupAddUser } from '@/domain/use-cases'
import { EmailValidator, AddUserRepository, LoadUserByEmailRepository } from '@/domain/contracts'
import { EmailAlreadyInUseError, InvalidEmailError } from '@/domain/errors'

describe('AddUser', () => {
  let email: string
  let name: string
  let id: string
  let emailValidator: MockProxy<EmailValidator>
  let addUserRepository: MockProxy<AddUserRepository>
  let loadUserByEmailRepository: MockProxy<LoadUserByEmailRepository>
  let sut: AddUser

  beforeAll(() => {
    email = 'any_email'
    name = 'any_name'
    id = 'any_user_id'
    emailValidator = mock()
    emailValidator.isValid.mockReturnValue(true)
    addUserRepository = mock()
    addUserRepository.add.mockResolvedValue({ email, name, id })
    loadUserByEmailRepository = mock()
  })

  beforeEach(() => {
    sut = setupAddUser(emailValidator, addUserRepository, loadUserByEmailRepository)
  })

  it('should call loadUserByEmail with correct email', async () => {
    await sut({ email, name })

    expect(loadUserByEmailRepository.loadByEmail).toHaveBeenCalledWith({ email })
    expect(loadUserByEmailRepository.loadByEmail).toHaveBeenCalledTimes(1)
  })

  it('should throw EmailAlreadyInUseError if loadUserByEmail returns data', async () => {
    loadUserByEmailRepository.loadByEmail.mockResolvedValueOnce({ email, name, id })

    const promise = sut({ email, name })

    await expect(promise).rejects.toThrow(new EmailAlreadyInUseError(email))
  })

  it('should call email validator with user email', async () => {
    await sut({ email, name })

    expect(emailValidator.isValid).toHaveBeenCalledWith(email)
    expect(emailValidator.isValid).toHaveBeenCalledTimes(1)
  })

  it('should throw InvalidEmailError if emailValidator returns false', async () => {
    emailValidator.isValid.mockReturnValueOnce(false)

    const promise = sut({ email, name })

    await expect(promise).rejects.toThrow(new InvalidEmailError(email))
  })

  it('should call addUserRepository with correct name and email', async () => {
    await sut({ email, name })

    expect(addUserRepository.add).toHaveBeenCalledWith({ email, name })
    expect(addUserRepository.add).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if addUserRepository throws', async () => {
    const error = new Error('add_user_error')
    addUserRepository.add.mockRejectedValueOnce(error)

    const promise = sut({ email, name })

    await expect(promise).rejects.toThrow(error)
  })

  it('should return created user if addUserRepository performs', async () => {
    const user = await sut({ email, name })

    expect(user).toEqual({ name, email, id })
  })
})
