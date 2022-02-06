import Entity, { IEnttityParams } from "../../models/entity";

export enum AuditEntittyEnum {
  PRODUCT,
  SELLPOINT,
}

export interface IAuditOrigin {
  endpoint?: string;
  request?: any;
  response?: any;
}

export interface IAuditParams extends IEnttityParams {
  entity: AuditEntittyEnum;
  origin: IAuditOrigin;
  beforeData?: any;
}
export default class Audit<T> extends Entity {
  entity: AuditEntittyEnum;
  origin: IAuditOrigin;
  beforeData: T;
  constructor(params: IAuditParams) {
    super(params);
    this.entity = params.entity;
    this.origin = params.origin;
    this.beforeData = params.beforeData;
  }
}
