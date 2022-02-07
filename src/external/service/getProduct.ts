import IAuditProductsRepository from "../../audit/infra/repository/auditProducts";
import Product from "../../models/product";
export interface IGetProductParams {
  audit: IAuditProductsRepository;
  id: string;
}
export default abstract class GetProduct {
  readonly id: string;
  audit: IAuditProductsRepository;
  constructor(params: IGetProductParams) {
    this.id = params.id;
    this.audit = params.audit;
  }

  abstract getProductById(productId: string): Promise<Product>;
}
