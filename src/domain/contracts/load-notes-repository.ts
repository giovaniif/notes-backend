import { Note } from '@/domain/models'

export namespace LoadNotesRepository {
  export type Output = Note[]
}

export interface LoadNotesRepository {
  load: () => Promise<LoadNotesRepository.Output>
}
