export default {
    install(Vue,options){
        Vue.prototype.$message = function(html){
            M.toast({html})
        }
        Vue.prototype.$error = function(text){
            M.toast({html: `[error]: ${text}`,classes: 'rounded'})
        }
    }
}