/*
INPUT: an array of cards or members
[
  {personName: String, team: String, isAbsent: boolean},
  {personName: String, team: String, isAbsent: boolean},
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
1. Create a max-heap of on-site team sizes. Each heap node stores {name: teamName, value: teamSize}.

2. Create a hash from this heap: {key: teamName, value: i} with i being an incrementing index. What that means: the first teamName to be popped from the heap will have an i=0, the next teamName i=1, and so on.

3. Start building a (sorted) array of stacks. Each stack represents a team. How?
  3a. Iterate through the memberArray
  3b. If the member is not absent, look up the member's teamName in the Hash created at step 2 in order to push the member to the correct stack.
    let stacks = []
    memberArray.forEach(member => {
      if (!member.isAbsent)
        stacks[hashtbl.get(member.teamName)].push(member)
    })

=== B: Pair Randomly ===
1. Essential variables:
    const INITIAL_PIVOT = 0 (the index of the biggest-sized team)
    const INITIAL_HOP = a random number between 0 and no. of teams
    let pivot = 0
    let pivotStack = stacks[pivot]
    let partner = pivot + INITIAL_HOP
2.
  Loop k times, with k being half the number of members present.
  pivot is where we get card1. partner is where we get card2.
  In each iteration:
    while pivotStack is empty {
      keep incrementing pivot
    }
    let card1 = pivotStack.pop()
    increment partner, unless this is the very first loop
    while (partnerStack is empty && partner !== INITIAL_PIVOT) {
      keep incrementing partner to reach a non-empty stack
    }
    if partner reaches the INITIAL_PIVOT, skip to the current pivot plus 1
    let card2 = partnerStack.pop()
    save {card1: card1, card2: card2}
*/

import MaxHeap from "collections/heap"
import Stack from "collections/shim-array"
Stack.prototype.peek = Stack.prototype.peekBack // override this method to make this data structure resemble a traditional stack

export function yieldThePairs(memberList) {
  const MEMBERS = memberList

// === build the heap ===

// first, count the number of members in each team and store those into a hash
  let numPresentMembers = 0
  let teamSizeHash = MEMBERS.reduce((h, member) => {
    if (!member.isAbsent) {
      numPresentMembers++
      if (!h[member.team]) {
        h[member.team] = 0
      }
      h[member.team]++
    }
    return h
  }, {})

// push the size values into the heap
  let teamSizeHeap = new MaxHeap(
    Object.entries(teamSizeHash),
    null,
    (teamA, teamB) => teamA[1] - teamB[1] // index 0 stores the team name, index 1 stores the team size
  )

// === build the array of teamStacks ===

// first, obtain the index i.e. where each team should be located in the array
  let teamIndexHash = {}
  let i = 0
  while (teamSizeHeap.length) { // while heap is not empty
    let team = teamSizeHeap.pop()
    teamIndexHash[team[0]] = i
    i++
  }

// build the stacks and put them in the correct array index
  let stacks = []
  MEMBERS.forEach(member => {
    if (!member.isAbsent) {
      let teamName = member.team
      if (!stacks[teamIndexHash[teamName]])
        stacks[teamIndexHash[teamName]] = new Stack()
      stacks[teamIndexHash[teamName]].push(member)
    }
  })

// === pairing ===
  const INITIAL_PIVOT = 0 // the index of the biggest-sized team
  const INITIAL_HOP = Math.floor(Math.random() * stacks.length)
  let pivot = INITIAL_PIVOT
  let pivotStack = stacks[pivot]
  let partner = pivot + INITIAL_HOP

  let listOfPairs = []
  for (let i = 0; i < numPresentMembers/2; i++) {
    while (!pivotStack.peek()) {
      pivot++
      pivotStack = stacks[pivot]
    }
    let card1 = pivotStack.pop()
    partner = i === 0 ? partner : (partner + 1) % stacks.length
    let partnerStack = stacks[partner]
    while (!partnerStack.peek() && partner !== INITIAL_PIVOT) {
      partner = (partner + 1) % stacks.length // keep incrementing to reach a non-empty stack
      partnerStack = stacks[partner]
    }
    if (partner === INITIAL_PIVOT) { // if reaching the INITIAL_PIVOT, skip to the current pivot plus 1
      partner = pivot + 1
      partnerStack = stacks[partner]
    }
    let card2 = partnerStack.pop()
    listOfPairs.push({card1: card1, card2: card2})
    // console.log(i, {card1: card1, card2: card2})
  }
  console.log(listOfPairs)
  return listOfPairs
}
