<template>
    <div class="column">
        <div class="h1">{{ title }}--{{ abc }}</div>
        <div class="flex mt-20">
            <div v-for="t in tag" :key="t" class="tag-item" @click="test(t)">#{{ t }}</div>
        </div>
    </div>
</template>
<config lang="json">
{
    "component": true
}
</config>
<script>
import { CreateComponent } from '../../wx-runtime';

const params = {
    options: {
        addGlobalClass: true,
    },
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        title: {
            type: String,
            value: '0',
            observer: function (newVal, oldVal) {
                // this.tag = tagClassName[newVal.type - 1];
                // 属性值变化时执行
                // this.setData({ tag: tagClassName[newVal.type - 1] });
            },
        },
        tag: {
            type: Array,
            value: [],
        },
    },
    data: {
        // 这里是一些组件内部数据
        abc: 11,
    },
    methods: {
        test(srt) {
            this.demo(2, 3);
        },
        demo(a, b) {
            console.log({ a, b });
            // this.abc = '20';
            this.setData({ abc: 300 });
        },
    },
    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function () {},
        moved: function () {},
        detached: function () {},
    },
};

CreateComponent(params);
// Component(params);
</script>

<style lang="less" scoped>
.column {
    width: 100%;
    position: relative;
    margin-top: -16px;
    border-radius: 20px 20px 0 0;
    padding: 12px 15px 0;
    box-sizing: border-box;
    background: url('./static/column.png') left top/100% auto no-repeat;
}
.h1 {
    font-size: 16px;
    font-weight: 500;
    color: #fc8686;
    opacity: 1;
    height: 20px;
    line-height: 19px;
}
.tag-item {
    margin-right: 10px;
    padding: 4px 10px;
    background: rgba(59, 25, 39, 0.05);
    opacity: 1;
    border-radius: 13px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #3b1927;
    text-align: center;
}
.collet-icon,
.love-icon {
    padding-left: 20px;
    color: #666;
    font-size: 11px;
    height: 18px;
    line-height: 18px;
}
.collet-icon {
    background: url('./static/collection.png') left center/17px auto no-repeat;
}
.love-icon {
    margin-left: 10px;
    background: url('./static/love-icon.png') left center/14px auto no-repeat;
}

.collet-icon.on {
    background-image: url('./static/collection-on.png');
}
.love-icon.on {
    background-image: url('./static/love-icon-on.png');
}
</style>
