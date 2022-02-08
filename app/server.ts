import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import UpsertSellPoint from "../src/domain/usecase/upsertSellpoint";
import SellPointRepositoryInMemory, {
  GetSellPointsServiceA,
  GetSellPointsServiceB,
} from "../test/helper/sellpoint";
import SellPointController from "./controllers/sellpoint";

const server: FastifyInstance = Fastify({});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

const sellPointController = SellPointController({
  upsertSellpoint: new UpsertSellPoint({
    repository: new SellPointRepositoryInMemory(),
    services: [new GetSellPointsServiceA(), new GetSellPointsServiceB()],
  }),
});
server.register(sellPointController, { prefix: "/sellpoint" });

server.get("/ping", opts, async (request, reply) => {
  return { pong: "it worked!" };
});

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
