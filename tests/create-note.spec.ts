import { mock, MockProxy } from "jest-mock-extended"
import { CreateNoteRepository } from "@/create-note-repository"
import { setupCreateNote, CreateNote } from '@/create-note'

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