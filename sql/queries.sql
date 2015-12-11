/* a) Quais os utilizadores que falharam o login mais vezes do que tiveram sucesso? */
SELECT userid
FROM utilizador NATURAL JOIN login
GROUP BY userid
HAVING SUM(sucesso) < (COUNT(sucesso)-SUM(sucesso))

/* b) Quais os registos que aparecem em todas as páginas de um utilizador? */
SELECT regid, typeid, userid
FROM reg_pag
WHERE 	ativa = 1 
		AND typeid IN(SELECT typecnt FROM tipo_registo WHERE tipo_registo.ativo)
		AND pageid IN (SELECT pagecounter FROM pagina WHERE pagina.ativa)
		AND regid IN (SELECT regcounter FROM registo WHERE registo.ativo)
		AND regid IN (SELECT regid 
						FROM (
							SELECT userid, pageid, COUNT(regid) AS contareg 
							FROM reg_pag
							WHERE reg_pag.ativa = 1 
								AND typeid IN(SELECT typecnt FROM tipo_registo WHERE tipo_registo.ativo)
								AND pageid IN (SELECT pagecounter FROM pagina WHERE pagina.ativa)
								AND regid IN (SELECT regcounter FROM registo WHERE registo.ativo)
							GROUP BY regid
							) AS contador1 NATURAL JOIN
						(
							SELECT userid, pagecounter, COUNT(pagecounter) AS contapag
							FROM pagina
							WHERE pagina.ativa = 1
							GROUP BY userid
						) AS contador2 NATURAL JOIN
						reg_pag
						WHERE contareg >= contapag)
/*
SELECT * FROM reg_pag LEFT OUTER JOIN registo ON (reg_pag.regid = registo.regcounter)
UNION
SELECT * FROM reg_pag RIGHT OUTER JOIN registo ON (reg_pag.regid = registo.regcounter)
WHERE reg_pag.userid = registo.userid
*/

/* c) Quais os utilizadores que têm o maior número médio de registos por página? */
SELECT userid
FROM (
		SELECT userid, AVG(regcount) AS media
		FROM (
				SELECT userid, pageid, COUNT(idregpag) AS regcount
				FROM reg_pag
				WHERE ativa = 1 
						AND typeid IN(SELECT typecnt FROM tipo_registo WHERE ativo)
						AND pageid IN (SELECT pagecounter FROM pagina WHERE ativa)
						AND regid IN(SELECT regcounter FROM registo WHERE ativo)
				GROUP BY pageid
			)AS regcounts
		GROUP BY userid
	) AS medias
WHERE media >= ALL(SELECT media
					FROM(
							SELECT userid, AVG(regcount) AS media
							FROM (
									SELECT userid, pageid, COUNT(idregpag) AS regcount
									FROM reg_pag
									WHERE ativa = 1 
										AND typeid IN(SELECT typecnt FROM tipo_registo WHERE ativo)
										AND pageid IN (SELECT pagecounter FROM pagina WHERE ativa)
										AND regid IN(SELECT regcounter FROM registo WHERE ativo)
									GROUP BY pageid
								)AS regcounts
							GROUP BY userid
						 )AS averages)
/*
    media = (SELECT MAX(media) FROM medias) | o gajo não conhece medias
    media = MAX(media) ^
*/


/* d) Quais os utilizadores que, em todas as suas páginas, têm registos de todos os tipos? */
SELECT userid
FROM(
	SELECT userid, AVG(idcnt) AS media
	FROM (
			SELECT userid, COUNT(DISTINCT typeid) AS idcnt
			FROM reg_pag
			WHERE ativa = 1
				AND typeid IN(SELECT typecnt FROM tipo_registo WHERE ativo)
				AND pageid IN (SELECT pagecounter FROM pagina WHERE ativa)
				AND regid IN(SELECT regcounter FROM registo WHERE ativo)
			GROUP BY pageid
		) AS tipoidcontador
	GROUP BY userid
	) AS contador1 NATURAL JOIN
	(
		SELECT userid, COUNT(typecnt) AS tpocnt
		FROM tipo_registo
		WHERE ativo = 1		GROUP BY userid
	) AS contador2
WHERE media = tpocnt