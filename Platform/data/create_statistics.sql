﻿-- ------------------------------------------------------------
-- Create table [Statistics.Controller]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_CONTROLLER`;
CREATE TABLE `ST_CONTROLLER` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `CODE`                          VARCHAR(40), 
   `IS_VALID`                      TINYINT, 
   `LINK_ID`                       BIGINT, 
   `LINK_DATE`                     DATETIME, 
   `PROCESS_CLASS`                 VARCHAR(200), 
   `PROCESS_PARAMETERS`            VARCHAR(400), 
   `PROCESS_COUNT`                 INTEGER, 
   `PROCESS_UNIT_TOTAL`            INTEGER, 
   `PROCESS_UNIT_COUNT`            INTEGER, 
   `PROCESS_RESULT`                VARCHAR(200), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_CONTROLLER 
   ADD CONSTRAINT ST_CTL_UK_GID UNIQUE ( GUID ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Member]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_MEMBER`;
CREATE TABLE `ST_FIN_MEMBER` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `LINK_ID`                       BIGINT NOT NULL, 
   `LINK_DATE`                     DATETIME, 
   `LINK_CD`                       INTEGER, 
   `DATA_ID`                       BIGINT, 
   `DEPARTMENT_ID`                 BIGINT, 
   `DEPARTMENT_LINK_ID`            BIGINT, 
   `MARKETER_ID`                   BIGINT, 
   `MARKETER_LINK_ID`              BIGINT, 
   `CUSTOMER_ID`                   BIGINT, 
   `CUSTOMER_LINK_ID`              BIGINT, 
   `CUSTOMER_LEVEL_CD`             INTEGER, 
   `PASSPORT`                      VARCHAR(60), 
   `LABEL`                         VARCHAR(60), 
   `CARD`                          VARCHAR(20), 
   `CARD_AREA`                     VARCHAR(6), 
   `CARD_BIRTH`                    VARCHAR(8), 
   `CARD_GENDER`                   INTEGER, 
   `PHONE`                         VARCHAR(20), 
   `PHONE_CITY_ID`                 BIGINT, 
   `PHONE_CITY_CODE`               VARCHAR(40), 
   `EMAIL`                         VARCHAR(80), 
   `GENDER_CD`                     INTEGER, 
   `GENDER_CODE`                   VARCHAR(20), 
   `MARRY_CD`                      INTEGER, 
   `MARRY_CODE`                    VARCHAR(20), 
   `EDUCATION_CD`                  INTEGER, 
   `EDUCATION_CODE`                VARCHAR(60), 
   `BUSINESS_CD`                   INTEGER, 
   `BUSINESS_CODE`                 VARCHAR(80), 
   `INCOME_CD`                     INTEGER, 
   `INCOME_CODE`                   VARCHAR(20), 
   `PROVINCE_AREA_ID`              BIGINT, 
   `PROVINCE_ID`                   BIGINT, 
   `PROVINCE_CODE`                 INTEGER, 
   `CITY_ID`                       BIGINT, 
   `CITY_CODE`                     INTEGER, 
   `AREA_ID`                       BIGINT, 
   `AREA_CODE`                     INTEGER, 
   `ADDRESS`                       VARCHAR(200), 
   `INFO`                          VARCHAR(800), 
   `REGISTER_DATE`                 DATETIME, 
   `INVESTMENT_DATE`               DATETIME, 
   `REDEMPTION_DATE`               DATETIME, 
   `LAST_LOGIN_DATE`               DATETIME, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_MEMBER 
   ADD CONSTRAINT ST_FIN_MEM_UK_GID UNIQUE ( GUID ); 

