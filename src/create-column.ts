import {
  isEmpty,
  calculateSize,
  getFlexItemStyles,
  stringifyStyles
} from './utils';
import { GridColumnOptions, KeyValuePair } from './types';

const defaultBreakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

const autoLayoutStyles = {
  'flex-grow': '1',
  'flex-basis': '0',
  'max-width': '100%'
};

/**
 * Create styles for a grid column.
 *
 * @param options
 */
export const createColumn = ({
  breakpoints = defaultBreakpoints,
  sizes = {},
  offsets = {},
  spacing = 0,
  auto = true
}: GridColumnOptions = {}) => {
  const styles: KeyValuePair = {};

  if (auto) {
    // Apply auto layout styles if sizes is empty and auto is true.
    if (isEmpty(sizes)) {
      styles['flex-grow'] = '1';
      styles['flex-basis'] = '0';
      styles['max-width'] = '100%';
    } else {
      styles['flex-grow'] = '0';
    }
  }

  if (spacing) {
    const padding = typeof spacing === 'number' ? `${spacing}px` : spacing;
    styles['padding'] = padding;
  }

  Object.entries(sizes)
    .filter(([media, size]) => {
      // Include only truthy size values, media that we actually
      // have an available breakpoint for and 'xs' by default.
      return (Boolean(size) && breakpoints[media]) || media === 'xs';
    })
    .forEach(([media, size]) => {
      const offset = offsets[media];
      const marginLeft =
        typeof offset !== 'undefined'
          ? { 'margin-left': `${calculateSize(offset)}%` }
          : {};

      const flex =
        size === true ? autoLayoutStyles : getFlexItemStyles(size as number);
      if (media === 'xs') {
        Object.assign(styles, { ...flex, ...marginLeft });
      } else {
        const width = breakpoints[media];
        const query = `@media (min-width: ${
          typeof width === 'number' ? `${width}px` : width
        })`;
        Object.assign(styles, {
          [query]: { ...flex, ...marginLeft }
        });
      }
    });

  return stringifyStyles(styles);
};
