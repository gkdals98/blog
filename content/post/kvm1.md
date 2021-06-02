---
title: KVM 기초
tags: ['Infra', 'tools']
published: '2021-02-02'
hidden: 'true'
---

## KVM이란.
***KVM이란*** Kernal based Virtual Muchine의 약어로 Redhat과 Redhat기반인 CentOS에서 지원하는 오픈소스 가상화 기술이다다. 운영체제 위의 하나의 프로세스로 동작하는 Docker Container와 달리 VM은 OS의 커널단에서부터 완전히 격리된 환경을 제공한다. 아래부터는 KVM 이미지 관리법에 대해, 내가 필요한 기능 순서로 기술한다.

+ 참고 - https://www.cyberciti.biz/faq/how-to-install-kvm-on-centos-7-rhel-7-headless-server/

#### # 시작하기
우선, kvm 관리를 위한 라이브러리를 설치해보자. 설치 전에, 아래 명령어를 내려 무언가 출력이 나온다면 libvirt는 이미 설치된 상태다.
```
// 설치 파일 확인
root]$ lsmod | grep -i kvm
kvm_intel             170086  0
kvm                   566340  1 kvm_intel
irqbypass              13503  1 kvm

// virsh 버전 확인
root]$ virsh --version
4.5.0
```
없다면 아래와 같이 우선 libvirt와 qemu 등을 설치하고 libvirt의 service를 기동해준다.
+ ***설치***
```
root]$ yum install qemu-kvm libvirt libvirt-python libguestfs-tools virt-install
```
+ ***Service 등록 및 Start***
```
//구형 centos 환경에서 서비스의 시작
root]$ service libvirtd start  

//cent 7.8 이후 환경에서의 서비스의 등록 및 시작
root]$ systemctl enable libvirtd
root]$ systemctl start libvirtd
```

#### # KVM Image의 생성 전, kvm이 네트워크에 접속하기 위한 브리치 네트워크 준비

kvm이 서버의 물리 lan포트를 타고 네트워크에 접속하기 위해서는 서버의 물리포트에 브릿지된 브릿지 네트워크를 구성해야 한다. 조금 더 내 상황에 맞게 설명하자면, eno1이라는 이름의 물리포트에 10.11.0.0/16 망이 연결되어있으며 kvm이 이를 통해 10 망에 접속하게 하고싶다면, 10망의 연결을 브릿지로 바꾸어줘야한다. 들어가기 앞서, kvm은 기본적으로 libvirtd에 의해 구성된 dhcpd (동적 호스트 구성 프로토콜 데몬) 기반 네트워크 브리지를 사용한다. 하지만 나는 내 환경에 맞게 static route로 구성된 망에 접속하는 법을 서술하고자 한다. 우선 브릿지 네트워크의 구성은 아래의 명령으로 확인한다. (현재는 아무것도 없는 상태)
```
root]$ brctl show
bridge name     bridge id               STP enabled     interfaces
virbr0          8000.5254005a9937       yes             virbr0-nic
root]$ virsh net-list
 이름               상태     자동 시작 Persistent
----------------------------------------------------------
 default              활성화  예           예
```
아무것도 설정하지 않았다면, 생성된 vm은 타고나갈 bridge가 없으니 같은 서버 내의 다른 vm에 대한 네트워크 액세스만 가능하다. 현재 활성화된 default의 네트워크를 살펴보면, 개인 네트워크 192.168.122.1에 대해서만 활성화되어있음을 알 수 있다.
```
root]$ virsh net-dumpxml default
<network>
  <name>default</name>
  <uuid>f8fa8675-6d7d-41ad-89b4-7d4b88f5131e</uuid>
  <forward mode='nat'>
    <nat>
      <port start='1024' end='65535'/>
    </nat>
  </forward>
  <bridge name='virbr0' stp='on' delay='0'/>
  <mac address='52:54:00:5a:99:37'/>
  <ip address='192.168.122.1' netmask='255.255.255.0'>
    <dhcp>
      <range start='192.168.122.2' end='192.168.122.254'/>
    </dhcp>
  </ip>
</network>
```
이제 kvm을 외부망과 연결하기 위해 실제 있는 포트에 Bridge를 연결해보고자한다. 우선 브릿지 0번, 즉 br0를 생성하기 위해 아래의 설정파일을 생성해보자.
```
root]$ vi /etc/sysconfig/network-scripts/ifcfg-br0
```
여기에 아래와 같은 옵션들을 작성해주면 된다. 공식문서에선 bootproto로 dhcp를 지정해줬지만, 내 상황에선 고정된 IP를 사용할 것이기에 해당 옵션을 none으로 해 static route를 사용하도록 했다. 이 부분은 포스트를 읽는 사람 각자의 여건에 맞게 조정하자.
```
DEVICE=br0
TYPE=Bridge
BOOTPROTO=none
ONBOOT=yes
NM_CONTROLLED=no
IPADDR= 위에서 br0를 설정했던 포트에서 사용하는 ip
NETMASK= 위에서 br0를 설정했던 포트의 NETMASK
GATEWAY= 위에서 br0를 설정했던 포트의 GATEWAY (내부망엔 없을 수도 있음)
DNS1= 위에서 br0를 설정했던 포트의 DNS1 (내부망엔 없을 수도 있음)
DNS2= 위에서 br0를 설정했던 포트의 DNS2 (내부망엔 없을 수도 있음)
```
현재 포스트의 목적인 ***static route*** 의 경우, br0를 위와 같이 setting하고 난 후엔 기존의 물리포트에 해당하는 config는 아래와 같이 설정해준다. 내 경우엔 브릿지하려는 물리 포트의 이름이 eno1이였다. 따라서 ```/etc/sysconfig/network-scripts/ifcfg-eno1``` 파일의 내용을 아래와 같이 고쳐주었다.
```
DEVICE=eno1
TYPE=Ethernet
BOOTPROTO=none
ONBOOT=yes
NW_CONTROLLED=no
BRIDGE=br0
```
다음, net.ipv4.ip_forward 설정을 enable 시켜주어야한다. 아래 설정파일을 열자.
```
root]$ vi /etc/sysctl.conf
```
맨 아래줄에 아래의 내용을 추가한다.
```
net.ipv4.ip_forward = 1
```
작성 후, 해당 옵션을 읽어들이기위해 아래 명령어를 수행하고 그 결과로 해당 옵션이 출력되는 것을 확인한다.
```
root]$ sysctl -p /etc/sysctl.conf
{중략}
net.ipv4.ip_forward = 1 //확인
```
이제 설정을 적용하기 위해 아래 명령어로 NetworkManager 서비스를 재기동한다. 해당 명령어로 설정 적용이 안되는 경우, system을 재부팅하여 ip설정을 다시 읽어들이도록 한다.
```
root]$ systemctl restart NetworkManager
```
서비스의 재시작 내지는 시스템 재부팅이 완료된 다음, 아래의 명령어로 설정된 br0를 확인한다.
```
root]$ brctl show
bridge name     bridge id               STP enabled     interfaces
br0             8000.2c768a527724       no              
virbr0          8000.5254005a9937       yes             virbr0-nic
```
하지만 아직은 브릿지할 interface가 지정되지 않은 상태이다. 따라서 네트워크도 연결되지 않는다. 아래의 명령어를 이용해 eno1을 br0에 브릿지해주자.
```
root]$ brctl addif br0 eno1
//결과 재 확인
root]$ brctl show
bridge name     bridge id               STP enabled     interfaces
br0             8000.2c768a527724       no              eno1
virbr0          8000.5254005a9937       yes             virbr0-nic
```
이제 bridge network 설정이 완료되었다.