ALTER TABLE ST_FIN_MEMBER 
   ADD CONSTRAINT ST_FIN_MEM_UK_LINK_ID UNIQUE ( LINK_ID ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Dynamic]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_DYNAMIC`;
CREATE TABLE `ST_FIN_DYNAMIC` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `LINK_ID`                       BIGINT, 
   `LINK_DATE`                     DATETIME, 
   `LINK_INVEST_ID`                BIGINT, 
   `LINK_BORROW_ID`                BIGINT, 
   `DEPARTMENT_ID`                 BIGINT, 
   `DEPARTMENT_LINK_ID`            BIGINT, 
   `DEPARTMENT_LABEL`              VARCHAR(40), 
   `DEPARTMENT_LEVEL1_ID`          BIGINT, 
   `DEPARTMENT_LEVEL1_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL1_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL2_ID`          BIGINT, 
   `DEPARTMENT_LEVEL2_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL2_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL3_ID`          BIGINT, 
   `DEPARTMENT_LEVEL3_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL3_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL4_ID`          BIGINT, 
   `DEPARTMENT_LEVEL4_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL4_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL5_ID`          BIGINT, 
   `DEPARTMENT_LEVEL5_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL5_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL6_ID`          BIGINT, 
   `DEPARTMENT_LEVEL6_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL6_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL7_ID`          BIGINT, 
   `DEPARTMENT_LEVEL7_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL7_LABEL`       VARCHAR(80), 
   `MARKETER_ID`                   BIGINT, 
   `MARKETER_LINK_ID`              BIGINT, 
   `MARKETER_LABEL`                VARCHAR(40), 
   `MARKETER_STATUS_CD`            INTEGER, 
   `MARKETER_RANK_LABEL`           VARCHAR(40), 
   `CUSTOMER_ID`                   BIGINT, 
   `CUSTOMER_LINK_ID`              BIGINT, 
   `CUSTOMER_LABEL`                VARCHAR(40), 
   `CUSTOMER_CARD`                 VARCHAR(20), 
   `CUSTOMER_AREA`                 VARCHAR(6), 
   `CUSTOMER_BIRTH`                VARCHAR(8), 
   `CUSTOMER_GENDER`               INTEGER, 
   `CUSTOMER_PHONE`                VARCHAR(20), 
   `CUSTOMER_ACTION_CD`            INTEGER, 
   `CUSTOMER_ACTION_DATE`          DATETIME, 
   `CUSTOMER_ACTION_AMOUNT`        DOUBLE, 
   `CUSTOMER_ACTION_INTEREST`      DOUBLE, 
   `CUSTOMER_POS_DATE`             DATETIME, 
   `TENDER_CHANGED`                TINYINT, 
   `TENDER_PRIOR_ID`               BIGINT, 
   `TENDER_PRIOR_LINK_ID`          BIGINT, 
   `TENDER_PRIOR_MODEL`            VARCHAR(20), 
   `TENDER_PRIOR_RATE`             FLOAT, 
   `TENDER_ID`                     BIGINT, 
   `TENDER_LINK_ID`                BIGINT, 
   `TENDER_MODEL`                  VARCHAR(20), 
   `TENDER_RATE`                   FLOAT, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_DYNAMIC 
   ADD CONSTRAINT ST_FIN_DYN_UK_GID UNIQUE ( GUID ); 

ALTER TABLE ST_FIN_DYNAMIC
   ADD INDEX ST_FIN_DYN_DX_DEP(DEPARTMENT_ID);

ALTER TABLE ST_FIN_DYNAMIC
   ADD INDEX ST_FIN_DYN_DX_DEP_LINK(DEPARTMENT_LINK_ID);

ALTER TABLE ST_FIN_DYNAMIC
   ADD INDEX ST_FIN_DYN_DX_MKT(MARKETER_ID);

ALTER TABLE ST_FIN_DYNAMIC
   ADD INDEX ST_FIN_DYN_DX_MKT_LID(MARKETER_LINK_ID);

ALTER TABLE ST_FIN_DYNAMIC
   ADD INDEX ST_FIN_DYN_DX_CST(CUSTOMER_ID);

ALTER TABLE ST_FIN_DYNAMIC
   ADD INDEX ST_FIN_DYN_DX_CST_LID(CUSTOMER_LINK_ID);

ALTER TABLE ST_FIN_DYNAMIC
   ADD INDEX ST_FIN_DYN_DX_ACT_CD(CUSTOMER_ACTION_CD);

ALTER TABLE ST_FIN_DYNAMIC
   ADD INDEX ST_FIN_DYN_DX_ACT_DAT(CUSTOMER_ACTION_DATE);

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Amount]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_AMOUNT`;
CREATE TABLE `ST_FIN_AMOUNT` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `LINK_ID`                       BIGINT, 
   `LINK_DATE`                     DATETIME, 
   `DEPARTMENT_TOTAL`              INTEGER, 
   `MARKETER_TOTAL`                INTEGER, 
   `CUSTOMER_TOTAL`                INTEGER, 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `INVESTMENT_NUMBER_TOTAL`       INTEGER, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `REDEMPTION_NUMBER_TOTAL`       INTEGER, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_AMOUNT 
   ADD CONSTRAINT ST_FIN_AMT_UK_GID UNIQUE ( GUID ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Phase]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_PHASE`;
CREATE TABLE `ST_FIN_PHASE` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40), 
   `RECORD_YEAR`                   DATETIME NOT NULL, 
   `RECORD_MONTH`                  DATETIME NOT NULL, 
   `RECORD_WEEK`                   DATETIME NOT NULL, 
   `RECORD_DAY`                    DATETIME NOT NULL, 
   `RECORD_HOUR`                   DATETIME NOT NULL, 
   `RECORD_DATE`                   DATETIME NOT NULL, 
   `LINK_ID`                       BIGINT, 
   `LINK_DATE`                     DATETIME, 
   `ACTION_DATE`                   DATETIME, 
   `DEPARTMENT_COUNT`              INTEGER, 
   `DEPARTMENT_TOTAL`              INTEGER, 
   `MARKETER_COUNT`                INTEGER, 
   `MARKETER_TOTAL`                INTEGER, 
   `CUSTOMER_COUNT`                INTEGER, 
   `CUSTOMER_TOTAL`                INTEGER, 
   `MEMBER_COUNT`                  INTEGER, 
   `MEMBER_TOTAL`                  INTEGER, 
   `INVESTMENT`                    DOUBLE, 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `INVESTMENT_NUMBER`             INTEGER, 
   `INVESTMENT_NUMBER_TOTAL`       INTEGER, 
   `INVESTMENT_USER`               INTEGER, 
   `INVESTMENT_USER_TOTAL`         INTEGER, 
   `REDEMPTION`                    DOUBLE, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `REDEMPTION_NUMBER`             INTEGER, 
   `REDEMPTION_NUMBER_TOTAL`       INTEGER, 
   `REDEMPTION_USER`               INTEGER, 
   `REDEMPTION_USER_TOTAL`         INTEGER, 
   `NETINVESTMENT`                 DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `INTEREST`                      DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `PERFORMANCE`                   DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_PHASE 
   ADD CONSTRAINT ST_FIN_PHS_UK_DAT UNIQUE ( RECORD_DATE ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Product]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_PRODUCT`;
CREATE TABLE `ST_FIN_PRODUCT` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `CODE`                          VARCHAR(40) NOT NULL, 
   `RATE`                          FLOAT, 
   `INVESTMENT_BEGIN_DATE`         DATETIME, 
   `INVESTMENT_END_DATE`           DATETIME, 
   `INVESTMENT_COUNT`              INTEGER, 
   `INVESTMENT_USER_COUNT`         INTEGER, 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION_BEGIN_DATE`         DATETIME, 
   `REDEMPTION_END_DATE`           DATETIME, 
   `REDEMPTION_COUNT`              INTEGER, 
   `REDEMPTION_USER_COUNT`         INTEGER, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_PRODUCT 
   ADD CONSTRAINT ST_FIN_PDT_UK_GID UNIQUE ( GUID ); 

ALTER TABLE ST_FIN_PRODUCT 
   ADD CONSTRAINT ST_FIN_PDT_UK_CODE UNIQUE ( CODE ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Product.Customer]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_PRODUCT_CUSTOMER`;
