USE FinalDCU

Create table Usuario
(
Id INT IDENTITY(1,1) PRIMARY KEY,
Nombre VARCHAR(40),
Correo VARCHAR(40),
Telefono VARCHAR(40)
)


drop table Usuario

--Procedure para obtener los usuarios registrados

CREATE PROCEDURE Pr_GetUsuario 
AS
BEGIN
	SELECT
	Usuario.Id,
	Usuario.Nombre,
	Usuario.Correo,
	Usuario.Telefono
	FROM Usuario
END

--- Procedure para crear un nuevo usuario 

CREATE PROCEDURE Pr_SetUsuario
(
	@Id INT = null,
	@Nombre VARCHAR(40),
	@Correo VARCHAR(40),
	@Telefono VARCHAR(40),
	@Accion INT
)
AS
BEGIN
	If(@Accion = 1)	
	BEGIN
		INSERT INTO Usuario (Nombre,Correo,Telefono)
			VALUES(@Nombre,@Correo,@Telefono)
			SELECT CAST(@@IDENTITY AS INT) AS Id, 'INSERT' AS Accion
	END
END

------------------------------------------------------

CREATE TABLE Libros 
(
Id INT IDENTITY(1,1) PRIMARY KEY,
Nombre VARCHAR(40)
)


Alter PROCEDURE Pr_GetLibros
AS
BEGIN 
	SELECT
		Libros.Id,
		Libros.Nombre
		FROM Libros
END


CREATE PROCEDURE Pr_SetLibros
(
	@Id INT = null,
	@Nombre VARCHAR(40),
	@Accion INT
)
AS
BEGIN
	IF(@Accion = 1)
	BEGIN
		INSERT INTO Libros(Nombre)
		VALUES (@Nombre)
		SELECT CAST(@@IDENTITY AS INT) AS Id, 'INSERT' AS Accion
	END

END


