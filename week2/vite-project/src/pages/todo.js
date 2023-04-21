//MainPage : 생성자 함수 (js에서 객체를 생성하기 위해서 사용되는 특수한 함수)

import { todoInfo } from "../contants/todoInfo";

//$ : DOM 객체를 일반 변수와 구분하기 위한 컨벤션
function Todo($container) {
  //$container : #app에 해당하는 DOM -> <main id="app"></main>
  this.$container = $container;

  this.render = () => {
    this.$container.innerHTML = `
          <dialog class="modal">
            <form>
              <input name="addTodo" type="text" placeholder="추가할 Todo를 입력해주세요!">
              <button type="submit">추가</button>
            </form>
          </dialog>

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

  const addTodoItem = (category, todo) => {
    const todoContent = document.createElement("div");
    todoContent.className = "todo__content";
    todoContent.innerText = todo;

    const todoIcon = document.createElement("img");
    todoIcon.src = "src/assets/Img/Ic_heart.svg";
    todoIcon.alt = "완료유무를-표시-아이콘";

    todoContent.prepend(todoIcon);
    category.appendChild(todoContent);
  };

  //1-1. 로컬스토리지에서 가져온 카테고리 순서에 따라 보여주기

  const storedCategoryOrder = JSON.parse(localStorage.getItem("categoryOrder"));

  const currentTodoOrder =
    storedCategoryOrder === null
      ? todoInfo
      : todoInfo.sort((a, b) => {
          return (
            storedCategoryOrder.indexOf(a.category) -
            storedCategoryOrder.indexOf(b.category)
          );
        });

  currentTodoOrder.forEach((item) => {
    const todoCategory = document.createElement("article");
    todoCategory.className = "todo__category";
    const todoCategoryTag = document.createElement("div");
    todoCategoryTag.className = "todo__category__tag";
    todoCategoryTag.innerText = item.category;
    todoCategory.appendChild(todoCategoryTag);

    const addTodoBtn = document.createElement("button");
    addTodoBtn.innerText = "+";
    todoCategoryTag.appendChild(addTodoBtn);

    item.todoList.forEach((todo) => {
      addTodoItem(todoCategory, todo);
    });

    todoWrapper.appendChild(todoCategory);
  });

  // 2. 하트 안의 숫자 계산하기 - querySelector가 클래스 명 안에 있는 공백을 인식하지 못함

  const countTodo = () => {
    const todoCntWrapper = document.getElementsByClassName(
      "calendar__day today"
    );
    let todoCnt = todoCntWrapper[0].querySelector(".calendar__todo-cnt > p");

    const allTodoList = document.querySelectorAll(
      ".todo__content > img:not(.todo-done)"
    ).length;
    todoCnt.innerText = allTodoList;
  };

  countTodo();

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
      countTodo();
    });
  });

  //4. 투두 추가하기
  const addTodoBtnList = document.querySelectorAll(
    ".todo__category__tag > button"
  );
  const addTodoModal = document.querySelector(".modal");
  const addTodoForm = document.querySelector(".modal > form");
  const addTodoInput = addTodoForm.querySelector('input[name="addTodo"]');
  const categoryList = document.querySelectorAll(".todo__category__tag");
  const currentAllTodo = todoInfo.map((item) => item.todoList).flat();
  let addedTodoCategory = null;

  addTodoBtnList.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      addTodoModal.classList.add("open");
      addTodoInput.focus();
      addedTodoCategory = btn.parentNode.innerText.slice(0, -1).trim();
    });
  });

  addTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    document.body.style.backgroundColor = "#fdf1bb";
    addTodoModal.classList.remove("open");

    const newTodo = addTodoInput.value;

    if (!currentAllTodo.includes(newTodo)) {
      const filteredTodo = todoInfo.find((item) =>
        item.category.includes(addedTodoCategory)
      );

      filteredTodo.todoList.push(newTodo);

      const addTodoCategory = Array.from(categoryList).find((item) =>
        item.innerText.includes(addedTodoCategory)
      );
      addTodoItem(addTodoCategory.parentNode, newTodo);
    }
  });
}

export default Todo;
