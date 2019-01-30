import uuidv4 from 'uuid/v4';

// import { createNewProfile } from './helper-data';

// // jest.mock('./card-display-frame', () => ({
// //   createNewProfile: jest.fn(x => ({ ...x, id: '1' })),
// // }));

// test('creates a new profile with id included', () => {
//   expect(createNewProfile({ one: 11, two: 22 }))
//     .toEqual({ one: 11, two: 22, id: '97812' });
// });

// jest.mock('uuid/v4', () => () => '97812'); // credit: https://github.com/facebook/jest/issues/2172#issuecomment-393349332
export function createNewProfile(target) {
  return { ...target, id: uuidv4() };
}

export function fetchMemberList() {
  fetch('/api/members', { method: 'GET' })
    .then(response => response.json()) // can't skip this!
    .then((data) => {
      // Rename object keys. Credit: https://stackoverflow.com/a/50101979
      data.forEach((member) => {
        delete Object.assign(member, { id: member.rowid }).rowid;
        delete Object.assign(member, { memberName: member.name }).name;
        delete Object.assign(member, { isAbsent: member.is_absent }).is_absent;
      });
      // this.setState({ cardArray: data });
      return data;
    });
}

export function saveAddChanges(data) {
  fetch('/api/members', {
    method: 'POST',
    body: JSON.stringify(data), // don't forget to convert into JSON!!
    headers: { 'Content-Type': 'application/json' },
  }).then(response => response.json())
    .then(body => alert(body.msg))
    .catch((err) => {
      console.log(err); // eslint-disable-line no-console
    });
}

export function saveRemoveChanges(data) {
  fetch(`/api/members/${data}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(body => alert(body.msg))
    .catch((err) => {
      console.log(err); // eslint-disable-line no-console
    });
}

