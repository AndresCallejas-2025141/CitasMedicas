import { rl } from "../readline";
import { Receta } from "../models/receta";
import { RecetaService } from "../services/recetaService";
import { mostrarMenu } from "./menu";

const recetaService = new RecetaService();


export function menuRecetas(): void {

    console.clear();

    console.log("====================================");
    console.log("         MENÚ RECETAS");
    console.log("====================================");
    console.log("1. Agregar receta");
    console.log("2. Listar recetas");
    console.log("3. Buscar receta");
    console.log("4. Editar receta");
    console.log("5. Eliminar receta");
    console.log("0. Regresar");
    console.log("====================================");
    rl.question("Seleccione una opción: ", async (opcion) => {


        switch (opcion) {

            case "1":
                agregarReceta();
                break;

            case "2":
                await listarRecetas();
                break;

            case "3":
                buscarReceta();
                break;

            case "4":
                editarReceta();
                break;

            case "5":
                eliminarReceta();
                break;

            case "0":
                mostrarMenu();
                break;

            default:
                console.log("Opción inválida.");
                setTimeout(menuRecetas, 1500);
                break;

        }

    });

}

function agregarReceta(): void {

    console.clear();


    rl.question("Fecha (YYYY-MM-DD): ", (fecha) => {


        rl.question("ID de la cita: ", async (idCita) => {


            if (
                fecha.trim() === "" ||
                idCita.trim() === ""
            ) {

                console.log("Error: No se permiten campos vacíos.");
                volverMenuRecetas();
                return;

            }


            if (isNaN(Number(idCita))) {

                console.log("Error: El ID de la cita debe ser numérico.");
                volverMenuRecetas();
                return;

            }


            const fechaValida = new Date(fecha);


            if (isNaN(fechaValida.getTime())) {

                console.log("Error: La fecha ingresada no es válida.");
                volverMenuRecetas();
                return;

            }


            try {


                const receta = new Receta(
                    0,
                    fechaValida,
                    Number(idCita)
                );


                await recetaService.agregar(receta);


                console.log("Receta agregada correctamente.");


            } catch (error) {

                console.error(error);

            }


            volverMenuRecetas();


        });


    });

}

async function listarRecetas(): Promise<void> {

    console.clear();


    try {


        const resultado = await recetaService.listar();


        console.table(resultado[0]);


    } catch (error) {

        console.error(error);

    }


    volverMenuRecetas();

}

function buscarReceta(): void {

    console.clear();


    rl.question("Ingrese el ID de la receta: ", async (id) => {


        if (id.trim() === "") {

            console.log("Error: El ID no puede estar vacío.");
            volverMenuRecetas();
            return;

        }


        if (isNaN(Number(id))) {

            console.log("Error: El ID debe ser numérico.");
            volverMenuRecetas();
            return;

        }


        try {


            const resultado = await recetaService.buscarPorId(Number(id));


            if (resultado[0].length === 0) {

                console.log("Error: Receta no encontrada.");

            } else {

                console.table(resultado[0]);

            }


        } catch (error) {

            console.error(error);

        }


        volverMenuRecetas();


    });

}

function editarReceta(): void {

    console.clear();


    rl.question("ID de la receta: ", (id) => {


        rl.question("Fecha (YYYY-MM-DD): ", (fecha) => {


            rl.question("ID de la cita: ", async (idCita) => {


                if (
                    id.trim() === "" ||
                    fecha.trim() === "" ||
                    idCita.trim() === ""
                ) {

                    console.log("Error: No se permiten campos vacíos.");
                    volverMenuRecetas();
                    return;

                }


                if (
                    isNaN(Number(id)) ||
                    isNaN(Number(idCita))
                ) {

                    console.log("Error: Los IDs deben ser números.");
                    volverMenuRecetas();
                    return;

                }

                const fechaValida = new Date(fecha);


                if (isNaN(fechaValida.getTime())) {

                    console.log("Error: Fecha inválida.");
                    volverMenuRecetas();
                    return;

                }


                try {


                    const receta = new Receta(
                        Number(id),
                        fechaValida,
                        Number(idCita)
                    );


                    await recetaService.editar(receta);


                    console.log("Receta actualizada correctamente.");


                } catch (error) {

                    console.error(error);

                }

                volverMenuRecetas();


            });


        });


    });

}

function eliminarReceta(): void {

    console.clear();


    rl.question("Ingrese el ID de la receta: ", async (id) => {


        if (id.trim() === "") {

            console.log("Error: El ID no puede estar vacío.");
            volverMenuRecetas();
            return;

        }


        if (isNaN(Number(id))) {

            console.log("Error: El ID debe ser numérico.");
            volverMenuRecetas();
            return;

        }

        try {


            await recetaService.eliminar(Number(id));


            console.log("Receta eliminada correctamente.");


        } catch (error) {

            console.error(error);

        }


        volverMenuRecetas();


    });

}

function volverMenuRecetas(): void {

    rl.question("Presione ENTER para continuar...", () => {

        menuRecetas();

    });

}