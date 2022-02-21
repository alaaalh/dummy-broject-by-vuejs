function getRandomValue (max , min){
    return Math.floor(Math.random() * (max - min)) + min 
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound : 0,
            winner: null
        }
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                //draw
                this.winner = 'draw'
            }else if (value <= 0){
                //player lose
                this.winner = 'monster'
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                //draw
                this.winner = 'draw'
            }else if(value <= 0){
                // player win
                this.winner = 'player'
            }
        },
       
    },
    computed: {
        
        monsterBarStyles(){
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0
        }
    },
    methods: {
        startGame(){
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.counterRound = 0,
            this.winner = null
        },
        attackMonster (){
            this.currentRound++
            const attackValue = getRandomValue(12 , 5) 
            this.monsterHealth -= attackValue
            this.attackPlayer()
        },
        attackPlayer (){
            const attackValue = getRandomValue(15 , 8)
            this.playerHealth -= attackValue
        },
        specialAttackMonster() {
            this.currentRound++
            const attackValue = getRandomValue(25 , 15)
            this.monsterHealth -= attackValue
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++
            const healValue = getRandomValue(20 , 8)
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100
            }else{
                this.playerHealth += healValue
            }
            this.attackPlayer();
        }
    },
})

app.mount('#game')