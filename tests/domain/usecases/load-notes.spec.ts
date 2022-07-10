import { mock, MockProxy } from 'jest-mock-extended'

import { setupLoadNotes, LoadNotes } from '@/domain/use-cases'
import { LoadNotesRepository } from '@/domain/contracts'
import { Note } from '@/domain/models'

describe('load notes', () => {
  let sut: LoadNotes
  let loadNotesRepository: MockProxy<LoadNotesRepository>
  let notes: Note[]

  beforeAll(() => {
    loadNotesRepository = mock()
    notes = [{ id: 'any_id', title: 'any_title', content: 'any_content' }]
    loadNotesRepository.load.mockResolvedValue(notes)
  })

  beforeEach(() => {
    sut = setupLoadNotes(loadNotesRepository)
  })

  it('should call loadNotesRepository', async () => {
    await sut()

    expect(loadNotesRepository.load).toHaveBeenCalledTimes(1)
  })

  it('should load all notes', async () => {
    const loadedNotes = await sut()

    expect(loadedNotes).toEqual(notes)
  })
})
