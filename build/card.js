class Make {
    makeRandomNum(start, end) {
        return Math.ceil(Math.random() * (end - start)) + start;
    }
    makeCard(i) {
        const card = `
            <div id=${i} class="memory-card">
                <img class="front"/>
                <img class="back" src="./image/img/back.jpg"/>
            </div>
            `;
        return card;
    }
    makeFrontCard(frontCards) {
        const image_number = this.makeRandomNum(1, 17);
        const image_number2 = this.makeRandomNum(1, 4);
        const image_number3 = this.makeRandomNum(1, 4);
        const frontCard = document.getElementsByClassName("front");
        Array.from(frontCard).forEach((element) => {
            if (!element.parentElement)
                return;
            const ID = parseInt(element.parentElement.id);
            if (frontCards.includes(ID)) {
                element.setAttribute('src', `./image/img/${image_number}.jpeg`);
            }
            else if (ID % 2 == 0) {
                element.setAttribute('src', `./image/img2/${image_number2}.jpeg`);
            }
            else {
                element.setAttribute('src', `./image/img3/${image_number3}.jpeg`);
            }
        });
    }
}
class CardManger {
    constructor() {
        this.make = new Make();
        this.cards = [];
        this.frontCards = [];
        this.userArray = [];
        this.num = 0;
        this.max_num = 0;
    }
    shuffleCards(array) {
        for (let i = 0; i < array.length - 1; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            let t = array[i];
            array[i] = array[j];
            array[j] = t;
        }
        return array;
    }
    init(max_num, array) {
        this.max_num = max_num;
        this.cards = this.shuffleCards(array);
        this.initAnswer();
        this.paintCards();
    }
    initAnswer() {
        this.frontCards = [];
        this.num = this.make.makeRandomNum(1, this.max_num);
        this.cards.forEach((elem, index) => {
            if (elem === this.num) {
                this.frontCards.push(index);
            }
        });
    }
    paintCards() {
        for (let i = 0; i < this.cards.length; i++) {
            const card = this.make.makeCard(i);
            const section = document.querySelector(".memory-game");
            if (section)
                section.innerHTML += card;
        }
        this.make.makeFrontCard(this.frontCards);
    }
    showFrontCard() {
        const backCard = document.getElementsByClassName("back");
        Array.from(backCard).forEach(element => {
            if (!element.parentElement)
                return;
            const ID = parseInt(element.parentElement.id);
            if (this.frontCards.includes(ID)) {
                element.classList.add("hidden");
            }
        });
    }
    hideFrontCard() {
        const backCard = document.getElementsByClassName("back");
        Array.from(backCard).forEach(element => {
            element.classList.remove("hidden");
        });
    }
    clickBackCard(element) {
        if (!element.parentElement)
            return { err: 'element"s parent node is undefined' };
        const ID = parseInt(element.parentElement.id);
        if (this.userArray.includes(ID))
            return { err: 'already included' };
        console.log(ID);
        this.userArray.push(ID);
        if (this.userArray.length >= this.frontCards.length) {
            console.log(this.userArray, this.frontCards);
            const flag = compareArrays(this.userArray, this.frontCards);
            if (flag) {
                this.userArray = [];
                return { success: true };
            }
            this.userArray = [];
            return { success: false };
        }
        return { success: true, message: 'push' };
    }
    removeAllCards() {
        const backCard = document.getElementsByClassName("back");
        Array.from(backCard).forEach((element, index) => {
            if (!element.parentElement)
                return;
            element.parentElement.remove();
        });
    }
}
function compareArrays(arr1, arr2) {
    const sortedArray1 = arr1.sort();
    const sortedArray2 = arr2.sort();
    return sortedArray1.every(function (value, index) {
        return value === sortedArray2[index];
    });
}
export { CardManger };
//# sourceMappingURL=card.js.map