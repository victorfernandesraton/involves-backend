import Product from "../../../models/product";
import Audit from "../../models/audit";

export default interface IAuditProductsRepositoryInsertOneParams {
  product: Product;
  endpoint?: string;
  request?: any;
  response?: any;
}
export default interface IAuditProductsRepository {
  insertOneAuditProduct(
    params: IAuditProductsRepositoryInsertOneParams
  ): Audit<Product>;
}
