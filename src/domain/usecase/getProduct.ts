import { IProductRepository } from "../../infra/repository/product";
import GetProductError from "../errors/getProductError";

interface IGetProductParams {
  repository: IProductRepository;
}
interface IGetProductExecuteParams {
  name?: string;
  id?: string;
  ean?: string;
}

export default class GetProduct {
  repository: IProductRepository;
  constructor(params: IGetProductParams) {
    this.repository = params.repository;
  }

  execute = async (parmas: IGetProductExecuteParams) => {
    try {
      return this.repository.getProducts(parmas);
    } catch (error) {
      if (error instanceof Error) {
        throw new GetProductError(error.message);
      } else {
        throw new GetProductError("uknow error");
      }
    }
  };
}
