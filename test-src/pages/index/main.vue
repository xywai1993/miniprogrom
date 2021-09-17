<template>
    <view class="container">
        <view>{{ textNum }}</view>
        <view>{{ add }}</view>
        <button bindtap="changeNum" class="other-info">点我222</button>

        <view wx:for="{{ arr }}" wx:key="index">{{ index }}</view>
    </view>
</template>
<script>
const app = getApp();
import { reactive, isProxy, computed, effect } from '@vue/reactivity';
import { map } from 'underscore';

const data = reactive({
    textNum: 0,
    arr: new Array(10).fill(1),
    add: computed(() => data.textNum + 10),
});

const d = isProxy(data);

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
.container {
    background: #000;
}
</style>
