import Sell from "../../models/sell";

export default interface ISellRepository {
  insertOneSell(params: Sell): Promise<Sell>;
  insertManySell(params: Sell[]): Promise<Sell[]>;
}
