import { conexion } from "../config/database";
import { Consultorio } from "../models/consultorio";

export class ConsultorioService {

    async listar(): Promise<any> {
        const [rows] = await conexion.query("CALL listar_consultorio()");
        return rows;
    }

    async buscarPorId(id: number): Promise<any> {
        const [rows] = await conexion.query(
            "CALL buscar_consultorio_id(?)",
            [id]
        );

        return rows;
    }

    async agregar(consultorio: Consultorio): Promise<void> {
        await conexion.query(
            "CALL agregar_consultorio(?,?)",
            [
                consultorio.numero,
                consultorio.ubicacion
            ]
        );
    }

    async editar(consultorio: Consultorio): Promise<void> {
        await conexion.query(
            "CALL editar_consultorio(?,?,?)",
            [
                consultorio.idConsultorio,
                consultorio.numero,
                consultorio.ubicacion
            ]
        );
    }

    async eliminar(id: number): Promise<void> {
        await conexion.query(
            "CALL eliminar_consultorio(?)",
            [id]
        );
    }

}