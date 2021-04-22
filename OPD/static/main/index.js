new Vue({
    el: '#app',
    vuetify: new Vuetify(),
     data: {
      src: '/OPD/static',
      checkbox1: true,
      min: -50,
      max: 90,
      range: [-20, 70],
      hides: [1,1,0,0,0],
      selected: ['John'],

     },
     mounted() {

     },
     methods: {
      Hiden: function(Num){
        var Arr= this.hides
        Arr[Num]= this.hides[Num] == 1? 0: 1;
        this.hides=[]
        Arr.forEach(el =>{
          this.hides.push(el)
        })
      }
     },
});