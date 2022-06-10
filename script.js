let myLibrary = [];

class Library {
    constructor(title,author,pages,read){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.read=read;
    }
}

function addBookToLibrary() {
    const inputs = document.querySelectorAll('input');
    const inputArr = [...inputs];
    const userInput = inputArr.map(input=>input.value)
    userInput[userInput.length-1]=inputArr[inputArr.length-1].checked?true:false;
    const newBook = new Library(...userInput);
    myLibrary.push(newBook);
    return newBook;
}

function formReset(){
    const form = document.querySelector('form');
    form.reset();
}

const addBtn = document.querySelector('.addBtn');
addBtn.addEventListener('click', () => {
    addBookToLibrary();
    formReset();
    addBookCard()
});

function addBookCard(){
    const lastBook = myLibrary[myLibrary.length-1];
    
    const cardContainer =document.querySelector('.card-container');
    const card = document.createElement('div');
    card.classList='card';
    cardContainer.appendChild(card);
    
    const bookContainer = document.createElement('div');
    card.appendChild(bookContainer);

    for (let i = 0; i<Object.keys(lastBook).length; i++) {
        const newSection = document.createElement('div');
        newSection.classList='cardSection';
        bookContainer.appendChild(newSection);

        const newElement = document.createElement('div');
        newElement.innerText=Object.keys(lastBook)[i];
        newSection.appendChild(newElement);

        const newValue = document.createElement('div');
        newValue.innerText=Object.values(lastBook)[i]
        newValue.classList.add('bookValue',Object.keys(lastBook)[i])
        newSection.appendChild(newValue)
    }
    const removeButton = document.createElement('button');
    removeButton.textContent="Remove Book";
    card.appendChild(removeButton);
    removeButton.addEventListener('click',removeBook)

    const lastSection=bookContainer.lastChild
    const readButton = document.createElement('button');
    readButton.classList.add('readStatus')
    readButton.innerText = lastBook.read?'Read':'Not read';
    lastSection.appendChild(readButton)
    readButton.addEventListener('click',changeReadStatus)
}

function removeBook(){

    const bookCard = this.parentElement;
    const values = bookCard.querySelectorAll('.bookValue');
    const valuesArr=[...values].map(value=>value.textContent);
    const bookIndex = myLibrary.findIndex(val=>Object.values(val).join('.')===valuesArr.join('.'));
    myLibrary.splice(bookIndex,1);
    bookCard.remove();
}

function changeReadStatus(){
    const bookCard = this.parentElement.parentElement;
    const values = bookCard.querySelectorAll('.bookValue')
    const valuesArr=[...values].map(value=>value.textContent);
    console.log(valuesArr)
    const bookIndex = myLibrary.findIndex(val=>Object.values(val).join('.')===valuesArr.join('.'));
    console.log(bookIndex)

    if (myLibrary[bookIndex].read) {
        console.log(this)
        myLibrary[bookIndex].read=false;
        this.innerText='Not Read'
        this.previousSibling.textContent=false;

    } else {
        console.log(this)
        myLibrary[bookIndex].read=true;
        this.innerText='Read';
        this.previousSibling.textContent=true;
    }
}