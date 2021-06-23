import firebase from 'firebase/app'
import { register } from 'register-service-worker'

export default {
    actions:{
        async login({dispatch,commit},{email,password}){
            try {
              await firebase.auth().signInWithEmailAndPassword(email,password)
            }
            catch(E) {
                commit('setError',E)
                throw E
            }
        }, 
        async logout({commit}){
            await firebase.auth().signOut()
            commit('clearInfo')
        },
        async register({dispatch,commit},{email,password,name}) {
            try {
              await firebase.auth().createUserWithEmailAndPassword(email,password)
              const uid = await dispatch('getUid')
              await firebase.database().ref(`/users/${uid}/info`).set({
                  status: 'user',
                  name
              })
              await firebase.database().ref(`/usersList`).push(name)
            }
            catch(E) {
                commit('setError',E)
                throw E
            }
        },
        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        }
    }
}