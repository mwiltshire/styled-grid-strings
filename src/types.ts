export type KeyValuePair = { [k: string]: any };

export type Media = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Sizes = {
  [k in Media]?: number | true;
};

export type Breakpoints = {
  [k in Media]?: string | number;
};

export type Offsets = {
  [k in Media]?: number;
};

export interface GridRowOptions {
  direction?: 'row' | 'column';
  spacing?: number | string;
}

export interface GridColumnOptions {
  breakpoints?: Breakpoints;
  sizes?: Sizes;
  offsets?: Offsets;
  spacing?: number | string;
  auto?: boolean;
}

export type GridOptions = GridRowOptions &
  Pick<GridColumnOptions, 'breakpoints'>;

export interface GridHelpers {
  row: () => string;
  column: (options: Pick<GridColumnOptions, 'sizes' | 'offsets'>) => string;
}
