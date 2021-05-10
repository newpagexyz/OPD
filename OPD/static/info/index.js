new Vue({
    el: '#app',
    vuetify: new Vuetify(),
     data: {
      src: '/static',
      checkbox1: true,
      ADC_Id: '',
      ADC_this: [],
      Names: {},
      Ed: {},
      
     },
     mounted() {
       this.token=this.getCookie('token')
        this.session=this.getCookie('session')
        // проверка на наличие куков
        if (this.token == undefined || this.token == "empty") {
         // window.location.href = `/static/auth/`
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

                  this.Names = {
                    model: 'Название',
                    FoMW: 'Коэффициент качества по Уолдену',
                    SFDR: 'Реальный динамический диапазон',
                    SNR: 'Отношение сигнал/шум',
                    analog_input: 'Аналоговый вход',
                    channels: 'Число входных каналов',
                    max_DNL: 'Макс. Дифференциальная нелинейность',
                    max_INL: 'Макс. Интегральная нелинейность',
                    max_sample_rate: 'Макс. Частота дискретизации',
                    power: 'Потребляемая мощность',
                    resolution: 'Разрешение',
                    temperature: 'Диапазон рабочих температур',
                    interface: 'Тип интерфейса',
                    arch: 'Архитектура',
                  }
                   this.ADC_this.names = this.Names
                   this.Ed = {
                    model: ' ',
                    FoMW: ' ',
                    SFDR: 'дБ',
                    SNR: 'дБ',
                    analog_input: 'МГц',
                    channels: ' ',
                    max_DNL: '+/-ЛСН',
                    max_INL: '+/-ЛСБ',
                    max_sample_rate: 'МСПС',
                    power: 'мВ',
                    resolution: 'бит',
                    temperature: 'С',
                    interface: ' ',
                    arch: ' ',
                  }
                   this.ADC_this.ed = this.Ed
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