-- ============================================================
-- <T>公司名片</T>
-- <author>赵高发</author>
-- <time>2015/12/02</time>
-- ============================================================
DELIMITER $$

USE `EAI_CALCULATE`$$
DROP PROCEDURE IF EXISTS `Proc_Sync_Department_Card`$$

CREATE PROCEDURE `EAI_CALCULATE`.`Proc_Sync_Department_Card` () 
BEGIN
   -- 更新公司名片
   UPDATE 
      `EAI_CALCULATE`.CL_COK_DEPARTMENT_CRAD cd,
      (SELECT 
         t.UID,
         t.LEVEL2_ID,
         t.LEVEL2_LINK_ID,
         t.DEPARTMENT_LABEL,
         t.SUPERVISOR,
         t.DEPARTMENT_COUNT,
         t.MARKETER_COUNT,
         t.INVESTMENT_TOTAL,
         t.REDEMPTION_TOTAL,
         t.NETINVESTMENT_TOTAL,
         t.RATE,
         NOW() AS NW 
      FROM
         (SELECT 
            a.UID,
            a.LEVEL2_ID,
            a.LEVEL2_LINK_ID,
            a.DEPARTMENT_LABEL,
            a.SUPERVISOR,
            b.DEPARTMENT_COUNT,
            c.MARKETER_COUNT,
            d.INVESTMENT_TOTAL,
            e.REDEMPTION_TOTAL,
            f.NETINVESTMENT_TOTAL,
            e.REDEMPTION_TOTAL / d.INVESTMENT_TOTAL AS RATE 
         FROM
            (SELECT 
               REPLACE(UPPER(UUID()), '-', '') UID,
               LEVEL2_ID,
               LEVEL2_LINK_ID,
               "上海钰申" AS DEPARTMENT_LABEL,
               "杨翠致" AS SUPERVISOR 
            FROM
               `EAI_STATISTICS`.ST_FIN_DEPARTMENT) a,
            (SELECT 
               COUNT(DISTINCT LEVEL4_LINK_ID) AS DEPARTMENT_COUNT 
            FROM
               `EAI_STATISTICS`.ST_FIN_DEPARTMENT) b,
            (SELECT 
               COUNT(OUID) AS MARKETER_COUNT 
            FROM
               `EAI_STATISTICS`.ST_FIN_MARKETER 
            WHERE `STATUS_CD` = "1") c,
            (SELECT 
               SUM(INVESTMENT_TOTAL) AS INVESTMENT_TOTAL 
            FROM
               `EAI_STATISTICS`.ST_FIN_DEPARTMENT) d,
            (SELECT 
               SUM(REDEMPTION_TOTAL) AS REDEMPTION_TOTAL 
            FROM
               `EAI_STATISTICS`.ST_FIN_DEPARTMENT) e,
            (SELECT 
               SUM(NETINVESTMENT_TOTAL) AS NETINVESTMENT_TOTAL 
            FROM
               `EAI_STATISTICS`.ST_FIN_DEPARTMENT) f) t) tt 
   SET
      cd.DEPARTMENT_LABEL = tt.DEPARTMENT_LABEL,
      cd.SUPERVISOR = tt.SUPERVISOR,
      cd.DEPARTMENT_COUNT = tt.DEPARTMENT_COUNT,
      cd.MARKETER_COUNT = tt.MARKETER_COUNT,
      cd.INVESTMENT_DAY = tt.INVESTMENT_TOTAL,
      cd.REDEMPTION_DAY = tt.REDEMPTION_TOTAL,
      cd.NETINVESTMENT_DAY = tt.NETINVESTMENT_TOTAL,
      cd.REDEMPTION_RATE = tt.RATE,
      cd.UPDATE_DATE = NOW() 
   WHERE cd.DEPARTMENT_LID = tt.LEVEL2_LINK_ID ;
   -- 插入公司名片
   INSERT INTO `EAI_CALCULATE`.CL_COK_DEPARTMENT_CRAD (
      GUID,
      DEPARTMENT_ID,
      DEPARTMENT_LID,
      DEPARTMENT_LABEL,
      SUPERVISOR,
      DEPARTMENT_COUNT,
      MARKETER_COUNT,
      INVESTMENT_DAY,
      REDEMPTION_DAY,
      NETINVESTMENT_DAY,
      REDEMPTION_RATE,
      CREATE_DATE
   ) 
   SELECT 
      t.UID,
      t.LEVEL2_ID,
      t.LEVEL2_LINK_ID,
      t.DEPARTMENT_LABEL,
      t.SUPERVISOR,
      t.DEPARTMENT_COUNT,
      t.MARKETER_COUNT,
      t.INVESTMENT_TOTAL,
      t.REDEMPTION_TOTAL,
      t.NETINVESTMENT_TOTAL,
      t.RATE,
      NOW() AS NW 
   FROM
      (SELECT 
         a.UID,
         a.LEVEL2_ID,
         a.LEVEL2_LINK_ID,
         a.DEPARTMENT_LABEL,
         a.SUPERVISOR,
         b.DEPARTMENT_COUNT,
         c.MARKETER_COUNT,
         d.INVESTMENT_TOTAL,
         e.REDEMPTION_TOTAL,
         f.NETINVESTMENT_TOTAL,
         e.REDEMPTION_TOTAL / d.INVESTMENT_TOTAL AS RATE 
      FROM
         (SELECT 
            REPLACE(UPPER(UUID()), '-', '') UID,
            LEVEL2_ID,
            LEVEL2_LINK_ID,
            "上海钰申" AS DEPARTMENT_LABEL,
            "杨翠致" AS SUPERVISOR 
         FROM
            `EAI_STATISTICS`.ST_FIN_DEPARTMENT) a,
         (SELECT 
            COUNT(DISTINCT LEVEL4_LINK_ID) AS DEPARTMENT_COUNT 
         FROM
            `EAI_STATISTICS`.ST_FIN_DEPARTMENT) b,
         (SELECT 
            COUNT(OUID) AS MARKETER_COUNT 
         FROM
            `EAI_STATISTICS`.ST_FIN_MARKETER 
         WHERE `STATUS_CD` = "1") c,
         (SELECT 
            SUM(INVESTMENT_TOTAL) AS INVESTMENT_TOTAL 
         FROM
            `EAI_STATISTICS`.ST_FIN_DEPARTMENT) d,
         (SELECT 
            SUM(REDEMPTION_TOTAL) AS REDEMPTION_TOTAL 
         FROM
            `EAI_STATISTICS`.ST_FIN_DEPARTMENT) e,
         (SELECT 
            SUM(NETINVESTMENT_TOTAL) AS NETINVESTMENT_TOTAL 
         FROM
            `EAI_STATISTICS`.ST_FIN_DEPARTMENT) f) t 
   WHERE t.LEVEL2_LINK_ID IS NOT NULL 
      AND NOT EXISTS 
      (SELECT 
         m.DEPARTMENT_LID 
      FROM
         `EAI_CALCULATE`.CL_COK_DEPARTMENT_CRAD m 
      WHERE m.DEPARTMENT_LID = t.LEVEL2_LINK_ID) ;
END $$

DELIMITER ;