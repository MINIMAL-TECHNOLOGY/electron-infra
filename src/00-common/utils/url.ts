export const stringify = (params = {}) => {
  const rs = new URLSearchParams(params);
  return rs.toString();
};

export const parse = (searchString: string) => {
  const rs = {};
  const searchParams = new URLSearchParams(searchString);
  for (const [key, value] of searchParams) {
    rs[key] = value;
  }

  return rs;
};
