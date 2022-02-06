import GetSellPoint from "../../src/external/service/getSellpoint";
import {
  ISellPoinrInsertOneParams,
  ISellPointRepository,
} from "../../src/infra/repository/sellPoint";
import SellPoint from "../../src/models/sellpoint";
import SellpointChain from "../../src/models/sellpointChain";
import { sellpointchain } from "./sellPointChain";

export const sellpointBaseA = [
  {
    name: "Supermecado Big Barreiros",
    rede: "Wallmart",
    bandeira: "Big",
    cnpj: "12345678910",
    endereco: "Rua XYZ Barreiros",
    origin: "A",
  },
];

export const sellpointBaseB = [
  {
    name: "Supermecado Big Barreiros",
    chain: "Wallmart",
    cnpj: "12345678910",
    bandeira: "Big",
    address: "XYZ Street, Barreiros",
    origin: "B",
    type: "Hyper Super",
  },
  {
    name: "Supermecado Big São clemente",
    chain: "Wallmart",
    cnpj: "44433322211",
    bandeira: "Big",
    address: "Av principal, São clemente",
    origin: "B",
    type: "Atacado",
  },
  {
    name: "Fort Atacadista Campache",
    chain: "Fort",
    address: "Campache Street, Campache",
    type: "Atacado",
    cnpj: "10987654321",
  },
];

export const sellpoints = [...sellpointBaseA, ...sellpointBaseB];

export class GetSellPointsServiceA extends GetSellPoint {
  constructor() {
    super("serviceA");
  }
  async getSellPointByCnpj(cnpjId: string): Promise<SellPoint> {
    const response = sellpointBaseA.find((item) => item.cnpj === cnpjId);
    if (!response) {
      throw new Error(`Not find SellPoint by cnpj/${cnpjId}`);
    }
    const data = new SellPoint({
      fk_sellpointchain:
        sellpointchain.find(
          (item) => response.rede.toUpperCase() === item.name.toUpperCase()
        )?.id ??
        new SellpointChain({
          st_sellpointchain: response.rede,
        }).id,
      fk_sellpointtype: "1",
      st_address: response.endereco,
      st_sellpoint: response.name,
      st_cnpj: response.cnpj,
    });
    return data;
  }
  async getSellPointsByChain(chainUniqueName: string): Promise<SellPoint[]> {
    const response = sellpointBaseA.filter(
      (item) => item.rede.toUpperCase().replace(" ", "_") === chainUniqueName
    );
    if (!response.length) {
      throw new Error(`Not find SellPoint by cnpj/${chainUniqueName}`);
    }
    return response.map(
      (item) =>
        new SellPoint({
          fk_sellpointchain:
            sellpointchain.find(
              (chain) => item.rede.toUpperCase() === chain.name.toUpperCase()
            )?.id ??
            new SellpointChain({
              st_sellpointchain: item.rede,
            }).id,
          fk_sellpointtype: "1",
          st_address: item.endereco,
          st_sellpoint: item.name,
          st_cnpj: item.cnpj,
        })
    );
  }
}

export class GetSellPointsServiceB extends GetSellPoint {
  constructor() {
    super("serviceB");
  }
  async getSellPointByCnpj(cnpjId: string): Promise<SellPoint> {
    const response = sellpointBaseB.find((item) => item.cnpj === cnpjId);
    if (!response) {
      throw new Error(`Not find SellPoint by cnpj/${cnpjId}`);
    }
    const data = new SellPoint({
      fk_sellpointchain:
        sellpointchain.find(
          (item) => response.chain.toUpperCase() === item.name.toUpperCase()
        )?.id ??
        new SellpointChain({
          st_sellpointchain: response.chain,
        }).id,
      fk_sellpointtype: "1",
      st_address: response.address,
      st_sellpoint: response.name,
      st_cnpj: response.cnpj,
    });
    return data;
  }
  async getSellPointsByChain(chainUniqueName: string): Promise<SellPoint[]> {
    const response = sellpointBaseB.filter(
      (item) => item.chain.toUpperCase().replace(" ", "_") === chainUniqueName
    );
    if (!response.length) {
      throw new Error(`Not find SellPoint by cnpj/${chainUniqueName}`);
    }
    return response.map(
      (item) =>
        new SellPoint({
          fk_sellpointchain:
            sellpointchain.find(
              (element) =>
                item.chain.toUpperCase() === element.name.toUpperCase()
            )?.id ??
            new SellpointChain({
              st_sellpointchain: item.chain,
            }).id,
          fk_sellpointtype: "1",
          st_address: item.address,
          st_sellpoint: item.name,
          st_cnpj: item.cnpj,
        })
    );
  }
}

export default class SellPointRepositoryInMemory
  implements ISellPointRepository
{
  data: SellPoint[] = [];
  async upsertOneSellPoint(
    params: ISellPoinrInsertOneParams
  ): Promise<SellPoint> {
    const oldSellpoint = this.data.find(
      (item) => item.st_cnpj === params.cnpj || item.id === params.sellpointId
    );
    const newSellpoint = new SellPoint({
      fk_sellpointchain:
        params.data.fk_sellpointchain ?? oldSellpoint?.fk_sellpointchain,
      dt_updated: new Date(),
      st_sellpoint: params.data.st_sellpoint ?? oldSellpoint?.st_sellpoint,
      fk_sellpointtype:
        params.data.fk_sellpointtype ?? oldSellpoint?.fk_sellpointtype,
    });
    this.data.filter(
      (item) =>
        item.st_cnpj != newSellpoint.st_cnpj || newSellpoint.id != item.id
    );
    this.data.push(newSellpoint);
    return newSellpoint;
  }
  async upsertManySellPoint(
    params: ISellPoinrInsertOneParams[]
  ): Promise<SellPoint[]> {
    const data = Promise.all(
      params.map((item) => this.upsertOneSellPoint(item))
    );
    return data;
  }
}
