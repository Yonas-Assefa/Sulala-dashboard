type Args = {
  data: any;
  opt: { from: string; to: string; converter?: (item: any) => any }[];
};

export const customMapper = async ({ data, opt }: Args) => {
  const convert = (item: any) => {
    const convertedObj = {};
    opt.map((meta) => {
      if (meta.converter) {
        Object.assign(convertedObj, {
          [meta.to]: meta.converter(item[meta.from]),
        });
      } else {
        Object.assign(convertedObj, { [meta.to]: item[meta.from] });
      }
    });
    return convertedObj;
  };
  if (Array.isArray(data)) {
    return data.map((product: any) => {
      return convert(product);
    });
  } else {
    return convert(data);
  }
};
