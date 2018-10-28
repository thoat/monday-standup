import config from '../config'

export function getCardColors(team) {
  switch(team) {
    case config.TEAMSTR_DS: return config.COLOR_DS
    case config.TEAMSTR_DEV: return config.COLOR_DEV
    case config.TEAMSTR_DESIGN: return config.COLOR_DESIGN
    case config.TEAMSTR_COMMS: return config.COLOR_COMMS
    case config.TEAMSTR_ACCSS: return config.COLOR_ACCSS
    case config.TEAMSTR_PARTNER: return config.COLOR_PARTNER
    case config.TEAMSTR_BLKCH: return config.COLOR_BLKCH
    case config.TEAMSTR_FUND: return config.COLOR_FUND
    case config.TEAMSTR_VR: return config.COLOR_VR
    case config.TEAMSTR_OTHER: return config.COLOR_OTHER
    default: return config.COLOR_ABSENT
  }
}
