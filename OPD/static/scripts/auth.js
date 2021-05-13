
new Vue({

    el: '#app',
    vuetify: new Vuetify(),
    data: {
      src: '/OPD/static',
      email: '',
      password: '',
      answer: [],
      form: [],
      dialog: false,
      dialog2: false,
      forgotEmail: '',
      answer: '',
    },
    mounted() {
      this.token=this.getCookie('token')
      this.session=this.getCookie('session')
    },
    methods: {
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
      onEnterClick: function() {
     alert('Enter was pressed');
    },
      handleSubmit() {
         var form = new FormData(document.getElementById('login-form'));
         //send form
          fetch('https://adc.newpage.xyz/api/auth?'+'email='+form.get('email')+'&'+'password='+form.get('password')).then(res => res.json())
                .then(resJson => {
                  this.answer =  resJson;
                   if (this.answer.length == 0){
                     alert('server bugs... mb');
                  }
                  else{
                     if (this.answer === false){
                        alert('wrong password or email')
                     }
                     else{
                        //save cookie
                        document.cookie = "token="+this.answer.token+"; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT; ";
                        document.cookie = "session="+this.answer.session+"; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT; ";
                        if (this.getCookie('token') == this.answer.token & this.getCookie('session') == this.answer.session){
                          //пока фронтенд жифет отдельно
                          window.location.href = `/static/main/`
                           // пири соединение с беком:
                           //window.location.href = `/static/show_users/`
                          //
                        }
                     }
                  }
                })
      },
      onEnter: function() {
      },
      EventForgotPassword: function(c_nme){
        const formBody = new FormData();
              formBody.append('email', this.forgotEmail)
        fetch('https://tm.newpage.xyz/api/forgot_password/', {
          method: 'POST',
          body: formBody
        }).then(res => res.json())
        .then(resJson =>{
          if (resJson != true){
            alert('wrong email')
          }
          else{
            alert('Письмо с информацией для востановения пароля было отправленно на указанную почту')
          }
        })
      },
    },
});