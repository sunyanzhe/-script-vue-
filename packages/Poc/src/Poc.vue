<template>
    <div class="poc-header">
        <div class="icon-area" @mouseenter="mouseEnterHandle">京东数科</div>
    </div>
</template>
<script>
export default {
    name: 'PocHeader',
    methods: {
        mouseEnterHandle(e) {
            e.target.height = window.innerHeight + 'px';
        }
    },
}
</script>
<style lang="scss" scoped>
    .poc-header {
        position: relative;
        width: 100%;
        height: 42px;
        box-shadow: 0px 1px 2px 0px rgba(168,168,168,0.3);
        background: #fff;
        .icon-area {
            position: absolute;
            left: 0px;
            width: 106px;
            height: 42px;
            background: #FFF;
            color: #001529;
            transition: background color height .5s;
            &:hover {
                color: #FFF;
                background: #001529;
            }
        }
    }
</style>