let numSq = 6;
let colors = [];
let pickedColor = pickColor();

const square = document.getElementsByClassName("squares");
const colorDispaly = document.querySelector("#colorDisplay");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

init();

function init(){
  setUpModeButtons();
  setUpSquares();
  reset();   
}

//mode buttons event listener
function setUpModeButtons(){  
    for(let i=0; i<modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");  
            this.classList.add("selected");
            this.textContent === "Easy" ? numSq = 3: numSq = 6;
            reset(); 
        });
    }
}

/* This function will set up the square blocks with random colors */
function setUpSquares(){
    for(let i = 0; i < square.length; i++){                                                     
        square[i].addEventListener("click",function() {       //add click event listeners to squares
            let clickedColor = this.style.backgroundColor;    //clicked square data(background color) will be passed to clickedColor whenever there is a click           
            if(clickedColor === pickedColor){                 //compare color to pick color
                messageDisplay.textContent = "Correct";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor; 
            }else{
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        }); 
    }
}

/* This function will reset the mode buttons and generate random colors */
function reset(){
    colors = generateRandomColors(numSq);               //generate all new colors
    pickedColor = pickColor();                          //pick a new random color from array
    colorDispaly.textContent = pickedColor;             //change colorDisplay to match picked Color
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    for(let i=0; i<square.length; i++){                 //change colors of squares
        if(colors[i]){
            square[i].style.display = "block";
            square[i].style.backgroundColor = colors[i];
        }else{
            square[i].style.display = "none";
        }  
    }
    h1.style.backgroundColor = "steelblue";
}

/* This function will call the reset() function */
resetButton.addEventListener("click", function(){
    reset();
});

/* This function will loop through all squares and change the colors of
 all the squares which has been pased the parameter 'color'*/
function changeColors(color){
    for(let i=0; i < square.length; i++){ 
        square[i].style.backgroundColor = color;
    }                    
}

/* This function will return a random number and selects any random color from the color array */
function pickColor(){
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];  
}

/* This function will generate an array consisting of random color*/
function generateRandomColors(num){
    let arr = [];  //make an array
    for(let i=0; i<num; i++){   // repeat num times
        arr.push(randomColor());
    }
    return arr;     //return the array
}

/* This function will generate random colors in RGB format*/
function randomColor(){
    let red = Math.floor(Math.random() * 256);    //pick a 'red' color from 0 - 255
    let green = Math.floor(Math.random() * 256);  //pick a 'green' color from 0 - 255
    let blue = Math.floor(Math.random() * 256);   //pick a 'blue' color from 0 - 255

    return `rgb(${red}, ${green}, ${blue})`;
}