CREATE TABLE `ST_FIN_PRODUCT_CUSTOMER` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `PRODUCT_ID`                    BIGINT, 
   `CODE`                          VARCHAR(40), 
   `CUSTOMER_ID`                   BIGINT, 
   `CUSTOMER_LINK_ID`              BIGINT, 
   `INVESTMENT_COUNT`              INTEGER, 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION_COUNT`              INTEGER, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_PRODUCT_CUSTOMER 
   ADD CONSTRAINT ST_FIN_PDT_CST_UK_GID UNIQUE ( GUID ); 

ALTER TABLE ST_FIN_PRODUCT_CUSTOMER 
   ADD CONSTRAINT ST_FIN_PDT_CST_UK_CST UNIQUE ( PRODUCT_ID, CUSTOMER_ID ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Product.Phase]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_PRODUCT_PHASE`;
CREATE TABLE `ST_FIN_PRODUCT_PHASE` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40), 
   `RECORD_YEAR`                   DATETIME NOT NULL, 
   `RECORD_MONTH`                  DATETIME NOT NULL, 
   `RECORD_WEEK`                   DATETIME NOT NULL, 
   `RECORD_DAY`                    DATETIME NOT NULL, 
   `RECORD_HOUR`                   DATETIME NOT NULL, 
   `RECORD_DATE`                   DATETIME NOT NULL, 
   `PRODUCT_ID`                    BIGINT, 
   `CODE`                          VARCHAR(40), 
   `CUSTOMER_COUNT`                INTEGER, 
   `CUSTOMER_TOTAL`                INTEGER, 
   `INVESTMENT_USER_COUNT`         INTEGER, 
   `INVESTMENT_COUNT`              INTEGER, 
   `INVESTMENT`                    DOUBLE, 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION_USER_COUNT`         INTEGER, 
   `REDEMPTION_COUNT`              INTEGER, 
   `REDEMPTION`                    DOUBLE, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `INTEREST`                      DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `NETINVESTMENT`                 DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `PERFORMANCE`                   DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_PRODUCT_PHASE 
   ADD CONSTRAINT ST_FIN_PDT_PHS_UK_DAT UNIQUE ( RECORD_DATE, PRODUCT_ID ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Tender]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_TENDER`;
CREATE TABLE `ST_FIN_TENDER` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `LINK_ID`                       BIGINT NOT NULL, 
   `LINK_DATE`                     DATETIME, 
   `GROUP_NUMBER`                  INTEGER, 
   `LABEL`                         VARCHAR(800), 
   `BEGIN_DATE`                    DATETIME, 
   `END_DATE`                      DATETIME, 
   `PRODUCT_RATE`                  FLOAT, 
   `BORROW_STATUS`                 INTEGER, 
   `BORROW_MODEL`                  VARCHAR(20), 
   `BORROW_DURATION`               INTEGER, 
   `BORROW_MONEY`                  DOUBLE, 
   `BORROW_INEREST`                DOUBLE, 
   `BORROW_INEREST_RATE`           FLOAT, 
   `BORROW_INFO`                   VARCHAR(2000), 
   `RECOMMEND_CD`                  INTEGER, 
   `PROJECT_INFO`                  TEXT, 
   `COMPANY_INFO`                  TEXT, 
   `SAFEGUARD_INFO`                TEXT, 
   `MORTGAGE_INFO`                 TEXT, 
   `INVESTMENT_BEGIN_DATE`         DATETIME, 
   `INVESTMENT_END_DATE`           DATETIME, 
   `INVESTMENT_COUNT`              INTEGER, 
   `INVESTMENT_USER_COUNT`         INTEGER, 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION_BEGIN_DATE`         DATETIME, 
   `REDEMPTION_END_DATE`           DATETIME, 
   `REDEMPTION_COUNT`              INTEGER, 
   `REDEMPTION_USER_COUNT`         INTEGER, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_TENDER 
   ADD CONSTRAINT ST_FIN_TDR_UK_GID UNIQUE ( GUID ); 

ALTER TABLE ST_FIN_TENDER 
   ADD CONSTRAINT ST_FIN_TDR_UK_LINK_ID UNIQUE ( LINK_ID ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Tender.Customer]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_TENDER_CUSTOMER`;
CREATE TABLE `ST_FIN_TENDER_CUSTOMER` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `TENDER_ID`                     BIGINT, 
   `TENDER_LINK_ID`                BIGINT, 
   `CUSTOMER_ID`                   BIGINT, 
   `CUSTOMER_LINK_ID`              BIGINT, 
   `INVESTMENT_COUNT`              INTEGER, 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION_COUNT`              INTEGER, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_TENDER_CUSTOMER 
   ADD CONSTRAINT ST_FIN_TND_CST_UK_GID UNIQUE ( GUID ); 

ALTER TABLE ST_FIN_TENDER_CUSTOMER 
   ADD CONSTRAINT ST_FIN_TND_CST_UK_CST UNIQUE ( TENDER_ID, CUSTOMER_ID ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Tender.Phase]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_TENDER_PHASE`;
CREATE TABLE `ST_FIN_TENDER_PHASE` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40), 
   `RECORD_YEAR`                   DATETIME NOT NULL, 
   `RECORD_MONTH`                  DATETIME NOT NULL, 
   `RECORD_WEEK`                   DATETIME NOT NULL, 
   `RECORD_DAY`                    DATETIME NOT NULL, 
   `RECORD_HOUR`                   DATETIME NOT NULL, 
   `RECORD_DATE`                   DATETIME NOT NULL, 
   `TENDER_ID`                     BIGINT, 
   `TENDER_LINK_ID`                BIGINT, 
   `TENDER_LABEL`                  VARCHAR(40), 
   `TENDER_MODEL`                  VARCHAR(40), 
   `CUSTOMER_COUNT`                INTEGER, 
   `CUSTOMER_TOTAL`                INTEGER, 
   `INVESTMENT_USER_COUNT`         INTEGER, 
   `INVESTMENT_COUNT`              INTEGER, 
   `INVESTMENT`                    DOUBLE, 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION_USER_COUNT`         INTEGER, 
   `REDEMPTION_COUNT`              INTEGER, 
   `REDEMPTION`                    DOUBLE, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `INTEREST`                      DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `NETINVESTMENT`                 DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `PERFORMANCE`                   DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_TENDER_PHASE 
   ADD CONSTRAINT ST_FIN_TND_PHS_UK_DAT UNIQUE ( RECORD_DATE, TENDER_ID ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Department]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_DEPARTMENT`;
