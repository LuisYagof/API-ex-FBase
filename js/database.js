var firebaseConfig = {
    apiKey: "AIzaSyD02waeVlthaPe7QFlEE7M8h_BN7ODQdiI",
    authDomain: "rick-and-morty--db.firebaseapp.com",
    databaseURL: "https://rick-and-morty--db-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "rick-and-morty--db",
    storageBucket: "rick-and-morty--db.appspot.com",
    messagingSenderId: "1034197126044",
    appId: "1:1034197126044:web:0a35a41956e87ef4bc9659"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function saveElem (elem){
    firebase.database()
        .ref('Favoritos/'+ elem.id)
        .set(JSON.stringify(elem))
}

function fetchFavs () {
    firebase.database()
        .ref('Favoritos')
        .on('value', (response) => {
            const data = response.val()
            const array = Object.values(data)
            array.map(elem => printSearch(JSON.parse(elem)))
        })
}

const BUTTONfav = document.querySelector("#buttonFav");
BUTTONfav.addEventListener("click", fetchFavs)