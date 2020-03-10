<template>
    <div class="poc-header" >
        <!-- 左侧 -->
        <div @click.stop class="poc-left-area" id="LEFT_AREA" :style="{'flex-basis': menuWidth}">
            <div class="icon-area">
                <div class="poc-menu-icon" :class="{'actived': isSlide}" @click="clickHandle">
                    <span class="poc-menu-icon-item"></span>
                    <span class="poc-menu-icon-item"></span>
                    <span class="poc-menu-icon-item"></span>
                </div>
                <slot name="icon"></slot>
            </div>  
            <ul class="poc-page-list">
                <li class="poc-page-item" v-for="item in list" :key="item.key">
                    <a class="poc-page-item-link" tabindex="-1" :href="item.link">
                        <img class="poc-page-item-img" :src="item.src" />
                        <span class="poc-page-item-span">{{item.name}}</span>
                    </a>
                </li>
            </ul>
        </div>
        <!-- 中间slot -->
        <div class="poc-center-area">
            <slot name="center"></slot>
        </div>
        <div @click.stop class="poc-right-area">
            <ul class="poc-feature-list">
                <li v-if="!!helpLink"  class="poc-feature-item" @click.stop="clickLiHandle(helpLink)">
                    <img class="poc-feature-item-icon" src="http://img30.360buyimg.com/jr_image/jfs/t1/95467/4/14465/1186/5e66162fEe60ea3c0/f15806200277ddc9.png" alt="" />
                    <span class="poc-feature-item-name">帮助中心</span>
                </li>
                <li class="poc-feature-item" @click.stop="fullSceen">
                    <img class="poc-feature-item-icon" src="http://img30.360buyimg.com/jr_image/jfs/t1/93416/30/14488/503/5e66162fE33d655bf/0c0a01a0fdc26e20.png" alt="" />
                    <span class="poc-feature-item-name">{{isFull ? '退出全屏' : '全屏'}}</span>
                </li>
                <li v-if="!!messageLink" class="poc-feature-item" @click.stop="clickLiHandle(messageLink)">
                    <img class="poc-feature-item-icon" src="http://img30.360buyimg.com/jr_image/jfs/t1/88965/23/14485/710/5e66162fE207463a9/e4db349240a4664d.png" alt="" />
                    <span class="poc-feature-item-name">消息</span>
                </li>
            </ul>
            <div class="poc-user" :class="{actived: actived}" @click="actived = !actived">
                <div class="poc-user-container">
                    <span class="poc-user-name">{{user}}</span>
                    <span class="poc-user-icon"></span>
                </div>
                <div class="poc-logout" @click.stop="logout" v-show="actived">
                    <p class="poc-logout-name">退 出</p>
                    <div class="poc-arrow"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import jsonp from './jsonp.js'
