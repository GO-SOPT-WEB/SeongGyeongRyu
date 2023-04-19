//MainPage : 생성자 함수 (js에서 객체를 생성하기 위해서 사용되는 특수한 함수)

import { todoInfo } from "../contants/todoInfo";

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
          </section>

          `;
  };

  this.render();

  //1. 상수 파일에서 가져와서 투두 보여주기

  const todoWrapper = document.querySelector(".todos");

  todoInfo.forEach((item) => {
    const todoCategory = document.createElement("article");
    todoCategory.className = "todo__category";
    const todoCategoryTag = document.createElement("div");
    todoCategoryTag.className = "todo__category__tag";
    todoCategoryTag.innerText = item.category;
    todoCategory.appendChild(todoCategoryTag);

    item.todoList.forEach((todo) => {
      const todoContent = document.createElement("div");
      todoContent.className = "todo__content";
      todoContent.innerText = todo;

      const todoIcon = document.createElement("img");
      todoIcon.src = "src/assets/Img/Ic_heart.svg";
      todoIcon.alt = "완료유무를-표시-아이콘";

      todoContent.prepend(todoIcon);
      todoCategory.appendChild(todoContent);
    });

    todoWrapper.appendChild(todoCategory);
  });

  // 2. 하트 안의 숫자 계산하기 - querySelector가 클래스 명 안에 있는 공백을 인식하지 못함

  const handleCountTodo = () => {
    const todoCntWrapper = document.getElementsByClassName(
      "calendar__day today"
    );
    let todoCnt = todoCntWrapper[0].querySelector(".calendar__todo-cnt > p");

    const allTodoList = document.querySelectorAll(
      ".todo__content > img:not(.todo-done)"
    ).length;
    todoCnt.innerText = allTodoList;
  };

  handleCountTodo();

  // 3. 할 일 완료 시 개수 줄어들도록 처리
  const todoIconList = document.querySelectorAll(".todo__content > img");

  todoIconList.forEach((todoIcon) => {
    todoIcon.addEventListener("click", () => {
      if (todoIcon.parentNode.className === "todo__content") {
        todoIcon.parentNode.classList.add("done");
        todoIcon.className = "todo-done";
      } else {
        todoIcon.parentNode.classList.remove("done");
        todoIcon.className = null;
      }
      handleCountTodo();
    });
  });
}

export default Todo;
