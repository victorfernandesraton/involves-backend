import SellPoint from "../../../models/sellpoint";
import SellpointChain from "../../../models/sellpointChain";
import { ISellPoinrInsertOneParams, ISellPointRepository } from "../sellPoint";

export default class SellPointRepositoryInMemory
  implements ISellPointRepository
{
  data: SellPoint[] = [
    new SellPoint({
      id: "1",
      fk_sellpointchain: new SellpointChain({
        st_sellpointchain: "WALLMART",
      }).id,
      st_sellpoint: "Supermecado Big São clemente",
      fk_sellpointtype: "2",
      st_cnpj: "12345678910",
      st_address: "v principal, São clemente",
    }),

    new SellPoint({
      id: "2",
      fk_sellpointchain: new SellpointChain({
        st_sellpointchain: "FORT",
      }).id,
      st_cnpj: "10987654321",
      st_sellpoint: "Fort Atacadista Campache",
      fk_sellpointtype: "2",
      st_address: "Campache Street, Campache",
    }),
  ];
  upsertOneSellPoint = async (
    params: ISellPoinrInsertOneParams
  ): Promise<SellPoint> => {
    const oldSellpoint = this.data.find(
      (item) => item.st_cnpj === params.cnpj || item.id === params.sellpointId
    );
    const newSellpoint = new SellPoint({
      id: oldSellpoint?.id,
      fk_sellpointchain:
        params.data.fk_sellpointchain ?? oldSellpoint?.fk_sellpointchain,
      dt_updated: new Date(),
      st_sellpoint: params.data.st_sellpoint ?? oldSellpoint?.st_sellpoint,
      fk_sellpointtype:
        params.data.fk_sellpointtype ?? oldSellpoint?.fk_sellpointtype,
    });
    this.data = this.data.filter(
      (item) =>
        item.st_cnpj != newSellpoint.st_cnpj || newSellpoint.id != item.id
    );
    this.data.push(newSellpoint);
    return newSellpoint;
  };
  upsertManySellPoint = async (
    params: ISellPoinrInsertOneParams[]
  ): Promise<SellPoint[]> => {
    const data = Promise.all(
      params.map((item) => this.upsertOneSellPoint(item))
    );
    return data;
  };
}
