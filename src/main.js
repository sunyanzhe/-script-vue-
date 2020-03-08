import Poc from '@/Poc'

const install = function(Vue) {
    Vue.component(Poc.name, Poc)
}

if (window !== undefined && window.Vue) {
    install(window.Vue);
}


export default {
    Poc,
    install
}