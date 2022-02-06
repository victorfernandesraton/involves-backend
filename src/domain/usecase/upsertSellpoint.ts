import GetSellPoint from "../../external/service/getSellpoint";
import SellPoint from "../../models/sellpoint";
export enum GetHandlersByTypeEnum {
  CHAIN,
  CNPJ,
}
export type TypeGetHandlersByTypeReturn =
  | ((chainUniqueName: string) => Promise<SellPoint[]>)
  | ((productId: string) => Promise<SellPoint>);
export type TypeParseHandlerTypeParams = string;
export interface IUpsertSellPointExecuteParams {
  cnpj?: string;
  chain?: string;
}
export interface IUpsertSellPointRepository {
  upsertSellPointById(sellpointId: string, data: SellPoint): Promise<SellPoint>;
}

export interface IUpsertPSellPointParams {
  services: GetSellPoint[];
  // repository: IUpsertSellPointRepository;
}

export default class UpsertSellPoint {
  readonly services: GetSellPoint[];
  // repository: IUpsertSellPointRepository;
  constructor(params: IUpsertPSellPointParams) {
    this.services = params.services;
    // this.repository = params.repository;
  }

  private getHandlersByType(
    type: GetHandlersByTypeEnum,
    handler: GetSellPoint
  ): TypeGetHandlersByTypeReturn {
    switch (type) {
      case GetHandlersByTypeEnum.CHAIN:
        return handler.getSellPointsByChain;
      case GetHandlersByTypeEnum.CNPJ:
      default:
        return handler.getSellPointByCnpj;
    }
  }

  private parseParansByHandlerType(
    type: GetHandlersByTypeEnum,
    params: IUpsertSellPointExecuteParams
  ): string {
    switch (type) {
      case GetHandlersByTypeEnum.CHAIN:
        if (!params.chain) {
          throw new Error("Not have chain");
        }
        return params.chain;
      case GetHandlersByTypeEnum.CNPJ:
      default:
        if (!params.cnpj) {
          throw new Error("Not have cnpj");
        }
        return params.cnpj;
    }
  }

  async execute(
    params: IUpsertSellPointExecuteParams,
    service: string | null = null
  ): Promise<SellPoint[]> {
    let data: SellPoint[] = [];
    let response: SellPoint[] | SellPoint;
    let type = params.chain
      ? GetHandlersByTypeEnum.CHAIN
      : GetHandlersByTypeEnum.CNPJ;

    if (!service) {
      try {
        const handlers = this.services.map((item) =>
          this.getHandlersByType(type, item)
        );
        response = await Promise.any(
          handlers.map((item) =>
            item(this.parseParansByHandlerType(type, params))
          )
        );
      } catch (error) {
        throw error;
      }
    } else {
      try {
        const handlerInstance = this.services.find(
          (item) => item.id === service
        );

        if (!handlerInstance) {
          throw new Error(`Not find service/${service}`);
        }
        const handler = this.getHandlersByType(type, handlerInstance);
        response = await handler(this.parseParansByHandlerType(type, params));
      } catch (error) {
        throw error;
      }
    }
    if (response instanceof Array) {
      data = response;
    } else {
      data.push(response);
    }
    return data;
  }
}
