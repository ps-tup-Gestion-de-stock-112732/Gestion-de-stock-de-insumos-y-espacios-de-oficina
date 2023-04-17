CREATE DATABASE IF NOT EXISTS gestiondb;

CREATE TABLE `gestiondb`.`area` (
  `idarea` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idarea`));

CREATE TABLE `gestiondb`.`barrio` (
  `idbarrio` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idbarrio`));

CREATE TABLE `gestiondb`.`localidad` (
  `idlocalidad` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idlocalidad`));

ALTER TABLE `gestiondb`.`localidad` 
ADD COLUMN `idbarrio` INT NOT NULL AFTER `nombre`,
ADD INDEX `barrio_fk_idx` (`idbarrio` ASC) VISIBLE;
;
ALTER TABLE `gestiondb`.`localidad` 
ADD CONSTRAINT `barrio_fk`
  FOREIGN KEY (`idbarrio`)
  REFERENCES `gestiondb`.`barrio` (`idbarrio`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

CREATE TABLE `gestiondb`.`provincia` (
  `idprovincia` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idprovincia`));

ALTER TABLE `gestiondb`.`provincia` 
ADD COLUMN `idlocalidad` INT NOT NULL AFTER `nombre`,
ADD INDEX `localidad_fk_idx` (`idlocalidad` ASC) VISIBLE;
;
ALTER TABLE `gestiondb`.`provincia` 
ADD CONSTRAINT `localidad_fk`
  FOREIGN KEY (`idlocalidad`)
  REFERENCES `gestiondb`.`localidad` (`idlocalidad`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

CREATE TABLE `gestiondb`.`pais` (
  `idpais` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idpais`));

ALTER TABLE `gestiondb`.`pais` 
ADD COLUMN `idprovincia` INT NOT NULL AFTER `nombre`,
ADD INDEX `provincia_pk_idx` (`idprovincia` ASC) VISIBLE;
;
ALTER TABLE `gestiondb`.`pais` 
ADD CONSTRAINT `provincia_pk`
  FOREIGN KEY (`idprovincia`)
  REFERENCES `gestiondb`.`provincia` (`idprovincia`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

CREATE TABLE `gestiondb`.`direccion` (
  `iddireccion` INT NOT NULL AUTO_INCREMENT,
  `calle` VARCHAR(45) NOT NULL,
  `altura` VARCHAR(45) NOT NULL,
  `idpais` INT NOT NULL,
  PRIMARY KEY (`iddireccion`),
  INDEX `pais_fk_idx` (`idpais` ASC) VISIBLE,
  CONSTRAINT `pais_fk`
    FOREIGN KEY (`idpais`)
    REFERENCES `gestiondb`.`pais` (`idpais`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `gestiondb`.`empresa` (
  `idempresa` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `telefono` INT NOT NULL,
  `cuit` BIGINT NOT NULL,
  `iddireccion` INT NOT NULL,
  PRIMARY KEY (`idempresa`),
  INDEX `direccion_fk_idx` (`iddireccion` ASC) VISIBLE,
  CONSTRAINT `direccion_fk`
    FOREIGN KEY (`iddireccion`)
    REFERENCES `gestiondb`.`direccion` (`iddireccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `gestiondb`.`rol` (
  `idrol` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idrol`));

CREATE TABLE `gestiondb`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `idempresa` INT NOT NULL,
  `nro_documento` INT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `telefono` INT NOT NULL,
  `idrol` INT NOT NULL,
  `estado` TINYINT NOT NULL,
  PRIMARY KEY (`idusuario`),
  INDEX `empresa_fk_idx` (`idempresa` ASC) VISIBLE,
  INDEX `rol_fk_idx` (`idrol` ASC) VISIBLE,
  CONSTRAINT `empresa_fk`
    FOREIGN KEY (`idempresa`)
    REFERENCES `gestiondb`.`empresa` (`idempresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `rol_fk`
    FOREIGN KEY (`idrol`)
    REFERENCES `gestiondb`.`rol` (`idrol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);







INSERT INTO `gestiondb`.`rol` (`idrol`, `nombre`) VALUES ('1', 'rrhh');
INSERT INTO `gestiondb`.`rol` (`idrol`, `nombre`) VALUES ('2', 'gestion it');
INSERT INTO `gestiondb`.`rol` (`idrol`, `nombre`) VALUES ('3', 'ventas');
INSERT INTO `gestiondb`.`rol` (`idrol`, `nombre`) VALUES ('4', 'proveedor');


INSERT INTO `gestiondb`.`barrio` (`idbarrio`, `nombre`) VALUES ('1', 'Centro');

INSERT INTO `gestiondb`.`localidad` (`idlocalidad`, `nombre`, `idbarrio`) VALUES ('1', 'Cordoba', '1');

INSERT INTO `gestiondb`.`provincia` (`idprovincia`, `nombre`, `idlocalidad`) VALUES ('1', 'Cordoba', '1');

INSERT INTO `gestiondb`.`pais` (`idpais`, `nombre`, `idprovincia`) VALUES ('1', 'Argentina', '1');

INSERT INTO `gestiondb`.`direccion` (`iddireccion`, `calle`, `altura`, `idpais`) VALUES ('1', 'FELIX FRIAS', '1213', '1');

INSERT INTO `gestiondb`.`empresa` (`idempresa`, `nombre`, `telefono`, `cuit`, `iddireccion`) VALUES ('1', 'VENEX S.A.', '4459320', '30715473204', '1');

INSERT INTO `gestiondb`.`usuario` (`idusuario`, `nombre`, `apellido`, `idempresa`, `nro_documento`, `email`, `password`, `telefono`, `idrol`, `estado`) VALUES ('1', 'Ezequiel', 'Barrale', '1', '36432731', 'ezeqbarrale@gmail.com', '123456', '4830626', '1', '1');
