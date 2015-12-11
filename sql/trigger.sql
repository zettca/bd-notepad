DROP TRIGGER IF EXISTS ins_reg;
DROP TRIGGER IF EXISTS ins_tp;
DROP TRIGGER IF EXISTS ins_pag;
DROP TRIGGER IF EXISTS ins_rp;
DROP TRIGGER IF EXISTS ins_campo;
DROP TRIGGER IF EXISTS ins_valor;
DROP PROCEDURE p;

delimiter $$
CREATE TRIGGER ins_reg BEFORE INSERT ON registo
FOR EACH ROW
	BEGIN
		CALL p(NEW.idseq);
	END;$$
delimiter ;

delimiter $$
CREATE TRIGGER ins_tp BEFORE INSERT ON tipo_registo
FOR EACH ROW
	BEGIN
		CALL p(NEW.idseq);
	END;$$
delimiter ;

delimiter $$
CREATE TRIGGER ins_pag BEFORE INSERT ON pagina
FOR EACH ROW
	BEGIN
		CALL p(NEW.idseq);
	END;$$
delimiter ;

delimiter $$
CREATE TRIGGER ins_rp BEFORE INSERT ON reg_pag
FOR EACH ROW
	BEGIN
		CALL p(NEW.idseq);
	END;$$
delimiter ;

delimiter $$
CREATE TRIGGER ins_campo BEFORE INSERT ON campo
FOR EACH ROW
	BEGIN
		CALL p(NEW.idseq);
	END;$$
delimiter ;

delimiter $$
CREATE TRIGGER ins_valor BEFORE INSERT ON valor
FOR EACH ROW
	BEGIN
		CALL p(NEW.idseq);
	END;$$
delimiter ;

delimiter $$
CREATE PROCEDURE p (IN ids INT)
	BEGIN
		if (ids IN(SELECT idseq FROM valor) OR
			ids IN(SELECT idseq FROM reg_pag) OR
			ids IN(SELECT idseq FROM registo) OR
			ids IN(SELECT idseq FROM tipo_registo) OR 
			ids IN(SELECT idseq FROM campo) OR
			ids IN(SELECT idseq FROM pagina) )
		THEN CALL SAMBA_CREU_MALUCO();
		END IF;
	END$$

delimiter ;