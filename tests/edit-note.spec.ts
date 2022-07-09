import { mock, MockProxy } from "jest-mock-extended"
import { Note } from "./note"

namespace LoadNoteByIdRepository {
  export type Input = { id: string }
  export type Output = Note | undefined
}

interface LoadNoteByIdRepository {
  loadById: (input: LoadNoteByIdRepository.Input) => Promise<LoadNoteByIdRepository.Output>
}

type Input = { noteId: string, content: string }
type EditNote = (input: Input) => Promise<void>
const setupEditNote = (loadNoteByIdRepository: LoadNoteByIdRepository): EditNote => {
  return async ({ noteId }) => {
    await loadNoteByIdRepository.loadById({ id: noteId })
  }
}

describe('Edit Note', () => {
  let sut: EditNote
  let loadNoteByIdRepository: MockProxy<LoadNoteByIdRepository>
  let noteId: string
  let content: string

  beforeAll(() => {
    noteId = 'any_id'
    content = 'any_content'
    loadNoteByIdRepository = mock()
  })

  beforeEach(() => {
    sut = setupEditNote(loadNoteByIdRepository)
  })

  it('should call loadNoteByIdRepository with correct id', async () => {
    await sut({ content, noteId })

    expect(loadNoteByIdRepository.loadById).toHaveBeenCalledWith({ id: noteId })
    expect(loadNoteByIdRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it.skip('should throw NoteNotFound error if repository returns undefined', async () => {})

  it.skip('should rethrow if loadNoteById throws', async () => {})

  it.skip('should call updateNoteContentRepository with correct id and content', async () => {})

  it.skip('should rethrow if updateNoteContent throws', async () => {})

  it.skip('should return the updated note', async () => {})
})