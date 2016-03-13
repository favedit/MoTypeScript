-- ============================================================
-- <T>����һ���ͻ������ʦ</T>
-- <author>�Ը߷�</author>
-- <time>2015/12/04</time>
-- ============================================================
DELIMITER $$

USE `EAI_CALCULATE` $$

DROP PROCEDURE IF EXISTS `Proc_Sync_Customer_Unique` $$

CREATE PROCEDURE `Proc_Sync_Customer_Unique` () 
BEGIN
   -- ����
   INSERT INTO `EAI_CALCULATE`.`CL_COK_CUSTOMER_UNIQUE` (
      GUID,
      DEPARTMENT_ID,
      DEPARTMENT_LID,
      DEPARTMENT_LABEL,
      AVERAGE_TIME_ON_JOB,
      MARKETER_COUNT,
      MARKETER_RATE,
      CUSTOMER_INVESTMENT_TOTAL,
      AVERAGE_ACHIEVEMENT,
      CREATE_DATE
   ) 
   SELECT 
      REPLACE(UPPER(UUID()), '-', '') UID,
      t.DEPARTMENT_LEVEL2_ID,
      t.DEPARTMENT_LEVEL2_LINK_ID,
      t.DEPARTMENT_LEVEL2_LABEL,
      t.MONTH_SUM / t.NUM_1,
      t.NUM_1,
      t.NUM_1 / t.NUM,
      t.NUM_AMOUNT_TOTAL,
      t.NUM_AMOUNT_TOTAL / t.MONTH_SUM,
      NOW() NW 
   FROM
      (SELECT 
         a.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_LEVEL2_LINK_ID,
         a.DEPARTMENT_LEVEL2_ID,
         a.NUM AS NUM,
         a.DEPARTMENT_LEVEL2_LABEL AS DEPARTMENT_LEVEL2_LABEL,
         b.NUM_1 AS NUM_1,
         b.MONTH_SUM AS MONTH_SUM,
         c.NUM_AMOUNT_TOTAL AS NUM_AMOUNT_TOTAL 
      FROM
         (-- ���������ְ�����ʦ����	NUM
         SELECT 
            m.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_LEVEL2_LINK_ID,
            m.DEPARTMENT_LEVEL2_ID AS DEPARTMENT_LEVEL2_ID,
            COUNT(m.LINK_ID) AS NUM,
            m.`DEPARTMENT_LEVEL2_LABEL` AS DEPARTMENT_LEVEL2_LABEL 
         FROM
            `EAI_STATISTICS`.`ST_FIN_MARKETER` m 
         WHERE m.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
            AND m.STATUS_CD = '1' 
         GROUP BY m.DEPARTMENT_LEVEL2_LINK_ID,
            m.DEPARTMENT_LEVEL2_ID,
            m.`DEPARTMENT_LEVEL2_LABEL`) a,
         (-- ֻ��һ���ͻ������ʦ�������������ܺ� ������ְ3��������
         SELECT 
            sfm.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_LEVEL2_LINK_ID,
            COUNT(sfm.LINK_ID) AS NUM_1,
            SUM(
               TIMESTAMPDIFF(DAY, sfm.ENTER_DATE, NOW())
            ) / 30 AS MONTH_SUM 
         FROM
            `EAI_STATISTICS`.`ST_FIN_MARKETER` sfm,
            (SELECT 
               smc.MARKETER_LINK_ID 
            FROM
               `EAI_STATISTICS`.`ST_FIN_DYNAMIC` smc 
            GROUP BY smc.MARKETER_LINK_ID 
            HAVING COUNT(smc.CUSTOMER_LINK_ID) = 1) dtemp 
         WHERE sfm.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
            AND sfm.STATUS_CD = '1' 
            AND dtemp.MARKETER_LINK_ID = sfm.LINK_ID 
         GROUP BY sfm.DEPARTMENT_LEVEL2_LINK_ID 
         HAVING SUM(
               TIMESTAMPDIFF(DAY, sfm.ENTER_DATE, NOW())
            ) / 30 > 3) b,
         (-- ֻ��һ���ͻ������ʦ�Ŀͻ�����Ͷ��,������ְ(`STATUS_CD`='1')
         SELECT 
            dc.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_LEVEL2_LINK_ID,
            SUM(CUSTOMER_ACTION_AMOUNT) AS NUM_AMOUNT_TOTAL 
         FROM
            `EAI_STATISTICS`.`ST_FIN_DYNAMIC` dc,
            (SELECT 
               smc.MARKETER_LINK_ID 
            FROM
               `EAI_STATISTICS`.`ST_FIN_DYNAMIC` smc 
            GROUP BY smc.MARKETER_LINK_ID 
            HAVING COUNT(smc.CUSTOMER_LINK_ID) = 1) dtab,
            `EAI_STATISTICS`.`ST_FIN_MARKETER` sfmtab 
         WHERE dc.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
            AND dc.`MARKETER_LINK_ID` = dtab.MARKETER_LINK_ID 
            AND sfmtab.`LINK_ID` = dc.`MARKETER_LINK_ID` 
            AND sfmtab.`STATUS_CD` = '1' 
         GROUP BY dc.DEPARTMENT_LEVEL2_LINK_ID) c 
      WHERE a.DEPARTMENT_LEVEL2_LINK_ID = b.DEPARTMENT_LEVEL2_LINK_ID 
         AND b.DEPARTMENT_LEVEL2_LINK_ID = c.DEPARTMENT_LEVEL2_LINK_ID) t 
   WHERE NOT EXISTS 
      (SELECT 
         DEPARTMENT_LID 
      FROM
         `EAI_CALCULATE`.`CL_COK_CUSTOMER_UNIQUE` cu 
      WHERE cu.DEPARTMENT_LID = t.DEPARTMENT_LEVEL2_LINK_ID) ;
   -- ����
   UPDATE 
      `EAI_CALCULATE`.`CL_COK_CUSTOMER_UNIQUE` csu,
      (SELECT 
         ttab.DEPARTMENT_LEVEL2_LINK_ID,
         ttab.DEPARTMENT_LEVEL2_LABEL,
         ttab.AVERAGE_TIME_ON_JOB,
         ttab.MARKETER_COUNT,
         ttab.MARKETER_RATE,
         ttab.CUSTOMER_INVESTMENT_TOTAL,
         ttab.AVERAGE_ACHIEVEMENT,
         ttab.NW 
      FROM
         (SELECT 
            tb.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_LEVEL2_LINK_ID,
            tb.DEPARTMENT_LEVEL2_LABEL AS DEPARTMENT_LEVEL2_LABEL,
            tb.MONTH_SUM / tb.NUM_1 AS AVERAGE_TIME_ON_JOB,
            tb.NUM_1 AS MARKETER_COUNT,
            tb.NUM_1 / tb.NUM AS MARKETER_RATE,
            tb.NUM_AMOUNT_TOTAL AS CUSTOMER_INVESTMENT_TOTAL,
            tb.NUM_AMOUNT_TOTAL / tb.MONTH_SUM AS AVERAGE_ACHIEVEMENT,
            NOW() NW 
         FROM
            (SELECT 
               a.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_LEVEL2_LINK_ID,
               a.DEPARTMENT_LEVEL2_ID AS DEPARTMENT_LEVEL2_ID,
               a.NUM AS NUM,
               a.DEPARTMENT_LEVEL2_LABEL AS DEPARTMENT_LEVEL2_LABEL,
               b.NUM_1 AS NUM_1,
               b.MONTH_SUM AS MONTH_SUM,
               c.NUM_AMOUNT_TOTAL AS NUM_AMOUNT_TOTAL 
            FROM
               (-- ���������ְ�����ʦ����	NUM
               SELECT 
                  m.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_LEVEL2_LINK_ID,
                  m.DEPARTMENT_LEVEL2_ID AS DEPARTMENT_LEVEL2_ID,
                  COUNT(m.LINK_ID) AS NUM,
                  m.`DEPARTMENT_LEVEL2_LABEL` AS DEPARTMENT_LEVEL2_LABEL 
               FROM
                  `EAI_STATISTICS`.`ST_FIN_MARKETER` m 
               WHERE m.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
                  AND m.STATUS_CD = '1' 
               GROUP BY m.DEPARTMENT_LEVEL2_LINK_ID,
                  m.DEPARTMENT_LEVEL2_ID,
                  m.`DEPARTMENT_LEVEL2_LABEL`) a,
               (-- ֻ��һ���ͻ������ʦ�������������ܺ� ������ְ3��������
               SELECT 
                  sfm.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_LEVEL2_LINK_ID,
                  COUNT(sfm.LINK_ID) AS NUM_1,
                  SUM(
                     TIMESTAMPDIFF(DAY, sfm.ENTER_DATE, NOW())
                  ) / 30 AS MONTH_SUM 
               FROM
                  `EAI_STATISTICS`.`ST_FIN_MARKETER` sfm,
                  (SELECT 
                     smc.MARKETER_LINK_ID 
                  FROM
                     `EAI_STATISTICS`.`ST_FIN_DYNAMIC` smc 
                  GROUP BY smc.MARKETER_LINK_ID 
                  HAVING COUNT(smc.CUSTOMER_LINK_ID) = 1) dtemp 
               WHERE sfm.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
                  AND sfm.STATUS_CD = '1' 
                  AND dtemp.MARKETER_LINK_ID = sfm.LINK_ID 
               GROUP BY sfm.DEPARTMENT_LEVEL2_LINK_ID 
               HAVING SUM(
                     TIMESTAMPDIFF(DAY, sfm.ENTER_DATE, NOW())
                  ) / 30 > 3) b,
               (-- ֻ��һ���ͻ������ʦ�Ŀͻ�����Ͷ��,������ְ(`STATUS_CD`='1')
               SELECT 
                  dc.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_LEVEL2_LINK_ID,
                  SUM(CUSTOMER_ACTION_AMOUNT) AS NUM_AMOUNT_TOTAL 
               FROM
                  `EAI_STATISTICS`.`ST_FIN_DYNAMIC` dc,
                  (SELECT 
                     smc.MARKETER_LINK_ID 
                  FROM
                     `EAI_STATISTICS`.`ST_FIN_DYNAMIC` smc 
                  GROUP BY smc.MARKETER_LINK_ID 
                  HAVING COUNT(smc.CUSTOMER_LINK_ID) = 1) dtab,
                  `EAI_STATISTICS`.`ST_FIN_MARKETER` sfmtab 
               WHERE dc.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
                  AND dc.`MARKETER_LINK_ID` = dtab.MARKETER_LINK_ID 
                  AND sfmtab.`LINK_ID` = dc.`MARKETER_LINK_ID` 
                  AND sfmtab.`STATUS_CD` = '1' 
               GROUP BY dc.DEPARTMENT_LEVEL2_LINK_ID) c 
            WHERE a.DEPARTMENT_LEVEL2_LINK_ID = b.DEPARTMENT_LEVEL2_LINK_ID 
               AND b.DEPARTMENT_LEVEL2_LINK_ID = c.DEPARTMENT_LEVEL2_LINK_ID) tb) ttab) ttabs 
   SET
      csu.DEPARTMENT_LABEL = ttabs.DEPARTMENT_LEVEL2_LABEL,
      csu.AVERAGE_TIME_ON_JOB = ttabs.AVERAGE_TIME_ON_JOB,
      csu.MARKETER_COUNT = ttabs.MARKETER_COUNT,
      csu.MARKETER_RATE = ttabs.MARKETER_RATE,
      csu.CUSTOMER_INVESTMENT_TOTAL = ttabs.CUSTOMER_INVESTMENT_TOTAL,
      csu.AVERAGE_ACHIEVEMENT = ttabs.AVERAGE_ACHIEVEMENT,
      csu.UPDATE_DATE = ttabs.NW 
   WHERE csu.DEPARTMENT_LID = ttabs.DEPARTMENT_LEVEL2_LINK_ID ;
END $$

DELIMITER ;

