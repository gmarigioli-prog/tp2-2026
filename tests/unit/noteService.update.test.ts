import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - updateNote (Ejercicio 4)', () => {
  let service: NoteServiceImpl;
  beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('actualiza solo el title y no toca el content', () => {
    const note = service.createNote({
      title: 'Titulo original',
      content: 'Contenido original'
    });
    const updatedNote = service.updateNote(note.id, { title: 'Nuevo Titulo' });
    expect(updatedNote).toBeDefined();
    expect(updatedNote?.title).toBe('Nuevo Título');
    expect(updatedNote?.content).toBe('Contenido original');
  });
  it('actualiza solo el contenido  y no toca el titulo', () => {
    const note = service.createNote({
      title: 'Título original',
      content: 'Contenido original'
    });
    const updatedNote = service.updateNote(note.id, { content: 'Nuevo contenido' });
    expect(updatedNote).toBeDefined();
    expect(updatedNote?.title).toBe('Título original');
    expect(updatedNote?.content).toBe('Nuevo contenido');
  });
  it('devuelve undefined cuando el id no existe', () => {
    const result = service.updateNote(9999, { title: 'x' });
    expect(result).toBeUndefined();
  });
});