export default {
    name: 'PocHeader',
    props: {
        menuWidth: String,
        messageLink: String,
        helpLink: String
    },
    data() {
        return {
            isSlide: false,
            actived: false,
            isFull: false,
            user: '默认',
            list: [
                {
                    key: 'molo',
                    name: '摹略-运营平台',
                    src: 'http://img30.360buyimg.com/jr_image/jfs/t1/88329/4/14470/515/5e65efa7Ed3c7d5df/97cbaac6065793dc.png',
                    link: 'http://molo.jd.com'
                },
                {
                    key: 'lego',
                    name: '乐高-资源管理',
                    src: 'http://img30.360buyimg.com/jr_image/jfs/t1/107824/5/8208/448/5e65efa7E1b208d81/bc739202bd467e83.png',
                    link: 'http://mcmktadmin.jd.com'
                },
                {
                    key: 'hangmu',
                    name: '航母-管理后台',
                    src: 'http://img30.360buyimg.com/jr_image/jfs/t1/89569/39/14359/470/5e65efa6E35dbbedb/a11c35a38cee20b1.png',
                    link: 'http://resjr.jd.com'
                }
            ]
        }
    },
    methods: {
        clickHandle(e) {
            e.stopPropagation();
            if ((this.isSlide = !this.isSlide)) {
                const viewportHeight = document.documentElement.offsetHeight,
                    target = document.getElementById('LEFT_AREA');
                let parent = target,
                    offsetTop = target.offsetTop;
                while ((parent = parent.offsetParent)) {
                    offsetTop += parent.offsetTop;
                }
                target.style.height = `${viewportHeight - offsetTop}px`;
            } else {
                document.getElementById('LEFT_AREA').style.height = '';
            }
        },
        fullSceen() {
            let main = document.body
            if (!this.isFull) {
                if (main.requestFullscreen) {
                    main.requestFullscreen()
                } else if (main.mozRequestFullScreen) {
                    main.mozRequestFullScreen()
                } else if (main.webkitRequestFullScreen) {
                    main.webkitRequestFullScreen()
                } else if (main.msRequestFullscreen) {
                    main.msRequestFullscreen()
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen()
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                }
            }
        },
        logout() {
            window.location.href = `//passport.jd.com/uc/login?ltype=logout&ReturnUrl=${encodeURIComponent(window.location.href)}`;
        },
        clickLiHandle(url) {
            window.location.href = url
        },
        documentClickHandle() {
            this.actived = false;
            if (this.isSlide) {
                this.isSlide = false;
                document.getElementById('LEFT_AREA').style.height = '';
            }
        }
    },
    created() {
        let vm = this;
        jsonp(
            'https://passport.jd.com/call/getHelloJson', {
            data: {
                m: 'ls',
                _: (+ new Date),
            },
            callback: 'jQuery183027508230378578924_1583747349983'
        }).then(res => {
            vm.user = res.nick;
        }).catch(console.warn)
        document.onfullscreenchange = function () {
            vm.isFull = !vm.isFull;
        };
        document.addEventListener('click', this.documentClickHandle, false)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.documentClickHandle, false)
    },
}
</script>
<style lang="scss" scoped>
    .poc-header {
        position: relative;
        width: 100%;
        height: 60px;
        min-width: 1366px;
        box-shadow: 0px 1px 2px 0px rgba(168,168,168,0.3);
        background: #fff;
        display: flex;
        justify-content: space-between;
        .poc-left-area {
            position: relative;
            z-index: 999;
            width: 210px;
            height: 60px;
            overflow: hidden;
            background: #001529;
            transition: height .5s;
            flex: 0 0 210px;
            .icon-area {
                position: relative;
                height: 60px;
                color: #FFF;
            }
            .poc-menu-icon {
                position: absolute;
                right: 10px;
                top: 14px;
                width: 16px;
                height: 16px;
                padding: 8px;
                cursor: pointer;
                &-item {
                    display: block;
                    width: 16px;
                    height: 2px;
                    background: #ccc;
                    margin-bottom: 5px;
                    transform: rotateZ(0deg) translate3d(0px, 0px, 0px);
                    opacity: 1;
                    transition: all cubic-bezier(0.075, 0.82, 0.1, 1) 1s;
                }
                &.actived {
                    .poc-menu-icon-item {
                        &:first-child {
                            width: 22px;
                            transform: rotateZ(45deg) translate3d(3px, 7px, 0px);
                        }
                        &:nth-of-type(2) {
                            opacity: 0;
                        }
                        &:last-child{
                            width: 22px;
                            transform: rotateZ(-45deg) translate3d(3px, -7px, 0px);
                        }
                    }
                }
            }
        }
        .poc-page-list {
            position: relative;
            display: block;
            .poc-page-item {
                display: block;
                width: 100%;
                height: 44px;
                padding: 15px 25px;
                color: #fff;
                cursor: pointer;
                box-sizing: border-box;
                line-height: 14px;
                &-img {
                    margin-right: 12px;
                    vertical-align: top;
                }
                &-span {
                    color: #fff;
                    font-size: 14px;
                }
                &-link:active {
                    text-decoration: none;
                }
            }
            
        }
        .poc-center-area {
            flex: 1 1 auto;
            text-align: center;
            line-height: 60px;
            color: black;
            position: relative;
        }
        .poc-right-area {
            flex: 0 0 auto;
            color: black;
            .poc-feature-list {
                display: inline-block;
                overflow: hidden;
                height: 60px;
                .poc-feature-item {
                    float: left;
                    display: block;
                    padding: 18px 0;
                    height: 60px;
                    margin-right: 50px;
                    box-sizing: border-box;
                    cursor: pointer;
                    &:last-of-type {
                        margin-right: 0;
                    }
                    &-icon {
                        width: 24px;
                        height: 24px;
                        vertical-align: top;
                        margin-right: 10px;
                    }
                    &-name {
                        display: inline-block;
                        color: #333;
                        font-size: 14px;
                        line-height: 24px;
                    }
                }
            }
            .poc-user {
                position: relative;
                display: inline-block;
                height: 60px;
                margin-left: 50px;
                padding-right: 20px;
                line-height: 60px;
                cursor: pointer;
                &-name {
                    float: left;
                    color: #333;
                    font-size: 14px;
                    margin-right: 10px;
                }
                &-icon {
                    position: absolute;
                    top: 25px;
                    width: 5px;
                    height: 5px;
                    border: 1px solid #333;
                    border-left: none;
                    border-top: none;
                    transform: rotateZ(45deg);
                    transition: all cubic-bezier(0.075, 0.82, 0.165, 1) .5s;
                }
                &.actived {
                    .poc-user-icon {
                        transform: rotateZ(-135deg);
                        top: 28px
                    }
                }
                .poc-user-container {
                    overflow: hidden;
                }
                .poc-logout {
                    position: absolute;
                    top: 50px;
                    left: -18px;
                    z-index: 10;
                    margin: 5px 0;
                    background-color: #fff;
                    border: 1px solid #ebeef5;
                    border-radius: 4px;
                    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                    &::after {
                        top: 1px;
                        margin-left: -6px;
                        border-top-width: 0;
                        border-bottom-color: #fff;
                        content: " ";
                        border-width: 6px;
                        position: absolute;
                        display: block;
                        width: 0;
                        height: 0;
                        border-color: transparent;
                        border-style: solid;
                    }
                    .poc-arrow {
                        top: -6px;
                        left: 50%;
                        margin-right: 3px;
                        border-top-width: 0;
                        border-bottom-color: #ebeef5;
                        border-width: 6px;
                        filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
                        position: absolute;
                        display: block;
                        width: 0;
                        height: 0;
                        border-color: transparent;
                        border-style: solid;
                    }
                    &-name {
                        list-style: none;
                        line-height: 36px;
                        padding: 0 20px;
                        margin: 0;
                        font-size: 14px;
                        color: #606266;
                        cursor: pointer;
                        outline: none;
                    }
                }
            }
        }
    }
</style>