import { rl } from "../readline";
import { Pago } from "../models/pago";
import { PagoService } from "../services/pagoService";
import { mostrarMenu } from "./menu";

const pagoService = new PagoService();


export function menuPagos(): void {

    console.clear();

    console.log("====================================");
    console.log("            MENÚ PAGOS");
    console.log("====================================");
    console.log("1. Agregar pago");
    console.log("2. Listar pagos");
    console.log("3. Buscar pago");
    console.log("4. Editar pago");
    console.log("5. Eliminar pago");
    console.log("0. Regresar");
    console.log("====================================");


    rl.question("Seleccione una opción: ", async (opcion) => {

        switch (opcion) {

            case "1":
                agregarPago();
                break;

            case "2":
                await listarPagos();
                break;

            case "3":
                buscarPago();
                break;

            case "4":
                editarPago();
                break;

            case "5":
                eliminarPago();
                break;

            case "0":
                mostrarMenu();
                break;

            default:
                console.log("Opción inválida.");
                setTimeout(menuPagos, 1500);
                break;
        }

    });

}



function agregarPago(): void {

    console.clear();


    rl.question("Monto: ", (monto) => {

        rl.question("Fecha (YYYY-MM-DD): ", (fecha) => {

            rl.question("ID del paciente: ", async (idPaciente) => {


                try {

                    const pago = new Pago(
                        0,
                        Number(monto),
                        new Date(fecha),
                        Number(idPaciente)
                    );


                    await pagoService.agregar(pago);


                    console.log("Pago agregado correctamente.");


                } catch (error) {

                    console.error(error);

                }


                volverMenuPagos();

            });

        });

    });

}



async function listarPagos(): Promise<void> {

    console.clear();


    try {

        const resultado = await pagoService.listar();

        console.table(resultado[0]);


    } catch (error) {

        console.error(error);

    }


    volverMenuPagos();

}



function buscarPago(): void {

    console.clear();


    rl.question("Ingrese el ID del pago: ", async (id) => {


        try {

            const resultado = await pagoService.buscarPorId(Number(id));

            console.table(resultado[0]);


        } catch (error) {

            console.error(error);

        }


        volverMenuPagos();

    });

}



function editarPago(): void {

    console.clear();


    rl.question("ID del pago: ", (idPago) => {


        rl.question("Monto: ", (monto) => {


            rl.question("Fecha (YYYY-MM-DD): ", (fecha) => {


                rl.question("ID del paciente: ", async (idPaciente) => {


                    try {


                        const pago = new Pago(
                            Number(idPago),
                            Number(monto),
                            new Date(fecha),
                            Number(idPaciente)
                        );


                        await pagoService.editar(pago);


                        console.log("Pago actualizado correctamente.");


                    } catch (error) {

                        console.error(error);

                    }


                    volverMenuPagos();


                });


            });


        });


    });

}



function eliminarPago(): void {

    console.clear();


    rl.question("Ingrese el ID del pago: ", async (id) => {


        try {

            await pagoService.eliminar(Number(id));


            console.log("Pago eliminado correctamente.");


        } catch (error) {

            console.error(error);

        }


        volverMenuPagos();


    });

}



function volverMenuPagos(): void {

    rl.question("Presione ENTER para continuar...", () => {

        menuPagos();

    });

}