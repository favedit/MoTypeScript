-- ------------------------------------------------------------
-- Create table [Calculate.System.Mapreduce]
-- 20151202 maocy
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `CL_SYS_MAPREDUCE`;
CREATE TABLE `CL_SYS_MAPREDUCE` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `CODE`                          VARCHAR(200) NOT NULL, 
   `VALUE`                         VARCHAR(2000), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_SYS_MAPREDUCE 
   ADD CONSTRAINT CL_SYS_MRD_UK_GID UNIQUE ( GUID ); 

ALTER TABLE CL_SYS_MAPREDUCE 
   ADD CONSTRAINT CL_SYS_MRD_UK_COD UNIQUE ( CODE ); 

-- ------------------------------------------------------------
-- Create table [Calculate.Financial.Product.Period]
-- 20151104 sunhr
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `CL_FIN_PRODUCT_PERIOD`;
CREATE TABLE `CL_FIN_PRODUCT_PERIOD` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `PRODUCT_CODE`                  VARCHAR(3040), 
   `PRODUCT_ISSUE`                 INTEGER, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MYISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_FIN_PRODUCT_PERIOD 
   ADD CONSTRAINT CL_FIN_PDT_PRD_UK_GID UNIQUE ( GUID ); 
   
-- ------------------------------------------------------------
-- Create table [Calculate.Financial.Customer.Preferpv]
-- 20151105 sunhr
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `CL_FIN_CUSTOMER_PREFER_PV`;
CREATE TABLE `CL_FIN_CUSTOMER_PREFER_PV` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `MEMBER_ID`                     BIGINT, 
   `PRODUCT_CODE`                  VARCHAR(30), 
   `TIME_SECTION`                  VARCHAR(30), 
   `PV`                            INTEGER, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_FIN_CUSTOMER_PREFER_PV 
   ADD CONSTRAINT CL_FIN_CST_PRF_PV_UK_GID UNIQUE ( GUID ); 

-- ------------------------------------------------------------
-- Create table [Calculate.Financial.Customer.Product]
-- 20151105 sunhr
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `CL_FIN_CUSTOMER_PRODUCT`;
CREATE TABLE `CL_FIN_CUSTOMER_PRODUCT` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `MEMBER_ID`                     BIGINT, 
   `MEMBER_LINK_ID`                BIGINT, 
   `PERIOD_DATE`                   DATETIME, 
   `PRODUCT_CODE`                  VARCHAR(40), 
   `VIEW_COUNT`                    INTEGER, 
   `LAST_VIEW_DATE`                DATETIME, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_FIN_CUSTOMER_PRODUCT 
   ADD CONSTRAINT CL_FIN_CST_PRD_UK_GID UNIQUE ( GUID ); 

ALTER TABLE CL_FIN_CUSTOMER_PRODUCT 
   ADD CONSTRAINT CL_FIN_CST_PRD_UK_PRD UNIQUE ( MEMBER_LINK_ID, PERIOD_DATE, PRODUCT_CODE ); 

-- ------------------------------------------------------------
-- Create table [Calculate.Financial.Ranklist.Item]
-- sunhr 20151125
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `CL_FIN_RANKLIST_ITEM`;
CREATE TABLE `CL_FIN_RANKLIST_ITEM` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `CODE`                          VARCHAR(80), 
   `NAME`                          VARCHAR(80), 
   `LABEL`                         VARCHAR(80), 
   `RANK_ORDER`                    INTEGER, 
   `RANKLIST_ID`                   BIGINT, 
   `PROPERTY1`                     VARCHAR(40), 
   `PROPERTY2`                     VARCHAR(40), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_FIN_RANKLIST_ITEM 
   ADD CONSTRAINT CL_FIN_RKL_ITM_UK_GID UNIQUE ( GUID ); 

-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Investment.Self]
-- sunhr 20151125
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `CL_COK_INVESTMENT_SELF`;
CREATE TABLE `CL_COK_INVESTMENT_SELF` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `DEPARTMENT_ID`                 BIGINT, 
   `DEPARTMENT_LID`                BIGINT, 
   `DEPARTMENT_LABEL`              VARCHAR(80), 
   `MARKETER_ID`                   BIGINT, 
   `MARKETER_LID`                  BIGINT, 
   `MARKETER_LABEL`                VARCHAR(80), 
   `INVESTMENT_COUNT`              INTEGER, 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_INVESTMENT_SELF 
   ADD CONSTRAINT CL_COK_INV_SEL_UK_GID UNIQUE ( GUID ); 

   
