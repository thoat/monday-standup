import { bool, shape, string } from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const cardType = shape({
  memberName: string.isRequired,
  team: string.isRequired,
  isAbsent: bool.isRequired,
  id: string.isRequired,
});
