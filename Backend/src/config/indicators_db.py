
# ----------------------------------------------------------------
# QUERYS
# ----------------------------------------------------------------

indicator_bal1_vs_bal1ab_query = """SELECT 
    Fecha,
    SUM(CASE WHEN Variedad = 'XLENCE' AND Destino = 'PRECLASIFICACION' THEN PesoNetoOriginal ELSE 0 END) AS B1,
	SUM(CASE WHEN Variedad = 'XLENCE' AND Origen = 'BALANZA 1' AND TallosxMalla = 20 THEN PesoNetoOriginal ELSE 0 END) AS B1AB
FROM Peso
WHERE Fecha BETWEEN DATEADD(DAY, -8, CONVERT(date, GETDATE())) AND CONVERT(date, GETDATE())
GROUP BY Fecha
ORDER BY Fecha"""

indicator_bal1ab_bal2_query = """

SELECT 
    Fecha,
    SUM(CASE WHEN Variedad = 'XLENCE' AND Origen = 'BALANZA 1' AND TallosxMalla = 20 THEN PesoNetoOriginal ELSE 0 END) AS B1AB,
    SUM(CASE WHEN Variedad = 'XLENCE' AND Origen = 'BALANZA 2' AND TallosxMalla = 20 THEN PesoNetoOriginal ELSE 0 END) AS B2
FROM Peso

WHERE Fecha BETWEEN DATEADD(DAY, -8, CONVERT(date, GETDATE())) AND CONVERT(date, GETDATE())

GROUP BY Fecha

ORDER BY Fecha

"""