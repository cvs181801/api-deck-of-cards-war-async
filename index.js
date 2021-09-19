//grab elements from the DOM
    //buttons:
    const dealBtn = document.querySelector(".btn__deal");
    const drawBtn = document.querySelector(".btn__draw");
    const discardBtn = document.querySelector(".btn__discard");
        //div's:
        const container = document.querySelector(".container");
        const resultDiv = document.querySelector(".resultDiv");
        const modalDiv = document.querySelector(".modal");
        const scoreDiv = document.querySelector(".score");
            //header:
            const header = document.querySelector("h1");
                //create card image elements:
                let card1Img = document.createElement('img');
                card1Img.style.alignItems = "center";
                card1Img.style.justifyContent = "center";
                let card2Img = document.createElement('img');
                card2Img.style.alignItems = "center";
                card2Img.style.justifyContent = "center";
                const card1ImgIndicator = document.createElement("div");
                const card2ImgIndicator = document.createElement("div");
                    //style the img indicators:
                    card1ImgIndicator.style.backgroundColor = "var(--robins-egg)";
                    card1ImgIndicator.style.height = "2.5em";
                    card1ImgIndicator.style.width = "2.5em";
                    card1ImgIndicator.style.border = ".8px solid grey";
                    card1ImgIndicator.style.borderRadius = "50%";
                    card1ImgIndicator.textContent = `You`;
                    card1ImgIndicator.style.textAlign = "center";
                    card1ImgIndicator.style.alignItems = "center";
                    card1ImgIndicator.style.color = "white";
                    card1ImgIndicator.style.fontFamily = "inherit";
                    card1ImgIndicator.style.fontSize = "2rem";
                    card1ImgIndicator.style.marginRight = ".5em";
                    card1ImgIndicator.classList.add("container__card1image-indicator");

                    card2ImgIndicator.style.backgroundColor = "var(--twilight)";
                    card2ImgIndicator.style.height = "2.5em";
                    card2ImgIndicator.style.width = "2.5em";
                    card2ImgIndicator.style.border = ".8px solid grey";
                    card2ImgIndicator.style.borderRadius = "50%";
                    card2ImgIndicator.textContent = `Computer`;
                    card2ImgIndicator.style.textAlign = "center";
                    card2ImgIndicator.style.alignItems = "center";
                    card2ImgIndicator.style.color = "white";
                    card2ImgIndicator.style.fontFamily = "inherit";
                    card2ImgIndicator.style.fontSize = "2rem";
                    card2ImgIndicator.style.marginLeft = ".5em";

    //create and append block elements for rendering purposes:
    let renderCardsLeft = document.createElement("p");
    const paragraph = document.createElement("p");
    const myScoreParagraph = document.createElement("p");
    scoreDiv.append(myScoreParagraph);
    const computersScoreParagraph = document.createElement("p");
    scoreDiv.append(computersScoreParagraph);
    const finalScoreParagraph = document.createElement("p");
    finalScoreParagraph.style.padding = ".2em";
    finalScoreParagraph.style.border = "2px solid yellow";
    modalDiv.append(finalScoreParagraph);
//create the final score image elements:
const roseImg = document.createElement("img");
const rosesImg = document.createElement("img");
const wiltedRoseImg = document.createElement("img");
const imageCredit = document.createElement("p");

//start the score keepers at 0:
let myScore = 0;
let computersScore = 0;
let deckId;

//create a way to get a new deck of cards from the deck of cards api.
    
    async function handleClickDeal() {
    const response = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        const data = await response.json()
        deckId = `${data.deck_id}`;
        console.log(data);
        let cardsLeft = data.remaining;
        renderCardsLeft.textContent = `Cards left: ${cardsLeft}`;
        resultDiv.append(renderCardsLeft);
    } //close handleClickDeal()

dealBtn.addEventListener("click", function(e) {
    e.preventDefault();
    handleClickDeal();
})

// discardBtn.addEventListener("click", function(e) {
//     e.preventDefault();
//     myScoreParagraph.textContent = "";
//     computersScoreParagraph. textContent = "";
//     paragraph.textContent = "";
//     discardBtn.classList.add("hidden");
//     drawBtn.classList.remove("hidden");
//     console.log(deckId);
//     let playerCardCode = data.cards[0].code;
//     let computerCardCode = data.cards[1].code;
//     console.log(playerCardCode);
//     console.log(computerCardCode); //https://apis.scrimba.com/deckofcards/api/deck/new/draw/?count=2   //`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/${discardPile}/add/?cards=${playerCardCode},${computerCardCode}`
//     fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/pile/discardPile/add/?cards=${playerCardCode},${computerCardCode}`)
//         .then(res => res.json())
//         .then((data) => {
//             console.log(data)
//             console.log(data.remaining)
//             card1Img.src = "";
//             card2Img.src = "";
//         })   
//     })

    drawBtn.addEventListener("click", async () => { 
            const result = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
            const data = await result.json()
            console.log(data)
            let cardsLeft = data.remaining;
            renderCardsLeft.textContent = `Cards left: ${cardsLeft}`;
            card1Img.src = `${data.cards[0].image}`;
            card2Img.src = `${data.cards[1].image}`;
            card1Img.src = `${data.cards[0].image}`
            container.append(card1Img);
            container.insertBefore(card1ImgIndicator, card1Img);
            console.log(`${data.cards[1].image}`)
            card2Img.src = `${data.cards[1].image}`;
            container.append(card2Img);
            container.append(card2ImgIndicator);
            determineWinner(data.cards[0].value, data.cards[1].value, cardsLeft);
          
       
    })//close the draw btn e listener
    
