// 1. 사진 미리보기
const photoDOM = document.querySelector("#menu__pic");
const preview = document.querySelector(".menu__img");

//FileReader : 비동기적으로 동작
//reader에 파일 객체가 load 된 이후에 src 값이 변경 되도록 onLoad 이벤트를 이용한다
photoDOM.addEventListener("change", () => {
  const reader = new FileReader();

  //FileReader 객체의 readAsDataURL 메소드를 이용하여 인자로 전달받은 File 객체를 base64 형태의 문자열로 변환한다.
  //이렇게 변환된 문자열은 img 태그의 src 값으로 사용할 수 있다.
  reader.readAsDataURL(photoDOM.files[0]);

  //FileReader.onload() : load 이벤트의 핸들러. 이 이벤트는 읽기 동작(readAdDataURL)이 성공적으로 완료되었을 때마다 발생한다.
  //비동기이므로 콜백함수를 이용하는 것이 좋다!
  reader.onload = ({ target }) => {
    //event.target을 구조분해할당을 통해 {target}으로 받아옴
    preview.src = target.result;
  };
});

/*
photoDOM, 즉 이벤트가 일어난 대상(e.target)인 input 아래 files에 어떤 파일들을 올렸는지가 유사배열(배열처럼 생겼지만 배열은 아닌 객체)로 나온다.
0번 키에 file 객체가 들어있는데, 이를 base 64 문자열로 바꾸는 것
하지만 이 file 객체에는 파일에 대한 정보는 들어있지만 "파일 데이터 자체"가 들어있지 않아서 fileReader를 이용해서 파일 자체를 가져오는 것이다.
그리고 그 파일을 읽는 방법은 readAsText, readAsDataURL, readAsArrayBuffer, readAsBinaryString 이렇게 4가지가 있는데
우리는 src에 넣어주기 위해서 readAsDataUrl을 통해 base64로 인코딩을 하는 것이다.
*/

// 2. 사진 미리보기
const menuForm = document.querySelector(".menu__form");
const menuNameInput = document.querySelector("#menu__name");
const menuHashtagInput = document.querySelector("#menu__hashtag");
const menuPictureInput = document.querySelector("#menu__pic");
const menuCategorySelect = document.querySelector("#menu__category");

const handleMenuSubmit = (event) => {
  event.preventDefault();

  const menuName = menuNameInput.value;
  const menuHashtags = menuHashtagInput.value.split(",");
  const menuCategory = menuCategorySelect.value;
  //   const menuPicture = menuPictureInput.value;

  localStorage.setItem(
    "newMenu",
    JSON.stringify({
      addedCategory: menuCategory,
      addedName: menuName,
      addedHashtags: menuHashtags,
    })
  );
};

menuForm.addEventListener("submit", handleMenuSubmit);
