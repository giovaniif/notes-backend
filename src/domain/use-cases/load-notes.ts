import { LoadNotesRepository } from "../../load-notes-repository"
import { Note } from "../models/note"

type Output = Note[]
export type LoadNotes = () => Promise<Output>
export const setupLoadNotes = (loadNotesRepository: LoadNotesRepository): LoadNotes => async () => await loadNotesRepository.load()