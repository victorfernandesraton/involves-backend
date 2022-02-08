import SellPoint from "../../../models/sellpoint";
import SellpointChain from "../../../models/sellpointChain";
import {
  ISellpintGetParams,
  ISellPoinrInsertOneParams,
  ISellPointRepository,
} from "../sellPoint";

export const chainsData = [
  new SellpointChain({
    st_sellpointchain: "WALLMART",
    id: "1",
  }),
  new SellpointChain({
    st_sellpointchain: "FORT",
    id: "2",
  }),
];
export default class SellPointRepositoryInMemory
  implements ISellPointRepository
{
  chains = [...chainsData];
  data: SellPoint[] = [
    new SellPoint({
      id: "1",
      fk_sellpointchain: chainsData[0].id,
      st_sellpoint: "Supermecado Big São clemente",
      fk_sellpointtype: "2",
      st_cnpj: "12345678910",
      st_address: "v principal, São clemente",
    }),

    new SellPoint({
      id: "2",
      fk_sellpointchain: chainsData[1].id,
      st_cnpj: "10987654321",
      st_sellpoint: "Fort Atacadista Campache",
      fk_sellpointtype: "2",
      st_address: "Campache Street, Campache",
    }),
  ];
  getSellPoints = async (params: ISellpintGetParams): Promise<SellPoint[]> => {
    return this.data.filter((item) =>
      params.cnpj
        ? params.cnpj === item.st_cnpj
        : true && params.name
        ? item.st_sellpoint.toUpperCase().includes(params.name.toUpperCase())
        : true
        ? params.chain
          ? this.chains.find((chain) =>
              params.chain
                ? chain.st_unique_name
                    .toUpperCase()
                    .includes(params?.chain?.toUpperCase())
                : false
            )?.id
          : true
        : true
    );
  };
  upsertOneSellPoint = async (
    params: ISellPoinrInsertOneParams
  ): Promise<SellPoint> => {
    const oldSellpoint = this.data.find(
      (item) =>
        item.st_cnpj === params.cnpj ||
        item.st_cnpj === params.data.st_cnpj ||
        item.id === params.sellpointId ||
        item.id === params.data.id
    );
    const newSellpoint = new SellPoint({
      id: oldSellpoint?.id,
      fk_sellpointchain:
        params.data.fk_sellpointchain ?? oldSellpoint?.fk_sellpointchain,
      dt_updated: new Date(),
      st_cnpj: params.data.st_cnpj ?? oldSellpoint?.st_cnpj,
      st_sellpoint: params.data.st_sellpoint ?? oldSellpoint?.st_sellpoint,
      fk_sellpointtype:
        params.data.fk_sellpointtype ?? oldSellpoint?.fk_sellpointtype,
    });
    this.data = this.data
      //   .filter((item) => item.st_cnpj !== newSellpoint.st_cnpj)
      .filter((item) => item.id !== newSellpoint.id);
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