-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Reentry]
-- sunhr 20151125
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `CL_COK_REENTRY`;
CREATE TABLE `CL_COK_REENTRY` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `EMPLOYEE_ID`                   BIGINT, 
   `EMPLOYEE_LID`                  BIGINT, 
   `EMPLOYEE_LABEL`                VARCHAR(80), 
   `LEAVE_DEPARTMENT_ID`           BIGINT, 
   `LEAVE_DEPARTMENT_LID`          BIGINT, 
   `LEAVE_DEPARTMENT_LABEL`        VARCHAR(80), 
   `LEAVE_DEPARTMENT_DATE`         DATETIME, 
   `REENTRY_DEPARTMENT_ID`         BIGINT, 
   `REENTRY_DEPARTMENT_LID`        BIGINT, 
   `REENTRY_DEPARTMENT_LABEL`      VARCHAR(80), 
   `REENTRY_DEPARTMENT_DATE`       DATETIME, 
   `NOTE`                          VARCHAR(800), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_REENTRY 
   ADD CONSTRAINT CL_COK_RET_UK_GID UNIQUE ( GUID ); 

-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Achievements.Problem]
-- sunhr 20151125
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `CL_COK_ACHIEVEMENTS_PROBLEM`;
CREATE TABLE `CL_COK_ACHIEVEMENTS_PROBLEM` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `DEPARTMENT_ID`                 BIGINT, 
   `DEPARTMENT_LID`                BIGINT, 
   `DEPARTMENT_LABEL`              VARCHAR(80), 
   `MARKETER_TOTAL`                INTEGER, 
   `NO_ACHIEVEMENTS_MARKETER`      INTEGER, 
   `NUMBER_OF_PEOPLE_RATE`         DOUBLE, 
   `NO_ACHIEVEMENTS_YEAR`          INTEGER, 
   `NOTE`                          VARCHAR(800), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_ACHIEVEMENTS_PROBLEM 
   ADD CONSTRAINT CL_COK_ACH_PRO_UK_GID UNIQUE ( GUID ); 
   
-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Achievements.Radar]
-- sunhr 20151125
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `CL_COK_ACHIEVEMENTS_RADAR`;
CREATE TABLE `CL_COK_ACHIEVEMENTS_RADAR` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `DEPARTMENT_ID`                 BIGINT, 
   `DEPARTMENT_LID`                BIGINT, 
   `DEPARTMENT_LABEL`              VARCHAR(80), 
   `SCORE`                         DOUBLE, 
   `PERFORMANCE`                   DOUBLE, 
   `MANPOWER`                      INTEGER, 
   `PERCAPITA`                     DOUBLE, 
   `TASK`                          DOUBLE, 
   `COMPLETION_RATE`               DOUBLE, 
   `TREND_CD`                      INTEGER, 
   `ADVICE`                        VARCHAR(400), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_ACHIEVEMENTS_RADAR 
   ADD CONSTRAINT CL_COK_ACH_RAD_UK_GID UNIQUE ( GUID ); 

-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Customer.Unique]
-- AnjoyTian 20151125
-- ------------------------------------------------------------ 
DROP TABLE IF EXISTS `CL_COK_CUSTOMER_UNIQUE`;
CREATE TABLE `CL_COK_CUSTOMER_UNIQUE` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `CODE`                          VARCHAR(80), 
   `NAME`                          VARCHAR(80), 
   `LABEL`                         VARCHAR(80), 
   `DEPARTMENT_ID`                 BIGINT, 
   `DEPARTMENT_LID`                BIGINT, 
   `DEPARTMENT_LABEL`              VARCHAR(80), 
   `AVERAGE_TIME_ON_JOB`           DOUBLE, 
   `MARKETER_COUNT`                INTEGER, 
   `MARKETER_RATE`                 DOUBLE, 
   `CUSTOMER_INVESTMENT_TOTAL`     DOUBLE, 
   `AVERAGE_ACHIEVEMENT`           DOUBLE, 
   `NOTE`                          VARCHAR(800), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_CUSTOMER_UNIQUE 
   ADD CONSTRAINT CL_COK_CUS_UK_GID UNIQUE ( GUID ); 
   
