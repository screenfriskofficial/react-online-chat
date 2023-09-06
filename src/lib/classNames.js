export const classNames = (cls, mode = {}, additional = []) => {
  return [
    cls,
    ...additional,
    ...Object.entries(mode)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => String(className)),
  ].join(" ");
};
