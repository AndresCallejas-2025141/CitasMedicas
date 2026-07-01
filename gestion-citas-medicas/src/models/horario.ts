export class Horario {
    constructor(
        public idHorario: number,
        public dia: string,
        public horaInicio: string,
        public horaFin: string,
        public idDoctor: number
    ) {}
}