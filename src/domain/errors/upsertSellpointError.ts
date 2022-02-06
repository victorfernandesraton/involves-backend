export default class UpsertSellPointError extends Error {
  constructor(reason: string) {
    super(reason);
  }
}
