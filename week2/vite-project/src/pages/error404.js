function Error404($container) {
  this.$container = $container;

  this.render = () => {
    this.$container.innerHTML = `
              <main class="myPage">
                  <p>에러 페이지야</p>
              </main>
              `;
  };
  this.render();
}
export default Error404;