CREATE TABLE `ST_FIN_DEPARTMENT` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `LINK_PARENT_ID`                BIGINT, 
   `LINK_ID`                       BIGINT NOT NULL, 
   `LINK_DATE`                     DATETIME, 
   `LINK_CD`                       INTEGER, 
   `DATA_ID`                       BIGINT, 
   `PARENT_ID`                     BIGINT, 
   `CODE`                          VARCHAR(40), 
   `LABEL`                         VARCHAR(40), 
   `LEVEL`                         INTEGER, 
   `LEVEL1_ID`                     BIGINT, 
   `LEVEL1_LINK_ID`                BIGINT, 
   `LEVEL1_LABEL`                  VARCHAR(80), 
   `LEVEL2_ID`                     BIGINT, 
   `LEVEL2_LINK_ID`                BIGINT, 
   `LEVEL2_LABEL`                  VARCHAR(80), 
   `LEVEL3_ID`                     BIGINT, 
   `LEVEL3_LINK_ID`                BIGINT, 
   `LEVEL3_LABEL`                  VARCHAR(80), 
   `LEVEL4_ID`                     BIGINT, 
   `LEVEL4_LINK_ID`                BIGINT, 
   `LEVEL4_LABEL`                  VARCHAR(80), 
   `LEVEL5_ID`                     BIGINT, 
   `LEVEL5_LINK_ID`                BIGINT, 
   `LEVEL5_LABEL`                  VARCHAR(80), 
   `LEVEL6_ID`                     BIGINT, 
   `LEVEL6_LINK_ID`                BIGINT, 
   `LEVEL6_LABEL`                  VARCHAR(80), 
   `LEVEL7_ID`                     BIGINT, 
   `LEVEL7_LINK_ID`                BIGINT, 
   `LEVEL7_LABEL`                  VARCHAR(80), 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `MARKETER_TOTAL`                INTEGER, 
   `CUSTOMER_TOTAL`                INTEGER, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_DEPARTMENT 
   ADD CONSTRAINT ST_FIN_DEP_UK_GID UNIQUE ( GUID ); 

ALTER TABLE ST_FIN_DEPARTMENT 
   ADD CONSTRAINT ST_FIN_DEP_UK_LINK_ID UNIQUE ( LINK_ID ); 

ALTER TABLE ST_FIN_DEPARTMENT
   ADD INDEX ST_FIN_DEP_DX_L1D(LEVEL1_ID);

ALTER TABLE ST_FIN_DEPARTMENT
   ADD INDEX ST_FIN_DEP_DX_L2D(LEVEL2_ID);

ALTER TABLE ST_FIN_DEPARTMENT
   ADD INDEX ST_FIN_DEP_DX_L3D(LEVEL3_ID);

ALTER TABLE ST_FIN_DEPARTMENT
   ADD INDEX ST_FIN_DEP_DX_L4D(LEVEL4_ID);

ALTER TABLE ST_FIN_DEPARTMENT
   ADD INDEX ST_FIN_DEP_DX_L5D(LEVEL5_ID);

ALTER TABLE ST_FIN_DEPARTMENT
   ADD INDEX ST_FIN_DEP_DX_L6D(LEVEL6_ID);

ALTER TABLE ST_FIN_DEPARTMENT
   ADD INDEX ST_FIN_DEP_DX_L7D(LEVEL7_ID);

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Department.Amount]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_DEPARTMENT_AMOUNT`;
CREATE TABLE `ST_FIN_DEPARTMENT_AMOUNT` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `DEPARTMENT_ID`                 BIGINT NOT NULL, 
   `DEPARTMENT_LABEL`              VARCHAR(40), 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `MARKETER_TOTAL`                INTEGER, 
   `CUSTOMER_TOTAL`                INTEGER, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_DEPARTMENT_AMOUNT 
   ADD CONSTRAINT ST_FIN_DEP_AMOUNT_UK_GID UNIQUE ( GUID ); 

ALTER TABLE ST_FIN_DEPARTMENT_AMOUNT 
   ADD CONSTRAINT ST_FIN_DEP_AMOUNT_UK_DEPARTMENT_ID UNIQUE ( DEPARTMENT_ID ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Department.Customer]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_DEPARTMENT_CUSTOMER`;
CREATE TABLE `ST_FIN_DEPARTMENT_CUSTOMER` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `DEPARTMENT_ID`                 BIGINT, 
   `MARKETER_ID`                   BIGINT, 
   `CUSTOMER_ID`                   BIGINT, 
   `LINK_DATE`                     DATETIME, 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_DEPARTMENT_CUSTOMER 
   ADD CONSTRAINT ST_FIN_DEP_CST_UK_GID UNIQUE ( GUID ); 

ALTER TABLE ST_FIN_DEPARTMENT_CUSTOMER 
   ADD CONSTRAINT ST_FIN_DEP_CST_UK_CST UNIQUE ( DEPARTMENT_ID, CUSTOMER_ID ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Department.Marketer]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_DEPARTMENT_MARKETER`;
CREATE TABLE `ST_FIN_DEPARTMENT_MARKETER` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `DEPARTMENT_ID`                 BIGINT NOT NULL, 
   `DEPARTMENT_LEVEL`              INTEGER, 
   `MARKETER_ID`                   BIGINT NOT NULL, 
   `LINK_DATE`                     DATETIME, 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_DEPARTMENT_MARKETER 
   ADD CONSTRAINT ST_FIN_DEP_MKT_UK_GID UNIQUE ( GUID ); 

ALTER TABLE ST_FIN_DEPARTMENT_MARKETER 
   ADD CONSTRAINT ST_FIN_DEP_MKT_UK_MKT UNIQUE ( DEPARTMENT_ID, MARKETER_ID ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Department.Phase]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_DEPARTMENT_PHASE`;
