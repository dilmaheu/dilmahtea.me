export class PublicError extends Error {
  private: false;

  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);

    this.private = false;
  }
}
