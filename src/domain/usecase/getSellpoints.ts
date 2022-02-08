import { ISellPointRepository } from "../../infra/repository/sellPoint";
import GetSellpointError from "../errors/getSellPointsError";

interface IGetSellPointParams {
  repository: ISellPointRepository;
}
interface IGetSellPointExecuteParams {
  cnpj?: string;
  chain?: string;
  name?: string;
}

export default class GetSellPoint {
  repository: ISellPointRepository;
  constructor(params: IGetSellPointParams) {
    this.repository = params.repository;
  }

  execute = async (parmas: IGetSellPointExecuteParams) => {
    try {
      return this.repository.getSellPoints(parmas);
    } catch (error) {
      if (error instanceof Error) {
        throw new GetSellpointError(error.message);
      } else {
        throw new GetSellpointError("uknow error");
      }
    }
  };
}
