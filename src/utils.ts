// Keep 7 significant numbers. Comes directly from Material UI
// grid implementation.
export const calculateSize = (n: number) => Math.round((n / 12) * 10e7) / 10e5;

export const isEmpty = (obj) => Object.values(obj).filter(Boolean).length === 0;

export const getFlexItemStyles = (size: number) => {
  const width = calculateSize(size);
  return {
    'flex-basis': `${width}%`,
    'max-width': `${width}%`
  };
};

export const stringifyStyles = (styles: Record<string, any>): string =>
  Object.entries(styles)
    .map(([k, v]) => {
      if (typeof v !== 'string') {
        return `${k} {${stringifyStyles(v)}}`;
      }
      return `${k}: ${v};`;
    })
    .join('');
