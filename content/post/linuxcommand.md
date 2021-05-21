---
title: 리눅스 기본 커멘드
tags: ['Infra', 'tools']
published: '2021-05-14'
hidden: 'true'
---

CentOs 7

bin에서, ldd ProcMgr - ProcMgr의 라이브러리 경로를 확인. 다른 Mgr에도 먹힘.

select AES_DECRYPT(unhex(user_pw), 'CiMgr') as user_pw from CiUserInfoTable where user_id='lpwarun'; - 암호 디크립트.

http://www.devglan.com/online-tools/bcrypt-hash-generator - 비크립트인크립트

http://sksstar.tistory.com/27 - 편집기 명령어 리스트.

startx - 리눅스 서버 직접 갔을때 윈도우 모드로 띄우기.

pwd  - 현재 경로를 출력

find / -name 'filename' | sort  - /에서부터 filename으로 파일 탐색. 이름 sort

cvs 커밋하기 - cvs commit -m "" Makefile

cp /filedirectory/filename /wanttomove/filename  - 파일 복사 붙여넣기

cp -r /folderdirectory/foldername /wanttomove/foldername  - 파일 이동

su - username  - 사용자 변경

shift + Insert - 붙여넣기

yy - p - 복사, 붙여넣기

find . -name "*sh" -exec perl -pi -e 's/loransrun/uvmrun/g' {} \; - 폴더내 전체 수정

find . -name "*sh" -exec perl -pi -e 's/--login-path=local/-uuavm2m -pOss_2012_ -S \/tmp\/mysql_uavm2m.sock/g' {} \;

권한은 순서대로
-rwxrwxrwx 형태를 띄며 앞의 - 또는 d는 파일인지 디렉토리인지를, rwx는 각각 owner, group, others의 read write execute를 의미한다.

chmod
owner, group, others의 권한을 2진법을 이용해 준다. rwx를 각 2진법 자리로 보고
chmod 711 filename 이면 owner rwx, group x, others x이다.

ctrl + c - 강제종료

포트 열기
#iptables -I INPUT 1 -p tcp --dport 21 -j ACCEPT
#iptables -I OUTPUT 1 -p tcp --dport 21 -j ACCEPT
service iptables save
systemctl restart iptables

CVS 레파지토리 위치 -> /docs_p3/cvs/CvsRoot



ps -ef | grep mysql - 실행중인 프로세스 보기

wtail Cli - Client와 통신을 담당하는 CliMgr의 로그를 볼 수 있다. 다른 Mgr도 Cli부분만 바꿔서 입력하면 조회 가능.

cat VERSION - project 내 OSS 폴더 내에 있는 VERSION을 cat 명령어로 불러오면 버전을 볼 수 있다.

특수문자 입력하기 - 입력하고자 하는 특수문자 앞에 \를 붙이면 된다.

Solaris

pkginfo | grep 이름 - 솔라리스는 이걸로 설치된거 검색해야됨.

which javac - javac 위치 찾기.

readlink -f ~ - 링크가 가르키는 파일 찾기.

https://serverfault.com/questions/112795/how-to-run-a-server-on-port-80-as-a-normal-user-on-linux - 포트 리다이렉트

select AES_DECRYPT(unhex(user_pw), 'CiMgr') as user_pw from CiUserInfoTable where user_id='loransrun';
암호화된 패스워드 알아내기

mysql --login-path=hps --host=localhost --port=13307 --password = 서버에서 다이렉트로 DB 접속

df -kh  - 서버의 디스크 가용상태 확인

cvs up -d  - cvs 업데이트

export PS1="[\u \d \t \w]"   - cmd line 출력정보를 유저, 날짜, 시간, 경로 로 변경한다.

kill -9 8112 - 8112가 프로세스 ID. ps -ef | grep 해서 나온 ID를 입력해 프로세스를 죽인다.

netstat -nap - 모든 포트 확인
iptables -L -v - 추가한 포트 조회하기

vi에서 /로 검색 후 gg를 친 뒤 n을 누르면 다음 찾기가 시작된D.

ftp가 속썩일 때
systemctl status vsftpd - 해보면 아마 보통 죽어있다.
systemctl start vsftpd - 살린다. (살렸으면 위 명령어로 살아있나 다시 확인)

select count(*) from table; => 컬럼 수 확인

경로 내 전체에 chown 주기 -> chown -R 이름:그룹 *

tar.gz 압축 -> tar -zcvf [파일명.tar.gz] [폴더명]

grep lora */*.* -> 파일 내용으로 찾기.

정규 표현식 - ?는 *과 달리 해당 글자수만큼 찾음. [4-5]하면 해당 문자에서 유연하게 선택.

ftp://obxepc:contela@10.11.237.33/project/csgn1.0/OSS/SOFTWARE/GUI

ldd ProcMgr -> 하면 해당 파일이 참조중인 라이브러리가 모두 출력된다.

tee - 화면과 파일에 동시 출력. 특정 스크립트의 결과값을 저장하고싶은데 화면에서도 보고싶은 그런 경우인듯.
       ./BuildRcMgr.sh 1.8 2>&1 | tee -a $LOG_DIR/RcMgr/RcMgr-$DATE.log
       에러를 출력으로, 출력을 파이프를 통해 tee로 보내서 출력 및 log 저장.
       여기서 -a 옵션은 기존에 있던 파일일 경우 내용을 유지하고 뒤에 덧붙임을 의미한다.

grep textforsearch *    => 파일의 내용으로 파일 찾기. 즉 내용에 textforsearch가 포함된 모든 파일 검색.

find . -exec perl -pi -e 's/airrun/sxgprun/g' {} \;    => 문자열 전체 치환


ls -1 *gz | grep -v BACKUP | xargs -i mv {} ../PKG
xargs는 파이프를 통한 복수 인자 전달. -i는 해당 인자를 명령어 끝이 아닌 원하는 곳에 넣기 위한 옵션이다. {}가 슬롯으로 해당 위치를 지정한다.

docker tag svr_ems_init_pkg_img:20180814 mic_ems00_aside:latest

ll -t | more    => 파일 시간순 정렬

cvs up -r 1.2 -p C12012_DIS_POWER_STS.cmd > C12012_DIS_POWER_STS.cmd.new   => 특정 버전 받아오기

레드헷 버전 확인 - cat /etc/redhat-release


vi 팁

:%s/css11/css22/gc   - 하나씩 수정하는 거.

which expect - 명령어파일이 있는 위치를 알려줌. 예시는 명령어 expect의 위치를 알려준다. 보통은 /bin 밑에 있다.


파일 용량 full 등의 로그를 보기위해선 /var/log 밑의 syslog 를 확인하면 된다.

du -ksh ./* 는 사용중인 디스크 용량을 봄.

rpm -qa | grep virt
