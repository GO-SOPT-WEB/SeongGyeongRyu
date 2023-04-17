import { shopData } from "./shopData.js";

// 1. 상수 파일에서 데이터 가져와서 보여주기
const menuWrapper = document.querySelector(".menu__wrapper");
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
    hashtagItem.className = "menu__hashtag__detail";
    hashtagItem.innerText = el;
    menuHashtags.appendChild(hashtagItem);
  });

  menuItems[i].classList += " " + shopData[i].category;
}

// 2. 카테고리 필터링 기능
const categories = document.querySelectorAll(".category > li ");
const categoryTagWrapper = document.querySelector(".category__tag");

categories.forEach((category) => {
  category.addEventListener("click", () => {
    const categoryTag = document.createElement("div");
    categoryTag.innerText = category.innerText;
    categoryTagWrapper.appendChild(categoryTag);

    const categoryCheckbox = category.querySelector("input");
    categoryCheckbox.checked = !categoryCheckbox.checked;

    selectedCategories.push(category.dataset.filter);
    handleRenderFilteredMenus(selectedCategories);
  });
});

const handleRenderFilteredMenus = (selectedCategories) => {
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
let hashTagOpenFlag = true;

hashTagWrapperList.forEach((hashTagWrapper) => {
  const hashtags = hashTagWrapper.querySelectorAll("ul > li");
  const moreHashtagBtn = document.querySelectorAll(".menu__hashtag > button");

  const allHashTagWrapper = document.createElement("ul");
  let hashTagOpenFlag = true;

  //즉, forEach() 메서드의 콜백 함수는 인덱스 0부터 시작하여 모든 요소에 대해 반복 실행되며
  //클릭 이벤트가 등록될 때의 index 값은 항상 0으로 설정됩니다.

  // for (let i = 0; i < moreHashtagBtn.length; i++) {
  //   console.log(i);
  //   moreHashtagBtn[i].addEventListener("click", () => {
  //     if (hashTagOpenFlag) {
  //       allHashTagWrapper.className = "menu_allHashtag";
  //       menuItems[i].prepend(allHashTagWrapper);

  //       shopData[i].hashtags.forEach((el) => {
  //         const hashtagItem = document.createElement("li");
  //         hashtagItem.innerText = el;
  //         allHashTagWrapper.appendChild(hashtagItem);
  //       });
  //     } else {
  //       //removeChild로 캐싱하는 방법 생각해보기
  //       while (allHashTagWrapper.firstChild) {
  //         allHashTagWrapper.firstChild.remove();
  //       }
  //       allHashTagWrapper.remove();
  //     }
  //     hashTagOpenFlag = !hashTagOpenFlag;
  //   });
  // }

  for (let i = 0; i < moreHashtagBtn.length; i++) {
    moreHashtagBtn[i].addEventListener("click", () => {
      console.log(i);
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
      hashTagOpenFlag = !hashTagOpenFlag;
    });
  }
});
