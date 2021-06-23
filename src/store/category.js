import firebase from 'firebase/app'

export default{
    actions: {
        async fetchCategories({commit,dispatch}) {
            try {
                const uid = await dispatch('getUid')
                const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
                // const cats = []
                // Object.keys(categories.val()).forEach(key => {
                //     cats.push({
                //         title: categories[key].title,
                //         limit: categories[key].limit,
                //         id: key
                //     })
                // })
                // return cats
                
                return Object.keys(categories).map(key => ({...categories[key], id: key}))
                
            }   catch(e){
                commit('setError',e)
                throw e
            }
        },
        
        async createCategory({commit,dispatch},{title,adress,email}){
            try {
                const uid = await dispatch('getUid')
                const category = await firebase.database().ref(`/users/${uid}/categories`).push({title,adress,email})
                await firebase.database().ref(`/admin/categories`).push({title,adress,email})
                return {title,adress,email,id: category.key}
            }   catch(e){
                commit('setError',e)
                throw e
            }
        },
        async updateCategoryInfo({commit,dispatch},{title,adress,email,id}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title,adress,email})
            }   catch(e){
                commit('setError',e)
                throw e
            }
        },
        async updateWorkersStatus({commit,dispatch},{status,id}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/workers`).child(id).update({status})
            }   catch(e){
                commit('setError',e)
                throw e
            }
        },
        async fetchCategoryById({commit,dispatch},id) {
            try {
                const uid = await dispatch('getUid')
                const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || null

                console.log({...category,id})
                return {...category,id}
                
            }   catch(e){
            //    commit('setError',e)
            //    throw e
            }
        }
    }
}