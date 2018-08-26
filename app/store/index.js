import Vuex from "vuex";

const createStore = () => {
    return new Vuex.Store({
        state: {
            locales: ["en", "zh"],
            locale: "zh",
            user: {},
            indexlist: []
        },
        mutations: {

            indexlistFn(state, data) {
                state.indexlist = data;
            },
            SET_USER: function(state, user) {
                state.user = user;
            },
            SET_LANG(state, locale) {
                if (state.locales.indexOf(locale) !== -1) {
                    state.locale = locale;
                }
            }
        },
        actions: {
            nuxtServerInit({ commit }, { req }) {
                if (req.session && req.session.user) {
                    commit("SET_USER", req.session.user);
                }
            }
        }
    });
};

export default createStore;
