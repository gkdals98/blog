---
title: HTTP Header
tags: ['Frontend', 'Basic']
published: '2021-09-28'
hidden: 'false'
---
## HTTP Header 간단 정리
content-type에 대해 조사하던 중, 이 기회에 Header에 관해 간단히 정리하려 한다.

#### HTTP Header란
통신에서의 Header란, 메시지의 컨텐츠를 주고받는데 있어 부가적인 정보를 전송하기 위한 필드를 의미한다. 마찬가지로 HTTP 통신에서의 Header는 HTTP 요청의 부가적인 정보를 포함한다.

#### Http Header 필드의 대분류
http header의 필드는 크게는 아래와 같은 종류로 나뉜다.
+ **General Header** - 요청과 응답 모두에 사용되는 헤더. 이름 그대로 메시지에 대한 일반적인 정보들을 가지고 있다. 메시지가 만들어진 시간, 캐시 정책 관련(어려우니 나중에 다시 정리) 등등이다.
+ **Request Header** - 클라이언트(주로 브라우저)가 서버에 자원을 요청하며, Client의 상황 대해 알려주기 위한 Header이다. 주로 패치될 리소스나 클라이언트 자체에 대한 자세한 정보를 포함한다. 예를 들자면 클라이언트가 이해 가능한 컨텐츠 타입이 무엇인지, 클라이언트는 어떤 언어를 사용중인지, 클라이언트가 사용 가능한 인코딩은 어떤 것이 있는지 등이다.
+ **Response header** - 서버가 클라이언트의 요청에 응답하며 보내주는 데이터이다. 상세한 응답 컨텍스트를 제공하기 위해 사용된다.
+ **Entity Header** - 메시지의 컨텐츠에 대한 정보들이다. 메시지의 크기, 인코딩, 타입 등등 오늘 포스트에선 이 쪽에 조금 더 무게를 두려 한다.
+ **사용자 정의 Header** - 통신을 주고받을 때, 직접 Header에 필드를 정의할 수 있다. 일반적으로 데이터는 Body에 담지 Header에 필드를 정의해서 담는 일은 잘 없기에 기초적인 csrf 공격 방지 토큰 등의 특수한 목적이 아니면 사용할 일은 없다.

#### Entity Header중 일부
+ **Content-Encoding** - Client가 요청 헤더의 Accept-Encoding 필드에 사용할 수 있는 Encoding 리스트를 보내면, 서버는 그 중에서 우선순위에 의해 선택된 Encoding을 Content-Encoding 필드에 Set해 메시지를 전송한다. 브라우저는 해당 인코딩으로 컨텐츠를 해석하며 이 인코딩 설정은 html 문서 내의 head의 encoding 필드보다 우선시 된다. 
+ **Content-Language** - 위 Content-Encoding과 마찬가지로 Client가 Accept-Language 필드를 통해 보내준 사용 가능한 Language 리스트에서 서버가 우선시하는 Language를 이 필드에 Set한다.
+ **Content-Length** - 전달 되는 개체의 바이트 길이. 메시지 Body를 어디까지 읽어들일지를 판단하기 위한 필드로 직접 지정할 일은 거의 없다.
+ **Content-Disposition** - 응답 Body를 브라우저가 표시할 방법이다. inline의 경우, 웹페이지 화면에 표시된다. attachment인 경우, 브라우저는 파일을 다운로드한다. 여기에 filename을 지정하는 방법까지 포함하면 아래와 같다.
```
content-Disposition: attachment; filename='filename.csv'
```
이는 client로 파일을 전송할 때 종종 쓰이곤 한다. (예시 - https://docs.nestjs.com/techniques/streaming-files)
+ **Content-Security-Policy** - XSS에 대한 룰을 정의할 떄 사용하는 필드. 몇 가지 예외를 제외하고는 대부분 origin과 endpoint 룰에 대한 이야기이다. 우선은 하나하나 정리하기보다는 필요할 때 찾아 사용하는 것으로. - (https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Content-Security-Policy)

#### Content-Type
마지막으로 본 포스트를 작성한 계기인 Content-type에 대해 간단히 적어보려 한다. Content-type은 Body의 메시지가 정확히 어떤 유형의 컨텐츠인지를 정의한다. 가령 이 글을 적게 된 계기는 Blob을 전송하며 **multipart/form-data** 타입을 사용했기 때문이다. 이는 여러 용도가 있지만 대용량의 바이너리 파일을 전송할 때에도 유리하다. Content-type의 대분류는 아래와 같다. 
+ **text** - String을 전송하기 위한 포멧이다. 대표적으론 아래와 같은 값들이 있다.
```
//일반 string을 전송하기 위한 값 + 인코딩을 utf-8로 지정
Content-Type: text/plan; charset=utf-8
//html 문서를 전송하기 위한 값
Content-Type: text/html;
//css 파일을 전송하기 위한 값
Content-Type: text/css;
```
+ **Multipart** - 멀티 파트 타입은 MIME 타입으로부터 이어진다. MIME 타입은 전자 메일에서 사용되던 것으로 서로 다른 시스템끼리 메시지를 주고받기위해 여러 메시지를 붙여 하나의 복합 메시지로 보내는 형식이다. Multipart 타입은 이와같이 여러 형식의 데이터를 묶어 보내기 위한 유형이다. 

+ **Multipart/form-data** - 그 중 **Multipart/form-data**는 사용자가 form에 입력한 여러 파트의 데이터를 하나의 번들로 묶어 메시지화 한다. 그리고 그 과정에서 인코딩을 하지 않는다. 이러한 특성 떄문에, form에 갖가지 유형의 파일들을 넣고 묶어 보내는데 유리하다.
+ **application** - 모든 종류의 이진데이터를 처리한다. 대표값으로는 아래와 같은 것들이 있다.
```
//기본값. 모든 문자들은 서버로 보내기 전에 인코딩 될 것을 명시
Content-Type: application/x-www-form-urlencoded
/*
json 형태의 데이터를 전송한다. 요즘은 json 기반으로 data를 주고받는 일이 많기에 자주 사용하게된다.
*/
Content-Type: application/x-www-form-urlencoded
```

#### 참조
+ https://developer.mozilla.org/ko/docs/Web/HTTP/Headers