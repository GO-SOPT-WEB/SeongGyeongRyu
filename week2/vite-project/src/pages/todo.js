//MainPage : 생성자 함수 (js에서 객체를 생성하기 위해서 사용되는 특수한 함수)
//$ : DOM 객체를 일반 변수와 구분하기 위한 컨벤션
function Todo($container) {
  //$container : #app에 해당하는 DOM -> <main id="app"></main>
  this.$container = $container;

  this.render = () => {
    this.$container.innerHTML = `

          <section class="calendar">
            <article class="calendar__day">
              <p>월</p>
              <div class="calendar__todo-cnt">
                <img src="src/assets/Img/Ic_star.svg" alt="월요일-남은투두개수" />
                <p>1</p>
              </div>
              <time class="calendar__date" datetime="2023-04-03">3</time>
            </article>
            <article class="calendar__day">
              <p>화</p>
              <div class="calendar__todo-cnt">
                <img src="src/assets/Img/Ic_star.svg" alt="화요일-남은투두개수" />
                <p>1</p>
              </div>
              <time class="calendar__date" datetime="2023-04-04">4</time>
            </article>
            <article class="calendar__day today">
              <p>수</p>
              <div class="calendar__todo-cnt">
                <img src="src/assets/Img/Ic_starToday.svg" alt="수요일-남은투두개수" />
                <p></p>
              </div>
              <time class="calendar__date" datetime="2023-04-05">5</time>
            </article>
            <article class="calendar__day">
              <p>목</p>
              <div class="calendar__todo-cnt">
                <img src="src/assets/Img/Ic_star.svg" alt="목요일-남은투두개수" />
                <p>1</p>
              </div>
              <time class="calendar__date" datetime="2023-04-06">6</time>
            </article>
            <article class="calendar__day">
              <p>금</p>
              <div class="calendar__todo-cnt">
                <img src="src/assets/Img/Ic_star.svg" alt="금요일-남은투두개수" />
                <p>1</p>
              </div>
              <time class="calendar__date" datetime="2023-04-07">7</time>
            </article>
            <article class="calendar__day">
              <p>토</p>
              <div class="calendar__todo-cnt">
                <img src="src/assets/Img/Ic_star.svg" alt="토요일-남은투두개수" />
                <p>1</p>
              </div>
              <time class="calendar__date" datetime="2023-04-08">8</time>
            </article>
            <article class="calendar__day">
              <p>일</p>
              <div class="calendar__todo-cnt">
                <img src="src/assets/Img/Ic_star.svg" alt="일요일-남은투두개수" />
                <p>1</p>
              </div>
              <time class="calendar__date" datetime="2023-04-09">9</time>
            </article>
          </section>

          <section class="todos">
            <article class="todo__category">
              <div class="todo__category__tag">
              DAILY
              <button type="button">+</button>
              </div>
              <div class="todo__content">
                <img src="src/assets/Img/Ic_heart.svg" alt="완료유무를-표시-아이콘" />
                8시 기상
              </div>
              <div class="todo__content">
                <img
                  src="src/assets/Img/Ic_heart.svg"
                  class="todo-done"
                  alt="완료유무를-표시-아이콘"
                />
                영어 공부
              </div>
              <div class="todo__content">
                <img src="src/assets/Img/Ic_heart.svg" alt="완료유무를-표시-아이콘" />
                홈트
              </div>
            </article>
            <article class="todo__category">
              <div class="todo__category__tag">SOPT
              <button type="button">+</button>
              </div>
              <div class="todo__content">
                <img src="src/assets/Img/Ic_heart.svg" alt="완료유무를-표시-아이콘" />
                미모스 인증
              </div>
              <div class="todo__content">
                <img src="src/assets/Img/Ic_heart.svg" alt="완료유무를-표시-아이콘" />
                1차 세미나 과제하기
              </div>
              <div class="todo__content">
                <img src="src/assets/Img/Ic_heart.svg" alt="완료유무를-표시-아이콘" />
                코테스터디 문제 풀기
              </div>
            </article>
            <article class="todo__category">
              <div class="todo__category__tag">HAPPY</div>
              <div class="todo__content">
                <img src="src/assets/Img/Ic_heart.svg" alt="완료유무를-표시-아이콘" />
                보이즈플래닛 보기
              </div>
            </article>
            <article class="todo__category">
              <div class="todo__category__tag">PIC.ME</div>
              <div class="todo__content">
                <img src="src/assets/Img/Ic_heart.svg" alt="완료유무를-표시-아이콘" />
                2차 릴리즈 기능 구현
              </div>
              <div class="todo__content">
                <img src="src/assets/Img/Ic_heart.svg" alt="완료유무를-표시-아이콘" />
                2차 릴리즈 QA
              </div>
            </article>
          </section>

          `;
  };

  this.render();

  // 1. 하트 안의 숫자 계산하기 - querySelector가 클래스 명 안에 있는 공백을 인식하지 못함
  const todoCntWrapper = document.getElementsByClassName("calendar__day today");
  let todoCnt = todoCntWrapper[0].querySelector(".calendar__todo-cnt > p");
  const allTodoList = document.querySelectorAll(
    ".todo__content > img:not(.todo-done)"
  ).length;
  todoCnt.innerText = allTodoList;
}

export default Todo;
