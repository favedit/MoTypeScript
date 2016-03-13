-- ============================================================
DELIMITER $$
-- ============================================================
-- <T>删除存储过程。</T>
DROP PROCEDURE IF EXISTS `EAI_CALCULATE`.`PROC_SYNC_PERCAPITA_WARNING` $$
-- ============================================================
-- <T>根据规则码处理预警人均数据</T>
-- <P>注意：调用存储过程之前一定要在`EAI_CALCULATE`.`CL_COK_WARNING_RULE`表中的RULE1和RULE2中插入理财师人均业绩和人均业绩值</P>
-- @param lipeng 
-- @date 2015.12.05
-- @param code                          规则码
-- ============================================================
CREATE PROCEDURE `EAI_CALCULATE`.`PROC_SYNC_PERCAPITA_WARNING`(IN code VARCHAR(80)) 
BEGIN
    -- 变量声明
    DECLARE rule_done_           INT     DEFAULT 0; -- 游标结束标识
    DECLARE rule_id_             BIGINT  DEFAULT 0; -- 规则id
    DECLARE marketer_average_    DOUBLE  DEFAULT 0; -- 理财师平均值
    DECLARE percapita_           DOUBLE  DEFAULT 0; -- 人均平均值
    
    -- 声明一个游标, 根据code 查询规则id
    DECLARE RULE_ID_CURSOR CURSOR FOR SELECT T1.OUID,T1.RULE1,T1.RULE2  FROM `EAI_CALCULATE`.`CL_COK_WARNING_RULE` T1 WHERE T1.`CODE` = code;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET rule_done_ = 1;
    OPEN RULE_ID_CURSOR;
    LOOP_RULE:LOOP
        FETCH RULE_ID_CURSOR INTO rule_id_, marketer_average_, percapita_;
            
        IF rule_id_ = 0 THEN -- 如果规则id为0直接跳出
            LEAVE LOOP_RULE;
        END IF;

        BEGIN
            
            DECLARE marketer_done_                   INT         DEFAULT 0; -- 游标结束标识
            DECLARE level2_link_id_                  BIGINT      DEFAULT 0; -- 部门id
            DECLARE level2_label_                    VARCHAR(80);           -- 部门名称
            DECLARE level2_marketer_average_         DOUBLE      DEFAULT 0; -- 理财师平均业绩
            DECLARE sub_department_count_            INT         DEFAULT 0; -- 子公司数量
            -- 声明一个游标, 查询二级理财师业绩公司
            DECLARE MARKETER_CURSOR CURSOR FOR 
                SELECT
                    T2.LEVEL2_LINK_ID,
                    T2.LEVEL2_LABEL,
                    IFNULL(SUM(T1.MARKETER_PERFORMANCE) / T2.MARKETER_TOTAL,0)
                FROM
                    `EAI_STATISTICS`.`ST_FIN_MARKETER_PHASE` T1,
                    `EAI_STATISTICS`.`ST_FIN_DEPARTMENT` T2
                WHERE T1.DEPARTMENT_LEVEL2_LINK_ID = T2.LEVEL2_LINK_ID
                AND T1.RECORD_DAY BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()
                GROUP BY T1.DEPARTMENT_LEVEL2_LINK_ID;

            DECLARE CONTINUE HANDLER FOR NOT FOUND SET marketer_done_ = 1;
            OPEN MARKETER_CURSOR;
            LOOP_MARKETER:LOOP

                FETCH MARKETER_CURSOR INTO level2_link_id_, level2_label_, level2_marketer_average_;

                IF level2_link_id_ IS NULL THEN -- 如果部门名称为空直接跳出
                    LEAVE LOOP_MARKETER;
                END IF;

                IF level2_marketer_average_ < marketer_average_ THEN -- 如果小于规则设定值则向内容表插入记录
                    -- 三级分公司小于设定值的sql
                    SELECT
                        COUNT(DISTINCT LEVEL4_LINK_ID) INTO sub_department_count_ 

                    FROM
                       (
                            SELECT
                                T2.LEVEL4_LINK_ID,
                                T2.LEVEL4_LABEL,
                                IFNULL(SUM(T1.MARKETER_PERFORMANCE) / T2.MARKETER_TOTAL,0) LEVEL4_MARKETER_AVERAGE
                            FROM
                                `EAI_STATISTICS`.`ST_FIN_MARKETER_PHASE` T1,
                                `EAI_STATISTICS`.`ST_FIN_DEPARTMENT` T2
                            WHERE T1.DEPARTMENT_LEVEL4_LINK_ID = T2.LEVEL4_LINK_ID AND T2.LEVEL2_LINK_ID = level2_link_id_
                            AND T1.RECORD_DAY BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()
                            GROUP BY T1.DEPARTMENT_LEVEL4_LINK_ID
                        ) A
                    WHERE LEVEL4_MARKETER_AVERAGE < percapita_;

                    INSERT INTO `EAI_CALCULATE`.`CL_COK_WARNING_CONTENT` (
                        `OVLD`, 
                        `GUID`, 
                        `RULE_ID`, 
                        `TITLE`, 
                        `CONTENT`, 
                        `CALCULATE_TIME`, 
                        `PARAMETER1`
                    ) 
                    VALUES ( 
                        '1', 
                        UPPER(REPLACE(UUID(), "-", "")), 
                        rule_id_, 
                        '人均业绩不达标的分公司人数', 
                        CONCAT(level2_label_,"的理财师人均业绩低于",marketer_average_,"元,其中人均业绩低于", percapita_, "元的财富端分公司有",sub_department_count_,"家."), 
                        CURRENT_TIMESTAMP(), 
                        level2_link_id_
                    );
                    
                    BEGIN
                        DECLARE sub_marketer_done_   INT     DEFAULT 0; -- 游标结束标识
                        DECLARE sub_rule_id_         BIGINT  DEFAULT 0; -- 规则id
                        DECLARE sub_comment_id_      BIGINT  DEFAULT 0; -- 内容id
                        DECLARE sub_average_         DOUBLE  DEFAULT 0; -- 平均值
                        DECLARE sub_level4_label_    VARCHAR(80); -- 子部门名称
                        -- 三级公司游标，根据二级公司id和规则code查询
                        DECLARE SUB_MARKETER_CURSOR CURSOR FOR 
                        SELECT
                            T3.OUID,
                            T3.RULE_ID,
                            T2.LEVEL4_LABEL,
                            IFNULL(SUM(T1.MARKETER_PERFORMANCE) / T2.MARKETER_TOTAL,0) LEVEL4_MARKETER_AVERAGE
                        FROM
                            `EAI_STATISTICS`.`ST_FIN_MARKETER_PHASE` T1,
                            `EAI_STATISTICS`.`ST_FIN_DEPARTMENT` T2,
                            `EAI_CALCULATE`.`CL_COK_WARNING_CONTENT` T3,
                            `EAI_CALCULATE`.`CL_COK_WARNING_RULE` T4
                        WHERE T1.DEPARTMENT_LEVEL4_LINK_ID = T2.LEVEL4_LINK_ID AND T3.PARAMETER1 =  T2.LEVEL2_LINK_ID AND T3.RULE_ID = T4.OUID AND T4.`CODE` = code AND T2.LEVEL2_LINK_ID = level2_link_id_
                        AND T1.RECORD_DAY BETWEEN CURDATE() - INTERVAL 7 DAY AND CURDATE()
                        GROUP BY T1.DEPARTMENT_LEVEL4_LINK_ID;

                        DECLARE CONTINUE HANDLER FOR NOT FOUND SET sub_marketer_done_ = 1;
                        OPEN SUB_MARKETER_CURSOR;
                        LOOP_SUB_MARKETER:LOOP
                            FETCH SUB_MARKETER_CURSOR INTO sub_comment_id_, sub_rule_id_, sub_level4_label_, sub_average_;

                            IF sub_comment_id_ IS NULL THEN -- 如果部门名称为空直接跳出
                                LEAVE LOOP_SUB_MARKETER;
                            END IF;
                            
                            IF sub_average_ < percapita_ THEN
                                INSERT INTO `EAI_CALCULATE`.`CL_COK_WARNING_DATA` (
                                    `OVLD`, 
                                    `GUID`, 
                                    `RULE_ID`, 
                                    `CONTENT_ID`, 
                                    `PARAMETER1`, 
                                    `PARAMETER2`
                                ) 
                                VALUES (
                                    '1', 
                                    UPPER(REPLACE(UUID(), "-", "")), 
                                    sub_rule_id_, 
                                    sub_comment_id_, 
                                    sub_average_, 
                                    sub_level4_label_
                                ); 
                            END IF;

                            IF sub_marketer_done_ THEN
                                LEAVE LOOP_SUB_MARKETER;
                            END IF;
                        END LOOP LOOP_SUB_MARKETER;
                        CLOSE SUB_MARKETER_CURSOR;
                    END;

                END IF;

                IF marketer_done_ THEN
                    LEAVE LOOP_MARKETER;
                END IF;

                END LOOP LOOP_MARKETER;
            CLOSE MARKETER_CURSOR;
    
        END;

        IF rule_done_ THEN
            LEAVE LOOP_RULE;
        END IF;

    END LOOP LOOP_RULE;
    CLOSE RULE_ID_CURSOR;
END $$

DELIMITER ;
-- 调用 CALL `EAI_CALCULATE`.`PROC_SYNC_PERCAPITA_WARNING`( "eai.service.cockpit.warning.capita") ;