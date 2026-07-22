import { rl } from "../readline";
import { Consultorio } from "../models/consultorio";
import { ConsultorioService } from "../services/consultorioService";
import { mostrarMenu } from "./menu";

const consultorioService = new ConsultorioService();

export function menuConsultorios(): void {

    console.clear();

    console.log("====================================");
    console.log("      MENÚ CONSULTORIOS");
    console.log("====================================");
    console.log("1. Agregar consultorio");
    console.log("2. Listar consultorios");
    console.log("3. Buscar consultorio");
    console.log("4. Editar consultorio");
    console.log("5. Eliminar consultorio");
    console.log("0. Regresar");
    console.log("====================================");

    rl.question("Seleccione una opción: ", async (opcion) => {

        switch (opcion) {

            case "1":
                agregarConsultorio();
                break;

            case "2":
                await listarConsultorios();
                break;

            case "3":
                buscarConsultorio();
                break;

            case "4":
                editarConsultorio();
                break;

            case "5":
                eliminarConsultorio();
                break;

            case "0":
                mostrarMenu();
                break;

            default:
                console.log("\nOpción inválida.");
                setTimeout(menuConsultorios, 1500);
                break;
        }

    });

}

function agregarConsultorio(): void {

    console.clear();

    rl.question("Número del consultorio: ", (numero) => {

        rl.question("Ubicación: ", async (ubicacion) => {

            try {

                const consultorio = new Consultorio(
                    0,
                    numero,
                    ubicacion
                );

                await consultorioService.agregar(consultorio);

                console.log("\nConsultorio agregado correctamente.");

            } catch (error) {

                console.error(error);

            }

            volverMenuConsultorios();

        });

    });

}

async function listarConsultorios(): Promise<void> {

    console.clear();

    try {

        const resultado = await consultorioService.listar();

        console.table(resultado[0]);

    } catch (error) {

        console.error(error);

    }

    volverMenuConsultorios();

}

function buscarConsultorio(): void {

    console.clear();

    rl.question("Ingrese el ID del consultorio: ", async (id) => {

        try {

            const resultado = await consultorioService.buscarPorId(Number(id));

            console.table(resultado[0]);

        } catch (error) {

            console.error(error);

        }

        volverMenuConsultorios();

    });

}

function editarConsultorio(): void {

    console.clear();

    rl.question("ID: ", (id) => {

        rl.question("Número: ", (numero) => {

            rl.question("Ubicación: ", async (ubicacion) => {

                try {

                    const consultorio = new Consultorio(
                        Number(id),
                        numero,
                        ubicacion
                    );

                    await consultorioService.editar(consultorio);

                    console.log("\nConsultorio actualizado correctamente.");

                } catch (error) {

                    console.error(error);

                }

                volverMenuConsultorios();

            });

        });

    });

}

function eliminarConsultorio(): void {

    console.clear();

    rl.question("Ingrese el ID del consultorio: ", async (id) => {

        try {

            await consultorioService.eliminar(Number(id));

            console.log("\nConsultorio eliminado correctamente.");

        } catch (error) {

            console.error(error);

        }

        volverMenuConsultorios();

    });

}

function volverMenuConsultorios(): void {

    rl.question("\nPresione ENTER para continuar...", () => {

        menuConsultorios();

    });

}