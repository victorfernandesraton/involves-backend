import SellpointType from "../../models/sellpointType";

export default interface ISellpointTypeRepository {
  getSellpointTypeByUniqueName(typeUniqueName: string): Promise<SellpointType>;
  getSellpointTypeById(typeId: string): Promise<SellpointType>;
  insertSellpointType(sellpointType: SellpointType): Promise<SellpointType>;
}
