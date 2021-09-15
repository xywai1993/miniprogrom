<template>
    <view class="container">
        <view>{{ textNum }}</view>
        <view>{{ add }}</view>
        <button bindtap="changeNum">点我1122x111</button>

        <view wx:for="{{ arr }}" wx:key="index">{{ index }}</view>
    </view>
</template>
<script>
//index.js
const app = getApp();
import { ref, effect, reactive, computed, readonly, isReadonly } from '@vue/reactivity';
import { test1 } from '../../util/test2';
test1();
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
