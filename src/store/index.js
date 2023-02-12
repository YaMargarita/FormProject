import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        selectedCityId: 1,
        popupTemplate: '',
        listOfCities: [
            {
                id: 1,
                name: "Москва"
            },
            {
                id: 2,
                name: "Санкт-Петербург"
            },
            {
                id: 3,
                name: "Казань"
            }
        ]
    },
    getters: {
        getSelectedCityId(state) {
            return state.selectedCityId;
        },
        getPopupTemplate(state) {
            return state.popupTemplate;
        },
        getListOfCities(state) {
            return state.listOfCities;
        }
    },
    mutations: {
        updateSelectedCityId(state, id) {
            state.selectedCityId = id;
        },
        updatePopupTemplate(state, template) {
            state.popupTemplate = template;
        }
    },
    actions: {
        setCityId({commit}, id) {
            commit('updateSelectedCityId', id);
        },
        setPopupTemplate({commit}, template) {
            commit('updatePopupTemplate', template);
        },
        async sendFormToServer({commit}, params) {
            await axios.post('http://hh.autodrive-agency.ru/test-tasks/front/task-7/', params)
                .then(response => response.data)
                .then(template => {
                    commit('updatePopupTemplate', template);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
})