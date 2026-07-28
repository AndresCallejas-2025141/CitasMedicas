import http from "http";
import { PacienteService } from "./services/pacienteService";
import { DoctorService } from "./services/doctorService";
import { EspecialidadService } from "./services/especialidadService";
import { ConsultorioService } from "./services/consultorioService";
import { CitaService } from "./services/citaService";
import { HorarioService } from "./services/horarioService";
import { RecetaService } from "./services/recetaService";
import { MedicamentoService } from "./services/medicamentoService";
import { PagoService } from "./services/pagoService";
import { HistorialService } from "./services/historialService";
import { Paciente } from "./models/paciente";
import { Doctor } from "./models/doctor";
import { Especialidad } from "./models/especialidad";
import { Consultorio } from "./models/consultorio";
import { Cita } from "./models/cita";
import { Horario } from "./models/horario";
import { Receta } from "./models/receta";
import { Medicamento } from "./models/medicamento";
import { Pago } from "./models/pago";
import { Historial } from "./models/historial";
const pacienteService = new PacienteService();
const doctorService = new DoctorService();
const especialidadService = new EspecialidadService();
const consultorioService = new ConsultorioService();
const citaService = new CitaService();
const horarioService = new HorarioService();
const recetaService = new RecetaService();
const medicamentoService = new MedicamentoService();
const pagoService = new PagoService();
const historialService = new HistorialService();

