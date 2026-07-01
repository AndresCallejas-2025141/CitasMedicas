import { conexion } from "../config/database";
import { Historial } from "../models/historial";

export class HistorialService {

    async listar(): Promise<any> {
        const [rows] = await conexion.query("CALL listar_historial()");
        return rows;
    }

    async buscarPorId(id: number): Promise<any> {
        const [rows] = await conexion.query(
            "CALL buscar_historial_id(?)",
            [id]
        );

        return rows;
    }

    async agregar(historial: Historial): Promise<void> {
        await conexion.query(
            "CALL agregar_historial(?,?)",
            [
                historial.descripcion,
                historial.idPaciente
            ]
        );
    }

    async editar(historial: Historial): Promise<void> {
        await conexion.query(
            "CALL editar_historial(?,?,?)",
            [
                historial.idHistorial,
                historial.descripcion,
                historial.idPaciente
            ]
        );
    }

    async eliminar(id: number): Promise<void> {
        await conexion.query(
            "CALL eliminar_historial(?)",
            [id]
        );
    }

}