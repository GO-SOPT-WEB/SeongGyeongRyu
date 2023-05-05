### CSS 전역 변수 사용 원리 (ThemeProvider)

- context API 기반으로 만들어짐
- `ThemeProvider` : context 를 사용해서 모든 리액트 컴포넌트에게 theme 속성을 전달하는 역할을 수행한다.

- `styled.d.ts`

  - `d.ts` : 타입선언 파일로, TS 코드의 타입 추론을 돕는 파일이다.
    구현부가 아닌 선언부만을 작성하는 용도의 파일로, JS코드로 컴파일 되지않고, 선언 코드(declare)만 작성이 가능하다. (declare module을 사용하는 이유!)

    기존 JavaScript로 만들어진 서드파티 모듈들을 TypeScript 환경에서도 사용할 수 있도록 따로 타입만 정리해서 넣어둔 파일
    해당 파일이 없다면 JS 기반의 라이브러리들은 TS환경에서 타입이 지정되지 않았기 때문에 타입체킹이 제대로 되지 않아서 정상적으로 인식되지 못하는 문제가 발생

    특정 라이브러리가 TS환경에서만 작동한다면 .ts 파일 내에서 타입이나 인터페이스를 선언하면 되겠지만, JS환경에서 사용되는 경우가 있을 수 있기 때문에 이렇게 별도의 파일을 만들어서 타입을 선언하게 된다고 이해

    보통 프로젝트에서는 별도의 JS환경을 생각하지 않으므로 .ts파일 내부에 타입을 선언하고, 라이브러리는 JS환경을 생각하여 .d.ts파일에서 타입을 관리!