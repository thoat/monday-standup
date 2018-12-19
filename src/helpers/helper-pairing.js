/*
INPUT: an array of cards or members
[
  {memberName: String, team: String, isAbsent: boolean},
  {memberName: String, team: String, isAbsent: boolean},
  ...
]
OUTPUT: an array of pairs. Format like below:
[
  {card1: Card object, card2: Card object},
  {card1: Card object, card2: Card object},
  ...
]

Steps:
=== A: Prepare the Foundations ===
1. Iterate through the array of members to create a hash of on-site team sizes.
{key: teamName, value: teamSize}.

2. Turn this hash into an array via Object.entries() and sort it from max to
min team sizes. Then use the indices to build a teamIndex hash. Biggest team
corresponds to value 0, and so on.

3. Start building a (sorted) array of array. Each subarray represents a team.
How?
  3a. Iterate through the memberArray
  3b. If the member is not absent, look up the member's teamName in the Hash
  created at step 2 in order to push the member to the correct subarray.
    let teams = []
    memberArray.forEach(member => {
      if (!member.isAbsent)
        teams[teamIndex[member.teamName]].push(member)
    })

=== B: Pair Randomly ===
1. Essential variables:
    const INITIAL_PIVOT = 0 (the index of the biggest-sized team)
    const INITIAL_HOP = a random number between 0 and no. of teams
    let pivot = 0
    let pivotTeam = teams[pivot]
    let partner = pivot + INITIAL_HOP
2.
  Loop k times, with k being half the number of members present.
  pivot is where we get card1. partner is where we get card2.
  In each iteration:
    while pivotTeam is empty {
      keep incrementing pivot
    }
    let card1 = pivotTeam.pop()
    increment partner, unless this is the very first loop
    while (partnerTeam is empty && partner !== INITIAL_PIVOT) {
      keep incrementing partner to reach a non-empty team
    }
    if partner reaches the INITIAL_PIVOT, skip to the current pivot plus 1
    let card2 = partnerTeam.pop()
    save {card1: card1, card2: card2}
*/

// use this library to utilize its sorted() and peekBack() functions
import CustomArray from 'collections/shim-array';

export default function yieldThePairs(memberList) {
  const MEMBERS = memberList;

  // build the hash of on-site team sizes
  let numPresentMembers = 0;
  const teamSizeHash = MEMBERS.reduce((h, member) => {
    if (!member.isAbsent) {
      numPresentMembers += 1;
      if (!h[member.team]) {
        h[member.team] = 0;
      }
      h[member.team] += 1;
    }
    return h;
  }, {});

  // sort team sizes
  const teamIndex = new CustomArray(...Object.entries(teamSizeHash))
    // index 0 stores the team name, index 1 stores the team size;
    // b-a cuz we want to sort decreasingly
    .sorted((a, b) => b[1] - a[1])
    .reduce((hash, elem, idx) => {
      hash[elem[0]] = idx; // {key: team name, value: index in the sizeArray}
      return hash;
    }, {});

  // build the arrays of teams
  const teams = [];
  MEMBERS.forEach((member) => {
    if (!member.isAbsent) {
      const teamName = member.team;
      if (!teams[teamIndex[teamName]]) {
        teams[teamIndex[teamName]] = new CustomArray();
      }
      teams[teamIndex[teamName]].push(member);
    }
  });

  // pairing
  const INITIAL_PIVOT = 0; // the index of the biggest-sized team
  const INITIAL_HOP = Math.floor(Math.random() * teams.length);
  let pivot = INITIAL_PIVOT;
  let pivotTeam = teams[pivot];
  let partner = pivot + INITIAL_HOP;

  const listOfPairs = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numPresentMembers / 2; i++) {
    while (!pivotTeam.peekBack()) {
      pivot += 1;
      pivotTeam = teams[pivot];
    }
    const card1 = pivotTeam.pop();
    partner = i === 0 ? partner : (partner + 1) % teams.length;
    let partnerTeam = teams[partner];
    while (!partnerTeam.peekBack() && partner !== INITIAL_PIVOT) {
      partner = (partner + 1) % teams.length; // keep incrementing to reach a non-empty team
      partnerTeam = teams[partner];
    }
    // if reaching the INITIAL_PIVOT, skip to the current pivot plus 1
    if (partner === INITIAL_PIVOT) {
      partner = (pivot + 1) % teams.length;
      partnerTeam = teams[partner];
    }
    const card2 = partnerTeam.pop();
    listOfPairs.push({ card1, card2 });
    // console.log(i, {card1: card1, card2: card2})
  }
  // console.log(listOfPairs)
  return listOfPairs;
}
