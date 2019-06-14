class spa{

  constructor(){
    this.page = [];
  }

  init(){
    // select class element "page"

    this.page = document.querySelectorAll('.page');

    this.page.forEach((page)=>{
      page.addEventListener('show',this.showPage());
    })

    history.replaceState(null,null,'#home');
    
  }

  showPage(){

  }
}

const obj = new spa();
document.addEventListener('DOMContentLoaded',function(){
  obj.init();
});

// window.addEventListener("hashchange",function() {
//   console.log("changed " + location.hash );
// });
