Vue.component('btn_standart', {
    props: ['text','hrefffff'],
    template: `		
    <div class="btn_standart ">
            <link rel="stylesheet" href="/OPD/static/style/btn_standart.css">
    		<button><a v-bind:href="hrefffff">{{ text }}</a></button>
    </div>
    `
})