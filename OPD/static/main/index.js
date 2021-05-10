new Vue({
    el: '#app',
    vuetify: new Vuetify(),
     data: {
      search_txt: '',
      hide_filter: true,
      token: '',
      session: '',
      src: '/static',
      checkbox1: true,
      min: -50,
      max: 90,
      range: [-20, 70],
      hides: [1,1,0,0,0,0,0,0,0,0,0],
      selected: ['John'],
      ARCs: [],
      new_ADCs: [],
      paramsSelect:{
        interface:{
          name: 'interface',
          title: 'Тип интерфейса',
          selected: [],
          values:['Byte-Wide','CMOS','DDR LVDS','Enhanced SPI','I2C','JESD204A','JESD204B','JESD204C','LVDS','Microwire','Parallel','Parallel CMOS','Parallel LVDS','QDR LVDS','SPI','Serial','Serial CMOS','Serial LVDS','Serial SPI','TTL','UART'],
          hide: 0,
          check: false,
        },
        arch:{
          name: 'arch',
          title: 'Архитектура',
          selected: [],
          values:['Delta-Sigma','Delta-Sigma Modulator','Flash','Folding Interpolating','Pipeline','SAR','Special','Two-Step'],
          hide: 0,
          check: false,
        },
      },
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
          title: 'Макс. Дифф. нелинейность',
          range: [-80,130],
          min: -80,
          max: 130,
          hide: 0,
          check: false,
        },
      },
     },
     mounted() {
        this.token=this.getCookie('token')
        this.session=this.getCookie('session')
        // проверка на наличие куков
        if (this.token == undefined || this.token == "empty") {
         // window.location.href = `/static/auth/`
        }
        this.GetADCs()
        //скрытие всех полей
        for(Num in this.params){
          var elem = document.getElementById("filter1"+Num);
          if(this.params[Num].hide == 0){
            elem.style.display = 'none'
          }
          else{
            elem.style.display = 'flex'
          }
        }
         for(Num in this.paramsSelect){
          var elem = document.getElementById("filter2"+Num);
          if(this.paramsSelect[Num].hide == 0){
            elem.style.display = 'none'
          }
          else{
            elem.style.display = 'flex'
          }
        }
     },
     methods: {
      //кнопка вверх
    toTop () {
      this.$vuetify.goTo(0)
    },
    Search: function(){
      console.log(this.search_txt);

      fetch('https://adc.newpage.xyz/api/search_adc/?model='+this.search_txt).then(res => res.json())
                .then(resJson => {
                   this.ARCs =  resJson;
                  this.new_ADCs = resJson;
                  console.log(resJson);
                  var Mass_archs=[]
                  var Mass_interf=[]

                   fetch('https://adc.newpage.xyz/api/archs/').then(res => res.json())
                    .then(resJson2 => {
                      Mass_archs=resJson2
                      fetch('https://adc.newpage.xyz/api/interfaces/').then(res => res.json())
                        .then(resJson3 => {
                          Mass_interf=resJson3;
                          for(var i=0; i<this.ARCs.length; i++){
                            this.ARCs[i].arch=Mass_archs[this.ARCs[i].arch];
                            this.ARCs[i].interface=Mass_interf[this.ARCs[i].interface];
                            console.log('test');
                            
                          }
                        })
                    })
                })
    },
    CheckOn:function(c){
      if(c == 'interface'){
        this.paramsSelect.interface.check = true;
      }
       if(c == 'arch'){
        this.paramsSelect.arch.check = true;
      }
    },
      //фильтр
      FilterSearch:function(id){
        console.log(id);
        var str = '';
        var str2= '';
        var Arr =this.params;
        var Arr2 =this.paramsSelect;
        if(id != 0){
          this.params[id].check =true;
        }
        
        //формирование апроса дял selected
        for (key in Arr2) {
          if(Arr2[key].check == true){
            if(Arr2[key].selected.length != 0){
                var mass= Arr2[key].selected
            }
            else{
              var mass = [];
              for(var i = 0; i< Arr2[key].values.length; i ++){
                mass.push(i)
              }
          }
          str2+=Arr2[key].name+'='+mass.join(';')+'&'
          }
        }
        //формирование апроса дял range
        for (key in Arr) {
          if(Arr[key].check == true){
            str+=Arr[key].name+'_min='+Arr[key].range[0]+'&'+Arr[key].name+'_max='+Arr[key].range[1]+'&'
          }
        }
        
        console.log(str2);
        str=str2+str;
        str=str.substr(0, str.length-1)
        console.log(str);
        //

        fetch('https://adc.newpage.xyz/api/search_adc/?'+str).then(res => res.json())
                .then(resJson => {
                  this.new_ADCs =  resJson;
                  console.log(resJson);
                  if(resJson != false){
                  this.ARCs = this.new_ADCs
                  fetch('https://adc.newpage.xyz/api/archs/').then(res => res.json())
                    .then(resJson2 => {
                      Mass_archs=resJson2
                      fetch('https://adc.newpage.xyz/api/interfaces/').then(res => res.json())
                        .then(resJson3 => {
                          Mass_interf=resJson3;
                          for(var i=0; i<this.ARCs.length; i++){
                           this.ARCs[i].arch=Mass_archs[this.ARCs[i].arch];
                            this.ARCs[i].interface=Mass_interf[this.ARCs[i].interface];
                            console.log('test');
                            
                          }
                        })
                    })
                }
                else{
                  alert('Ничего не найдено')
                }
        })
      },
      FilterReload: function(){
        this.paramsSelect={
        interface:{
          name: 'interface',
          title: 'Тип интерфейса',
          selected: [],
          values:['Byte-Wide','CMOS','DDR LVDS','Enhanced SPI','I2C','JESD204A','JESD204B','JESD204C','LVDS','Microwire','Parallel','Parallel CMOS','Parallel LVDS','QDR LVDS','SPI','Serial','Serial CMOS','Serial LVDS','Serial SPI','TTL','UART'],
          hide: 0,
          check: false,
        },
        arch:{
          name: 'arch',
          title: 'Архитектура',
          selected: [],
          values:['Delta-Sigma','Delta-Sigma Modulator','Flash','Folding Interpolating','Pipeline','SAR','Special','Two-Step'],
          hide: 0,
          check: false,
        },
      }
        this.params={
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
      }
      },
      GoToInfo: function(id__name){
        localStorage.id = this.ARCs[id__name].id;
        window.location.href = '/static/info/'
      },
      //доп кнопки
      GoToEdit:function(id__name){
        localStorage.id = this.ARCs[id__name].id;
        window.location.href = '/static/edit_adc/'
      },
      toDel:function(id__name){
        fetch('https://adc.newpage.xyz/api/delete_adc/?session='+this.session+'&token='+this.token+'&id='+this.ARCs[id__name].id).then(res => res.json())
                .then(resJson => {
                  alert('АЦП: ' +this.ARCs[id__name].model + 'был удален.')

                })
        console.log('ждем апи по удалению');;
  
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
      Hiden: function(Num,text,par){
        console.log( par[Num].hide);
        par[Num].hide =  par[Num].hide == 1? 0: 1;
        console.log( par[Num].hide);
        console.log(text+Num);
        var elem = document.getElementById(text+Num);
        if(par[Num].hide == 0){
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
                  this.new_ADCs = resJson;
                  console.log(resJson);
                  var Mass_archs=[]
                  var Mass_interf=[]

                   fetch('https://adc.newpage.xyz/api/archs/').then(res => res.json())
                    .then(resJson2 => {
                      Mass_archs=resJson2
                      fetch('https://adc.newpage.xyz/api/interfaces/').then(res => res.json())
                        .then(resJson3 => {
                          Mass_interf=resJson3;
                          for(var i=0; i<this.ARCs.length; i++){
                            this.ARCs[i].arch=Mass_archs[this.ARCs[i].arch];
                            this.ARCs[i].interface=Mass_interf[this.ARCs[i].interface];
                            console.log('test');
                            
                          }
                        })
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