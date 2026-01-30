import express from 'express';
import * as fs from "node:fs";
import * as YAML from 'yaml';
import swaggerUi from 'swagger-ui-express';

import { errorHandler } from "./errorHandling";
import InventoryRepo from "../infrastructure/adapters/InventoryRepositoryAdapter";
import {InventoryService} from "../domain/services/InventoryService";
import {InventoryController} from "../presentation/controllers/InventoryController";

import ItemRepo from "../infrastructure/adapters/ItemRepositoryAdapter";
import {ItemService} from "../domain/services/ItemService";
import {ItemController} from "../presentation/controllers/ItemController";

const app = express();
app.use(express.json());


const file  = fs.readFileSync(require.resolve('../api/Inventory.yml'), 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const inventoryRepo = new InventoryRepo();
const inventoryService = new InventoryService(inventoryRepo);
const inventoryController = new InventoryController(inventoryService);
inventoryController.registerRoutes(app);

const itemRepo = new ItemRepo();
const itemService = new ItemService(itemRepo);
const itemController = new ItemController(itemService);
itemController.registerRoutes(app);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/docs`);
});
