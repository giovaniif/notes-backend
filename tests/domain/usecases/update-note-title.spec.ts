import { mock, MockProxy } from 'jest-mock-extended'

import { setupUpdateNoteTitle, UpdateNoteTitle } from '@/domain/use-cases/update-note-title'
import { LoadNoteByIdRepository, UpdateNoteTitleByIdRepository } from '@/domain/contracts'
import { NoteNotFoundError } from '@/domain/errors'

describe('Update Note Title', () => {
  let sut: UpdateNoteTitle
  let loadNoteByIdRepository: MockProxy<LoadNoteByIdRepository>
  let updateNoteTitleByIdRepository: MockProxy<UpdateNoteTitleByIdRepository>
  let noteId: string
  let newTitle: string
  let content: string
  let title: string

  beforeAll(() => {
    noteId = 'any_id'
    newTitle = 'new_title'
    content = 'any_content'
    title = 'old_title'
    loadNoteByIdRepository = mock()
    loadNoteByIdRepository.loadById.mockResolvedValue({ id: noteId, content, title })
    updateNoteTitleByIdRepository = mock()
  })

  beforeEach(() => {
    sut = setupUpdateNoteTitle(loadNoteByIdRepository, updateNoteTitleByIdRepository)
  })

  it('should call loadNoteById with correct id', async () => {
    await sut({ noteId, newTitle })

    expect(loadNoteByIdRepository.loadById).toHaveBeenCalledWith({ id: noteId })
  })

  it('should throw NoteNotFound Error if loadNoteById returns undefined', async () => {
    loadNoteByIdRepository.loadById.mockResolvedValueOnce(undefined)

    const promise = sut({ noteId, newTitle })

    await expect(promise).rejects.toThrow(new NoteNotFoundError())
  })

  it('should rethrow if loadNoteById throws', async () => {
    const error = new Error('any_load_error')
    loadNoteByIdRepository.loadById.mockRejectedValueOnce(error)

    const promise = sut({ noteId, newTitle })

    await expect(promise).rejects.toThrow(error)
  })

  it('should call updateNoteTitleByIdRepository with correct id and title', async () => {
    await sut({ noteId, newTitle })

    expect(updateNoteTitleByIdRepository.updateTitleById).toHaveBeenCalledWith({ id: noteId, newTitle })
  })

  it('should rethrow if updateNoteTitleByIdRepository throws', async () => {
    const error = new Error('any_load_error')
    updateNoteTitleByIdRepository.updateTitleById.mockRejectedValueOnce(error)

    const promise = sut({ noteId, newTitle })

    await expect(promise).rejects.toThrow(error)
  })

  it('should return the updated note', async () => {
    const note = await sut({ newTitle, noteId })

    expect(note).toEqual({ content, id: noteId, title: newTitle })
  })
})
