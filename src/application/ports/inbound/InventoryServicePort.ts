import {InventoryItem} from "../../../domain/models/InventoryItem";

export interface InventoryServicePort {
    getInventoryById(id: number): Promise<InventoryItem[] | null>;
    insertInventoryItem(inventoryItem: InventoryItem): Promise<InventoryItem | null>;
    updateInventoryItem(inventoryItem: InventoryItem): Promise<InventoryItem | null>;
    deleteInventoryItem(id_hero:number, id_item:number): Promise<InventoryItem | null>;
}
