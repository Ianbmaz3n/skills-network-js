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

function add_feed_box_computer(input_text) {
    obj = document.getElementById("Chat")
    chat_box = document.createElement("p")
    chat_box.innerHTML = input_text
    obj.append(chat_box)
}

function add_feed_box_player(input_text) {
    obj = document.getElementById("Chat")
    chat_box = document.createElement("p")
    chat_box.classList.add("user_text")
    chat_box.innerHTML = input_text
    obj.append(chat_box)
}

let game_state = new State()    

for (const [key, value] of Object.entries(game_state)) {
    game_state.update(key,value);
}
   