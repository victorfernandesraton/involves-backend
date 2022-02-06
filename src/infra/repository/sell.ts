import Product from "../../models/product";
import Sell from "../../models/sell";
import SellPoint from "../../models/sellpoint";

export default interface ISellRepository {
  insertOneSell(params: Sell): Promise<Sell>;
  insertManySell(params: Sell[]): Promise<Sell[]>;
}
