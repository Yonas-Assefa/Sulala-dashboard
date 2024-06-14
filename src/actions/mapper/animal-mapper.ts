type Animal = {
  id: number;
  animal_family?: string;
  animal_type?: string;
  name: string;
};

export const animalMapper = (data: Animal[]) => {
  function convert(item: Animal) {
    return {
      id: JSON.stringify({
        id: item?.id,
        animal_type: item?.animal_family || item?.animal_type,
        name: item?.name,
      }),
      label: `${item.name} (${(item?.animal_family || item.animal_type)?.toString()?.toLowerCase()})`,
      value: JSON.stringify({
        id: item?.id,
        animal_type: item?.animal_family || item?.animal_type,
        name: item?.name,
      }),
    };
  }
  if (Array.isArray(data)) {
    return data.map((billing: Animal) => {
      return convert(billing);
    });
  } else {
    return convert(data);
  }
};
