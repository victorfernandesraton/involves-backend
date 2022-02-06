import Entity, { IEnttityParams } from "./entity";

export interface IProductCategoryParams extends IEnttityParams {
  st_category: string;
}
export default class ProductCategory extends Entity {
  st_category: string;
  constructor(params: IProductCategoryParams) {
    super(params);
    this.st_category = params.st_category.toUpperCase();
  }
}
