class spa{

  init(){
    // select class element "page"
    this.links = document.querySelectorAll("a");
    // this.clickableDiv = document.querySelectorAll('#info-service .box');
    const self = this;
    //looping for each link and add click listener
    this.links.forEach((link)=>{
      link.addEventListener('click',(ev)=>self.navTo(ev));
    });

    // this.clickableDiv.forEach((link)=>{
    //   link.addEventListener('click',(ev)=>self.navTo(ev));
    // });



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
