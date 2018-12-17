import members from './data';

const constants = {
  members,
  MODE_START: 'unpaired',
  MODE_PAIRED: 'paired',
  MODE_REMOVE: 'remove',

  TEAMSTR_DS: 'Science',
  TEAMSTR_DEV: 'Dev',
  TEAMSTR_DESIGN: 'Design',
  TEAMSTR_COMMS: 'Comms',
  TEAMSTR_ACCSS: 'Accessibility',
  TEAMSTR_PARTNER: 'Partnerships',
  TEAMSTR_BLKCH: 'Blockchain',
  TEAMSTR_FUND: 'Fund',
  TEAMSTR_VR: 'VR/Events',
  TEAMSTR_OTHER: 'Others/Visitors',

  COLOR_ABSENT: ['#999999', '#999999'], // grey
  COLOR_DS: ['#ffcccc', '#ff9999'], // rose
  COLOR_DEV: ['#99ccff', '#0066cc'], // blue
  COLOR_DESIGN: ['#ff99cc', '#990099'], // fuschia
  COLOR_COMMS: ['#ffff99', '#999900'], // yellow
  COLOR_ACCSS: ['#ff6699', '#cc0033'], // red
  COLOR_PARTNER: ['#ffcc99', '#ff9900'], // orange
  COLOR_BLKCH: ['#99ffcc', '#009966'], // lime green
  COLOR_FUND: ['#ccccff', '#663399'], // lavender
  COLOR_VR: ['#99ff33', '#66cc00'], // green
  COLOR_OTHER: ['#dddddd', '#dddddd'], // silver
  // Other great colors if needed:
  // COLOR_: ["#9edfdf", "#339999"] // soft cyan
};
export default constants;
// [
//   {memberName: "Victoria", team: "Science", isAbsent: false},
//   {memberName: "Doug", team: "Science", isAbsent: false},
//   {memberName: "Eugene", team: "Science", isAbsent: false},
//   {memberName: "Hannah", team: "Science", isAbsent: false},
//   {memberName: "Hoang", team: "Science", isAbsent: false},
//   {memberName: "Helen", team: "Dev", isAbsent: false},
//   {memberName: "Henry", team: "Dev", isAbsent: false},
//   {memberName: "Kaity", team: "Dev", isAbsent: false},
//   {memberName: "Ken", team: "Design", isAbsent: false},
//   {memberName: "Lucas", team: "Design", isAbsent: false},
//   {memberName: "Kemma", team: "Design", isAbsent: false},
//   {memberName: "Tracy", team: "Comms", isAbsent: false},
//   {memberName: "Orange", team: "Comms", isAbsent: false},
//   {memberName: "Phoebe", team: "Accessibility", isAbsent: false},
//   {memberName: "Phoenix", team: "Partnerships", isAbsent: false},
//   {memberName: "Tina", team: "Partnerships", isAbsent: false},
//   {memberName: "Thea", team: "Blockchain", isAbsent: false},
//   {memberName: "Taylor", team: "Blockchain", isAbsent: false},
//   {memberName: "Lyz", team: "Blockchain", isAbsent: false},
//   {memberName: "Dylan", team: "Blockchain", isAbsent: false},
//   {memberName: "Anne", team: "Fund", isAbsent: false},
//   {memberName: "Quinn", team: "Fund", isAbsent: false},
//   {memberName: "KQ", team: "VR/Events", isAbsent: false},
//   {memberName: "Tori", team: "PM", isAbsent: false},
// ]
