import { LoadNotesRepository } from '@/domain/contracts'
import { Note } from '@/domain/models'

type Setup = (LoadNotesRepository: LoadNotesRepository) => LoadNotes
type Output = Note[]
export type LoadNotes = () => Promise<Output>
export const setupLoadNotes: Setup = (loadNotesRepository): LoadNotes => async () => await loadNotesRepository.load()
