import { describe, it, expect, beforeEach } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

describe('NoteService - listNotes (Ejercicio 2)', () => {
  let service: NoteServiceImpl;
  
  beforeEach(() => {
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('la lista se encuentra vacía', () => {
    expect(service.listNotes()).toHaveLength(0);
  });

  it('la lista contiene una o más notas', () => {
    service.createNote({ title: 'A', content: 'B' });
    service.createNote({ title: 'C', content: 'D' });
    expect(service.listNotes()).toHaveLength(2);
  });
});