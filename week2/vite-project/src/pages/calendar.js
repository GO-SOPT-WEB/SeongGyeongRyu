function MyCalendar($container) {
  this.$container = $container;

  this.render = () => {
    this.$container.innerHTML = `
            <main class="calendarPage">
                <p>달력 페이지입니다</p>
            </main>
            `;
  };
  this.render();
}
export default MyCalendar;
