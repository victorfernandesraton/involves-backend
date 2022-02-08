import SellPoint from "../../../models/sellpoint";
import Audit from "../../models/audit";

export interface IAuditSellPointRepositoryGetParams {
  endpoint?: string;
  request?: any;
  response?: any;
}
export interface IAuditSellPointRepositoryInsertOneParams {
  sellpoint?: SellPoint;
  endpoint?: string;
  request?: any;
  response?: any;
}
export default interface IAuditSellPointRepository {
  insertOneAuditSellPoint(
    params: IAuditSellPointRepositoryInsertOneParams
  ): Promise<Audit<SellPoint>>;
  getAuditByEndpoint(
    params: IAuditSellPointRepositoryGetParams
  ): Promise<Audit<SellPoint>[]>;
}
