export default class InsertSellError extends Error {
  constructor(reason: string) {
    super(reason);
  }
}
