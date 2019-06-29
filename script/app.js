class spa{

  init(){
    // select class element "page"
    this.links = document.querySelectorAll("a");

    const self = this;
    //looping for each link and add click listener
    this.links.forEach((link)=>{
      link.addEventListener('click',(ev)=>self.navTo(ev));
    });

    //when start , replace the state from " " to #home
    history.replaceState(null,null,'#home');
    //when user enter url name instead of cliking on the anchor tag
    window.addEventListener('popstate', (ev)=>self.hashChanged(ev));

  }

  navTo(ev){
      //prevent from go to another page
      ev.preventDefault();

        let linkClicked = ev.target.getAttribute('data-target'); // get the target link
        console.log(linkClicked);
        let activePage = document.querySelector('.active');
        let selectedPage = document.getElementById(linkClicked);
        if(activePage == null || linkClicked == null || selectedPage == null){
          // alert("Could not Find this page");

          history.replaceState(null,null,'#error');
          activePage.classList.remove('active'); //remove the active class
          document.getElementById('error').classList.add('active'); //active the error page
        }
        else{
          activePage.classList.remove('active'); //remove the active class
          selectedPage.classList.add('active'); //active the selected page id
          console.log("clicked " + linkClicked);
          history.pushState(null, linkClicked,`#${linkClicked}`); // add the state
        }

  }


  hashChanged(ev){
    ev.preventDefault();
    let currentHash = location.hash.substring(1); // remove the hash value
    let activePage = document.querySelector('.active');
    let selectedPage = document.getElementById(currentHash);

    if(activePage == null || currentHash == null || selectedPage == null){
      // alert("Could not Find this page");
      history.replaceState(null,null,'#error');
      activePage.classList.remove('active'); //remove the active class
      document.getElementById('error').classList.add('active'); //active the error page
    }
    else{
      activePage.classList.remove('active'); //remove the active class
      selectedPage.classList.add('active'); //active the selected page id
      console.log("clicked " + currentHash);
      history.pushState(null, currentHash,`#${currentHash}`); // add the state
    }


    console.log("Hash is changed " + currentHash);
  }
}



const obj = new spa();

document.addEventListener('DOMContentLoaded',function(ev){
  obj.init();
});

function showSuccess(text){
  let result = document.querySelector('#fade');
  result.style.display = "block";
  result.textContent = text;

  setTimeout(function(){
      result.style.display = "none";
  },3000);
}

let contact_form  = document.getElementById("contact-form");
contact_form.addEventListener('submit',(ev)=>{
  ev.preventDefault();

  showSuccess("You have submitted your form!");

});

function warnUser(text){
  let result = document.getElementById('after-submit');
  console.log(result);
  result.style.display = "block";
  result.style.background = "red";
  result.textContent = text;

  setTimeout(function(){
      result.style.display = "none";
  },3000);
}
let nextbtn = document.querySelectorAll('.next');
let prevbtn = document.querySelectorAll('.previous');
let register_form = document.querySelector('#register-form');

let progressbar = document.querySelectorAll('#progressbar li');
let lists = Array.prototype.slice.call(progressbar);


nextbtn.forEach((next)=>{
  next.addEventListener('click',(ev)=>{



      let currentfs = next.parentElement.parentElement.parentElement;
        let nextfs = next.parentElement.parentElement.parentElement.nextElementSibling;//next fieldset
        let fieldsets = Array.prototype.slice.call(document.querySelectorAll('#register-form fieldset'));
        let currentIdx = fieldsets.indexOf(nextfs);
        let inputs;

          if(currentIdx==1){
             inputs = currentfs.querySelectorAll('input[type="email"],input[type="password"]');


          }
          else if(currentIdx == 2){
             inputs = currentfs.querySelectorAll('input[type="text"]');
          }


          console.log(inputs.length);
          let found = 0; //counting the valide input
          inputs.forEach((input)=>{
            if(input.checkValidity()){
              found++;
            }
          });
          console.log(found);

          if(found==inputs.length){

            if(currentIdx==1){
              let pwd = document.getElementById('pwd').value;
              let confirm_pwd = document.getElementById('confirm-pwd').value;
              if(pwd!=confirm_pwd){
                warnUser("Passowrd and confirm password does not match!!");
                return;
              }
            }
            lists[currentIdx].classList.add('current-progress');

            nextfs.style.display = "block";

            currentfs.style.display = "none";
          }
          else{
            warnUser("You have to complet form");

          }
  });
});

prevbtn.forEach((prev)=>{
  prev.addEventListener('click',(ev)=>{
    let currentfs = prev.parentElement.parentElement.parentElement;
      let prevfs = prev.parentElement.parentElement.parentElement.previousElementSibling;//previous fieldset
      let fieldsets = Array.prototype.slice.call(document.querySelectorAll('#register-form fieldset'));
      let currentIdx = fieldsets.indexOf(currentfs); // get the index of current fieldsets

      //remove the current progressbar to be inactive
      lists[currentIdx].classList.remove('current-progress');

      console.log(lists[currentIdx]);

      // fieldset hide
      currentfs.style.display = "none";

      //show previous fs
      prevfs.style.display = "block";

  });
});

// when submit
register_form.addEventListener('submit',(ev)=>{
  ev.preventDefault();

  lists[1].classList.remove('current-progress');
  lists[2].classList.remove('current-progress');

  // fieldset hide
  let fieldsets = Array.prototype.slice.call(document.querySelectorAll('#register-form fieldset'));
  fieldsets[0].style.display = "block";
    fieldsets[2].style.display = "none";

    let result = document.querySelector('#after-submit');
    result.style.display = "block";
    result.style.background = "green";
    result.textContent = "You have successfully registered!";

    setTimeout(function(){
        result.style.display = "none";
    },3000);
});
