import Entity, { IEnttityParams } from "./entity";

export interface ISellpintParams extends IEnttityParams {
  fk_sellpointchain: string;
  st_sellpoint: string;
  st_cnpj?: string;
  fk_sellpointtype?: string;
  st_address?: string;
}
export default class SellPoint extends Entity {
  fk_sellpointchain: string;
  st_sellpoint: string;
  st_cnpj?: string;
  fk_sellpointtype?: string;
  st_address?: string;
  constructor(params: ISellpintParams) {
    super(params);
    this.st_sellpoint = params.st_sellpoint;
    this.fk_sellpointchain = params.fk_sellpointchain;
    this.fk_sellpointtype = params.fk_sellpointtype;
    this.st_cnpj = params.st_cnpj;
    this.st_address = params.st_address;
  }
}