-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Department.Crad]
-- AnjoyTian 20151125
-- ------------------------------------------------------------ 
DROP TABLE IF EXISTS `CL_COK_DEPARTMENT_CRAD`;
CREATE TABLE `CL_COK_DEPARTMENT_CRAD` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `DEPARTMENT_ID`                 BIGINT, 
   `DEPARTMENT_LID`                BIGINT, 
   `DEPARTMENT_LABEL`              VARCHAR(80), 
   `SUPERVISOR`                    VARCHAR(20), 
   `DEPARTMENT_COUNT`              INTEGER, 
   `MARKETER_COUNT`                INTEGER, 
   `INVESTMENT_DAY`                DOUBLE, 
   `REDEMPTION_DAY`                DOUBLE, 
   `NETINVESTMENT_DAY`             DOUBLE, 
   `REDEMPTION_RATE`               DOUBLE, 
   `PROPERTY`                      VARCHAR(40), 
   `NOTE`                          VARCHAR(800), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_DEPARTMENT_CRAD 
   ADD CONSTRAINT CL_COK_DEP_CRD_UK_GID UNIQUE ( GUID ); 
   
   
-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Dashbord]
-- sunhr 20151202
-- ------------------------------------------------------------ 
DROP TABLE IF EXISTS `CL_COK_DASHBOARD`; 
CREATE TABLE `CL_COK_DASHBOARD` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `CODE`                          VARCHAR(80) NOT NULL, 
   `NAME`                          VARCHAR(80), 
   `LABEL`                         VARCHAR(80), 
   `RATE`                          DOUBLE, 
   `PARAMETER1`                    VARCHAR(40), 
   `PARAMETER2`                    VARCHAR(40), 
   `NOTE`                          VARCHAR(800), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_DASHBOARD 
   ADD CONSTRAINT CL_COK_DAS_UK_GID UNIQUE ( GUID ); 

ALTER TABLE CL_COK_DASHBOARD 
   ADD CONSTRAINT CL_COK_DAS_UK_COD UNIQUE ( CODE ); 

-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Dashbord.Item]
-- sunhr 20151202
-- ------------------------------------------------------------ 
DROP TABLE IF EXISTS `CL_COK_DASHBOARD_ITEM`; 
CREATE TABLE `CL_COK_DASHBOARD_ITEM` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `DASHBOARD_ID`                  BIGINT, 
   `DATE_SEGMENT`                  VARCHAR(20), 
   `RATE`                          DOUBLE, 
   `PARAMETER1`                    VARCHAR(40), 
   `PARAMETER2`                    VARCHAR(40), 
   `PARAMETER3`                    VARCHAR(40), 
   `PARAMETER4`                    VARCHAR(40), 
   `PARAMETER5`                    VARCHAR(40), 
   `NOTE`                          VARCHAR(800), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_DASHBOARD_ITEM 
   ADD CONSTRAINT CL_COK_DAS_ITM_UK_GID UNIQUE ( GUID ); 

   
-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Warning.Rule]
-- sunhr 20151203
-- ------------------------------------------------------------ 
DROP TABLE IF EXISTS `CL_COK_WARNING_RULE`; 
CREATE TABLE `CL_COK_WARNING_RULE` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `CODE`                          VARCHAR(80), 
   `NAME`                          VARCHAR(80), 
   `LABEL`                         VARCHAR(80), 
   `RULE1`                         VARCHAR(40), 
   `RULE2`                         VARCHAR(40), 
   `RULE3`                         VARCHAR(40), 
   `NOTE`                          VARCHAR(800), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_WARNING_RULE 
   ADD CONSTRAINT CL_COK_WAR_RUL_UK_GID UNIQUE ( GUID ); 
ALTER TABLE CL_COK_WARNING_RULE 
   ADD CONSTRAINT CL_COK_WAR_RUL_UK_COD UNIQUE ( CODE ); 
   
