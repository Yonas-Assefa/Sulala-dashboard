export const animalMapper = async (data: any) => {
    function convert(item: any) {
        return {
            id: JSON.stringify(item),
            label: `${item.name} (${item.animal_family?.toString()?.toLowerCase()})`,
            value: JSON.stringify(item),
        };
    }
    if (Array.isArray(data)) {
        return data.map((billing: any) => {
            return convert(billing);
        });
    } else {
        return convert(data);
    }
};
