---
title: YUM 요약
tags: ['Infra', 'tools']
published: '2021-05-21'
hidden: 'true'
---
https://serverfault.com/questions/392589/yum-clean-hangs-what-to-try-next

rm /var/lib/rpm/

#### 간단한 명령어
+ yum check : pkg의 이상을 채크해준다.
+ yum list installed | grep '패키지이름' : 해당 pkg가 설치되었는지 확인
+ yum install '패키지 이름' : 해당 pkg 설치
+ yum clean

#### 관련 로그 위치
+ /var/log/yum.log
