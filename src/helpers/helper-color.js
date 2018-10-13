export function getCardColors(team) {
  switch(team) {
    case "Science": return COLOR_DS
    case "Dev": return COLOR_DEV
    case "Design": return COLOR_DESIGN
    case "Comms": return COLOR_COMMS
    case "Accessibility": return COLOR_ACCSS
    case "Partnerships": return COLOR_PARTNER
    case "Blockchain": return COLOR_BLKCH
    case "Fund": return COLOR_FUND
    case "VR/Events": return COLOR_VR
    case "Others/Visitors": return COLOR_OTHER
    default: return COLOR_ABSENT
  }
}

const COLOR_DS = ["#ffcccc", "#ff9999"] // rose
const COLOR_DEV = ["#99ccff", "#0066cc"] // blue
const COLOR_DESIGN = ["#ff99cc", "#990099"] // fuschia
const COLOR_COMMS = ["#ffff99", "#999900"] // yellow
const COLOR_ACCSS = ["#ff6699", "#cc0033"] // red
const COLOR_PARTNER = ["#ffcc99", "#ff9900"] // orange
const COLOR_BLKCH = ["#99ffcc", "#009966"] // lime green
const COLOR_FUND = ["#ccccff", "#663399"] // lavender
const COLOR_VR = ["#99ff33", "#66cc00"] // green
const COLOR_OTHER = ["#dddddd", "#dddddd"] // silver
const COLOR_ABSENT = ["#999999", "#999999"] // grey

// Other great colors if needed:
// const COLOR_ = ["#9edfdf", "#339999"] // soft cyan
