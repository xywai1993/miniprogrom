<template>
    <view class="container">
        <view>{{ textNum }}</view>
        <view>{{ add }}</view>
        <button bindtap="changeNum" class="other-info">点我222</button>

        <view wx:for="{{ arr }}" wx:key="index">{{ index }}</view>
    </view>
</template>
<script>
//index.js
const app = getApp();
import { reactive, isProxy, computed, effect } from '@vue/reactivity';
import { map } from 'underscore';

const data = reactive({
    textNum: 0,
    arr: new Array(10).fill(1),
    add: computed(() => data.textNum + 1),
});

const d = isProxy(data);
console.log('几次呢/1111/32222');
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

<style>
.bg {
    width: 100%;
    background-color: #000;
}

image {
    width: 100%;
    vertical-align: middle;
}

.other-info {
    color: #e09de7;
    padding: 0 20rpx;
    margin-top: 20rpx;
}
</style>
