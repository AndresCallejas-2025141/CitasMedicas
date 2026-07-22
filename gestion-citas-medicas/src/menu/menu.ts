import { rl } from "../readline";
import { menuPacientes } from "./pacienteMenu";
import { menuDoctores } from "./doctorMenu";
import { menuEspecialidades } from "./especialidadMenu";
import { menuConsultorios } from "./consultorioMenu";
import { menuCitas } from "./citasMenu";
import { menuHorarios } from "./horarioMenu";
import { menuRecetas } from "./recetaMenu";
import { menuMedicamentos } from "./medicamentoMenu";
import { menuPagos } from "./pagoMenu";
import { menuHistorial } from "./historialMenu";

export function mostrarMenu(): void {

    console.clear();

    console.log("====================================");
    console.log("GESTIÓN DE CITAS MÉDICAS");
    console.log("====================================");
    console.log("1. Pacientes");
    console.log("2. Doctores");
    console.log("3. Especialidades");
    console.log("4. Consultorios");
    console.log("5. Citas");
    console.log("6. Horarios");
    console.log("7. Recetas");
    console.log("8. Medicamentos");
    console.log("9. Pagos");
    console.log("10. Historial");
    console.log("0. Salir");
    console.log("====================================");
    console.log("====================================");
    rl.question("Seleccione una opción: ", (opcion) => {

        switch (opcion) {

            case "1":
                menuPacientes();
                break;

            case "2":
                menuDoctores();
                break;

            case "3":
                menuEspecialidades();
                break;

            case "4":
                menuConsultorios();
                break;

            case "5":
                menuCitas();
                break;

            case "6":
                menuHorarios();
                break;

            case "7":
                menuRecetas();
                break;

            case "8":
                menuMedicamentos();
                break;

            case "9":
                menuPagos();
                break;

            case "10":
                menuHistorial();
                break;

            case "0":
                console.log("¡Gracias por utilizar el sistema!");
                rl.close();
                return;

            default:
                console.log("Opción inválida.");
        }

        setTimeout(() => {
            mostrarMenu();
        }, 1500);

    });

}