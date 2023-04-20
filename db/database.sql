CREATE DATABASE IF NOT EXISTS gestiondb;

CREATE TABLE `gestiondb`.`area` (
  `idarea` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idarea`));
  
CREATE TABLE `gestiondb`.`pais` (
  `idpais` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idpais`));
  
CREATE TABLE `gestiondb`.`provincia` (
  `idprovincia` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `idpais` INT NOT NULL,
  PRIMARY KEY (`idprovincia`),
  INDEX `pais_fk_idx` (`idpais` ASC) VISIBLE,
  CONSTRAINT `pais_fk`
  FOREIGN KEY (`idpais`)
  REFERENCES `gestiondb`.`pais` (`idpais`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION);
  
CREATE TABLE `gestiondb`.`localidad` (
  `idlocalidad` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `idprovincia` INT NOT NULL,
  PRIMARY KEY (`idlocalidad`),
  INDEX `provincia_fk_idx` (`idprovincia` ASC) VISIBLE,
  CONSTRAINT `provincia_fk`
  FOREIGN KEY (`idprovincia`)
  REFERENCES `gestiondb`.`provincia` (`idprovincia`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION);

CREATE TABLE `gestiondb`.`barrio` (
  `idbarrio` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `idlocalidad` INT NOT NULL,
  PRIMARY KEY (`idbarrio`),
  INDEX `localidad_fk_idx` (`idlocalidad` ASC) VISIBLE,
  CONSTRAINT `localidad_fk`
  FOREIGN KEY (`idlocalidad`)
  REFERENCES `gestiondb`.`localidad` (`idlocalidad`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION);

CREATE TABLE `gestiondb`.`direccion` (
  `iddireccion` INT NOT NULL AUTO_INCREMENT,
  `calle` VARCHAR(45) NOT NULL,
  `altura` VARCHAR(45) NOT NULL,
  `idbarrio` INT NOT NULL,
  PRIMARY KEY (`iddireccion`),
  INDEX `barrio_fk_idx` (`idbarrio` ASC) VISIBLE,
  CONSTRAINT `barrio_fk`
  FOREIGN KEY (`idbarrio`)
  REFERENCES `gestiondb`.`barrio` (`idbarrio`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION);

CREATE TABLE `gestiondb`.`rol` (
  `idrol` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idrol`));

CREATE TABLE `gestiondb`.`estadousuario` (
  `idestadoUsuario` INT NOT NULL,
  `descripcion` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idestadoUsuario`),
  UNIQUE INDEX `idestadoUsuario_UNIQUE` (`idestadoUsuario` ASC) VISIBLE,
  UNIQUE INDEX `descripcion_UNIQUE` (`descripcion` ASC) VISIBLE);
  
CREATE TABLE `gestiondb`.`empresa` (
  `idempresa` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `telefono` BIGINT NOT NULL,
  `cuit` BIGINT NOT NULL,
  `iddireccion` INT NOT NULL,
  `estado` INT NOT NULL,
  PRIMARY KEY (`idempresa`),
  INDEX `direccion_fk_idx` (`iddireccion` ASC) VISIBLE,
  INDEX `estado_fk_idx` (`estado` ASC) VISIBLE,
  CONSTRAINT `direccion_fk`
    FOREIGN KEY (`iddireccion`)
    REFERENCES `gestiondb`.`direccion` (`iddireccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `estado_usr_fk`
    FOREIGN KEY (`estado`)
    REFERENCES `gestiondb`.`estadousuario` (`idestadoUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `gestiondb`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `idempresa` INT NOT NULL,
  `nro_documento` INT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `telefono` INT NOT NULL,
  `idrol` INT NOT NULL,
  `estado` INT NOT NULL,
  `idarea` INT NULL,
  `iddireccion` INT NULL,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  PRIMARY KEY (`idusuario`),
  INDEX `empresa_fk_idx` (`idempresa` ASC) VISIBLE,
  INDEX `rol_fk_idx` (`idrol` ASC) VISIBLE,
  INDEX `area_fk_idx` (`idarea` ASC) VISIBLE,
  INDEX `direccion_fk_idx` (`iddireccion` ASC) VISIBLE,
  CONSTRAINT `empresa_fk`
    FOREIGN KEY (`idempresa`)
    REFERENCES `gestiondb`.`empresa` (`idempresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `rol_fk`
    FOREIGN KEY (`idrol`)
    REFERENCES `gestiondb`.`rol` (`idrol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `estado_fk`
    FOREIGN KEY (`estado`)
    REFERENCES `gestiondb`.`estadousuario` (`idestadoUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `area_fk`
    FOREIGN KEY (`idarea`)
    REFERENCES `gestiondb`.`area` (`idarea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `direccion_usr_fk`
    FOREIGN KEY (`iddireccion`)
    REFERENCES `gestiondb`.`direccion` (`iddireccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


INSERT INTO `gestiondb`.`estadousuario` (`idestadoUsuario`, `descripcion`) VALUES ('1', 'Activo');
INSERT INTO `gestiondb`.`estadousuario` (`idestadoUsuario`, `descripcion`) VALUES ('0', 'Inactivo');

INSERT INTO `gestiondb`.`area` (`idarea`, `nombre`) VALUES ('1', 'ventas');
INSERT INTO `gestiondb`.`area` (`idarea`, `nombre`) VALUES ('2', 'it');
INSERT INTO `gestiondb`.`area` (`idarea`, `nombre`) VALUES ('3', 'marketing');

INSERT INTO `gestiondb`.`rol` (`idrol`, `nombre`) VALUES ('1', 'rrhh');
INSERT INTO `gestiondb`.`rol` (`idrol`, `nombre`) VALUES ('2', 'gestion it');
INSERT INTO `gestiondb`.`rol` (`idrol`, `nombre`) VALUES ('3', 'ventas');
INSERT INTO `gestiondb`.`rol` (`idrol`, `nombre`) VALUES ('4', 'proveedor');
INSERT INTO `gestiondb`.`rol` (`idrol`, `nombre`) VALUES ('5', 'empleado');

INSERT INTO `gestiondb`.`pais` (`idpais`, `nombre`) VALUES ('1', 'Argentina');

INSERT INTO `gestiondb`.`provincia` (`idprovincia`, `nombre`, `idpais`) VALUES ('1', 'Cordoba', '1');

INSERT INTO `gestiondb`.`localidad` (`idlocalidad`, `nombre`, `idprovincia`) VALUES ('1', 'Cordoba', '1');

INSERT INTO `gestiondb`.`barrio` (`idbarrio`, `nombre`, `idlocalidad`) VALUES ('1', 'Centro', '1');


INSERT INTO `gestiondb`.`direccion` (`iddireccion`, `calle`, `altura`, `idbarrio`) VALUES ('1', 'FELIX FRIAS', '1213', '1');

INSERT INTO `gestiondb`.`empresa` (`idempresa`, `nombre`, `telefono`, `cuit`, `iddireccion`, `estado`) VALUES ('1', 'VENEX S.A.', '4459320', '30715473204', '1', '1');