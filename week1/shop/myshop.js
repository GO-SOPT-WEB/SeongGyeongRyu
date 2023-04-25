import { shopData } from "./shopData.js";

// 1. 상수 파일에서 데이터 가져와서 보여주기
const menuWrapper = document.querySelector(".menu__wrapper");
const menuItems = document.querySelectorAll(".menu__item");

const renderHashtags = (hashtags, wrapper) => {
  hashtags?.forEach((el) => {
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

  menuItems[i].dataset.category = shopData[i].category;
}

//1-1. 로컬스토리지에 추가된 아이템 있으면 그것도 보여주기
const addedMenu = JSON.parse(localStorage.getItem("newMenu"));

if (addedMenu) {
  const { addedName, addedHashtags } = addedMenu;

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
}

// 2. 카테고리 필터링 기능
const categoryBtnList = document.querySelectorAll(".category > li ");
const checkboxList = document.querySelectorAll(".category > li > input");
const categoryTagWrapper = document.querySelector(".category__tag");
let checkedCategoryList = [];

const renderFilteredTag = (tagBtn) => {
  const newCategoryTag = document.createElement("div");
  newCategoryTag.innerText = tagBtn.innerText;

  const deleteCategoryBtn = document.createElement("button");
  deleteCategoryBtn.type = "button";
  deleteCategoryBtn.innerText = "❎";
  deleteCategoryBtn.dataset.category = tagBtn.dataset.filter;
  newCategoryTag.appendChild(deleteCategoryBtn);

  deleteCategoryBtn.addEventListener("click", () => {
    const checkbox = tagBtn.querySelector("input");
    checkbox.checked = !checkbox.checked;

    checkedCategoryList = checkedCategoryList.filter(
      (category) => category !== deleteCategoryBtn.dataset.category
    );

    deleteCategoryBtn.parentNode.remove();
    filterMenuItems();
  });

  categoryTagWrapper.appendChild(newCategoryTag);
};

const filterMenuItems = () => {
  if (checkedCategoryList.includes("all")) {
    menuItems.forEach((menu) => {
      menu.style.display = "flex";
    });
    return;
  }

  menuItems.forEach((menu) => {
    if (checkedCategoryList.includes(menu.dataset["category"]))
      menu.style.display = "flex";
    else menu.style.display = "none";
  });
};

const handleCategoryBtn = () => {
  checkboxList[idx].checked = !checkboxList[idx].checked;
  if (checkboxList[idx].checked) {
    checkedCategoryList.push(btn.dataset.filter);
    renderFilteredTag(btn);
  } else {
    checkedCategoryList = checkedCategoryList.filter(
      (category) => category !== btn.innerText
    );
  }
};

categoryBtnList.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    handleCategoryBtn();
    filterMenuItems();
  });
});

// 4. + 클릭시 전체 해시태그 보여주기
const hashTagWrapperList = document.querySelectorAll(".menu__hashtag");
const allHashTagWrapper = document.createElement("ul");
const moreHashtagBtn = document.querySelectorAll(".menu__hashtag > button");
allHashTagWrapper.className = "menu_allHashtag";

const handleMoreHashtag = (wrapper, flag) => {
  flag = !flag;

  if (flag) {
    wrapper.className = "menu_allHashtag";
    menuItems[i].prepend(wrapper);

    shopData[i].hashtags.forEach((el) => {
      const hashtagItem = document.createElement("li");
      hashtagItem.innerText = el;
      wrapper.appendChild(hashtagItem);
    });
  } else {
    while (wrapper.firstChild) {
      wrapper.firstChild.remove();
    }
    wrapper.remove();
  }
};

for (let i = 0; i < hashTagWrapperList.length; i++) {
  const allHashTagWrapper = document.createElement("ul");
  let isMoreHashtagOpen = true;

  for (let i = 0; i < moreHashtagBtn.length; i++) {
    moreHashtagBtn[i].addEventListener("click", () =>
      handleMoreHashtag(allHashTagWrapper, isMoreHashtagOpen)
    );
  }
}
