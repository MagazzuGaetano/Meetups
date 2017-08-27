import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    LoadedMeetups: [],
    user: null
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.LoadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.LoadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    loadMeetups ({commit}) {
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              date: obj[key].date,
              place: obj[key].place,
              imageUrl: obj[key].imageUrl,
              author: obj[key].author
            })
          }
          commit('setLoadedMeetups', meetups)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        place: payload.place,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        author: getters.user.id
      }
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          const key = data.key
          commit('createMeetup', {
            ...meetup,
            id: key
          })
        })
        .catch((data) => {
          console.log(data)
        })
    },
    signUserUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          })
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
       .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          })
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserOut ({commit}, payload) {
      firebase.auth().signOut()
        .then(
          user => {
            const newUser = null
            commit('setUser', newUser)
          }
        )
        .catch(
            error => {
              console.log(error)
            }
          )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: []})
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.LoadedMeetups.sort((MeetupA, MeetupB) => {
        return MeetupA.date > MeetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupid) => {
        return state.LoadedMeetups.find((meetup) => {
          return meetup.id === meetupid
        })
      }
    },
    user (state) {
      return state.user
    }
  }
})
