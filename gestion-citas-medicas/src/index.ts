import { conexion } from "./config/conexion";

async function iniciar() {
    try {
        const connection = await conexion.getConnection();

        console.log("✅ Conexión a MySQL establecida correctamente.");

        connection.release();
    } catch (error) {
        console.error("❌ Error al conectar con la base de datos:");
        console.error(error);
    }
}

iniciar();