CREATE TABLE `ST_FIN_DEPARTMENT_PHASE` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40), 
   `RECORD_YEAR`                   DATETIME NOT NULL, 
   `RECORD_MONTH`                  DATETIME NOT NULL, 
   `RECORD_WEEK`                   DATETIME NOT NULL, 
   `RECORD_DAY`                    DATETIME NOT NULL, 
   `RECORD_HOUR`                   DATETIME NOT NULL, 
   `RECORD_DATE`                   DATETIME NOT NULL, 
   `LINK_ID`                       BIGINT, 
   `LINK_DATE`                     DATETIME, 
   `DEPARTMENT_ID`                 BIGINT, 
   `DEPARTMENT_LINK_ID`            BIGINT, 
   `DEPARTMENT_LABEL`              VARCHAR(40), 
   `DEPARTMENT_LEVEL1_ID`          BIGINT, 
   `DEPARTMENT_LEVEL1_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL1_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL2_ID`          BIGINT, 
   `DEPARTMENT_LEVEL2_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL2_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL3_ID`          BIGINT, 
   `DEPARTMENT_LEVEL3_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL3_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL4_ID`          BIGINT, 
   `DEPARTMENT_LEVEL4_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL4_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL5_ID`          BIGINT, 
   `DEPARTMENT_LEVEL5_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL5_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL6_ID`          BIGINT, 
   `DEPARTMENT_LEVEL6_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL6_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL7_ID`          BIGINT, 
   `DEPARTMENT_LEVEL7_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL7_LABEL`       VARCHAR(80), 
   `DEPARTMENT_INVESTMENT`         DOUBLE, 
   `DEPARTMENT_INVESTMENT_TOTAL`   DOUBLE, 
   `DEPARTMENT_REDEMPTION`         DOUBLE, 
   `DEPARTMENT_REDEMPTION_TOTAL`   DOUBLE, 
   `DEPARTMENT_NETINVESTMENT`      DOUBLE, 
   `DEPARTMENT_NETINVESTMENT_TOTAL` DOUBLE, 
   `DEPARTMENT_INTEREST`           DOUBLE, 
   `DEPARTMENT_INTEREST_TOTAL`     DOUBLE, 
   `DEPARTMENT_PERFORMANCE`        DOUBLE, 
   `DEPARTMENT_PERFORMANCE_TOTAL`  DOUBLE, 
   `MARKETER_COUNT`                INTEGER, 
   `MARKETER_TOTAL`                BIGINT, 
   `CUSTOMER_ACTION_DATE`          DATETIME, 
   `CUSTOMER_COUNT`                INTEGER, 
   `CUSTOMER_TOTAL`                INTEGER, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_DEPARTMENT_PHASE 
   ADD CONSTRAINT ST_FIN_DEP_PHS_UK_DAT UNIQUE ( RECORD_DATE, DEPARTMENT_ID ); 

ALTER TABLE ST_FIN_DEPARTMENT_PHASE
   ADD INDEX ST_FIN_DEP_PHS_DX_L1D(DEPARTMENT_LEVEL1_ID);

ALTER TABLE ST_FIN_DEPARTMENT_PHASE
   ADD INDEX ST_FIN_DEP_PHS_DX_L2D(DEPARTMENT_LEVEL2_ID);

ALTER TABLE ST_FIN_DEPARTMENT_PHASE
   ADD INDEX ST_FIN_DEP_PHS_DX_L3D(DEPARTMENT_LEVEL3_ID);

ALTER TABLE ST_FIN_DEPARTMENT_PHASE
   ADD INDEX ST_FIN_DEP_PHS_DX_L4D(DEPARTMENT_LEVEL4_ID);

ALTER TABLE ST_FIN_DEPARTMENT_PHASE
   ADD INDEX ST_FIN_DEP_PHS_DX_L5D(DEPARTMENT_LEVEL5_ID);

ALTER TABLE ST_FIN_DEPARTMENT_PHASE
   ADD INDEX ST_FIN_DEP_PHS_DX_L6D(DEPARTMENT_LEVEL6_ID);

ALTER TABLE ST_FIN_DEPARTMENT_PHASE
   ADD INDEX ST_FIN_DEP_PHS_DX_L7D(DEPARTMENT_LEVEL7_ID);

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Marketer]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_MARKETER`;
CREATE TABLE `ST_FIN_MARKETER` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `LINK_ID`                       BIGINT NOT NULL, 
   `LINK_DATE`                     DATETIME, 
   `LINK_CD`                       INTEGER, 
   `DATA_ID`                       BIGINT, 
   `DEPARTMENT_ID`                 BIGINT, 
   `DEPARTMENT_LINK_ID`            BIGINT, 
   `DEPARTMENT_LABEL`              VARCHAR(80), 
   `DEPARTMENT_LEVEL1_ID`          BIGINT, 
   `DEPARTMENT_LEVEL1_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL1_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL2_ID`          BIGINT, 
   `DEPARTMENT_LEVEL2_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL2_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL3_ID`          BIGINT, 
   `DEPARTMENT_LEVEL3_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL3_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL4_ID`          BIGINT, 
   `DEPARTMENT_LEVEL4_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL4_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL5_ID`          BIGINT, 
   `DEPARTMENT_LEVEL5_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL5_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL6_ID`          BIGINT, 
   `DEPARTMENT_LEVEL6_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL6_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL7_ID`          BIGINT, 
   `DEPARTMENT_LEVEL7_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL7_LABEL`       VARCHAR(80), 
   `CODE`                          VARCHAR(40), 
   `LABEL`                         VARCHAR(40), 
   `STATUS_CD`                     INTEGER, 
   `CARD`                          VARCHAR(20), 
   `CARD_AREA`                     VARCHAR(6), 
   `CARD_BIRTH`                    VARCHAR(8), 
   `CARD_GENDER`                   INTEGER, 
   `PHONE`                         VARCHAR(20), 
   `PHONE_CITY_ID`                 BIGINT, 
   `PHONE_CITY_CODE`               VARCHAR(40), 
   `RANK_LABEL`                    VARCHAR(80), 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `REGISTER_DATE`                 DATETIME, 
   `ENTER_DATE`                    DATETIME, 
   `LEAVE_DATE`                    DATETIME, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_MARKETER 
   ADD CONSTRAINT ST_FIN_MKT_UK_GID UNIQUE ( GUID ); 

ALTER TABLE ST_FIN_MARKETER 
   ADD CONSTRAINT ST_FIN_MKT_UK_LINK_ID UNIQUE ( LINK_ID ); 

ALTER TABLE ST_FIN_MARKETER
   ADD INDEX ST_FIN_MKT_DX_L1D(DEPARTMENT_LEVEL1_ID);

ALTER TABLE ST_FIN_MARKETER
   ADD INDEX ST_FIN_MKT_DX_L2D(DEPARTMENT_LEVEL2_ID);

ALTER TABLE ST_FIN_MARKETER
   ADD INDEX ST_FIN_MKT_DX_L3D(DEPARTMENT_LEVEL3_ID);

ALTER TABLE ST_FIN_MARKETER
   ADD INDEX ST_FIN_MKT_DX_L4D(DEPARTMENT_LEVEL4_ID);

ALTER TABLE ST_FIN_MARKETER
   ADD INDEX ST_FIN_MKT_DX_L5D(DEPARTMENT_LEVEL5_ID);

ALTER TABLE ST_FIN_MARKETER
   ADD INDEX ST_FIN_MKT_DX_L6D(DEPARTMENT_LEVEL6_ID);

ALTER TABLE ST_FIN_MARKETER
   ADD INDEX ST_FIN_MKT_DX_L7D(DEPARTMENT_LEVEL7_ID);

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Marketer.Amount]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_MARKETER_AMOUNT`;
CREATE TABLE `ST_FIN_MARKETER_AMOUNT` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `DEPARTMENT_ID`                 INTEGER, 
   `DEPARTMENT_LABEL`              VARCHAR(40), 
   `MARKETER_ID`                   BIGINT NOT NULL, 
   `MARKETER_LABEL`                VARCHAR(40), 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `CUSTOMER_TOTAL`                INTEGER, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_MARKETER_AMOUNT 
   ADD CONSTRAINT ST_FIN_MKT_AMT_UK_GID UNIQUE ( GUID ); 

