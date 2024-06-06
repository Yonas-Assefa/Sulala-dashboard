export const animalMapper = async (data: any) => {
    function convert(item: any) {
        return {
            id: item.id,
            label: item.name,
            value: item.id,
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
