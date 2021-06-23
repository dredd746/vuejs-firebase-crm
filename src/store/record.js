import firebase from 'firebase/app'
export default {
    actions: {
        async createRecord({dispatch,commit},record) {
            try{
                const uid = await dispatch('getUid')
                return await firebase.database().ref(`/users/${uid}/records`).push(record)
            } catch(e) {
                commit('setError',e)
                throw e
            }
        },
        async createBillsIn({dispatch,commit},record) {
            try{
                const uid = await dispatch('getUid')
                return await firebase.database().ref(`/users/${uid}/billsin`).push(record),
                        await firebase.database().ref(`/admin/billsin`).push(record)
            } catch(e) {
                commit('setError',e)
                throw e
            }
            
        },
        async createBillsOut({dispatch,commit},record) {
            try{
                const uid = await dispatch('getUid')
                return await firebase.database().ref(`/users/${uid}/billsout`).push(record),
                await firebase.database().ref(`/admin/billsout`).push(record)
            } catch(e) {
                commit('setError',e)
                throw e
            }
        },
        async createWorkers({dispatch,commit},record) {
            try{
                const uid = await dispatch('getUid')
                return await firebase.database().ref(`/users/${uid}/workers`).push(record),
                await firebase.database().ref(`/admin/workers`).push(record)
            } catch(e) {
                commit('setError',e)
                throw e
            }
        },
        async fetchUserName({dispatch,commit}){
            try{
                const uid = await dispatch('getUid')
                const username = await firebase.database().ref(`/users/${uid}`).child('name').get()
                return  username             
            } catch(e) {
                commit('setError',e)
                throw e
            }
        },
        async fetchAdminBillsIn({dispatch,commit}){
            try{
                const records = (await firebase.database().ref(`/admin/billsin`).once('value')).val() || {} 
                return Object.keys(records).map(key => ({...records[key], id: key}))                
            } catch(e) {
                commit('setError',e)
                throw e
            }
        },
        async fetchAdminBillsout({dispatch,commit}){
            try{
                const records = (await firebase.database().ref(`/admin/billsout`).once('value')).val() || {} 
                return Object.keys(records).map(key => ({...records[key], id: key}))                
            } catch(e) {
                commit('setError',e)
                throw e
            }
        },
        async fetchAdminWorkers({dispatch,commit}){
            try{
                const records = (await firebase.database().ref(`/admin/workers`).once('value')).val() || {} 
                return Object.keys(records).map(key => ({...records[key], id: key}))                
            } catch(e) {
                commit('setError',e)
                throw e
            }
        },
        async fetchRecords({dispatch,commit}){
            try{
                const uid = await dispatch('getUid')
                const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {} 
                //in caz ca nu exista se pune un obiect fara valori
                
                return Object.keys(records).map(key => ({...records[key], id: key}))
                //creaza un array din datele care au venit de pe server
                
            } catch(e) {
                commit('setError',e)
                throw e
            }
        },
        async fetchWorkers({dispatch,commit}){
            try{
                const uid = await dispatch('getUid')
                const records = (await firebase.database().ref(`/users/${uid}/workers`).once('value')).val() || {} 
                //in caz ca nu exista se pune un obiect fara valori
                
                return Object.keys(records).map(key => ({...records[key], id: key}))
                //creaza un array din datele care au venit de pe server
                
            } catch(e) {
                commit('setError',e)
                throw e
            }
        },
        async fetchBillsIn({dispatch,commit}){
            try{
                const uid = await dispatch('getUid')
                const records = (await firebase.database().ref(`/users/${uid}/billsin`).once('value')).val() || {} 
                //in caz ca nu exista se pune un obiect fara valori
                
                return Object.keys(records).map(key => ({...records[key], id: key}))
                //creaza un array din datele care au venit de pe server
                
            } catch(e) {
                commit('setError',e)
                throw e
            }
        },
        async fetchBillsOut({dispatch,commit}){
            try{
                const uid = await dispatch('getUid')
                const records = (await firebase.database().ref(`/users/${uid}/billsout`).once('value')).val() || {} 
                //in caz ca nu exista se pune un obiect fara valori
                
                return Object.keys(records).map(key => ({...records[key], id: key}))
                //creaza un array din datele care au venit de pe server
                
            } catch(e) {
                commit('setError',e)
                throw e
            }
        },
        async fetchRecordById({dispatch,commit},id){
            try{
                const uid = await dispatch('getUid')
                const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || null 
                return {...record,id}
                //creaza un array din datele care au venit de pe server
                
            } catch(e) {
                commit('setError',e) // intoarce child error daca id-ul e invalid
                throw e
            }
        }
    }
}