ALTER TABLE ST_FIN_MARKETER_AMOUNT 
   ADD CONSTRAINT ST_FIN_MKT_AMT_UK_MARKETER_ID UNIQUE ( MARKETER_ID ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Marketer.Customer]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_MARKETER_CUSTOMER`;
CREATE TABLE `ST_FIN_MARKETER_CUSTOMER` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `MARKETER_ID`                   BIGINT, 
   `CUSTOMER_ID`                   BIGINT, 
   `LINK_DATE`                     DATETIME, 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_MARKETER_CUSTOMER 
   ADD CONSTRAINT ST_FIN_MKT_CST_UK_GID UNIQUE ( GUID ); 

ALTER TABLE ST_FIN_MARKETER_CUSTOMER 
   ADD CONSTRAINT ST_FIN_MKT_CST_UK_CUS UNIQUE ( MARKETER_ID, CUSTOMER_ID ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Marketer.Phase]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_MARKETER_PHASE`;
CREATE TABLE `ST_FIN_MARKETER_PHASE` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40), 
   `RECORD_YEAR`                   DATETIME NOT NULL, 
   `RECORD_MONTH`                  DATETIME NOT NULL, 
   `RECORD_WEEK`                   DATETIME NOT NULL, 
   `RECORD_DAY`                    DATETIME NOT NULL, 
   `RECORD_HOUR`                   DATETIME NOT NULL, 
   `RECORD_DATE`                   DATETIME NOT NULL, 
   `LINK_ID`                       BIGINT, 
   `LINK_DATE`                     DATETIME, 
   `DEPARTMENT_ID`                 BIGINT, 
   `DEPARTMENT_LINK_ID`            BIGINT, 
   `DEPARTMENT_LABEL`              VARCHAR(40), 
   `DEPARTMENT_LEVEL1_ID`          BIGINT, 
   `DEPARTMENT_LEVEL1_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL1_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL2_ID`          BIGINT, 
   `DEPARTMENT_LEVEL2_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL2_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL3_ID`          BIGINT, 
   `DEPARTMENT_LEVEL3_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL3_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL4_ID`          BIGINT, 
   `DEPARTMENT_LEVEL4_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL4_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL5_ID`          BIGINT, 
   `DEPARTMENT_LEVEL5_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL5_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL6_ID`          BIGINT, 
   `DEPARTMENT_LEVEL6_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL6_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL7_ID`          BIGINT, 
   `DEPARTMENT_LEVEL7_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL7_LABEL`       VARCHAR(80), 
   `MARKETER_ID`                   BIGINT, 
   `MARKETER_LINK_ID`              BIGINT, 
   `MARKETER_LABEL`                VARCHAR(40), 
   `MARKETER_INVESTMENT`           DOUBLE, 
   `MARKETER_INVESTMENT_TOTAL`     DOUBLE, 
   `MARKETER_REDEMPTION`           DOUBLE, 
   `MARKETER_REDEMPTION_TOTAL`     DOUBLE, 
   `MARKETER_NETINVESTMENT`        DOUBLE, 
   `MARKETER_NETINVESTMENT_TOTAL`  DOUBLE, 
   `MARKETER_INTEREST`             DOUBLE, 
   `MARKETER_INTEREST_TOTAL`       DOUBLE, 
   `MARKETER_PERFORMANCE`          DOUBLE, 
   `MARKETER_PERFORMANCE_TOTAL`    DOUBLE, 
   `CUSTOMER_ACTION_DATE`          DATETIME, 
   `CUSTOMER_COUNT`                INTEGER, 
   `CUSTOMER_TOTAL`                INTEGER, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_MARKETER_PHASE 
   ADD CONSTRAINT ST_FIN_MKT_PHS_UK_DAT UNIQUE ( RECORD_DATE, MARKETER_ID ); 

ALTER TABLE ST_FIN_MARKETER_PHASE
   ADD INDEX ST_FIN_MKT_PHS_DX_L1D(DEPARTMENT_LEVEL1_ID);

