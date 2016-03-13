-- ============================================================
-- <T>业绩,人力,人均,趋势,任务五力图</T>
-- ==========================================================
DELIMITER $$

USE `EAI_CALCULATE`$$

DROP PROCEDURE IF EXISTS `Proc_Sync_Achievements_Radar`$$

CREATE PROCEDURE `Proc_Sync_Achievements_Radar`()
BEGIN
   -- 更新所有数据：
   UPDATE 
      EAI_CALCULATE.CL_COK_ACHIEVEMENTS_RADAR clr,
      (SELECT 
         REPLACE(UPPER(UUID()), '-', '') AS GUID,
         g.DEPARTMENT_ID,
         g.DEPARTMENT_NAME,
         ROUND(
            g.TOTAL_INVESTMENT_SCORE * 0.2 + g.PERSON_NUM_SCORE * 0.2+ g.PERSON_AVG_SCORE * 0.2+ g.TASK_SCORE * 0.2+ g.TREND_SCORE * 0.2
         ) AS SCORE,
         g.TOTAL_INVESTMENT,
         g.TOTAL_INVESTMENT_SCORE,
         g.PERSON_NUM,
         g.PERSON_NUM_SCORE,
         g.PERSON_AVG,
         g.PERSON_AVG_SCORE,
         g.TASK,
         g.TASK_SCORE,
         g.TASK_ACHIEVE / g.TASK AS COMPLETION_RATE,
         g.TREND,
         g.TREND_SCORE,
         NOW() AS UPDATE_TIME 
      FROM
         (SELECT 
            h.RANK_ORDER,
            h.DEPARTMENT_NUM,
            h.DEPARTMENT_ID,
            h.DEPARTMENT_NAME,
            h.TOTAL_INVESTMENT,
            ROUND(
               80 * (
                  (
                     h.DEPARTMENT_NUM - h.RANK_ORDER + 1
                  ) / (h.DEPARTMENT_NUM + 1)
               ) + (
                  20 * h.TOTAL_INVESTMENT / h.MAX_TOTAL_INVESTMENT
               )
            ) AS TOTAL_INVESTMENT_SCORE,
            h.MAX_TOTAL_INVESTMENT,
            h.PERSON_NUM,
            CASE
               WHEN h.PERSON_NUM > 20000 
               THEN 90 
               WHEN h.PERSON_NUM > 10000 
               AND h.PERSON_NUM <= 20000 
               THEN 80 
               WHEN h.PERSON_NUM > 5000 
               AND h.PERSON_NUM <= 10000 
               THEN 70 
               WHEN h.PERSON_NUM > 3000 
               AND h.PERSON_NUM <= 5000 
               THEN 60 
               WHEN h.PERSON_NUM > 500 
               AND h.PERSON_NUM <= 3000 
               THEN 50 
               ELSE 40 
            END AS PERSON_NUM_SCORE,
            h.PERSON_AVG,
            CASE
               WHEN h.PERSON_AVG > 100000000 
               THEN 100 
               WHEN h.PERSON_AVG > 50000000 
               AND h.PERSON_AVG <= 100000000 
               THEN 95 
               WHEN h.PERSON_AVG > 10000000 
               AND h.PERSON_AVG <= 500000000 
               THEN 90 
               WHEN h.PERSON_AVG > 5000000 
               AND h.PERSON_AVG <= 10000000 
               THEN 85 
               WHEN h.PERSON_AVG > 1000000 
               AND h.PERSON_AVG <= 5000000 
               THEN 80 
               WHEN h.PERSON_AVG > 100000 
               AND h.PERSON_AVG <= 1000000 
               THEN 70 
               WHEN h.PERSON_AVG > 50000 
               AND h.PERSON_AVG <= 100000 
               THEN 60 
               WHEN h.PERSON_AVG > 10000 
               AND h.PERSON_AVG <= 50000 
               THEN 50 
               ELSE 40 
            END AS PERSON_AVG_SCORE,
            h.TASK,
            CASE
               WHEN h.TASK > 10000000000 
               THEN 100 
               WHEN h.TASK > 9000000000 
               AND h.TASK > 10000000000 
               THEN 95 
               WHEN h.TASK > 8000000000 
               AND h.TASK > 9000000000 
               THEN 89 
               WHEN h.TASK > 7000000000 
               AND h.TASK > 8000000000 
               THEN 85 
               WHEN h.TASK > 6000000000 
               AND h.TASK > 7000000000 
               THEN 86 
               WHEN h.TASK > 5000000000 
               AND h.TASK > 6000000000 
               THEN 83 
               WHEN h.TASK > 4000000000 
               AND h.TASK > 5000000000 
               THEN 80 
               WHEN h.TASK > 3000000000 
               AND h.TASK > 4000000000 
               THEN 77 
               WHEN h.TASK > 2000000000 
               AND h.TASK > 3000000000 
               THEN 74 
               WHEN h.TASK > 1000000000 
               AND h.TASK > 2000000000 
               THEN 71 
               WHEN h.TASK > 100000000 
               AND h.TASK > 1000000000 
               THEN 68 
               WHEN h.TASK > 5000000 
               AND h.TASK > 100000000 
               THEN 60 
               WHEN h.TASK > 1000000 
               AND h.TASK > 5000000 
               THEN 50 
               ELSE 40 
            END AS TASK_SCORE,
            h.TASK_ACHIEVE,
            h.NOW_INVESTMENT,
            h.PRE_DAY_INVESTMENT,
            CASE
               WHEN (
                  h.NOW_INVESTMENT - h.PRE_DAY_INVESTMENT * 1.1
               ) >= 0 
               THEN 3 
               WHEN (
                  h.NOW_INVESTMENT - h.PRE_DAY_INVESTMENT * 1.1
               ) < 0 
               AND (
                  h.NOW_INVESTMENT * 1.1- h.PRE_DAY_INVESTMENT
               ) > 0 
               THEN 2 
               ELSE 1 
            END AS TREND,
            CASE
               WHEN (
                  h.NOW_INVESTMENT - h.PRE_DAY_INVESTMENT * 2
               ) >= 0 
               THEN 100 
               WHEN (
                  h.NOW_INVESTMENT - h.PRE_DAY_INVESTMENT * 1.8
               ) >= 0 
               THEN 95 
               WHEN (
                  h.NOW_INVESTMENT - h.PRE_DAY_INVESTMENT * 1.5
               ) >= 0 
               THEN 90 
               WHEN (
                  h.NOW_INVESTMENT - h.PRE_DAY_INVESTMENT * 1.3
               ) >= 0 
               THEN 80 
               WHEN (
                  h.NOW_INVESTMENT - h.PRE_DAY_INVESTMENT * 1.1
               ) >= 0 
               THEN 70 
               WHEN (
                  h.NOW_INVESTMENT - h.PRE_DAY_INVESTMENT * 1.0
               ) >= 0 
               THEN 60 
               ELSE 50 
            END AS TREND_SCORE 
         FROM
            (SELECT 
               (@rowNum6 := @rowNum6 + 1) AS RANK_ORDER,
               c.DEPARTMENT_NUM,
               c.DEPARTMENT_ID,
               c.DEPARTMENT_NAME,
               c.TOTAL_INVESTMENT,
               c.MAX_TOTAL_INVESTMENT,
               c.PERSON_NUM,
               c.TOTAL_INVESTMENT / c.PERSON_NUM AS PERSON_AVG,
               c.TASK,
               c.TASK_ACHIEVE,
               IFNULL(c.NOW_INVESTMENT, 0) AS NOW_INVESTMENT,
               IFNULL(c.PRE_DAY_INVESTMENT, 0) AS PRE_DAY_INVESTMENT 
            FROM
               (SELECT 
                  m.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_ID,
                  m.DEPARTMENT_LEVEL2_LABEL AS DEPARTMENT_NAME,
                  SUM(d.CUSTOMER_ACTION_AMOUNT) AS TOTAL_INVESTMENT,
                  (SELECT 
                     COUNT(1) 
                  FROM
                     EAI_STATISTICS.ST_FIN_MARKETER mm 
                  WHERE mm.DEPARTMENT_LEVEL2_LINK_ID = m.DEPARTMENT_LEVEL2_LINK_ID) AS PERSON_NUM,
                  (SELECT 
                     SUM(
                        IFNULL(fd.CUSTOMER_ACTION_AMOUNT, 0)
                     ) 
                  FROM
                     EAI_STATISTICS.ST_FIN_MARKETER fm 
                     JOIN EAI_STATISTICS.ST_FIN_DYNAMIC fd 
                        ON fm.LINK_ID = fd.MARKETER_LINK_ID 
                  WHERE fm.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
                     AND fm.DEPARTMENT_LEVEL2_LINK_ID = m.DEPARTMENT_LEVEL2_LINK_ID 
                     AND EXTRACT(
                        YEAR_MONTH FROM fd.CUSTOMER_ACTION_DATE
                     ) = EXTRACT(
                        YEAR_MONTH FROM DATE_SUB(NOW(), INTERVAL 2 MONTH)
                     )) * 1.1 AS TASK,
                  (SELECT 
                     SUM(
                        IFNULL(fd.CUSTOMER_ACTION_AMOUNT, 0)
                     ) 
                  FROM
                     EAI_STATISTICS.ST_FIN_MARKETER fm 
                     JOIN EAI_STATISTICS.ST_FIN_DYNAMIC fd 
                        ON fm.LINK_ID = fd.MARKETER_LINK_ID 
                  WHERE fm.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
                     AND fm.DEPARTMENT_LEVEL2_LINK_ID = m.DEPARTMENT_LEVEL2_LINK_ID 
                     AND EXTRACT(
                        YEAR_MONTH FROM fd.CUSTOMER_ACTION_DATE
                     ) = EXTRACT(
                        YEAR_MONTH FROM DATE_SUB(NOW(), INTERVAL 1 MONTH)
                     )) AS TASK_ACHIEVE,
                  (SELECT 
                     SUM(
                        IFNULL(fd2.CUSTOMER_ACTION_AMOUNT, 0)
                     ) 
                  FROM
                     EAI_STATISTICS.ST_FIN_MARKETER fm2 
                     JOIN EAI_STATISTICS.ST_FIN_DYNAMIC fd2 
                        ON fm2.LINK_ID = fd2.MARKETER_LINK_ID 
                  WHERE fm2.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
                     AND fm2.DEPARTMENT_LEVEL2_LINK_ID = m.DEPARTMENT_LEVEL2_LINK_ID 
                     AND fd2.CUSTOMER_ACTION_DATE <= DATE_SUB(NOW(), INTERVAL 149 DAY) 
                     AND fd2.CUSTOMER_ACTION_DATE >= DATE_SUB(
                        DATE_FORMAT(NOW(), '%y-%m-%d 00:00:00'),
                        INTERVAL 149 DAY
                     )) AS NOW_INVESTMENT,
                  (SELECT 
                     SUM(
                        IFNULL(fd3.CUSTOMER_ACTION_AMOUNT, 0)
                     ) 
                  FROM
                     EAI_STATISTICS.ST_FIN_MARKETER fm3 
                     JOIN EAI_STATISTICS.ST_FIN_DYNAMIC fd3 
                        ON fm3.LINK_ID = fd3.MARKETER_LINK_ID 
                  WHERE fm3.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
                     AND fm3.DEPARTMENT_LEVEL2_LINK_ID = m.DEPARTMENT_LEVEL2_LINK_ID 
                     AND fd3.CUSTOMER_ACTION_DATE <= DATE_SUB(NOW(), INTERVAL 150 DAY) 
                     AND fd3.CUSTOMER_ACTION_DATE >= DATE_SUB(
                        DATE_FORMAT(NOW(), '%y-%m-%d 00:00:00'),
                        INTERVAL 150 DAY
                     )) AS PRE_DAY_INVESTMENT,
                  (SELECT 
                     COUNT(
                        DISTINCT DEPARTMENT_LEVEL2_LINK_ID
                     ) 
                  FROM
                     EAI_STATISTICS.ST_FIN_MARKETER m 
                  WHERE m.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL) AS DEPARTMENT_NUM,
                  (SELECT 
                     MAX(ml.CUSTOMER_TOTAL_AMOUNT) 
                  FROM
                     (SELECT 
                        SUM(d.CUSTOMER_ACTION_AMOUNT) AS CUSTOMER_TOTAL_AMOUNT 
                     FROM
                        EAI_STATISTICS.ST_FIN_MARKETER m 
                        JOIN EAI_STATISTICS.ST_FIN_DYNAMIC d 
                           ON m.LINK_ID = d.MARKETER_LINK_ID 
                           AND m.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
                     GROUP BY m.DEPARTMENT_LEVEL2_LINK_ID) ml) MAX_TOTAL_INVESTMENT 
               FROM
                  EAI_STATISTICS.ST_FIN_MARKETER m 
                  JOIN EAI_STATISTICS.ST_FIN_DYNAMIC d 
                     ON m.LINK_ID = d.MARKETER_LINK_ID 
                     AND m.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
               GROUP BY m.DEPARTMENT_LEVEL2_LINK_ID 
               ORDER BY TOTAL_INVESTMENT DESC,
                  (SELECT 
                     (@rowNum6 := 0))) c) h) g) k 
   SET
      clr.DEPARTMENT_LABEL = k.DEPARTMENT_NAME,
      clr.SCORE = k.SCORE,
      clr.PERFORMANCE = k.TOTAL_INVESTMENT,
      clr.PERFORMANCE_SCORE = k.TOTAL_INVESTMENT_SCORE,
      clr.MANPOWER = k.PERSON_NUM,
      clr.MANPOWER_SCORE = k.PERSON_NUM_SCORE,
      clr.PERCAPITA = k.PERSON_AVG,
      clr.PERCAPITA_SCORE = k.PERSON_AVG_SCORE,
      clr.TASK = k.TASK,
      clr.TASK_SCORE = k.TASK_SCORE,
      clr.COMPLETION_RATE = k.COMPLETION_RATE,
      clr.TREND_CD = k.TREND,
      clr.TREND_SCORE = k.TREND_SCORE,
      clr.UPDATE_DATE = k.UPDATE_TIME 
   WHERE clr.DEPARTMENT_LID = k.DEPARTMENT_ID ;
   -- 如果有新的记录，就插入新的记录
   INSERT INTO EAI_CALCULATE.CL_COK_ACHIEVEMENTS_RADAR (
      GUID,
      DEPARTMENT_LID,
      DEPARTMENT_LABEL,
      SCORE,
      PERFORMANCE,
      PERFORMANCE_SCORE,
      MANPOWER,
      MANPOWER_SCORE,
      PERCAPITA,
      PERCAPITA_SCORE,
      TASK,
      TASK_SCORE,
      COMPLETION_RATE,
      TREND_CD,
      TREND_SCORE,
      UPDATE_DATE
   ) 
   SELECT 
      REPLACE(UPPER(UUID()), '-', '') AS GUID,
      g.DEPARTMENT_ID,
      g.DEPARTMENT_NAME,
      ROUND(
         g.TOTAL_INVESTMENT_SCORE * 0.2 + g.PERSON_NUM_SCORE * 0.2+ g.PERSON_AVG_SCORE * 0.2+ g.TASK_SCORE * 0.2+ g.TREND_SCORE * 0.2
      ) AS SCORE,
      g.TOTAL_INVESTMENT,
      g.TOTAL_INVESTMENT_SCORE,
      g.PERSON_NUM,
      g.PERSON_NUM_SCORE,
      g.PERSON_AVG,
      g.PERSON_AVG_SCORE,
      g.TASK,
      g.TASK_SCORE,
      (g.TASK_ACHIEVE / g.TASK) AS COMPLETION_RATE,
      g.TREND,
      g.TREND_SCORE,
      NOW() AS UPDATE_TIME 
   FROM
      (SELECT 
         h.RANK_ORDER,
         h.DEPARTMENT_NUM,
         h.DEPARTMENT_ID,
         h.DEPARTMENT_NAME,
         h.TOTAL_INVESTMENT,
         ROUND(
            80 * (
               (
                  h.DEPARTMENT_NUM - h.RANK_ORDER + 1
               ) / (h.DEPARTMENT_NUM + 1)
            ) + (
               20 * h.TOTAL_INVESTMENT / h.MAX_TOTAL_INVESTMENT
            )
         ) AS TOTAL_INVESTMENT_SCORE,
         h.MAX_TOTAL_INVESTMENT,
         h.PERSON_NUM,
         CASE
            WHEN h.PERSON_NUM > 20000 
            THEN 90 
            WHEN h.PERSON_NUM > 10000 
            AND h.PERSON_NUM <= 20000 
            THEN 80 
            WHEN h.PERSON_NUM > 5000 
            AND h.PERSON_NUM <= 10000 
            THEN 70 
            WHEN h.PERSON_NUM > 3000 
            AND h.PERSON_NUM <= 5000 
            THEN 60 
            WHEN h.PERSON_NUM > 500 
            AND h.PERSON_NUM <= 3000 
            THEN 50 
            ELSE 40 
         END AS PERSON_NUM_SCORE,
         h.PERSON_AVG,
         CASE
            WHEN h.PERSON_AVG > 100000000 
            THEN 100 
            WHEN h.PERSON_AVG > 50000000 
            AND h.PERSON_AVG <= 100000000 
            THEN 95 
            WHEN h.PERSON_AVG > 10000000 
            AND h.PERSON_AVG <= 500000000 
            THEN 90 
            WHEN h.PERSON_AVG > 5000000 
            AND h.PERSON_AVG <= 10000000 
            THEN 85 
            WHEN h.PERSON_AVG > 1000000 
            AND h.PERSON_AVG <= 5000000 
            THEN 80 
            WHEN h.PERSON_AVG > 100000 
            AND h.PERSON_AVG <= 1000000 
            THEN 70 
            WHEN h.PERSON_AVG > 50000 
            AND h.PERSON_AVG <= 100000 
            THEN 60 
            WHEN h.PERSON_AVG > 10000 
            AND h.PERSON_AVG <= 50000 
            THEN 50 
            ELSE 40 
         END AS PERSON_AVG_SCORE,
         h.TASK,
         CASE
            WHEN h.TASK > 10000000000 
            THEN 100 
            WHEN h.TASK > 9000000000 
            AND h.TASK > 10000000000 
            THEN 95 
            WHEN h.TASK > 8000000000 
            AND h.TASK > 9000000000 
            THEN 89 
            WHEN h.TASK > 7000000000 
            AND h.TASK > 8000000000 
            THEN 85 
            WHEN h.TASK > 6000000000 
            AND h.TASK > 7000000000 
            THEN 86 
            WHEN h.TASK > 5000000000 
            AND h.TASK > 6000000000 
            THEN 83 
            WHEN h.TASK > 4000000000 
            AND h.TASK > 5000000000 
            THEN 80 
            WHEN h.TASK > 3000000000 
            AND h.TASK > 4000000000 
            THEN 77 
            WHEN h.TASK > 2000000000 
            AND h.TASK > 3000000000 
            THEN 74 
            WHEN h.TASK > 1000000000 
            AND h.TASK > 2000000000 
            THEN 71 
            WHEN h.TASK > 100000000 
            AND h.TASK > 1000000000 
            THEN 68 
            WHEN h.TASK > 5000000 
            AND h.TASK > 100000000 
            THEN 60 
            WHEN h.TASK > 1000000 
            AND h.TASK > 5000000 
            THEN 50 
            ELSE 40 
         END AS TASK_SCORE,
         h.TASK_ACHIEVE,
         h.NOW_INVESTMENT,
         h.PRE_DAY_INVESTMENT,
         CASE
            WHEN (
               h.NOW_INVESTMENT - h.PRE_DAY_INVESTMENT * 1.1
            ) >= 0 
            THEN 3 
            WHEN (
               h.NOW_INVESTMENT - h.PRE_DAY_INVESTMENT * 1.1
            ) > 0 
            AND (
               h.NOW_INVESTMENT * 1.1- h.PRE_DAY_INVESTMENT
            ) < 0 
            THEN 2 
            ELSE 1 
         END AS TREND,
         CASE
            WHEN (
               h.NOW_INVESTMENT - h.PRE_DAY_INVESTMENT * 2
            ) >= 0 
            THEN 100 
            WHEN (
               h.NOW_INVESTMENT - h.PRE_DAY_INVESTMENT * 1.8
            ) >= 0 
            THEN 95 
            WHEN (
               h.NOW_INVESTMENT - h.PRE_DAY_INVESTMENT * 1.5
            ) >= 0 
            THEN 90 
            WHEN (
               h.NOW_INVESTMENT - h.PRE_DAY_INVESTMENT * 1.3
            ) >= 0 
            THEN 80 
            WHEN (
               h.NOW_INVESTMENT - h.PRE_DAY_INVESTMENT * 1.1
            ) >= 0 
            THEN 70 
            WHEN (
               h.NOW_INVESTMENT - h.PRE_DAY_INVESTMENT * 1.0
            ) >= 0 
            THEN 60 
            ELSE 50 
         END AS TREND_SCORE 
      FROM
         (SELECT 
            (@rowNum6 := @rowNum6 + 1) AS RANK_ORDER,
            c.DEPARTMENT_NUM,
            c.DEPARTMENT_ID,
            c.DEPARTMENT_NAME,
            c.TOTAL_INVESTMENT,
            c.MAX_TOTAL_INVESTMENT,
            c.PERSON_NUM,
            c.TOTAL_INVESTMENT / c.PERSON_NUM AS PERSON_AVG,
            c.TASK,
            c.TASK_ACHIEVE,
            IFNULL(c.NOW_INVESTMENT, 0) AS NOW_INVESTMENT,
            IFNULL(c.PRE_DAY_INVESTMENT, 0) AS PRE_DAY_INVESTMENT 
         FROM
            (SELECT 
               m.DEPARTMENT_LEVEL2_LINK_ID AS DEPARTMENT_ID,
               m.DEPARTMENT_LEVEL2_LABEL AS DEPARTMENT_NAME,
               SUM(d.CUSTOMER_ACTION_AMOUNT) AS TOTAL_INVESTMENT,
               (SELECT 
                  COUNT(1) 
               FROM
                  EAI_STATISTICS.ST_FIN_MARKETER mm 
               WHERE mm.DEPARTMENT_LEVEL2_LINK_ID = m.DEPARTMENT_LEVEL2_LINK_ID) AS PERSON_NUM,
               (SELECT 
                  SUM(
                     IFNULL(fd.CUSTOMER_ACTION_AMOUNT, 0)
                  ) 
               FROM
                  EAI_STATISTICS.ST_FIN_MARKETER fm 
                  JOIN EAI_STATISTICS.ST_FIN_DYNAMIC fd 
                     ON fm.LINK_ID = fd.MARKETER_LINK_ID 
               WHERE fm.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
                  AND fm.DEPARTMENT_LEVEL2_LINK_ID = m.DEPARTMENT_LEVEL2_LINK_ID 
                  AND EXTRACT(
                     YEAR_MONTH FROM fd.CUSTOMER_ACTION_DATE
                  ) = EXTRACT(
                     YEAR_MONTH FROM DATE_SUB(NOW(), INTERVAL 2 MONTH)
                  )) * 1.1 AS TASK,
               (SELECT 
                  SUM(
                     IFNULL(fd.CUSTOMER_ACTION_AMOUNT, 0)
                  ) 
               FROM
                  EAI_STATISTICS.ST_FIN_MARKETER fm 
                  JOIN EAI_STATISTICS.ST_FIN_DYNAMIC fd 
                     ON fm.LINK_ID = fd.MARKETER_LINK_ID 
               WHERE fm.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
                  AND fm.DEPARTMENT_LEVEL2_LINK_ID = m.DEPARTMENT_LEVEL2_LINK_ID 
                  AND EXTRACT(
                     YEAR_MONTH FROM fd.CUSTOMER_ACTION_DATE
                  ) = EXTRACT(
                     YEAR_MONTH FROM DATE_SUB(NOW(), INTERVAL 1 MONTH)
                  )) AS TASK_ACHIEVE,
               (SELECT 
                  SUM(
                     IFNULL(fd2.CUSTOMER_ACTION_AMOUNT, 0)
                  ) 
               FROM
                  EAI_STATISTICS.ST_FIN_MARKETER fm2 
                  JOIN EAI_STATISTICS.ST_FIN_DYNAMIC fd2 
                     ON fm2.LINK_ID = fd2.MARKETER_LINK_ID 
               WHERE fm2.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
                  AND fm2.DEPARTMENT_LEVEL2_LINK_ID = m.DEPARTMENT_LEVEL2_LINK_ID 
                  AND fd2.CUSTOMER_ACTION_DATE <= DATE_SUB(NOW(), INTERVAL 149 DAY) 
                  AND fd2.CUSTOMER_ACTION_DATE >= DATE_SUB(
                     DATE_FORMAT(NOW(), '%y-%m-%d 00:00:00'),
                     INTERVAL 149 DAY
                  )) AS NOW_INVESTMENT,
               (SELECT 
                  SUM(
                     IFNULL(fd3.CUSTOMER_ACTION_AMOUNT, 0)
                  ) 
               FROM
                  EAI_STATISTICS.ST_FIN_MARKETER fm3 
                  JOIN EAI_STATISTICS.ST_FIN_DYNAMIC fd3 
                     ON fm3.LINK_ID = fd3.MARKETER_LINK_ID 
               WHERE fm3.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
                  AND fm3.DEPARTMENT_LEVEL2_LINK_ID = m.DEPARTMENT_LEVEL2_LINK_ID 
                  AND fd3.CUSTOMER_ACTION_DATE <= DATE_SUB(NOW(), INTERVAL 150 DAY) 
                  AND fd3.CUSTOMER_ACTION_DATE >= DATE_SUB(
                     DATE_FORMAT(NOW(), '%y-%m-%d 00:00:00'),
                     INTERVAL 150 DAY
                  )) AS PRE_DAY_INVESTMENT,
               (SELECT 
                  COUNT(
                     DISTINCT DEPARTMENT_LEVEL2_LINK_ID
                  ) 
               FROM
                  EAI_STATISTICS.ST_FIN_MARKETER m 
               WHERE m.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL) AS DEPARTMENT_NUM,
               (SELECT 
                  MAX(ml.CUSTOMER_TOTAL_AMOUNT) 
               FROM
                  (SELECT 
                     SUM(d.CUSTOMER_ACTION_AMOUNT) AS CUSTOMER_TOTAL_AMOUNT 
                  FROM
                     EAI_STATISTICS.ST_FIN_MARKETER m 
                     JOIN EAI_STATISTICS.ST_FIN_DYNAMIC d 
                        ON m.LINK_ID = d.MARKETER_LINK_ID 
                        AND m.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
                  GROUP BY m.DEPARTMENT_LEVEL2_LINK_ID) ml) MAX_TOTAL_INVESTMENT 
            FROM
               EAI_STATISTICS.ST_FIN_MARKETER m 
               JOIN EAI_STATISTICS.ST_FIN_DYNAMIC d 
                  ON m.LINK_ID = d.MARKETER_LINK_ID 
                  AND m.DEPARTMENT_LEVEL2_LINK_ID IS NOT NULL 
            GROUP BY m.DEPARTMENT_LEVEL2_LINK_ID 
            ORDER BY TOTAL_INVESTMENT DESC,
               (SELECT 
                  (@rowNum6 := 0))) c) h) g 
   WHERE NOT EXISTS 
      (SELECT 
         OUID 
      FROM
         EAI_CALCULATE.CL_COK_ACHIEVEMENTS_RADAR str 
      WHERE str.DEPARTMENT_LID = g.DEPARTMENT_ID) ;
END$$

DELIMITER ;