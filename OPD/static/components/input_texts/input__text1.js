Vue.component('input__text1', {
    props: ['_name','_placeholder','_type','_tabindex','_border', '_value',"_readonly"],
    template: `		

    <div class="input__text1" v-if='_border == "true"' 
         style='border: 1px solid black; border-radius: 35px;'>
     <link rel="stylesheet" href="/static/style/input__text1.css">
    <input class="card__text" :type=_type required
          :value=_value  :placeholder=_placeholder  :name=_name :tabindex=_tabindex v-on:input="$emit('input', $event.target.value)" suggested="current-password">
   </div>
    <div class="input__text1" v-else>
     <link rel="stylesheet" href="/static/style/input__text1.css">
    <input class="card__text" :type=_type required v-if="_readonly" readonly
          :value=_value  :placeholder=_placeholder  :name=_name :tabindex=_tabindex v-on:input="$emit('input', $event.target.value)">
     <input class="card__text" :type=_type required v-else 
          :value=_value  :placeholder=_placeholder  :name=_name :tabindex=_tabindex v-on:input="$emit('input', $event.target.value)">
   </div>

    `,

})