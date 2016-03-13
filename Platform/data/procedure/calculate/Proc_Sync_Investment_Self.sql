DELIMITER $$

USE `EAI_CALCULATE`$$

DROP PROCEDURE IF EXISTS `Proc_Sync_Investment_Self`$$

CREATE PROCEDURE `Proc_Sync_Investment_Self` () 
BEGIN
   START TRANSACTION ;
   UPDATE 
      EAI_CALCULATE.CL_COK_INVESTMENT_SELF a,
      (SELECT 
         DEPARTMENT_LEVEL2_ID,
         DEPARTMENT_LEVEL2_LINK_ID,
         DEPARTMENT_LEVEL2_LABEL,
         OUID,
         LINK_ID,
         INVESTMENT_COUNT,
         INVESTMENTTOTAL,
         REDEMPTIONTOTAL,
         INVESTMENTTOTAL - REDEMPTIONTOTAL AS NETINVESTMENTTOTAL 
      FROM
         (SELECT 
            a.DEPARTMENT_LEVEL2_ID,
            a.DEPARTMENT_LEVEL2_LINK_ID,
            a.DEPARTMENT_LEVEL2_LABEL,
            b.OUID,
            b.LINK_ID,
            COUNT(a.GUID) INVESTMENT_COUNT,
            SUM(
               CASE
                  WHEN a.CUSTOMER_ACTION_CD = '1' 
                  THEN a.CUSTOMER_ACTION_AMOUNT 
                  ELSE 0 
               END
            ) AS INVESTMENTTOTAL,
            SUM(
               CASE
                  WHEN a.CUSTOMER_ACTION_CD = '2' 
                  THEN a.CUSTOMER_ACTION_AMOUNT 
                  ELSE 0 
               END
            ) AS REDEMPTIONTOTAL 
         FROM
            EAI_STATISTICS.ST_FIN_DYNAMIC a,
            EAI_STATISTICS.ST_FIN_MARKETER b 
         WHERE b.LINK_ID = a.CUSTOMER_LINK_ID 
            AND a.CUSTOMER_LINK_ID = a.MARKETER_LINK_ID 
            AND b.STATUS_CD = '1' 
         GROUP BY a.CUSTOMER_LINK_ID) t 
      WHERE t.INVESTMENTTOTAL > 100000) st 
   SET
      a.INVESTMENT_TOTAL = st.INVESTMENTTOTAL,
      a.REDEMPTION_TOTAL = st.REDEMPTIONTOTAL,
      a.NETINVESTMENT_TOTAL = st.NETINVESTMENTTOTAL,
      a.INVESTMENT_COUNT = st.INVESTMENT_COUNT,
      UPDATE_DATE = NOW() 
   WHERE st.DEPARTMENT_LEVEL2_ID = a.`DEPARTMENT_ID` 
      AND st.DEPARTMENT_LEVEL2_LINK_ID = a.`DEPARTMENT_LID` 
      AND st.OUID = a.`MARKETER_ID` 
      AND st.LINK_ID = a.`MARKETER_LID` ;
   INSERT INTO EAI_CALCULATE.CL_COK_INVESTMENT_SELF (
      GUID,
      DEPARTMENT_ID,
      DEPARTMENT_LID,
      DEPARTMENT_LABEL,
      MARKETER_ID,
      MARKETER_LID,
      INVESTMENT_COUNT,
      INVESTMENT_TOTAL,
      REDEMPTION_TOTAL,
      NETINVESTMENT_TOTAL,
      CREATE_DATE,
      UPDATE_DATE
   ) 
   SELECT 
      UUID,
      DEPARTMENT_LEVEL2_ID,
      DEPARTMENT_LEVEL2_LINK_ID,
      DEPARTMENT_LEVEL2_LABEL,
      OUID,
      LINK_ID,
      INVESTMENT_COUNT,
      INVESTMENTTOTAL,
      REDEMPTIONTOTAL,
      INVESTMENTTOTAL - REDEMPTIONTOTAL,
      NOW(),
      NOW() 
   FROM
      (SELECT 
         UPPER(REPLACE(UUID(), '-', '')) UUID,
         a.DEPARTMENT_LEVEL2_ID,
         a.DEPARTMENT_LEVEL2_LINK_ID,
         a.DEPARTMENT_LEVEL2_LABEL,
         a.OUID,
         a.LINK_ID,
         COUNT(a.GUID) INVESTMENT_COUNT,
         SUM(
            CASE
               WHEN a.CUSTOMER_ACTION_CD = '1' 
               THEN a.CUSTOMER_ACTION_AMOUNT 
               ELSE 0 
            END
         ) AS INVESTMENTTOTAL,
         SUM(
            CASE
               WHEN a.CUSTOMER_ACTION_CD = '2' 
               THEN a.CUSTOMER_ACTION_AMOUNT 
               ELSE 0 
            END
         ) AS REDEMPTIONTOTAL 
      FROM
         EAI_STATISTICS.ST_FIN_DYNAMIC a,
         EAI_STATISTICS.ST_FIN_MARKETER b 
      WHERE b.LINK_ID = a.CUSTOMER_LINK_ID 
         AND a.CUSTOMER_LINK_ID = a.MARKETER_LINK_ID 
         AND b.STATUS_CD = '1' 
      GROUP BY a.CUSTOMER_LINK_ID) t
   WHERE t.INVESTMENTTOTAL > 100000 
      AND NOT EXISTS 
      (SELECT 
         DEPARTMENT_ID, DEPARTMENT_LID,MARKETER_ID,MARKETER_LID
      FROM
         EAI_CALCULATE.CL_COK_INVESTMENT_SELF c 
      WHERE t.DEPARTMENT_LEVEL2_ID = c.`DEPARTMENT_ID` 
         AND t.DEPARTMENT_LEVEL2_LINK_ID = c.`DEPARTMENT_LID` 
         AND t.OUID = c.`MARKETER_ID` 
         AND t.LINK_ID = c.`MARKETER_LID`) ;
   IF @@ERROR_COUNT = 0 
   THEN COMMIT ;
   ELSE ROLLBACK ;
   END IF ;
END $$

DELIMITER ;