import {ItemRepositoryPort} from "../../application/ports/outbound/ItemRepositoryPort";
import {Item} from "../../domain/models/Item";
import pool from "../../../db";

class ItemRepo implements ItemRepositoryPort {
    async getAllItems(): Promise<Item[]>{
        const res = await pool.query({
            text: 'SELECT * FROM item;',
        })
        return res.rows ?? null;
    }

    async getItemById(id: number): Promise<Item | null>{
        const res = await pool.query({
            text: 'SELECT * FROM item WHERE id=$1;',
            values: [id]
        })
        return res.rows[0] ?? null;
    }

    async insertItem(item: Omit<Item, 'id'>): Promise<Omit<Item, 'id'> | null>{
        try{
            await pool.query({
                text: 'INSERT INTO item (name, usable, quantity, unit) VALUES ($1, $2, $3, $4);',
                values: [item.name, item.usable, item.quantity, item.unit]
            })
            return item;
        }catch(e){
            console.error(e);
            return null;
        }
    }

    async deleteItem(id: number): Promise<number | null>{
        try{
            await pool.query({
                text: 'DELETE FROM item WHERE id=$1;',
                values: [id]
            })
            return id;
        }catch(e){
            console.error(e);
            return null;
        }
    }
}export default ItemRepo

