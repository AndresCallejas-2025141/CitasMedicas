import { conexion } from "../config/database";
import { Cita } from "../models/cita";

export class CitaService {

    async listar(): Promise<any> {
        const [rows] = await conexion.query("CALL listar_cita()");
        return rows;
    }

    async buscarPorId(id: number): Promise<any> {
        const [rows] = await conexion.query(
            "CALL buscar_cita_id(?)",
            [id]
        );

        return rows;
    }

    async agregar(cita: Cita): Promise<void> {
        await conexion.query(
            "CALL agregar_cita(?,?,?,?,?)",
            [
                cita.fecha,
                cita.hora,
                cita.idPaciente,
                cita.idDoctor,
                cita.idConsultorio
            ]
        );
    }

    async editar(cita: Cita): Promise<void> {
        await conexion.query(
            "CALL editar_cita(?,?,?,?,?,?)",
            [
                cita.idCita,
                cita.fecha,
                cita.hora,
                cita.idPaciente,
                cita.idDoctor,
                cita.idConsultorio
            ]
        );
    }

    async eliminar(id: number): Promise<void> {
        await conexion.query(
            "CALL eliminar_cita(?)",
            [id]
        );
    }

}