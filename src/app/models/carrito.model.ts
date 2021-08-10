import { ProductoModel } from "./producto.model";

export class CarritoModel {
    id: string;
    usrId: string;
    prods: [
        {
            nombre: string;
            precio: number;
            cant: number;
        }
    ];
    total: number;
}