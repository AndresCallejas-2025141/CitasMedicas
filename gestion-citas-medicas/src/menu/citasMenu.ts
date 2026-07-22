import { rl } from "../readline";
import { Cita } from "../models/cita";
import { CitaService } from "../services/citaService";
import { mostrarMenu } from "./menu";

const citaService = new CitaService();


export function menuCitas(): void {

    console.clear();

    console.log("====================================");
    console.log("         MENÚ CITAS");
    console.log("====================================");
    console.log("1. Agregar cita");
    console.log("2. Listar citas");
    console.log("3. Buscar cita");
    console.log("4. Editar cita");
    console.log("5. Eliminar cita");
    console.log("0. Regresar");
    console.log("====================================");
    rl.question("Seleccione una opción: ", async (opcion) => {

        switch (opcion) {

            case "1":
                agregarCita();
                break;

            case "2":
                await listarCitas();
                break;

            case "3":
                buscarCita();
                break;

            case "4":
                editarCita();
                break;

            case "5":
                eliminarCita();
                break;

            case "0":
                mostrarMenu();
                break;

            default:
                console.log("Opción inválida.");
                setTimeout(menuCitas, 1500);
                break;
        }

    });

}

function agregarCita(): void {

    console.clear();


    rl.question("Fecha (AAAA-MM-DD): ", (fecha) => {

        rl.question("Hora (HH:MM:SS): ", (hora) => {

            rl.question("ID del paciente: ", (idPaciente) => {

                rl.question("ID del doctor: ", (idDoctor) => {

                    rl.question("ID del consultorio: ", async (idConsultorio) => {


                        if (
                            fecha.trim() === "" ||
                            hora.trim() === "" ||
                            idPaciente.trim() === "" ||
                            idDoctor.trim() === "" ||
                            idConsultorio.trim() === ""
                        ) {

                            console.log("Error: No se permiten campos vacíos.");
                            volverMenuCitas();
                            return;

                        }


                        if (
                            isNaN(Number(idPaciente)) ||
                            isNaN(Number(idDoctor)) ||
                            isNaN(Number(idConsultorio))
                        ) {

                            console.log("Error: Los IDs deben ser numéricos.");
                            volverMenuCitas();
                            return;

                        }


                        try {


                            const cita = new Cita(
                                0,
                                new Date(fecha),
                                hora,
                                Number(idPaciente),
                                Number(idDoctor),
                                Number(idConsultorio)
                            );


                            await citaService.agregar(cita);


                            console.log("Cita agregada correctamente.");


                        } catch (error) {

                            console.error(error);

                        }


                        volverMenuCitas();


                    });

                });

            });

        });

    });

}

async function listarCitas(): Promise<void> {

    console.clear();


    try {

        const resultado = await citaService.listar();

        console.table(resultado[0]);


    } catch (error) {

        console.error(error);

    }


    volverMenuCitas();

}

function buscarCita(): void {

    console.clear();


    rl.question("Ingrese el ID de la cita: ", async (id) => {


        if (id.trim() === "") {

            console.log("Error: El ID no puede estar vacío.");
            volverMenuCitas();
            return;

        }


        if (isNaN(Number(id))) {

            console.log("Error: El ID debe ser numérico.");
            volverMenuCitas();
            return;

        }


        try {


            const resultado = await citaService.buscarPorId(Number(id));


            if (resultado[0].length === 0) {

                console.log("Error: Cita no encontrada.");

            } else {

                console.table(resultado[0]);

            }


        } catch (error) {

            console.error(error);

        }


        volverMenuCitas();


    });

}

function editarCita(): void {

    console.clear();


    rl.question("ID de la cita: ", (id) => {

        rl.question("Fecha (AAAA-MM-DD): ", (fecha) => {

            rl.question("Hora (HH:MM:SS): ", (hora) => {

                rl.question("ID del paciente: ", (idPaciente) => {

                    rl.question("ID del doctor: ", (idDoctor) => {

                        rl.question("ID del consultorio: ", async (idConsultorio) => {


                            if (
                                id.trim() === "" ||
                                fecha.trim() === "" ||
                                hora.trim() === "" ||
                                idPaciente.trim() === "" ||
                                idDoctor.trim() === "" ||
                                idConsultorio.trim() === ""
                            ) {

                                console.log("Error: No se permiten campos vacíos.");
                                volverMenuCitas();
                                return;

                            }


                            if (
                                isNaN(Number(id)) ||
                                isNaN(Number(idPaciente)) ||
                                isNaN(Number(idDoctor)) ||
                                isNaN(Number(idConsultorio))
                            ) {

                                console.log("Error: Los IDs deben ser numéricos.");
                                volverMenuCitas();
                                return;

                            }


                            try {


                                const cita = new Cita(
                                    Number(id),
                                    new Date(fecha),
                                    hora,
                                    Number(idPaciente),
                                    Number(idDoctor),
                                    Number(idConsultorio)
                                );


                                await citaService.editar(cita);


                                console.log("Cita actualizada correctamente.");


                            } catch (error) {

                                console.error(error);

                            }


                            volverMenuCitas();


                        });

                    });

                });

            });

        });

    });

}

function eliminarCita(): void {

    console.clear();


    rl.question("Ingrese el ID de la cita: ", async (id) => {


        if (id.trim() === "") {

            console.log("Error: El ID no puede estar vacío.");
            volverMenuCitas();
            return;

        }


        if (isNaN(Number(id))) {

            console.log("Error: El ID debe ser numérico.");
            volverMenuCitas();
            return;

        }


        try {


            await citaService.eliminar(Number(id));


            console.log("Cita eliminada correctamente.");


        } catch (error) {

            console.error(error);

        }


        volverMenuCitas();


    });

}

function volverMenuCitas(): void {

    rl.question("Presione ENTER para continuar...", () => {

        menuCitas();

    });

}