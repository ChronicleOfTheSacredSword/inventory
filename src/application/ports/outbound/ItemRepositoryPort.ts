import {Item} from "../../../domain/models/Item";

export interface ItemRepositoryPort {
    getAllItems(): Promise<Item[]>;
    getItemById(id: number): Promise<Item | null>;
    insertItem(item: Omit<Item, 'id'>): Promise<Omit<Item, 'id'> | null>;
    deleteItem(id: number): Promise<number | null>;
}