import { mock, MockProxy } from 'jest-mock-extended'

import { setupUpdateNoteTitle, UpdateNoteTitle } from '@/domain/use-cases/update-note-title'
import { LoadNoteByIdRepository } from '@/domain/contracts'
import { NoteNotFoundError } from '@/domain/errors'

describe('Update Note Title', () => {
  let sut: UpdateNoteTitle
  let loadNoteByIdRepository: MockProxy<LoadNoteByIdRepository>
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
  })

  beforeEach(() => {
    sut = setupUpdateNoteTitle(loadNoteByIdRepository)
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
  it('should rethrow if loadNoteById throws', async () => {})
  it('should call updateNoteTitleByIdRepository with correct id and title', async () => {})
  it('should rethrow if updateNoteTitleByIdRepository throws', async () => {})
  it('should return the updated note', async () => {})
})
