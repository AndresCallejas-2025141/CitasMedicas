import { conexion } from "../config/database";
import { Pago } from "../models/pago";

export class PagoService {

    async listar(): Promise<any> {
        const [rows] = await conexion.query("CALL listar_pago()");
        return rows;
    }

    async buscarPorId(id: number): Promise<any> {
        const [rows] = await conexion.query(
            "CALL buscar_pago_id(?)",
            [id]
        );

        return rows;
    }

    async agregar(pago: Pago): Promise<void> {
        await conexion.query(
            "CALL agregar_pago(?,?,?)",
            [
                pago.monto,
                pago.fecha,
                pago.idPaciente
            ]
        );
    }

    async editar(pago: Pago): Promise<void> {
        await conexion.query(
            "CALL editar_pago(?,?,?,?)",
            [
                pago.idPago,
                pago.monto,
                pago.fecha,
                pago.idPaciente
            ]
        );
    }

    async eliminar(id: number): Promise<void> {
        await conexion.query(
            "CALL eliminar_pago(?)",
            [id]
        );
    }

}