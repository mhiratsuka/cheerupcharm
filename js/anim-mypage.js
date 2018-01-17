let donut = getDOMElements();



//get elements 
function getDOMElements() {
    return {
      "viewButton": document.getElementById("view-button"),
      "uploadButton": document.getElementById("upload-button"),
      "homeButton": document.getElementById("home-button"),
      "postalt": document.getElementById("post-alt"),
      "viewalt": document.getElementById("view-alt")
    };
}

donut.viewButton.addEventListener("click", sliderightbar, false);
donut.viewalt.addEventListener("click", sliderightbar, false);

function sliderightbar(){
  console.log("viewButton Is Clicked");
  $(".displaylog-container").toggleClass("slide-in");
}

donut.uploadButton.addEventListener("click", uploadstuff, false);
donut.postalt.addEventListener("click", uploadstuff, false);

function uploadstuff(){
  console.log("uploadButton Is Clicked");
  $("#entry-box").removeClass("hidden");
  $("#intro-wrapper").addClass("hidden");
  $(".view-title").addClass("hidden");
  while(elems.dislogBig.firstChild) {
            elems.dislogBig.removeChild(elems.dislogBig.firstChild);
        };
  elems.entrylogField.style.display = "inline";
  // elems.displaylogdis.style.display = "inline";
      };


donut.homeButton.addEventListener("click", goHome, false);

function goHome(){
  $("#entry-box").addClass("hidden");
  $("#intro-wrapper").removeClass("hidden");
  $(".view-title").addClass("hidden");
  while(elems.dislogBig.firstChild) {
      elems.dislogBig.removeChild(elems.dislogBig.firstChild);
  }
};

function fadeIn(element) {
    transition.begin(element, ["opacity 0 1 0.5s ease-in-out 1s", "top 40px 0px 0.5s ease-in-out 1s"], {
        // On successive runs, fadeIn is called from within setTimeout function while fade-out transition is running.
        // Setting beginFromCurrentValue to true makes sure the new fade-in transition will continue the effect from
        // the current opacity calue and not 0.
        beginFromCurrentValue: true,
        onTransitionEnd: function() { 
          transition.begin(optionElement, ["opacity 0 1 0.5s ease-in-out 1s", "top 40px 0px 0.5s ease-in-out 1s"], {
              beginFromCurrentValue: true,
                onTransitionEnd: function() { 
                transition.begin(menuitem, ["opacity 0 1 0.5s ease-in-out 1s", "top 40px 0px 0.5s ease-in-out 1s"], {
                    beginFromCurrentValue: true,
                    
                  })
                    }
            })
              }
    });
}


function submitSuccess(element) {
    transition.begin(success, ["opacity 0 1 0.5s ease-in-out", "top 40px 0px 0.5s ease-in-out"], {
        // On successive runs, fadeIn is called from within setTimeout function while fade-out transition is running.
        // Setting beginFromCurrentValue to true makes sure the new fade-in transition will continue the effect from
        // the current opacity calue and not 0.
        beginFromCurrentValue: true,
        onTransitionEnd: function() { transition.begin(success, ["opacity 1 0 0.5s ease-in-out 1s", "top 0px 40px 0.5s ease-in-out 1s"], {
              beginFromCurrentValue: true})
              }
    });
}

// function fadeOut(element) {
//     // Don't let fade out transition to finish, begin fading-in again in the middle of fade-out transition.
//     window.setTimeout(function() {
//         fadeIn(element);
//     }, 30000);
//     transition.begin(element, "opacity 1 0 10s", {
//         onTransitionEnd: function(element, finished) {
//             // Because we called fadeIn from within setTimeout with 1s, the fade-in transition will be halted
//             // in the middle and this callback will be invoked with finished set to "false".
//             if (finished) {
//                 // This code never runs, because finished is false
//                 element.parentNode.removeChild(element);
//             }
//         }
//     });
// }

let element = document.getElementById("main-display")
let optionElement = document.getElementById("option-box")
let success = document.getElementById("text-success")
let menuitem = document.getElementById("menu-item")

fadeIn(element);
