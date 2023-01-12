import { Card } from './card';

describe('Card', () => {
  it('should create an instance', () => {
    expect(new Card(-1,"string","")).toBeTruthy();
  });
});
