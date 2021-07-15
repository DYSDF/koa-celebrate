export default class CelebrateError extends Error {
  status: number

  errors: Error[]

  constructor(errors: Error[]) {
    const message = errors
      .map(e => e.message)
      .join(", ")
      .replace(/"/g, "");
    super(message);
    this.status = 400;
    this.errors = errors;
  }
}
