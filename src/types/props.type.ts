import { ChangeEventHandler } from "react";
import {
  MeasurementUnits,
  RadioInputSchema,
  SelectInputSchema,
} from "./input-field.type";

type BaseInputProps = {
  id?: string;
  placeholder?: string;
  label?: string;
  name?: string;
  autoComplete?: string;
  error?: string;
  value?: string;
  defaultValue?: string;
  setValue?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
};

export type TextInputProps = BaseInputProps & {
  type?: "text" | "email" | "password" | "number";
  dynamicPlaceholder?: boolean;
};

export type WeightVolumeInputProps = TextInputProps & {
  unit?: MeasurementUnits;
};

export type SelectInputProps = Omit<BaseInputProps, "defaultValue"> & {
  multi?: boolean;
  options?: string[];
  defaultValue?:
    | string
    | { value: string; label: string }
    | { value: string; label: string }[]
    | null;
};

export type CustomSelectInputProps = Omit<BaseInputProps, "defaultValue"> & {
  multi?: boolean;
  nested?: boolean;
  withImage?: boolean;
  options?: string[];
  data?: SelectInputSchema[];
  searchable?: boolean;
  defaultValue?: string | number | string[] | number[];
  onChange?: (value: string | number | string[] | number[]) => void;
  className?: string;
  inputAreaOnly?: boolean;
};

export type ColorPaletteInputProps = Omit<BaseInputProps, "defaultValue"> & {
  multi?: boolean;
  nested?: boolean;
  withImage?: boolean;
  options?: string[];
  data?: SelectInputSchema[];
  searchable?: boolean;
  defaultValue?: string | number | string[] | number[];
  onChange?: (val: string[]) => void;
  className?: string;
  inputAreaOnly?: boolean;
};

export type CustomRadioInputProps = {
  inputForEach?: boolean;
  showLabel?: boolean;
  id: string;
  name: string;
  data: unknown;
  setValue?: (value: string) => void;
  value?: string;
  error?: string;
  childError?: any;
  childValue?: any;
  childSetValue?: any;
  childOptions?: any;
  childDefaultValue?: any;
  childDisabled?: any;
  defaultValue?: string;
  required?: boolean;
};

type AcceptFileFormate =
  | "image/*"
  | "audio/*"
  | "video/*"
  | "application/pdf"
  | "application/msword"
  | ".pdf"
  | ".jpeg"
  | ".png"
  | ".jpg"
  | ".doc"
  | ".docx"
  | ".xls"
  | ".xlsx"
  | ".csv"
  | ".txt";

export type FileInputProps = Pick<
  BaseInputProps,
  "label" | "name" | "error" | "id"
> & {
  accept: AcceptFileFormate[];
  handleFile?: ChangeEventHandler<HTMLInputElement>;
  file?: File | null;
  sizeLimit?: {
    value: number;
    unit: "KB" | "MB" | "GB" | "TB";
  };
  setValue?: (value: File | null | undefined) => void;
};

export type SignupProps = {
  searchParams: {
    by: "phone" | "email" | undefined;
  };
  params: { lang: string };
};

export type TableProps = {
  searchParams: {
    search: string | undefined;
    filter: string | undefined;
    sort: string | undefined;
    sort_by: string | undefined;
    page: string | undefined;
    page_size: string | undefined;
  };
};
