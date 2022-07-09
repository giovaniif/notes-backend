import { mock, MockProxy } from "jest-mock-extended"

namespace CreateNoteRepository {
  export type Input = { title: string, content: string }
}
interface CreateNoteRepository {
  create: (input: CreateNoteRepository.Input) => Promise<void>
}
type Input = { title: string, content: string }
type CreateNote = (input: Input) => Promise<void>
const setupCreateNote = (createNoteRepository: CreateNoteRepository): CreateNote => {
  return async ({ content, title }) => {
    await createNoteRepository.create({ content, title })
  }
}

describe('Create Note', () => {
  let sut: CreateNote
  let title: string
  let content: string
  let createNoteRepository: MockProxy<CreateNoteRepository>

  beforeAll(() => {
    title = 'any_title'
    content = 'any_content'
    createNoteRepository = mock()
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
})