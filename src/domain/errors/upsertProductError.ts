export default class UpsertProductError extends Error {
  constructor(reason: string) {
    super(reason);
  }
}
