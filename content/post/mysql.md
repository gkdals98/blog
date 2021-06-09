---
title: mysql 쿼리 요약
tags: ['Infra', 'Database']
published: '2021-06-08'
hidden: 'true'
---
## MYSQL 쿼리 요약
몇 가지 필요할 때 안떠오르는 쿼리들을 정리하고 넘어가려하는데, 하는 김에 항상 쓰던 쿼리들도 간략하게 정리하고 넘어가고자 한다. 

#### MySQL 관리
+ ***SHOW VARIABLES***

mysql 상에 설정되어있는 Variables를 확인할 수 있다. 설정값은 기동스크립트에서 참조하는 my.cnf에서 설정하는걸 권장하며 해당 커맨드는 웬만해서는 확인만을 위한 목적으로 사용하는 것이 좋다.

#### DB 관리 및 조회
+ ***CREATE DATABASE***
+ ***SHOW DATABASES***
+ ***USE {db_name}***
+ ***DROP DATABASE {db_name}***
+ ***SELECT {config} FROM information_schema***

#### table 관리
+ ***CREATE TABLE {table_name}***
+ ***SHOW TABLES***
+ ***DESC TABLES***
+ ***DROP TABLE {table_name}***
+ ***TRUNCATE TABLE {table_name}***
+ ***SHOW TABLE STATUS LIKE {table_name}***
+ ***ALTER TABLE***

#### CRUD
+ ***INSERT***
+ ***SELECT FROM***
+ ***UPDATE***
+ ***DELETE FROM***

#### 데이터 조작
+ ***WHERE***
+ ***ORDER BY***
+ ***GROUP BY***
+ ***LIMIT***
+ ***OFFSET***
+ ***HAVING***

#### 수량조절
+ ***COUNT***
+ ***MIN***
+ ***MAX***
+ ***SUM***
+ ***AVG***

#### SubQuery