import {InventoryRepositoryPort} from "../../application/ports/outbound/InventoryRepositoryPort";
const db = require('../../../db');

class InventoryRepo implements InventoryRepositoryPort {
  // async findAll(): Promise<CivilStatus[]> {
  //   return new Promise((resolve, reject) => {
  //     db.all('SELECT * FROM CivilStatus', (err:any, rows:any) => {
  //       if(err)
  //         reject(err);
  //       else
  //         resolve(rows);
  //     });
  //   });
  // }

} export default InventoryRepo