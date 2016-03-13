DELIMITER $$

USE `EAI_CALCULATE`$$

DROP PROCEDURE IF EXISTS `Proc_Sync_Unique_Self`$$

	/***
	一个客户存储过程
	*/
CREATE PROCEDURE `Proc_Sync_Unique_Self`()
BEGIN
   UPDATE 
      EAI_CALCULATE.`CL_COK_CUSTOMER_UNIQUE` t,
      (SELECT 
         base.RANK_LABEL,
         base.DEPARTMENT_LEVEL2_LABEL,
         base.q,
         base.g,
         base.zbi,
         base.zt,
         base.yeji,
         base.MARKETER_LINK_ID,
         base.DEPARTMENT_LINK_ID 
      FROM
         (SELECT 
            `a`.`MARKETER_LINK_ID` AS `MARKETER_LINK_ID`,
            `a`.`DEPARTMENT_LINK_ID` AS `DEPARTMENT_LINK_ID`,
            `b`.`RANK_LABEL` AS `RANK_LABEL`,
            `a`.`DEPARTMENT_LEVEL2_LABEL` AS `DEPARTMENT_LEVEL2_LABEL`,
            (
               (
                  TO_DAYS(NOW()) - TO_DAYS(`b`.`ENTER_DATE`)
               ) / 30
            ) AS `q`,
            COUNT(DISTINCT `a`.`CUSTOMER_LINK_ID`) AS `g`,
            COUNT(`b`.`DEPARTMENT_LEVEL2_LABEL`) AS `zbi`,
            SUM(
               (
                  CASE
                     WHEN (`a`.`CUSTOMER_ACTION_CD` = '1') 
                     THEN `a`.`CUSTOMER_ACTION_AMOUNT` 
                     ELSE 0 
                  END
               )
            ) AS `zt`,
            (
               (
                  SUM(
                     (
                        CASE
                           WHEN (`a`.`CUSTOMER_ACTION_CD` = '1') 
                           THEN `a`.`CUSTOMER_ACTION_AMOUNT` 
                           ELSE 0 
                        END
                     )
                  ) / COUNT(DISTINCT `a`.`CUSTOMER_LINK_ID`)
               ) / 30
            ) AS `yeji` 
         FROM
            (
               EAI_STATISTICS.`ST_FIN_DYNAMIC` `a` 
               JOIN EAI_STATISTICS.`ST_FIN_MARKETER` `b`
            ) 
         WHERE (
               (
                  `a`.`MARKETER_LINK_ID` = `b`.`LINK_ID`
               ) 
               AND (
                  `a`.`CUSTOMER_LINK_ID` = `a`.`MARKETER_LINK_ID`
               ) 
               AND (`b`.`STATUS_CD` = '1') AND a.department_level2_label IS NOT NULL
            ) 
         GROUP BY `a`.`MARKETER_LINK_ID`,
            `b`.`DEPARTMENT_LEVEL2_LABEL` 
         HAVING ((`g` = 1) 
               AND (`q` > 3))) base) f 
   SET
      t.LABEL = f.RANK_LABEL,
      t.DEPARTMENT_LABEL = f.DEPARTMENT_LEVEL2_LABEL,
      t.AVERAGE_TIME_ON_JOB = f.q,
      t.MARKETER_COUNT = f.g,
      t.MARKETER_RATE = f.zbi,
      t.CUSTOMER_INVESTMENT_TOTAL = f.zt,
      t.AVERAGE_ACHIEVEMENT = f.yeji 
   WHERE t.DEPARTMENT_ID = f.MARKETER_LINK_ID 
      AND t.DEPARTMENT_LID = f.DEPARTMENT_LINK_ID ;
   INSERT INTO EAI_CALCULATE.`CL_COK_CUSTOMER_UNIQUE` (
      GUID,
      DEPARTMENT_ID,
      DEPARTMENT_LID,
      LABEL,
      DEPARTMENT_LABEL,
      AVERAGE_TIME_ON_JOB,
      MARKETER_COUNT,
      MARKETER_RATE,
      CUSTOMER_INVESTMENT_TOTAL,
      AVERAGE_ACHIEVEMENT
   ) 
   SELECT 
      UUID(),
      f.MARKETER_LINK_ID,
      f.DEPARTMENT_LINK_ID,
      f.RANK_LABEL,
      f.DEPARTMENT_LEVEL2_LABEL,
      f.q,
      f.g,
      f.zbi,
      f.zt,
      f.yeji 
   FROM
      (SELECT 
         `a`.`MARKETER_LINK_ID` AS `MARKETER_LINK_ID`,
         `a`.`DEPARTMENT_LINK_ID` AS `DEPARTMENT_LINK_ID`,
         `b`.`RANK_LABEL` AS `RANK_LABEL`,
         `a`.`DEPARTMENT_LEVEL2_LABEL` AS `DEPARTMENT_LEVEL2_LABEL`,
         (
            (
               TO_DAYS(NOW()) - TO_DAYS(`b`.`enter_date`)
            ) / 30
         ) AS `q`,
         COUNT(DISTINCT `a`.`CUSTOMER_LINK_ID`) AS `g`,
         COUNT(`b`.`DEPARTMENT_LEVEL2_LABEL`) AS `zbi`,
         SUM(
            (
               CASE
                  WHEN (`a`.`CUSTOMER_ACTION_CD` = '1') 
                  THEN `a`.`CUSTOMER_ACTION_AMOUNT` 
                  ELSE 0 
               END
            )
         ) AS `zt`,
         (
            (
               SUM(
                  (
                     CASE
                        WHEN (`a`.`CUSTOMER_ACTION_CD` = '1') 
                        THEN `a`.`CUSTOMER_ACTION_AMOUNT` 
                        ELSE 0 
                     END
                  )
               ) / COUNT(DISTINCT `a`.`CUSTOMER_LINK_ID`)
            ) / 30
         ) AS `yeji` 
      FROM
         (
            EAI_STATISTICS.`ST_FIN_DYNAMIC` `a` 
            JOIN EAI_STATISTICS.`ST_FIN_MARKETER` `b`
         ) 
      WHERE (
            (
               `a`.`MARKETER_LINK_ID` = `b`.`LINK_ID`
            ) 
            AND (
               `a`.`CUSTOMER_LINK_ID` = `a`.`MARKETER_LINK_ID`
            ) 
            AND (`b`.`STATUS_CD` = '1') AND a.department_level2_label IS NOT NULL
         ) 
      GROUP BY `a`.`MARKETER_LINK_ID`,
         `b`.`DEPARTMENT_LEVEL2_LABEL` 
      HAVING ((`g` = 1) 
            AND (`q` > 3))) f 
   WHERE NOT EXISTS 
      (SELECT 
         MARKETER_LINK_ID,
         DEPARTMENT_LINK_ID 
      FROM
         EAI_CALCULATE.`CL_COK_CUSTOMER_UNIQUE` t 
      WHERE t.DEPARTMENT_ID = f.MARKETER_LINK_ID 
         AND t.DEPARTMENT_LID = f.DEPARTMENT_LINK_ID) ;
END$$

DELIMITER ;