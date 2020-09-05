import { createRow } from '../create-row';

describe('getGridContainerStyles', () => {
  it('returns defaults when no options passed', () => {
    const styles = createRow();

    const expectedStyles = `
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('returns correct styles when direction option passed', () => {
    const styles = createRow({ direction: 'column' });

    const expectedStyles = `
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('returns correct styles when spacing option passed - number value type', () => {
    const styles = createRow({ spacing: 15 });

    const expectedStyles = `
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: -15px;
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });

  it('returns correct styles when spacing option passed - string value type', () => {
    const styles = createRow({ spacing: '4rem' });

    const expectedStyles = `
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: -4rem;
    `.replace(/\s{2,}/g, '');

    expect(styles).toBe(expectedStyles);
  });
});