// SERVIDOR
const servidor = http.createServer(async (req, res) => {

    res.setHeader("Content-Type", "application/json");

    try {

        // PACIENTES
        // GET - Listar pacientes
        if (req.method === "GET" && req.url === "/api/pacientes") {

            const resultado = await pacienteService.listar();

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // GET - Buscar paciente
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
        if (req.method === "POST" && req.url === "/api/pacientes") {

            let cuerpo = "";

            req.on("data", parte => {
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

            req.on("data", parte => {
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

            const existente = await pacienteService.buscarPorId(id);

            if (existente[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "El paciente no existe."
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

        // DOCTORES
        // GET - Listar doctores
        if (req.method === "GET" && req.url === "/api/doctores") {

            const resultado = await doctorService.listar();

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // GET - Buscar doctor
        if (
            req.method === "GET" &&
            req.url?.startsWith("/api/doctores/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const resultado = await doctorService.buscarPorId(id);

            if (resultado[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "El doctor no existe."
                }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // POST - Agregar doctor
        if (req.method === "POST" && req.url === "/api/doctores") {

            let cuerpo = "";

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const doctor = new Doctor(
                        0,
                        datos.nombre,
                        Number(datos.especialidadId)
                    );

                    await doctorService.agregar(doctor);

                    res.writeHead(201);
                    res.end(JSON.stringify({
                        mensaje: "Doctor agregado correctamente."
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

        // PUT - Editar doctor
        if (
            req.method === "PUT" &&
            req.url?.startsWith("/api/doctores/")
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

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const doctor = new Doctor(
                        id,
                        datos.nombre,
                        Number(datos.especialidadId)
                    );

                    await doctorService.editar(doctor);

                    res.writeHead(200);
                    res.end(JSON.stringify({
                        mensaje: "Doctor actualizado correctamente."
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

        // DELETE - Eliminar doctor
        if (
            req.method === "DELETE" &&
            req.url?.startsWith("/api/doctores/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const existente = await doctorService.buscarPorId(id);

            if (existente[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "El doctor no existe."
                }));
                return;
            }

            await doctorService.eliminar(id);

            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje: "Doctor eliminado correctamente."
            }));

            return;
        }

        // ESPECIALIDADES
        // GET - Listar
        if (req.method === "GET" && req.url === "/api/especialidades") {

            const resultado = await especialidadService.listar();

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // GET - Buscar
        if (
            req.method === "GET" &&
            req.url?.startsWith("/api/especialidades/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const resultado = await especialidadService.buscarPorId(id);

            if (resultado[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "La especialidad no existe."
                }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // POST - Agregar
        if (
            req.method === "POST" &&
            req.url === "/api/especialidades"
        ) {

            let cuerpo = "";

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const especialidad = new Especialidad(
                        0,
                        datos.nombre
                    );

                    await especialidadService.agregar(especialidad);

                    res.writeHead(201);
                    res.end(JSON.stringify({
                        mensaje: "Especialidad agregada correctamente."
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

        // PUT - Editar
        if (
            req.method === "PUT" &&
            req.url?.startsWith("/api/especialidades/")
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

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const especialidad = new Especialidad(
                        id,
                        datos.nombre
                    );

                    await especialidadService.editar(especialidad);

                    res.writeHead(200);
                    res.end(JSON.stringify({
                        mensaje: "Especialidad actualizada correctamente."
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

        // DELETE - Eliminar
        if (
            req.method === "DELETE" &&
            req.url?.startsWith("/api/especialidades/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const existente = await especialidadService.buscarPorId(id);

            if (existente[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "La especialidad no existe."
                }));
                return;
            }

            await especialidadService.eliminar(id);

            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje: "Especialidad eliminada correctamente."
            }));

            return;
        }

        // CONSULTORIOS
        // GET - Listar
        if (req.method === "GET" && req.url === "/api/consultorios") {

            const resultado = await consultorioService.listar();

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // GET - Buscar
        if (
            req.method === "GET" &&
            req.url?.startsWith("/api/consultorios/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const resultado = await consultorioService.buscarPorId(id);

            if (resultado[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "El consultorio no existe."
                }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // POST - Agregar
        if (
            req.method === "POST" &&
            req.url === "/api/consultorios"
        ) {

            let cuerpo = "";

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const consultorio = new Consultorio(
                        0,
                        datos.numero,
                        datos.ubicacion
                    );

                    await consultorioService.agregar(consultorio);

                    res.writeHead(201);
                    res.end(JSON.stringify({
                        mensaje: "Consultorio agregado correctamente."
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

        // PUT - Editar
        if (
            req.method === "PUT" &&
            req.url?.startsWith("/api/consultorios/")
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

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const consultorio = new Consultorio(
                        id,
                        datos.numero,
                        datos.ubicacion
                    );

                    await consultorioService.editar(consultorio);

                    res.writeHead(200);
                    res.end(JSON.stringify({
                        mensaje: "Consultorio actualizado correctamente."
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

        // DELETE - Eliminar
        if (
            req.method === "DELETE" &&
            req.url?.startsWith("/api/consultorios/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const existente = await consultorioService.buscarPorId(id);

            if (existente[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "El consultorio no existe."
                }));
                return;
            }

            await consultorioService.eliminar(id);

            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje: "Consultorio eliminado correctamente."
            }));

            return;
        }

        // CITAS
        // GET - Listar
        if (req.method === "GET" && req.url === "/api/citas") {

            const resultado = await citaService.listar();

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // GET - Buscar
        if (
            req.method === "GET" &&
            req.url?.startsWith("/api/citas/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const resultado = await citaService.buscarPorId(id);

            if (resultado[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "La cita no existe."
                }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // POST - Agregar
        if (req.method === "POST" && req.url === "/api/citas") {

            let cuerpo = "";

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const cita = new Cita(
                        0,
                        new Date(datos.fecha),
                        datos.hora,
                        Number(datos.idPaciente),
                        Number(datos.idDoctor),
                        Number(datos.idConsultorio)
                    );

                    await citaService.agregar(cita);

                    res.writeHead(201);
                    res.end(JSON.stringify({
                        mensaje: "Cita agregada correctamente."
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

        // PUT - Editar
        if (
            req.method === "PUT" &&
            req.url?.startsWith("/api/citas/")
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

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const cita = new Cita(
                        id,
                        new Date(datos.fecha),
                        datos.hora,
                        Number(datos.idPaciente),
                        Number(datos.idDoctor),
                        Number(datos.idConsultorio)
                    );

                    await citaService.editar(cita);

                    res.writeHead(200);
                    res.end(JSON.stringify({
                        mensaje: "Cita actualizada correctamente."
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

        // DELETE - Eliminar
        if (
            req.method === "DELETE" &&
            req.url?.startsWith("/api/citas/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const existente = await citaService.buscarPorId(id);

            if (existente[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "La cita no existe."
                }));
                return;
            }

            await citaService.eliminar(id);

            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje: "Cita eliminada correctamente."
            }));

            return;
        }

        // HORARIOS
        // GET - Listar
        if (req.method === "GET" && req.url === "/api/horarios") {

            const resultado = await horarioService.listar();

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // GET - Buscar
        if (
            req.method === "GET" &&
            req.url?.startsWith("/api/horarios/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const resultado = await horarioService.buscarPorId(id);

            if (resultado[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "El horario no existe."
                }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // POST - Agregar
        if (req.method === "POST" && req.url === "/api/horarios") {

            let cuerpo = "";

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const horario = new Horario(
                        0,
                        datos.dia,
                        datos.horaInicio,
                        datos.horaFin,
                        Number(datos.idDoctor)
                    );

                    await horarioService.agregar(horario);

                    res.writeHead(201);
                    res.end(JSON.stringify({
                        mensaje: "Horario agregado correctamente."
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

        // PUT - Editar
        if (
            req.method === "PUT" &&
            req.url?.startsWith("/api/horarios/")
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

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const horario = new Horario(
                        id,
                        datos.dia,
                        datos.horaInicio,
                        datos.horaFin,
                        Number(datos.idDoctor)
                    );

                    await horarioService.editar(horario);

                    res.writeHead(200);
                    res.end(JSON.stringify({
                        mensaje: "Horario actualizado correctamente."
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

        // DELETE - Eliminar
        if (
            req.method === "DELETE" &&
            req.url?.startsWith("/api/horarios/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const existente = await horarioService.buscarPorId(id);

            if (existente[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "El horario no existe."
                }));
                return;
            }

            await horarioService.eliminar(id);

            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje: "Horario eliminado correctamente."
            }));

            return;
        }

        // RECETAS
        // GET - Listar
        if (req.method === "GET" && req.url === "/api/recetas") {

            const resultado = await recetaService.listar();

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // GET - Buscar
        if (
            req.method === "GET" &&
            req.url?.startsWith("/api/recetas/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const resultado = await recetaService.buscarPorId(id);

            if (resultado[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "La receta no existe."
                }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // POST - Agregar
        if (req.method === "POST" && req.url === "/api/recetas") {

            let cuerpo = "";

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const receta = new Receta(
                        0,
                        new Date(datos.fecha),
                        Number(datos.idCita)
                    );

                    await recetaService.agregar(receta);

                    res.writeHead(201);
                    res.end(JSON.stringify({
                        mensaje: "Receta agregada correctamente."
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

        // PUT - Editar
        if (
            req.method === "PUT" &&
            req.url?.startsWith("/api/recetas/")
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

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const receta = new Receta(
                        id,
                        new Date(datos.fecha),
                        Number(datos.idCita)
                    );

                    await recetaService.editar(receta);

                    res.writeHead(200);
                    res.end(JSON.stringify({
                        mensaje: "Receta actualizada correctamente."
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

        // DELETE - Eliminar
        if (
            req.method === "DELETE" &&
            req.url?.startsWith("/api/recetas/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const existente = await recetaService.buscarPorId(id);

            if (existente[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "La receta no existe."
                }));
                return;
            }

            await recetaService.eliminar(id);

            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje: "Receta eliminada correctamente."
            }));

            return;
        }

        // MEDICAMENTOS
        // GET - Listar
        if (req.method === "GET" && req.url === "/api/medicamentos") {

            const resultado = await medicamentoService.listar();

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // GET - Buscar
        if (
            req.method === "GET" &&
            req.url?.startsWith("/api/medicamentos/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const resultado = await medicamentoService.buscarPorId(id);

            if (resultado[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "El medicamento no existe."
                }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // POST - Agregar
        if (
            req.method === "POST" &&
            req.url === "/api/medicamentos"
        ) {

            let cuerpo = "";

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const medicamento = new Medicamento(
                        0,
                        datos.nombre,
                        datos.dosis,
                        Number(datos.idReceta)
                    );

                    await medicamentoService.agregar(medicamento);

                    res.writeHead(201);
                    res.end(JSON.stringify({
                        mensaje: "Medicamento agregado correctamente."
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

        // PUT - Editar
        if (
            req.method === "PUT" &&
            req.url?.startsWith("/api/medicamentos/")
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

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const medicamento = new Medicamento(
                        id,
                        datos.nombre,
                        datos.dosis,
                        Number(datos.idReceta)
                    );

                    await medicamentoService.editar(medicamento);

                    res.writeHead(200);
                    res.end(JSON.stringify({
                        mensaje: "Medicamento actualizado correctamente."
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

        // DELETE - Eliminar
        if (
            req.method === "DELETE" &&
            req.url?.startsWith("/api/medicamentos/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const existente = await medicamentoService.buscarPorId(id);

            if (existente[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "El medicamento no existe."
                }));
                return;
            }

            await medicamentoService.eliminar(id);

            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje: "Medicamento eliminado correctamente."
            }));

            return;
        }

        // PAGOS
        // GET - Listar
        if (req.method === "GET" && req.url === "/api/pagos") {

            const resultado = await pagoService.listar();

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // GET - Buscar
        if (
            req.method === "GET" &&
            req.url?.startsWith("/api/pagos/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const resultado = await pagoService.buscarPorId(id);

            if (resultado[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "El pago no existe."
                }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // POST - Agregar
        if (req.method === "POST" && req.url === "/api/pagos") {

            let cuerpo = "";

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const pago = new Pago(
                        0,
                        Number(datos.monto),
                        new Date(datos.fecha),
                        Number(datos.idPaciente)
                    );

                    await pagoService.agregar(pago);

                    res.writeHead(201);
                    res.end(JSON.stringify({
                        mensaje: "Pago agregado correctamente."
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

        // PUT - Editar
        if (
            req.method === "PUT" &&
            req.url?.startsWith("/api/pagos/")
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

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const pago = new Pago(
                        id,
                        Number(datos.monto),
                        new Date(datos.fecha),
                        Number(datos.idPaciente)
                    );

                    await pagoService.editar(pago);

                    res.writeHead(200);
                    res.end(JSON.stringify({
                        mensaje: "Pago actualizado correctamente."
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

        // DELETE - Eliminar
        if (
            req.method === "DELETE" &&
            req.url?.startsWith("/api/pagos/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const existente = await pagoService.buscarPorId(id);

            if (existente[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "El pago no existe."
                }));
                return;
            }

            await pagoService.eliminar(id);

            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje: "Pago eliminado correctamente."
            }));

            return;
        }

        // HISTORIALES
        // GET - Listar
        if (req.method === "GET" && req.url === "/api/historiales") {

            const resultado = await historialService.listar();

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // GET - Buscar
        if (
            req.method === "GET" &&
            req.url?.startsWith("/api/historiales/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const resultado = await historialService.buscarPorId(id);

            if (resultado[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "El historial no existe."
                }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(resultado[0]));
            return;
        }

        // POST - Agregar
        if (
            req.method === "POST" &&
            req.url === "/api/historiales"
        ) {

            let cuerpo = "";

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const historial = new Historial(
                        0,
                        datos.descripcion,
                        Number(datos.idPaciente)
                    );

                    await historialService.agregar(historial);

                    res.writeHead(201);
                    res.end(JSON.stringify({
                        mensaje: "Historial agregado correctamente."
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

        // PUT - Editar
        if (
            req.method === "PUT" &&
            req.url?.startsWith("/api/historiales/")
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

            req.on("data", parte => {
                cuerpo += parte;
            });

            req.on("end", async () => {

                try {

                    const datos = JSON.parse(cuerpo);

                    const historial = new Historial(
                        id,
                        datos.descripcion,
                        Number(datos.idPaciente)
                    );

                    await historialService.editar(historial);

                    res.writeHead(200);
                    res.end(JSON.stringify({
                        mensaje: "Historial actualizado correctamente."
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

        // DELETE - Eliminar
        if (
            req.method === "DELETE" &&
            req.url?.startsWith("/api/historiales/")
        ) {

            const id = Number(req.url.split("/")[3]);

            if (isNaN(id)) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: "El ID debe ser numérico."
                }));
                return;
            }

            const existente = await historialService.buscarPorId(id);

            if (existente[0].length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    error: "El historial no existe."
                }));
                return;
            }

            await historialService.eliminar(id);

            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje: "Historial eliminado correctamente."
            }));

            return;
        }

        // RUTA NO ENCONTRADA
        res.writeHead(404);
        res.end(JSON.stringify({
            error: "Ruta no encontrada."
        }));

    } catch (error: any) {

        console.error(error);

        res.writeHead(500);
        res.end(JSON.stringify({
            error: error.message
        }));
    }

});

// INICIAR SERVIDOR
servidor.listen(3000, () => {

    console.log("====================================");
    console.log("       API MÉDICA INICIADA");
    console.log("====================================");
    console.log("Servidor: http://localhost:3000");
    console.log("====================================");

});