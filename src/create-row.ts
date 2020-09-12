import { stringifyStyles } from './utils';
import { GridRowOptions } from './types';

/**
 * Create styles for the grid container row.
 *
 * @param options
 */
export const createRow = ({
  direction = 'row',
  spacing = 0
}: GridRowOptions = {}) => {
  const styles: Record<string, any> = {
    display: 'flex',
    'flex-direction': direction,
    'flex-wrap': 'wrap'
  };

  if (spacing) {
    styles.margin =
      typeof spacing === 'number' ? `-${spacing}px` : `-${spacing}`;
  }

  return stringifyStyles(styles);
};
