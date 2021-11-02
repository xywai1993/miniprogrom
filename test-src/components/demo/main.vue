<template>
    <div class="demo">
        <div class="h1">hello world 2223</div>
        <p class="span" bind:tap="{{customMethod}}">22</p>
    </div>
</template>
<script>
Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        innerText: {
            type: String,
            value: 'default value',
        },
    },
    data: {
        // 这里是一些组件内部数据
        someData: {},
    },
    methods: {
        // 这里是一个自定义方法
        customMethod: function () {
            console.log(112233);
        },
    },
});
</script>
<style lang="less">
.demo {
    color: green;
}
.span {
    color: red;
}
.h1 {
    font-size: 30px;
    text-align: center;
}
</style>
