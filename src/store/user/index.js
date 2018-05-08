import * as firebase from 'firebase';

export default {
    state: {
        user: null,
    },
    mutations: {
        registerUserForMeetup(state, payload) {
            const id = payload.id;
            if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
                return;
            }
            state.user.registeredMeetups.push(id);
            state.user.fbKeys[id] = payload.fbKey;
        },
        unregisterUserForMeetup(state, payload) {
            const registeredMeetups = state.user.registeredMeetups;
            registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
            Reflect.deleteProperty(state.user.fbKeys, payload);
        },
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        registerUserForMeetup({ commit, getters }, payload) {
            commit('setLoading', true);
            const user = getters.user;
            firebase.database().ref('/users/' + user.id).child('/registrations/')
                .push(payload)
                .then(data => {
                    commit('registerUserForMeetup', {
                        id: payload,
                        fbKey: data.key
                    });
                    commit('setLoading', false);
                })
                .catch(error => {
                    console.log(error);
                    commit('setLoading', false);
                });
        },
        unregisterUserForMeetup({ commit, getters }, payload) {
            commit('setLoading', true);
            const user = getters.user;
            if (!user.fbKeys) {
                return;
            }
            const fbKey = user.fbKeys[payload];
            firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
                .remove()
                .then(() => {
                    commit('unregisterUserForMeetup', payload);
                    commit('setLoading', false);
                })
                .catch(error => {
                    console.log(error);
                    commit('setLoading', false);
                });
        },
        signUserUp({ commit }, payload) {
            commit('setLoading', true);

            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit('setLoading', false);
                    commit('clearError')
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: [],
                        fbKeys: {}
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
                    commit('clearError');
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: [],
                        fbKeys: {}
                    }
                    commit('setUser', newUser);
                })
                .catch(error => {
                    commit('setLoading', false);
                    commit('setError', error);
                    console.log(error);
                });
        },
        autoSignIn({ commit }, payload) {
            commit('setUser', {
                id: payload.uid,
                registeredMeetups: [],
                fbKeys: {}
            });
        },
        fetchUserData({ commit, getters }) {
            commit('setLoading', true);
            firebase.database().ref('/users/' + getters.user.id + '/registrations').once('value')
                .then(data => {
                    const dataPairs = data.val();
                    let registeredMeetups = [];
                    let swappedPairs = {};

                    for (let key in dataPairs) {
                        registeredMeetups.push(dataPairs[key]);
                        swappedPairs[dataPairs[key]] = key;
                    }

                    const updatedUser = {
                        id: getters.user.id,
                        registeredMeetups: registeredMeetups,
                        fbKeys: swappedPairs
                    }

                    commit('setUser', updatedUser);
                    commit('setLoading', false);
                })
                .catch(error => {
                    commit('setLoading', false);
                    commit('setError', error);
                    console.log(error);
                });
        },
        logout({ commit }) {
            firebase.auth().signOut();
            commit('setUser', null);
        }
    },
    getters: {
        user(state) {
            return state.user;
        }
    }
};