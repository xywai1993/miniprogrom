<template>
    <div class="body">
        <mp-navigation-bar :ext-class="'nav-bar'" :background="bgColor" :title="title" :back="false" color="#FFF">
            <view slot="left" v-show="!title">
                <input type="text" class="top-search" placeholder="2021年待产包清单" @confirm="confirm" @blur="searchBlur" />
            </view>
        </mp-navigation-bar>
        <div class="g-flex-center header">
            <input type="text" v-show="title" class="search" placeholder="2021年待产包清单" />
        </div>

        <div class="grid">
            <view>
                <ul class="list-wrap">
                    <li wx:for="{{list1}}" wx:key="material_id" class="item">
                        <list-tag tagData="{{item}}"></list-tag>
                    </li>
                </ul>
            </view>

            <view>
                <ul class="list-wrap">
                    <li wx:for="{{list2}}" wx:key="material_id" class="item">
                        <list-tag tagData="{{item}}"></list-tag>
                    </li>
                </ul>
            </view>
        </div>

        <nav-nav hover="a"></nav-nav>
    </div>
</template>

<config lang="json">
{
    "backgroundColor": "#fff",
    "usingComponents": {
        "demo-tag": "/components/demo/main",
        "nav-nav": "/components/nav/main",
        "list-tag": "/components/list-tag/main"
    },
    "navigationStyle": "custom"
}
</config>
<script>
const app = getApp();
import { effect, reactive, computed, isProxy } from '@vue/reactivity';

import { GetMaterials } from '../../server/index.js';
import { CreatePage } from '../../wx-util/index';

CreatePage({
    data: {
        list1: [],
        list2: [],
        page_size: 1,
        total_page: 1,
        list: [],
        title: '宝妈清单',
        bgColor: '#00000000',
    },
    onLoad() {
        GetMaterials().then((data) => {
            // console.log(11, this.createList(data.list));

            this.createGrid(data.list);
            this.total_page = Math.ceil(data.total / 20);
            this.list = data.list;
        });
    },

    goType(type, id) {
        console.log(type);
        let url = '';
        switch (type) {
            case 1:
                url = 'pic-details';
                break;
            case 2:
                url = 'todo-list';
                break;
            case 3:
                url = 'video-list';
                break;
            case 4:
                url = 'audio-list';
                break;
            case 5:
                url = 'question-list';
                break;
            default:
                break;
        }
        goTo(url, { id });
    },
    confirm(e) {
        console.log(e.target.value);
        GetMaterials('', e.target.value).then((da) => {
            this.createGrid(da.list);
            data.page_size = da.page_size;
            data.total_page = da.total_page;
        });
    },
    searchBlur(e) {
        console.log(e);
        if (!e.target.value) {
            GetMaterials().then((data) => {
                console.log(data);
                this.createGrid(data.list);
            });
        }
    },
    createGrid(list) {
        // const _list = list.reduce((pre, current) => {
        //     return pre.concat(current);
        // }, []);
        const list1 = [];
        const list2 = [];
        list.forEach((item, index) => {
            if (index % 2 === 0) {
                list1.push(item);
            } else {
                list2.push(item);
            }
        });
        this.list1 = list1;
        this.list2 = list2;
    },
    onReachBottom() {
        if (this.page_size <= this.total_page) {
            const page = this.page_size + 1;

            GetMaterials('', '', page).then((d) => {
                this.page_size = page;
                this.list = [...this.list, ...d.list];
                this.createGrid(this.list);
            });
        }
    },
});

// Page({
//     data: {
//         list1: [],
//         list2: [],
//         page_size: 1,
//         total_page: 1,
//         list: [],
//         title: '宝妈清单',
//         bgColor: '#00000000',
//     },
//     onLoad() {
//         const that = this;

//         effect(() => {
//             // console.log(1, data);
//             that.setData(data);
//         });

//         GetMaterials().then((data) => {
//             // console.log(11, this.createList(data.list));

//             this.createGrid(data.list);
//             // this.total_page = Math.ceil(data.total / 20);
//             // this.list = data.list;
//         });
//     },

//     changeNum() {
//         // data.textNum = data.textNum + 4;
//         data.arr.push(10);
//     },
//     showMe(event) {
//         console.log(2345);
//         data.show = !data.show;
//     },
//     goType(type, id) {
//         console.log(type);
//         let url = '';
//         switch (type) {
//             case 1:
//                 url = 'pic-details';
//                 break;
//             case 2:
//                 url = 'todo-list';
//                 break;
//             case 3:
//                 url = 'video-list';
//                 break;
//             case 4:
//                 url = 'audio-list';
//                 break;
//             case 5:
//                 url = 'question-list';
//                 break;
//             default:
//                 break;
//         }
//         goTo(url, { id });
//     },
//     confirm(e) {
//         console.log(e.target.value);
//         GetMaterials('', e.target.value).then((da) => {
//             this.createGrid(da.list);
//             data.page_size = da.page_size;
//             data.total_page = da.total_page;
//         });
//     },
//     searchBlur(e) {
//         console.log(e);
//         if (!e.target.value) {
//             GetMaterials().then((data) => {
//                 console.log(data);
//                 this.createGrid(data.list);
//             });
//         }
//     },
//     createGrid(list) {
//         // const _list = list.reduce((pre, current) => {
//         //     return pre.concat(current);
//         // }, []);
//         const list1 = [];
//         const list2 = [];
//         list.forEach((item, index) => {
//             if (index % 2 === 0) {
//                 list1.push(item);
//             } else {
//                 list2.push(item);
//             }
//         });
//         data.list1 = list1;
//         data.list2 = list2;
//     },
//     onReachBottom() {
//         if (data.page_size <= data.total_page) {
//             const page = data.page_size + 1;
//             console.log(data.page_size);
//             GetMaterials('', '', page).then((d) => {
//                 data.page_size = page;
//                 data.list = [...data.list, ...d.list];
//                 this.createGrid(data.list);
//             });
//         }
//     },
// });
</script>

<style lang="less">
.body {
    padding-bottom: calc(80px + env(safe-area-inset-bottom));
    background-color: #f2f2f2;
    min-height: 100vh;
    overflow: hidden;
}
.header {
    // margin-top: calc(-44px - env(safe-area-inset-top));
    width: 100%;
    height: 252px;
    background: url('./static/souyebg@2x.png') left top no-repeat;
    background-size: contain;
    opacity: 1;
    overflow: hidden;
}
.search {
    margin-top: 10px;
    padding-left: 35px;
    width: 312px;
    height: 40px;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.13);
    opacity: 1;
    border-radius: 27px;
    background: #fff url('./static/search-icon@2x.png') 10px center/18px auto no-repeat;
}
.top-search {
    width: 210px;
    padding-left: 30px;
    height: 32px;
    border: 1px solid rgba(247, 243, 245, 1);
    border-radius: 17px;
    color: #333;
    // background: #fff url('./static/search-icon@2x.png') 10px center/18px auto no-repeat;
}

.grid {
    margin: -65rpx auto 0;
    width: 96%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    box-sizing: border-box;
    gap: 10rpx;
}
.list-wrap {
    // margin-top: -40px;
    // padding: 0 10px;
    // column-count: 2;
    > .item {
        // break-inside: avoid;
        // padding: 0 10px;
        margin-bottom: 10px;
        box-sizing: border-box;
        box-shadow: 0px 3px 30px rgba(0, 0, 0, 0.06);
        opacity: 1;
        border-radius: 6rpx;
    }
}
</style>
