export interface InventoryServicePort {
    getInventoryById(id: number): Promise<InventoryServicePort>;
}