-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Warning.Content]
-- sunhr 20151203
-- ------------------------------------------------------------ 
DROP TABLE IF EXISTS `CL_COK_WARNING_CONTENT`; 
CREATE TABLE `CL_COK_WARNING_CONTENT` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `RULE_ID`                       BIGINT, 
   `TITLE`                         VARCHAR(200), 
   `CONTENT`                       TEXT, 
   `CALCULATE_TIME`                DATETIME, 
   `PARAMETER1`                    VARCHAR(40), 
   `PARAMETER2`                    VARCHAR(40), 
   `NOTE`                          VARCHAR(800), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_WARNING_CONTENT 
   ADD CONSTRAINT CL_COK_WAR_CON_UK_GID UNIQUE ( GUID ); 
   
-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Warning.Data]
-- sunhr 20151203
-- ------------------------------------------------------------ 
DROP TABLE IF EXISTS `CL_COK_WARNING_DATA`;   
CREATE TABLE `CL_COK_WARNING_DATA` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `RULE_ID`                       BIGINT, 
   `CONTENT_ID`                    BIGINT, 
   `PARAMETER1`                    VARCHAR(40), 
   `PARAMETER2`                    VARCHAR(40), 
   `PARAMETER3`                    VARCHAR(40), 
   `PARAMETER4`                    VARCHAR(40), 
   `NOTE`                          VARCHAR(800), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_WARNING_DATA 
   ADD CONSTRAINT CL_COK_WAR_DAT_UK_GID UNIQUE ( GUID ); 
   
-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Redemption.Department.Level2]
-- AnjoyTian 20151203
-- ------------------------------------------------------------ 
DROP TABLE IF EXISTS `CL_COK_REDEMPTION_DEPARTMENT_LEVEL2`;   
CREATE TABLE `CL_COK_REDEMPTION_DEPARTMENT_LEVEL2` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `DEPARTMENT_LEVEL2_LID`         BIGINT, 
   `DEPARTMENT_LEVEL2_LABEL`       VARCHAR(80), 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `INVESTMENT_PEOPLE`             INTEGER, 
   `INVESTMENT_PER_AVG_MONEY`      DOUBLE, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `REDEMPTION_PEOPLE`             INTEGER, 
   `REDEMPTION_PER_AVG_MONEY`      DOUBLE, 
   `MARKETER_REDEMPTION_TOTAL`     DOUBLE, 
   `MARKETER_REDEMPTION_PEOPLE`    INTEGER, 
   `MARKETER_REDEMPTION_PER_AVG_MONEY` DOUBLE, 
   `PARAMETER1`                    VARCHAR(40), 
   `PARAMETER2`                    VARCHAR(40), 
   `PARAMETER3`                    VARCHAR(40), 
   `RECORD_TIME`                   DATETIME, 
   `NOTE`                          VARCHAR(800), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_REDEMPTION_DEPARTMENT_LEVEL2 
   ADD CONSTRAINT CL_COK_RED_DE_LEV_UK_GID UNIQUE ( GUID ); 
   
-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Redemption.phase]
-- AnjoyTian 20151203
-- ------------------------------------------------------------ 
DROP TABLE IF EXISTS `CL_COK_REDEMPTION_PHASE`;   
CREATE TABLE `CL_COK_REDEMPTION_PHASE` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `MONEY_PHASE`                   VARCHAR(40), 
   `REDEMPTION_PEOPLE`             INTEGER, 
   `REDEMPTION_COUNT`              INTEGER, 
   `REDEMPTION_PER_AVG_COUNT`      INTEGER, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `REDEMPTION_PER_AVG_MONEY`      DOUBLE, 
   `PARAMETER1`                    VARCHAR(40), 
   `PARAMETER2`                    VARCHAR(40), 
   `PARAMETER3`                    VARCHAR(40), 
   `RECORD_TIME`                   DATETIME, 
   `NOTE`                          VARCHAR(800), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_REDEMPTION_PHASE 
   ADD CONSTRAINT CL_COK_RED_PH_UK_GID UNIQUE ( GUID ); 
   
