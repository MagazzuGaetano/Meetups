import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    LoadedMeetups: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    cancelMeetup (state, payload) {
      const meetupId = payload
      if (!meetupId) return
      for (var meetup in state.LoadedMeetups) {
        if (state.LoadedMeetups[meetup].id === meetupId) {
          state.LoadedMeetups.splice(meetup, 1)
          break
        }
      }
    },
    registerUserForMeetup (state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) return
      state.user.registeredMeetups.push(id)
      state.user.fbkeys[id] = payload.fbkey
    },
    unregisterUserFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
      Reflect.deleteProperty(state.user.fbkeys, payload)
    },
    setLoadedMeetups (state, payload) {
      state.LoadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.LoadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.LoadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) meetup.title = payload.title
      if (payload.description) meetup.description = payload.description
      if (payload.date) meetup.date = payload.date
      if (payload.place) meetup.place = payload.place
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    cancelMeetup ({commit}, payload) {
      const meetupId = payload
      if (!payload) return
      firebase.database().ref('meetups').child(meetupId).remove()
        .then(() => {
          commit('cancelMeetup', meetupId)
        })
        .catch(error => {
          console.log(error)
        })
    },
    registerUserForMeetup ({commit, getters}, payload) {
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registrations/')
        .push(payload)
        .then(data => {
          commit('registerUserForMeetup', {id: payload, fbkey: data.key})
        })
        .catch(error => {
          console.log(error)
        })
    },
    unregisterUserFromMeetup ({commit, getters}, payload) {
      const user = getters.user
      if (!user.fbkeys) return
      const fbkey = user.fbkeys[payload]
      firebase.database().ref('/users/' + user.id + '/registrations/').child(fbkey)
        .remove()
        .then(() => {
          commit('unregisterUserFromMeetup', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    loadMeetups ({commit}, state) {
      commit('setLoading', true)
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
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        place: payload.place,
        description: payload.description,
        date: payload.date.toISOString(),
        author: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((data) => {
          console.log(data)
        })
    },
    updateMeetup ({commit}, payload) {
      const updateObj = {}
      if (payload.title) updateObj.title = payload.title
      if (payload.description) updateObj.description = payload.description
      if (payload.date) updateObj.date = payload.date
      if (payload.place) updateObj.place = payload.place
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
        })
    },
    fecthUserData ({commit, getters}) {
      firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
        .then(data => {
          const dataPairs = data.val()
          let registeredMeetups = []
          let swappedPairs = {}
          for (let key in dataPairs) {
            registeredMeetups.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
          }
          const updatedUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            fbkeys: swappedPairs
          }
          commit('setUser', updatedUser)
        })
        .catch(error => {
          console.log(error)
        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            commit('clearError')
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
              fbkeys: {}
            }
            commit('setUser', newUser)
          })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
       .then(
          user => {
            commit('setLoading', false)
            commit('clearError')
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
              fbkeys: {}
            }
            commit('setUser', newUser)
          })
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
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
      commit('setUser', {id: payload.uid, registeredMeetups: [], fbkeys: {}})
    },
    signUserWithGoogleAuth ({commit}) {
      var provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')

      firebase.auth().signInWithPopup(provider)
        .then(result => {
          var token = result.credential.accessToken
          var user = result.user
          console.log(user + ':' + token)
          commit('clearError')
        })
        .catch(error => {
          commit('setError', error)
          console.log(error.message)
        })
    },
    signUserWithFacebookAuth ({commit}) {
      var provider = new firebase.auth.FacebookAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')

      firebase.auth().signInWithPopup(provider)
        .then(result => {
          var token = result.credential.accessToken
          var user = result.user
          console.log(user + ':' + token)
          commit('clearError')
        })
        .catch(error => {
          commit('setError', error)
          console.log(error.message)
        })
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    error (state) {
      return state.error
    },
    loading (state) {
      return state.loading
    },
    registeredMeetups (state, getters) {
      const registeredMeetups = []
      for (let registeredMeetup in getters.user.registeredMeetups) {
        for (let meetup in getters.loadedMeetups) {
          if (getters.user.registeredMeetups[registeredMeetup] === getters.loadedMeetups[meetup].id) {
            registeredMeetups.push(getters.loadedMeetups[meetup])
          }
        }
      }
      return registeredMeetups
    },
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
