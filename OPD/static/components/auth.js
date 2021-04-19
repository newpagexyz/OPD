Vue.component('auth-card', {
    template: `		
    <div class="auth-card ">
            <link rel="stylesheet" href="/static/style/auth-card.css">
    		<div class="card card__container">
                <div class="card__logo">
                    <div class="card_img ibg">
                        <img src="/static/img/logo.png" alt="logo">
                    </div>
                    <div class="card__title">Авторизация</div>
                </div>
                
                    <form action="" method="post" class="card__main">
                        <div class="card__inputs">
                            <div class="input__text1">
                            <input class="card__text" type="email" 
                            placeholder="Логин" required name="login" tabindex="1">
                            </div>
                            <div class="input__text1">
                                <input class="card__text" type="password" 
                                placeholder="Пароль" required name="pass" tabindex="2">
                            </div>
                            <a href="" class="change__password" tabindex="3">Забыли пароль?</a>

                        </div>
                        <div class="card__futter">
                            <div class="card__btn1 btn1">
                                <a href="" tabindex="4">Регистрация</a>
                            </div>
                            <div class="card__btn2 btn1">
                                 <input type="submit" value="Вход" tabindex="5">
                            </div>
                        </div>
                        
                    </form>
            
                <div class="card__bottom"></div>
            </div>
    </div>
    `
})