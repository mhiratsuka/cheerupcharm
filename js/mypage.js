    const appFire = initializeApp();
    const database = firebase.database();
    const storage = firebase.storage();
    const storageRef = firebase.storage().ref();
    const firstgreeting = ["Hello!", "Hiya!", "Heyyo!", "Heyyo!", "Howdee-do!", "Heyya!"];
    const returngreeting = ["What’s up?", "Sup?", "Sup?", "Boo! Did I scare you?", "Beep boop!", "Beep boop!"];
    const dbRef = firebase.database().ref('users');
    let usercheck = localStorage.getItem('test');
    let elems = getDOMElements();
    let Entymdhms=　new Date();
    let EntYear = Entymdhms.getFullYear();
    let EntMon = Entymdhms.getMonth();
    let EntMonEng = ["Jan", "Feb", "Mar", "Apr", "May", "Jul", "Jun", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let EntDay = Entymdhms.getDate();
    let uploaddate = EntMonEng[EntMon] + " " + EntDay + ", " + EntYear;
    let timestamp = Math.floor(Entymdhms.getTime() / 100) ;
    let text;
    let usernamedis;
    let picname;
    let picregistername;
    let entrypicAttr; //this is assigned entry_pic attribute 
    let emotionnum;
    let emotionbool = "false";
    let emotionUrl = ["img/happy.png", "img/normal.png", "img/sad.png"];
    let emotionAlt = ["Happy", "Normal", "Sad"];
    //display greeting 
    if(usercheck == 0) {
        let rfirst = Math.floor( Math.random() * firstgreeting.length );
        elems.greetingmes.innerHTML = firstgreeting[rfirst]; 
    } else if (usercheck == 1){
        let rsecond = Math.floor( Math.random() * returngreeting.length );
        elems.greetingmes.innerHTML = returngreeting[rsecond]; 
    }

    firebase.auth().onAuthStateChanged(function(user_) {
        if (user_) {
                //get a user who is logging in
                let currentUser = firebase.auth().currentUser;
                //get a userid
                let userId = currentUser.uid   
                let urldb = "users/" + userId;
                const dbRef = firebase.database().ref(urldb);
                dbRef.on("value", function(snapshot) {
                usernamedis = snapshot.child("name").val();
                //display username in their page
                elems.usernameField.innerHTML  = " " + usernamedis;
              });  

              loadPastlog();            
          } else {
console.log("nouser");
          } 
    });

    //undisplay div id "entrylogdis"
    elems.entrylogDisFeild.style.display = "none";
    
    //when a user click "Next"
    elems.entrynextButton.addEventListener("click", nextEntry, false);

    //when a user click "Submit"
    elems.entrysubmitButton.addEventListener("click", submitEntry, false);

    //when a user click "Back"
    elems.entrybackButton.addEventListener("click", backEntry, false);

    //when a user click a "Reset"
    elems.entryresetButton.addEventListener("click", resetEntry, false);
       
    
    function loadPastlog(){
        //get a user who is logging in
        let currentUser = firebase.auth().currentUser;
// 
        //get a userid
        let userId = currentUser.uid;  
        let dbRefinput = firebase.database().ref("userinput");
        let querydisp = dbRefinput.orderByChild("userid").equalTo(userId);
// console.log("querydisp: " + querydisp);
          querydisp.on("value", function(snapshot) {
// console.log(snapshot.numChildren());
              let i = 0;
              snapshot.forEach(function(d){
                  
                  let nodediv = document.createElement("div");
                  let crefun = document.createAttribute("onclick"); 
                  crefun.value = "previewLog(this.id)";
                  let creid = document.createAttribute("id"); 
                  creid.value = "logid" + i;
                  nodediv.setAttributeNode(crefun);
                  nodediv.setAttributeNode(creid);

                  let nodeh4 = document.createElement("h4");
                  let textnodeh4= document.createTextNode(d.child("createdate").val());
                  nodeh4.appendChild(textnodeh4);
                  
                  let nodep = document.createElement("p");
                  let textnodep = document.createTextNode(d.child("text").val());
                  nodep.appendChild(textnodep);
                  
                  let nodeimg = document.createElement("img");
                  let cresrc = document.createAttribute("src"); 
                  let crealt = document.createAttribute("alt"); 
                  cresrc.value = d.child("imageplace").val();
                  crealt.value = d.child("imagename").val();
                  nodeimg.setAttributeNode(cresrc);
                  nodeimg.setAttributeNode(crealt);

                  let nodeeimg = document.createElement("img");
                  let creesrc = document.createAttribute("src"); 
                  let creealt = document.createAttribute("alt"); 
                  creesrc.value = emotionUrl[d.child("emotionid").val()];
                  creealt.value = emotionAlt[d.child("emotionid").val()];
                  nodeeimg.setAttributeNode(creesrc);
                  nodeeimg.setAttributeNode(creealt);

                  nodediv.appendChild(nodeh4);
                  nodediv.appendChild(nodep);
                  nodediv.appendChild(nodeimg);
                  nodediv.appendChild(nodeeimg);

                  elems.displaylogdis.appendChild(nodediv);
                  i = i + 1;
              });
          }); 
    }

    function previewLog(clicked_id){
        let previewId = clicked_id;
        let bigdivkids = document.getElementById(clicked_id).children;  
        let bigimg = document.getElementById(previewId).getElementsByTagName('img');
        let h3big =  bigdivkids[0].innerHTML;
        let pbig =  bigdivkids[1].innerHTML;


        let nodeh3big = document.createElement("h3");
        let textnodeh3big= document.createTextNode(h3big);
        nodeh3big.appendChild(textnodeh3big);

        let nodepbig = document.createElement("p");
        let textnodepbig= document.createTextNode(pbig);
        nodepbig.appendChild(textnodepbig);

        

        //picture
        let nodeimgbig = document.createElement("img");
        let cresrcbig = document.createAttribute("src"); 
        let crealtbig = document.createAttribute("alt"); 
        cresrcbig.value = bigimg[0].src;
        crealtbig.value = bigimg[0].alt;
        nodeimgbig.setAttributeNode(cresrcbig);
        nodeimgbig.setAttributeNode(crealtbig);

        //emotion
        let nodeeimgbig = document.createElement("img");
        let creesrcbig = document.createAttribute("src"); 
        let creealtbig = document.createAttribute("alt"); 
        creesrcbig.value = bigimg[1].src;
        creealtbig.value = bigimg[1].alt;
        nodeeimgbig.setAttributeNode(creesrcbig);
        nodeeimgbig.setAttributeNode(creealtbig);

        // create back button
        let nodebutton = document.createElement("button");
        let textnodebutton= document.createTextNode("Back");
        let creb = document.createAttribute("onclick"); 
        creb.value = "backOriginal()";
        nodebutton.setAttributeNode(creb);
        nodebutton.appendChild(textnodebutton);


        $(".displaylog-container").toggleClass("slide-in");
        $("#entry-box").addClass("hidden");
        $("#intro-wrapper").addClass("hidden");
        $(".view-title").removeClass("hidden");


        elems.dislogBig.appendChild(nodeh3big);
        elems.dislogBig.appendChild(nodepbig);
        elems.dislogBig.appendChild(nodebutton);
        elems.dislogBig.appendChild(nodeimgbig);
        elems.dislogBig.appendChild(nodeeimgbig);

        elems.entrylogField.style.display = "none";
        // elems.displaylogdis.style.display = "none";
    }

    function backOriginal(){
        elems.entrylogField.style.display = "inline";
        $(".entry-title").removeClass("hidden");
        $(".view-title").addClass("hidden");
        $("#intro-wrapper").removeClass("hidden");
        $("#entry-box").addClass("hidden");
        // elems.displaylogdis.style.display = "inline";

        while(elems.dislogBig.firstChild) {
            elems.dislogBig.removeChild(elems.dislogBig.firstChild);
        }
    }

    function nextEntry(){
        text  = elems.entrytext.value;

console.log(emotionbool);
        if ((!text == "") && (emotionbool == "true")) {
        
        elems.entrydate.innerHTML = EntMonEng[EntMon] + " " + EntDay;
        elems.entrytextDis.innerHTML = text;
        elems.entrylogDisFeild.style.display = "inline";

        entrypicAttr = elems.entrypic.hasAttribute("src");
        elems.entryMood.src = emotionUrl[emotionnum];
        elems.entryMood.alt = emotionAlt[emotionnum];

        //check whether there is src attribute in img id"entry_pic"
        if (entrypicAttr) {
              let pathReference = storage.ref(picregistername);
              // Create a reference to the file we want to download
              let picRef = storageRef.child(picregistername);

              // Get the download URL
              picRef.getDownloadURL().then(function(url) {
                elems.entrypicDis.src = url;
                elems.entrypicDis.alt = picname;
              });
        }
        elems.entrylogField.style.display = "none";
        $(".entry-title").addClass("hidden");
      } else {
          window.alert("Please input your entry! And select the emotional icon!");
      }
    }


    function resetEntry(){
      elems.entrytext.value = null;
      text  = elems.entrytext.value;
      elems.entrytextDis.innerHTML = text;
      elems.entrypic.removeAttribute("src");
      elems.entrypic.removeAttribute("alt");
      picname = "";

      elems.hapid.style.background  = "transparent"; 
      elems.norid.style.background = "transparent";
      elems.sadid.style.background = "transparent";
      emotionbool = "false";

      if(entrypicAttr){
          // Create a reference to the file to delete
          let delpicRef = storageRef.child(picname);
          // Delete the file
          delpicRef.delete().then(function() {
            // File deleted successfully
console.log("Complete delete a pic");
          }).catch(function(error) {
console.log("A pic Delete Error...");
          });
      }
    }



    function submitEntry(){
        while(elems.displaylogdis.firstChild) {
// console.log("elems.displaylogdis.firstChild: " + elems.displaylogdis.firstChild);
            elems.displaylogdis.removeChild(elems.displaylogdis.firstChild);
        }
         //get a user who is logging in
        let currentUser = firebase.auth().currentUser;

        //get a userid
        let userId = currentUser.uid   
        console.log(userId);

        let logdata = firebase.database().ref('userinput/')
        let imgUrl = elems.entrypicDis.getAttribute("src");

         var latetra = 0;
          var setInter = setInterval(function() {
              latetra++;
              //end condition
              if (latetra == 4) {
              clearInterval(setInter);
              }
          }, 500);

        if(!entrypicAttr){
            picname = "";
            imgUrl = "";
            picregistername = "";
        }

        logdata.push({
          userid: userId,
          text: elems.entrytext.value,
          emotionid: emotionnum,
          imagename: picname,
          imageregistername: picregistername, 
          imageplace: imgUrl,
          createdate: uploaddate
        });

      elems.entrydate.innerHTML = null;
      elems.entrytext.innerHTML = null;
      elems.entrypic.removeAttribute("src");
      elems.entrypic.removeAttribute("alt");

      elems.hapid.style.background  = "transparent"; 
      elems.norid.style.background = "transparent";
      elems.sadid.style.background = "transparent";
      elems.entryMood.removeAttribute("src");
      elems.entryMood.removeAttribute("alt");
      emotionbool = "false";


      elems.entrytextDis.innerHTML = null;
      elems.entrypicDis.removeAttribute("src");
      elems.entrypicDis.removeAttribute("alt");
      picname = "";
      picregistername = "";

       //undisplay div id "entrylogdis"
      elems.entrylogDisFeild.style.display = "none";
      elems.entrylogField.style.display = "inline";


      $("#intro-wrapper").toggleClass("hidden");
      // fadeIn(element);
      submitSuccess(success);


      
        $("#entry-box").toggleClass("hidden");
        $(".view-title").addClass("hidden");
        while(elems.dislogBig.firstChild) {
                  elems.dislogBig.removeChild(elems.dislogBig.firstChild);
              }

      $(".entry-title").addClass("hidden");
      // $("#intro-wrapper").toggleClass("hidden");

      // fadeIn(element);
    }
    
    function backEntry(){
        text = "";
        elems.entrytextDis.innerHTML = text;
        elems.entrylogDisFeild.style.display = "none";
        elems.entrylogField.style.display = "inline";
        //remove src attribute from id "entrylogdis_pic"
        elems.entrypicDis.removeAttribute("src");  
        elems.entrypicDis.removeAttribute("alt"); 

        elems.hapid.style.background  = "transparent"; 
        elems.norid.style.background = "transparent";
        elems.sadid.style.background = "transparent";
    }

    //function to save file
      function loadFile(){
          let currentUser = firebase.auth().currentUser;
          //get a userid
          let userId = currentUser.uid 
          let file = document.getElementById("files").files[0];
          picregistername = timestamp + userId + file.name;
          let storageRef = firebase.storage().ref();
          
          //dynamically set reference to the file name
          let thisRef = storageRef.child(picregistername);
          //put request upload file to firebase storage
          thisRef.put(file).then(function(snapshot) {
console.log('Uploaded a blob or file!');
          });

          let pathReference = storage.ref(picregistername);
console.log("pathReference: " + pathReference);
          picname = file.name;
          var latetra = 0;
          var setInter = setInterval(function() {
              latetra++;
              //end condition
              if (latetra == 4) {
              clearInterval(setInter);
              previewFile(picregistername);
              }
          }, 500);
      }

      function previewFile(picregistername){
          // Create a reference to the file we want to download
          let picRef = storageRef.child(picregistername);

          // Get the download URL
          picRef.getDownloadURL().then(function(url) {
          elems.entrypic.src = url;
          elems.entrypic.alt = picname;
            // Insert url into an <img> tag to "download"
          }).catch(function(error) {
console.log("error");
          });

      }

      function happyEmotion(){
          elems.hapid.style.background = "#ffb6c1";
          elems.norid.style.background = "transparent";
          elems.sadid.style.background = "transparent";

          emotionnum = 0;
          emotionbool = "true";
      }

      function normalEmotion(){
           elems.norid.style.background  = "#ffb6c1";
           elems.hapid.style.background  = "transparent";
           elems.sadid.style.background  = "transparent";

           emotionnum = 1;
           emotionbool = "true";
      }

      function sadEmotion(){
            elems.sadid.style.background  = "#ffb6c1";
            elems.hapid.style.background  = "transparent";
            elems.norid.style.background  = "transparent";     

            emotionnum = 2;
            emotionbool = "true";
      }


            
    //log out 
    elems.logoutButton.addEventListener("click", function() {
      firebase.auth().signOut().then(function() {
       console.log("Signed out.");
       //go to my page
       location.href = "/index.html";
      });
    });


    //get elements 
    function getDOMElements() {
        return {
          "greetingmes": document.getElementById("greeting"),
          "usernameField": document.getElementById("username"),
          "entrylogField": document.getElementById("entrylog"),
          "entryformField": document.getElementById("entry_form"),
          "entrydate":document.getElementById("entry_date"),
          "entrytext":document.getElementById("entry_text"),
          "entrypic":document.getElementById("entry_pic"),
          
          "hapid":document.getElementById("happy"),
          "norid":document.getElementById("normal"),
          "sadid":document.getElementById("sad"),

          "entrynextButton":document.getElementById("entry_nextb"),
          "entryresetButton":document.getElementById("entry_resetb"),
          "entrylogDisFeild":document.getElementById("entrylogdis"),
          "entrytextDis":document.getElementById("entrylogdis_text"),
          "entrypicDis":document.getElementById("entrylogdis_pic"),
          "entryMood":document.getElementById("entrymood"),



          "entrybackButton":document.getElementById("entrylogdis_backb"),
          "entrysubmitButton":document.getElementById("entrylogdis-submitb"),
          "displaylogdis":document.getElementById("displaylogdis"),
          "dislogBig":document.getElementById("displaylogbig"),
          

          "logoutContainer": document.getElementById("container-logout"),
          "userStatus": document.getElementById("status-user"),
          "logoutButton": document.getElementById("submit-logout")
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


