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

