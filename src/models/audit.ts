import Entity, { IEnttityParams } from "./entity";
export enum AuditEntittyEnum {
  PRODUCT,
  SELLPOINT,
  SELL,
}

export interface IAuditOrigin {
  st_system: string;
  endpoint?: string;
  request?: any;
  response?: any;
}

export interface IAuditParams extends IEnttityParams {
  entity: AuditEntittyEnum;
  origin: IAuditOrigin;
}
export default class Audit extends Entity {
  entity: AuditEntittyEnum;
  origin: IAuditOrigin;
  constructor(params: IAuditParams) {
    super(params);
    this.entity = params.entity;
    this.origin = params.origin;
  }
}
