import { conexion } from "../config/database";
import { Receta } from "../models/receta";

export class RecetaService {

    async listar(): Promise<any> {
        const [rows] = await conexion.query("CALL listar_receta()");
        return rows;
    }

    async buscarPorId(id: number): Promise<any> {
        const [rows] = await conexion.query(
            "CALL buscar_receta_id(?)",
            [id]
        );

        return rows;
    }

    async agregar(receta: Receta): Promise<void> {
        await conexion.query(
            "CALL agregar_receta(?,?)",
            [
                receta.fecha,
                receta.idCita
            ]
        );
    }

    async editar(receta: Receta): Promise<void> {
        await conexion.query(
            "CALL editar_receta(?,?,?)",
            [
                receta.idReceta,
                receta.fecha,
                receta.idCita
            ]
        );
    }

    async eliminar(id: number): Promise<void> {
        await conexion.query(
            "CALL eliminar_receta(?)",
            [id]
        );
    }

}