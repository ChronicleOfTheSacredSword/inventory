import { InventoryServicePort } from "../../application/ports/inbound/InventoryServicePort";
import { Express, Response, Request } from "express";
// import {Tree} from "../../domain/models/Tree";

export class TreeController {
  constructor(private inventoryService: InventoryServicePort) {}

  registerRoutes(app: Express) {
    app.post('/inventory', this.insertInventoryItem.bind(this));
    app.put('/inventory', this.updateInventoryItem.bind(this));
    app.delete('/inventory', this.deleteInventoryItem.bind(this));
    app.get('/inventory/:id_user', this.getInventoryById.bind(this));
  }
  // const { title } = req.query; // Accessing query parameters (delete)

  async getInventoryById(req: Request, res: Response) {
    const id_user: number = Number.parseInt(req.params.id);
    const inventory = await this.inventoryService.getInventoryById(id_user);
    if (inventory) {
      res.status(200).send(inventory);
    } else {
      res.status(404).send({ message: `User ${id_user} inventory not found` });
    }
  }

  insertInventoryItem(req: Request, res: Response) {
    // const created: Tree = this.treeService.save(req.body);
    // if (created === null) {
    //   res.status(404).send({ message: "Tree could not be saved" });
    // } else {
    //   res.status(201).send(created);
    // }
  }

  updateInventoryItem(req: Request, res: Response) {
    // const updated: Tree | null = this.treeService.update(req.body);
    // if (updated === null) {
    //   res.status(404).send({message: "Tree could not be updated"});
    // } else {
    //   res.status(200).send(updated);
    // }
  }

  deleteInventoryItem(req: Request, res: Response) {
    // const id = req.params.uuid;
    // const deleted: Tree | null = this.treeService.delete(id);
    // if (deleted === null) {
    //   res.status(404).send({message: "Tree could not be deleted"});
    // } else {
    //   res.status(200).send(deleted);
    // }
  }
}