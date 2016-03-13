-- ============================================================
-- <T>业绩,人力,人均排行榜</T>
-- ============================================================
DELIMITER $$

USE `EAI_CALCULATE`$$

DROP PROCEDURE IF EXISTS `Proc_Sync_Ranklist_Item`$$

CREATE PROCEDURE `Proc_Sync_Ranklist_Item`()
BEGIN
   -- 更新所有数据：
   UPDATE 
      EAI_CALCULATE.CL_FIN_RANKLIST_ITEM clr,
      (SELECT 
         REPLACE(UPPER(UUID()), '-', '') AS GUID,
         g.DEPARTMENT_ID,
         g.DEPARTMENT_NAME,
         g.RANK_ORDER,
         g.RANKLIST_ID,
         g.RELATIVITY_VALUE,
         g.UPDATE_TIME 
      FROM
         (SELECT 
            (@rowNum1 := @rowNum1 + 1) AS RANK_ORDER,
            a.DEPARTMENT_ID,a.DEPARTMENT_NAME,a.RELATIVITY_VALUE,a.RANKLIST_ID,
            NOW() AS UPDATE_TIME 
         FROM
            (SELECT 
               m.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_ID,
               m.DEPARTMENT_LEVEL2_LABEL AS DEPARTMENT_NAME,
               SUM(d.CUSTOMER_ACTION_AMOUNT) AS RELATIVITY_VALUE,
               1 AS RANKLIST_ID 
            FROM
               EAI_STATISTICS.ST_FIN_MARKETER m 
               JOIN EAI_STATISTICS.ST_FIN_DYNAMIC d 
                  ON m.LINK_ID = d.MARKETER_LINK_ID 
                  AND m.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
            GROUP BY DEPARTMENT_ID 
            ORDER BY RELATIVITY_VALUE DESC) a,
            (SELECT 
               (@rowNum1 := 0)) d 
         UNION ALL 
         SELECT 
            (@rowNum2 := @rowNum2 + 1) AS RANK_ORDER,
            b.DEPARTMENT_ID,b.DEPARTMENT_NAME,b.RELATIVITY_VALUE,b.RANKLIST_ID,
            NOW() AS UPDATE_TIME 
         FROM
            (SELECT 
               m.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_ID,
               m.DEPARTMENT_LEVEL2_LABEL AS DEPARTMENT_NAME,
               COUNT(1) AS RELATIVITY_VALUE,
               2 AS RANKLIST_ID 
            FROM
               EAI_STATISTICS.ST_FIN_MARKETER m 
            WHERE m.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
            GROUP BY m.DEPARTMENT_LEVEL2_LINK_ID 
            ORDER BY RELATIVITY_VALUE DESC) b,
            (SELECT 
               (@rowNum2 := 0)) e 
         UNION ALL 
         SELECT 
            (@rowNum3 := @rowNum3 + 1) AS RANK_ORDER,
            c.DEPARTMENT_ID,c.DEPARTMENT_NAME,c.RELATIVITY_VALUE,c.RANKLIST_ID,
            NOW() AS UPDATE_TIME 
         FROM
            (SELECT 
               m.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_ID,
               m.DEPARTMENT_LEVEL2_LABEL AS DEPARTMENT_NAME,
               SUM(d.CUSTOMER_ACTION_AMOUNT) / 
               (SELECT 
                  COUNT(1) 
               FROM
                  EAI_STATISTICS.ST_FIN_MARKETER mm 
               WHERE mm.DEPARTMENT_LEVEL2_LINK_ID = m.DEPARTMENT_LEVEL2_LINK_ID) AS RELATIVITY_VALUE,
               3 AS RANKLIST_ID 
            FROM
               EAI_STATISTICS.ST_FIN_MARKETER m 
               JOIN EAI_STATISTICS.ST_FIN_DYNAMIC d 
                  ON m.LINK_ID = d.MARKETER_LINK_ID 
                  AND m.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
            GROUP BY m.DEPARTMENT_LEVEL2_LINK_ID 
            ORDER BY RELATIVITY_VALUE DESC) c,
            (SELECT 
               (@rowNum3 := 0)) f) g) h 
   SET
      clr.PROPERTY2 = h.DEPARTMENT_ID,
      clr.LABEL = h.DEPARTMENT_NAME,
      clr.RANK_ORDER = h.RANK_ORDER,
      clr.RANKLIST_ID = h.RANKLIST_ID,
      clr.PROPERTY1 = h.RELATIVITY_VALUE,
      clr.UPDATE_DATE = h.UPDATE_TIME 
   WHERE clr.PROPERTY2 = h.DEPARTMENT_ID 
      AND clr.RANKLIST_ID = h.RANKLIST_ID;
      
   -- 如果有新的记录，就插入新的记录
   INSERT INTO EAI_CALCULATE.CL_FIN_RANKLIST_ITEM (
      GUID,
      PROPERTY2,
      LABEL,
      RANK_ORDER,
      RANKLIST_ID,
      PROPERTY1,
      UPDATE_DATE
   ) 
   SELECT 
      REPLACE(UPPER(UUID()), '-', '') AS GUID,
      g.DEPARTMENT_ID,
      g.DEPARTMENT_NAME,
      g.RANK_ORDER,
      g.RANKLIST_ID,
      g.RELATIVITY_VALUE,
      g.UPDATE_TIME 
   FROM
      (SELECT 
         (@rowNum4 := @rowNum4 + 1) AS RANK_ORDER,
         a.DEPARTMENT_ID,a.DEPARTMENT_NAME,a.RELATIVITY_VALUE,a.RANKLIST_ID,
         NOW() AS UPDATE_TIME 
      FROM
         (SELECT 
            m.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_ID,
            m.DEPARTMENT_LEVEL2_LABEL AS DEPARTMENT_NAME,
            SUM(d.CUSTOMER_ACTION_AMOUNT) AS RELATIVITY_VALUE,
            1 AS RANKLIST_ID 
         FROM
            EAI_STATISTICS.ST_FIN_MARKETER m 
            JOIN EAI_STATISTICS.ST_FIN_DYNAMIC d 
               ON m.LINK_ID = d.MARKETER_LINK_ID 
               AND m.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
         GROUP BY DEPARTMENT_ID 
         ORDER BY RELATIVITY_VALUE DESC) a,
         (SELECT 
            (@rowNum4 := 0)) d 
      UNION ALL 
      SELECT 
         (@rowNum5 := @rowNum5 + 1) AS RANK_ORDER,
         b.DEPARTMENT_ID,b.DEPARTMENT_NAME,b.RELATIVITY_VALUE,b.RANKLIST_ID,
         NOW() AS UPDATE_TIME 
      FROM
         (SELECT 
            m.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_ID,
            m.DEPARTMENT_LEVEL2_LABEL AS DEPARTMENT_NAME,
            COUNT(1) AS RELATIVITY_VALUE,
            2 AS RANKLIST_ID 
         FROM
            EAI_STATISTICS.ST_FIN_MARKETER m 
         WHERE m.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
         GROUP BY m.DEPARTMENT_LEVEL2_LINK_ID 
         ORDER BY RELATIVITY_VALUE DESC) b,
         (SELECT 
            (@rownum5 := 0)) e 
      UNION ALL 
      SELECT 
         (@rowNum6 := @rowNum6 + 1) AS RANK_ORDER,
         c.DEPARTMENT_ID,c.DEPARTMENT_NAME,c.RELATIVITY_VALUE,c.RANKLIST_ID,
         NOW() AS UPDATE_TIME 
      FROM
         (SELECT 
            m.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_ID,
            m.DEPARTMENT_LEVEL2_LABEL AS DEPARTMENT_NAME,
            SUM(d.CUSTOMER_ACTION_AMOUNT) / 
            (SELECT 
               COUNT(1) 
            FROM
               EAI_STATISTICS.ST_FIN_MARKETER mm 
            WHERE mm.DEPARTMENT_LEVEL2_LINK_ID = m.DEPARTMENT_LEVEL2_LINK_ID) AS RELATIVITY_VALUE,
            3 AS RANKLIST_ID 
         FROM
            EAI_STATISTICS.ST_FIN_MARKETER m 
            JOIN EAI_STATISTICS.ST_FIN_DYNAMIC d 
               ON m.LINK_ID = d.MARKETER_LINK_ID 
               AND m.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
         GROUP BY m.DEPARTMENT_LEVEL2_LINK_ID 
         ORDER BY RELATIVITY_VALUE DESC) c,
         (SELECT 
            (@rowNum6 := 0)) f) g 
   WHERE NOT EXISTS 
      (SELECT 
         OUID 
      FROM
         EAI_CALCULATE.CL_FIN_RANKLIST_ITEM str 
      WHERE str.PROPERTY2 = g.DEPARTMENT_ID 
      AND str.RANKLIST_ID = g.RANKLIST_ID);  
END$$

DELIMITER ;