import { rl } from "../readline";
import { Medicamento } from "../models/medicamento";
import { MedicamentoService } from "../services/medicamentoService";
import { mostrarMenu } from "./menu";

const medicamentoService = new MedicamentoService();

export function menuMedicamentos(): void {

    console.clear();

    console.log("====================================");
    console.log("      MENÚ MEDICAMENTOS");
    console.log("====================================");
    console.log("1. Agregar medicamento");
    console.log("2. Listar medicamentos");
    console.log("3. Buscar medicamento");
    console.log("4. Editar medicamento");
    console.log("5. Eliminar medicamento");
    console.log("0. Regresar");
    console.log("====================================");

    rl.question("Seleccione una opción: ", async (opcion) => {

        switch (opcion) {

            case "1":
                agregarMedicamento();
                break;

            case "2":
                await listarMedicamentos();
                break;

            case "3":
                buscarMedicamento();
                break;

            case "4":
                editarMedicamento();
                break;

            case "5":
                eliminarMedicamento();
                break;

            case "0":
                mostrarMenu();
                break;

            default:
                console.log("Opción inválida.");
                setTimeout(menuMedicamentos, 1500);
                break;
        }

    });

}

function agregarMedicamento(): void {

    console.clear();

    rl.question("Nombre: ", (nombre) => {

        rl.question("Dosis: ", (dosis) => {

            rl.question("ID de la receta: ", async (idReceta) => {

                try {

                    const medicamento = new Medicamento(
                        0,
                        nombre,
                        dosis,
                        Number(idReceta)
                    );

                    await medicamentoService.agregar(medicamento);

                    console.log("Medicamento agregado correctamente.");

                } catch (error) {

                    console.error(error);

                }

                volverMenuMedicamentos();

            });

        });

    });

}

async function listarMedicamentos(): Promise<void> {

    console.clear();

    try {

        const resultado = await medicamentoService.listar();

        console.table(resultado[0]);

    } catch (error) {

        console.error(error);

    }

    volverMenuMedicamentos();

}

function buscarMedicamento(): void {

    console.clear();

    rl.question("Ingrese el ID del medicamento: ", async (id) => {

        try {

            const resultado = await medicamentoService.buscarPorId(Number(id));

            console.table(resultado[0]);

        } catch (error) {

            console.error(error);

        }

        volverMenuMedicamentos();

    });

}

function editarMedicamento(): void {

    console.clear();

    rl.question("ID del medicamento: ", (id) => {

        rl.question("Nombre: ", (nombre) => {

            rl.question("Dosis: ", (dosis) => {

                rl.question("ID de la receta: ", async (idReceta) => {

                    try {

                        const medicamento = new Medicamento(
                            Number(id),
                            nombre,
                            dosis,
                            Number(idReceta)
                        );

                        await medicamentoService.editar(medicamento);

                        console.log("Medicamento actualizado correctamente.");

                    } catch (error) {

                        console.error(error);

                    }

                    volverMenuMedicamentos();

                });

            });

        });

    });

}

function eliminarMedicamento(): void {

    console.clear();

    rl.question("Ingrese el ID del medicamento: ", async (id) => {

        try {

            await medicamentoService.eliminar(Number(id));

            console.log("Medicamento eliminado correctamente.");

        } catch (error) {

            console.error(error);

        }

        volverMenuMedicamentos();

    });

}

function volverMenuMedicamentos(): void {

    rl.question("Presione ENTER para continuar...", () => {

        menuMedicamentos();

    });

}