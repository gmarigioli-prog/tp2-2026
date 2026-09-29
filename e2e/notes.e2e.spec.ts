import { test, expect, request } from '@playwright/test'; 
import { resetAndSeed } from './helpers'; 

test.describe('E2E /notes', () => {


  test.beforeEach(async ({ baseURL }) => { await resetAndSeed(baseURL!); });

  test('GET /notes devuelve la semilla', async ({ baseURL }) => {

    const ctx = await request.newContext({ baseURL });


    const res = await ctx.get('/notes');

    expect(res.status()).toBe(200);


    const items = await res.json();


    expect(items.length).toBeGreaterThanOrEqual(2);

    await ctx.dispose();
  });
});

test.describe('E2E caso de error', () => {
  test('GET /notes/:id con una id inexistente devuelve error 404', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL });

    const res = await ctx.get('/notes/9999');

    expect(res.status()).toBe(404);
    await ctx.dispose();
  });
});
