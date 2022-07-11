import { setupUpdateNoteTitle, UpdateNoteTitle } from '@/domain/use-cases/update-note-title'
import { LoadNoteByIdRepository } from '@/domain/contracts'
import { mock, MockProxy } from 'jest-mock-extended'

describe('Update Note Title', () => {
  let sut: UpdateNoteTitle
  let loadNoteByIdRepository: MockProxy<LoadNoteByIdRepository>
  let noteId: string
  let newTitle: string

  beforeAll(() => {
    loadNoteByIdRepository = mock()
    noteId = 'any_id'
    newTitle = 'any_title'
  })

  beforeEach(() => {
    sut = setupUpdateNoteTitle(loadNoteByIdRepository)
  })

  it('should call loadNoteById with correct id', async () => {
    await sut({ noteId, newTitle })

    expect(loadNoteByIdRepository.loadById).toHaveBeenCalledWith({ id: noteId })
  })
  it('should throw NoteNotFound Error if loadNoteById returns undefined', async () => {})
  it('should rethrow if loadNoteById throws', async () => {})
  it('should call updateNoteTitleByIdRepository with correct id and title', async () => {})
  it('should rethrow if updateNoteTitleByIdRepository throws', async () => {})
  it('should return the updated note', async () => {})
})
