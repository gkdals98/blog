---
title: C++ 요약 - 1
tags: ['Language', 'C']
published: '2021-04-26'
---

## C++의 문법 일부 요약
이번 포스트는 순전히, 코드 분석을 위해 생소한 문법들을 정리하기 위한 목적이다. 글을 작성하는 시점의 목적은 기존 코드를 분석하여 Docker 통신하는 Nest Backend로 업그레이드하는 것이다. 때문에 스터디의 방향성도 순차적으로 C++을 공부하기 위한 목적이 아닌, 리눅스 시스템에서 돌아가는 C 모듈의 이해와 C의 IPC 통신에 대한 분석을 메인으로 한다.

## 시작 전, 공유 메모리를 사용하는 IPC란 무엇인가
+ 참조 - http://forum.falinux.com/zbxe/index.php?document_srl=552885&mid=lecture_tip

공유 메모리란 말 그대로 프로세스간에 공유되는 메모리를 의미한다. 프로세스는 식별자를 통해 공유 메모리상의 자신이 접근하려는 자원으로 접근 가능하며 별도의 함수 없이 마치 자신의 변수를 사용하듯이 관련 작업을 처리할 수 있다. 공유 메모리는 커널을 통해 관리되며 프로세스는 공유메모리에 접근하려할 경우, 커널에게 공유메모리의 접근을 요구하면 된다. 다만 커널은 공유메모리를 관리할 뿐, 공유 메모리의 안전을 보장해주는 것은 아니기에 동시에 두 곳 이상에서 write가 들어갈 경우 심각한 문제가 발생할 수 있다. 따라서 다른 프로세스들은 공유메모리에 대한 참조만을 하고 한 프로세스에 의해 write가 되는 구조가 선호된다.

## 코드 분석을 위한 C++
회사의 cpp 코드를 분석하기 위해 알아야하는 문법 및 개념에 대해 간략하게 짚고 넘어간다.

#### 전처리기 문법
우선 전처리기란, 프로그램을 컴파일할 때 컴파일 직전에 실행되는 별도의 프로그램이다. 전처리기는 지시자를 찾아 단순 텍스트 치환 및 디버깅 지원 등을 지원한다. 전처리기에서 처리하는 문법은 #으로 시작하며 대표적인 것들은 아래와 같다.
```cpp
//header 파일의 include
#include <stdio.h>
//컴파일 시 특정 텍스트를 해당 값으로 치환
#define BUFFER_SIZE = 65531

//조건부 컴파일을 위한 if문을 작성하는데 사용하는 if, elif, else, endif
#if BUFFER_SIZE == 65531
	printf("Buffer Ready\n");

#elif BUFFER_SIZE > 65531
	printf("Buffer is too big\n");

#else BUFFER_SIZE < 65531
	printf("Buffer Error\n");
#endif

//정의되어있는지 확인.
#ifdef TEST
	printf("This is test.\n");
#else
	printf("Process Ready...\n);
#endif

//정의되지 않았는지 확인
#ifndef BUFFER_SIZE
	printf("Something wrong.\n");
#else
	printf("System boot success.\n");
#endif
```

#### Header
Header 파일(some.h)은 컴파일러가 알아야하는 다른 파일에 대한 선언을 보관하는 파일이다. 미리 정의된 기능들을 쉽게 include하기 위한 용도 이외에도 특정 파일이 include 중인 대상들을 보기 쉽게 따로 정리하는 용도로도 사용된다. 가령 MsgAnalyzer.cpp가 있다면 그를 위한 include들을 정리한 MsgAnalyzer.h가 있고 cpp 코드에선 해당 헤더를 include하는 식이다.

Header를 작성하기 위해서, 우선 헤더 가드로 헤더 파일의 내용을 감싸 한 코드에 Header가 두 번 include 되는 것을 막을 필요가 있다.

```cpp
//헤더 가드의 시작.
#ifndef		__MSG_ALALYZER_H__
#define		__MSG_ALALYZER_H__

//선언부

#endif
```

다음, 선언부에서 볼 수 있는 일반적인 문법들이다.
```cpp
// 표준 라이브러리 디렉터리 내에서 라이브러리를 import해온다. 컴파일러가 설치된 위치로부터 Header를 찾는다.
#include <iosteream>
// 직접 정의한 라이브러리의 Header들을 읽어온다. 컴파일 옵션으로 지정한 include 폴더로부터 Header를 찾는다.
#include "OtherClass.h"
//namespace의 std의 요소들을 std::cout 같은 참조 선언 없이 직접적으로 (cout 과 같이) 사용할 수 있게 해준다.
using namespace std;

//클래스 밖에도 아래와 같이 변수를 선언할 수 있다.
const int	C_SMIPC_READ_BUFF_SIZE	= 65535;

//다른 header로부터 읽어온 클래스를 사용하기위해, 아래와 같이 사용할 클래스의 이름을 명시한다.
class OtherClass;

//현재 Header에 새롭게 정의되는 Class
class CurrentClass
{
	private:
		char mRecvBuffer [ C_SMIPC_READ_BUFF_SIZE ];
	protected:
		int mSystemValue;
	public:
		string mSystemString;

};
```

#### 클래스의 소멸자 ~(tilde)
C++에서 tilde 표시가 붙은 method는 클래스의 소멸자를 의미한다. 주로 해당 class가 데이터 맴버를 가진 경우, class의 소멸 시 명시적으로 데이터 맴버를 할당 해제하기 위해 사용한다.
***header 파일***
```cpp
class TextMgr
{
	public:
		TextMgr();
		virtual ~TextMgr(); //virtual은 바로 다음에 설명할 예정
		int someInt;
};
```
위와 같이 Class를 정의해둔 header 파일이 있다 치고, 그에 대한 생성자 및 소멸자의 구현 예시는 아래와 같다.
***cpp 파일***
```cpp
TextMgr::TextMgr()
{
	someInt = 1;
};

TextMgr::~TextMgr()
{
	delete someInt;
};
```
여기서 사용된 delete는 cpp의 키워드로 개체에 할당된 메모리를 해제한다. 즉, 예문의 소멸자 내에서 사용한 ```delete someInt```는 TextMgr에 할당된 someInt라는 변수를 할당 해제하기 위한 것이다.

#### virtual
virtual 키워드는 가상 함수를 선언하기 위해 사용된다. ***virtual로 선언된 함수는 실행시간에 그 값이 결정된다.*** 구체적으로, 부모클래스안에 virtual 함수를 선언하고 이를 상속하는 자식클래스들 내에서 virtual 함수를 구현한 뒤, 프로그램 실행 중 자식에 구현된 함수를 호출하기 위함이다.



#### static

#### 화살표 (->)
