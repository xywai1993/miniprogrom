<template>
    <ul class="footer">
        <li class="item" :class="{ on: isActive == 'a' }" v-on:click="goTo('a')">
            <div class="icon icon-a"></div>
            <p class="item-title">首页</p>
        </li>
        <li class="item" :class="{ on: isActive == 'b' }" v-on:click="goTo('b')">
            <div class="icon icon-b"></div>
            <p class="item-title">清单库</p>
        </li>
        <!-- <li class="item" :class="{ on: isActive == 'c' }" @click="goTo('c')">
                        <div class="icon icon-c"></div>
                        <p class="item-title">数据</p>
                    </li> -->
        <li class="item" :class="{ on: isActive == 'd' }" v-on:click="goTo('d')">
            <div class="icon icon-d"></div>
            <p class="item-title">我的</p>
        </li>
    </ul>
</template>
<config lang="json">
{
    "component": true
}
</config>
<script>
Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        hover: {
            type: String,
            value: 'a',
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
.formbtn {
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    line-height: 15px;
}
.footer {
    position: fixed;
    bottom: 0;
    padding-bottom: env(safe-area-inset-bottom);
    left: 0;
    // padding-top: 34px;
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 49px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px -4px 10px 0px rgba(0, 0, 0, 0.04);
}
.item {
    flex: 1;

    .icon {
        margin: 10px auto 0;
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-position: left top;
        background-size: 100% auto;
    }
    .item-title {
        font-size: 9px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        text-align: center;
    }
}
.icon-a {
    background-image: url('./static/a-icon.png');
}
.icon-b {
    background-image: url('./static/b-icon.png');
}
.icon-c {
    background-image: url('./static/c-icon.png');
}
.icon-d {
    background-image: url('./static/d-icon.png');
}
.on {
    .icon-a {
        background-image: url('./static/a-on-icon.png');
    }
    .icon-b {
        background-image: url('./static/b-on-icon.png');
    }
    .icon-c {
        background-image: url('./static/c-icon.png');
    }
    .icon-d {
        background-image: url('./static/d-on-icon.png');
    }
    .item-title {
        color: rgba(252, 134, 134, 1);
    }
}
</style>
