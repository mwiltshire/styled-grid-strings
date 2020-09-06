<h1 align="center"> 📐 styled-grid-helpers</h1>

`styled-grid-helpers` is a set of utilities for generating the CSS for your grids and is designed to be used alongside tools like `emotion` and `styled-components`.

The helpers return CSS as a string, so you can pass it directly to `emotion`'s `css` prop, for example.

```js
import React from 'react';
import { css } from '@emotion/core';
import { createGrid } from 'styled-grid-helpers';

// Out of the box, without any configuration, you get
// a basic grid with each grid column sharing equal
// space in the grid row.
const { row, column } = createGrid();

const rowStyles = row();
const columnStyles = column();

export const Grid = () => {
  return (
    <div css={css(rowStyles)}>
      <div
        // You can also really easily incorporate your own styles
        css={css`
          ${columnStyles}
          background-color: tomato;
        `}
      >
        🎉 Column 1
      </div>
      <div css={css(columnStyles)}>🐷 Column 2</div>
      <div css={css(columnStyles)}>🎸 Column 3</div>
    </div>
  );
};
```

## Breakpoints

Breakpoints can be set for the sizes `sm`, `md`, `lg` and `xl`, e.g.

```js
const breakpoints = {
  // Passing a number will apply a pixel value.
  sm: 400,
  // You can also pass a string if you need to use other units.
  md: '40em',
  lg: 800,
  xl: 1000
};
```

All sizes are optional, so you can just pass the ones you need.

By default, the following breakpoints will be applied whenever the `breakpoints` option is not provided:

- `sm`: 576px
- `md`: 768px
- `lg`: 992px
- `xl`: 1200px

## Column Sizes

Like most grid libraries, numbers are used to specify the size of a column at each breakpoint. The number corresponds to the amount of individual spaces the column will occupy in the 12-column grid, e.g.:

```js
const sizes = {
  // 100% of the row width
  sm: 12,
  // 50% of the row width
  md: 6,
  // 33.33% of the row width
  lg: 4,
  // 25% of the row width.
  xl: 3
};
```

## API Reference

### **`createGrid(options?: GridOptions): GridHelpers`**

**Options**

- `breakpoints?: Breakpoints` - Responsive grid breakpoints. See [breakpoints](#breakpoints) for information on the default configuration.
- `direction?: 'row' | 'column'` - Flex direction for the grid container row. Default `'row'`.
- `spacing?: number | string` - Grid container row and column spacing. The value will be applied as negative margin for the container row and as padding for the column. If a `number` is passed, this will be used as a pixel value. Other units can be applied by passing a `string`, e.g. `'0.5rem'`.
- `auto?: boolean` - Whether or not grid column items equally share available space in the row. Default `true`.

**Returns**

...an object containing two properties:

- `row` - Helper function for generating grid container row CSS string.
- `column` - Helper function for generating grid column CSS string.

While the `row` function takes no arguments, the `column` function can take an options object for further configuration. You'll want to make use of this if you want your columns to be fully responsive.

**`column` options**

- `sizes?: Sizes` - The column size to be applied at each corresponding breakpoint.
- `offsets?: Offsets` - The column offset to be applied at each corresponding breakpoint.

**Example**

```js
import React from 'react';
import { css } from '@emotion/core';
import { createGrid } from 'styled-grid-helpers';

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

const sizes = {
  // Each column will take up the full width on small devices.
  sm: 12,
  // Each column will take up 50% of the width on medium devices.
  md: 6,
  // Each column will take up 25% of the width on large devices.
  lg: 3
};

const offsets = {
  // Each column is already set to take up 25% of the width on
  // on large devices. Applying this offset will add a left
  // margin of 25% to desired corresponding column.
  lg: 3
};

const { row, column } = createGrid({
  breakpoints,
  // Apply -15px margin to the container row and 15px padding to
  // each grid column.
  spacing: 15
});

const rowStyles = row();
const offsetColumnStyles = column({ sizes, offsets });
const columnStyles = column({ sizes });

export const Grid = () => {
  return (
    <div css={css(rowStyles)}>
      <div css={css(offsetColumnStyles)}>🎉 Column 1</div>
      <div css={css(columnStyles)}>🐷 Column 2</div>
      <div css={css(columnStyles)}>🎸 Column 3</div>
    </div>
  );
};
```

### **`createRow(options?: GridRowOptions): string`**

**Options**

- `direction?: 'row' | 'column'` - Flex direction for the grid container row. Default `'row'`.
- `spacing?: number | string` - Grid column spacing. The value will be added as padding on the column. If a `number` is passed, this will be used as a pixel value. Other units can be applied by passing a `string`, e.g. `'0.5rem'`.

**Returns**

The grid row CSS as a `string`.

**Example**

```js
import React from 'react';
import { css } from '@emotion/core';
import { createRow } from 'styled-grid-helpers';

const rowStyles = createRow({ spacing: 15 });

export const Row = ({ children }) => {
  return <div css={css(rowStyles)}>{children}</div>;
};
```

### **`createColumn(options?: GridColumnOptions): string`**

**Options**

- `breakpoints?: Breakpoints` - The breakpoints that will be applied for the column. See [breakpoints](#breakpoints) for information on the default configuration.
- `sizes?: Sizes` - The column size to be applied at each corresponding breakpoint.
- `offsets?: Offsets` - The column offset to be applied at each corresponding breakpoint.
- `spacing?: number | string` - Grid container row and column spacing. The value will be applied as negative margin for the container row and as padding for the column.
- `auto?: boolean` - Whether or not grid column items equally share available space in the row. Default `true`.

**Returns**

The grid column CSS as a `string`.

**Example**

```js
import React, { useMemo } from 'react';
import { css } from '@emotion/core';
import { createColumn } from 'styled-grid-helpers';

export const Column = ({
  sm,
  md,
  lg,
  xl,
  smOffset,
  mdOffset,
  lgOffset,
  xlOffset,
  children
}) => {
  const columnStyles = useMemo(() => {
    const sizes = { sm, md, lg, xl };
    const offsets = {
      sm: smOffset,
      md: mdOffset,
      lg: lgOffset,
      xl: xlOffset
    };

    return createColumn({ sizes, offsets, spacing: 15 });
  }, [sm, md, lg, xl, smOffset, mdOffset, lgOffset, xlOffset]);

  return <div css={css(columnStyles)}>{children}</div>;
};
```
