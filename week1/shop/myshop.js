import { shopData } from "./shopData.js";

// 1. 상수 파일에서 데이터 가져와서 보여주기
const menuWrapper = document.querySelector(".menu__wrapper");
const menuItems = document.querySelectorAll(".menu__item");
const addedItem = JSON.parse(localStorage.getItem("newMenu"));

for (let i = 0; i < menuItems.length; i++) {
  const menuName = menuItems[i].getElementsByTagName("h2")[0];
  const menuHashtags = menuItems[i].getElementsByTagName("ul")[0];

  const menuImg = menuItems[i].getElementsByTagName("img")[1];

  menuName.innerText = shopData[i].name;
  menuImg.src = shopData[i].imgSrc;
  menuImg.alt = shopData[i].name;

  shopData[i].hashtags.forEach((el) => {
    const hashtagItem = document.createElement("li");
    hashtagItem.className = "menu__hashtag__detail";
    hashtagItem.innerText = el;
    menuHashtags.appendChild(hashtagItem);
  });

  menuItems[i].classList += " " + shopData[i].category;
}

// 2. 카테고리 필터링 기능
const categories = document.querySelectorAll(".category > li ");
const categoryTagWrapper = document.querySelector(".category__tag");
let isCategoryShowing = Array(4).fill(false);

categories.forEach((category) => {
  category.addEventListener("click", () => {
    const categoryCheckbox = category.querySelector("input");
    categoryCheckbox.checked = !categoryCheckbox.checked;

    if (categoryCheckbox.checked) {
      const newCategoryTag = document.createElement("div");
      newCategoryTag.innerText = category.innerText;
      newCategoryTag.className = category.dataset.filter;

      const deleteCategoryBtn = document.createElement("button");
      deleteCategoryBtn.type = "button";
      deleteCategoryBtn.innerText = "❎";
      newCategoryTag.appendChild(deleteCategoryBtn);

      deleteCategoryBtn.addEventListener("click", () => {
        categoryCheckbox.checked = !categoryCheckbox.checked;
        deleteCategoryBtn.parentNode.remove();
      });

      categoryTagWrapper.appendChild(newCategoryTag);
      // selectedCategories.push(category.dataset.filter);
      renderFilteredMenus(selectedCategories);
    }
  });
});

const renderFilteredMenus = (selectedCategories) => {
  if (selectedCategories.length === 0)
    menuItems.forEach((menu) => (menu.style.display = "flex"));
  else {
    menuItems.forEach((menu) => {
      // 체크한 카테고리에 속한 메뉴만 보여주기

      if (
        selectedCategories.some((category) => menu.className.includes(category))
      ) {
        menu.style.display = "flex";
      } else {
        menu.style.display = "none";
      }
    });
  }
  //   menuItems.forEach((menu) => {
  //     if(menu.data)
  //   });
};

// 3. 카테고리 선택 시 카드섹션 위에 선택한 카테고리 보여주기

// 4. + 클릭시 전체 해시태그 보여주기
const hashTagWrapperList = document.querySelectorAll(".menu__hashtag");
const allHashTagWrapper = document.createElement("ul");
allHashTagWrapper.className = "menu_allHashtag";
let hashTagOpenFlag = true;

hashTagWrapperList.forEach((hashTagWrapper) => {
  const hashtags = hashTagWrapper.querySelectorAll("ul > li");
  const moreHashtagBtn = document.querySelectorAll(".menu__hashtag > button");

  for (let i = 0; i < moreHashtagBtn.length; i++) {
    moreHashtagBtn[i].addEventListener("click", () => {
      hashTagOpenFlag = !hashTagOpenFlag;
    });
  }
});
