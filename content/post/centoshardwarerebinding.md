---
title: CentOS에서의 Hardware Rebinding
tags: ['Infra', 'system']
published: '2021-05-24'
hidden: 'true'
---

## CentOS에서 Hardware의 파티션의 재지정
현재 사용 중인 Linux 서버에서 kvm 이미지 등의 저장을 위해 파티션을 새로 지정해야할 일이 생겼다. 이에

#### Hardware의 현재 파티션 확인
아래 위치를 확인해보자. 해당 파일은 파일 시스템 정보를 담고있다.
```
root]$ cat /etc/fstab
/dev/mapper/centos-root /                       									xfs     defaults        0 0
UUID=5a6ee5d1-66a9-4b1c-8c6e-e4db2a95b574 /boot                   xfs     defaults        0 0
/dev/mapper/centos-home /home                   									xfs     defaults        0 0
/dev/mapper/centos-swap swap                    									swap    defaults        0 0
```
각 탭은 순서대로 파일 시스템 장치명, 마운트 포인트, 파일 시스템 종류, 옵션, dump설정, 파일 점검 옵션이다. 이제 어디서 파티션을 할당받을지 정하기 위해 아래 명령어로 각 마운트 별 용량을 채크해보자.
```
root]$ df -hl
Filesystem               Size  Used Avail Use% Mounted on
/dev/mapper/centos-root   50G   43G  7.5G  86% /
devtmpfs                  32G     0   32G   0% /dev
tmpfs                     32G  8.0K   32G   1% /dev/shm
tmpfs                     32G  443M   31G   2% /run
tmpfs                     32G     0   32G   0% /sys/fs/cgroup
/dev/sda1               1016M  180M  836M  18% /boot
/dev/mapper/centos-home  476G   54G  423G  12% /home
tmpfs                    6.3G     0  6.3G   0% /run/user/1007
tmpfs                    6.3G   32K  6.3G   1% /run/user/1001
tmpfs                    6.3G     0  6.3G   0% /run/user/1012
```

#### Hardware Remount
