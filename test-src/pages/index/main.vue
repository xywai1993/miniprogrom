<template>
    <view class="container">
        <view class="red">{{ textNum }}</view>
        <view class="green">{{ add }}</view>
        <button bindtap="changeNum" class="other-info">点我222</button>

        <view wx:for="{{ arr }}" wx:key="index" class="item" bind:tap="showMe" data-index="{{index}}">{{ index }}</view>
    </view>
</template>
<script>
const app = getApp();
import { reactive, isProxy, computed, effect, readonly } from '@vue/reactivity';
import * as test from '../../util/test2.js';
import { test1 } from '../../util/test';
test1();
console.log(test.test1());
console.log('main.vue');
const data = reactive({
    textNum: 0,
    arr: new Array(10).fill(1),
    add: computed(() => data.textNum + 10),
});

const d = isProxy(data);
console.log(d);
Page({
    data: data,
    onLoad() {
        const that = this;
        effect(() => {
            that.setData(data);
        });
    },

    changeNum() {
        data.textNum = data.textNum + 4;
    },
    showMe(event) {
        console.log(event);
    },
});
</script>

<config lang="json">
{
    "backgroundColor": "#f9f9f9"
}
</config>

<style lang="less">
.container {
    background: #fff;
    > .red {
        color: red;
    }
    > .green {
        color: green;
    }
}
.item {
    height: 60rpx;
    border: 1px solid #000;
    line-height: 60rpx;
    width: 100%;
    background-color: #f5f5f5;
}
</style>
