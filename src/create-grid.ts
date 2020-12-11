import { createRow } from './create-row';
import { createColumn } from './create-column';
import { GridOptions, GridFunctions } from './types';

/**
 * Configure grid breakpoints, direction and spacing options.
 *
 * This function returns an object containing two helpder functions,
 * `row` and `column`, configured to use the options you passed.
 *
 * `column` can take further options, `sizes` and `offsets` to
 * configure properties for a specific grid column.
 *
 * @param options
 */
export const createGrid = ({
  breakpoints,
  direction,
  spacing
}: GridOptions = {}): GridFunctions => {
  return {
    row: () => createRow({ direction, spacing }),
    column: ({ sizes, offsets } = {}) =>
      createColumn({ breakpoints, sizes, offsets, spacing })
  };
};
