
class Unit{
    constructor(symbol, description, actions, triggers, playerID){
        this.symbol = symbol
        this.description = description
        this.actions = actions
        this.triggers = triggers
        this.playerID = playerID
    }
}

/*
function unit_template(){
    let symbol = ""
    let description = "Unit description goes here"

    let actions = []

    let triggers = []

    let unit = new Unit(symbol, description, actions, triggers)    
    return unit
}
*/

function unit_guardTower(playerID){
    let symbol = "GT"
    let description = "Our enemies would do well to avoid the archer's prying eyes"

    let actions = []

    let triggers = []

    let unit = new Unit(symbol, description, actions, triggers, playerID)
    return unit 
}

function unit_knight(playerID){
    let symbol = "Kn"
    let description = "There is fire in his eyes, and his steed paws at the dirt readily"

    let actions = []
    actions[0] = action_knightMove()
    actions[1] = action_knightCharge()

    let triggers = []

    let unit = new Unit(symbol, description, actions, triggers, playerID)    
    return unit
}