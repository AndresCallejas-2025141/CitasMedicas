drop database if exists citasmedicas_in5cm;
create database citasmedicas_in5cm;
use citasmedicas_in5cm;

create table paciente (
    id_paciente int auto_increment primary key,
    nombre varchar(100) not null,
    telefono varchar(20),
    correo varchar(100)
);

create table especialidad (
    id_especialidad int auto_increment primary key,
    nombre varchar(100) not null
);

create table doctor (
    id_doctor int auto_increment primary key,
    nombre varchar(100) not null,
    especialidad_id int,
    foreign key (especialidad_id) references especialidad(id_especialidad)
);

create table consultorio (
    id_consultorio int auto_increment primary key,
    numero varchar(10),
    ubicacion varchar(100)
);

create table cita (
    id_cita int auto_increment primary key,
    fecha date not null,
    hora time not null,
    id_paciente int,
    id_doctor int,
    id_consultorio int,
    foreign key (id_paciente) references paciente(id_paciente),
    foreign key (id_doctor) references doctor(id_doctor),
    foreign key (id_consultorio) references consultorio(id_consultorio)
);

create table horario (
    id_horario int auto_increment primary key,
    dia varchar(20),
    hora_inicio time,
    hora_fin time,
    id_doctor int,
    foreign key (id_doctor) references doctor(id_doctor)
);

create table receta (
    id_receta int auto_increment primary key,
    fecha date,
    id_cita int unique,
    foreign key (id_cita) references cita(id_cita)
);

create table medicamento (
    id_medicamento int auto_increment primary key,
    nombre varchar(100),
    dosis varchar(100),
    id_receta int,
    foreign key (id_receta) references receta(id_receta)
);

create table pago (
    id_pago int auto_increment primary key,
    monto decimal(10,2),
    fecha date,
    id_paciente int,
    foreign key (id_paciente) references paciente(id_paciente)
);

create table historial (
    id_historial int auto_increment primary key,
    descripcion text,
    id_paciente int,
    foreign key (id_paciente) references paciente(id_paciente)
);

delimiter $$

create procedure listar_paciente()
begin
    select * from paciente;
end $$

create procedure agregar_paciente(in p_nombre varchar(100), in p_telefono varchar(20), in p_correo varchar(100))
begin
    insert into paciente(nombre, telefono, correo) values(p_nombre, p_telefono, p_correo);
end $$

create procedure editar_paciente(in p_id int, in p_nombre varchar(100), in p_telefono varchar(20), in p_correo varchar(100))
begin
    update paciente set nombre=p_nombre, telefono=p_telefono, correo=p_correo where id_paciente=p_id;
end $$

create procedure eliminar_paciente(in p_id int)
begin
    delete from paciente where id_paciente=p_id;
end $$

create procedure buscar_paciente_id(in p_id int)
begin
    select * from paciente where id_paciente=p_id;
end $$


create procedure listar_doctor()
begin
    select * from doctor;
end $$

create procedure agregar_doctor(in p_nombre varchar(100), in p_especialidad int)
begin
    insert into doctor(nombre, especialidad_id) values(p_nombre, p_especialidad);
end $$

create procedure editar_doctor(in p_id int, in p_nombre varchar(100), in p_especialidad int)
begin
    update doctor set nombre=p_nombre, especialidad_id=p_especialidad where id_doctor=p_id;
end $$

create procedure eliminar_doctor(in p_id int)
begin
    delete from doctor where id_doctor=p_id;
end $$

create procedure buscar_doctor_id(in p_id int)
begin
    select * from doctor where id_doctor=p_id;
end $$


create procedure listar_especialidad()
begin
    select * from especialidad;
end $$

create procedure agregar_especialidad(in p_nombre varchar(100))
begin
    insert into especialidad(nombre) values(p_nombre);
end $$

create procedure editar_especialidad(in p_id int, in p_nombre varchar(100))
begin
    update especialidad set nombre=p_nombre where id_especialidad=p_id;
end $$

create procedure eliminar_especialidad(in p_id int)
begin
    delete from especialidad where id_especialidad=p_id;
end $$

create procedure buscar_especialidad_id(in p_id int)
begin
    select * from especialidad where id_especialidad=p_id;
end $$


create procedure listar_consultorio()
begin
    select * from consultorio;
end $$

create procedure agregar_consultorio(in p_numero varchar(10), in p_ubicacion varchar(100))
begin
    insert into consultorio(numero, ubicacion) values(p_numero, p_ubicacion);
end $$

create procedure editar_consultorio(in p_id int, in p_numero varchar(10), in p_ubicacion varchar(100))
begin
    update consultorio set numero=p_numero, ubicacion=p_ubicacion where id_consultorio=p_id;
end $$

create procedure eliminar_consultorio(in p_id int)
begin
    delete from consultorio where id_consultorio=p_id;
end $$

create procedure buscar_consultorio_id(in p_id int)
begin
    select * from consultorio where id_consultorio=p_id;
end $$


create procedure listar_cita()
begin
    select * from cita;
end $$

create procedure agregar_cita(in p_fecha date, in p_hora time, in p_paciente int, in p_doctor int, in p_consultorio int)
begin
    insert into cita(fecha, hora, id_paciente, id_doctor, id_consultorio)
    values(p_fecha, p_hora, p_paciente, p_doctor, p_consultorio);
end $$

create procedure editar_cita(in p_id int, in p_fecha date, in p_hora time, in p_paciente int, in p_doctor int, in p_consultorio int)
begin
    update cita set fecha=p_fecha, hora=p_hora, id_paciente=p_paciente, id_doctor=p_doctor, id_consultorio=p_consultorio where id_cita=p_id;
