import Vuex from 'vuex';
import Vue from "vue";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        title:"",
        describe:"",
        text: "",
        date:Date,
        count:0
    },
    getters: {
        firstMessage(state) {
            return state.messages[0];
        },
        areSomeMessages(state) {
            return state.messages.length > 0;
        },
        messagesCount(state) {
            return state.messages.length
        },
        filtredNewws(state) {
            let result = state.fotos;
            if (state.searchString)
                result = result.filter(foto =>
                    foto.title.toLowerCase().includes(state.searchString.toLowerCase())
                );
            return result;
        },

    },
    mutations: {
        addMessage(state, message) {
            state.messages.push(message);
        },
        removeMessage(state) {
            state.messages.shift();
        },


        setFotos(state, fotos) {
            state.foto = fotos;
        },
        addFoto(state, foto) {
            state.fotos.push(foto);
        },
        removeFoto(state, foto) {
            const index = state.fotos.indexOf(foto);
            state.fotos.splice(index, 1);
        },
        updateFoto(state, foto) {
            const index = state.fotos.findIndex(b => b._id == fotos._id);
            Vue.set(state.fotos, index, foto);
        },
        sortFotos(state, field) {
            state.fotos.sort((b1, b2) => b1[field] >= b2[field] ? 1 : -1);
        },

        showForm(state) {
            state.formVisible = true;
        },
        hideForm(state) {
            state.formVisible = false;
        },
        newFormMode(state) {
            state.formNewMode = true;
        },
        updateFormMode(state) {
            state.formNewMode = false;
        },

        clearFormFoto(state) {
            Object.assign(state.formForum, {
                title: "",
                describe: "",
                text:"",
                date: "1997-01-10T22:00:00.000Z",
                count: 0,
            });
        },
        setFormFoto(state, foto) {
            state.formFoto = foto;
        },
        setSerchString(state, string){
            state.searchString = string;
        }
    },
    actions: {
        async showMessageForTime(context, options) {
            const delay = options.delay || 5000;
            context.commit('addMessage', options.message);
            setTimeout(function () {
                if (context.getters.areSomeMessages)
                    context.commit('removeMessage');
            },
                delay);
        },


        async getFotos(context) {
            try {
                let resp = await axios.get("http://localhost:5000/foto");
                context.commit("setFotos", resp.data);
                await context.dispatch("showMessageForTime", { message: "фото завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async getFotoById(context, id) {
            try {
                let resp = await axios.get(`http://localhost:5000/foto/${id}`);
                await context.dispatch("showMessageForTime", { message: "фото завантажено", delay: 500 });
                return resp.data;
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async getFotosByQuery(context, query) {
            try {
                let resp = await axios.get("http://localhost:5000/foto", { params: query });
                context.commit("setFotos", resp.data);
                await context.dispatch("showMessageForTime", { message: "фото завантажено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }

        },
        async postFoto(context, foto) {
            try {
                let resp = await axios.post("http://localhost:5000/foto", foto);
                context.commit("addFoto", resp.data);
                await context.dispatch("showMessageForTime", { message: "фото додано", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async deleteFoto(context, foto) {
            try {
                let resp = await axios.delete(`http://localhost:5000/foto/${foto._id}`);
                context.commit("removeFoto", resp.data);
                await context.dispatch("showMessageForTime", { message: "фото вилучено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },
        async patchFoto(context, foto) {
            try {
                let resp = await axios.patch(`http://localhost:5000/foto/${foto._id}`, foto);
                context.commit("updateFoto", resp.data);
                await context.dispatch("showMessageForTime", { message: "фото оновлено", delay: 500 });
            }
            catch (e) {
                await context.dispatch("showMessageForTime", { message: e, delay: 5000 });
            }
        },

        async showUpdateForm(context, neww) {
            book = await context.dispatch("getFotoById", foto._id);
            context.commit("setFormFoto", foto);
            context.commit("updateFormMode");
            context.commit("showForm");
        },
        showAddForm(context) {
            context.commit("clearFormFoto");
            context.commit("newFormMode");
            context.commit("showForm");
        }
    }
});
export default store;
