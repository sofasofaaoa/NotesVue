let eventBus = new Vue()

Vue.component('cols', {
    template:`
    <div id="cols">
        <p class="error" v-for="error in errors">{{error}}</p>
        <newcard></newcard>
        <col1 :column1="column1"></col1>
        <col2 :column2="column2"></col2>
        <col3 :column3="column3"></col3>
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

    },
    mounted() {
        eventBus.$on('addColumn1', card => {
            this.errors = []
            if (this.column1.length < 3){
                this.column1.push(card)
            } else {
                this.errors.push('There should be no more than three cards in the first column')
            }
        })
        eventBus.$on('addColumn2', card => {
            this.errors = []
            if (this.column2.length < 5) {
                this.column2.push(card)
                this.column1.splice(this.column1.indexOf(card), 1)
            } else {
                this.errors.push("You can't edit the first column while there are 5 cards in the second")
            }
        })
        eventBus.$on('addColumn3', card => {
            this.column3.push(card)
            this.column2.splice(this.column1.indexOf(card), 1)
        })
    },
    computed: {

    }
})

Vue.component('col1', {
    template: `
        <div class="col">
            <div class="cards" v-for="card in column1">
                <p>{{card.title}}</p>
                <ul>
                    <li class="tasks" v-for="task in card.subtasks" 
                    v-if="task.title != null" 
                    @click="changeCompleted(card, task)" 
                    :class="{completed: task.completed}">
                        {{task.title}}
                    </li>
                </ul>
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
        card: {
            type: Object
        },
        errors: {
            type: Array
        }
    },
    methods: {
        changeCompleted(card, task) {
            task.completed = true
            card.status += 1
            let count = 0
            for(let i = 0; i < 5; i++){
                if (card.subtasks[i].title != null) {
                    count++
                }
            }
            console.log(card.status)
            console.log(count)
            if ((card.status / count) * 100 >= 50) {
                eventBus.$emit('addColumn2', card)

            }
        },
    },
})

Vue.component('col2', {
    template: `
        <div class="col">
            <div class="cards" v-for="card in column2">
                <p>{{card.title}}</p>
                <ul>
                    <li class="tasks" v-for="task in card.subtasks" 
                    v-if="task.title != null" 
                    @click="changeCompleted(card, task)" 
                    :class="{completed: task.completed}">
                        {{task.title}}
                    </li>
                </ul>
            </div>
        </div>
    `,
    props: {
        column2: {
            type: Array,
        },
        card: {
            type: Object
        }
    },
    methods: {
        changeCompleted(card, task) {
            task.completed = true
            card.status += 1
            let count = 0
            for(let i = 0; i < 5; i++){
                if (card.subtasks[i].title != null) {
                    count++
                }
            }
            if ((card.status / count) * 100 === 100) {
                eventBus.$emit('addColumn3', card)
                this.column2.splice(this.column2.indexOf(card), 1)
                card.date = new Date().toLocaleString();
            }
        }
    }
})

Vue.component('col3', {
    template: `
        <div class="col">
            <div class="cards" v-for="card in column3">
                <p>{{card.title}}</p>
                <ul>
                    <li class="tasks" v-for="task in card.subtasks" 
                    v-if="task.title != null" 
                    @click="changeCompleted(card, task)" 
                    :class="{completed: task.completed}">
                        {{task.title}}
                    </li>
                    <p>{{ card.date }}</p>
                </ul>
            </div>
        </div>
    `,
    props: {
        column3: {
            type: Array
        },
        card: {
            type: Object
        }
    }
})

Vue.component('newcard', {
    template: `
    <form class="addform" @submit.prevent="onSubmit">
        <p>
            <label for="title">Title</label>
            <input id="title" required v-model="title" maxlength="30" type="text" placeholder="title">
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
                eventBus.$emit('addColumn1', card)
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
