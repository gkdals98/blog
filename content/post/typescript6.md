---
title: TypeScript 정리 6 - 클래스
tags: ['Frontend', 'Basic']
published: '2021-08-07'
hidden: 'false'
---
## TypeScript의 Class
전 포스트에 이어 공식 docs를 보며 study를 진행해보겠다.
+ 참고 - https://typescript-kr.github.io/pages/classes.html

#### 클래스의 기본 작성법
타입 스크립트에서 가장 기본적으로 맴버 변수 하나, 생성자, 맴버 함수 하나를 가진 클래스를 작성하기 위해선 아래와 같은 문법을 사용한다. 앞의 포스팅에선 이야기가 복잡해져 대충 넘어갔지만, 여기서의 this는 Class의 맴버를 참조하기 위한 용도로 사용된다. 정의된 class의 생성은 ***new*** 키워드를 통해 가능하다.
```typescript
class Greeter {
	greeting : string;
	constructor (message: string) {
		this.greeting = message;
	}
	greet() {
		return "Hello, " + this.greeting;
	}
}

let greeter = new Greeter("world");
```

#### 상속
typescript에서 이미 존재하는 Class를 상속해 새로운 Class를 만들 때엔 아래와 같이 ***extends*** 키워드를 사용한다. 한 가지 더 살펴보자면, 상속한 class의 생성자를 재정의할 경우 super 키워드를 통해 기초 클래스의 생성자를 실행해야한다.
```typescript
class Animal {
	name: string;
	constructor(theName: string) { this.name = theName; }
	move(distanceInMeters: number = 0) {
		console.log(`Move ${distanceInMeters}`);
	}
}

class Dog extends Animal {
	constructor(name: string) { super(name); }
	bark() {
		console.log("woof! woof!");
	}
}

cons dog = new Dog();
dog.bark();
```
추가로 위 예제에 나온 코드들을 이용해 오버라이드를 하는 방법은 아래와 같다. 아래와 같이 하면 생성된 객체의 move는 Dog의 move를 호출하게 된다.
```typescript
let yeppie: Animal = new Dog("Yeppie the pomeranian");
yeppie.move();
```

#### public, private, protected
typescript에서 class 맴버변수는 기본적으론 ***public*** 으로 선언된다. 이에 public 키워드는 별도로 사용할 필요가 없지만 명시적으로 public을 붙일 수는 있다. 또한 해당 class 내부에서만 보이는 ***private*** , 해당 class와 그를 상속하는 class의 내부에서만 보이는 ***protected*** 를 사용할 땐 아래와 같이 해당 키워드로 변수를 선언하면된다.
```typeScript
class Employee {
	private pay: number;
	protected name: string;
	constructor (name: string) {this.name = name;}
}

class Programer extends Employee {
	private position: string;

	constructor(name : string, position: string) {
		super(name);
		this.position = position;
	}

	hello(yourName : string) {
		console.log("Hello " + yourName + ", i'm " + this.name);
	}
}
```

#### Readonly
readonly 키워드 또한 class 내의 맴버변수에 적용 가능하다. 아래와 같은 방식으로 작성하면 된다.
```typescript
class Octopus {
	readonly name: string;
	constructor (theName : string){
		this.name = theName;
	}
}

let octo = new Octopus("Octodad");
octo.name = "this is error";
```
이에 대해 매개변수 프로퍼티라고 불리는 문법으로 theName 없이 아래와 같이 작성할 수도 있다. 아래와 같이 작성해도 constructor를 통해 name은 class 내의 맴버로 정상등록된다.
```typescript
class Octopus {
	constructor (readonly name: string) {
	}
}
let octo = new Octopus("Octodad");
console.log(octo.name);
```

