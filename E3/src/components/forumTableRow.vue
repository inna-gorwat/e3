
<template>
    <tr>        
        <td> {{index}} </td>
        <td> {{foto.title}} </td>
        <td> {{foto.describe}} </td>
        <td> {{new Date(foto.published).toLocaleDateString()}} </td>
        <td> {{foto.text}} </td>
        <td> {{foto.count}} </td>
        <td>
            <input type="button" value="Вилучити" @click="remove(index)">
            <input type="button" value="Редагувати" @click="update(index)">
        </td>        
    </tr>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name:"fotoTableRow",
    props:{
        index:Number,
        foto:Object        
    },
    data(){   
        return{

        }
    },
    methods:{ 
        ...mapActions(["deleteFoto", "showUpdateForm"]),
        updated(){
        console.log(this.foto);
        }            
    }
}
</script>

<style scoped>
    td{
        border: 1px solid black;
    }
</style>