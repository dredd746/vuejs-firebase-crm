import firebase from 'firebase/app'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state,info){
            state.info = info
        },
        clearInfo(state){
            state.info = {}
        }
    },
    actions: {
        async updateInfo({dispatch,commit,getters},toUpdate){

            try {
                const uid = await dispatch('getUid')
                const updateData = {...getters.info, ...toUpdate}
                await firebase.database().ref(`/users/${uid}/info`).update(updateData)
                
                commit('setInfo',updateData)
            } catch(e) {
                commit('setError',e)
                throw e
            }

        },
        async updateInfo({dispatch,commit,getters},toUpdate){

            try {
                const uid = await dispatch('getUid')
                const updateData = {...getters.info, ...toUpdate}
                await firebase.database().ref(`/users/${uid}/info`).update(updateData)
                
                commit('setInfo',updateData)
            } catch(e) {
                commit('setError',e)
                throw e
            }

        },
            async getUserInfo({dispatch,commit}) {
            try {
                const uid = await dispatch('getUid')
                
                const info = await firebase.database().ref(`users/${uid}/info`).once("value", snap => {
                    let name = snap.val().name;
                    let status = snap.val().status;
                })
                
                commit('setInfo',info.val())
            } catch(e) {
                
            }
       
        },
        // async GetSatistics({dispatch,commit}) {
        //     try {
        //         const uid = await dispatch('getUid')
        //         this.$store.getters.info.name
        //         const info = await firebase.database().ref(`users/${uid}/info`).once("value", snap => {
        //             let name = snap.val().name;
        //         })
                
        //         commit('setInfo',info.val())
        //     } catch(e) {
                
        //     }
       
        // },

        // async ChangeStatus({dispatch,commit},id,toUpdate) {
        //     try {
        //         const uid = await dispatch('getUid')
        //         await firebase.database().ref(`/users/${uid}/info`).update(updateData)
        //     }
        //     catch (e) {

        //     }

        // }
    },
    getters: {
        info: s => s.info
    }
}