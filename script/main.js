new Vue({
  el: '#app',
  data: {
    healthPlayer: 100,
    healthMonster: 100,
    logDamage: [],
    counter: 3,
    gameIsRunning: false,
  },
  methods: {
    attack(){
      if (this.healthPlayer > 0 && this.healthMonster > 0){
        this.whoAttack ('player', ( Math.floor(Math.random() * 10) + 1) );
        this.whoAttack ('monster', this.monsterAtk() );
        this.whoWin();
        this.counter--;
      }
    },
    whoAttack(who,dmg,heal){
      // Remove Health
      who == 'player' ? (this.healthMonster -= dmg) : (this.healthPlayer -= dmg);
      // Save atk Log
      this.logDamage.unshift({
        type: (who + '-turn'),
        damage: dmg,
        text: (who.toUpperCase() + ' HITS THE ' + (who == "player" ? 'MONSTER' : 'PLAYER') + ' FOR ' + dmg + '%'),
      });
      if(heal){
        this.logDamage[0].text = 'PLAYER HEAL FOR ' + (dmg * -1) + '%';
        this.logDamage[0].type = "player-turn";
      }
    },
    whoWin(){
      // Send Alert when someone win
      if (this.healthPlayer <= 0){
        this.gameIsRunning = false;
        setTimeout(function(){
          alert ('Player Lose');
        },500) 
      } else if (this.healthMonster <= 0){
          this.gameIsRunning = false;
          setTimeout(function(){
            alert ('Monster Lose');
        },500) 
      };
    },
    specialAtk(){
      if (this.counter <= 0){
        this.whoAttack ('player', 20 );
        this.whoAttack ('monster', this.monsterAtk() );
        this.whoWin();
        this.counter = 3;
      } else {
        alert ('You must wait ' + (this.counter) + ' turn before do this special atk');
      }
    },
    heal(){
      if (this.healthPlayer < 100){
        this.whoAttack ('monster', ( Math.floor(Math.random() * 15) * -1),heal);
        this.whoAttack ('monster', this.monsterAtk() );
        this.whoWin();
      } else {
        alert('Your Healt is already full')
      }
    },
    newGame(){
      this.reset('Try to beat the monster, good luck');
      this.gameIsRunning = true;
    },
    giveUp(){
      this.reset('Monster Win');
      this.gameIsRunning = false;
    },
    reset (text){
      this.logDamage = [];
      this.healthPlayer = 100;
      this.healthMonster = 100;
      this.counter = 3;
      alert(text);
    },
    monsterAtk(){
      return (Math.floor(Math.random() * 15) + 2);
    }
  }
})