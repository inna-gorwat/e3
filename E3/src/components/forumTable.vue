<template>
    <div>
        <p v-if="fotoList.length==0" class="alert">
           Фото немає
        </p>
        
        <table v-if="fotoList.length>0">
            <tr>
                <th>#</th>
                <th v-on:click="sort('title')">  Назва </th>
                <th v-on:click="sort('describe')"> Опис  </th>
                <th v-on:click="sort('text')">  Текст </th>
                <th v-on:click="sort('date')"> Дата </th>
                <th v-on:click="sort('count')"> Кількість </th>
                <th></th>
            </tr>
            <fotoTableRow v-for="(foto,index) in fotoList" 
                v-bind:key="foto._id" 
                v-bind="{foto,index}"
                @remove="remove"
                @update="update" 
            >             
            </fotoTableRow>
        </table>
    </div> 
</template>

<script>
import fotoTableRow from "./fotoTableRow";
import { mapGetters, mapMutations} from 'vuex';


export default {
    name:"fotoTable",      
    data(){
        return{         
          
        }
    },
    components:{
        fotoTableRow
    },
    computed:{
       ...mapGetters({
           foto:"filtredFotos"
       }) 
    },    
    methods:{
        ...mapMutations({
            sort:"sortFotos"
        })
    }    
}
</script>

<style scoped>
    .alert{
        background: yellow;
        color: crimson;
    }

    table, table td{
        border-collapse: collapse;
        border: 1px solid black;
        width: 100%;
    }
</style>