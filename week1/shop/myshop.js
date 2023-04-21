import { shopData } from "./shopData.js";

// 1. 상수 파일에서 데이터 가져와서 보여주기
const menuWrapper = document.querySelector(".menu__wrapper");
const menuItems = document.querySelectorAll(".menu__item");

const renderHashtags = (hashtags, wrapper) => {
  hashtags.forEach((el) => {
    const hashtagItem = document.createElement("li");
    hashtagItem.className = "menu__hashtag__detail";
    hashtagItem.innerText = el;
    wrapper.appendChild(hashtagItem);
  });
};

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

  renderHashtags(shopData[i].hashtags, menuHashtags);

  menuItems[i].classList += " " + shopData[i].category;
}

//1-1. 로컬스토리지에 추가된 아이템 있으면 그것도 보여주기
const addedMenu = JSON.parse(localStorage.getItem("newMenu"));
const { addedCategory, addedName, addedHashtags } = addedMenu;

const newMenu = menuItems[0].cloneNode(true);
newMenu.className = "menu__item";
const newMenuName = newMenu.querySelector("header > h2");
newMenuName.innerText = addedName;
const newMenuHashtagWrapper = newMenu.querySelector(".menu__hashtag > ul");
const originalHashtagList = newMenuHashtagWrapper.querySelectorAll("li");
originalHashtagList.forEach((item) => item.remove());

renderHashtags(addedHashtags, newMenuHashtagWrapper);

const newMenuImg = newMenu.querySelectorAll("img");
newMenuImg[1].src = "https://pbs.twimg.com/media/FuKqQWLakAIzLMV.jpg";

menuWrapper.appendChild(newMenu);

// 2. 카테고리 필터링 기능
const categories = document.querySelectorAll(".category > li ");
const categoryTagWrapper = document.querySelector(".category__tag");

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
    }
  });
});

const renderFilteredMenus = () => {};

// 3. 카테고리 선택 시 카드섹션 위에 선택한 카테고리 보여주기

// 4. + 클릭시 전체 해시태그 보여주기
const hashTagWrapperList = document.querySelectorAll(".menu__hashtag");
const allHashTagWrapper = document.createElement("ul");
const moreHashtagBtn = document.querySelectorAll(".menu__hashtag > button");
allHashTagWrapper.className = "menu_allHashtag";

for (let i = 0; i < hashTagWrapperList.length; i++) {
  const allHashTagWrapper = document.createElement("ul");
  let hashTagOpenFlag = true;

  for (let i = 0; i < moreHashtagBtn.length; i++) {
    moreHashtagBtn[i].addEventListener("click", () => {
      hashTagOpenFlag = !hashTagOpenFlag;

      if (hashTagOpenFlag) {
        allHashTagWrapper.className = "menu_allHashtag";
        menuItems[i].prepend(allHashTagWrapper);

        shopData[i].hashtags.forEach((el) => {
          const hashtagItem = document.createElement("li");
          hashtagItem.innerText = el;
          allHashTagWrapper.appendChild(hashtagItem);
        });
      } else {
        //removeChild로 캐싱하는 방법 생각해보기
        while (allHashTagWrapper.firstChild) {
          allHashTagWrapper.firstChild.remove();
        }
        allHashTagWrapper.remove();
      }
    });
  }
}
