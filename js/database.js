const firebaseConfig = {
    apiKey: "AIzaSyD02waeVlthaPe7QFlEE7M8h_BN7ODQdiI",
    authDomain: "rick-and-morty--db.firebaseapp.com",
    databaseURL: "https://rick-and-morty--db-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "rick-and-morty--db",
    storageBucket: "rick-and-morty--db.appspot.com",
    messagingSenderId: "1034197126044",
    appId: "1:1034197126044:web:0a35a41956e87ef4bc9659"
  };

firebase.initializeApp(firebaseConfig);

// -----------------------------------------------globales

const WRAPPERsearch = document.querySelector(".wrapperSearch")

// ------------------------------------------autenticación

function login() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            let credential = result.credential;
            let token = credential.accessToken;
            let user = result.user;
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
        });
}

function logout(){
    firebase.auth().signOut().then(() => {
        alert("Logout succesful")
    }).catch((error) => {
        alert("An error happened")
    });
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        let logO = document.createElement("button")
        logO.setAttribute("id", "buttonLogout")
        let logOtxt = document.createTextNode("Log Out")
        logO.appendChild(logOtxt)
        WRAPPERsearch.appendChild(logO)
        logO.addEventListener("click", logout)

        let favs = document.createElement("button")
        favs.setAttribute("id", "buttonFavs")
        let favsTxt = document.createTextNode("Favourites")
        favs.appendChild(favsTxt)
        WRAPPERsearch.appendChild(favs)
        favs.addEventListener("click", fetchFavs)

        document.querySelector("#buttonLogin").remove()

    } else {
        if (document.querySelector("#buttonLogout")) {
            document.querySelector("#buttonLogout").remove()
        }
        if (document.querySelector("#buttonFavs")) {
            document.querySelector("#buttonFavs").remove()
        }

        let logIn = document.createElement("button")
        logIn.setAttribute("id", "buttonLogin")
        let logInTxt = document.createTextNode("Log In")
        logIn.appendChild(logInTxt)
        WRAPPERsearch.appendChild(logIn)
        logIn.addEventListener("click", login)

        resetSearch()
    }
  })

//   ---------------------------------------escribir en FB

function saveElem (elem){
    firebase.database()
        .ref('Favoritos/'+ elem.id)
        .set(JSON.stringify(elem))
}

// -----------------------------------------recuperar de FB

function fetchFavs () {
    firebase.database()
        .ref('Favoritos')
        .on('value', (response) => {
            const data = response.val()
            resetSearch()
            const array = Object.values(data)
            array.map(elem => printSearch(JSON.parse(elem)))
        })
}

// -------------------------------------------borrar de FB

function eraseFav(elem) {
    firebase.database()
        .ref('Favoritos/'+ elem.id)
        .remove()
}