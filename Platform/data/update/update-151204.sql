-- 修改统计表： maocy
ALTER TABLE `EAI_STATISTICS1`.`ST_FIN_DYNAMIC` ADD COLUMN `TENDER_PRIOR_RATE` FLOAT AFTER `TENDER_PRIOR_MODEL`; 
ALTER TABLE `EAI_STATISTICS1`.`ST_FIN_DYNAMIC` ADD COLUMN `TENDER_RATE`       FLOAT AFTER `TENDER_MODEL`; 
ALTER TABLE `EAI_STATISTICS1`.`ST_FIN_DYNAMIC` ADD COLUMN `CUSTOMER_POS_DATE` DATETIME AFTER `CUSTOMER_ACTION_INTEREST`; 


ALTER TABLE `EAI_STATISTICS1`.`ST_FIN_CUSTOMER` ADD COLUMN `TENDER_LOWER_ID`      BIGINT      AFTER `PERFORMANCE_TOTAL`; 
ALTER TABLE `EAI_STATISTICS1`.`ST_FIN_CUSTOMER` ADD COLUMN `TENDER_LOWER_LINK_ID` BIGINT      AFTER `TENDER_LOWER_ID`; 
ALTER TABLE `EAI_STATISTICS1`.`ST_FIN_CUSTOMER` ADD COLUMN `TENDER_LOWER_MODEL`   VARCHAR(20) AFTER `TENDER_LOWER_LINK_ID`; 
ALTER TABLE `EAI_STATISTICS1`.`ST_FIN_CUSTOMER` ADD COLUMN `TENDER_LOWER_RATE`    FLOAT       AFTER `TENDER_LOWER_MODEL`; 
ALTER TABLE `EAI_STATISTICS1`.`ST_FIN_CUSTOMER` ADD COLUMN `TENDER_RATE`          FLOAT       AFTER `TENDER_MODEL`; 

-- 在号令里面加阅后即焚  sunhr
ALTER TABLE `EAI_DATA`.`DT_LGC_NOTICE` ADD COLUMN `DESTROY_CD` INT(11) NULL AFTER `IMPORTANT_CD`; 

-- 在业绩的雷达图增加业绩评分、人力评分、任务评分、趋势评分、人均评分 lipeng 2015-12-02
ALTER TABLE `EAI_CALCULATE`.`CL_COK_ACHIEVEMENTS_RADAR` ADD COLUMN `PERFORMANCE_SCORE` 	DOUBLE AFTER `TREND_CD` ;
ALTER TABLE `EAI_CALCULATE`.`CL_COK_ACHIEVEMENTS_RADAR` ADD COLUMN `MANPOWER_SCORE` 	DOUBLE AFTER `PERFORMANCE_SCORE` ;
ALTER TABLE `EAI_CALCULATE`.`CL_COK_ACHIEVEMENTS_RADAR` ADD COLUMN `PERCAPITA_SCORE` 	DOUBLE AFTER `MANPOWER_SCORE` ;
ALTER TABLE `EAI_CALCULATE`.`CL_COK_ACHIEVEMENTS_RADAR` ADD COLUMN `TASK_SCORE` 		DOUBLE AFTER `PERCAPITA_SCORE` ;
ALTER TABLE `EAI_CALCULATE`.`CL_COK_ACHIEVEMENTS_RADAR` ADD COLUMN `TREND_SCORE` 		DOUBLE AFTER `TASK_SCORE` ;



ALTER TABLE `EAI_DATA`.`DT_FIN_CUSTOMER_ACTION` ADD COLUMN `INVESTMENT_NUMBER`    INTEGER  AFTER `INVESTMENT_TOTAL`;
ALTER TABLE `EAI_DATA`.`DT_FIN_CUSTOMER_ACTION` ADD COLUMN `INVESTMENT_LAST_DATE` DATETIME AFTER `INVESTMENT_NUMBER`;

ALTER TABLE `EAI_DATA`.`DT_FIN_CUSTOMER_ACTION` ADD COLUMN `REDEMPTION_NUMBER`    INTEGER  AFTER `REDEMPTION_TOTAL`;
ALTER TABLE `EAI_DATA`.`DT_FIN_CUSTOMER_ACTION` ADD COLUMN `REDEMPTION_LAST_DATE` DATETIME AFTER `REDEMPTION_NUMBER`;



ALTER TABLE `EAI_DATA`.`DT_FIN_CUSTOMER_ACTION` ADD COLUMN `INVESTMENT_DAY_TOTAL` DOUBLE AFTER `INVESTMENT_TOTAL`;
ALTER TABLE `EAI_DATA`.`DT_FIN_CUSTOMER_ACTION` ADD COLUMN `REDEMPTION_DAY_TOTAL` DOUBLE AFTER `REDEMPTION_TOTAL`;


ALTER TABLE `EAI_DATA`.`DT_FIN_CUSTOMER_ACTION` ADD COLUMN `DEPARTMENT_LEVEL2_LINK_ID` BIGINT AFTER `GUID`;
ALTER TABLE `EAI_DATA`.`DT_FIN_CUSTOMER_ACTION` ADD COLUMN `DEPARTMENT_LEVEL4_LINK_ID` BIGINT AFTER `DEPARTMENT_LEVEL2_LINK_ID`;
ALTER TABLE `EAI_DATA`.`DT_FIN_CUSTOMER_ACTION` ADD COLUMN `MARKETER_ID`               BIGINT AFTER `DEPARTMENT_LEVEL4_LINK_ID`;
ALTER TABLE `EAI_DATA`.`DT_FIN_CUSTOMER_ACTION` ADD COLUMN `MARKETER_LINK_ID`          BIGINT AFTER `MARKETER_ID`;
ALTER TABLE `EAI_DATA`.`DT_FIN_CUSTOMER_ACTION` ADD COLUMN `MARKETER_LABEL`            VARCHAR(40) AFTER `MARKETER_LINK_ID`;

ALTER TABLE `EAI_DATA`.`DT_FIN_CUSTOMER_ACTION` ADD COLUMN `CUSTOMER_LABEL`            VARCHAR(40) AFTER `CUSTOMER_LINK_ID`;



ALTER TABLE `EAI_DATA`.`DT_FIN_CUSTOMER_ACTION` ADD COLUMN `DEPARTMENT_LEVEL2_LABEL` VARCHAR(80) AFTER `DEPARTMENT_LEVEL2_LINK_ID`;
ALTER TABLE `EAI_DATA`.`DT_FIN_CUSTOMER_ACTION` ADD COLUMN `DEPARTMENT_LEVEL4_LABEL` VARCHAR(80) AFTER `DEPARTMENT_LEVEL4_LINK_ID`;


