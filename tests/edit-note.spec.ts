import { mock, MockProxy } from "jest-mock-extended"

import { EditNote, setupEditNote } from "@/edit-note"
import { LoadNoteByIdRepository } from "@/load-note-by-id-repository"
import { NoteNotFoundError } from "@/note-not-found-error"
import { UpdateNoteContentByIdRepository } from "@/update-note-content-by-id-repository"


describe('Edit Note', () => {
  let sut: EditNote
  let loadNoteByIdRepository: MockProxy<LoadNoteByIdRepository>
  let updateNoteContentByIdRepository: MockProxy<UpdateNoteContentByIdRepository>
  let noteId: string
  let content: string
  let newContent: string
  let title: string

  beforeAll(() => {
    noteId = 'any_id'
    content = 'any_content'
    newContent = 'new_content'
    title = 'any_title'
    loadNoteByIdRepository = mock()
    loadNoteByIdRepository.loadById.mockResolvedValue({ id: noteId, content, title })
    updateNoteContentByIdRepository = mock()
    updateNoteContentByIdRepository.updateContentById.mockResolvedValue({ id: noteId, content: newContent, title })
  })

  beforeEach(() => {
    sut = setupEditNote(loadNoteByIdRepository, updateNoteContentByIdRepository)
  })

  it('should call loadNoteByIdRepository with correct id', async () => {
    await sut({ newContent, noteId })

    expect(loadNoteByIdRepository.loadById).toHaveBeenCalledWith({ id: noteId })
    expect(loadNoteByIdRepository.loadById).toHaveBeenCalledTimes(1)
  })

  it('should throw NoteNotFound error if repository returns undefined', async () => {
    loadNoteByIdRepository.loadById.mockResolvedValueOnce(undefined)

    const promise =  sut({ newContent, noteId })

    await expect(promise).rejects.toThrow(new NoteNotFoundError())
  })

  it('should rethrow if loadNoteById throws', async () => {
    const error = new Error('any_load_error')
    loadNoteByIdRepository.loadById.mockRejectedValueOnce(error)

    const promise = sut({ newContent, noteId })

    await expect(promise).rejects.toThrow(error)
  })

  it('should call updateNoteContentByIdRepository with correct id and content', async () => {
    await sut({ newContent, noteId })

    expect(updateNoteContentByIdRepository.updateContentById).toHaveBeenCalledWith({ newContent, id: noteId })
    expect(updateNoteContentByIdRepository.updateContentById).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if updateNoteContent throws', async () => {
    const error = new Error('any_update_error')
    updateNoteContentByIdRepository.updateContentById.mockRejectedValueOnce(error)

    const promise = sut({ newContent, noteId })

    await expect(promise).rejects.toThrow(error)
  })

  it('should return the updated note', async () => {
    const note = await sut({ newContent, noteId })

    expect(note).toEqual({ title, content: newContent, id: noteId })
  })
})