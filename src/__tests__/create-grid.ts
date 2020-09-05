import { createGrid } from '../create-grid';

describe('createGrid', () => {
  it('returns object with row and column helpers', () => {
    const { row, column } = createGrid({
      spacing: 15,
      breakpoints: { sm: 600, md: 960, lg: 1280, xl: 1920 }
    });

    const expectedContainerStyles = `
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: -15px;
    `.replace(/\s{2,}/g, '');

    const expectedItemStyles = `
      flex-grow: 0;
      padding: 15px;
      flex-basis: 100%;
      max-width: 100%;
      @media (min-width: 960px) {
        flex-basis: 50%;
        max-width: 50%;
      }
      @media (min-width: 1280px) {
        flex-basis: 33.333333%;
        max-width: 33.333333%;
      }
      @media (min-width: 1920px) {
        flex-basis: 16.666667%;
        max-width: 16.666667%;
      }
    `.replace(/\s{2,}/g, '');

    expect(row()).toBe(expectedContainerStyles);
    expect(column({ sizes: { xs: 12, md: 6, lg: 4, xl: 2 } })).toBe(
      expectedItemStyles
    );
  });
});
