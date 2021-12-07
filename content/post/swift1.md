---
title: Swift 시작하기
tags: ['Etc', 'Swift']
published: '2021-11-11'
hidden: 'true'
---
## 스위프트 기초
업무상 간단한 스위프트 코드를 볼 일이 생겨서 깊게는 파지 않고 코드를 읽을 수 있을 정도로만 진행하려한다.
+ https://www.swift.org/getting-started/

#### 시작하기
swift는 이미 설치된 것을 전재로 한다. 터미널에서 인자 없이 swift를 입력하면 대화형 쉘인 REPL이 실행된다. 아래와 같은 느낌이다. 
```swift
> swift
Welcome to Apple Swift version 5.5.1-dev. 
Type :help for assistance.
  1> 1+2
$R0: Int = 3
  2> let greeting = "Hello!"
greeting: String = "Hello!"
  3> print(greeting)
Hello!
```

또 REPL에는 특정 컨텍스트의 기능과 메서드를 추천해주는 re 명령어가 있다. 이는 컨텍스트에 . 연산자를 사용한 뒤 re를 입력하고 tab을 누르면 수행된다. 아래와 같다.
```swift
> exit

```
