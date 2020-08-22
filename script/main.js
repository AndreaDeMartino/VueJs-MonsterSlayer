new Vue({
  el: '#app',
  data: {
    healthPlayer: 100,
    healthMonster: 100,
    logDamage: [],
    counter: 3,
  },
  methods: {
    attack (){
      if (this.healthPlayer > 0 && this.healthMonster > 0){
        this.whoAttack ('player', ( Math.floor(Math.random() * 10) + 1) );
        this.whoAttack ('monster', ( Math.floor(Math.random() * 10) + 1) );
        this.whoWin();
        this.counter--;
      }
    },
    whoAttack (who,dmg,heal){
      // Remove Health
      who == 'player' ? (this.healthMonster = this.healthMonster - dmg) : (this.healthPlayer = this.healthPlayer - dmg);
      // Save atk Log
      this.logDamage.push({
        type: (who + '-turn'),
        damage: dmg,
        text: (who.toUpperCase() + ' HITS THE ' + (who == "player" ? 'MONSTER' : 'PLAYER') + ' FOR ' + dmg + '%'),
      });
      if(heal){
        this.logDamage[this.logDamage.length -1].text = 'PLAYER HEAL FOR ' + (dmg * -1) + '%';
        this.logDamage[this.logDamage.length -1].type = "player-turn";
      }
    },
    whoWin (){
      // Send Alert when someone win
      if (this.healthPlayer <= 0){
        setTimeout(function(){
          alert ('Player Lose');
        },500) 
      } else if (this.healthMonster <= 0){
          setTimeout(function(){
            alert ('Monster Lose');
        },500) 
      };
    },
    specialAtk (){
      if (this.counter <= 0){
        this.whoAttack ('player', 20 );
        this.whoAttack ('monster', ( Math.floor(Math.random() * 10)) + 1 );
        this.whoWin();
        this.counter = 3;
      } else {
        alert ('You must wait ' + (this.counter) + ' turn before do this special atk');
      }
    },
    heal (){
      if (this.healthPlayer < 100){
        this.whoAttack ('monster', ( Math.floor(Math.random() * 10) * -1),heal);
        this.whoAttack ('monster', ( Math.floor(Math.random() * 10)) + 1 );
        this.whoWin();
      } else {
        alert('Your Healt is already full')
      }
    },
    newGame() {
      this.reset('Good Luck');
    },
    giveUp() {
      this.reset('Monster Win');
    },
    reset (text){
      this.logDamage = [];
      this.healthPlayer = 100;
      this.healthMonster = 100;
      this.counter = 3;
      alert(text);
    },
  }
})