import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import UpsertSellPoint from "../src/domain/usecase/upsertSellpoint";
import { GetSellPointsA } from "../src/external/getSellpointFromA";
import SellPointRepositoryInMemory from "../src/infra/repository/inMemory/sellPoint";
import SellPointController from "./controllers/sellpoint";

const server: FastifyInstance = Fastify({});

const getSellpoint = new GetSellPointsA();
const sellPointController = SellPointController({
  upsertSellpoint: new UpsertSellPoint({
    repository: new SellPointRepositoryInMemory(),
    services: [getSellpoint],
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
