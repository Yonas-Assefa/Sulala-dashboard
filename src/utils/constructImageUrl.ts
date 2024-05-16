type ReturnTypeBasedOnReturnOne<ReturnOne extends boolean, T> = ReturnOne extends true ? string : T;


export const constructImageUrl = <ReturnOne extends boolean>(
    image_obj: string | string[],
    returnOne?: ReturnOne
): ReturnTypeBasedOnReturnOne<ReturnOne, string | string[]> => {
    const NEXT_BACKEND_BASE_URL = process.env.NEXT_BACKEND_BASE_URL;

    if (!NEXT_BACKEND_BASE_URL) {
        const no_image = returnOne ? '/images/no-image.png' : ['/images/no-image.png'];
        return no_image as ReturnTypeBasedOnReturnOne<ReturnOne, string | string[]>;
    }
    console.log({ NEXT_BACKEND_BASE_URL });
    const image_base_url = NEXT_BACKEND_BASE_URL?.endsWith('/')
        ? NEXT_BACKEND_BASE_URL.slice(0, -1)
        : NEXT_BACKEND_BASE_URL;

    if (returnOne) {
        return Array.isArray(image_obj) ? `${image_base_url}${image_obj[0]}` : `${image_base_url}${image_obj}` as ReturnTypeBasedOnReturnOne<ReturnOne, string | string[]>;
    }

    return Array.isArray(image_obj)
        ? image_obj.map((image) => `${image_base_url}${image}`) as ReturnTypeBasedOnReturnOne<ReturnOne, string | string[]>
        : `${image_base_url}${image_obj}` as ReturnTypeBasedOnReturnOne<ReturnOne, string | string[]>;
};