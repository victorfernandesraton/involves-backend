import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import GetProduct from "../src/domain/usecase/getProduct";
import GetSellPoint from "../src/domain/usecase/getSellpoints";
import UpsertProduct from "../src/domain/usecase/upsertProduct";
import UpsertSellPoint from "../src/domain/usecase/upsertSellpoint";
import { GetProductServiceA } from "../src/external/getProductFromA";
import { GetSellPointsA } from "../src/external/getSellpointFromA";
import ProductRepositoryInMemory from "../src/infra/repository/inMemory/product";
import SellPointRepositoryInMemory from "../src/infra/repository/inMemory/sellPoint";
import ProductsController from "./controllers/products";
import SellPointController from "./controllers/sellpoint";

const server: FastifyInstance = Fastify({});

const getSellpoint = new GetSellPointsA();
const sellpointRepository = new SellPointRepositoryInMemory();
const productRepository = new ProductRepositoryInMemory();
const getProductA = new GetProductServiceA();
const productController = ProductsController({
  upsertProduct: new UpsertProduct([getProductA], productRepository),
  getProduct: new GetProduct({
    repository: productRepository,
  }),
});
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
server.register(productController, { prefix: "/product" });

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
