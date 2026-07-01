export class Cita {
    constructor(
        public idCita: number,
        public fecha: Date,
        public hora: string,
        public idPaciente: number,
        public idDoctor: number,
        public idConsultorio: number
    ) {}
}