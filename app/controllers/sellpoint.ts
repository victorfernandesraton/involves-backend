import { RequestGenericInterface, FastifyInstance } from "fastify";
import GetSellPoint from "../../src/domain/usecase/getSellpoints";

import UpsertSellPoint from "../../src/domain/usecase/upsertSellpoint";

interface ISellPointControllerParams {
  upsertSellpoint: UpsertSellPoint;
  getSellpoint: GetSellPoint;
}
interface IUpsertSellPointRequest extends RequestGenericInterface {
  Body: {
    cnpj?: string;
    chain?: string;
    service?: string;
  };
}
interface IGetSellPointParams extends RequestGenericInterface {
  Querystring: {
    cnpj?: string;
    chain?: string;
    name?: string;
  };
}

export default function SellPointController({
  upsertSellpoint,
  getSellpoint,
}: ISellPointControllerParams) {
  return function (server: FastifyInstance, opts: any, done: any) {
    server.post<IUpsertSellPointRequest>("/", async (request, reply) => {
      const { cnpj, chain, service } = request.body;
      if (!cnpj && !chain) {
        throw new Error("not valid data");
      }
      try {
        const response = await upsertSellpoint.execute(
          { chain, cnpj },
          service
        );
        return response;
      } catch (error) {
        throw error;
      }
    });
    server.get<IGetSellPointParams>("/", async (request, reply) => {
      const { cnpj, chain, name } = request.query;
      if (!cnpj && !chain && !name) {
        throw new Error("Invalid paramas");
      }
      try {
        return getSellpoint.execute({ chain, cnpj, name });
      } catch (error) {
        console.log(error);
        throw error;
      }
    });
    done();
  };
}
