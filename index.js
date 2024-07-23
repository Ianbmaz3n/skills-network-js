class State {
    constructor() {
        this.health = 10;
        this.field1 = 0;
        this.field2 = 0;
        this.field3 = 0;
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

function initialise_game_state() {
    let game_state = new State()    
    for (const [key, value] of Object.entries(game_state)) {
        alert(`${key}: ${value}`);
      }
}   