<template>
    <div class="body">
        <!-- <mp-navigation-bar :ext-class="'nav-bar'" :background="bgColor" :title="title" :back="false" color="#FFF">
            <view slot="left" v-show="!title">
                <input type="text" class="top-search" placeholder="2021年待产包清单" @confirm="confirm" @blur="searchBlur" />
            </view>
        </mp-navigation-bar> -->
        <button v-on:click="showMe">点我</button>
        <div class="g-flex-center header">
            <input type="text" v-show="title" class="search" placeholder="2021年待产包清单" />
        </div>

        <div class="grid" v-if="show">
            <div>
                <ul class="list-wrap">
                    <li v-for="li in arr" class="item">
                        <demo-tag></demo-tag>
                    </li>
                </ul>
            </div>
            <div>
                <ul class="list-wrap">
                    <li v-for="li in list2" class="item">
                        <list-tag :tag-data="li"></list-tag>
                    </li>
                </ul>
            </div>
        </div>

        <nav-nav hover="a"></nav-nav>
    </div>
</template>

<config lang="json">
{
    "backgroundColor": "#fff",
    "usingComponents": {
        "demo-tag": "/components/demo/main",
        "nav-nav": "/components/nav/main"
    }
}
</config>
<script>
const app = getApp();
import { effect, reactive, computed, isProxy } from '@vue/reactivity';
import { max } from 'underscore';
import { a } from '../../util/test';

console.log(max, a);

console.log('main.vue');
const data = reactive({
    textNum: a,
    arr: new Array(10).fill(1),
    add: computed(() => Number(data.textNum) + 10),
    show: false,
});

const d = isProxy(data);
console.log(d);
Page({
    data: data,
    onLoad() {
        const that = this;

        // Object.keys(data).forEach((val) => {
        //     effect(() => {
        //         console.log('val', val, data[val]);
        //         that.setData({ [val]: data[val] });
        //     });
        // });

        effect(() => {
            // console.log(1, data);
            that.setData(data);
        });
    },

    changeNum() {
        // data.textNum = data.textNum + 4;
        data.arr.push(10);
    },
    showMe(event) {
        console.log(2345);
        data.show = !data.show;
    },
});
</script>

<style lang="less">
.body {
    padding-bottom: calc(80px + env(safe-area-inset-bottom));
    background-color: #f2f2f2;
    min-height: 100vh;
}
.header {
    // margin-top: calc(-44px - env(safe-area-inset-top));
    width: 100%;
    height: 252px;
    // background: url('./static/souyebg@2x.png') center no-repeat;
    background-size: contain;
    opacity: 1;
}
.search {
    margin-top: 10px;
    padding-left: 35px;
    width: 312px;
    height: 40px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.13);
    opacity: 1;
    border-radius: 27px;
    // background: #fff url('./static/search-icon@2x.png') 10px center/18px auto no-repeat;
}
.top-search {
    width: 210px;
    padding-left: 30px;
    height: 32px;
    border: 1px solid rgba(247, 243, 245, 1);
    border-radius: 17px;
    color: #333;
    // background: #fff url('./static/search-icon@2x.png') 10px center/18px auto no-repeat;
}

.grid {
    margin: -65px auto 0;
    width: 96%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    box-sizing: border-box;
    gap: 10px;
}
.list-wrap {
    // margin-top: -40px;
    // padding: 0 10px;
    // column-count: 2;

    > .item {
        // break-inside: avoid;
        // padding: 0 10px;
        margin-bottom: 10px;
        box-sizing: border-box;
        box-shadow: 0px 3px 30px rgba(0, 0, 0, 0.06);
        opacity: 1;
        border-radius: 6px;
    }
}
</style>
