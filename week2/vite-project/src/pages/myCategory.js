function MyCategory($container) {
  this.$container = $container;

  this.render = () => {
    this.$container.innerHTML = `
            <main class="myPage">
                <p>카테고리 페이지야</p>
            </main>
            `;
  };
  this.render();
}
export default MyCategory;
