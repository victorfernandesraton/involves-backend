import { GetSellPointAuditRepositoryInMemory } from "../audit/infra/repository/inMemory/auditSellPoint";
import SellPoint from "../models/sellpoint";
import SellpointChain from "../models/sellpointChain";
import GetSellPoint from "./service/getSellpoint";

export class GetSellPointsA extends GetSellPoint {
  chains = [
    new SellpointChain({ st_sellpointchain: "WALLMART" }),
    new SellpointChain({ st_sellpointchain: "FORT" }),
  ];
  itens: {
    name: string;
    chain: string;
    cnpj?: string;
    bandeira?: string;
    address?: string;
    origin?: string;
    type?: string;
  }[] = [
    {
      name: "Supermecado Bi",
      chain: "Wallmart",
      cnpj: "12345678910",
      bandeira: "Big",
      address: "XYZ Street, Barreiros",
      origin: "B",
      type: "Hyper Super",
    },
    {
      name: "Supermecado Big São",
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
  constructor() {
    super({
      id: "serviceB",
      audit: new GetSellPointAuditRepositoryInMemory(),
    });
  }
  getSellPointByCnpj = async (cnpjId: string): Promise<SellPoint> => {
    const response = this.itens.find((item) => item.cnpj === cnpjId);
    this.audit.insertOneAuditSellPoint({
      endpoint: "/api/a",
      request: { cnpj: cnpjId },
      response: response,
    });
    if (!response) {
      throw new Error(`Not find SellPoint by cnpj/${cnpjId}`);
    }
    const data = new SellPoint({
      fk_sellpointchain:
        this.chains.find(
          (item) =>
            item.st_sellpointchain.toUpperCase() ===
            response.chain.toUpperCase()
        )?.id ??
        new SellpointChain({
          st_sellpointchain: response.chain,
        }).id,
      fk_sellpointtype: "1",
      st_address: response.address,
      st_sellpoint: response.name,
      st_cnpj: response.cnpj,
    });
    return Promise.resolve(data);
  };
  getSellPointsByChain = async (
    chainUniqueName: string
  ): Promise<SellPoint[]> => {
    const response = this.itens.filter(
      (item) => item.chain.toUpperCase().replace(" ", "_") === chainUniqueName
    );
    await this.audit.insertOneAuditSellPoint({
      endpoint: "/api/a",
      request: { chain: chainUniqueName },
      response: response,
    });
    if (!response.length) {
      throw new Error(`Not find SellPoint by cnpj/${chainUniqueName}`);
    }
    return Promise.resolve(
      response.map(
        (item) =>
          new SellPoint({
            fk_sellpointchain:
              this.chains.find(
                (chain) =>
                  chain.st_sellpointchain.toUpperCase() ===
                  item.chain.toUpperCase()
              )?.id ??
              new SellpointChain({
                st_sellpointchain: item.chain,
              }).id,
            fk_sellpointtype: "1",
            st_address: item.address,
            st_sellpoint: item.name,
            st_cnpj: item.cnpj,
          })
      )
    );
  };
}
