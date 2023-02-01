let eventBus = new Vue()

Vue.component('cols', {
    template:`
    <div id="cols">
        <p class="error" v-for="error in errors">{{error}}</p>
        <newcard></newcard>
        <div class="col">
            <ul>
                <li class="cards" v-for="card in column1"><p>{{ card.title }}</p><p>{{ card.status }}</p>
                    <ul>
                        <li class="tasks" v-for="t in card.subtasks" v-if="t.title != null">
                            <input @click="t.completed = true"
                            class="checkbox" type="checkbox"
                            :disabled="t.completed">
                            <p :class="{completed: t.completed}">{{t.title}}</p>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="col">
            <ul>
                <li class="cards" v-for="card in column2"><p>{{ card.title }}</p>
                    <ul>
                        <li class="tasks" v-for="t in card.subtasks" v-if="t.title != null">
                            <input @click="t.completed = true" 
                            class="checkbox" type="checkbox"
                            :disabled="t.completed">
                            <p :class="{completed: t.completed}">{{t.title}}</p>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="col">
            <ul>
                <li class="cards" v-for="card in column3"><p>{{ card.title }}</p><p>{{ card.status }}</p><p>{{ card.date }}</p>
                    <ul>
                        <li class="tasks" v-for="t in card.subtasks" v-if="t.title != null">
                            <input @click="t.completed = true" 
                            @click="newStatus"
                            class="checkbox" type="checkbox"
                            :disabled="t.completed">
                            <p :class="{completed: t.completed}">{{t.title}}</p>
                            
                        </li>
                        
                    </ul>
                </li>
            </ul>
        </div>
    </div>
`,
    data() {
        return {
            column1: [],
            column2: [],
            column3: [],
            errors: []
        }
    },
    methods: {
        newStatus(id) {
            let count = 0
            let comtask = 0
            for (let i; i < 5; i++) {
                count += 1
                if (this.column1.card.subtasks.completed === true) {
                    comtask += 1
                }
            }
            if (comtask/count*100 >= 50) {
                this.column1.card.status = 1
                this.column2.push(id)
                this.column1.pop(id)
            } else if (comtask/count*100 === 100) {
                this.column1.card.status = 2
                this.column3.push(id)
                this.column2.pop(id)
                this.column3.card.date = new Date()
            }
        }
    },
    mounted() {
        eventBus.$on('card-submitted', card => {
            this.errors = []
            if (this.column1.length < 3){

                this.column1.push(card)
            } else {
                this.errors.push("You can't add a new card now.")
            }
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
                completed: {
                    type: Boolean,
                    required: true
                }
            },
            date: {
                type: Date,
                required: false
            },
            status: {
                type: Number,
                required: true
            }
        },

    },
    computed: {

    }
})


Vue.component('newcard', {
    template: `
    <form class="addform" @submit.prevent="onSubmit">
        <p>
            <label for="title">Title</label>
            <input class="title" required v-model="title" maxlength="30" type="text" placeholder="title">
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
            errors: [],
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
                                {title: this.subtask5, completed: false}],
                    date: null,
                    status: 0
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