#### # KVM Image 생성
우선 필요한 iso 파일을 아래 디렉터리(고정은 아니지만 일반적으로 사용됨)에 가져다 놓는다.
```
root]# cd /var/lib/libvirt/boot
root]# wget https://mirrors.kernel.org/centos/7.4.1708/isos/x86_64/CentOS-7-x86_64-Minimal-1708.iso
```

#### # KVM Image의 백업
설정 xml과 kvm 이미지 파일은 아래의 위치에 있다. 의외로 이 파일 두 개를 통째로 옮겨서 백업하는 것 같다. ***이렇게 백업할 땐 백업 전에 반드시 kvm을 정지시켜야한다.*** 이런 방법 이외에도 툴을 이용해 백업하는 방법이 있는 것 같지만 툴 사용에 비용을 지불해야한다.
+ ***Image의 위치***
```
root]# cd /var/lib/libvirt/images/
root]# ls -al
total 59511564
drwx--x--x. 2 root root          64 Nov 17 01:30 ./
drwxr-xr-x. 9 root root          99 Mar  8 11:36 ../
-rw-r--r--  1 qemu qemu 18522505216 May 14 16:36 centos7.0-lpwa1.0-mysql.qcow2
-rw-------  1 qemu qemu 53695545344 May 14 16:36 centos7.0.qcow2
root]#
```
+ ***설정 xml의 위치***
```
root]# ls -al
total 40
drwx------. 4 root root 4096 Nov 17 01:30 ./
drwx------. 6 root root 4096 Mar  8 11:37 ../
drwxr-xr-x  2 root root  126 Nov  9  2020 autostart/
-rw-------  1 root root 4609 Oct 31  2018 centos7.0-xxxx1.0-mysql.xml
-rw-------  1 root root 4567 Sep 21  2018 centos7.0.xml
drwx------. 3 root root   40 Nov 17 01:30 networks/
-rw-------  1 root root 4607 Oct  2  2018 rhel7.1-xxxx_98.xml
-rw-------  1 root root 4607 May 24  2019 rhel7.1-xxxx.xml
```

#### # Image 리사이징
https://computingforgeeks.com/how-to-extend-increase-kvm-virtual-machine-disk-size/
https://www.cyberciti.biz/faq/create-vm-using-the-qcow2-image-file-in-kvm/
https://serverfault.com/questions/438083/how-to-decrease-the-size-of-a-kvm-virtual-machine-disk-image
