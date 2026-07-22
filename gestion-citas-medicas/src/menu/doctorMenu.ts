import { rl } from "../readline";
import { Doctor } from "../models/doctor";
import { DoctorService } from "../services/doctorService";
import { mostrarMenu } from "./menu";

const doctorService = new DoctorService();


export function menuDoctores(): void {

    console.clear();

    console.log("====================================");
    console.log("        MENÚ DOCTORES");
    console.log("====================================");
    console.log("1. Agregar doctor");
    console.log("2. Listar doctores");
    console.log("3. Buscar doctor");
    console.log("4. Editar doctor");
    console.log("5. Eliminar doctor");
    console.log("0. Regresar");
    console.log("====================================");
    rl.question("Seleccione una opción: ", async (opcion) => {

        switch (opcion) {

            case "1":
                agregarDoctor();
                break;

            case "2":
                await listarDoctores();
                break;

            case "3":
                buscarDoctor();
                break;

            case "4":
                editarDoctor();
                break;

            case "5":
                eliminarDoctor();
                break;

            case "0":
                mostrarMenu();
                break;

            default:
                console.log("Opción inválida.");
                setTimeout(menuDoctores, 1500);
                break;
        }

    });

}

function agregarDoctor(): void {

    console.clear();


    rl.question("Nombre: ", (nombre) => {


        rl.question("ID de la especialidad: ", async (especialidadId) => {


            if (
                nombre.trim() === "" ||
                especialidadId.trim() === ""
            ) {

                console.log("Error: No se permiten campos vacíos.");
                volverMenuDoctores();
                return;

            }


            if (isNaN(Number(especialidadId))) {

                console.log("Error: El ID de la especialidad debe ser numérico.");
                volverMenuDoctores();
                return;

            }


            try {


                const doctor = new Doctor(
                    0,
                    nombre,
                    Number(especialidadId)
                );


                await doctorService.agregar(doctor);


                console.log("Doctor agregado correctamente.");


            } catch (error) {

                console.error(error);

            }


            volverMenuDoctores();


        });


    });

}

async function listarDoctores(): Promise<void> {

    console.clear();


    try {

        const resultado = await doctorService.listar();

        console.table(resultado[0]);


    } catch (error) {

        console.error(error);

    }


    volverMenuDoctores();

}

function buscarDoctor(): void {

    console.clear();


    rl.question("Ingrese el ID del doctor: ", async (id) => {


        if (id.trim() === "") {

            console.log("Error: El ID no puede estar vacío.");
            volverMenuDoctores();
            return;

        }


        if (isNaN(Number(id))) {

            console.log("Error: El ID debe ser numérico.");
            volverMenuDoctores();
            return;

        }


        try {


            const resultado = await doctorService.buscarPorId(Number(id));


            if (resultado[0].length === 0) {

                console.log("Error: Doctor no encontrado.");

            } else {

                console.table(resultado[0]);

            }


        } catch (error) {

            console.error(error);

        }


        volverMenuDoctores();


    });

}

function editarDoctor(): void {

    console.clear();


    rl.question("ID: ", (id) => {


        rl.question("Nombre: ", (nombre) => {


            rl.question("ID de la especialidad: ", async (especialidadId) => {


                if (
                    id.trim() === "" ||
                    nombre.trim() === "" ||
                    especialidadId.trim() === ""
                ) {

                    console.log("Error: No se permiten campos vacíos.");
                    volverMenuDoctores();
                    return;

                }


                if (
                    isNaN(Number(id)) ||
                    isNaN(Number(especialidadId))
                ) {

                    console.log("Error: Los IDs deben ser numéricos.");
                    volverMenuDoctores();
                    return;

                }


                try {


                    const doctor = new Doctor(
                        Number(id),
                        nombre,
                        Number(especialidadId)
                    );


                    await doctorService.editar(doctor);


                    console.log("Doctor actualizado correctamente.");


                } catch (error) {

                    console.error(error);

                }


                volverMenuDoctores();


            });


        });


    });

}

function eliminarDoctor(): void {

    console.clear();


    rl.question("Ingrese el ID del doctor: ", async (id) => {


        if (id.trim() === "") {

            console.log("Error: El ID no puede estar vacío.");
            volverMenuDoctores();
            return;

        }


        if (isNaN(Number(id))) {

            console.log("Error: El ID debe ser numérico.");
            volverMenuDoctores();
            return;

        }


        try {


            await doctorService.eliminar(Number(id));


            console.log("Doctor eliminado correctamente.");


        } catch (error) {

            console.error(error);

        }


        volverMenuDoctores();


    });

}

function volverMenuDoctores(): void {

    rl.question("Presione ENTER para continuar...", () => {

        menuDoctores();

    });

}