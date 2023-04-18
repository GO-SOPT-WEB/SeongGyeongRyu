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

  const categoryWrapper = document.querySelector(".category__all");

  todoInfo.forEach((el) => {
    const categoryItem = document.createElement("article");
    categoryItem.innerText = el.category;
    categoryItem.className = "category__Item";
    categoryItem.draggable = true;
    categoryWrapper.appendChild(categoryItem);
  });
}
export default MyCategory;
