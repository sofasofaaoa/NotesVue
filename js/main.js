let eventBus = new Vue()

Vue.component('cols', {
    template:`
    <div id="cols">
        <newcard></newcard>
        <div class="col">
            <ul>
                <li class="cards" v-for="card in column1" ><p>{{ card.title }}</p>
                    <div>
                        <ul>
                            <li class="tasks" v-for="t in card.subtasks" v-if="t.title != null">
                                <input class="checkbox" type="checkbox">
                                <p>{{t.title}}</p>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
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
    },
    props: {
        card: {
            title: {
                type: Text,
                required: true
            },
            subtasks: {
                type: Array,
                required: true,
            }
        },

    }
})


Vue.component('newcard', {
    template: `
    <form class="addform" @submit.prevent="onSubmit">
        <p>
            <label for="title">Title</label>
            <input class="title" v-model="title" maxlength="30" type="text" placeholder="title">
        </p>
        <div>
            <input class="checkbox" type="checkbox">
            <input required id="subtask1" v-model="subtask1" maxlength="30" placeholder="subtask">
        </div>
        <div>
            <input class="checkbox" type="checkbox">
            <input required id="subtask2" v-model="subtask2" maxlength="30" placeholder="subtask">
        </div>
        <div>
            <input class="checkbox" type="checkbox">
            <input required id="subtask3" v-model="subtask3" maxlength="30" placeholder="subtask">
        </div>
        <div>
            <input class="checkbox" type="checkbox">
            <input  id="subtask4" v-model="subtask4" maxlength="30" placeholder="subtask">
        </div>
        <div>
            <input class="checkbox" type="checkbox">
            <input  id="subtask5" v-model="subtask5" maxlength="30" placeholder="subtask">
        </div>
        <button type="submit">Add a card</button>
    </form>
    `,
    data() {
        return {
            title: null,
            subtask1: null,
            subtask2: null,
            subtask3: null,
            subtask4: null,
            subtask5: null,
        }
    },
    methods: {
        onSubmit() {
            let card = {
                title: this.title,
                subtasks: [{title: this.subtask1, completed: false},
                            {title: this.subtask2, completed: false},
                            {title: this.subtask3, completed: false},
                            {title: this.subtask4, completed: false},
                            {title: this.subtask5, completed: false}]
            }
            eventBus.$emit('card-submitted', card)
            this.title = null
            this.subtask1 = null
            this.subtask2 = null
            this.subtask3 = null
            this.subtask4 = null
            this.subtask5 = null
            console.log(card)
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
