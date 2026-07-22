import { rl } from "../readline";
import { Especialidad } from "../models/especialidad";
import { EspecialidadService } from "../services/especialidadService";
import { mostrarMenu } from "./menu";

const especialidadService = new EspecialidadService();

export function menuEspecialidades(): void {

    console.clear();

    console.log("====================================");
    console.log("     MENÚ ESPECIALIDADES");
    console.log("====================================");
    console.log("1. Agregar especialidad");
    console.log("2. Listar especialidades");
    console.log("3. Buscar especialidad");
    console.log("4. Editar especialidad");
    console.log("5. Eliminar especialidad");
    console.log("0. Regresar");
    console.log("====================================");

    rl.question("Seleccione una opción: ", async (opcion) => {

        switch (opcion) {

            case "1":
                agregarEspecialidad();
                break;

            case "2":
                await listarEspecialidades();
                break;

            case "3":
                buscarEspecialidad();
                break;

            case "4":
                editarEspecialidad();
                break;

            case "5":
                eliminarEspecialidad();
                break;

            case "0":
                mostrarMenu();
                break;

            default:
                console.log("Opción inválida.");
                setTimeout(menuEspecialidades, 1500);
                break;
        }

    });

}

function agregarEspecialidad(): void {

    console.clear();

    rl.question("Nombre de la especialidad: ", async (nombre) => {

        try {

            const especialidad = new Especialidad(
                0,
                nombre
            );

            await especialidadService.agregar(especialidad);

            console.log("Especialidad agregada correctamente.");

        } catch (error) {

            console.error(error);

        }

        volverMenuEspecialidades();

    });

}

async function listarEspecialidades(): Promise<void> {

    console.clear();

    try {

        const resultado = await especialidadService.listar();

        console.table(resultado[0]);

    } catch (error) {

        console.error(error);

    }

    volverMenuEspecialidades();

}

function buscarEspecialidad(): void {

    console.clear();

    rl.question("Ingrese el ID de la especialidad: ", async (id) => {

        try {

            const resultado = await especialidadService.buscarPorId(Number(id));

            console.table(resultado[0]);

        } catch (error) {

            console.error(error);

        }

        volverMenuEspecialidades();

    });

}

function editarEspecialidad(): void {

    console.clear();

    rl.question("ID: ", (id) => {

        rl.question("Nombre: ", async (nombre) => {

            try {

                const especialidad = new Especialidad(
                    Number(id),
                    nombre
                );

                await especialidadService.editar(especialidad);

                console.log("Especialidad actualizada correctamente.");

            } catch (error) {

                console.error(error);

            }

            volverMenuEspecialidades();

        });

    });

}

function eliminarEspecialidad(): void {

    console.clear();

    rl.question("Ingrese el ID de la especialidad: ", async (id) => {

        try {

            await especialidadService.eliminar(Number(id));

            console.log("Especialidad eliminada correctamente.");

        } catch (error) {

            console.error(error);

        }

        volverMenuEspecialidades();

    });

}

function volverMenuEspecialidades(): void {

    rl.question("Presione ENTER para continuar...", () => {

        menuEspecialidades();

    });

}