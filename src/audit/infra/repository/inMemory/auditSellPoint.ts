import SellPoint from "../../../../models/sellpoint";
import Audit, { AuditEntittyEnum } from "../../../models/audit";
import IAuditSellPointRepository, {
  IAuditSellPointRepositoryGetParams,
  IAuditSellPointRepositoryInsertOneParams,
} from "../auditSellpoint";

export class GetSellPointAuditRepositoryInMemory
  implements IAuditSellPointRepository
{
  data: Audit<SellPoint>[] = [];
  async getAuditByEndpoint(
    params: IAuditSellPointRepositoryGetParams
  ): Promise<Audit<SellPoint>[]> {
    return this.data.filter((item) => item.origin.request === params.request);
  }
  async insertOneAuditSellPoint({
    sellpoint,
    ...origin
  }: IAuditSellPointRepositoryInsertOneParams): Promise<Audit<SellPoint>> {
    const item = new Audit<SellPoint>({
      entity: AuditEntittyEnum.SELLPOINT,
      origin,
    });
    this.data.push(item);
    return item;
  }
}
