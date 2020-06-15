type KeyValuePair = { [k: string]: any };

type Media = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Sizes = {
  [k in Media]?: number;
};

export type Breakpoints = {
  [k in Media]?: string | number;
};

export type Offsets = {
  [k in Media]?: number;
};

export interface GridContainerOptions {
  direction?: 'row' | 'column';
  spacing?: number | string;
}

export interface GridItemOptions {
  breakpoints?: Breakpoints;
  sizes?: Sizes;
  offsets?: Offsets;
  spacing?: number | string;
  auto?: boolean;
}

const defaultBreakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

// Keep 7 significant numbers. Comes directly from Material UI
// grid implementation.
const calculateSize = (n: number) => Math.round((n / 12) * 10e7) / 10e5;

const isEmpty = (obj) => Object.entries(obj).length === 0;

const getFlexItemStyles = (size: number) => {
  const width = calculateSize(size);
  return {
    'flex-basis': `${width}%`,
    'max-width': `${width}%`
  };
};

const stringifyStyles = (styles: KeyValuePair): string =>
  Object.entries(styles)
    .map(([k, v]) => {
      if (typeof v !== 'string') {
        return `${k} {${stringifyStyles(v)}}`;
      }
      return `${k}: ${v};`;
    })
    .join('');

export const getGridContainerStyles = ({
  direction = 'row',
  spacing = 0
}: GridContainerOptions = {}) => {
  const styles: KeyValuePair = {
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

export const getGridItemStyles = ({
  breakpoints = defaultBreakpoints,
  sizes = {},
  offsets = {},
  spacing = 0,
  auto = true
}: GridItemOptions = {}) => {
  const styles: KeyValuePair = {};

  if (auto) {
    // Apply auto layout styles if sizes is empty and
    // auto is true.
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
    .forEach(([breakpoint, size]: [string, number]) => {
      const marginLeft = offsets[breakpoint]
        ? { 'margin-left': `${calculateSize(offsets[breakpoint])}%` }
        : {};

      if (breakpoint === 'xs') {
        Object.assign(styles, {
          'flex-basis': `${calculateSize(size)}%`,
          'max-width': `${calculateSize(size)}%`,
          ...marginLeft
        });
      } else {
        const width = breakpoints[breakpoint];
        const query = `@media (min-width: ${
          typeof width === 'number' ? `${width}px` : width
        })`;
        Object.assign(styles, {
          [query]: { ...getFlexItemStyles(size), ...marginLeft }
        });
      }
    });

  return stringifyStyles(styles);
};

export const createGrid = ({
  breakpoints,
  direction,
  spacing
}: GridContainerOptions & Pick<GridItemOptions, 'breakpoints'> = {}) => {
  return {
    getGridContainerStyles: () =>
      getGridContainerStyles({ direction, spacing }),
    getGridItemStyles: ({
      sizes,
      offsets
    }: Pick<GridItemOptions, 'sizes' | 'offsets'>) =>
      getGridItemStyles({ breakpoints, sizes, offsets, spacing })
  };
};
