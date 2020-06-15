import { createGrid, getGridContainerStyles, getGridItemStyles } from './index';

describe('createGrid', () => {
  it('returns object with style properties', () => {
    const { getGridContainerStyles, getGridItemStyles } = createGrid({
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

    expect(getGridContainerStyles()).toBe(expectedContainerStyles);
    expect(getGridItemStyles({ sizes: { xs: 12, md: 6, lg: 4, xl: 2 } })).toBe(
      expectedItemStyles
    );
  });
});

describe('getGridContainerStyles', () => {
  it('returns defaults when no options passed', () => {
    const styles = getGridContainerStyles();

    const expectedStyles = `
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('returns correct styles when direction option passed', () => {
    const styles = getGridContainerStyles({ direction: 'column' });

    const expectedStyles = `
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('returns correct styles when spacing option passed - number value type', () => {
    const styles = getGridContainerStyles({ spacing: 15 });

    const expectedStyles = `
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: -15px;
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('returns correct styles when spacing option passed - string value type', () => {
    const styles = getGridContainerStyles({ spacing: '4rem' });

    const expectedStyles = `
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: -4rem;
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });
});

describe('getGridItemStyles', () => {
  it('returns default auto layout styles when no options passed', () => {
    const styles = getGridItemStyles();

    const expectedStyles = `
      flex-grow: 1;
      flex-basis: 0;
      max-width: 100%;
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('returns empty string if only auto = false is specified', () => {
    const styles = getGridItemStyles({ auto: false });
    expect(styles).toBe('');
  });

  it('correctly applies grid spacing - number value type', () => {
    const styles = getGridItemStyles({ spacing: 15 });

    const expectedStyles = `
      flex-grow: 1;
      flex-basis: 0;
      max-width: 100%;
      padding: 15px;
  `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('correctly applies grid spacing - string value type', () => {
    const styles = getGridItemStyles({ spacing: '4rem' });

    const expectedStyles = `
      flex-grow: 1;
      flex-basis: 0;
      max-width: 100%;
      padding: 4rem;
  `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('returns correct CSS with xs size specified', () => {
    const styles = getGridItemStyles({ sizes: { xs: 4 } });

    const expectedStyles = `
      flex-grow: 0;
      flex-basis: 33.333333%;
      max-width: 33.333333%;
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('returns correct CSS with set sizes and default breakpoints', () => {
    const styles = getGridItemStyles({
      sizes: { sm: 12, md: 6, lg: 4, xl: 3 }
    });

    const expectedStyles = `
      flex-grow: 0;
      @media (min-width: 576px) {
        flex-basis: 100%;
        max-width: 100%;
      }
      @media (min-width: 768px) {
        flex-basis: 50%;
        max-width: 50%;
      }
      @media (min-width: 992px) {
        flex-basis: 33.333333%;
        max-width: 33.333333%;
      }
      @media (min-width: 1200px) {
        flex-basis: 25%;
        max-width: 25%;
      }
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('correctly applies column offsets', () => {
    const styles = getGridItemStyles({
      sizes: { xs: 12, md: 6, lg: 4, xl: 3 },
      offsets: { xs: 6, lg: 3 }
    });

    const expectedStyles = `
      flex-grow: 0;
      flex-basis: 100%;
      max-width: 100%;
      margin-left: 50%;
      @media (min-width: 768px) {
        flex-basis: 50%;
        max-width: 50%;
      }
      @media (min-width: 992px) {
        flex-basis: 33.333333%;
        max-width: 33.333333%;
        margin-left: 25%;
      }
      @media (min-width: 1200px) {
        flex-basis: 25%;
        max-width: 25%;
      }
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('returns correct CSS with set sizes and custom breakpoints - number value type', () => {
    const styles = getGridItemStyles({
      sizes: { sm: 12, md: 6, lg: 4, xl: 3 },
      breakpoints: { sm: 300, md: 400, lg: 500, xl: 600 }
    });

    const expectedStyles = `
      flex-grow: 0;
      @media (min-width: 300px) {
        flex-basis: 100%;
        max-width: 100%;
      }
      @media (min-width: 400px) {
        flex-basis: 50%;
        max-width: 50%;
      }
      @media (min-width: 500px) {
        flex-basis: 33.333333%;
        max-width: 33.333333%;
      }
      @media (min-width: 600px) {
        flex-basis: 25%;
        max-width: 25%;
      }
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('returns correct CSS with set sizes and custom breakpoints - string value type', () => {
    const styles = getGridItemStyles({
      sizes: { sm: 12, md: 6, lg: 4, xl: 3 },
      breakpoints: { sm: '20rem', md: '30rem', lg: '40rem', xl: '50rem' }
    });

    const expectedStyles = `
      flex-grow: 0;
      @media (min-width: 20rem) {
        flex-basis: 100%;
        max-width: 100%;
      }
      @media (min-width: 30rem) {
        flex-basis: 50%;
        max-width: 50%;
      }
      @media (min-width: 40rem) {
        flex-basis: 33.333333%;
        max-width: 33.333333%;
      }
      @media (min-width: 50rem) {
        flex-basis: 25%;
        max-width: 25%;
      }
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('returns correct CSS with full set of sizes but only limited custom breakpoints', () => {
    const styles = getGridItemStyles({
      sizes: { sm: 12, md: 6, lg: 4, xl: 3 },
      breakpoints: { sm: 300, lg: 500 }
    });

    const expectedStyles = `
      flex-grow: 0;
      @media (min-width: 300px) {
        flex-basis: 100%;
        max-width: 100%;
      }
      @media (min-width: 500px) {
        flex-basis: 33.333333%;
        max-width: 33.333333%;
      }
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });
});
