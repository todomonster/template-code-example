const swaggerAutoGen = require("swagger-autogen")();

//API分類標題和描述，通常會對應路由的分類
const tagsData = [
  {
    name: "Project",
    description: `Project`,
  },
];
// ===
//寫假資料會呼叫這邊的資料
const definitionsData = {
  id: 1,
  Product: { a: 1, b: 2 },
};
const doc = {
  info: {
    version: "1.0.0", // by default: "1.0.0"
    title: "TDM-API", // by default: "REST API"
    description: `TDM API (建議搭配 http://json.parser.online.fr/ 使用)
    驗證 token:
    【Bearer "$token"】.
    `,
  },
  host: "localhost:3000", // by default: "localhost:3000"
  basePath: "/", // by default: "/"
  schemes: ["http"], // by default: ['http']
  consumes: ["application/json"], // by default: ['application/json']
  produces: ["application/json"], // by default: ['application/json']
  tags: tagsData,
  securityDefinitions: {},
  definitions: definitionsData,
};
const outputFile = "./doc/swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutoGen(outputFile, endpointsFiles, doc);
