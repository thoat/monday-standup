import { createNewProfile } from './card-display-frame';

// jest.mock('./card-display-frame', () => ({
//   createNewProfile: jest.fn(x => ({ ...x, id: '1' })),
// }));

it('creates a new profile with id included', () => {
  expect(createNewProfile({ one: 11, two: 22 }))
    .toEqual({ one: 11, two: 22, id: '97812' });
});