ALTER TABLE ST_FIN_MARKETER_PHASE
   ADD INDEX ST_FIN_MKT_PHS_DX_L2D(DEPARTMENT_LEVEL2_ID);

ALTER TABLE ST_FIN_MARKETER_PHASE
   ADD INDEX ST_FIN_MKT_PHS_DX_L3D(DEPARTMENT_LEVEL3_ID);

ALTER TABLE ST_FIN_MARKETER_PHASE
   ADD INDEX ST_FIN_MKT_PHS_DX_L4D(DEPARTMENT_LEVEL4_ID);

ALTER TABLE ST_FIN_MARKETER_PHASE
   ADD INDEX ST_FIN_MKT_PHS_DX_L5D(DEPARTMENT_LEVEL5_ID);

ALTER TABLE ST_FIN_MARKETER_PHASE
   ADD INDEX ST_FIN_MKT_PHS_DX_L6D(DEPARTMENT_LEVEL6_ID);

ALTER TABLE ST_FIN_MARKETER_PHASE
   ADD INDEX ST_FIN_MKT_PHS_DX_L7D(DEPARTMENT_LEVEL7_ID);

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Customer]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_CUSTOMER`;
CREATE TABLE `ST_FIN_CUSTOMER` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `LINK_ID`                       BIGINT NOT NULL, 
   `LINK_DATE`                     DATETIME, 
   `LINK_CD`                       INTEGER, 
   `DATA_ID`                       BIGINT, 
   `DEPARTMENT_ID`                 BIGINT, 
   `DEPARTMENT_LINK_ID`            BIGINT, 
   `DEPARTMENT_LABEL`              VARCHAR(40), 
   `DEPARTMENT_LEVEL1_ID`          BIGINT, 
   `DEPARTMENT_LEVEL1_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL1_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL2_ID`          BIGINT, 
   `DEPARTMENT_LEVEL2_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL2_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL3_ID`          BIGINT, 
   `DEPARTMENT_LEVEL3_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL3_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL4_ID`          BIGINT, 
   `DEPARTMENT_LEVEL4_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL4_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL5_ID`          BIGINT, 
   `DEPARTMENT_LEVEL5_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL5_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL6_ID`          BIGINT, 
   `DEPARTMENT_LEVEL6_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL6_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL7_ID`          BIGINT, 
   `DEPARTMENT_LEVEL7_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL7_LABEL`       VARCHAR(80), 
   `MARKETER_ID`                   BIGINT, 
   `MARKETER_LINK_ID`              BIGINT, 
   `MARKETER_LABEL`                VARCHAR(40), 
   `MARKETER_STATUS_CD`            INTEGER, 
   `LABEL`                         VARCHAR(40), 
   `CARD`                          VARCHAR(20), 
   `CARD_AREA`                     VARCHAR(6), 
   `CARD_BIRTH`                    VARCHAR(8), 
   `CARD_GENDER`                   INTEGER, 
   `PHONE`                         VARCHAR(20), 
   `PHONE_CITY_ID`                 BIGINT, 
   `PHONE_CITY_CODE`               VARCHAR(40), 
   `REGISTER_DATE`                 DATETIME, 
   `INVESTMENT_FIRST_DATE`         DATETIME, 
   `INVESTMENT_LAST_DATE`          DATETIME, 
   `INVESTMENT_NUMBER`             INTEGER, 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `INVESTMENT_LEVEL_CD`           INTEGER, 
   `REDEMPTION_FIRST_DATE`         DATETIME, 
   `REDEMPTION_LAST_DATE`          DATETIME, 
   `REDEMPTION_NUMBER`             INTEGER, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `REDEMPTION_LEVEL_CD`           INTEGER, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `NETINVESTMENT_LEVEL_CD`        INTEGER, 
   `INTEREST_TOTAL`                DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `TENDER_LOWER_ID`               BIGINT, 
   `TENDER_LOWER_LINK_ID`          BIGINT, 
   `TENDER_LOWER_MODEL`            VARCHAR(20), 
   `TENDER_LOWER_RATE`             FLOAT, 
   `TENDER_ID`                     BIGINT, 
   `TENDER_LINK_ID`                BIGINT, 
   `TENDER_MODEL`                  VARCHAR(20), 
   `TENDER_RATE`                   FLOAT, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_CUSTOMER 
   ADD CONSTRAINT ST_FIN_CUS_UK_GID UNIQUE ( GUID ); 

ALTER TABLE ST_FIN_CUSTOMER 
   ADD CONSTRAINT ST_FIN_CUS_UK_LINK_ID UNIQUE ( LINK_ID ); 

ALTER TABLE ST_FIN_CUSTOMER
   ADD INDEX ST_FIN_CUS_DX_L1D(DEPARTMENT_LEVEL1_ID);

ALTER TABLE ST_FIN_CUSTOMER
   ADD INDEX ST_FIN_CUS_DX_L2D(DEPARTMENT_LEVEL2_ID);

ALTER TABLE ST_FIN_CUSTOMER
   ADD INDEX ST_FIN_CUS_DX_L3D(DEPARTMENT_LEVEL3_ID);

ALTER TABLE ST_FIN_CUSTOMER
   ADD INDEX ST_FIN_CUS_DX_L4D(DEPARTMENT_LEVEL4_ID);

ALTER TABLE ST_FIN_CUSTOMER
   ADD INDEX ST_FIN_CUS_DX_L5D(DEPARTMENT_LEVEL5_ID);

ALTER TABLE ST_FIN_CUSTOMER
   ADD INDEX ST_FIN_CUS_DX_L6D(DEPARTMENT_LEVEL6_ID);

ALTER TABLE ST_FIN_CUSTOMER
   ADD INDEX ST_FIN_CUS_DX_L7D(DEPARTMENT_LEVEL7_ID);

ALTER TABLE ST_FIN_CUSTOMER
   ADD INDEX ST_FIN_CUS_DX_INS_LVL(INVESTMENT_LEVEL_CD);

ALTER TABLE ST_FIN_CUSTOMER
   ADD INDEX ST_FIN_CUS_DX_REP_LVL(REDEMPTION_LEVEL_CD);

ALTER TABLE ST_FIN_CUSTOMER
   ADD INDEX ST_FIN_CUS_DX_NIS_LVL(NETINVESTMENT_LEVEL_CD);

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Customer.Amount]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_CUSTOMER_AMOUNT`;
CREATE TABLE `ST_FIN_CUSTOMER_AMOUNT` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `CUSTOMER_ID`                   BIGINT NOT NULL, 
   `CUSTOMER_LABEL`                VARCHAR(40), 
   `CUSTOMER_CARD`                 VARCHAR(20), 
   `CUSTOMER_AREA`                 VARCHAR(6), 
   `CUSTOMER_BIRTH`                VARCHAR(8), 
   `CUSTOMER_GENDER`               INTEGER, 
   `CUSTOMER_PHONE`                VARCHAR(20), 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `TENDER_ID`                     BIGINT, 
   `TENDER_MODEL`                  VARCHAR(20), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_CUSTOMER_AMOUNT 
   ADD CONSTRAINT ST_FIN_CST_AMT_UK_GID UNIQUE ( GUID ); 

