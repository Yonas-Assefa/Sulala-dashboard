type Schema = {
    key: string;
    title: string;
    type: string;
    badge?: boolean | undefined;
    schema_colors?: Record<string, string> | undefined;
    image?: boolean | undefined;
    image_key?: string | undefined;
    tooltips?: string | undefined;
    dropdown?: boolean | undefined;
    dropdown_data?: { label: string, data: Record<string, string>[] } | undefined;
}

type FilterData = string[]

type Actions = {
    edit: boolean;
    delete: boolean;
    promote: boolean;
    toggle: boolean;
}

type TableSchema = {
    include: {
        checkbox: boolean;
        actions?: Actions;
    };
    schema: Schema[];
}

type Data = Record<string, any>[]

type SortData = {
    label: string,
    value: string
}

type SortSchema = SortData[]

export type { Schema, FilterData, TableSchema, Actions, Data, SortData, SortSchema }