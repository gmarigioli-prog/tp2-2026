import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - getNote (Ejercicio 3)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('devuelve la nota cuando el id existe', () => {
    const nota = service.createNote({ title: 'Test', content: 'Contenido' });
    const resultado = service.getNote(nota.id);
    expect(resultado?.title).toBe('Test');
  });

  it('devuelve undefined cuando el id no existe', () => {

    });
});