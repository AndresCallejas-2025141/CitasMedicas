export class Pago {
    constructor(
        public idPago: number,
        public monto: number,
        public fecha: Date,
        public idPaciente: number
    ) {}
}