ALTER TABLE ST_FIN_CUSTOMER_AMOUNT 
   ADD CONSTRAINT ST_FIN_CST_AMT_UK_CUSTOMER_ID UNIQUE ( CUSTOMER_ID ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Customer.Phase]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_CUSTOMER_PHASE`;
CREATE TABLE `ST_FIN_CUSTOMER_PHASE` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40), 
   `RECORD_YEAR`                   DATETIME NOT NULL, 
   `RECORD_MONTH`                  DATETIME NOT NULL, 
   `RECORD_WEEK`                   DATETIME NOT NULL, 
   `RECORD_DAY`                    DATETIME NOT NULL, 
   `RECORD_HOUR`                   DATETIME NOT NULL, 
   `RECORD_DATE`                   DATETIME NOT NULL, 
   `DEPARTMENT_ID`                 BIGINT, 
   `DEPARTMENT_LINK_ID`            BIGINT, 
   `DEPARTMENT_LABEL`              VARCHAR(40), 
   `DEPARTMENT_LEVEL1_ID`          BIGINT, 
   `DEPARTMENT_LEVEL1_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL1_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL2_ID`          BIGINT, 
   `DEPARTMENT_LEVEL2_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL2_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL3_ID`          BIGINT, 
   `DEPARTMENT_LEVEL3_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL3_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL4_ID`          BIGINT, 
   `DEPARTMENT_LEVEL4_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL4_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL5_ID`          BIGINT, 
   `DEPARTMENT_LEVEL5_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL5_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL6_ID`          BIGINT, 
   `DEPARTMENT_LEVEL6_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL6_LABEL`       VARCHAR(80), 
   `DEPARTMENT_LEVEL7_ID`          BIGINT, 
   `DEPARTMENT_LEVEL7_LINK_ID`     BIGINT, 
   `DEPARTMENT_LEVEL7_LABEL`       VARCHAR(80), 
   `MARKETER_ID`                   BIGINT, 
   `MARKETER_LINK_ID`              BIGINT, 
   `MARKETER_LABEL`                VARCHAR(40), 
   `CUSTOMER_ID`                   BIGINT, 
   `CUSTOMER_LINK_ID`              BIGINT, 
   `CUSTOMER_LABEL`                VARCHAR(40), 
   `CUSTOMER_CARD`                 VARCHAR(20), 
   `CUSTOMER_AREA`                 VARCHAR(6), 
   `CUSTOMER_BIRTH`                VARCHAR(8), 
   `CUSTOMER_GENDER`               INTEGER, 
   `CUSTOMER_PHONE`                VARCHAR(20), 
   `CUSTOMER_ACTION_DATE`          DATETIME, 
   `INVESTMENT`                    DOUBLE, 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION`                    DOUBLE, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `NETINVESTMENT`                 DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `INTEREST`                      DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `PERFORMANCE`                   DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `TENDER_CHANGED`                INTEGER, 
   `TENDER_PRIOR_ID`               BIGINT, 
   `TENDER_PRIOR_MODEL`            VARCHAR(20), 
   `TENDER_ID`                     BIGINT, 
   `TENDER_MODEL`                  VARCHAR(20), 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_CUSTOMER_PHASE 
   ADD CONSTRAINT ST_FIN_CST_PHS_UK_DAT UNIQUE ( RECORD_DATE, DEPARTMENT_ID, MARKETER_ID, CUSTOMER_ID ); 

-- ------------------------------------------------------------
-- Create table [Statistics.Financial.Forecast]
-- ------------------------------------------------------------
DROP TABLE IF EXISTS `ST_FIN_FORECAST`;
CREATE TABLE `ST_FIN_FORECAST` 
( 
   `OUID`                          BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
   `OVLD`                          TINYINT NOT NULL DEFAULT TRUE, 
   `GUID`                          VARCHAR(40) NOT NULL, 
   `ACTION_DATE`                   DATETIME, 
   `INVESTMENT`                    DOUBLE, 
   `INVESTMENT_TOTAL`              DOUBLE, 
   `REDEMPTION`                    DOUBLE, 
   `REDEMPTION_TOTAL`              DOUBLE, 
   `NETINVESTMENT`                 DOUBLE, 
   `NETINVESTMENT_TOTAL`           DOUBLE, 
   `INTEREST`                      DOUBLE, 
   `INTEREST_TOTAL`                DOUBLE, 
   `PERFORMANCE`                   DOUBLE, 
   `PERFORMANCE_TOTAL`             DOUBLE, 
   `CUSTOMER_COUNT`                INTEGER, 
   `CUSTOMER_TOTAL`                INTEGER, 
   `CREATE_USER_ID`                BIGINT, 
   `CREATE_DATE`                   DATETIME, 
   `UPDATE_USER_ID`                BIGINT, 
   `UPDATE_DATE`                   DATETIME 
) ENGINE=MyISAM DEFAULT CHARSET=utf8; 

ALTER TABLE ST_FIN_FORECAST 
   ADD CONSTRAINT ST_FIN_FCT_UK_GID UNIQUE ( GUID ); 
