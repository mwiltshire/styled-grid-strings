import { createColumn } from '../create-column';

describe('createColumn', () => {
  it('returns default auto layout styles when no options passed', () => {
    const styles = createColumn();

    const expectedStyles = `
      flex-grow: 1;
      flex-basis: 0;
      max-width: 100%;
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('returns empty string if only auto = false is specified', () => {
    const styles = createColumn({ auto: false });
    expect(styles).toBe('');
  });

  it('correctly applies grid spacing - number value type', () => {
    const styles = createColumn({ spacing: 15 });

    const expectedStyles = `
      flex-grow: 1;
      flex-basis: 0;
      max-width: 100%;
      padding: 15px;
  `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('correctly applies grid spacing - string value type', () => {
    const styles = createColumn({ spacing: '4rem' });

    const expectedStyles = `
      flex-grow: 1;
      flex-basis: 0;
      max-width: 100%;
      padding: 4rem;
  `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('returns correct CSS with xs size specified', () => {
    const styles = createColumn({ sizes: { xs: 4 } });

    const expectedStyles = `
      flex-grow: 0;
      flex-basis: 33.333333%;
      max-width: 33.333333%;
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('returns correct CSS with set sizes and default breakpoints', () => {
    const styles = createColumn({
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

  it('applies auto layout styles if size property is true', () => {
    const styles = createColumn({
      sizes: { sm: 12, md: true, lg: 4, xl: 3 }
    });

    const expectedStyles = `
      flex-grow: 0;
      @media (min-width: 576px) {
        flex-basis: 100%;
        max-width: 100%;
      }
      @media (min-width: 768px) {
        flex-grow: 1;
        flex-basis: 0;
        max-width: 100%;
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
    const styles = createColumn({
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
    const styles = createColumn({
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
    const styles = createColumn({
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
    const styles = createColumn({
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

  it('treats explicitly undefined sizes as empty', () => {
    const styles = createColumn({
      sizes: { sm: undefined, md: undefined, lg: undefined }
    });

    const expectedStyles = `
      flex-grow: 1;
      flex-basis: 0;
      max-width: 100%;
  `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });
});
