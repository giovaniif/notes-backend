import { mock, MockProxy } from "jest-mock-extended"

namespace CreateNoteRepository {
  export type Input = { title: string, content: string }
  export type Output = { title: string, content: string, id: string }
}
interface CreateNoteRepository {
  create: (input: CreateNoteRepository.Input) => Promise<CreateNoteRepository.Output>
}
type Input = { title: string, content: string }
type Output = { title: string, content: string, id: string }
type CreateNote = (input: Input) => Promise<Output>
const setupCreateNote = (createNoteRepository: CreateNoteRepository): CreateNote => {
  return async ({ content, title }) => {
    return await createNoteRepository.create({ content, title })
  }
}

describe('Create Note', () => {
  let sut: CreateNote
  let title: string
  let content: string
  let id: string
  let createNoteRepository: MockProxy<CreateNoteRepository>

  beforeAll(() => {
    title = 'any_title'
    content = 'any_content'
    id = 'any_id'
    createNoteRepository = mock()
    createNoteRepository.create.mockResolvedValue({ title, content, id })
  })

  beforeEach(() => {
    sut = setupCreateNote(createNoteRepository)
  })

  it('should call createNoteRepository with correct title and content', async () => {
    await sut({ title, content })

    expect(createNoteRepository.create).toHaveBeenCalledWith({ title, content })
  })

  it('should throw if repository throws', async () => {
    const error = new Error('repository_error')
    createNoteRepository.create.mockRejectedValueOnce(error)

    const promise = sut({ title, content })

    await expect(promise).rejects.toThrow(error)
  })

  it('should return the created note if create action performs', async () => {
    const note = await sut({ title, content })

    expect(note).toEqual({ title, content, id })
  })
})