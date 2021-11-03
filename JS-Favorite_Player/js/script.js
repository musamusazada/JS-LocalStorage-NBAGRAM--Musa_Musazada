"use strict"
//Card Objects
const arr = [{
        id: "1",
        name: "Allen Iverson",
        content: "The Answer",
        img: "./assets/images/iverson.jpeg"
    },
    {
        id: "2",
        name: "Kobe Bryant",
        content: "The Black Mamba",
        img: "./assets/images/kboe2.jpeg"
    },
    {
        id: "3",
        name: "Lebron James",
        content: "The King",
        img: "./assets/images/lebron.jpeg"
    },
    {
        id: "4",
        name: "Kyrie Irving",
        content: "Uncle Drew",
        img: "./assets/images/kyrie.jpeg"
    },
    {
        id: "5",
        name: "Stphen Curry",
        content: "The Chef",
        img: "./assets/images/curry.jpeg"
    },
    {
        id: "6",
        name: "Giannis AnteteKounmpo",
        content: "The Greek Freak",
        img: "./assets/images/giannis.jpeg"
    },
    {
        id: "7",
        name: "Kawhi Leonard",
        content: "The Claw",
        img: "./assets/images/kawhi.jpeg"
    },
    {
        id: "8",
        name: "Shaquille O'neal",
        content: "The Diesel",
        img: "./assets/images/shaq.jpeg"
    }
]

//Array for Storage
let storageArr = [];
//Keeping tract of fav items
let favBox;
let favHeart;
//If we have already favved item
let exists;
//Main html tag
let main;
//Header html tag
let header;

window.onload = () => {
    favBox = document.querySelector("p");
    main = document.querySelector("main")
    header = document.querySelector("header")
    favHeart = document.querySelector(".fav-box")
    createCards();
    checkForFav();
    favItemDisplay();

}

//If any fav available, add filled heart class to them for better UX
function checkForFav() {
    if (localStorage.getItem('array')) {
        favBox.textContent = localStorage.getItem('array').split(',').length;
        for (let i = 0; i < localStorage.getItem('array').split(',').length; i++) {
            const id = localStorage.getItem('array').split(',')[i];
            document.getElementById(`${id}`).lastElementChild.classList.add("fas")
        }
    } else {
        favBox.textContent = "0";
    }
}

//Creating Cards
function createCards() {
    for (let i = 0; i < arr.length; i++) {
        //Create Card
        const card = document.createElement("div");
        card.classList.add('card');
        card.setAttribute('id', arr[i].id);
        //Create Text Content
        const content = document.createElement('p');
        content.classList.add("text-box");
        content.textContent = `${arr[i].name} -- ${arr[i].content}`;
        //Create Image
        const imageBox = document.createElement("div");
        imageBox.classList.add("img-box");
        const image = document.createElement('img');
        image.setAttribute('src', arr[i].img);
        //Create Heart Icon
        const heart = document.createElement("i")
        heart.classList.add("far")
        heart.classList.add("fa-heart");
        //Append Them
        imageBox.appendChild(image);
        card.appendChild(content);
        card.appendChild(imageBox);
        card.appendChild(heart);
        //Handling the favorite event on click of heart icon
        favITEM(heart);
        main.appendChild(card);
    }
}


//Handling the Favorites
function favITEM(el) {
    el.addEventListener('click', function() {
        //If we dont have storage array yet!
        if (!localStorage.getItem('array')) {
            el.classList.add("fas");
            storageArr.push(el.parentElement.getAttribute('id'));
            localStorage.setItem('array', storageArr);
            favBox.textContent = storageArr.length;

        } else {
            //If we have storage, then lets check for if fav item already exists or not
            storageArr = localStorage.getItem('array').split(',');
            exists = storageArr.indexOf(el.parentElement.getAttribute('id'));
            if (exists !== -1) {
                el.classList.remove("fas");
                storageArr.splice(exists, 1);
                localStorage.setItem('array', storageArr);
                favBox.textContent = storageArr.length;

            } else {
                el.classList.add("fas");
                storageArr.push(el.parentElement.getAttribute('id'));
                localStorage.setItem('array', storageArr);
                favBox.textContent = storageArr.length;
            }
        }
    })
}

//Dispaly Fav Items on click
function favItemDisplay() {
    favHeart.addEventListener('click', createFavDisplay)
}

//Creating Fav Items
function createFavDisplay() {
    const favDisplay = document.querySelector(".fav--Display");

    favDisplay.classList.toggle("hide");

    if (!localStorage.getItem('array')) {
        favDisplay.textContent = "No Favorite Player";
    } else {
        favDisplay.innerHTML = "";
        for (let i = 0; i < localStorage.getItem('array').split(',').length; i++) {
            const id = localStorage.getItem('array').split(',')[i];
            const referance = document.getElementById(`${id}`);
            const img = document.createElement("img");
            img.setAttribute('src', referance.getElementsByTagName("img")[0].getAttribute('src'));
            favDisplay.appendChild(img)
        }
    }


}