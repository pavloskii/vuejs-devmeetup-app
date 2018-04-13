import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            {
                imageUrl:
                    "https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg",
                id: "asdsadsa123",
                title: "Meet up in NY",
                date: new Date(),
                location: 'New York',
                description: 'New york new york'
            },
            {
                imageUrl:
                    "https://www.telegraph.co.uk/content/dam/Travel/hotels/europe/france/paris/eiffel-tower-paris-p.jpg",
                id: "asdsaasdas12dsa123",
                title: "Meet up in Paris",
                date: new Date(),
                location: 'Paris',
                description: 'paris paris paris paris'
            }
        ],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload);
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setLoading(state, payload) {
            state.loading = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        clearError(state) {
            state.error = null;
        }
    },
    actions: {
        createMeetup({ commit }, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                id: "123asd32"
            }
            //reach out to firebase and store it
            commit('createMeetup', meetup);
        },
        signUserUp({ commit }, payload) {
            commit('setLoading', true);

            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit('setLoading', false);
                    commit('clearError', error);
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser);
                })
                .catch(error => {
                    commit('setLoading', false);
                    commit('setError', error);
                    console.log(error);
                });
        },
        signUserIn({ commit }, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit('setLoading', false);
                    commit('clearError', error);
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser', newUser);
                })
                .catch(error => {
                    commit('setLoading', false);
                    commit('setError', error);
                    console.log(error);
                });;
        }
    },
    getters: {
        loadedMeetups(state) {
            return state.loadedMeetups.sort((a, b) => {
                return a.date > b.date
            });
        },
        featuredMeetups(state, getters) {
            return getters.loadedMeetups.slice(0, 5);
        },
        loadedMeetup(state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId;
                });
            }
        },
        user(state) {
            return state.user;
        }
    }
});