//})//close the discard btn e listener

//create a way to determine the winner. * for more possible solutions for the determineWinner function challenge, see bottom part of code.*
      //** function:
function determineWinner(card1, card2, cardsRemaining) {

if (cardsRemaining > 0) {
    myScoreParagraph.textContent = "";
    computersScoreParagraph. textContent = "";

    let valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]


    let playerCardValueIndex = valueOptions.findIndex((cardValue) =>  
        cardValue == card1
    );

    let computerCardValueIndex = valueOptions.findIndex((cardValue) =>
        cardValue == card2)

    console.log(playerCardValueIndex);
    console.log(computerCardValueIndex);

        if (playerCardValueIndex == computerCardValueIndex) {
            paragraph.textContent = `It's a tie!`;
            resultDiv.append(paragraph);
            myScore += 1;
            computersScore += 1;
            console.log("my score :", myScore);
            console.log("computer's score :", computersScore);
            myScoreParagraph.textContent = `You: ${myScore}`;
            computersScoreParagraph.textContent = `Computer: ${computersScore}`;
        } else if (playerCardValueIndex  > computerCardValueIndex) {
            paragraph.textContent = `You won this battle!`;
            resultDiv.append(paragraph);
            myScore += 1;
            myScoreParagraph.textContent = `You: ${myScore}`;
            computersScoreParagraph.textContent = `Computer: ${computersScore}`;
            console.log("my score :", myScore);
            console.log("computer's score :", computersScore);
        } else {
            paragraph.textContent = `The computer won this battle...`;
            resultDiv.append(paragraph);
            computersScore += 1;
            computersScoreParagraph.textContent = `Computer: ${computersScore}`;
            myScoreParagraph.textContent = `You: ${myScore}`;
            console.log("my score :", myScore);
            console.log("computer's score :", computersScore);
        } 
    } else {
        if (myScore > computersScore) {
            clearElementRenders();
            finalScoreParagraph.textContent = `You won the war!`;
            modalDiv.style.border = "2px solid white";
            roseImg.src = "/Users/casvalkyriespicer/Documents/GitHub/api-deck-of-cards-war/pics/rose.jpeg";
            modalDiv.append(roseImg);
            imageCredit.textContent = `medium: <a>https://www.pexels.com/photo/close-photography-of-red-and-pink-rose-56866/</a>`;
        } else if (computersScore > myScore) {
            clearElementRenders();
            finalScoreParagraph.textContent = `The computer won this war.  Better luck next time...`;
            modalDiv.style.border = "2px solid white";
            wiltedRoseImg.src = "/Users/casvalkyriespicer/Documents/GitHub/api-deck-of-cards-war/pics/wiltedrose.jpeg";
            modalDiv.append(wiltedRoseImg);
            imageCredit.textContent = `medium: <a>https://www.pexels.com/photo/shabby-rose-with-scattered-petals-around-4041333/</a>`
        } else {
            clearElementRenders();
            finalScoreParagraph.textContent = `This war had no clear winner - it was a tie.`
            modalDiv.style.border = "2px solid white";
            rosesImg.src = "/Users/casvalkyriespicer/Documents/GitHub/api-deck-of-cards-war/pics/wiltedrose.jpeg";
            modalDiv.append(rosesImg);
            imageCredit.textContent = `medium: <a>https://www.pexels.com/photo/crop-woman-demonstrating-twig-of-red-roses-7700232/</a>`
        }
    }
} //close function determineWinner()

function clearElementRenders() {
    card1ImgIndicator.classList.add("hidden");
    card2ImgIndicator.classList.add("hidden");
    header.textContent = "";
    renderCardsLeft.textContent = "";
    card1Img.src = "";
    card2Img.src = "";
    discardBtn.classList.add("hidden");
    drawBtn.classList.add("hidden");
    myScoreParagraph.textContent = "";
    computersScoreParagraph. textContent = "";
}

card1ImgIndicator.addEventListener("mouseover", function(e) {
    e.preventDefault();
    //card1Img.style.border = "2px solid var(--robins-egg)";
    //card1Img.style.borderRadius = "10px";
    card1ImgIndicator.style.transform = "rotate(-180deg) scale(2)";
    //card1ImgIndicator.style.backgroundColor = "rgba(247, 34, 52, .5)";
    card1ImgIndicator.style.zIndex = "1000";
    card1ImgIndicator.style.opacity = ".8";
})

card1ImgIndicator.addEventListener("mouseout", function(e) {
    e.preventDefault();
    card1ImgIndicator.style.transform = "rotate(180deg) scale(1)";
    card1ImgIndicator.style.zIndex = "1000";
})

card2ImgIndicator.addEventListener("mouseover", function(e) {
    e.preventDefault();
    //card2Img.style.border = "2px solid var(--twilight)";
    //card2Img.style.borderRadius = "10px";
    card2ImgIndicator.style.transform = "rotate(-180deg) scale(2)";
    //card2ImgIndicator.style.backgroundColor =  "rgba(208, 250, 92, .5)";
    card2ImgIndicator.style.zIndex = "1000";
    card2ImgIndicator.style.opacity = ".8";
})

card2ImgIndicator.addEventListener("mouseout", function(e) {
    e.preventDefault();
    card2ImgIndicator.style.transform = "rotate(180deg) scale(1)";
    card2ImgIndicator.style.zIndex = "1000";
})

