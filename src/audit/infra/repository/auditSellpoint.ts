import SellPoint from "../../../models/sellpoint";
import Audit from "../../models/audit";

export default interface IAuditSellPointRepositoryInsertOneParams {
  sellpoint: SellPoint;
  endpoint?: string;
  request?: any;
  response?: any;
}
export default interface IAuditSellPointRepository {
  insertOneAuditSellPoint(
    params: IAuditSellPointRepositoryInsertOneParams
  ): Audit<SellPoint>;
}
