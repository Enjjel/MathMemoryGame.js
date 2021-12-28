<template>
    <div class="game-values-container">
        <div class="game-values">
            <div class="game-value">
                <p class="value">{{ this.level }}</p>
                <p class="value-title">LEVEL</p>
            </div>
            <div class="game-value">
                <p class="value">{{this.minutes_p}}:{{this.seconds_p}}</p>
                <p class="value-title">TIME</p>
            </div>
            <div class="game-value">
                <p class="value">{{ this.tries }}</p>
                <p class="value-title">TRIES</p>
            </div>
        </div>
    </div>
</template>

<script>
import { watchDigits } from '../helpers/helpers';
 
export default {
    name: 'GameValues',
    props: {
        level: Number,
        tries: Number,
        startTime: Boolean
    },
    data() {
        return {
            minutes: 0,
            seconds: 30,
            minutes_p: '00',
            seconds_p: '30',
            timer: function(){}
        }
    },
    mounted() {
    },
    watch: {
        tries(){},
        startTime() {
            this.timeControl();
        }
    },
    methods: {
        timeControl() {
            if(this.startTime === true) {
                this.timer = setInterval(() => {
                    if(this.seconds > 0) {
                        this.seconds -= 1;
                    } else if(this.seconds === 0 && this.minutes > 0) {
                        this.minutes -= 1;
                        this.seconds = 60;
                    }

                    if(this.minutes === 0 && this.seconds === 0) {
                        this.$emit('timeout', true);
                        this.minutes = 0;
                        this.seconds = 30;
                    }

                    this.minutes_p = watchDigits(this.minutes);
                    this.seconds_p = watchDigits(this.seconds);
                }, 1000);
            } else {
                clearInterval(this.timer);
                this.minutes = 0;
                this.seconds = 30;

                this.minutes_p = watchDigits(this.minutes);
                this.seconds_p = watchDigits(this.seconds);
            }
        }
    }
}
</script>

<style scoped>
.game-values-container {
    width: 100%;
    margin-bottom: 2rem;
    text-align: center;
}

.game-values-container .game-values {
    width: 70%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.game-values-container .game-values .game-value {
    width: 33%;
    display: flex;
    flex-direction: column;
}

.game-values-container .game-values .game-value .value {
    font-size: 2em;
}

.game-values-container .game-values .game-value .value-title {
    font-weight: 300;
    font-size: 1em;
}

</style>
