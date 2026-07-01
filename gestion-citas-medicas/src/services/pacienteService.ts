import { conexion } from "../config/database";
import { Paciente } from "../models/paciente";

export class PacienteService {

    // Listar todos los pacientes
    async listar(): Promise<any> {
        const [rows] = await conexion.query("CALL listar_paciente()");
        return rows;
    }

    // Buscar un paciente por su ID
    async buscarPorId(id: number): Promise<any> {
        const [rows] = await conexion.query(
            "CALL buscar_paciente_id(?)",
            [id]
        );

        return rows;
    }

    // Agregar un nuevo paciente
    async agregar(paciente: Paciente): Promise<void> {
        await conexion.query(
            "CALL agregar_paciente(?,?,?)",
            [
                paciente.nombre,
                paciente.telefono,
                paciente.correo
            ]
        );
    }

    // Editar un paciente
    async editar(paciente: Paciente): Promise<void> {
        await conexion.query(
            "CALL editar_paciente(?,?,?,?)",
            [
                paciente.idPaciente,
                paciente.nombre,
                paciente.telefono,
                paciente.correo
            ]
        );
    }

    // Eliminar un paciente
    async eliminar(id: number): Promise<void> {
        await conexion.query(
            "CALL eliminar_paciente(?)",
            [id]
        );
    }
}