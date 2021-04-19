Vue.component('btn_blues', {
    props: ['text','a','_submit','_width','_tabindex','_color','_src'],
    template: `		
    <div class="btn_blues ">
            <link rel="stylesheet" href="/OPD/static/style/card__btn2.css">
            <div class="card__btn2 btn1":style="{ width: _width }">
                <img v-if='_src' :src=_src alt="" class="btn1__img">
            	<a v-if="a" href="" tabindex="4" @click="$emit('click')" v-bind:style="{ color: _color }">{{ text }} </a>
            	<input v-if="_submit" type="button" :value=text  :tabindex=_tabindex @click="$emit('click')" >
            </div>
    </div>
    `
})