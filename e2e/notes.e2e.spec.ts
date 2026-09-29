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

