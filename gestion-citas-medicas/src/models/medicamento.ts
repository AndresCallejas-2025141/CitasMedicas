export class Medicamento {
    constructor(
        public idMedicamento: number,
        public nombre: string,
        public dosis: string,
        public idReceta: number
    ) {}
}