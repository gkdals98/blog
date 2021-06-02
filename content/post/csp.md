---
title: Content Security Policy (CSP)
tags: ['Frontend', 'Basic']
published: '2021-05-13'
hidden: 'true'
---

## Content Security Policy (CSP)
httpd 서버 내에는 Content Security Policy라는 html 헤더필드의 설정을 지정할 수 있는 옵션이 들어있다. 찾아보면 다른 용도도 꽤 있겠지만 현재는 XSS 관련으로, 동일출처 정책을 설정하는 부분이 문제가 되었다. 웹 보안 모델은 동일 출처 정책을 기반으로 XSS 공격을 방지하는데 CSP 내의 관련 옵션이 적절히 설정되지 않은 것이다. 이에 해당 옵션을 어떻게 설정하면 현재 상황에 맞는 보안 수준을 충족할 수 있을지 알아보고자 study를 진행한다.

+ 이하 내용 출처 - https://developers.google.com/web/fundamentals/security/csp?hl=ko

#### # 리소스 정책 적용을 위한 
