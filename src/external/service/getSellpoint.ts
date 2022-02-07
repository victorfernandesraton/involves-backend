import IAuditSellPointRepository from "../../audit/infra/repository/auditSellpoint";
import SellPoint from "../../models/sellpoint";

export interface IGetSellPointParams {
  audit: IAuditSellPointRepository;
  id: string;
}
export default abstract class GetSellPoint {
  readonly id: string;
  audit: IAuditSellPointRepository;
  constructor(params: IGetSellPointParams) {
    this.id = params.id;
    this.audit = params.audit;
  }

  abstract getSellPointByCnpj(productId: string): Promise<SellPoint>;
  abstract getSellPointsByChain(chainUniqueName: string): Promise<SellPoint[]>;
}
