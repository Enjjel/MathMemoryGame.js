<template>
    <div class="configuration-container">
        <div class="configuration-group">
            <p class="title">Difficulty</p>
            <div class="options">
                <div class="option">
                    <input type="radio" value="Easy" id="easy" v-model="difficulty" />
                    <label for="easy">Easy</label>
                </div>
                <div class="option">
                    <input type="radio" value="Medium" id="medium" v-model="difficulty" />
                    <label for="medium">Medium</label>
                </div>
                <div class="option">
                    <input type="radio" value="Hard" id="hard" v-model="difficulty" />
                    <label for="hard">Hard</label>
                </div>
            </div>
        </div>

        <div class="configuration-group">
            <p class="title">Board Size</p>
            <div class="options">
                <div class="option">
                    <input type="radio" value="12" id="twelve" v-model="board_size" />
                    <label for="twelve">12</label>
                </div>
                <div class="option">
                    <input type="radio" value="16" id="sixteen" v-model="board_size"/>
                    <label for="sixteen">16</label>
                </div>
                <div class="option">
                    <input type="radio" value="20" id="twenty" v-model="board_size" />
                    <label for="twenty">20</label>
                </div>
            </div>
        </div>

        <div class="configuration-group">
            <p class="title">Time Mode</p>
            <div class="options">
                <div class="option">
                    <input type="radio" value="Timeout" id="timeout" v-model="time_mode" />
                    <label for="timeout">Timeout</label>
                </div>
                <div class="option">
                    <input type="radio" value="Medium" id="chronometer" v-model="time_mode" />
                    <label for="chronometer">Chronometer</label>
                </div>
            </div>
        </div>
        <button class="btn" @click="sendData" >PLAY</button>
    </div>
</template>

<script>
export default {
    name: 'Configuration',
    data() {
        return {
            difficulty: '',
            board_size: '',
            time_mode: '',
        }
    },
    methods: {
        sendData() {
            let dif =       this.difficulty === 'Easy' ? 0
                        :   this.difficulty === 'Medium' ? 1
                        :   2;

            this.$emit('configuration', {
                difficulty: dif,
                board_size: this.board_size,
                time_mode: this.time_mode
            })
        }
    }
}
</script>


<style scoped>
.configuration-container {
    width: 25%;
    text-align: center;
    margin: auto;
}

.configuration-container .configuration-group {
    margin-bottom: 1rem;
    text-align: center;
}

.configuration-container .title {
    font-size: 1.5em;
    margin: 0 0 1rem 0;
}

.configuration-container .options {
    width: 60%;
    margin: auto;
    display: flex;
    flex-direction: column;
    text-align: left;
}

label {
    font-size: 1.125em;
    margin-left: 0.5em;
}

.btn {
    margin-top: 1rem;
    padding: 0.5rem 2rem;
    background: transparent;
    border: 2px solid var(--white);
    border-radius: 30px;
    color: var(--white);
    cursor: pointer;
    transition: all ease .2s;
}

.btn:hover {
    background-color: var(--white);
    color: var(--eerie-black);
}

</style>