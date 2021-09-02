import { sum } from './sum';
import request from 'supertest';
import { app } from '../app';
describe('Calculator 2 number', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  it('minus 2 - 1 to equal 1', () => {
    expect(2 - 1).toBe(1);
  });
});
it('responds with details about current user', async () => {
  const cookie = await global.signIn();
});
