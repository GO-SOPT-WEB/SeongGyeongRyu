// 사진 미리보기
const photoDOM = document.querySelector("#menu-pic");
const preview = document.querySelector(".image-box");

photoDOM.addEventListener("change", () => {
  const reader = new FileReader();
  reader.onload = ({ target }) => {
    console.log(target);
    preview.src = target.result;
  };
  reader.readAsDataURL(photoDOM.files[0]);
});