#### 접근자 (getter, setter)
typescript에선 getter와 setter의 용도를 단순 접근 제어로 생각하지 않고 특정 프로퍼티에 접근할 때 추가적인 처리를 하는 용도에 포커스를 두고있다. 예를 들어 변수를 set할 때 set되는 값이 유효범위 내의 값인지 검사하는 경우라거나, 값이 get될 때 추가적인 값의 가공을 하는 경우 등이다. 여기서 한 가지, ***접근자는 ECMAScript 5 이상에서만 제공한다.*** 그럼 ECMAScript 버전은 어떻게 맞추느냐. tsc로 파일을 빌드할 때 아래와 같이 타겟 옵션을 주면 된다.
```
npx tsc -t es5 index.ts
```
다른 언어의 getter, setter 메서드와 달리 typescript의 get, set은 아래와 같은 식으로 작성된다.
```
const fullNameLength = 10

class Employee {
	//접근 불가능한 private 변수
	private _fullName : string

	//위 private 변수에 매핑될 get 변수
	get fullName(): string {
		return this._fullname
	}

	//위 private 변수에 매핑될 set 변수
	set fullName(newName: string ) {
		if (newName && newName.length > fullNameLength) {
			throw new Error ("Length Over!!");
		}
		return this._fullName = newName;
	}
}

//실제 사용 시엔 위에 get, set으로 선언한 이름에 function 형태가 아닌 맴버변수 형태로 접근 가능하다.
let employee = new Employee();
employee.fullName = "Name is Too Long so this make Error";
```
또 한 가지 주의할 사항인데, 공식문서에 따르면 ***get, set이 없는 접근자는 자동으로 readonly로 간주된다고 한다.*** 이에 대해 간단한 테스트를 해보았으나 어떤 경우를 말하는 건지는 알기 힘들었다. 우선 이런 경우가 있다는 것을 알아두고 나중에 문제가 생겼을 때 당황하지 않는 정도면 되겠다.

#### 전역 프로퍼티
typescript 또한 class 내에 static 맴버를 제공한다. 익히 알고있는 대로, class가 객체화 된 시점에 정해지는 값이 아닌 빌드 시에 class의 정의에 함께 포함되는 맴버이다. 예제는 아래와 같다.
```typescript
const fullNameMaxLength = 10;

class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

window.onload = function() {
let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(Grid.origin);

}
```

#### 추상 클래스 (abstract)
다른 객체지향 언어에서 그러하듯, 공통 기능들을 미리 구현해 놓은 클래스이다. 자주 있는 비유로, 자동차 객체와 오토바이 객체를 구현한다고 치면 '엑셀과 브레이크, 기어업, 기어다운' 등의 공통 기능을 포함하는 탈 것 클래스를 정의한 뒤, 이를 상속하는 것이 좋다는 이야기이다. 이는 오토바이, 자동차의 구현상의 편의 뿐만 아니라 오토바이와 자동차를 탈 것으로 묶어 처리하는데에도 도움이 된다. 또 좌회전, 우회전과 같이 자동차와 오토바이 둘 모두에 반드시 있어야하나 구현은 다르게 되어야하는 기능이 있다면 내부에 abstract 메서드로 이를 정의해 놓을 수 있다. 이렇게되면 탈 것을 상속받는 자동차, 오토바이는 abstract로 정의된 좌회전, 우회전을 내부적으로 반드시 구현하여야 한다. 이는 인터페이스와 마찬가지로 상속하는 클래스의 구현에 대한 룰을 제시하는 역할을 한다. TypeScript에서의 abstract 클래스와 그 내부의 abstract 메서드의 정의는 아래와 같이 abstract 키워드를 써서 할 수 있다.
```typescript
abstract class Vehicle {
	constructor (public speed: number, public acceleration: number, 
		public braking: number){	
	}
	speed : number;
	acceleration : number;
	braking : number;
	accelerator () : void {
		speed = speed + acceleration;
	}
	break () : void {
		speed = speed - braking;
	}
	abstract trunLeft() : void;
	abstract trunRight() : void;
}

//상속 시, 아래와 같이 abstract로 정의되어있던 function들을 반드시 정의해주어야함.
class Car extends Vehicle {
	constructor (public speed: number, public acceleration: number, 
		public braking: number){
		super();
		this.speed = speed;
		this.acceleration = acceleration;
		this.braking = braking;
	}
	trunLeft() : void {
		console.log('Handle Left');
	}
	trunRight() : void {
		console.log('Handle Right');
	}
}
```