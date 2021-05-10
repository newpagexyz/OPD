new Vue({
    el: '#app',
    vuetify: new Vuetify(),
     data: {
      src: '/static',
            checkbox1: true,
      ADC_Id: '',
      ADC_this: [],
      resolution: 'asdasdasd',
      Arches:[],
      Interfaces: [],
      selected_interface: '',
      selected_arch: '',
      dialogInterface: false,
      dialogArch: false,
      isChangeImg: false,
      isChangeCxeme: false,
      isChangeTech: false,
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

      Exit:function(c_name){

        document.cookie = "token="+'empty'+"; path=/; ";
        document.cookie = "session="+'empty'+"; path=/; ";
        window.location.href = `/static/auth/`
      },
      ///
      GetInfoADC: function(id_name){
          fetch('https://adc.newpage.xyz/api/show_adc/?id='+id_name).then(res => res.json())
          .then(resJson => {
            this.ADC_this =  resJson;
            console.log(resJson);
                fetch('https://adc.newpage.xyz/api/archs/').then(res => res.json())
              .then(resJson2 => {
                this.Arches=resJson2
                this.ADC_this.arch=resJson2[this.ADC_this.arch]
                this.selected_arch = [this.ADC_this.arch]
              })
              fetch('https://adc.newpage.xyz/api/interfaces/').then(res => res.json())
              .then(resJson3 => {
                 this.Interfaces=resJson3
                this.ADC_this.interface=resJson3[this.ADC_this.interface]
                this.selected_interface = [this.ADC_this.interface]
        
              })
          })
        },
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
      //ввод файлов
      onAddfileImg:function(){
        console.log('test');
        this.isChangeImg = true;
      },
      onAddfileCxeme:function(){
        this.isChangeCxeme = true;
      },
      onAddfileTech:function(){
        this.isChangeTech = true;
      },
      getKeyByValue:function(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      },
      handleSubmit: function(){
         var form = new FormData(document.getElementById('adc-form'));
              /*console.log(form.get('model'));

              console.log(form.get('arch'));
              console.log(form.get('interface'));
              console.log(form.get('image'));
              console.log(form.get('cxeme'));
              console.log(form.get('tech'));
              console.log(form.get('description'));
              console.log(form.get('resolution'));
              console.log(form.get('resolution'));*/
              
          
              for (el in this.ADC_this){
                console.log(el);
                if(el != 'image'& el != 'cxeme' & el != 'tech'){
                  var val =( el == 'arch')? this.getKeyByValue(this.Arches,form.get('arch')) : (el == 'interface')? this.getKeyByValue(this.Interfaces,form.get('interface')) : form.get(el);
                  
                  fetch('https://adc.newpage.xyz/api/edit_adc/?session='+this.session+'&token='+this.token+'&key='+el+'&val='+val+'&id='+this.ADC_this.id, {
                    }).then(res => res.json())
                    .then(resJson => {
                      console.log(resJson);
                    })
                }else{
                  if(this.isChangeImg){
                    var Vform = new FormData();
                    Vform.append('image',form.get('image'))
                    fetch('https://adc.newpage.xyz/api/edit_adc/?session='+this.session+'&token='+this.token+'&id='+this.ADC_this.id, {
                    method: 'POST',
                    body: Vform
                    }).then(res => res.json())
                    .then(resJson => {
                      console.log(resJson);
                    })
                  }
                  if(this.isChangeCxeme){
                    var Vform = new FormData();
                    Vform.append('cxeme',form.get('cxeme'))
                    fetch('https://adc.newpage.xyz/api/edit_adc/?session='+this.session+'&token='+this.token+'&id='+this.ADC_this.id, {
                    method: 'POST',
                    body: Vform
                    }).then(res => res.json())
                    .then(resJson => {
                      console.log(resJson);
                    })
                  }
                  if(this.isChangeTech){
                    var Vform = new FormData();
                    Vform.append('tech',form.get('tech'))
                    fetch('https://adc.newpage.xyz/api/edit_adc/?session='+this.session+'&token='+this.token+'&id='+this.ADC_this.id, {
                    method: 'POST',
                    body: Vform
                    }).then(res => res.json())
                    .then(resJson => {
                      console.log(resJson);
                    })
                  }
                }
              }
      }
     },
});