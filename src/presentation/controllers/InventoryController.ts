import { InventoryServicePort } from "../../application/ports/inbound/InventoryServicePort";
import { Express, Response, Request } from "express";
import {InventoryItem} from "../../domain/models/InventoryItem";

export class InventoryController {
  constructor(private inventoryService: InventoryServicePort) {}

  registerRoutes(app: Express) {
    app.post('/inventory', this.insertInventoryItem.bind(this));
    app.put('/inventory', this.updateInventoryItem.bind(this));
    app.delete('/inventory', this.deleteInventoryItem.bind(this));
    app.get('/inventory/:id_hero', this.getInventoryById.bind(this));
  }


  async getInventoryById(req: Request, res: Response) {
    const inventory: InventoryItem[] | null = await this.inventoryService.getInventoryById(Number.parseInt(req.params.id_hero));
    if (inventory) {
      res.status(200).send(inventory);
    } else {
      res.status(404).send({ message: `User ${req.params.id} inventory not found` });
    }
  }

  async insertInventoryItem(req: Request, res: Response) {
    const created: InventoryItem | null = await this.inventoryService.insertInventoryItem(req.body);
    if (created === null) {
      res.status(404).send({ message: "Inventory item could not be saved" });
    } else {
      res.status(201).send(created);
    }
  }

  async updateInventoryItem(req: Request, res: Response) {
    const updated: InventoryItem | null = await this.inventoryService.updateInventoryItem(req.body);
    if (updated === null) {
      res.status(404).send({message: "Inventory item could not be updated"});
    } else {
      res.status(200).send(updated);
    }
  }

  async deleteInventoryItem(req: Request, res: Response) {
    const id_hero:number = Number.parseInt(req.query.hero as string)
    const id_item:number = Number.parseInt(req.query.item as string)

    const deleted: InventoryItem | null = await this.inventoryService.deleteInventoryItem(id_hero, id_item);
    if (deleted === null) {
      res.status(404).send({message: `Inventory item ${id_item} could not be deleted from hero ${id_hero} inventory`});
    } else {
      res.status(200).send(deleted);
    }
  }
}