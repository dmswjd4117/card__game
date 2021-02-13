import  { CardManger } from './card.js'


const backCard = document.getElementsByClassName("back");
const scoreBoard = document.querySelector(".score");
const failBoard = document.querySelector(".fail");
const btnContainer = document.querySelector(".button-container");
const startBtn = document.querySelector(".game-button");


class GameManger{
    constructor(){
        this.final = 0;
        this.currentScore = 0;
        this.finalFail = 0;
        this.fail = 0;
        this.cardManger = new CardManger(); 
    }

    init(){
        // 점수 초기화
        this.final = 4;
        this.currentScore = 0;
        this.finalFail = 3;
        this.fail = 0;
        scoreBoard.innerHTML = `${this.final}/${this.currentScore}`;
        failBoard.innerHTML = `${this.finalFail}/${this.fail}`
    }

    gameStart(){
        const manger = this.cardManger;

        manger.init(4, [1,1,1,2,2,3,3,3,2,2,3,3,4,4,4]);
        document.querySelector('.memory-game').style.gridTemplateColumns="1fr 1fr 1fr"
        document.querySelector('.memory-game').style.gridTemplateRows="1fr 1fr 1fr 1fr 1fr"

        new Promise((resolve, reject)=>{
            // front카드 보여주기
            manger.showFrontCard();
            setTimeout(()=>{
                // front카드 숨기기
                manger.hideFrontCard();
                resolve("success!")
            }, 2000);
        }).then(()=>{
            // n초후 클릭이벤트 더하기
            this.addClickEvent();
        })
    }


    addClickEvent(){
        const manger = this.cardManger;

        Array.from(backCard).forEach(element => {
            element.addEventListener("click", (event)=>{
                const response = manger.clickBackCard(element);
                console.log(response)
                if(response.err){
                    console.log(response.err)
                    return;
                }

                if(response.success && response.message){
                    this.addFlipEvent();
                    return;
                }
                
                if(response.success){
                    console.log("성공")
                    this.currentScore += 1;
                    scoreBoard.innerHTML = `${this.final}/${this.currentScore}`;
                    if(this.final == this.currentScore){
                        alert("성공하였습니다!")
                        window.location.reload();
                    }
                }else{
                    this.fail += 1;
                    console.log("실패")
                    failBoard.innerHTML = `${this.finalFail}/${this.fail}`;
                    if(this.finalFail == this.fail){
                        alert(`실패`)
                        window.location.reload();
                    }
                }

                setTimeout(() => {
                    this.cardManger.userArray = [];
                    manger.removeAllCards();
                    this.gameStart();
                }, 400);
            })
        })
    }

    addFlipEvent(){
        const cards = document.querySelectorAll(".memory-card");
        cards.forEach((card)=>{
            card.addEventListener("click",(event)=>{
                card.style.transform =  "rotateY(180deg)";
            })
            card.children[0].style.transform = "rotateY(180deg)";
        })
    }
}



const gameManger = new GameManger();

// startBtn.addEventListener("click", (event)=>{
//     console.log(btnContainer)
//     btnContainer.id = "btn-hidden";

//     gameManger.init();
//     gameManger.gameStart();
// })

btnContainer.id = "btn-hidden";

gameManger.init()
gameManger.gameStart();

