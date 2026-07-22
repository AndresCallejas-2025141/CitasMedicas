import { rl } from "../readline";
import { menuPacientes } from "./pacienteMenu";
import { menuDoctores } from "./doctorMenu";

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
                console.log("Menú Especialidades");
                break;

            case "4":
                console.log("Menú Consultorios");
                break;

            case "5":
                console.log("Menú Citas");
                break;

            case "6":
                console.log("Menú Horarios");
                break;

            case "7":
                console.log("Menú Recetas");
                break;

            case "8":
                console.log("Menú Medicamentos");
                break;

            case "9":
                console.log("Menú Pagos");
                break;

            case "10":
                console.log("Menú Historial");
                break;

            case "0":
                console.log("\n¡Gracias por utilizar el sistema!");
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