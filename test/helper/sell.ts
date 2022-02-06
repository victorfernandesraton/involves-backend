import ISellRepository from "../../src/infra/repository/sell";
import Sell from "../../src/models/sell";

export class SellRepositoryInMemory implements ISellRepository {
  data: Sell[] = [];
  async insertOneSell(params: Sell): Promise<Sell> {
    this.data.push(params);
    return params;
  }
  async insertManySell(params: Sell[]): Promise<Sell[]> {
    params.forEach((item) => {
      this.insertOneSell(item);
    });
    return params;
  }
}
