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
      hides: [1,1,0,0,0,0,0,0,0,0,0],
      params: {
        resolution:{
          name: 'resolution',
          title: 'Разрешение',
          range: [4.5,32],
          min: 4.5,
          max: 32,
          hide: 1,
          check: false,
        },
         channels:{
          name: 'channels',
          title: 'Число входных каналов ',
          range: [1,32],
          min: 1,
          max: 32,
          hide: 1,
          check: false,
        },
        max_sample_rate:{
          name: 'max_sample_rate',
          title: 'Макс. Частота дискретизации',
          range: [0.00001,10400],
          min: 0.00001,
          max: 10400,
          hide: 0,
          check: false,
        },
        max_INL:{
          name: 'max_INL',
          title: 'Макс. Интегральная нелинейность',
          range: [0.0001,171780],
          min: 0.0001,
          max: 171780,
          hide: 0,
          check: false,
        },
        SNR:{
          name: 'SNR',
          title: 'Отношение сигнал/шум',
          range: [-80,130],
          min: -80,
          max: 130,
          hide: 0,
          check: false,
        },
        SFDR:{
          name: 'SFDR',
          title: 'Реальный динамический диапазон',
          range: [-118,125],
          min: -118,
          max: 125,
          hide: 0,
          check: false,
        },
        power:{
          name: 'power',
          title: 'Потребляемая мощность',
          range: [0.0009,14000],
          min: 0.0009,
          max: 14000,
          hide: 0,
          check: false,
        },
        temperature:{
          name: 'temperature',
          title: 'Диапазон рабочих температур',
          range: [-55,210],
          min: -55,
          max: 210,
          hide: 0,
          check: false,
        },
        analog_input:{
          name: 'analog_input',
          title: 'Аналоговый вход',
          range: [0.001,8000],
          min: 0.001,
          max: 8000,
          hide: 0,
          check: false,
        },
        FoMW:{
          name: 'FoMW',
          title: 'Коэффициент качества по Уолдену',
          range: [0.001,10000],
          min: 0.001,
          max: 10000,
          hide: 0,
          check: false,
        },
        max_DNL:{
          name: 'max_DNL',
          title: 'Макс. Дифференциальная нелинейность',
          range: [-80,130],
          min: -80,
          max: 130,
          hide: 0,
          check: false,
        },
      },
      selected: ['John'],
      ARCs: [],
      new_ADCs: [],

     },
     mounted() {
        this.token=this.getCookie('token')
        this.session=this.getCookie('session')
        // проверка на наличие куков
        if (this.token == undefined || this.token == "empty") {
          window.location.href = `/static/auth/`
        }
        this.GetADCs()
        for(Num in this.params){
        var elem = document.getElementById("filter"+Num);
        if(this.params[Num].hide == 0){
          elem.style.display = 'none'
        }
        else{
          elem.style.display = 'flex'
        }
        }
     },
     methods: {
      FilterSearch:function(){
        var str = '';
        var Arr =this.params;
        var k =0
        for (key in Arr) {
          k++;
          if(Arr[key].check == true){
            str+=Arr[key].name+'_min='+Arr[key].range[0]+'&'+Arr[key].name+'_max='+Arr[key].range[1]+'&'
          }
        }
        str=str.substr(0, str.length-1)
        fetch('https://adc.newpage.xyz/api/search_adc/?'+str).then(res => res.json())
                .then(resJson => {
                  this.new_ADCs =  resJson;
                  console.log(resJson);
                  if(resJson != false){
                  this.ARCs = this.new_ADCs
                }
                else{
                  alert('Ничего не найдено')
                }

                })
      },
      FilterReload: function(){
        this.params={
        resolution:{
          name: 'Разрешение',
          range: [4.5,32],
          min: 4.5,
          max: 32,
          hide: 1,
        },
         channels:{
          name: 'Число входных каналов ',
          range: [1,32],
          min: 1,
          max: 32,
          hide: 1,
        },
        max_sample_rate:{
          name: 'Макс. Частота дискретизации',
          range: [0.00001,10400],
          min: 0.00001,
          max: 10400,
          hide: 1,
        },
        max_INL:{
          name: 'Макс. Интегральная нелинейность',
          range: [0.0001,171780],
          min: 0.0001,
          max: 171780,
          hide: 1,
        },
        SNR:{
          name: 'Отношение сигнал/шум',
          range: [-80,130],
          min: -80,
          max: 130,
          hide: 1,
        },
        SFDR:{
          name: 'Реальный динамический диапазон',
          range: [-118,125],
          min: -118,
          max: 125,
          hide: 1,
        },
        power:{
          name: 'Потребляемая мощность',
          range: [0.0009,14000],
          min: 0.0009,
          max: 14000,
          hide: 1,
        },
        temperature:{
          name: 'Диапазон рабочих температур',
          range: [-55,210],
          min: -55,
          max: 210,
          hide: 1,
        },
        analog_input:{
          name: 'Аналоговый вход',
          range: [0.001,8000],
          min: 0.001,
          max: 8000,
          hide: 1,
        },
        FoMW:{
          name: 'Коэффициент качества по Уолдену',
          range: [0.001,10000],
          min: 0.001,
          max: 10000,
          hide: 1,
        },
        max_DNL:{
          name: 'Макс. Дифференциальная нелинейность',
          range: [-80,130],
          min: -80,
          max: 130,
          hide: 1,
        },
      }
      },
      GoToInfo: function(id__name){
        localStorage.id = id__name;
       
        window.location.href = '/static/info/'
      },
      OpenTech: function(id_name){
        if(this.ARCs[id_name].tech != null){
         window.location.href = `https://adc.newpage.xyz/file/tech/`+this.ARCs[id_name].tech
        }
      },
      /*Hiden: function(Num){
        var Arr= this.hides
        Arr[Num]= this.hides[Num] == 1? 0: 1;
        this.params=[]

        Arr.forEach(el =>{
          this.params.push(el)
        })
      },*/
      Hiden: function(Num){
        console.log( this.params[Num].hide);
        this.params[Num].hide =  this.params[Num].hide == 1? 0: 1;
        console.log( this.params[Num].hide);
        console.log("filter"+Num);
        var elem = document.getElementById("filter"+Num);
        if(this.params[Num].hide == 0){
          elem.style.display = 'none'
        }
        else{
          elem.style.display = 'flex'
        }
      },
      GetADCs: function(c_mane){
        fetch('https://adc.newpage.xyz/api/search_adc/?max_INL_max=10000000000000/').then(res => res.json())
                .then(resJson => {
                  this.ARCs =  resJson;
                  this.new_ADCs = resJson
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