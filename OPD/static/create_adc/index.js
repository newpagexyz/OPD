new Vue({
    el: '#app',
    vuetify: new Vuetify(),
     data: {
      src: '/static',
      Arches:[],
      Interfaces: [],
      selected_interface: '',
      selected_arch: '',
      dialogInterface: false,
      dialogArch: false,
     },
     mounted() {
       this.token=this.getCookie('token')
        this.session=this.getCookie('session')
        // проверка на наличие куков
        if (this.token == undefined || this.token == "empty") {
          window.location.href = `/static/auth/`
        }
            fetch('https://adc.newpage.xyz/api/archs/').then(res => res.json())
              .then(resJson2 => {
                this.Arches=resJson2
              })
              fetch('https://adc.newpage.xyz/api/interfaces/').then(res => res.json())
              .then(resJson3 => {
                 this.Interfaces=resJson3
              })
     },
     methods: {

      Exit:function(c_name){

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
      getKeyByValue:function(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      },
      handleSubmit: function(){
         var form = new FormData(document.getElementById('adc-form'));
             form.append('session',this.session)
             form.append('token',this.token)
             var Vform = new FormData();
                 Vform.append('image',form.get('image'))
                 Vform.append('cxeme',form.get('cxeme'))
                 Vform.append('tech',form.get('tech'))
          fetch('https://adc.newpage.xyz/api/add_adc/?session='+this.session+'&token='+this.token+'&model='+form.get('model')+'&description='+form.get('description')+'&resolution='+form.get('resolution')+'&channels='+form.get('channels')+'&max_sample_rate='+form.get('max_sample_rate')+'&interface='+this.getKeyByValue(this.Interfaces,form.get('interface'))+'&arch='+this.getKeyByValue(this.Arches,form.get('arch'))+'&max_INL='+form.get('max_INL')+'&SNR='+form.get('SNR')+'&SFDR='+form.get('SFDR')+'&power='+form.get('power')+'&temperature='+form.get('temperature')+'&analog_input='+form.get('analog_input')+'&FoMW='+form.get('FoMW')+'&max_DNL='+form.get('max_DNL'), {
                  method: 'POST',
                    body: Vform
                }).then(res => res.json())
                .then(resJson => {
                  if(resJson != false){
                    localStorage.MassIds = '';
                    alert('АЦП добавлен.')
                     window.location.href = `/static/main/`
                  }
                  else{
                    alert('Проверьте введенные данные.')
                  }
                })
      }
     },
});