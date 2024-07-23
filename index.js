class State {
    constructor() {        
        this.meal_size = "Med";
        this.speed = "Fast";
        this.days = 0;
        this.health = 10;
        this.food = 100;
    }

    update(name,value) {
        this[name] = value
        try {
            document.getElementById(name).innerHTML = value    
        } catch (error) {
            console.error(error);
        }
    }

    create_fields() {
        
    }
}

let game_state = new State()    

for (const [key, value] of Object.entries(game_state)) {
    game_state.update(key,value);
}
   