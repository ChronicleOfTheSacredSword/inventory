import {ItemServicePort} from "../../application/ports/inbound/ItemServicePort";
import {Express, Response, Request} from "express";
import {Item} from "../../domain/models/Item";

export class ItemController {
  constructor(private itemService: ItemServicePort) {}

  registerRoutes(app: Express) {
    app.get('/item', this.getAllItems.bind(this));
    app.get('/item/:id', this.getItemById.bind(this));
    app.post('/item', this.insertItem.bind(this));
    app.delete('/item', this.deleteItem.bind(this));
  }


  async getAllItems(req: Request, res: Response) {
    const items: Item[] | null = await this.itemService.getAllItems();
    if (items) {
      res.status(200).send(items);
    } else {
      res.status(404).send({ message: `No items could be found` });
    }
  }

  async getItemById(req: Request, res: Response) {
    const item: Item | null = await this.itemService.getItemById(Number.parseInt(req.params.id));
    if (item) {
      res.status(200).send(item);
    } else {
      res.status(404).send({ message: `Item ${req.params.id} not found` });
    }
  }
  async insertItem(req: Request, res: Response) {
    const created: Omit<Item, 'id'> | null = await this.itemService.insertItem(req.body);
    if (created === null) {
      res.status(404).send({ message: "Item could not be inserted" });
    } else {
      res.status(201).send(created);
    }
  }

  async deleteItem(req: Request, res: Response) {
    const deleted: number | null = await this.itemService.deleteItem(Number.parseInt(req.params.id));
    if (deleted === null) {
      res.status(404).send({message: `Item ${req.params.id} could not be deleted`});
    } else {
      res.status(200).send(deleted);
    }
  }
}