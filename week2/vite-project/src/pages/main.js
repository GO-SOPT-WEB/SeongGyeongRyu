//MainPage : 생성자 함수 (js에서 객체를 생성하기 위해서 사용되는 특수한 함수)
//$ : DOM 객체를 일반 변수와 구분하기 위한 컨벤션
function MainPage($container) {
  //$container : #app에 해당하는 DOM -> <main id="app"></main>
  this.$container = $container;

  this.render = () => {
    this.$container.innerHTML = `
      <body>
        <header>TO DO MATE</header>
        <main>
          <section class="calendar">
            <article class="calendar__day">
              <p>월</p>
              <img src="src/assets/Img/Ic_star.svg" alt="월요일-남은투두개수" />
              <p>3</p>
            </article>
            <article class="calendar__day">
              <p>화</p>
              <img src="src/assets/Img/Ic_star.svg" alt="화요일-남은투두개수" />
              <p>4</p>
            </article>
            <article class="calendar__day">
              <p>수</p>
              <img src="src/assets/Img/Ic_starToday.svg" alt="수요일-남은투두개수" />
              <p>5</p>
            </article>
            <article class="calendar__day">
              <p>목</p>
              <img src="src/assets/Img/Ic_star.svg" alt="목요일-남은투두개수" />
              <p>6</p>
            </article>
            <article class="calendar__day">
              <p>금</p>
              <img src="src/assets/Img/Ic_star.svg" alt="금요일-남은투두개수" />
              <p>7</p>
            </article>
            <article class="calendar__day">
              <p>토</p>
              <img src="src/assets/Img/Ic_star.svg" alt="토요일-남은투두개수" />
              <p>8</p>
            </article>
            <article class="calendar__day">
              <p>일</p>
              <img src="src/assets/Img/Ic_star.svg" alt="일요일-남은투두개수" />
              <p>9</p>
            </article>
          </section>

          <section class="todos">
            <article class="todo__category">
              <div class="todo__category__tag">Daily</div>
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
              <div class="todo__category__tag">SOPT</div>
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
              <div class="todo__category__tag">Pic.me</div>
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
        </main>
        
        <footer>
          <button>
            <img src="src/assets/Img/Ic_calendar.svg" alt="완료유무를-표시-아이콘" />
            Calendar
          </button>
          <button>
            <img src="src/assets/Img/Ic_my.svg" alt="완료유무를-표시-아이콘" />
            My
          </button>
        </footer>
      </body>  
          `;
  };
  this.render();
}
export default MainPage;
