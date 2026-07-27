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

DELIMITER $$

-- =====================================================
-- PACIENTE
-- =====================================================

CREATE PROCEDURE listar_paciente()
BEGIN
    SELECT * FROM paciente;
END $$

CREATE PROCEDURE agregar_paciente(
    IN p_nombre VARCHAR(100),
    IN p_telefono VARCHAR(20),
    IN p_correo VARCHAR(100)
)
BEGIN
    INSERT INTO paciente(nombre, telefono, correo)
    VALUES(p_nombre, p_telefono, p_correo);
END $$

CREATE PROCEDURE editar_paciente(
    IN p_id INT,
    IN p_nombre VARCHAR(100),
    IN p_telefono VARCHAR(20),
    IN p_correo VARCHAR(100)
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM paciente
        WHERE id_paciente = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El paciente no existe';
    END IF;

    UPDATE paciente
    SET nombre = p_nombre,
        telefono = p_telefono,
        correo = p_correo
    WHERE id_paciente = p_id;

END $$

CREATE PROCEDURE eliminar_paciente(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM paciente
        WHERE id_paciente = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El paciente no existe';
    END IF;

    DELETE FROM paciente
    WHERE id_paciente = p_id;

END $$

CREATE PROCEDURE buscar_paciente_id(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM paciente
        WHERE id_paciente = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El paciente no existe';
    END IF;

    SELECT * FROM paciente
    WHERE id_paciente = p_id;

END $$


-- =====================================================
-- DOCTOR
-- =====================================================

CREATE PROCEDURE listar_doctor()
BEGIN
    SELECT * FROM doctor;
END $$

CREATE PROCEDURE agregar_doctor(
    IN p_nombre VARCHAR(100),
    IN p_especialidad INT
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM especialidad
        WHERE id_especialidad = p_especialidad
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La especialidad no existe';
    END IF;

    INSERT INTO doctor(nombre, especialidad_id)
    VALUES(p_nombre, p_especialidad);

END $$

CREATE PROCEDURE editar_doctor(
    IN p_id INT,
    IN p_nombre VARCHAR(100),
    IN p_especialidad INT
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM doctor
        WHERE id_doctor = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El doctor no existe';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM especialidad
        WHERE id_especialidad = p_especialidad
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La especialidad no existe';
    END IF;

    UPDATE doctor
    SET nombre = p_nombre,
        especialidad_id = p_especialidad
    WHERE id_doctor = p_id;

END $$

CREATE PROCEDURE eliminar_doctor(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM doctor
        WHERE id_doctor = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El doctor no existe';
    END IF;

    DELETE FROM doctor
    WHERE id_doctor = p_id;

END $$

CREATE PROCEDURE buscar_doctor_id(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM doctor
        WHERE id_doctor = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El doctor no existe';
    END IF;

    SELECT * FROM doctor
    WHERE id_doctor = p_id;

END $$


-- =====================================================
-- ESPECIALIDAD
-- =====================================================

CREATE PROCEDURE listar_especialidad()
BEGIN
    SELECT * FROM especialidad;
END $$

CREATE PROCEDURE agregar_especialidad(
    IN p_nombre VARCHAR(100)
)
BEGIN
    INSERT INTO especialidad(nombre)
    VALUES(p_nombre);
END $$

CREATE PROCEDURE editar_especialidad(
    IN p_id INT,
    IN p_nombre VARCHAR(100)
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM especialidad
        WHERE id_especialidad = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La especialidad no existe';
    END IF;

    UPDATE especialidad
    SET nombre = p_nombre
    WHERE id_especialidad = p_id;

END $$

CREATE PROCEDURE eliminar_especialidad(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM especialidad
        WHERE id_especialidad = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La especialidad no existe';
    END IF;

    DELETE FROM especialidad
    WHERE id_especialidad = p_id;

END $$

CREATE PROCEDURE buscar_especialidad_id(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM especialidad
        WHERE id_especialidad = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La especialidad no existe';
    END IF;

    SELECT * FROM especialidad
    WHERE id_especialidad = p_id;

END $$


-- =====================================================
-- CONSULTORIO
-- =====================================================

CREATE PROCEDURE listar_consultorio()
BEGIN
    SELECT * FROM consultorio;
END $$

CREATE PROCEDURE agregar_consultorio(
    IN p_numero VARCHAR(10),
    IN p_ubicacion VARCHAR(100)
)
BEGIN
    INSERT INTO consultorio(numero, ubicacion)
    VALUES(p_numero, p_ubicacion);
END $$

CREATE PROCEDURE editar_consultorio(
    IN p_id INT,
    IN p_numero VARCHAR(10),
    IN p_ubicacion VARCHAR(100)
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM consultorio
        WHERE id_consultorio = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El consultorio no existe';
    END IF;

    UPDATE consultorio
    SET numero = p_numero,
        ubicacion = p_ubicacion
    WHERE id_consultorio = p_id;

END $$

CREATE PROCEDURE eliminar_consultorio(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM consultorio
        WHERE id_consultorio = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El consultorio no existe';
    END IF;

    DELETE FROM consultorio
    WHERE id_consultorio = p_id;

END $$

CREATE PROCEDURE buscar_consultorio_id(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM consultorio
        WHERE id_consultorio = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El consultorio no existe';
    END IF;

    SELECT * FROM consultorio
    WHERE id_consultorio = p_id;

END $$


-- =====================================================
-- CITA
-- =====================================================

CREATE PROCEDURE listar_cita()
BEGIN
    SELECT * FROM cita;
END $$

CREATE PROCEDURE agregar_cita(
    IN p_fecha DATE,
    IN p_hora TIME,
    IN p_paciente INT,
    IN p_doctor INT,
    IN p_consultorio INT
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM paciente
        WHERE id_paciente = p_paciente
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El paciente no existe';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM doctor
        WHERE id_doctor = p_doctor
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El doctor no existe';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM consultorio
        WHERE id_consultorio = p_consultorio
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El consultorio no existe';
    END IF;

    INSERT INTO cita(
        fecha,
        hora,
        id_paciente,
        id_doctor,
        id_consultorio
    )
    VALUES(
        p_fecha,
        p_hora,
        p_paciente,
        p_doctor,
        p_consultorio
    );

END $$

CREATE PROCEDURE editar_cita(
    IN p_id INT,
    IN p_fecha DATE,
    IN p_hora TIME,
    IN p_paciente INT,
    IN p_doctor INT,
    IN p_consultorio INT
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM cita
        WHERE id_cita = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La cita no existe';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM paciente
        WHERE id_paciente = p_paciente
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El paciente no existe';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM doctor
        WHERE id_doctor = p_doctor
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El doctor no existe';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM consultorio
        WHERE id_consultorio = p_consultorio
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El consultorio no existe';
    END IF;

    UPDATE cita
    SET fecha = p_fecha,
        hora = p_hora,
        id_paciente = p_paciente,
        id_doctor = p_doctor,
        id_consultorio = p_consultorio
    WHERE id_cita = p_id;

END $$

CREATE PROCEDURE eliminar_cita(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM cita
        WHERE id_cita = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La cita no existe';
    END IF;

    DELETE FROM cita
    WHERE id_cita = p_id;

END $$

CREATE PROCEDURE buscar_cita_id(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM cita
        WHERE id_cita = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La cita no existe';
    END IF;

    SELECT * FROM cita
    WHERE id_cita = p_id;

END $$


-- =====================================================
-- HORARIO
-- =====================================================

CREATE PROCEDURE listar_horario()
BEGIN
    SELECT * FROM horario;
END $$

CREATE PROCEDURE agregar_horario(
    IN p_dia VARCHAR(20),
    IN p_inicio TIME,
    IN p_fin TIME,
    IN p_doctor INT
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM doctor
        WHERE id_doctor = p_doctor
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El doctor no existe';
    END IF;

    INSERT INTO horario(
        dia,
        hora_inicio,
        hora_fin,
        id_doctor
    )
    VALUES(
        p_dia,
        p_inicio,
        p_fin,
        p_doctor
    );

END $$

CREATE PROCEDURE editar_horario(
    IN p_id INT,
    IN p_dia VARCHAR(20),
    IN p_inicio TIME,
    IN p_fin TIME,
    IN p_doctor INT
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM horario
        WHERE id_horario = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El horario no existe';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM doctor
        WHERE id_doctor = p_doctor
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El doctor no existe';
    END IF;

    UPDATE horario
    SET dia = p_dia,
        hora_inicio = p_inicio,
        hora_fin = p_fin,
        id_doctor = p_doctor
    WHERE id_horario = p_id;

END $$

CREATE PROCEDURE eliminar_horario(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM horario
        WHERE id_horario = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El horario no existe';
    END IF;

    DELETE FROM horario
    WHERE id_horario = p_id;

END $$

CREATE PROCEDURE buscar_horario_id(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM horario
        WHERE id_horario = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El horario no existe';
    END IF;

    SELECT * FROM horario
    WHERE id_horario = p_id;

END $$


-- =====================================================
-- RECETA
-- =====================================================

CREATE PROCEDURE listar_receta()
BEGIN
    SELECT * FROM receta;
END $$

CREATE PROCEDURE agregar_receta(
    IN p_fecha DATE,
    IN p_cita INT
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM cita
        WHERE id_cita = p_cita
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La cita no existe';
    END IF;

    INSERT INTO receta(fecha, id_cita)
    VALUES(p_fecha, p_cita);

END $$

CREATE PROCEDURE editar_receta(
    IN p_id INT,
    IN p_fecha DATE,
    IN p_cita INT
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM receta
        WHERE id_receta = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La receta no existe';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM cita
        WHERE id_cita = p_cita
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La cita no existe';
    END IF;

    UPDATE receta
    SET fecha = p_fecha,
        id_cita = p_cita
    WHERE id_receta = p_id;

END $$

CREATE PROCEDURE eliminar_receta(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM receta
        WHERE id_receta = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La receta no existe';
    END IF;

    DELETE FROM receta
    WHERE id_receta = p_id;

END $$

CREATE PROCEDURE buscar_receta_id(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM receta
        WHERE id_receta = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La receta no existe';
    END IF;

    SELECT * FROM receta
    WHERE id_receta = p_id;

END $$


-- =====================================================
-- MEDICAMENTO
-- =====================================================

CREATE PROCEDURE listar_medicamento()
BEGIN
    SELECT * FROM medicamento;
END $$

CREATE PROCEDURE agregar_medicamento(
    IN p_nombre VARCHAR(100),
    IN p_dosis VARCHAR(100),
    IN p_receta INT
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM receta
        WHERE id_receta = p_receta
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La receta no existe';
    END IF;

    INSERT INTO medicamento(
        nombre,
        dosis,
        id_receta
    )
    VALUES(
        p_nombre,
        p_dosis,
        p_receta
    );

END $$

CREATE PROCEDURE editar_medicamento(
    IN p_id INT,
    IN p_nombre VARCHAR(100),
    IN p_dosis VARCHAR(100),
    IN p_receta INT
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM medicamento
        WHERE id_medicamento = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El medicamento no existe';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM receta
        WHERE id_receta = p_receta
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La receta no existe';
    END IF;

    UPDATE medicamento
    SET nombre = p_nombre,
        dosis = p_dosis,
        id_receta = p_receta
    WHERE id_medicamento = p_id;

END $$

CREATE PROCEDURE eliminar_medicamento(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM medicamento
        WHERE id_medicamento = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El medicamento no existe';
    END IF;

    DELETE FROM medicamento
    WHERE id_medicamento = p_id;

END $$

CREATE PROCEDURE buscar_medicamento_id(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM medicamento
        WHERE id_medicamento = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El medicamento no existe';
    END IF;

    SELECT * FROM medicamento
    WHERE id_medicamento = p_id;

END $$


-- =====================================================
-- PAGO
-- =====================================================

CREATE PROCEDURE listar_pago()
BEGIN
    SELECT * FROM pago;
END $$

CREATE PROCEDURE agregar_pago(
    IN p_monto DECIMAL(10,2),
    IN p_fecha DATE,
    IN p_paciente INT
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM paciente
        WHERE id_paciente = p_paciente
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El paciente no existe';
    END IF;

    INSERT INTO pago(
        monto,
        fecha,
        id_paciente
    )
    VALUES(
        p_monto,
        p_fecha,
        p_paciente
    );

END $$

CREATE PROCEDURE editar_pago(
    IN p_id INT,
    IN p_monto DECIMAL(10,2),
    IN p_fecha DATE,
    IN p_paciente INT
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM pago
        WHERE id_pago = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El pago no existe';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM paciente
        WHERE id_paciente = p_paciente
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El paciente no existe';
    END IF;

    UPDATE pago
    SET monto = p_monto,
        fecha = p_fecha,
        id_paciente = p_paciente
    WHERE id_pago = p_id;

END $$

CREATE PROCEDURE eliminar_pago(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM pago
        WHERE id_pago = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El pago no existe';
    END IF;

    DELETE FROM pago
    WHERE id_pago = p_id;

END $$

CREATE PROCEDURE buscar_pago_id(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM pago
        WHERE id_pago = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El pago no existe';
    END IF;

    SELECT * FROM pago
    WHERE id_pago = p_id;

END $$


-- =====================================================
-- HISTORIAL
-- =====================================================

CREATE PROCEDURE listar_historial()
BEGIN
    SELECT * FROM historial;
END $$

CREATE PROCEDURE agregar_historial(
    IN p_descripcion TEXT,
    IN p_paciente INT
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM paciente
        WHERE id_paciente = p_paciente
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El paciente no existe';
    END IF;

    INSERT INTO historial(
        descripcion,
        id_paciente
    )
    VALUES(
        p_descripcion,
        p_paciente
    );

END $$

CREATE PROCEDURE editar_historial(
    IN p_id INT,
    IN p_descripcion TEXT,
    IN p_paciente INT
)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM historial
        WHERE id_historial = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El historial no existe';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM paciente
        WHERE id_paciente = p_paciente
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El paciente no existe';
    END IF;

    UPDATE historial
    SET descripcion = p_descripcion,
        id_paciente = p_paciente
    WHERE id_historial = p_id;

END $$

CREATE PROCEDURE eliminar_historial(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM historial
        WHERE id_historial = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El historial no existe';
    END IF;

    DELETE FROM historial
    WHERE id_historial = p_id;

END $$

CREATE PROCEDURE buscar_historial_id(IN p_id INT)
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM historial
        WHERE id_historial = p_id
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El historial no existe';
    END IF;

    SELECT * FROM historial
    WHERE id_historial = p_id;

END $$

DELIMITER ;

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