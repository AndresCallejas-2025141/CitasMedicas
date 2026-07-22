import { rl } from "../readline";
import { Paciente } from "../models/paciente";
import { PacienteService } from "../services/pacienteService";
import { mostrarMenu } from "./menu";

const pacienteService = new PacienteService();


export function menuPacientes(): void {

    console.clear();

    console.log("====================================");
    console.log("        MENÚ PACIENTES");
    console.log("====================================");
    console.log("1. Agregar paciente");
    console.log("2. Listar pacientes");
    console.log("3. Buscar paciente");
    console.log("4. Editar paciente");
    console.log("5. Eliminar paciente");
    console.log("0. Regresar");
    console.log("====================================");
    rl.question("Seleccione una opción: ", async (opcion) => {


        switch (opcion) {

            case "1":
                agregarPaciente();
                break;

            case "2":
                await listarPacientes();
                break;

            case "3":
                buscarPaciente();
                break;

            case "4":
                editarPaciente();
                break;

            case "5":
                eliminarPaciente();
                break;

            case "0":
                mostrarMenu();
                break;

            default:
                console.log("Opción inválida.");
                setTimeout(menuPacientes, 1500);
                break;

        }

    });

}

function agregarPaciente(): void {

    console.clear();


    rl.question("Nombre: ", (nombre) => {


        rl.question("Teléfono: ", (telefono) => {


            rl.question("Correo: ", async (correo) => {


                if (
                    nombre.trim() === "" ||
                    telefono.trim() === "" ||
                    correo.trim() === ""
                ) {

                    console.log("Error: No se permiten campos vacíos.");
                    volverMenuPacientes();
                    return;

                }


                if (isNaN(Number(telefono))) {

                    console.log("Error: El teléfono debe ser numérico.");
                    volverMenuPacientes();
                    return;

                }

                try {


                    const paciente = new Paciente(
                        0,
                        nombre,
                        telefono,
                        correo
                    );


                    await pacienteService.agregar(paciente);


                    console.log("Paciente agregado correctamente.");


                } catch (error) {

                    console.error(error);

                }


                volverMenuPacientes();


            });


        });


    });

}

async function listarPacientes(): Promise<void> {

    console.clear();


    try {

        const resultado = await pacienteService.listar();

        console.table(resultado[0]);


    } catch (error) {

        console.error(error);

    }


    volverMenuPacientes();

}

function buscarPaciente(): void {

    console.clear();


    rl.question("Ingrese el ID del paciente: ", async (id) => {


        if (id.trim() === "") {

            console.log("Error: El ID no puede estar vacío.");
            volverMenuPacientes();
            return;

        }


        if (isNaN(Number(id))) {

            console.log("Error: El ID debe ser numérico.");
            volverMenuPacientes();
            return;

        }


        try {


            const resultado = await pacienteService.buscarPorId(Number(id));


            if (resultado[0].length === 0) {

                console.log("Error: Paciente no encontrado.");

            } else {

                console.table(resultado[0]);

            }


        } catch (error) {

            console.error(error);

        }


        volverMenuPacientes();


    });

}

function editarPaciente(): void {

    console.clear();


    rl.question("ID: ", (id) => {


        rl.question("Nombre: ", (nombre) => {


            rl.question("Teléfono: ", (telefono) => {


                rl.question("Correo: ", async (correo) => {


                    if (
                        id.trim() === "" ||
                        nombre.trim() === "" ||
                        telefono.trim() === "" ||
                        correo.trim() === ""
                    ) {

                        console.log("Error: No se permiten campos vacíos.");
                        volverMenuPacientes();
                        return;

                    }


                    if (
                        isNaN(Number(id)) ||
                        isNaN(Number(telefono))
                    ) {

                        console.log("Error: ID y teléfono deben ser numéricos.");
                        volverMenuPacientes();
                        return;

                    }


                    try {


                        const paciente = new Paciente(
                            Number(id),
                            nombre,
                            telefono,
                            correo
                        );


                        await pacienteService.editar(paciente);


                        console.log("Paciente actualizado correctamente.");


                    } catch (error) {

                        console.error(error);

                    }


                    volverMenuPacientes();


                });


            });


        });


    });

}

function eliminarPaciente(): void {

    console.clear();


    rl.question("Ingrese el ID del paciente: ", async (id) => {


        if (id.trim() === "") {

            console.log("Error: El ID no puede estar vacío.");
            volverMenuPacientes();
            return;

        }


        if (isNaN(Number(id))) {

            console.log("Error: El ID debe ser numérico.");
            volverMenuPacientes();
            return;

        }

        try {


            await pacienteService.eliminar(Number(id));


            console.log("Paciente eliminado correctamente.");


        } catch (error) {

            console.error(error);

        }


        volverMenuPacientes();


    });

}

function volverMenuPacientes(): void {

    rl.question("Presione ENTER para continuar...", () => {

        menuPacientes();

    });

}