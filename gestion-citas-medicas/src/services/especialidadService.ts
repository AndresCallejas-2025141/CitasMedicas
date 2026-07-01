import { conexion } from "../config/database";
import { Especialidad } from "../models/especialidad";

export class EspecialidadService {

    async listar(): Promise<any> {
        const [rows] = await conexion.query("CALL listar_especialidad()");
        return rows;
    }

    async buscarPorId(id: number): Promise<any> {
        const [rows] = await conexion.query(
            "CALL buscar_especialidad_id(?)",
            [id]
        );

        return rows;
    }

    async agregar(especialidad: Especialidad): Promise<void> {
        await conexion.query(
            "CALL agregar_especialidad(?)",
            [
                especialidad.nombre
            ]
        );
    }

    async editar(especialidad: Especialidad): Promise<void> {
        await conexion.query(
            "CALL editar_especialidad(?,?)",
            [
                especialidad.idEspecialidad,
                especialidad.nombre
            ]
        );
    }

    async eliminar(id: number): Promise<void> {
        await conexion.query(
            "CALL eliminar_especialidad(?)",
            [id]
        );
    }

}