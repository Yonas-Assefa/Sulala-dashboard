import { FormState } from "@/utils/formStateHelper";

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
    breadcrumb?: boolean | undefined;
}

type FilterData = string[]

type Actions = {
    edit?: boolean;
    delete?: boolean;
    promote?: boolean;
    toggle?: boolean;
    detail?: boolean;
}

type ActionOptions = {
    edit?: {
        searchParams?: { key: string, value?: string, fromItem?: { itemKey?: string, valueDict?: { key: string, value: string }[] } }[],
        params?: { absolute?: boolean, value: string }
    },
    toggle?: {
        action: (formData: FormData) => Promise<FormState>
        key: string
        active: string
        formData: { formDataKey: string, itemKey: string }[]
    },
    delete?: {
        action: (formData: FormData) => Promise<FormState>
        formData: { formDataKey: string, searchKey: string }[]
    },
    search?: {
        action: (formData: FormData) => Promise<FormState>
    }
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

export type { Schema, FilterData, TableSchema, Actions, Data, SortData, SortSchema, ActionOptions }