import { Note } from './note';
// Test for creating a note
describe('Note', () => {
  it('should create an instance', () => {
    expect(new Note()).toBeTruthy();
  });
});