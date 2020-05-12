<template>
    <form v-if="visible" @submit.prevent> <!-- якщо форма видима то показати її і відмінити надсилання запиту за замовчуванням-->
        <label> Назва <input type="text" v-model="foto.title" required> </label> <br>
        <label> Опис <input type="text" v-model="foto.shortDescribe"> <inputt></label> <br>
        <label> Текст <input type="text" v-model="foto.text"> </label> <br>
        <label> Дата публікації <input type="date" v-model="foto.date"> </label> <br>
        <label> Кількість <input type="number" v-model.number="foto.count" min="0" step="0.01"> </label> <br>  
        <input type="button" @click="save()" value="Зберегти">     
    </form>
</template>

<script>
import setInput from "./setInput";
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
    name: "fotoForm",   
    data(){
        return{            
        }
    },
    components:{
        setInput
    },
    computed:{
        ...mapState({
            foto:"formFoto",
            visible:"formVisible",
            newMode:"formNewMode"
        })
    },
    methods:{
        ...mapActions(["patchFoto","postFoto"]),
        ...mapMutations(["hideForm"]),
        async save(){
            if (this.newMode)
                await this.postForum(this.foto);
            else
                await this.patchForum(this.foto);    
            this.hideForm();         
        }
    }
}
</script>
<style scoped>
    form{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: white ;
    }
</style>