import Poc from './src/Poc.vue'
Poc.install = function(Vue) {
    Vue.component(Poc.name, Poc)
}
export default Poc;