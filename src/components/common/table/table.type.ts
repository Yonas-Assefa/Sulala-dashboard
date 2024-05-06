type Schema = {
    key: string;
    title: string;
    type: string;
    badge?: boolean | undefined;
    schema_colors?: Record<string, string> | undefined;
    image?: boolean | undefined;
    image_key?: string | undefined;
    tooltips?: string | undefined;
}

type TabSchema = string[]

type Actions = {
    edit: boolean;
    delete: boolean;
    promote: boolean;
    toggle: boolean;
}

type TableSchema = {
    include: {
        checkbox: boolean;
        actions: Actions;
    };
    schema: Schema[];
}

type MockData = Record<string, any>[]

export type { Schema, TabSchema, TableSchema, Actions, MockData }