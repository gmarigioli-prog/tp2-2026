import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { makeApp } from '../../src/app';

describe('GET /notes/:id (Ejercicio 3 - integracion)', () => {
  let app: ReturnType<typeof makeApp>;
  beforeEach(() => {
    app = makeApp(':memory:');
  });
  it('devuelve 200 y la nota cuando el id existe', async () => {
    const creada = await request(app).post('/notes').send({ title: 'Comprar agua', content: 'Antes de las 20' });
    const res = await request(app).get(`/notes/${creada.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Comprar agua');
  });
  it('devuelve 404 cuando el id no existe', async () => {
    const res = await request(app).get('/notes/999999');
    expect(res.status).toBe(404);
  });
});
describe('PATCH /notes/:id (Ejercicio 4 - integración)', () => {
  let app: ReturnType<typeof makeApp>;
  beforeEach(() => {
    app = makeApp(':memory:');
  });
  it('devuelve 200 y aplica el patch parcial', async () => {
    const createRes = await request(app)
      .post('/notes')
      .send({ title: 'Título original', content: 'Contenido original' });
    const id = createRes.body.id;
    const patchRes = await request(app)
      .patch(`/notes/${id}`)
      .send({ title: 'Título modificado' });
    expect(patchRes.status).toBe(200);
    expect(patchRes.body.title).toBe('Título modificado');
    expect(patchRes.body.content).toBe('Contenido original');
  });
  it('devuelve 404 cuando el id no existe', async () => {
    const patchRes = await request(app)
      .patch('/notes/999999')
      .send({ title: 'Algo' });
    expect(patchRes.status).toBe(404);
  });
});