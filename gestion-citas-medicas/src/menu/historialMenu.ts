import { rl } from "../readline";
import { Historial } from "../models/historial";
import { HistorialService } from "../services/historialService";
import { mostrarMenu } from "./menu";

const historialService = new HistorialService();


export function menuHistorial(): void {

    console.clear();

    console.log("====================================");
    console.log("          MENÚ HISTORIAL");
    console.log("====================================");
    console.log("1. Agregar historial");
    console.log("2. Listar historiales");
    console.log("3. Buscar historial");
    console.log("4. Editar historial");
    console.log("5. Eliminar historial");
    console.log("0. Regresar");
    console.log("====================================");


    rl.question("Seleccione una opción: ", async (opcion) => {

        switch (opcion) {

            case "1":
                agregarHistorial();
                break;

            case "2":
                await listarHistoriales();
                break;

            case "3":
                buscarHistorial();
                break;

            case "4":
                editarHistorial();
                break;

            case "5":
                eliminarHistorial();
                break;

            case "0":
                mostrarMenu();
                break;

            default:
                console.log("Opción inválida.");
                setTimeout(menuHistorial, 1500);
                break;
        }

    });

}



function agregarHistorial(): void {

    console.clear();


    rl.question("Descripción: ", (descripcion) => {

        rl.question("ID del paciente: ", async (idPaciente) => {


            try {

                const historial = new Historial(
                    0,
                    descripcion,
                    Number(idPaciente)
                );


                await historialService.agregar(historial);


                console.log("Historial agregado correctamente.");


            } catch (error) {

                console.error(error);

            }


            volverMenuHistorial();

        });

    });

}



async function listarHistoriales(): Promise<void> {

    console.clear();


    try {

        const resultado = await historialService.listar();

        console.table(resultado[0]);


    } catch (error) {

        console.error(error);

    }


    volverMenuHistorial();

}



function buscarHistorial(): void {

    console.clear();


    rl.question("Ingrese el ID del historial: ", async (id) => {


        try {

            const resultado = await historialService.buscarPorId(Number(id));

            console.table(resultado[0]);


        } catch (error) {

            console.error(error);

        }


        volverMenuHistorial();


    });

}



function editarHistorial(): void {

    console.clear();


    rl.question("ID del historial: ", (idHistorial) => {


        rl.question("Descripción: ", (descripcion) => {


            rl.question("ID del paciente: ", async (idPaciente) => {


                try {


                    const historial = new Historial(
                        Number(idHistorial),
                        descripcion,
                        Number(idPaciente)
                    );


                    await historialService.editar(historial);


                    console.log("Historial actualizado correctamente.");


                } catch (error) {

                    console.error(error);

                }


                volverMenuHistorial();


            });


        });


    });

}



function eliminarHistorial(): void {

    console.clear();


    rl.question("Ingrese el ID del historial: ", async (id) => {


        try {

            await historialService.eliminar(Number(id));


            console.log("Historial eliminado correctamente.");


        } catch (error) {

            console.error(error);

        }


        volverMenuHistorial();


    });

}



function volverMenuHistorial(): void {

    rl.question("Presione ENTER para continuar...", () => {

        menuHistorial();

    });

}