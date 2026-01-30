import {InventoryItem} from "../../../domain/models/InventoryItem";

export interface InventoryRepositoryPort {
    getInventoryById(id: number): Promise<InventoryItem[]>;
    insertInventoryItem(inventoryItem: InventoryItem): Promise<InventoryItem | null>;
    updateInventoryItem(inventoryItem: InventoryItem): Promise<InventoryItem | null>;
    deleteInventoryItem(id_hero:number, id_item:number): Promise<InventoryItem | null>;
}