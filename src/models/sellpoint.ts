import Entity, { IEnttityParams } from "./entity";

export interface ISellpintParams extends IEnttityParams {
  fk_sellpointchain: string;
  fk_sellpointtype: string;
  st_cnpj: string;
  st_address: string;
  st_cep: string;
}
export default class SellPoint extends Entity {
  fk_sellpointchain: string;
  fk_sellpointtype: string;
  st_cnpj: string;
  st_address: string;
  st_cep: string;
  constructor(params: ISellpintParams) {
    super(params);
    this.fk_sellpointchain = params.fk_sellpointchain;
    this.fk_sellpointtype = params.fk_sellpointtype;
    this.st_cnpj = params.st_cnpj;
    this.st_address = params.st_address;
    this.st_cep = params.st_cep;
  }
}
