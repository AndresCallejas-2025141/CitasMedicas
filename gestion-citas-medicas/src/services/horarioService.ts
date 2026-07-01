import { conexion } from "../config/database";
import { Horario } from "../models/horario";

export class HorarioService {

    async listar(): Promise<any> {
        const [rows] = await conexion.query("CALL listar_horario()");
        return rows;
    }

    async buscarPorId(id: number): Promise<any> {
        const [rows] = await conexion.query(
            "CALL buscar_horario_id(?)",
            [id]
        );

        return rows;
    }

    async agregar(horario: Horario): Promise<void> {
        await conexion.query(
            "CALL agregar_horario(?,?,?,?)",
            [
                horario.dia,
                horario.horaInicio,
                horario.horaFin,
                horario.idDoctor
            ]
        );
    }

    async editar(horario: Horario): Promise<void> {
        await conexion.query(
            "CALL editar_horario(?,?,?,?,?)",
            [
                horario.idHorario,
                horario.dia,
                horario.horaInicio,
                horario.horaFin,
                horario.idDoctor
            ]
        );
    }

    async eliminar(id: number): Promise<void> {
        await conexion.query(
            "CALL eliminar_horario(?)",
            [id]
        );
    }

}