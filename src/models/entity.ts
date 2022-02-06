import { v4 } from "uuid";

export interface IEnttityParams {
  id?: string;
  dt_register?: Date;
  dt_updated?: Date;
}
export default class Entity {
  readonly id: string = v4();
  dt_register: Date = new Date();
  dt_updated: Date = new Date();
  constructor(params: IEnttityParams) {
    if (params.id) {
      this.id = params.id;
    }
    if (params.dt_register) {
      this.dt_register = params.dt_register;
    }
    if (params.dt_updated) {
      this.dt_updated = params.dt_updated;
    }
  }
}
