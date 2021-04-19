/*Vue.component('preloader', {
   template: ` <div class="preloader">
               <link rel="stylesheet" href="/static/style/preloader.css">
  <div class="preloader__row">
    <div class="preloader__item"></div>
    <div class="preloader__item"></div>
  </div>
</div>`,*/
  // mounted() {
       window.onload = function () {
       document.body.classList.add('loaded_hiding');
       window.setTimeout(function () {
         document.body.classList.add('loaded');
         document.body.classList.remove('loaded_hiding');
       }, 500);
      }
  // }
//})