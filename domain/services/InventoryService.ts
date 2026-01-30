import {InventoryServicePort} from "../../application/ports/inbound/InventoryServicePort";
import {InventoryRepositoryPort} from "../../application/ports/outbound/InventoryRepositoryPort";

export class InventoryService implements InventoryServicePort {
  constructor(private readonly repo: InventoryRepositoryPort) {}

}