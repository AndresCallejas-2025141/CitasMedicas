import { rl } from "../readline";
import { Horario } from "../models/horario";
import { HorarioService } from "../services/horarioService";
import { mostrarMenu } from "./menu";

const horarioService = new HorarioService();


export function menuHorarios(): void {

    console.clear();

    console.log("====================================");
    console.log("        MENÚ HORARIOS");
    console.log("====================================");
    console.log("1. Agregar horario");
    console.log("2. Listar horarios");
    console.log("3. Buscar horario");
    console.log("4. Editar horario");
    console.log("5. Eliminar horario");
    console.log("0. Regresar");
    console.log("====================================");
    rl.question("Seleccione una opción: ", async (opcion) => {


        switch (opcion) {

            case "1":
                agregarHorario();
                break;

            case "2":
                await listarHorarios();
                break;

            case "3":
                buscarHorario();
                break;

            case "4":
                editarHorario();
                break;

            case "5":
                eliminarHorario();
                break;

            case "0":
                mostrarMenu();
                break;

            default:
                console.log("Opción inválida.");
                setTimeout(menuHorarios, 1500);
                break;

        }

    });

}

function agregarHorario(): void {

    console.clear();


    rl.question("Día: ", (dia) => {

        rl.question("Hora de inicio (HH:MM:SS): ", (horaInicio) => {


            rl.question("Hora de fin (HH:MM:SS): ", (horaFin) => {


                rl.question("ID del doctor: ", async (idDoctor) => {


                    if (
                        dia.trim() === "" ||
                        horaInicio.trim() === "" ||
                        horaFin.trim() === "" ||
                        idDoctor.trim() === ""
                    ) {

                        console.log("Error: No se permiten campos vacíos.");
                        volverMenuHorarios();
                        return;

                    }

                    if (isNaN(Number(idDoctor))) {

                        console.log("Error: El ID del doctor debe ser numérico.");
                        volverMenuHorarios();
                        return;

                    }


                    if (!validarHora(horaInicio) || !validarHora(horaFin)) {

                        console.log("Error: Formato de hora inválido.");
                        volverMenuHorarios();
                        return;

                    }


                    try {

                        const horario = new Horario(
                            0,
                            dia,
                            horaInicio,
                            horaFin,
                            Number(idDoctor)
                        );


                        await horarioService.agregar(horario);


                        console.log("Horario agregado correctamente.");


                    } catch (error) {

                        console.error(error);

                    }


                    volverMenuHorarios();


                });


            });


        });


    });

}

async function listarHorarios(): Promise<void> {

    console.clear();


    try {

        const resultado = await horarioService.listar();

        console.table(resultado[0]);


    } catch (error) {

        console.error(error);

    }


    volverMenuHorarios();

}

function buscarHorario(): void {

    console.clear();


    rl.question("Ingrese el ID del horario: ", async (id) => {


        if (id.trim() === "") {

            console.log("Error: El ID no puede estar vacío.");
            volverMenuHorarios();
            return;

        }

        if (isNaN(Number(id))) {

            console.log("Error: El ID debe ser numérico.");
            volverMenuHorarios();
            return;

        }


        try {


            const resultado = await horarioService.buscarPorId(Number(id));


            if (resultado[0].length === 0) {

                console.log("Error: Horario no encontrado.");

            } else {

                console.table(resultado[0]);

            }


        } catch (error) {

            console.error(error);

        }


        volverMenuHorarios();


    });

}

function editarHorario(): void {

    console.clear();


    rl.question("ID del horario: ", (id) => {


        rl.question("Día: ", (dia) => {


            rl.question("Hora de inicio (HH:MM:SS): ", (horaInicio) => {


                rl.question("Hora de fin (HH:MM:SS): ", (horaFin) => {


                    rl.question("ID del doctor: ", async (idDoctor) => {


                        if (
                            id.trim() === "" ||
                            dia.trim() === "" ||
                            horaInicio.trim() === "" ||
                            horaFin.trim() === "" ||
                            idDoctor.trim() === ""
                        ) {

                            console.log("Error: No se permiten campos vacíos.");
                            volverMenuHorarios();
                            return;

                        }


                        if (
                            isNaN(Number(id)) ||
                            isNaN(Number(idDoctor))
                        ) {

                            console.log("Error: Los IDs deben ser numéricos.");
                            volverMenuHorarios();
                            return;

                        }


                        if (!validarHora(horaInicio) || !validarHora(horaFin)) {

                            console.log("Error: Formato de hora inválido.");
                            volverMenuHorarios();
                            return;

                        }


                        try {


                            const horario = new Horario(
                                Number(id),
                                dia,
                                horaInicio,
                                horaFin,
                                Number(idDoctor)
                            );


                            await horarioService.editar(horario);


                            console.log("Horario actualizado correctamente.");


                        } catch (error) {

                            console.error(error);

                        }


                        volverMenuHorarios();


                    });


                });


            });


        });


    });

}

function eliminarHorario(): void {

    console.clear();


    rl.question("Ingrese el ID del horario: ", async (id) => {


        if (id.trim() === "") {

            console.log("Error: El ID no puede estar vacío.");
            volverMenuHorarios();
            return;

        }


        if (isNaN(Number(id))) {

            console.log("Error: El ID debe ser numérico.");
            volverMenuHorarios();
            return;

        }


        try {


            await horarioService.eliminar(Number(id));


            console.log("Horario eliminado correctamente.");


        } catch (error) {

            console.error(error);

        }


        volverMenuHorarios();


    });

}

function validarHora(hora: string): boolean {

    const formato = /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

    return formato.test(hora);

}

function volverMenuHorarios(): void {

    rl.question("Presione ENTER para continuar...", () => {

        menuHorarios();

    });

}