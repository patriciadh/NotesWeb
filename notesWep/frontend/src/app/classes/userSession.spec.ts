import { Session } from "./userSession";
// Test for creating a session
describe('Session', () => {
  it('should create an instance', () => {
    expect(new Session()).toBeTruthy();
  });
});