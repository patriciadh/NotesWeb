import { User } from './user';
// Test for creating a user
describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });
});
