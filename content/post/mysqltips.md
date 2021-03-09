---
title: MySQL Tip 모음 1
tags: ['vue', 'nuxt']
published: '2021-03-03'
---

#### MYSQL 테이블 및 데이터 베이스 크기 보기
우선 현재 사용중인 용량은 아래 쿼리의 DB_NAME을 사용 중인 DB명으로 고쳐 실행하면 확인 가능하다.
```
SELECT TABLE_NAME AS "Tables", round(((data_length + index_length) / 1024 / 1024), 2) "Size in MB" FROM information_schema.TABLES WHERE table_schema = "DB_NAME" ORDER BY (data_length + index_length) DESC;
```
하지만 우리가 바라는건 진짜 사용 중인 데이터 말고 추정치이다.


우선 아래 쿼리에서 TABLENAME부분을 존재하는 아무 테이블로 바꾼 뒤 수행해 Table의 Information Schema 리스트를 보고 그중에 뭘 봐야할지 생각을 해보자.
```
SELECT * FROM   INFORMATION_SCHEMA.TABLES WHERE  TABLE_NAME = 'TABLENAME'
```
해당 쿼리 결과 AVG_ROW_LENGTH가 가장 상황에 맞아 보이나 이는 실제 있는 데이터들의 통계값에 기반한다. 따라서 Table에 데이터가 없다면 값이 0으로 출력된다. 이외에는 의외로 Info Schema에선 Table Row의 최대 크기 값을 추정할 데이터가 없다. 이유는 MySQL 엔진에 따라 Row의 크기가 다를 수 있기 때문이라고... 즉, 정확한 값을 얻을 방법은 없다. 다만 Table상에 충분한 Data가 있다면 아래와 같이 시도해볼 수 있다.
```
SELECT TABLE_NAME AS "Tables", round(((avg_row_length) / 1024), 2) "Size in KB" FROM information_schema.TABLES WHERE table_schema = "SXGPDB" ORDER BY (data_length / table_rows) DESC;
```


일단 우리 통계 최대 보관일수 7일 잡고,
최대 Dv 증설 가능 수는 5천대.
