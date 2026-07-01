import { conexion } from "../config/database";
import { Medicamento } from "../models/medicamento";

export class MedicamentoService {

    async listar(): Promise<any> {
        const [rows] = await conexion.query("CALL listar_medicamento()");
        return rows;
    }

    async buscarPorId(id: number): Promise<any> {
        const [rows] = await conexion.query(
            "CALL buscar_medicamento_id(?)",
            [id]
        );

        return rows;
    }

    async agregar(medicamento: Medicamento): Promise<void> {
        await conexion.query(
            "CALL agregar_medicamento(?,?,?)",
            [
                medicamento.nombre,
                medicamento.dosis,
                medicamento.idReceta
            ]
        );
    }

    async editar(medicamento: Medicamento): Promise<void> {
        await conexion.query(
            "CALL editar_medicamento(?,?,?,?)",
            [
                medicamento.idMedicamento,
                medicamento.nombre,
                medicamento.dosis,
                medicamento.idReceta
            ]
        );
    }

    async eliminar(id: number): Promise<void> {
        await conexion.query(
            "CALL eliminar_medicamento(?)",
            [id]
        );
    }

}