import Entity from "./entity";

export interface IProductCategoryParams extends Entity {
  st_category: string;
}
export default class ProductCategory extends Entity {
  st_category: string;
  constructor(params: IProductCategoryParams) {
    super(params);
    this.st_category = params.st_category;
  }
}
