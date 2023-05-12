import { todoInfo } from "../contants/todoInfo";

function MyCategory($container) {
  this.$container = $container;

  this.render = () => {
    this.$container.innerHTML = `
              <section class="category__all">
              </section>
              `;
  };

  this.render();

  //초기 화면 렌더링
  const categoryWrapper = document.querySelector(".category__all");
  const storedCategory = JSON.parse(localStorage.getItem("categoryOrder"));

  // 로컬스토리지에 이전에 변경된 카테고리 순서 정보가 있으면 해당 순서로, 아니면 원래 순서로
  const categoryListAtMount = storedCategory?.length
    ? JSON.parse(storedCategory)
    : todoInfo.map((todo) => todo.category);

  categoryListAtMount.forEach((element) => {
    const categoryItem = document.createElement("article");
    categoryItem.innerText = element;
    categoryItem.className = "category__Item";
    //카테고리 드래그 가능하게 처리
    categoryItem.draggable = true;
    categoryWrapper.appendChild(categoryItem);
  });

  const categoryList = document.querySelectorAll(".category__Item");

  // 아이템과 아이템 사이로 카테고리를 드래그하여 넣을 수 있도록 하는 함수
  function handleDragBetweenElement(container, xCoordinate) {
    const draggableElements = [
      ...container.querySelectorAll(".category__Item:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = xCoordinate - box.left - box.width / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  categoryList.forEach((category) => {
    category.addEventListener("dragstart", () => {
      category.classList.add("dragging");
    });

    category.addEventListener("dragend", () => {
      category.classList.remove("dragging");
      const categoryOrder = []; //배열에 들어간 순서대로 카테고리가 화면에 보여져야함
      document.querySelectorAll(".category__Item").forEach((category) => {
        categoryOrder.push(category.innerText);
      });

      localStorage.setItem("categoryOrder", JSON.stringify(categoryOrder));
    });
  });

  categoryWrapper.addEventListener("dragover", (e) => {
    //요소이동불가 기본동작을 차단 (= 드롭 허용)
    e.preventDefault();
    const afterElement = handleDragBetweenElement(categoryWrapper, e.clientX);

    //드래그하고 잇는 요소가 Wrapper 위에 있을 경우 자식으로 이어붙인다.
    const draggingItem = document.querySelector(".dragging");

    if (afterElement === undefined) categoryWrapper.appendChild(draggingItem);
    else categoryWrapper.insertBefore(draggingItem, afterElement);
  });
}
export default MyCategory;
