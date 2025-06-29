type TAnimal = {
  id: number;
  animal_family?: string;
  animal_type?: string;
  name: string;
};

// export const animalMapper = (data: TAnimal[] | TAnimal) => {
export const animalMapper = (data: any) => {
  function convert(item: TAnimal) {
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
    return data.map((billing: TAnimal) => {
      return convert(billing);
    });
  } else {
    return convert(data);
  }
};
