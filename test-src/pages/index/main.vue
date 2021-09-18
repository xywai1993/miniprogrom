<template>
    <view class="container">
        <view class="red">{{ textNum }}</view>
        <view class="green">{{ add }}</view>
        <button bindtap="changeNum" class="other-info">点我222</button>

        <view wx:for="{{ arr }}" wx:key="index">{{ index }}</view>
    </view>
</template>
<script>
const app = getApp();
import { reactive, isProxy, computed, effect } from '@vue/reactivity';
import { map } from 'underscore';
import { test1 } from '../../util/test2.js';

test1();
console.log(app);
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
        data.textNum = data.textNum + 1;
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
</style>
