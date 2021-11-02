<template>
    <view class="container">
        <view class="red">{{ textNum }}</view>
        <view class="green">{{ add }}</view>
        <button bind:tap="changeNum" class="other-info">点我222</button>

        <view wx:for="{{ arr }}" wx:key="index" class="item" bind:tap="showMe" data-index="{{index}}"> <demo-tag></demo-tag></view>
    </view>
</template>
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
@import url('../../style/common.less');
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
.demo {
    color: #000;
}
</style>
