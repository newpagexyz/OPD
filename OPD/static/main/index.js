new Vue({
    el: '#app',
    vuetify: new Vuetify(),
     data: {
      token: '',
      session: '',
      src: '/static',
      checkbox1: true,
      min: -50,
      max: 90,
      range: [-20, 70],
      hides: [
      1,1,0,0,0
      ],
      selected: ['John'],
      ARCs: [],

     },
     mounted() {
        this.token=this.getCookie('token')
        this.session=this.getCookie('session')
        // проверка на наличие куков
        if (this.token == undefined || this.token == "empty") {
          window.location.href = `/static/auth/`
        }
        this.GetADCs()
     },
     methods: {
      GoToInfo: function(id__name){
        localStorage.id = id__name;
       
        window.location.href = '/static/info/'
      },
      OpenTech: function(id_name){
        if(this.ARCs[id_name].tech != null){
         window.location.href = `https://adc.newpage.xyz/file/tech/`+this.ARCs[id_name].tech
        }
      },
      Hiden: function(Num){
        var Arr= this.hides
        Arr[Num]= this.hides[Num] == 1? 0: 1;
        this.hides=[]
        Arr.forEach(el =>{
          this.hides.push(el)
        })
      },
      GetADCs: function(c_mane){
        fetch('https://adc.newpage.xyz/api/search_adc/?max_INL_max=10000000000000/').then(res => res.json())
                .then(resJson => {
                  this.ARCs =  resJson;
                  console.log(resJson);

                })
      },
      Exit:function(c_name){
        this.deleteCookie(this.session);
        this.deleteCookie(this.token);
        document.cookie = "token="+'empty'+"; path=/; ";
        document.cookie = "session="+'empty'+"; path=/; ";
        window.location.href = `/static/auth/`
      },
      ///
      //работа с куки
      getCookie: function(c_name){
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++)
        {
           x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
           y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
           x=x.replace(/^\s+|\s+$/g,"");
           if (x==c_name)
           {
               return unescape(y);
           }
        }
      },
     },
      
});