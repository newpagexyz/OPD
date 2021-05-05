new Vue({
    el: '#app',
    vuetify: new Vuetify(),
     data: {
      src: '/static',
      
     },
     mounted() {
       this.token=this.getCookie('token')
        this.session=this.getCookie('session')
        // проверка на наличие куков
        if (this.token == undefined || this.token == "empty") {
          window.location.href = `/static/auth/`
        }

     },
     methods: {

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
      handleSubmit: function(){
         var form = new FormData(document.getElementById('adc-form'));
              console.log(form.get('model'));
              console.log(form.get('arch'));
              console.log(form.get('interface'));
              console.log(form.get('image'));
              console.log(form.get('cxeme'));
              console.log(form.get('tech'));
              console.log(form.get('description'));
              console.log(form.get('resolution'));
              console.log(form.get('resolution'));

             form.append('session',this.session)
             form.append('token',this.token)
             var Vform = new FormData();
                 Vform.append('session',this.session)
                 Vform.append('token',this.token)
                 Vform.append('image',form.get('image'))
                 Vform.append('image',form.get('cxeme'))
                 Vform.append('image',form.get('tech'))
          fetch('https://adc.newpage.xyz/api/edit_adc/', {
                    method: 'POST',
                    body: form
                }).then(res => res.json())
                .then(resJson => {
                  console.log(resJson);
                })
      }
     },
});