-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Redemption.Marketer]
-- AnjoyTian 20151203
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `CL_COK_REDEMPTION_MARKETER`; 
CREATE TABLE `CL_COK_REDEMPTION_MARKETER` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `DEPARTMENT_LEVEL2_LID`         BIGINT, 
   `DEPARTMENT_LEVEL2_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL4_LID`         BIGINT, 
   `DEPARTMENT_LEVEL4_LABEL`       VARCHAR(80), 
   `MARKETER_LABEL`                VARCHAR(20), 
   `MARKETER_LEVEL`                VARCHAR(40), 
   `CURRENT_DAY_REDEMPTION`        DOUBLE, 
   `PAST_INVESTMENT_TOTAL`         DOUBLE, 
   `PAST_REDEMPTION_TOTAL`         DOUBLE, 
   `PAST_NET_INVESTMENT_TOTAL`     DOUBLE, 
   `ENTRY_DATE`                    DATETIME, 
   `PARAMETER1`                    VARCHAR(40), 
   `PARAMETER2`                    VARCHAR(40), 
   `PARAMETER3`                    VARCHAR(40), 
   `RECORD_TIME`                   DATETIME, 
   `NOTE`                          VARCHAR(800), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_REDEMPTION_MARKETER 
   ADD CONSTRAINT CL_COK_RED_MA_UK_GID UNIQUE ( GUID ); 

-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Redemption.Area]
-- LiP 20151203
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `CL_COK_REDEMPTION_AREA`; 
CREATE TABLE `CL_COK_REDEMPTION_AREA` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `AREA_CODE`                     VARCHAR(80) NOT NULL, 
   `AREA_LABEL`                    VARCHAR(80), 
   `RECORD_DATE`                   DATETIME, 
   `REDEMPTION`                    DOUBLE, 
   `STATISTICAL_TIME`              DATETIME, 
   `PARAMETER1`                    VARCHAR(40), 
   `PARAMETER2`                    VARCHAR(40), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_REDEMPTION_AREA 
   ADD CONSTRAINT CL_COK_RDP_AREA_UK_GID UNIQUE ( GUID ); 

   
-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Redemption.City]
-- LiP 20151203
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `CL_COK_REDEMPTION_CITY`;
CREATE TABLE `CL_COK_REDEMPTION_CITY` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `PROVINCE_CODE`                 VARCHAR(80) NOT NULL, 
   `PROVINCE_LABEL`                VARCHAR(80), 
   `CITY_CODE`                     VARCHAR(80), 
   `CITY_LABEL`                    VARCHAR(80), 
   `RECORD_DATE`                   DATETIME, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `REDEMPTION_USER_COUNT`         INTEGER, 
   `PERCAPITA_REDEMPTION`          DOUBLE, 
   `STATISTICAL_TIME`              DATETIME, 
   `PARAMETER1`                    VARCHAR(40), 
   `PARAMETER2`                    VARCHAR(40), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_REDEMPTION_CITY 
   ADD CONSTRAINT CL_COK_RDP_CT_UK_GID UNIQUE ( GUID ); 

   
-- ------------------------------------------------------------
-- Create table [Calculate.Cockpit.Redemption.City.Hour]
-- LiP 20151203
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `CL_COK_REDEMPTION_CITY_HOUR`;    
CREATE TABLE `CL_COK_REDEMPTION_CITY_HOUR` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `PROVINCE_CODE`                 VARCHAR(80) NOT NULL, 
   `PROVINCE_LABEL`                VARCHAR(80), 
   `CITY_CODE`                     VARCHAR(80), 
   `CITY_LABEL`                    VARCHAR(80), 
   `RECORD_DATE`                   DATETIME, 
   `CITY_REDEMPTION_TOTAL`         DOUBLE, 
   `CITY_REDEMPTION_USER_COUNT`    INTEGER, 
   `CITY_REDEMPTION_USER_AVG`      DOUBLE, 
   `CITY_REDEMPTION_RATE`          FLOAT, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `STATISTICAL_TIME`              DATETIME, 
   `PARAMETER1`                    VARCHAR(40), 
   `PARAMETER2`                    VARCHAR(40), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE CL_COK_REDEMPTION_CITY_HOUR 
   ADD CONSTRAINT CL_COK_RDP_CT_HR_UK_GID UNIQUE ( GUID ); 

