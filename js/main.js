Vue.component('cols', {
    template:`
    <div id="cols">
          <column></column>
          <column></column>
          <column></column>
    </div>
`,
})

Vue.component('column', {
    template:`
    <div class="col">
        <h2>Col1</h2>
    </div>
`,
    data() {
        return {
            column
        }
    },
})

let app = new Vue({
    el: '#app',
    data: {
        name: 'NOTES!!!'
    }
})
