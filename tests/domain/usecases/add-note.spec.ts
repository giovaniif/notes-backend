import { mock, MockProxy } from 'jest-mock-extended'

import { AddNoteRepository } from '@/domain/contracts/add-note-repository'
import { setupAddNote, AddNote } from '@/domain/use-cases/add-note'

describe('Add Note', () => {
  let sut: AddNote
  let title: string
  let content: string
  let id: string
  let addNoteRepository: MockProxy<AddNoteRepository>

  beforeAll(() => {
    title = 'any_title'
    content = 'any_content'
    id = 'any_id'
    addNoteRepository = mock()
    addNoteRepository.create.mockResolvedValue({ title, content, id })
  })

  beforeEach(() => {
    sut = setupAddNote(addNoteRepository)
  })

  it('should call addNoteRepository with correct title and content', async () => {
    await sut({ title, content })

    expect(addNoteRepository.create).toHaveBeenCalledWith({ title, content })
  })

  it('should throw if repository throws', async () => {
    const error = new Error('repository_error')
    addNoteRepository.create.mockRejectedValueOnce(error)

    const promise = sut({ title, content })

    await expect(promise).rejects.toThrow(error)
  })

  it('should return the created note if create action performs', async () => {
    const note = await sut({ title, content })

    expect(note).toEqual({ title, content, id })
  })
})