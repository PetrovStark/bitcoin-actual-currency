var notice = (function () {
    Vue.component('notice', {
      props: ['status'],
      template: `
          <article class="message" :class="status">
              <div class="message-header">
                <p><slot></slot></p>
              </div>
          </article>
      `
    });
});

export default notice;
