<template>
    <view class="container">
        <view>{{ textNum }}</view>
        <view>{{ add }}</view>
        <button bindtap="changeNum">点我1122x111</button>

        <view wx:for="{{ arr }}" wx:key="index">{{ index }}</view>
    </view>
</template>
<script>
const app = getApp();
import { ref, effect, reactive, computed, readonly, isReadonly } from '@vue/reactivity';
import { test1 } from '../../util/test2';
import { test } from './home';
test();
test1();
console.log('main.vue-->02');
const data = reactive({
    textNum: 0,
    arr: new Array(10).fill(1),
    add: computed(() => data.textNum + 1),
});

const read = readonly({ a: 1 });

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
    background: #ff5500;
}
</style>
