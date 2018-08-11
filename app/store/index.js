import Vuex from "vuex";

const createStore = () => {
    return new Vuex.Store({
        state: {
            locales: ["en", "zh"],
            locale: "zh",

            counter: 0,
            authUser: {},
            indexlist: []
        },
        mutations: {
            increment(state) {
                state.counter++;
            },
            indexlistFn(state, data) {
                state.indexlist = data;
            },
            SET_USER: function(state, user) {
                state.authUser = user;
            },
            SET_LANG(state, locale) {
                if (state.locales.indexOf(locale) !== -1) {
                    state.locale = locale;
                }
            }
        },
        actions: {
            nuxtServerInit({ commit }, { req }) {
                if (req.session && req.session.authUser) {
                    commit("SET_USER", req.session.authUser);
                }
            }
        }
    });
};

export default createStore;
