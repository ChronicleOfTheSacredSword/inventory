import {InventoryRepositoryPort} from "../../application/ports/outbound/InventoryRepositoryPort";
import {InventoryItem} from "../../domain/models/InventoryItem";
import pool from "../../../db";
const db = require('../../../db');

class InventoryRepo implements InventoryRepositoryPort {
    async getInventoryById(id: number): Promise<InventoryItem[]>{
        const res = await pool.query({
            text: 'SELECT * FROM inventory WHERE id_hero=$1;',
            values: [id]
        })
        return res.rows ?? null;
    }

    async insertInventoryItem(inventoryItem: InventoryItem): Promise<InventoryItem | null>{
        try{
            await pool.query({
                text: 'INSERT INTO inventory (id_hero, id_item, amount) VALUES ($1, $2, $3);',
                values: [inventoryItem.id_hero, inventoryItem.id_item, inventoryItem.amount]
            })
            return inventoryItem;
        }catch(e){
            console.error(e);
            return null;
        }
    }

    async updateInventoryItem(inventoryItem: InventoryItem): Promise<InventoryItem | null>{
        try{
            await pool.query({
                text: 'UPDATE inventory SET amount=$1 WHERE id_hero=$2 AND id_item=$3;',
                values: [inventoryItem.amount, inventoryItem.id_hero, inventoryItem.id_item]
            })
            return inventoryItem;
        }catch(e){
            console.error(e);
            return null;
        }
    }

    async deleteInventoryItem(id_hero:number, id_item:number): Promise<InventoryItem | null>{
       try{
           await pool.query({
                text: 'DELETE FROM inventory WHERE id_hero=$1 AND id_item=$2;',
                values: [id_hero, id_item]
           })
           return {id_hero: id_hero, id_item: id_item, amount: 0};
        }catch(e){
            console.error(e);
            return null;
        }
    }


} export default InventoryRepo