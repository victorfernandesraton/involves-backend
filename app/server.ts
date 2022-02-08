import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import GetSellPoint from "../src/domain/usecase/getSellpoints";
import UpsertSellPoint from "../src/domain/usecase/upsertSellpoint";
import { GetSellPointsA } from "../src/external/getSellpointFromA";
import SellPointRepositoryInMemory from "../src/infra/repository/inMemory/sellPoint";
import SellPointController from "./controllers/sellpoint";

const server: FastifyInstance = Fastify({});

const getSellpoint = new GetSellPointsA();
const sellpointRepository = new SellPointRepositoryInMemory();
const sellPointController = SellPointController({
  upsertSellpoint: new UpsertSellPoint({
    repository: sellpointRepository,
    services: [getSellpoint],
  }),
  getSellpoint: new GetSellPoint({
    repository: sellpointRepository,
  }),
});
server.register(sellPointController, { prefix: "/sellpoint" });

const start = async () => {
  try {
    await server.listen(process.env.PORT ?? 3000);

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
