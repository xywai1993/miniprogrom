<template>
    <div class="item">
        <div class="item-img">
            <!-- <img :src="tagData.thumb" mode="widthFix" class="g-img" /> -->
            <image mode="widthFix" src="{{tagData.thumb}}" class="g-img"></image>
        </div>
        <h3 class="item-title mt-10">{{ tagData.title }}</h3>
        <div class="flex item-info mt-10">
            <!-- <img :src="tagData.author.avatar" class="item-avatar" /> -->
            <image mode="widthFix" src="{{tagData.author.avatar}}" class="item-avatar"></image>
            <div class="flex-1 item-author">{{ tagData.author.nickname }}</div>
            <div class="item-collect">{{ tagData.like_count }}</div>
        </div>
        <!-- <div class="tag" :class="tag"></div> -->
    </div>
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
        tagData: {
            type: Object,
            value: {
                material_id: 1,
                title: 'nihao',
                type: 1,
                cover: '',
                like_count: 0,
                category_ids: [],
                author: { nickname: '11', avatar: '22' },
            },
            observer: function (newVal, oldVal) {
                // 属性值变化时执行
                console.log(newVal, oldVal);
            },
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
    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function () {
            console.log(this);
        },
        moved: function () {},
        detached: function () {},
    },
});

// export default {
//     props: {
//         tagData: {
//             type: Object,
//             default: () => {
//                 return {
//                     material_id: 1,
//                     title: '',
//                     type: 1,
//                     cover: '',
//                     like_count: 0,
//                     category_ids: [],
//                     author: { nickname: '', avatar: '' },
//                 };
//             },
//         },
//     },
//     data() {
//         let tag = '';

//         switch (Number(this.tagData.type)) {
//             case 1:
//                 tag = 'tuwen';
//                 break;
//             case 2:
//                 tag = 'tiaomu';
//                 break;
//             case 3:
//                 tag = 'shiping';
//                 break;
//             case 4:
//                 tag = 'yinping';
//                 break;
//             case 5:
//                 tag = 'dati';
//                 break;
//         }
//         return {
//             tag: tag,
//         };
//     },
//     computed: {},
//     methods: {},
// };
</script>

<style lang="less" scoped>
@import '../../style/common.less';
.tag {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 32px;
    height: 15px;
    background-position: left top;
    background-repeat: no-repeat;
    background-size: 32px auto;
}
.tiaomu {
    background-image: url('./static/tiaomu.png');
}

.tuwen {
    background-image: url('./static/tuwen.png');
}
.shiping {
    background-image: url('./static/shiping.png');
}
.dati {
    background-image: url('./static/dati.png');
}
.yinping {
    background-image: url('./static/yinping.png');
}
.item-img {
    max-height: 352px;
    overflow: hidden;
}
.item {
    position: relative;
    width: 100%;
    background: #ffffff;
    border-radius: 6px;
    overflow: hidden;
    padding-bottom: 20px;
}
.item-avatar {
    width: 19px;
    height: 19px;
    border-radius: 50%;
    opacity: 1;
}
.item-title {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    opacity: 1;
}
.item-info,
.item-title {
    padding: 0 10px;
}
.item-author {
    padding-left: 4px;
    font-size: 12px;
    color: #999;
}

.item-collect {
    padding-left: 18px;
    color: #999;
    font-size: 12px;
    background: url('./static/love-off.png') left center/14px auto no-repeat;
}
.love-on {
    background: url('./static/love-icon.png') left center/14px auto no-repeat;
}
</style>
