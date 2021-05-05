Vue.component('btn_dark-blue', {
    props: ['text','a','_submit','_width','_tabindex','_src'],
    template: `		
    <div class="btn_dark-blue ">
            <link rel="stylesheet" href="/static/style/card__btn1.css">

            <div class="card__btn1 btn1":style="{ width: _width }">
                <img v-if='_src' :src=_src alt="" class="btn1__img">
            	<a v-if="a" href="" tabindex="4" @click="$emit('click')"  style='color: #fff;'>{{ text }} </a>
            	<input v-if="_submit" type="submit" :value=text  :tabindex=_tabindex @click="$emit('click')">
            </div>
            
    </div>
    `
})