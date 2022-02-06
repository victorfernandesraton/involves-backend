import Entity, { IEnttityParams } from "./entity";

export interface IProductParams extends IEnttityParams {
  name: string;
  fk_category: string;
  id_external: string;
  bo_active?: boolean;
}
export default class Product extends Entity {
  name: string;
  fk_category: string;
  id_external: string;
  bo_active: boolean = true;
  constructor(params: IProductParams) {
    super(params);
    this.name = params.name;
    this.fk_category = params.fk_category;
    this.id_external = params.id_external;
    if (params?.bo_active === true || params.bo_active === false) {
      this.bo_active = params.bo_active;
    }
  }
}
