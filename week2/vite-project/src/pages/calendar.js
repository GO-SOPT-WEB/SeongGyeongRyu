function MyCalendar($container) {
  this.$container = $container;

  this.render = () => {
    this.$container.innerHTML = `
    <section class="calendar">
    <article class="calendar__day">
      <p>월</p>
      <time class="calendar__date" datetime="2023-04-03">3</time>
    </article>
    <article class="calendar__day">
      <p>화</p>
      <time class="calendar__date" datetime="2023-04-04">4</time>
    </article>
    <article class="calendar__day today">
      <p>수</p>
      <time class="calendar__date" datetime="2023-04-05">5</time>
    </article>
    <article class="calendar__day">
      <p>목</p>
      <time class="calendar__date" datetime="2023-04-06">6</time>
    </article>
    <article class="calendar__day">
      <p>금</p>
      <time class="calendar__date" datetime="2023-04-07">7</time>
    </article>
    <article class="calendar__day">
      <p>토</p>
      <time class="calendar__date" datetime="2023-04-08">8</time>
    </article>
    <article class="calendar__day">
      <p>일</p>
      <time class="calendar__date" datetime="2023-04-09">9</time>
    </article>
  </section>
            `;
  };
  this.render();
}
export default MyCalendar;
