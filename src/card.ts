class Make {
    // sart ~ end 사이의 랜덤 숫자 리턴
    makeRandomNum(start:number , end:number): number{
        return Math.ceil(Math.random() * (end- start)) + start
    }


        // 카드 노드 만들기
    makeCard(i:number){
            const card = `
            <div id=${i} class="memory-card">
                <img class="front"/>
                <img class="back" src="./image/img/back.jpg"/>
            </div>
            `
            return card;
    }

    // front카드 이미지
    makeFrontCard(frontCards:  number[]){
        const image_number = this.makeRandomNum(1,17);
        const image_number2 = this.makeRandomNum(1,4);
        const image_number3 = this.makeRandomNum(1,4);
        const frontCard = document.getElementsByClassName("front");

        Array.from(frontCard).forEach((element) => {
            if(!element.parentElement) return;
            const ID = parseInt(element.parentElement.id);
            if(frontCards.includes(ID)){
                element.setAttribute('src', `./image/img/${image_number}.jpeg` ); 
            }else if(ID % 2 == 0){
                element.setAttribute('src', `./image/img2/${image_number2}.jpeg` ); 
            }else{
                element.setAttribute('src', `./image/img3/${image_number3}.jpeg` ); 
            }
        });
    }

}


class CardManger {
    make = new Make();
    cards: number[];
    frontCards: number[];
    userArray: number[];
    colors: string[];
    num: number;
    constructor(){
        this.cards = [];
        this.frontCards = [];
        this.userArray = [];
        this.colors = ["yellow", "black", "red", "brown"]
        this.num = 0;
    }

    // 배열 섞기
    shuffleCards(array:any){
        for(let i=0 ; i<array.length-1 ; i++){
            let j = Math.floor(Math.random() * (i+1));
            let t = array[i];
            array[i] = array[j];
            array[j] = t;
        }
        return array;
    }

    init(){
        // 카드들 초기화
        this.cards = this.shuffleCards([1,1,1,1,2,2,2,2,3,3,3,3]);
        this.colors = this.shuffleCards(this.colors);
        // 정답 카드 초기화
        this.initAnswer();
        // 카드 화면에 표시하기
        this.paintCards();
    }


    initAnswer(){
        this.frontCards = []
        this.num = this.make.makeRandomNum(1, 3);

        this.cards.forEach((elem, index)=>{
            if(elem === this.num){
                this.frontCards.push(index)
            }
        })
    }

    paintCards(){
        for(let i=0 ; i<this.cards.length ; i++){
            const card = this.make.makeCard(i);
            const section = document.querySelector(".memory-game");
            if(section) section.innerHTML += card;
        }

        this.make.makeFrontCard(this.frontCards);
    }


    // front카드 보여주기 (back카드 숨기기)
    showFrontCard(){
        const backCard = document.getElementsByClassName("back");
        Array.from(backCard).forEach(element => {
            if(!element.parentElement) return;
            const ID = parseInt(element.parentElement.id);
            if(this.frontCards.includes(ID)){
                element.classList.add("hidden")
            }
        });
    }
        
    // front카드 숨기기 (back카드 보여주기)
    hideFrontCard(){
        const backCard = document.getElementsByClassName("back");
        Array.from(backCard).forEach(element => {
            element.classList.remove("hidden")
        });
    }


    // 유저가 back 카드를 클릭하면 정답인지 아닌지
    clickBackCard(element:Element){
        if (!element.parentElement)
            return { err : 'element"s parent node is undefined'};

        const ID = parseInt(element.parentElement.id);
        if (this.userArray.includes(ID))
            return { err : 'already included'};
        console.log(ID)

        this.userArray.push(ID);
        if (this.userArray.length >= this.frontCards.length) {
            console.log(this.userArray, this.frontCards)
            const flag = compareArrays(this.userArray, this.frontCards);
            if (flag) {
                this.userArray = [];
                return { success: true };
            }

            this.userArray = [];
            return { success: false };
        }

        return { success: true , message : 'push'};
    }

    // 카드 지우기
    removeAllCards(){
        const backCard = document.getElementsByClassName("back");
        Array.from(backCard).forEach((element,index) => {
            if(!element.parentElement) return;
            element.parentElement.remove();
        })
    }

}



// 배열 비교하기
function compareArrays(arr1:number[], arr2:number[]): boolean{
    const sortedArray1 = arr1.sort()
    const sortedArray2 = arr2.sort()
    
    return sortedArray1.every(function(value , index) {
        return value === sortedArray2[index]
    })
}



export  { CardManger }