---
title: Spring Boot 정리 1 - Controller, Service
tags: ['Backend', 'Spring']
published: '2021-05-14'
hidden: 'true'
---
## Spring Boot
다른 기술들에 대해 계속 Study하기 전에, Spring의 기본에 대해 한 번 정리하고 넘어가고자 한다. Spring의 핵심인 의존성주입, 제어역전, PSA, AOP 등에 대해서는 당장 다루지 않을 것이다. 우선은 문법적인 것만, 자주 사용하는 것 위주로 정리한다. 그 첫 번째로 Controller, Service에 다루어보고자 한다. 아래 공식 URL에서 Project를 Gen한 후 사용 중인 IDE에 Import하여 시작해보자.

+ 프로젝트 - https://start.spring.io/
+ 공식 문서 - https://docs.spring.io/spring-boot/docs/2.5.0/reference/html/

#### Spring에서의 어노테이션
Annotation은 사전적으론 주석을 의미한다. 그리고 Java에서의 Annotation은 단순한 주석이 아니라 컴파일러가 보기 위한 주석을 의미한다. class, function, 변수 등의 위에 Anntation을 달아주면 컴파일러가 이를 기반으로 코드의 에러체크를 한다. 이클립스가 자주 권해오는 ```@Suppresswarnings("")``` 등이 이에 해당한다. 

개념 설명 전에 우선 형태를 보자. Controller Class를 작성하기 위해선 Controller 어노테이션을 사용한다. 아주 심플한 Controller Class의 예시는 아래와 같다.
```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GreetingController {
	@GetMapping(value = "/greeting")
	public String getGreeting () {
		return "Hello";
	}
}
```
