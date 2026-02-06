import {InventoryServicePort} from "../../application/ports/inbound/InventoryServicePort";
import {InventoryRepositoryPort} from "../../application/ports/outbound/InventoryRepositoryPort";
import {InventoryItem} from "../models/InventoryItem";
import {sendLogMessage} from "./sendLogMessage";

export class InventoryService implements InventoryServicePort {
  constructor(private readonly repo: InventoryRepositoryPort) {}

  async getInventoryById(id: number): Promise<InventoryItem[]> {
    if(id === undefined) {
      throw new Error("A hero's id must be provided");
    }
    return await this.repo.getInventoryById(id);
  }

  async insertInventoryItem(inventoryItem: InventoryItem): Promise<InventoryItem | null> {
    if(inventoryItem === undefined) {
      throw new Error('An inventory item must be provided');
    }
    sendLogMessage({
      id_hero: inventoryItem.id_hero,
      content: `The hero ${inventoryItem.id_hero} added the item ${inventoryItem.id_item} x1 to their inventory.`
    }).catch(err => {
      console.error("RabbitMQ log failed:", err.message);
    });
    return await this.repo.insertInventoryItem(inventoryItem);
  }

  async updateInventoryItem(inventoryItem: InventoryItem): Promise<InventoryItem  | null>{
    if(inventoryItem === undefined) {
      throw new Error('An inventory item must be provided');
    }
    sendLogMessage({
      id_hero: inventoryItem.id_hero,
      content: `The hero ${inventoryItem.id_hero} updated the item ${inventoryItem.id_item} and has x${inventoryItem.amount} in their inventory.`
    }).catch(err => {
      console.error("RabbitMQ log failed:", err.message);
    });
    return await this.repo.updateInventoryItem(inventoryItem);
  }

  async deleteInventoryItem(id_hero:number, id_item:number): Promise<InventoryItem  | null>{
    if( id_hero === undefined ||  id_item === undefined) {
      throw new Error('Both parameters id_hero and id_item must be provided');
    }

    sendLogMessage({
      id_hero: id_hero,
      content: `The hero ${id_hero} deleted the item ${id_item} from their inventory.`
    }).catch(err => {
      console.error("RabbitMQ log failed:", err.message);
    });
    return await this.repo.deleteInventoryItem(id_hero, id_item);
  }
}