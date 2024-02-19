-- 1: Empleados ordenados alfabéticamente (Z...A)
SELECT apellido
FROM empleados
ORDER BY apellido DESC;

-- 2: Empleados de Soporte
SELECT e.nombres, p.puesto, l.localidad
FROM empleados e
JOIN puestos p ON e.puesto_id = p.id
JOIN departamentos d ON e.departamento_id = d.id
JOIN localidades l ON d.localidad_id = l.id
WHERE p.puesto = 'Soporte';

-- 3: Nombres que terminan con 'o'
SELECT nombres
FROM empleados
WHERE nombres LIKE '%o';

-- 4: Empleados en Carlos Paz
SELECT e.nombres, e.sueldo, l.localidad 
FROM empleados e
JOIN departamentos d ON e.departamento_id = d.id
JOIN localidades l ON d.localidad_id = l.id
WHERE l.localidad = 'Carlos Paz';

-- 5: Sueldos entre 10000 y 13000
SELECT e.nombres, e.sueldo, l.localidad
FROM empleados e
JOIN departamentos d ON e.departamento_id = d.id
JOIN localidades l ON d.localidad_id = l.id
WHERE e.sueldo BETWEEN 10000 AND 13000;

-- 6: Departamentos con más de 5 empleados
SELECT d.denominacion AS departamento, COUNT(e.id) AS cantidad_empleados
FROM departamentos d
JOIN empleados e ON d.id = e.departamento_id
GROUP BY d.denominacion
HAVING COUNT(e.id) > 5;

-- 7: Empleados en Córdoba con puesto de Analista o Programador
SELECT e.nombre
FROM empleados e
JOIN departamentos d ON e.departamento_id = d.id
JOIN localidades l ON d.localidad_id = l.id
WHERE l.localidad = 'Córdoba' AND e.puesto_id IN (SELECT id FROM puestos WHERE puesto IN ('Analista', 'Programador'));

-- 8: Sueldo medio de todos los empleados
SELECT AVG(sueldo) AS sueldo_medio
FROM empleados;

-- 9: Máximo sueldo en el departamento 10
SELECT MAX(sueldo) AS max_sueldo
FROM empleados
WHERE departamento_id = 10;

-- 10: Sueldo mínimo en el departamento Soporte
SELECT MIN(sueldo) AS min_sueldo
FROM empleados
WHERE departamento_id IN (SELECT id FROM departamentos WHERE denominacion = 'Soporte');

-- 11: Suma de sueldos por puesto
SELECT p.puesto, SUM(e.sueldo) AS suma_sueldos
FROM empleados e
JOIN puestos p ON e.puesto_id = p.id
GROUP BY p.puesto;