<template>
    <div class="board-container" :style="{height: this.boardHeight, width: this.boardWidth}">
        <transition name="fade">
            <div class="board">
                <div v-for="value in boardValues" :key="value"  class="board-item" :style="{width: this.cardSize}">
                    <div :class="{
                            toBack: toBack,
                            toFront: !toFront,
                            'board-item-card': true, 
                            head: true
                        }" :style="{background: colorCards}">
                        <p class="value">{{ value }}</p>
                    </div>
                    <div @click="compareCards" :class="{
                            toFront: toFront,
                            toBack: !toBack,
                            'board-item-card': true, 
                            back: true
                        }"></div>
                </div>
            </div>
        </transition>
        <div class="helpers"></div>
    </div>
</template>

<script>

import { getRandomInt } from '../helpers/helpers'

export default {
    name: 'Board',
    props: {
        board_cards: Array
    },
    data() {
        return {
            cards_selector: [],
            matches: 0,
            tries: 15,
            toBack: true,
            toFront: true,
            show_board: false,
            card_choose: new Audio('./pop.wav'),
            match: new Audio('./success.wav'),
            pass: new Audio('./pass.wav'),
            nomatch: new Audio('./nomatch.wav')
        }
    },
    mounted() {
        this.showCardsTime(5000);
    },
    computed: {
        boardValues() {
            let values = this.board_cards;
            let temporal = [];
            let array = [];
            let length = values.length * 2;
            
            for(let i in values) {
                temporal.push(values[i].value);
                temporal.push(values[i].result);
            }
            while(temporal.length > 0) {
                let random = getRandomInt(0, length);

                while(array[random] !== undefined) {
                    random = getRandomInt(0, length);
                }

                array[random] = temporal[0];
                temporal.shift();
            }
            console.log(array);
            return array;
        },
        colorCards() {
            const colors = [
                '#f93943ff',
                '#72a276ff',
                '#aa78a6ff',
                '#de9151ff',
                '#ed6a5aff',
                '#985f99ff',
                '#957186ff', 
                '#4281a4ff',
                '#e574bcff',
            ];

            return colors[getRandomInt(0, colors.length + 1)];
        },
        boardHeight() {
            console.log(this.board_cards.length);
            let height =  this.board_cards.length === 6 ? '450px'
                        :'600px';

            return height;
        },
        boardWidth() {
            return this.board_cards.length < 10 ? '80%' : '100%';
        },
        cardSize() {
            return this.board_cards.length < 10 ? '25%' : '20%';
        }
    },
    methods: {
        showCardsTime(time) {
            this.toFront = false;
            this.toBack = false;

            setTimeout(() => {
                this.toFront = true;
                this.toBack = true;
                this.$emit('start_time', true);
            }, time);
        },
        compareCards(e) {
            let board_item = e.target.parentNode;

            if(this.cards_selector.length < 2) {
                this.cards_selector.push(board_item);
                this.controlClassesCards(board_item.childNodes, true);
                this.card_choose.play();
                this.card_choose.currentTime = 0;
            }
            
            if(this.cards_selector.length === 2) {

                let cards_selected = [
                    this.cards_selector[0].childNodes,
                    this.cards_selector[1].childNodes
                ];

                let card_1 = cards_selected[0][0].innerText, card_2 = cards_selected[1][0].innerText;
                let verify_pair_1 = (Number(card_1) || Number(card_1) === 0) && !Number(card_2);
                let verify_pair_2 = (Number(card_2) || Number(card_2) === 0) && !Number(card_1);

                if(verify_pair_1 || verify_pair_2) {
                    let operation = !Number(card_1) && Number(card_1) !== 0 ? card_1 : card_2;
                    let result = Number(card_1) || Number(card_1) === 0 ? card_1 : card_2;
                    let find_operation = this.board_cards.find(item => item.value === operation);
                    if (find_operation.result === Number(result)) {
                        this.cards_selector[0].style.visibility = 'hidden';
                        this.cards_selector[1].style.visibility = 'hidden';

                        this.match.play();
                        this.match.currentTime = 0;

                        if(this.matches < 5) 
                            this.matches = this.matches + 1;
                        else
                            this.$emit('won_level', true)

                        this.cards_selector = [];

                    } else {
                        setTimeout(() => {
                        this.controlClassesCards(cards_selected[0], false);
                        this.controlClassesCards(cards_selected[1], false);

                        this.nomatch.play();
                        this.nomatch.currentTime = 0;

                        this.cards_selector = [];

                        this.tries = this.tries - 1;
                        this.$emit('tries', this.tries);
                        }, 500)
                    }
                } else {
                    setTimeout(() => {
                        this.controlClassesCards(cards_selected[0], false);
                        this.controlClassesCards(cards_selected[1], false);

                        this.nomatch.play();
                        this.nomatch.currentTime = 0;

                        this.cards_selector = [];

                        this.tries = this.tries - 1;
                        this.$emit('tries', this.tries);
                    }, 500)
                }

            }
        },
        controlClassesCards(box, toggler) {
            if(toggler) {
                box[0].classList.remove('toBack');
                box[1].classList.remove('toFront');
                box[0].classList.add('toFront');
                box[1].classList.add('toBack');
            } else {
                box[1].classList.remove('toBack');
                box[0].classList.remove('toFront');
                box[1].classList.add('toFront');
                box[0].classList.add('toBack');
            }
        }
    }
}
</script>

<style scoped>

.board-container {
    width: 100%;
    margin: auto;
}

.board-container .board {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.board-container .board .board-item {
    width: 25%;
    position: relative;
}

.board-container .board .board-item .board-item-card {
    width: 80%;
    height: 80%;
    position: absolute;
    border-radius: 10px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    transition: all ease .2s;
}

.board-container .board .board-item .back {
    background-color: var(--white);
    cursor: pointer;
}

.board-container .board .board-item .head {
    background-color: var(--celadon-blue);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    user-select: none;
}

.toBack {
    top: 6%;
    left: 6%;
    z-index: 900;
}

.toFront {
    z-index: 1000;
}

.board-container .board .board-item .back:hover {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
}

.fade-enter-active {
  animation: fade-in 1s;
}

.fade-leave-active {
  animation: fade-in 1s reverse;
}

@keyframes fade-in {
  from {
      opacity: 0;
  } to {
      opacity: 1;
  }
}
</style>
