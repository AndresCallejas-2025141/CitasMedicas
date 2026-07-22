import { conexion } from "../config/database";
import { Doctor } from "../models/doctor";

export class DoctorService {

    async listar(): Promise<any> {
        const [rows] = await conexion.query("CALL listar_doctor()");
        return rows;
    }

    async buscarPorId(id: number): Promise<any> {
        const [rows] = await conexion.query(
            "CALL buscar_doctor_id(?)",
            [id]
        );

        return rows;
    }

    async agregar(doctor: Doctor): Promise<void> {
        await conexion.query(
            "CALL agregar_doctor(?,?)",
            [
                doctor.nombre,
                doctor.especialidadId
            ]
        );
    }

    async editar(doctor: Doctor): Promise<void> {
        await conexion.query(
            "CALL editar_doctor(?,?,?)",
            [
                doctor.idDoctor,
                doctor.nombre,
                doctor.especialidadId
            ]
        );
    }

    async eliminar(id: number): Promise<void> {
        await conexion.query(
            "CALL eliminar_doctor(?)",
            [id]
        );
    }

}