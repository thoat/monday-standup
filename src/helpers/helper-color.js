import constants from '../constants';

export default function getCardColors(team) {
  switch (team) {
    case constants.TEAMSTR_DS: return constants.COLOR_DS;
    case constants.TEAMSTR_DEV: return constants.COLOR_DEV;
    case constants.TEAMSTR_DESIGN: return constants.COLOR_DESIGN;
    case constants.TEAMSTR_COMMS: return constants.COLOR_COMMS;
    case constants.TEAMSTR_ACCSS: return constants.COLOR_ACCSS;
    case constants.TEAMSTR_PARTNER: return constants.COLOR_PARTNER;
    case constants.TEAMSTR_BLKCH: return constants.COLOR_BLKCH;
    case constants.TEAMSTR_FUND: return constants.COLOR_FUND;
    case constants.TEAMSTR_VR: return constants.COLOR_VR;
    case constants.TEAMSTR_OTHER: return constants.COLOR_OTHER;
    default: return constants.COLOR_ABSENT;
  }
}
