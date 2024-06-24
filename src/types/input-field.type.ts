export type SelectInputSchema = {
  value: string;
  label: string;
  image?: string;
  disabled?: boolean;
  options?: {
    value: string;
    label: string;
    disabled?: boolean;
  }[];
};

export type InputMeta = {
  id: string;
  type: "select" | "text";
  placeholder: string;
  options?: string[];
  label: string;
  props?: object;
};

export type RadioInputOptions = {
  id: string;
  label: string;
  value: string;
  input?: InputMeta | InputMeta[];
};

export type RadioInputSchema = RadioInputOptions & {
  options: RadioInputOptions[];
};

export enum MeasurementUnits {
  KG = "KG",
  MG = "MG",
  G = "G",
  LB = "LB",
  OZ = "OZ",
  L = "L",
  ML = "ML",
  CUBIC_M = "CUBIC_M",
  CUBIC_CM = "CUBIC_CM",
}

export enum ProductStatus {
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  DRAFT = "DRAFT",
  ARCHIVED = "ARCHIVED",
}
