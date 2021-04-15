---
title: KVM 기초 1
tags: ['Environment', 'tools']
published: '2021-02-02'
---


## KVM이란.
Kernal based Virtual Muchine의 약어로 리눅스에 구축할 수 있는 오픈소스 가상화 기술이다. Linux 2.6.2 이상 (2007년 이후 Release) 이라면 기본으로 제공된다.

운영체제 위의 하나의 프로세스로 동작하는 Docker Container와 달리 VM은 OS의 커널단에서부터 격리된 환경을 제공한다.


#### 시작하기
아래 명령어를 내려 아래와 같은 출력이 나온다면 kvm이 설치된 상태이다.
```
[root@dev2-nims:/root]# grep -E 'svm|vmx' /proc/cpuinfo
flags           : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr
sse sse2 ss ht tm pbe syscall nx pdpe1gb rdtscp lm constant_tsc arch_perfmon pebs bts rep_good nopl xtopology
nonstop_tsc aperfmperf eagerfpu pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 fma cx16 xtpr pdcm pcid
dca sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand lahf_lm abm epb invpcid_single
spec_ctrl ibpb_support tpr_shadow vnmi flexpriority ept vpid fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erms invpcid
cqm xsaveopt cqm_llc cqm_occup_llc dtherm ida arat pln pts
```
```
virsh --version
```


KVM 관련 명령어 리스트 정리.
```
virsh --version
```
