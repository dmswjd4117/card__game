class CardManger {
    constructor(){
        this.cards ;
        this.frontCards = [];
        this.userArray = [];
        this.colors = ["yellow", "black", "red", "brown"]
        this.num = 0;
    }

    // sart ~ end 사이의 랜덤 숫자 리턴
    makeRandomNum(start , end){
        return Math.ceil(Math.random() * (end- start)) + start
    }

    // 배열 비교하기
    compareArrays(arr1, arr2){
        const sortedArray1 = arr1.sort()
        const sortedArray2 = arr2.sort()
        
        return sortedArray1.every(function(value , index) {
            return value === sortedArray2[index]
        })
    }

    init(){
        // 카드들 초기화
        this.cards = this.shuffleCards([1,1,1,1,2,2,2,2,3,3,3,3]);
        this.colors = this.shuffleCards(this.colors);
        this.paintCards();
        // 정답 카드들 초기화
        this.makeAnswerCards();
    }

    shuffleCards(array){
        for(let i=0 ; i<array.length-1 ; i++){
            let j = Math.floor(Math.random() * (i+1));
            let t = array[i];
            array[i] = array[j];
            array[j] = t;
        }
        return array;
    }

    // 정답 카드 정하기
    makeAnswerCards(){
        this.frontCards = []
        this.num = this.makeRandomNum(1, 3);
        
        console.log(this.num+"카드 만들었다")
        this.cards.forEach((elem, index)=>{
            if(elem === this.num){
                this.frontCards.push(index)
            }
        })
    }
    

    // front카드 보여주기 (back카드 숨기기)
    showFrontCard(){
        Array.from(frontCard).forEach(element => {
            const ID = parseInt(element.parentNode.id);
            if(this.frontCards.includes(ID)){
                element.style.backgroundColor = this.colors[0];
            }else if(ID % 2 == 0){
                element.style.backgroundColor = this.colors[1];
            }else{
                element.style.backgroundColor = this.colors[2];
            }
        });

        Array.from(backCard).forEach(element => {
            const ID = parseInt(element.parentNode.id);
            // console.log(ID , this.frontCards)
            if(this.frontCards.includes(ID)){
                element.classList.add("hidden")
            }
        });
    }
        
    // front카드 숨기기 (back카드 보여주기)
    hideFrontCard(){
        console.log("front카드 숨기기 (back카드 보여주기)")
        Array.from(backCard).forEach(element => {
            element.classList.remove("hidden")
        });
    }


    // 유저가 back 카드를 클릭하면 정답인지 아닌지
    clickBackCard(elemnt){
        const ID = parseInt(elemnt.parentNode.id);
        this.userArray.push(ID);

        if(this.userArray.length == this.frontCards.length){
            const flag = this.compareArrays(this.userArray, this.frontCards);
            setTimeout(()=>{
                Array.from(backCard).forEach((element,index) => {
                    element.classList.remove("hidden")
                });
            }, 1000)

            if(flag){
                this.userArray = [];
                return { success : true };
            }
            else{
                this.userArray = [];
                return { success : false };
            }
        }
    }

    // 카드 html에 붙이기
    paintCards(){
        for(let i=0 ; i<this.cards.length ; i++){
            const card = this.makeCard(i);
            document.querySelector(".memory-game").innerHTML += card;
        }
    }


    // 카드 노드 만들기
    makeCard(i){
        const card = `
        <div id=${i} class="memory-card">
            <img class="front"> <img/>
            <img class="back" src="../img/back.jpg"/>
        </div>
        `
        return card;
    }

    removeAllCards(){
        Array.from(backCard).forEach((element,index) => {
            element.parentNode.remove();
        })
    }
}
