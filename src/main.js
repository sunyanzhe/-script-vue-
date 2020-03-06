import Poc from '@/Poc'

const install = function(Vue) {
    Vue.component(Poc.name, Poc)
}

if (window !== undefined && window.Vue) {
    install(window.Vue);
    console.log('完成啦');
}


export default {
    Poc,
    install
}