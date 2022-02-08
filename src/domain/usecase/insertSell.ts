import ISellRepository from "../../infra/repository/sell";
import Product from "../../models/product";
import Sell from "../../models/sell";
import SellPoint from "../../models/sellpoint";
import InsertSellError from "../errors/insertSellError";

export interface IInsertSellParams {
  repository: ISellRepository;
}
export interface IInsertSellExecuteParams {
  sellpoint: SellPoint;
  product: Product;
  value: number;
  date?: Date;
}
export default class InsertSell {
  repository: ISellRepository;
  constructor(params: IInsertSellParams) {
    this.repository = params.repository;
  }

  private parseParams = (params: IInsertSellExecuteParams): Sell => {
    let value = params;
    if (!params.date) {
      value.date = new Date();
    }
    return new Sell({
      fk_product: value.product.id,
      fk_sellpoint: value.sellpoint?.id,
      nm_value: value.value,
      dt_register: value.date,
    });
  };

  execute = async (params: IInsertSellExecuteParams[]): Promise<Sell[]> => {
    try {
      const result = await this.repository.insertManySell(
        params.map((item) => this.parseParams(item))
      );
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new InsertSellError(error.message);
      } else {
        throw new InsertSellError("umknown error");
      }
    }
  };
}
