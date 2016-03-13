DELIMITER $$

USE `EAI_CALCULATE` $$

-- ============================================================
-- <T>删除存储过程。</T>
DROP PROCEDURE IF EXISTS `EAI_CALCULATE`.`Proc_Sync_Warning_Content` $$

-- ============================================================
-- <T>分析阈值预警赎回预警数据</T>
-- @param code_ 规则表的code
-- ============================================================
CREATE  PROCEDURE `EAI_CALCULATE`.`Proc_Sync_Warning_Content` () 
label1 :BEGIN
  -- ------------------------------------------------------------
  -- 声明变量。
  -- id
  DECLARE id_ BIGINT (20) ;
  -- 比例
  DECLARE percent_ DOUBLE ;
  -- 规则1,赎回率下限
  DECLARE rule1_ VARCHAR (20) ;
  -- 规则2
  DECLARE rule2_ VARCHAR (20) ;
  -- 规则3
  DECLARE rule3_ VARCHAR (20) ;
  -- guid
  DECLARE guid_ VARCHAR (40) ;
  -- 规则id  
  DECLARE rule_id_ BIGINT (20) ;
  -- content编号
  DECLARE content_id_ BIGINT (20) ;
  -- 投资总额
  DECLARE investment_total_ DOUBLE ;
  -- 赎回总额
  DECLARE redemption_total_ DOUBLE ;
  -- 公司名称
  DECLARE department_label_ VARCHAR (80) ;
  -- 当前日期
  DECLARE current_date_ DATETIME DEFAULT NOW() ;
  -- 循环标志
  DECLARE excep_curlog_rm_ BOOLEAN DEFAULT FALSE ;
  -- 标题
  DECLARE title_ VARCHAR (80) DEFAULT '近7日投资-赎回曲线' ;
  -- 查询日期终点  
  DECLARE end_date_ DATE DEFAULT DATE_SUB(NOW(), INTERVAL 1 DAY) ;
  -- 查询日期起点
  DECLARE start_date_ DATE DEFAULT DATE_SUB(end_date_, INTERVAL 7 DAY) ;
  -- 规则code
  DECLARE rule_code_ VARCHAR (64) DEFAULT 'eai.service.cockpit.warning.redemption' ;
  -- .............................................................
  DECLARE cur_st_fin_dept_phase_ CURSOR FOR 
     SELECT 
        `DEPARTMENT_LEVEL2_LABEL`,
        SUM(`DEPARTMENT_INVESTMENT`),
        SUM(`DEPARTMENT_REDEMPTION`),
        TRUNCATE(
        SUM(`DEPARTMENT_REDEMPTION`) / SUM(`DEPARTMENT_INVESTMENT`) * 100,
        0
           ) 
     FROM `EAI_STATISTICS`.`ST_FIN_DEPARTMENT_PHASE`   
     WHERE `RECORD_DAY` BETWEEN start_date_ AND end_date_ 
     GROUP BY `DEPARTMENT_LEVEL2_LABEL` ;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET excep_curlog_rm_ = TRUE ;
     -- ------------------------------------------------------------
     -- 查询规则
     SELECT 
        OUID,
        RULE1,
        RULE2,
        RULE3 INTO 
        rule_id_,
        rule1_,
        rule2_,
        rule3_ 
     FROM EAI_CALCULATE.CL_COK_WARNING_RULE 
     WHERE CODE = rule_code_ ;
  -- 逻辑处理
  OPEN cur_st_fin_dept_phase_ ;
  label_loop1 :
  LOOP
    -- 获取数据
    FETCH cur_st_fin_dept_phase_ INTO
       department_label_,
       investment_total_,
       redemption_total_,
       percent_ ;
    -- 退出循环
    IF excep_curlog_rm_ THEN
       LEAVE label_loop1 ;
    END IF ;
    -- 判断规则
    IF percent_ > rule1_ THEN
       SET guid_ = UPPER(REPLACE(UUID(), '-', '')) ;
    -- 插入数据
    INSERT INTO `EAI_CALCULATE`.`CL_COK_WARNING_CONTENT` (
       `GUID`,
       `RULE_ID`,
       `TITLE`,
       `CONTENT`,
       `CALCULATE_TIME`
    ) VALUES(
        guid_,
        rule_id_,
        CONCAT(department_label_, title_),
        CONCAT(
          department_label_,
          '近期天赎回率超过',
          rule1_,
          '%,其中投资',
          investment_total_,
          ',赎回',
          redemption_total_
        ),
        current_date_
      ) ;
    -- 获取内容id
    SELECT 
      `OUID` INTO content_id_ 
    FROM
      `EAI_CALCULATE`.`CL_COK_WARNING_CONTENT` 
    WHERE `GUID` = guid_ ;
    -- .............................................................
    -- ------------------------------------------------------------
    label2 :BEGIN
      -- ------------------------------------------------------------
      -- 声明变量。
      -- 日期
      DECLARE record_date_ DATE ;
      -- 循环标志
      DECLARE excep_curlog_ BOOLEAN DEFAULT FALSE ;
      -- .............................................................
      DECLARE cur_st_fin_dept_phase_day CURSOR FOR 
         SELECT 
            RECORD_DAY,
            SUM(`DEPARTMENT_INVESTMENT`),
            SUM(DEPARTMENT_REDEMPTION) 
         FROM `EAI_STATISTICS`.`ST_FIN_DEPARTMENT_PHASE` 
         WHERE `RECORD_DAY` BETWEEN start_date_ AND end_date_ 
         AND `DEPARTMENT_LEVEL2_LABEL` = department_label_ 
         GROUP BY RECORD_DAY ;
      DECLARE CONTINUE HANDLER FOR NOT FOUND SET excep_curlog_ = TRUE ;
      -- ------------------------------------------------------------
      -- 逻辑处理
      OPEN cur_st_fin_dept_phase_day ;
      label_loop2 :
      LOOP
        FETCH cur_st_fin_dept_phase_day INTO
           record_date_,
           investment_total_,
           redemption_total_ ;
        IF excep_curlog_ THEN 
           LEAVE label_loop2 ;
        END IF ;
        SET guid_ = UPPER(REPLACE(UUID(), '-', '')) ;
        -- 插入数据
        INSERT INTO `EAI_CALCULATE`.`CL_COK_WARNING_DATA` (
          `GUID`,
          `RULE_ID`,
          `CONTENT_ID`,
          `PARAMETER1`,
          `PARAMETER2`,
          `PARAMETER3`
        )VALUES(
            guid_,
            rule_id_,
            content_id_,
            record_date_,
            investment_total_,
            redemption_total_
          ) ;
      END LOOP label_loop2 ;
      CLOSE cur_st_fin_dept_phase_day ;
    END label2 ;
    -- ------------------------------------------------------------
    END IF ;
  END LOOP label_loop1 ;
  CLOSE cur_st_fin_dept_phase_ ;
END label1 $$
DELIMITER ;
CALL `EAI_CALCULATE`.Proc_Sync_Warning_Content () ;

