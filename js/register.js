
    const appFire = initializeApp();
    const database = firebase.database();
    let elems = getDOMElements();
    let Nowymdhms　=　new Date();
    let NowYear = Nowymdhms.getFullYear();
    let NowMon = Nowymdhms.getMonth() + 1;
    let NowDay = Nowymdhms.getDate();
    let today = NowMon + "/" + NowDay + "/" + NowYear;


    //register a user
    elems.registerButton.addEventListener("click", function() {
      let name_ = elems.regnameField.value;
      let email_ = elems.regemailField.value;
      let password_ = elems.regpasswordField.value;
        
      firebase.auth().createUserWithEmailAndPassword(email_, password_).then(function(user_) {
        console.log("Success: ", user_);

        //get a user who is logging in
        let currentUser = firebase.auth().currentUser;

        //get a userid
        let userId = currentUser.uid

        // register user db
        firebase.database().ref('users/' + userId).set({
          name: name_,
          email: email_,
          password: password_,
          createdate: today
        });

    console.log("DB succeed!");
        localStorage.setItem('test', 0);
        myPage();

        }).catch(function(err_) {
        console.log("Error: ", err_)
      });
    });
    
    //log in 
    elems.loginButton.addEventListener("click", function() {
      var email_ = elems.logemailField.value;
      var password_ = elems.logpasswordField.value;

      firebase.auth().signInWithEmailAndPassword(email_, password_).then(function(user_) {
 
        console.log("Signed in: ", user_);
        localStorage.setItem('test', 1);
        myPage();
      });
     
    });
    

    function myPage(){
        firebase.auth().onAuthStateChanged(function(user_) {
            if(user_) {
              console.log(user_);

              location.href = "/mypage.html";
            }
            else {
              console.log("nouser");
              location.href = "/index.html";
            }
        });
    }


    //get elements 
    function getDOMElements() {
        return {
          "regnameField": document.getElementById("name-register"),
          "regemailField": document.getElementById("email-register"),
          "regpasswordField": document.getElementById("password-register"),
          "registerButton": document.getElementById("submit-register"),
          "registerMessage":document.getElementById("register-message"),
          "loginContainer": document.getElementById("container-login"),
          "logemailField": document.getElementById("email-login"),
          "logpasswordField": document.getElementById("password-login"),
          "loginButton": document.getElementById("submit-login"),
          "userStatus": document.getElementById("status-user"),
        };
    }

    
    // Initialize Firebase
    function initializeApp(){
        var config = {
          apiKey: "AIzaSyBJmELOXjhvSkQehdIdccq8qWoUsiE2xUo",
          authDomain: "cherupcharmdemo.firebaseapp.com",
          databaseURL: "https://cherupcharmdemo.firebaseio.com",
          projectId: "cherupcharmdemo",
          storageBucket: "cherupcharmdemo.appspot.com",
          messagingSenderId: "798253301377"
          };
        firebase.initializeApp(config);
    }
