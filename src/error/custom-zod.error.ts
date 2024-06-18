export class CustomZodError extends Error {
  fieldErrors: any;
  errors: any[];
  constructor(fieldErrors: any) {
    super("CustomZodError");
    this.name = "CustomZodError";
    this.fieldErrors = fieldErrors;
    this.errors = Object.keys(fieldErrors).map((key) => ({
      field: key,
      message: fieldErrors[key][0],
    }));
  }

  flatten() {
    return {
      fieldErrors: this.fieldErrors,
      message: this.message,
    };
  }
}
