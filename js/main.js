let eventBus = new Vue()

Vue.component('cols', {
    template:`
    <div id="cols">
          <newcard></newcard>
          <div class="col">{{ column1 }}</div>
          <div class="col">{{ column2 }}</div>
          <div class="col">{{ column3 }}</div>
          
    </div>
    
`,
    data() {
        return {
            column1: [],
            column2: [],
            column3: [],
        }
    },
    methods: {

    },
    mounted() {
        eventBus.$on('card-submitted', card => {
            this.column1.push(card)
        })
    }
})

Vue.component('column', {
    template:`
    <div class="col">
        
    </div>
`,
})

Vue.component('cards', {
    template: `
    <div>
        
    </div>
    `,

})

Vue.component('newcard', {
    template: `
    <form class="addform" @submit.prevent="onSubmit">
        <p>
            <label for="title">Title</label>
            <input class="title" v-model="title" type="text" placeholder="title">
        </p>
        <div>
            <input class="checkbox" type="checkbox">
            <input class="subtask" v-model="subtasks" type="text" placeholder="subtask">
        </div>
        <div>
            <input class="checkbox" type="checkbox">
            <input class="subtask" v-model="subtasks" type="text" placeholder="subtask">
        </div>
        <div>
            <input class="checkbox" type="checkbox">
            <input class="subtask" v-model="subtasks" type="text" placeholder="subtask">
        </div>
        <button class="addsub">Add a subtask</button>
        <button type="submit">Add a card</button>
    </form>
    `,
    data() {
        return {
            title: null,
            subtasks: [],
        }
    },
    methods: {
        onSubmit() {
            let card = {
                title: this.title,
                subtasks: this.subtasks,
            }
            eventBus.$emit('card-submitted', card)
            this.title = null
            this.subtasks = null
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        name: 'NOTES!!!'
    },
    methods: {

    }
})
