let eventBus = new Vue()

Vue.component('cols', {
    template:`
    <div id="cols">
        <p class="error" v-for="error in errors">{{error}}</p>
        <newcard></newcard>
        <div class="col">
            <ul>
                <li v-for="card in column1"></li>
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
        changeModal() {
            this.addCard = !this.addCard
            console.log(this.addCard)
        }
    },
    mounted() {
        eventBus.$on('addColumn1', card => {
            if (this.column1.length < 3){
                this.column1.push(card)
            }
        })
        eventBus.$on('addColumn2', card => {
            this.column2.push(card)
        })
        eventBus.$on('addColumn3', card => {
            this.column3.push(card)
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

Vue.component('column1', {
    template: `
        <div class="column">
            <div class="card" v-for="card in column1">
                <note :card="card" :changeCompleted="changeCompleted"></note>
            </div>
        </div>
    `,
    props: {
        column1: {
            type: Array,
        },
        column2: {
            type: Array,
        },
    },
    methods: {
        changeCompleted(card) {
            let allTask = 0
            for(let i = 0; i < 5; i++){
                if (card.subtasks[i].title != null) {
                    allTask++
                }
            }
            if ((card.status / allTask) * 100 >= 50 && this.column2.length < 5) {
                eventBus.$emit('addColumn2', card)
                this.column1.splice(this.column1.indexOf(card), 1)
            }
        },
    },
})

Vue.component('column2', {
    template: `
        <div class="column">
            <div class="card" v-for="card in column2">
                <note :card="card" :changeCompleted="changeCompleted"></note>
            </div>
        </div>
    `,
    props: {
        column2: {
            type: Array,
        },
    },
    methods: {
        changeCompleted(card) {
            let allTask = 0
            for(let i = 0; i < 5; i++){
                if (card.task[i].title != null) {
                    allTask++
                }
            }
            if ((card.status / allTask) * 100 === 100) {
                eventBus.$emit('addColumn3', card)
                this.column2.splice(this.column2.indexOf(card), 1)
                card.date = new Date().toLocaleString();
            }
        }
    }
})

Vue.component('column3', {
    template: `
        <div class="column">
            <div class="card" v-for="card in column3">
                <note :card="card"></note>
            </div>
        </div>
    `,
    props: {
        column3: {
            type: Array
        }
    }
})

Vue.component('note', {
    template: `
        <div>
            <h2>{{card.title}}</h2>  
            <ul>
                <li
                    v-for="tsk in card.subtasks" 
                    v-if="tsk.title != null"
                    @click="tsk.completed = true, card.status += 1, changeCompleted(card)"
                    :class="{ completedTask: tsk.completed }"
                >{{tsk.title}}</li>
                <p>{{ card.date }}</p>
            </ul>
        </div>
    `,
    props: {
        card: {
            type: Object
        },
        changeCompleted: {
            type: Function
        },
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
            <input required id="subtask1" v-model="subtask1" maxlength="30" placeholder="subtask">
        </div>
        <div>
            <input required id="subtask2" v-model="subtask2" maxlength="30" placeholder="subtask">
        </div>
        <div>
            <input required id="subtask3" v-model="subtask3" maxlength="30" placeholder="subtask">
        </div>
        <div>
            <input  id="subtask4" v-model="subtask4" maxlength="30" placeholder="subtask">
        </div>
        <div>
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
