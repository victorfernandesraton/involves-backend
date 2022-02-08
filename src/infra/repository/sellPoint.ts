import SellPoint from "../../models/sellpoint";

export interface ISellPoinrInsertOneParams {
  data: SellPoint;
  sellpointId?: string;
  cnpj?: string;
}

export interface ISellpintGetParams {
  cnpj?: string;
  chain?: string;
  name?: string;
}
export interface ISellPointRepository {
  upsertOneSellPoint(params: ISellPoinrInsertOneParams): Promise<SellPoint>;
  upsertManySellPoint(
    params: ISellPoinrInsertOneParams[]
  ): Promise<SellPoint[]>;
  getSellPoints(params: ISellpintGetParams): Promise<SellPoint[]>;
}
