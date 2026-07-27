import http from "http";
import { PacienteService } from "./services/pacienteService";
import { Paciente } from "./models/paciente";

const pacienteService = new PacienteService();

const servidor = http.createServer(async (req, res) => {

    res.setHeader("Content-Type", "application/json");

    try {

        // GET - Listar pacientes
        if (req.method === "GET" && req.url === "/api/pacientes") {

            const resultado = await pacienteService.listar();

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));

            return;
        }

        // GET - Buscar paciente por ID
        if (
            req.method === "GET" &&
            req.url?.startsWith("/api/pacientes/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const resultado = await pacienteService.buscarPorId(id);

            if (resultado[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "El paciente no existe."
                }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));

            return;
        }

        // POST - Agregar paciente
        if (
            req.method === "POST" &&
            req.url === "/api/pacientes"
        ) {

            let cuerpo = "";

            req.on("data", (parte) => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const paciente = new Paciente(
                        0,
                        datos.nombre,
                        datos.telefono,
                        datos.correo
                    );

                    await pacienteService.agregar(paciente);

                    res.writeHead(201);
                    res.end(JSON.stringify({
                        mensaje: "Paciente agregado correctamente."
                    }));

                } catch (error: any) {

                    res.writeHead(500);
                    res.end(JSON.stringify({
                        error: error.message
                    }));

                }

            });

            return;
        }

        // PUT - Editar paciente
        if (
            req.method === "PUT" &&
            req.url?.startsWith("/api/pacientes/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            let cuerpo = "";

            req.on("data", (parte) => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const paciente = new Paciente(
                        id,
                        datos.nombre,
                        datos.telefono,
                        datos.correo
                    );

                    await pacienteService.editar(paciente);

                    res.writeHead(200);
                    res.end(JSON.stringify({
                        mensaje: "Paciente actualizado correctamente."
                    }));

                } catch (error: any) {

                    res.writeHead(500);
                    res.end(JSON.stringify({
                        error: error.message
                    }));

                }

            });

            return;
        }

        // DELETE - Eliminar paciente
        if (
            req.method === "DELETE" &&
            req.url?.startsWith("/api/pacientes/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            await pacienteService.eliminar(id);

            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje: "Paciente eliminado correctamente."
            }));

            return;
        }

        // Ruta no encontrada
        res.writeHead(404);
        res.end(JSON.stringify({
            error: "Ruta no encontrada."
        }));

    } catch (error: any) {

        res.writeHead(500);
        res.end(JSON.stringify({
            error: error.message
        }));

    }

});

servidor.listen(3000, () => {

    console.log("====================================");
    console.log("       API MÉDICA INICIADA");
    console.log("====================================");
    console.log("Servidor: http://localhost:3000");
    console.log("====================================");

});