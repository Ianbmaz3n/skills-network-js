class State {
    constructor() {        
        this.days = 0;
        this.first_aid = 0
        this.health = 0;
        this.food = 0;
        this.water = 70;
        this.age = 60;
        this.weather = "calm"
        this.skills = "";
        this.name = "";
        this.money = 0;
        this.distance_remaining =100 //nautical miles
    }

    update(name,value) {
        this[name] = value
        try {
            document.getElementById(name).innerHTML = value    
        } catch (error) {
            console.error(error);
        }
    }

    calc_score() {
        return this.health + this.money - this.days
    }
}

function add_computer_message(input_text) {
    add_message(input_text,"computer")
}

function add_player_message(input_text) {
    add_message(input_text,"user")
}

function clear_all_messages() {
    document.getElementById("Chat").innerHTML = ""        
}

function add_message(input_text,creator) {
    obj = document.getElementById("Chat")
    chat_box = document.createElement("p")
    chat_box.classList.add(creator + "_text")
    chat_box.innerHTML = input_text
    obj.append(chat_box)
    obj.scrollTo(0,obj.scrollHeight)
}

function typewriter(element, text, delay = 100) {
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        element.innerHTML += text[i];
      }, delay * i);
    }
  }

function update_image(image_id,path_to_image) {
    //use the image id to get the <img> object
    temp = document.getElementById(image_id)
    //set the src="path_to image" on the object
    temp.src = path_to_image
}

let game_state = new State()  

update_values()

function update_values() {
    for (const [key, value] of Object.entries(game_state)) {
        game_state.update(key,value);
    }
}

function start_game() {
    //function enter_details()
    add_computer_message("Add in your name and all that stuff","computer")
    //function buy_supplies()
    add_computer_message("Buy all your supplies and stuff","computer")
    add_computer_message("Start the loop for sailing","computer")
    start_day()
}

function end_game() {
    if (game_state.health <=0) {
        add_computer_message("Every day your families head to the docks to your arrival, but as time passes it becomes clear that something has gone disastrously wrong and you are never coming home.")
        add_computer_message("You have been lost at sea.")
        add_computer_message("GAME OVER")
    } else if (game_state.distance_remaining <=0) {
        add_computer_message("A cry of 'Land Ho' shatters dawn's early light as you are roused from your slumber. Sprinting to the deck you can just make our the smudge of land on the horrizon.")
        add_computer_message("It takes a few hours, but by noon you are docking, and the rest of the day is lost to a whirl of celebration and merriment")
        add_computer_message("CONGRATULATIONS you have made it")
        score = game_state.calc_score()
        add_computer_message(`Final Score: ${score}`)
    } else {
        add_computer_message("Something went wrong")
    }
    clear_buttons()
    add_button("Restart", restart_game)
}

function restart_game() {
    clear_all_messages()
    game_setup()
}

function fish() {
    game_state.update("food",game_state.food + 25)
    add_player_message("You catch some fish (+ 25 food)")
    start_day()
}

function row() {
    game_state.update("distance_remaining",Math.max(0,game_state.distance_remaining - 5))
    add_player_message("You spend the day rowing to reach your destination faster")
    start_day()
}

function new_day_recalc() {
    if (game_state.food <= 0 || game_state.water <= 0) {
        game_state.update("health", Math.max(0, game_state.health - 5))
    }
    game_state.update("days",game_state.days + 1)
    game_state.update("distance_remaining",Math.max(0,game_state.distance_remaining - 10))
    game_state.update("food",Math.max(0, game_state.food - 10))
    game_state.update("water",Math.max(0, game_state.water - 10))
}

function start_day() {
    if (game_state.distance_remaining > 0 && game_state.health > 0)  {
        new_day_recalc()
        add_computer_message(`It is day ${game_state.days} of your journey, the weather is ${game_state.weather}`)
        if (false) {
            //do random event
        } else {
            clear_buttons()
            add_button("fish",fish)
            add_button("row",row)            
        }
    } else {
        end_game()
    }
}

function add_button(text,func) {
    let button = document.createElement("button")
    button.innerHTML = text
    document.getElementById("Options").append(button)
    button.addEventListener ("click", func);
}

function prompt_box(text,value) {
    let input = prompt(text)
    game_state.update(value,input)
}

function clear_buttons() {
    document.getElementById("Options").innerHTML = ""
}

function stats_speed() {
    game_state.update("skills","speed")
    game_state.update("food",40)
    game_state.update("money",10000)
    game_state.update("health",50)
    shop()
}

function stats_luck() {
    game_state.update("skills","luck")
    game_state.update("food",100)
    game_state.update("money",20000)
    game_state.update("health",100)
    shop()
}

function stats_kindness() {
    game_state.update("skills","kindness")
    game_state.update("food",200)
    game_state.update("money",5000)
    game_state.update("health",50)
    shop()
}

function add_stats() {
    clear_buttons()
    add_button("Speed", stats_speed)    
    add_button("Luck", stats_luck)
    add_button("Kindness", stats_kindness)
}

function shop() {
    clear_buttons()
    add_button("Buy food (30g)", buy_food)
    add_button("Buy first aid (50g)", buy_aid)
    add_button("Buy 10 food (300g)", buy_food_ten)
    add_button("Buy 10 first aid (500g)", buy_aid_ten)
    add_button("Start Journey", start_game)
}

function buy_food() {
    if (game_state.money >= 30) {
        game_state.update("food",game_state.food + 1 )
        game_state.update("money",game_state.money - 30 )    
        add_player_message("You buy 1 food")
    } else {
        add_player_message("You don't have enough money to buy 1 food")
    }
}

function buy_aid() {
    if (game_state.money >= 50) {
        game_state.update("first_aid",game_state.first_aid + 1 )
        game_state.update("money",game_state.money - 50 )    
        add_player_message("You buy 1 first aid")
    } else {
        add_player_message("You don't have enough money to buy 1 first aid")
    }
}

function buy_food_ten() {
    if (game_state.money >= 300) {
        game_state.update("food",game_state.food + 10 )
        game_state.update("money",game_state.money - 300 )    
        add_player_message("You buy 10 food")
    } else {
        add_player_message("You don't have enough money to buy 10 food")
    }
}

function buy_aid_ten() {
    if (game_state.money >= 500) {
        game_state.update("first_aid",game_state.first_aid + 10 )
        game_state.update("money",game_state.money - 500 )    
        add_computer_message("You buy 10 first aid")
    } else {
        add_computer_message("You don't have enough money to buy 10 first aid")
    }
}

function start_button() {
    clear_buttons()
    add_button("Start the game", start_game)
}

function game_setup() {
    game_state = new State()
    update_values()
    prompt_box("What is your name, stranger?","name")
    prompt_box("How old are you?","age")
    add_computer_message(`It's nice to meet you ${game_state.name}`)
    add_computer_message(`Please choose which skills you will have.`)
    add_stats()
}