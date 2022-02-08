import { RequestGenericInterface, FastifyInstance } from "fastify";

import UpsertSellPoint from "../../src/domain/usecase/upsertSellpoint";

interface ISellPointControllerParams {
  upsertSellpoint: UpsertSellPoint;
}
interface IUpsertSellPointRequest extends RequestGenericInterface {
  Body: {
    cnpj?: string;
    chain?: string;
    service?: string;
  };
}

export default function SellPointController({
  upsertSellpoint,
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
    done();
  };
}
