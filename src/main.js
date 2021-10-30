document.addEventListener("DOMContentLoaded", () => {
    initialize()
});

/*   
    pre: called only when DOM content has loaded.
    post: constructs a map and two players, draws board and commanders.
*/
function initialize(){
    drawTemplate()
    map = new Map()
    player1 = new Player(1)
    player2 = new Player(2)
    drawUnits()
}

/*   
    param: x and y, the x and y coordinates of a click on the screen
    post: returns a value representing which canvas (board, cards, or actions) x and y correspond to.
*/
function canvasRounding(x, y){
    let section = 0
    if(x > 8 && x < 1408 && y > 8 && y < 608){
        section = 1
    }
    else if(x > 8 && x < 909 && y > 626 && y < 827){
        section = 2
    }
    else if(x > 914 && x < 1408 && y > 626 && y < 827){
        section = 3
    }
    console.log(section)
    return(section)
}

/*   
    param: x and y, the x and y coordinates of a click on the screen
    pre: assumes x and y correspond to the board canvas
    post: returns the tile that x and y correspond to.
*/
function tileRounding(x, y){
    roundedXCoordinate = Math.floor((x - 8)/40)
    roundedYCoordinate = Math.floor((y - 8)/40)
    console.log([roundedXCoordinate, roundedYCoordinate])
    return(map.tiles[roundedXCoordinate][roundedYCoordinate])
}

/*   
    param: x and y, the x and y coordinates of a click on the screen
    pre: assumes x and y correspond to the cards canvas
    post: returns the card that x and y correspond to.
*/
function cardRounding(x, y){
    //all cards [647 < y < 797]
    //card 1 [88 < x < 188]
    //card 2 [244 < x < 344]
    //card 3 [400 < x < 500]
    //card 4 [556 < x < 656]
    //card 5 [712 < x < 812]

    let cardNum = null

    if (y >= 647 && y <= 797) {                 //test y coord of click
        if (x >= 88 && x <= 188) {              //test x coord of click
            cardNum = 0                         //set cardNum to array value of card clicked
        }
        else if (x >= 244 && x <= 344){
            cardNum = 1
        }
        else if (x >= 400 && x <= 500){
            cardNum = 2
        }
        else if (x >= 556 && x <= 656){
            cardNum = 3
        }
        else if (x >= 712 && x <= 812){
            cardNum = 4
        }
    }
    console.log("cardNum = ", cardNum)
    
    let card = null
    if (turn == 1) {                             //check who's turn it is
        try {
            card = player1.hand.cards[cardNum]   //try to set card to the card clicked
        } catch (error) {
            console.log(error)                   //if an empty card is clicked, log error
        }
    } else if (turn == 2) {
        try {
            card = player2.hand.cards[cardNum]
        } catch (error) {
            console.log(error)
        }
    }
    console.log("card = ", card)
    return card
}

/*   
    param: x and y, the x and y coordinates of a click on the screen
    pre: assumes x and y correspond to the actions canvas
    post: returns the action that x and y correspond to.
*/
function actionRounding(x, y){
    //all actions [1003 < x < 1306]
    //action 1 [650 < y < 683]
    //action 2 [710 < y < 343]
    //action 3 [770 < y < 803]

    let actionNum = null
    let action = null
    if(x > 1003 && x < 1306){
        for(let i = 0; i < 3; i++){
            if(y > 650 + 60*i && y < 683 + 60*i){
                actionNum = i + 1
                if(unitSelected != null){                       //check whether there is currently a unit selected
                    action = unitSelected.actions[i]            //if so, set action to the action that has been clicked
                    console.log("actionNum = " + actionNum)
                    console.log("action = " + action.name)
                }
            }
        }
    }
    return(action)

}

/*   
    param: x and y, the x and y coordinates of a click on the screen
    pre: called only when a click has been registered by the click event listener.
    post: determines what section of the board has been clicked, checks gamestate variables if applicable, then performs the appropriate functionality.
*/
function clickProcessing(x, y){
    let canvasSection
    let target
    canvasSection = canvasRounding(x, y)            //check to see which section of the canvas the click has occurred in
    if(canvasSection == 1){                         //map area has been clicked
        target = tileRounding(x, y)                 //check which tile was clicked
        if(actionSelected == null){                 //if there is no action currently selected, select the tile and the unit on the tile
            tileSelected = target
            if(target.unit != null){                //checking if there is a unit on the tile
                unitSelected = target.unit
            }
        }
        else {
            if(action.validTarget(target)){
                executeAction(target)               //if there is an action currently selected, and if the selected tile is valid for that action, execute the action.
                drawUnits()                         //update board to show the outcome of the executed action
            }
        }
    drawActions()                                   //update board to show the actions associated with the selected unit
    }
    else if(canvasSection == 2){                    //if the card area has been clicked
        cardSelected = cardRounding(x, y)           //see which card was clicked
        if (cardSelected != null) {
            actionSelected = cardSelected.action    //if a valid card was selected, update actionSelected
        }
    }
    else if(canvasSection == 3){
        actionSelected = actionRounding(x, y)
    }
    
}

document.addEventListener("click", e => {
    console.log(e)
    console.log([e.x, e.y])
    clickProcessing(e.x, e.y)
})