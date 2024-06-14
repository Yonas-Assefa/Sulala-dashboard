import { constructImageUrl } from "@/lib/images";

export const brandMapper = async (data: any) => {
    function convert(item: any) {
        return {
            id: item.id,
            label: item.name,
            value: item.id,
            image: constructImageUrl(item.image, true),
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
