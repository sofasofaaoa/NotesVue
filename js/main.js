let eventBus = new Vue()

Vue.component('cols', {
    template:`
    <div id="cols">
        <p class="error" v-for="error in errors">{{error}}</p>
        <newcard></newcard>
        <div class="col">
            <ul>
                <li class="cards" v-for="card in column1"><p>{{ card.title }}</p>
                    <ul>
                        <li class="tasks" v-for="t in card.subtasks" v-if="t.title != null">
                            <input @click="newStatus1(card, t)"
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
                            <input @click="newStatus2(card, t)"
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
                <li class="cards" v-for="card in column3"><p>{{ card.title }}</p><p>{{ card.date }}</p>
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
        newStatus1(card, t) {
            t.completed = true
            let count = 0
            card.status = 0
            this.errors = []
            for (let i = 0; i < 5; i++) {
                if (card.subtasks[i].title != null) {
                    count++
                }
            }

            for (let i = 0; i < count; i++) {
                if (card.subtasks[i].completed === true) {
                    card.status++
                }
            }
            if (card.status/count*100 >= 50 && card.status/count*100 < 100 && this.column2.length < 5) {
                    this.column2.push(card)
                    this.column1.splice(this.column1.indexOf(card), 1)
            } else if (this.column2.length === 5) {
                this.errors.push('You need to complete card in the second column to add new card or complete card in the first column')
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 5; j++) {
                        if (this.card[i].subtasks[j].title != null) {
                            this.column1.card[i].subtasks[j].disabled = true
                        }
                    }
                }
            }

        },
        newStatus2(card, t) {
            t.completed = true
            let count = 0
            card.status = 0
            for (let i = 0; i < 5; i++) {
                if (card.subtasks[i].title != null) {
                    count++
                }
            }

            for (let i = 0; i < count; i++) {
                if (card.subtasks[i].completed === true) {
                    card.status++
                }
            }
            if (card.status/count*100 === 100) {
                this.column3.push(card)
                this.column2.splice(this.column2.indexOf(card), 1)
                card.date = new Date()
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
            },
            errors: {
                type: Array,
                required: false
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
                    status: 0,
                    errors: [],
                }
                eventBus.$emit('card-submitted', card)
                this.title = null
                this.subtask1 = null
                this.subtask2 = null
                this.subtask3 = null
                this.subtask4 = null
                this.subtask5 = null
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
