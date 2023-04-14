import { shopData } from "./shopData.js";

// 1. 상수 파일에서 데이터 가져와서 보여주기
const menuItems = document.querySelectorAll(".menu__item");

for (let i = 0; i < menuItems.length; i++) {
  const menuName = menuItems[i].getElementsByTagName("h2")[0];
  const menuHashtags = menuItems[i].getElementsByTagName("ul")[0];

  const menuImg = menuItems[i].getElementsByTagName("img")[1];

  menuName.innerText = shopData[i].name;
  menuImg.src = shopData[i].imgSrc;
  menuImg.alt = shopData[i].name;

  shopData[i].hashtags.forEach((el) => {
    const hashtagItem = document.createElement("li");
    hashtagItem.innerText = el;
    menuHashtags.appendChild(hashtagItem);
  });

  menuItems[i].classList += " " + shopData[i].category;
}

// 2. 카테고리 필터링 기능
const categories = document.querySelectorAll("label > button");
const categoryCheckboxes = categories.forEach((category) => {
  category.addEventListener("click", () => {
    const filterCategory = category.dataset.filter;
    console.log(filterCategory);
    handleRenderFilteredMenus(filterCategory);
  });
});

const handleRenderFilteredMenus = (filterCategory) => {
  menuItems.forEach((menu) => {
    if (filterCategory === "all" || menu.className.includes(filterCategory)) {
      menu.style.display = "flex";
    } else {
      menu.style.display = "none";
    }
  });
};

// 3. 카테고리 선택 시 카드섹션 위에 선택한 카테고리 보여주기
