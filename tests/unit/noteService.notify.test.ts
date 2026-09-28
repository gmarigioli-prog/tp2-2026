import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NoteServiceImpl } from '../../src/services/NoteService';
import { SqliteNoteRepository } from '../../src/repositories/NoteRepository';
import { createDb } from '../../src/db/connection';

vi.mock('../../src/services/notificationService', () => {
  return {
    notify: vi.fn(),
  };
});

import { notify } from '../../src/services/notificationService';

describe('NoteService - notify when pinned (Ejercicio 6)', () => {
  let service: NoteServiceImpl;

  beforeEach(() => {
    vi.clearAllMocks();
    const db = createDb(':memory:');
    const repo = new SqliteNoteRepository(db);
    service = new NoteServiceImpl(repo);
  });

  it('llama a notify cuando la nota se crea con pinned: true', () => {
    const note = service.createNote({
      title: 'Titulo',
      content: 'Contenido',
      pinned: true,
    } as any);
    expect(notify).toHaveBeenCalledTimes(1);
    expect(notify).toHaveBeenCalledWith(expect.objectContaining({
      id: note.id,
      title: 'Titulo',
    }));
  });

  it('no llama a notify cuando pinned es false o no está presente', () => {
    service.createNote({ 
        title: 'A', 
        content: 'B' 
    } as any);
    expect(notify).not.toHaveBeenCalled();

    service.createNote({ title: 'C', 
        content: 'D', 
        pinned: false 
    } as any);
    expect(notify).not.toHaveBeenCalled();
  });
});
