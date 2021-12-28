<template>
  <div class="container">
    <p class="title">Math Memory</p>
    <Configuration
    v-show="conf"
    @configuration="getBoardValues"/>
    <GameValues 
    :tries="tries"
    :level="level + 1"
    :startTime="start_time"
    @timeout="timeOut" 
    v-if="play"
    />
    <Board 
    :board_cards="cards_array[level]" 
    @tries="getTries" 
    @won_level="isWon"
    @start_time="timeControl"
    :key="boardKey"
    v-if="play"
    />
    <!-- <button @click="getBoardValues(0, 12)">test</button> -->
  </div>
</template>

<script>
import GameValues from './components/GameValues.vue';
import Board from './components/Board.vue';
import Configuration from './components/Configuration.vue';

export default {
  name: 'App',
  components: {
    GameValues,
    Board,
    Configuration
  },
  data() {
    return {
      cards_array: [],
      difficulty: 0,
      level: 0,
      tries: 15,
      boardKey: 0,
      start_time: false,
      play: false,
      conf: true
    }
  },
  computed: {
    containerWidth() {
        console.log(this.cards_array);
        return this.cards_array.length < 10 ? '600px' : '750px';
    },
  },
  methods: {
    async getBoardValues(conf) {
      const result = await fetch(`http://localhost:4000/game?difficulty=${conf.difficulty}&board_cards=${conf.board_size}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
      });

      let values = await result.json();
      this.cards_array = values.cards;
      this.play = true;
      this.conf = false;
    },
    reRenderBoard() {
      this.boardKey += 1;
    },
    getTries(tries) {
      this.tries = tries;

      if(tries === 0) {
        this.tries = 15;
        this.start_time = false;  
        
        //return to main menu
        this.conf = true;
        this.play = false;
      }
    },
    isWon(won) {
      if(won) {
        this.level += 1;
        this.start_time = false;
        this.reRenderBoard();
      }
    },
    timeControl(time) {
      this.start_time = time;
    },
    timeOut(time) {
      if(time) {
        this.tries = 15;
        this.start_time = false;
        
        //return to main menu
        this.conf = true;
        this.play = false;
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Dongle:wght@300;400;700&family=Oswald:wght@200;300;400&display=swap');

:root {
  --eerie-black: #16171bff;
  --white: #fbfbfbff;
  --red-salsa: #f93943ff;
  --forest-green-crayola: #72a276ff;
  --african-violet: #aa78a6ff;
  --persian-orange: #de9151ff;
  --terra-cotta: #ed6a5aff;
  --french-lilac: #985f99ff;
  --mountbatten-pink: #957186ff;
  --celadon-blue: #4281a4ff;
  --sky-magenta: #e574bcff;
  --yellow-crayola: #ffeb80ff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

body {
  background-color: var(--eerie-black);
  color: var(--white);
  font-family: 'Oswald', sans-serif;
}

.container {
  width: 90%;
  max-width: 750px;
  margin: 60px auto;
  text-align: center  ;
}

.container .title {
    font-size: 1.2em;
    margin-bottom: 2rem;
}

</style>
