import { RequestGenericInterface, FastifyInstance } from "fastify";
import GetProduct from "../../src/domain/usecase/getProduct";
import UpsertProduct from "../../src/domain/usecase/upsertProduct";

interface IProductControllerParams {
  upsertProduct: UpsertProduct;
  getProduct: GetProduct;
}
interface IUpsertProductParams extends RequestGenericInterface {
  Body: {
    ean: string;
  };
}
interface IGetProductParams extends RequestGenericInterface {
  Querystring: {
    ean?: string;
    name?: string;
    id?: string;
  };
}

export default function ProductsController({
  getProduct,
  upsertProduct,
}: IProductControllerParams) {
  return function (server: FastifyInstance, opts: any, done: any) {
    server.post<IUpsertProductParams>("/", async (request, reply) => {
      const { ean } = request.body;
      try {
        const response = await upsertProduct.execute(ean);
        return response;
      } catch (error) {
        throw error;
      }
    });
    server.get<IGetProductParams>("/", async (request, reply) => {
      const { ean, name, id } = request.query;
      try {
        return getProduct.execute({ ean, name, id });
      } catch (error) {
        console.log(error);
        throw error;
      }
    });
    done();
  };
}
