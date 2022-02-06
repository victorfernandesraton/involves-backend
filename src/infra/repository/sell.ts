import Product from "../../models/product";
import Sell from "../../models/sell";
import SellPoint from "../../models/sellpoint";

export interface ISellRepositoryInsertOneParams {
  sellpoint: SellPoint;
  product: Product;
  date: Date;
  value: number;
}
export default interface ISellRepository {
  insertOneSell(params: ISellRepositoryInsertOneParams): Promise<Sell>;
  insertManySell(params: ISellRepositoryInsertOneParams[]): Promise<Sell[]>;
}
