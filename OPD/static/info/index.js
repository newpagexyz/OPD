new Vue({
    el: '#app',
    vuetify: new Vuetify(),
     data: {
      src: '/static',
      checkbox1: true,
      ADC_Id: '',
      ADC_this: [],
      desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
     },
     mounted() {
       this.token=this.getCookie('token')
        this.session=this.getCookie('session')
        // проверка на наличие куков
        if (this.token == undefined || this.token == "empty") {
          window.location.href = `/static/auth/`
        }
        this.ADC_Id=localStorage.id;
         console.log(localStorage.id);
        this.GetInfoADC(localStorage.id)
     },
     methods: {

      OpenACD:function(value){
        if(localStorage.id != 0){
          this.GetInfoADC(parseInt(localStorage.id)+parseInt(value))
          localStorage.id=parseInt(localStorage.id)+parseInt(value)
          /*window.location.href = '/static/info/'*/
       }
      },
      OpenTech: function(id_name){
        console.log();
        if(this.ADC_this.tech != null){
         window.location.href = `https://adc.newpage.xyz/file/tech/`+this.ADC_this.tech
        }
      },
      GetInfoADC: function(id_name){
                fetch('https://adc.newpage.xyz/api/show_adc/?id='+id_name).then(res => res.json())
                .then(resJson => {
                  this.ADC_this =  resJson;
                  console.log(resJson);
                      fetch('https://adc.newpage.xyz/api/archs/').then(res => res.json())
                    .then(resJson2 => {
                      this.ADC_this.arch=resJson2[this.ADC_this.arch]
                    })
                    fetch('https://adc.newpage.xyz/api/interfaces/').then(res => res.json())
                    .then(resJson3 => {
                      this.ADC_this.interface=resJson3[this.ADC_this.interface]
                    })
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