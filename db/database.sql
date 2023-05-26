CREATE DATABASE IF NOT EXISTS gestiondb;

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


CREATE TABLE `gestiondb`.`tipoempresa` (
  `idtipoempresa` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idtipoempresa`));

  
CREATE TABLE `gestiondb`.`empresa` (
  `idempresa` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `telefono` BIGINT NOT NULL,
  `cuit` BIGINT NOT NULL,
  `iddireccion` INT NOT NULL,
  `estado` INT NOT NULL,
  `tipoempresa` INT NOT NULL,
  `idadmin` INT NULL DEFAULT 0,
  PRIMARY KEY (`idempresa`),
  INDEX `direccion_fk_idx` (`iddireccion` ASC) VISIBLE,
  INDEX `estado_fk_idx` (`estado` ASC) VISIBLE,
  INDEX `tipoempresa_fk_idx` (`tipoempresa` ASC) VISIBLE,
  CONSTRAINT `direccion_fk`
    FOREIGN KEY (`iddireccion`)
    REFERENCES `gestiondb`.`direccion` (`iddireccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `estado_usr_fk`
    FOREIGN KEY (`estado`)
    REFERENCES `gestiondb`.`estadousuario` (`idestadoUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `tipoempresa_fk`
    FOREIGN KEY (`tipoempresa`)
    REFERENCES `gestiondb`.`tipoempresa` (`idtipoempresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `gestiondb`.`area` (
  `idarea` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `idempresa` INT NOT NULL,
  `estado` INT NOT NULL,
  PRIMARY KEY (`idarea`),
  INDEX `empresa_fk_idx` (`idempresa` ASC) VISIBLE,
  CONSTRAINT `empresa_area_fk`
    FOREIGN KEY (`idempresa`)
    REFERENCES `gestiondb`.`empresa` (`idempresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `gestiondb`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `idempresa` INT NULL,
  `nro_documento` INT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `telefono` BIGINT NOT NULL,
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


CREATE TABLE `gestiondb`.`categoria` (
  `idcategoria` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NOT NULL,
  `idempresa` INT NOT NULL,
  `estado` INT NOT NULL,
  PRIMARY KEY (`idcategoria`),
  INDEX `empresa_categoria_fk_idx` (`idempresa` ASC) VISIBLE,
  CONSTRAINT `empresa_categoria_fk`
    FOREIGN KEY (`idempresa`)
    REFERENCES `gestiondb`.`empresa` (`idempresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `gestiondb`.`producto` (
  `codigo` INT NOT NULL,
  `nombreProducto` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(100) NOT NULL,
  `precioUnitario` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `idProveedor` INT NOT NULL,
  `imagen` VARCHAR(200) NULL,
  `estado` INT NOT NULL DEFAULT 1,
  `idcategoria` INT NOT NULL,
  PRIMARY KEY (`codigo`),
  INDEX `proveedor_producto_fk_idx` (`idProveedor` ASC) VISIBLE,
  INDEX `categoria_producto_fk_idx` (`idcategoria` ASC) VISIBLE,
  CONSTRAINT `proveedor_producto_fk`
    FOREIGN KEY (`idProveedor`)
    REFERENCES `gestiondb`.`empresa` (`idempresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `categoria_producto_fk`
    FOREIGN KEY (`idcategoria`)
    REFERENCES `gestiondb`.`categoria` (`idcategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `gestiondb`.`pedido` (
  `idpedido` INT NOT NULL AUTO_INCREMENT,
  `idempleado` INT NOT NULL,
  `idempresa` INT NOT NULL,
  `idproveedor` INT NOT NULL,
  `fecha` DATETIME NOT NULL,
  PRIMARY KEY (`idpedido`),
  INDEX `pedido_empleado_idx` (`idempleado` ASC) VISIBLE,
  INDEX `pedido_empresa_fk_idx` (`idempresa` ASC) VISIBLE,
  INDEX `peido_proveedor_fk_idx` (`idproveedor` ASC) VISIBLE,
  CONSTRAINT `pedido_empleado_fk`
    FOREIGN KEY (`idempleado`)
    REFERENCES `gestiondb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `pedido_empresa_fk`
    FOREIGN KEY (`idempresa`)
    REFERENCES `gestiondb`.`empresa` (`idempresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `peido_proveedor_fk`
    FOREIGN KEY (`idproveedor`)
    REFERENCES `gestiondb`.`empresa` (`idempresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `gestiondb`.`detallepedido` (
  `iddetallepedido` INT NOT NULL AUTO_INCREMENT,
  `idpedido` INT NOT NULL,
  `idproducto` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `precioUnitario` INT NOT NULL,
  PRIMARY KEY (`iddetallepedido`),
  INDEX `detalle_pedido_fk_idx` (`idpedido` ASC) VISIBLE,
  INDEX `detalle_producto_fk_idx` (`idproducto` ASC) VISIBLE,
  CONSTRAINT `detalle_pedido_fk`
    FOREIGN KEY (`idpedido`)
    REFERENCES `gestiondb`.`pedido` (`idpedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `detalle_producto_fk`
    FOREIGN KEY (`idproducto`)
    REFERENCES `gestiondb`.`producto` (`codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `gestiondb`.`estadoautorizacion` (
  `idestado` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idestado`));

CREATE TABLE `gestiondb`.`autorizaciongestion` (
  `idautorizacion` INT NOT NULL AUTO_INCREMENT,
  `idpedido` INT NOT NULL,
  `idestado` INT NOT NULL,
  `fecha` DATETIME NULL,
  `idautorizante` INT NULL,
  PRIMARY KEY (`idautorizacion`),
  INDEX `autogestion_pedido_fk_idx` (`idpedido` ASC) VISIBLE,
  INDEX `autogestion_estado_fk_idx` (`idestado` ASC) VISIBLE,
  INDEX `autogestion_autorizante_fk_idx` (`idautorizante` ASC) VISIBLE,
  CONSTRAINT `autogestion_pedido_fk`
    FOREIGN KEY (`idpedido`)
    REFERENCES `gestiondb`.`pedido` (`idpedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `autogestion_estado_fk`
    FOREIGN KEY (`idestado`)
    REFERENCES `gestiondb`.`estadoautorizacion` (`idestado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `autogestion_autorizante_fk`
    FOREIGN KEY (`idautorizante`)
    REFERENCES `gestiondb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `gestiondb`.`autorizacionxventa` (
  `idautorizacion` INT NOT NULL AUTO_INCREMENT,
  `idpedido` INT NOT NULL,
  `idestado` INT NOT NULL,
  `fecha` DATETIME NULL,
  `idautorizante` INT NULL,
  PRIMARY KEY (`idautorizacion`),
  INDEX `autoventa_autorizante_fk_idx` (`idautorizante` ASC) VISIBLE,
  INDEX `autogestion_estado_fk_idx` (`idestado` ASC) VISIBLE,
  INDEX `autogestion_pedido_fk_idx` (`idpedido` ASC) VISIBLE,
  CONSTRAINT `autoventa_autorizante_fk`
    FOREIGN KEY (`idautorizante`)
    REFERENCES `gestiondb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `autoventa_estado_fk`
    FOREIGN KEY (`idestado`)
    REFERENCES `gestiondb`.`estadoautorizacion` (`idestado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `autoventa_pedido_fk`
    FOREIGN KEY (`idpedido`)
    REFERENCES `gestiondb`.`pedido` (`idpedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `gestiondb`.`autorizacionempresa` (
  `idautorizacion` INT NOT NULL AUTO_INCREMENT,
  `idempresaProveedor` INT NOT NULL,
  `idempresa` INT NOT NULL,
  `idestado` INT NOT NULL,
  `idautorizante` INT NULL,
  `fecha` DATETIME NOT NULL,
  `idsolicitante` INT NOT NULL,
  PRIMARY KEY (`idautorizacion`),
  INDEX `autoempresa_empresa_fk_idx` (`idempresa` ASC) VISIBLE,
  INDEX `autoempresa_proveedor_fk_idx` (`idempresaProveedor` ASC) VISIBLE,
  INDEX `autoempresa_estado_fk_idx` (`idestado` ASC) VISIBLE,
  INDEX `autoempresa_autorizante_fk_idx` (`idautorizante` ASC) VISIBLE,
  INDEX `autoempresa_solicitante_fk_idx` (`idsolicitante` ASC) VISIBLE,
  CONSTRAINT `autoempresa_empresa_fk`
    FOREIGN KEY (`idempresa`)
    REFERENCES `gestiondb`.`empresa` (`idempresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `autoempresa_proveedor_fk`
    FOREIGN KEY (`idempresaProveedor`)
    REFERENCES `gestiondb`.`empresa` (`idempresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `autoempresa_estado_fk`
    FOREIGN KEY (`idestado`)
    REFERENCES `gestiondb`.`estadoautorizacion` (`idestado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `autoempresa_autorizante_fk`
    FOREIGN KEY (`idautorizante`)
    REFERENCES `gestiondb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `autoempresa_solicitante_fk`
    FOREIGN KEY (`idsolicitante`)
    REFERENCES `gestiondb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `gestiondb`.`contrato` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idempresa` INT NOT NULL,
  `idempresaProveedor` INT NOT NULL,
  `fechaFin` DATETIME NULL,
  `idautorizacion` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `empresa_contrato_fk_idx` (`idempresa` ASC) VISIBLE,
  INDEX `proveedor_contrato_fk_idx` (`idempresaProveedor` ASC) VISIBLE,
  INDEX `auto_contrato_fk_idx` (`idautorizacion` ASC) VISIBLE,
  CONSTRAINT `empresa_contrato_fk`
    FOREIGN KEY (`idempresa`)
    REFERENCES `gestiondb`.`empresa` (`idempresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `proveedor_contrato_fk`
    FOREIGN KEY (`idempresaProveedor`)
    REFERENCES `gestiondb`.`empresa` (`idempresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `auto_contrato_fk`
    FOREIGN KEY (`idautorizacion`)
    REFERENCES `gestiondb`.`autorizacionempresa` (`idautorizacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `gestiondb`.`autorizacionusuarioemp` (
  `idautorizacion` INT NOT NULL AUTO_INCREMENT,
  `idusuario` INT NOT NULL,
  `idempresa` INT NOT NULL,
  `idestado` INT NOT NULL,
  `fecha` DATETIME NOT NULL,
  PRIMARY KEY (`idautorizacion`),
  INDEX `auto_usr_id_idx` (`idusuario` ASC) VISIBLE,
  INDEX `auto_emp_id_idx` (`idempresa` ASC) VISIBLE,
  INDEX `auto_estado_id_idx` (`idestado` ASC) VISIBLE,
  CONSTRAINT `auto_usr_id`
    FOREIGN KEY (`idusuario`)
    REFERENCES `gestiondb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `auto_emp_id`
    FOREIGN KEY (`idempresa`)
    REFERENCES `gestiondb`.`empresa` (`idempresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `auto_estado_id`
    FOREIGN KEY (`idestado`)
    REFERENCES `gestiondb`.`estadoautorizacion` (`idestado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `gestiondb`.`autorizacionusuarioprov` (
  `idautorizacion` INT NOT NULL AUTO_INCREMENT,
  `idusuario` INT NOT NULL,
  `idempresa` INT NOT NULL,
  `idestado` INT NOT NULL,
  `fecha` DATETIME NOT NULL,
  PRIMARY KEY (`idautorizacion`),
  INDEX `auto_usr_prov_id_idx` (`idusuario` ASC) VISIBLE,
  INDEX `auto_emp_prov_id_idx` (`idempresa` ASC) VISIBLE,
  INDEX `auto_estado_prov_id_idx` (`idestado` ASC) VISIBLE,
  CONSTRAINT `auto_usr_prov_id`
    FOREIGN KEY (`idusuario`)
    REFERENCES `gestiondb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `auto_emp_prov_id`
    FOREIGN KEY (`idempresa`)
    REFERENCES `gestiondb`.`empresa` (`idempresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `auto_estado_prov_id`
    FOREIGN KEY (`idestado`)
    REFERENCES `gestiondb`.`estadoautorizacion` (`idestado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);





INSERT INTO `gestiondb`.`estadousuario` (`idestadoUsuario`, `descripcion`) VALUES ('1', 'Activo');
INSERT INTO `gestiondb`.`estadousuario` (`idestadoUsuario`, `descripcion`) VALUES ('0', 'Inactivo');

INSERT INTO `gestiondb`.`estadoautorizacion` (`idestado`, `descripcion`) VALUES ('1', 'Pendiente');
INSERT INTO `gestiondb`.`estadoautorizacion` (`idestado`, `descripcion`) VALUES ('2', 'Aprobado');
INSERT INTO `gestiondb`.`estadoautorizacion` (`idestado`, `descripcion`) VALUES ('3', 'Rechazado');
INSERT INTO `gestiondb`.`estadoautorizacion` (`idestado`, `descripcion`) VALUES ('4', 'Cancelado');

INSERT INTO `gestiondb`.`rol` (`idrol`, `nombre`) VALUES ('1', 'empresa');
INSERT INTO `gestiondb`.`rol` (`idrol`, `nombre`) VALUES ('2', 'gestion it');
INSERT INTO `gestiondb`.`rol` (`idrol`, `nombre`) VALUES ('3', 'ventas');
INSERT INTO `gestiondb`.`rol` (`idrol`, `nombre`) VALUES ('4', 'proveedor');
INSERT INTO `gestiondb`.`rol` (`idrol`, `nombre`) VALUES ('5', 'empleado');

INSERT INTO `gestiondb`.`pais` (`idpais`, `nombre`) VALUES ('1', 'Argentina');

INSERT INTO `gestiondb`.`provincia` (`idprovincia`, `nombre`, `idpais`) VALUES ('1', 'Cordoba', '1');

INSERT INTO `gestiondb`.`localidad` (`idlocalidad`, `nombre`, `idprovincia`) VALUES ('1', 'Cordoba', '1');

INSERT INTO `gestiondb`.`barrio` (`idbarrio`, `nombre`, `idlocalidad`) VALUES ('1', 'Centro', '1');

INSERT INTO `gestiondb`.`direccion` (`iddireccion`, `calle`, `altura`, `idbarrio`) VALUES ('1', 'FELIX FRIAS', '1213', '1');

INSERT INTO `gestiondb`.`tipoempresa` (`idtipoempresa`, `descripcion`) VALUES ('1', 'empresa');
INSERT INTO `gestiondb`.`tipoempresa` (`idtipoempresa`, `descripcion`) VALUES ('2', 'proveedor');

INSERT INTO `gestiondb`.`empresa` (`idempresa`, `nombre`, `telefono`, `cuit`, `iddireccion`, `estado`, `tipoempresa`) VALUES ('1', 'DICSYS S.A.', '4839201', '28715473204', '1', '1', '1');
/* INSERT INTO `gestiondb`.`empresa` (`idempresa`, `nombre`, `telefono`, `cuit`, `iddireccion`, `estado`, `tipoempresa`) VALUES ('1', 'MERCADO LIBRE', '4528163', '29397143235', '5', '1', '1');
INSERT INTO `gestiondb`.`empresa` (`idempresa`, `nombre`, `telefono`, `cuit`, `iddireccion`, `estado`, `tipoempresa`) VALUES ('1', 'DESPEGAR.COM', '4673014', '23739380879', '8', '1', '1');
INSERT INTO `gestiondb`.`empresa` (`idempresa`, `nombre`, `telefono`, `cuit`, `iddireccion`, `estado`, `tipoempresa`) VALUES ('1', 'GLOBANT', '42810945', '23093590996', '10', '1', '1');
INSERT INTO `gestiondb`.`empresa` (`idempresa`, `nombre`, `telefono`, `cuit`, `iddireccion`, `estado`, `tipoempresa`) VALUES ('1', 'OLX', '4283052', '27125378143', '4', '1', '1');
 */

INSERT INTO `gestiondb`.`area` (`idarea`, `nombre`, `idempresa`) VALUES ('1', 'ventas','1');
INSERT INTO `gestiondb`.`area` (`idarea`, `nombre`, `idempresa`) VALUES ('2', 'it', '1');
INSERT INTO `gestiondb`.`area` (`idarea`, `nombre`, `idempresa`) VALUES ('3', 'marketing', '1');

INSERT INTO `gestiondb`.`empresa` (`idempresa`, `nombre`, `telefono`, `cuit`, `iddireccion`, `estado`, `tipoempresa`) VALUES ('2', 'VENEX S.A.', '4459320', '30715473204', '1', '1', '2');