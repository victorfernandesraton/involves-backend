import Entity, { IEnttityParams } from "./entity";

export interface IProductParams extends IEnttityParams {
  st_product: string;
  fk_category: string;
  id_external: string;
  bo_active?: boolean;
}
export default class Product extends Entity {
  st_product: string;
  fk_category: string;
  id_external: string;
  bo_active: boolean = true;
  constructor(params: IProductParams) {
    super(params);
    this.st_product = params.st_product;
    this.fk_category = params.fk_category;
    this.id_external = params.id_external;
    if (params?.bo_active === true || params.bo_active === false) {
      this.bo_active = params.bo_active;
    }
  }
}