end $$

create procedure eliminar_cita(in p_id int)
begin
    delete from cita where id_cita=p_id;
end $$

create procedure buscar_cita_id(in p_id int)
begin
    select * from cita where id_cita=p_id;
end $$


create procedure listar_horario()
begin
    select * from horario;
end $$

create procedure agregar_horario(in p_dia varchar(20), in p_inicio time, in p_fin time, in p_doctor int)
begin
    insert into horario(dia, hora_inicio, hora_fin, id_doctor)
    values(p_dia, p_inicio, p_fin, p_doctor);
end $$

create procedure editar_horario(in p_id int, in p_dia varchar(20), in p_inicio time, in p_fin time, in p_doctor int)
begin
    update horario set dia=p_dia, hora_inicio=p_inicio, hora_fin=p_fin, id_doctor=p_doctor where id_horario=p_id;
end $$

create procedure eliminar_horario(in p_id int)
begin
    delete from horario where id_horario=p_id;
end $$

create procedure buscar_horario_id(in p_id int)
begin
    select * from horario where id_horario=p_id;
end $$


create procedure listar_receta()
begin
    select * from receta;
end $$

create procedure agregar_receta(in p_fecha date, in p_cita int)
begin
    insert into receta(fecha, id_cita) values(p_fecha, p_cita);
end $$

create procedure editar_receta(in p_id int, in p_fecha date, in p_cita int)
begin
    update receta set fecha=p_fecha, id_cita=p_cita where id_receta=p_id;
end $$

create procedure eliminar_receta(in p_id int)
begin
    delete from receta where id_receta=p_id;
end $$

create procedure buscar_receta_id(in p_id int)
begin
    select * from receta where id_receta=p_id;
end $$


create procedure listar_medicamento()
begin
    select * from medicamento;
end $$

create procedure agregar_medicamento(in p_nombre varchar(100), in p_dosis varchar(100), in p_receta int)
begin
    insert into medicamento(nombre, dosis, id_receta) values(p_nombre, p_dosis, p_receta);
end $$

create procedure editar_medicamento(in p_id int, in p_nombre varchar(100), in p_dosis varchar(100), in p_receta int)
begin
    update medicamento set nombre=p_nombre, dosis=p_dosis, id_receta=p_receta where id_medicamento=p_id;
end $$

create procedure eliminar_medicamento(in p_id int)
begin
    delete from medicamento where id_medicamento=p_id;
end $$

create procedure buscar_medicamento_id(in p_id int)
begin
    select * from medicamento where id_medicamento=p_id;
end $$


create procedure listar_pago()
begin
    select * from pago;
end $$

create procedure agregar_pago(in p_monto decimal(10,2), in p_fecha date, in p_paciente int)
begin
    insert into pago(monto, fecha, id_paciente) values(p_monto, p_fecha, p_paciente);
end $$

create procedure editar_pago(in p_id int, in p_monto decimal(10,2), in p_fecha date, in p_paciente int)
begin
    update pago set monto=p_monto, fecha=p_fecha, id_paciente=p_paciente where id_pago=p_id;
end $$

create procedure eliminar_pago(in p_id int)
begin
    delete from pago where id_pago=p_id;
end $$

create procedure buscar_pago_id(in p_id int)
begin
    select * from pago where id_pago=p_id;
end $$


create procedure listar_historial()
begin
    select * from historial;
end $$

create procedure agregar_historial(in p_descripcion text, in p_paciente int)
begin
    insert into historial(descripcion, id_paciente) values(p_descripcion, p_paciente);
end $$

create procedure editar_historial(in p_id int, in p_descripcion text, in p_paciente int)
begin
    update historial set descripcion=p_descripcion, id_paciente=p_paciente where id_historial=p_id;
end $$

create procedure eliminar_historial(in p_id int)
begin
    delete from historial where id_historial=p_id;
end $$

create procedure buscar_historial_id(in p_id int)
begin
    select * from historial where id_historial=p_id;
end $$

delimiter ;

-- PACIENTES
CALL agregar_paciente('Juan Pérez','55551234','juanperez@gmail.com');

CALL agregar_paciente('María López','55556789','marialopez@gmail.com');

-- ESPECIALIDADES
CALL agregar_especialidad('Cardiología');

CALL agregar_especialidad('Pediatría');

-- DOCTORES
CALL agregar_doctor('Dr. Carlos Hernández',1);

CALL agregar_doctor('Dra. Ana García',2);

-- CONSULTORIOS
CALL agregar_consultorio('101','Primer Nivel');

CALL agregar_consultorio('202','Segundo Nivel');

-- CITAS
CALL agregar_cita('2025-06-15','08:00:00',1,1,1);

CALL agregar_cita('2025-06-16','10:30:00',2,2,2);

-- HORARIOS
CALL agregar_horario('Lunes','08:00:00','12:00:00',1);

CALL agregar_horario('Martes','09:00:00','13:00:00',2);

-- RECETAS
CALL agregar_receta('2025-06-15',1);

CALL agregar_receta('2025-06-16',2);

-- MEDICAMENTOS
CALL agregar_medicamento('Paracetamol','500 mg cada 8 horas',1);

CALL agregar_medicamento('Amoxicilina','1 cápsula cada 12 horas',2);

-- PAGOS
CALL agregar_pago(250.00,'2025-06-15',1);

CALL agregar_pago(300.00,'2025-06-16',2);

-- HISTORIALES
CALL agregar_historial('Paciente con antecedentes de hipertensión arterial.',1);

CALL agregar_historial('Paciente con esquema de vacunación completo.',2);