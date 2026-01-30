import {ItemRepositoryPort} from "../../application/ports/outbound/ItemRepositoryPort";
import {ItemServicePort} from "../../application/ports/inbound/ItemServicePort";
import {Item} from "../models/Item";

export class ItemService implements ItemServicePort {
    constructor(private readonly repo: ItemRepositoryPort) {}

    async getAllItems(): Promise<Item[]>{
        return await this.repo.getAllItems();
    }

    async getItemById(id: number): Promise<Item | null>{
        if(id === undefined) {
            throw new Error("An item's id must be provided");
        }
        return await this.repo.getItemById(id);
    }

    async insertItem(item: Omit<Item, 'id'>): Promise<Omit<Item, 'id'> | null>{
        if(item === undefined) {
            throw new Error("An item must be provided");
        }
        return await this.repo.insertItem(item);
    }

    async deleteItem(id: number): Promise<number | null>{
        if(id === undefined) {
            throw new Error("An item's id must be provided");
        }
        return await this.repo.deleteItem(id);
    }
}