Vue.component('header1', {
   data: function () {
    return {
      token: '',
      session: '',
      isAuth: false,
    }
 },
    template: `
    <header class="header">
         <div class="header__title">Открытая база аналого-цифровых преобразователей</div>
         <div class="header__items">
            <div class="header__lable"><a href="/static/main/">Список</a></div>
            <div class="header__lable" >
            <a @click='Exit()' v-if='isAuth'>Выйти</a>
            <a href="/static/auth/" v-else>Авторизация</a>
            </div>
         </div>
      </header>
    `,
     mounted() {
        // проверка на наличие куков
         this.token=this.getCookie('token')
        this.session=this.getCookie('session')
        if (this.token == undefined || this.token == "empty") {
          this.isAuth=false;
        }
        else{
         this.isAuth=true;
        }
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
     },
})