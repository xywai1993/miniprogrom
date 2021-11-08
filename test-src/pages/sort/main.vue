<template>
    <div class="body">
        <swiper class="header" :indicator-dots="true">
            <swiper-item v-for="item in banner" :key="ad_id">
                <img :src="item.cover" mode="widthFix" class="g-img" />
            </swiper-item>
        </swiper>

        <div class="wrap flex flex-1">
            <!-- <scroll-view scroll-y="true">
                   
                </scroll-view> -->

            <view class="menu" scroll-y="true" enhanced="true" show-scrollbar="false" :scroll-into-view="scrollId">
                <div v-for="(li, index) in sortList" :key="category_id" class="menu-item" @click="changeActive(index)">
                    <span class="menu-sign" :class="{ on: active === index }"></span>
                    <div class="menu-real-item">
                        <div class="menu-icon">
                            <img :src="li.icon" mode="aspectFit" />
                        </div>
                        <p class="menu-item-title">{{ li.title }}</p>
                    </div>
                </div>
            </view>

            <scroll-view scroll-y class="content flex-1" id="content" @scroll="scroll">
                <div v-for="(li, i) in rightData" :key="category_id" class="content-wrap">
                    <h2 :id="li.id" class="right-column">{{ li.title }}</h2>
                    <ul class="content-list">
                        <li v-for="(item, k) in li.items" :key="category_id" class="third-item" @click="go(item.category_id)">
                            <div class="lh-0"><img :src="item.icon" class="third-cover" /></div>
                            <div class="flex-1 ml-10">
                                <h3 class="third-title">{{ item.title }}</h3>
                                <p class="third-desc">{{ item.desc }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </scroll-view>
        </div>

        <nav-nav hover="b"></nav-nav>
    </div>
</template>
<config lang="json">
{
    "navigationStyle": "custom",
    "disableSwipeBack": true,
    "disableScroll": true,
    "usingComponents": {
        "demo-tag": "/components/demo/main",
        "nav-nav": "/components/nav/main",
        "list-tag": "/components/list-tag/main"
    }
}
</config>
<script>
// import { goTo, setUrlQuery, showToast } from '../../utils/utils';

import { GetBanner, GetSortList } from '../../server';
import { goTo } from '../../utils/utils';

/**
 * category_id: (...)
cover: (...)
icon: (...)
sub_title: (...)
title: (...)
 */

export default {
    data() {
        return {
            sortList: [],
            rightData: [],
            active: 0,
            scrollId: '',
            banner: [],
        };
    },
    created() {},

    methods: {
        go(id) {
            goTo('sort-secend', { id });
        },
        scroll(e) {
            // console.log(123);
        },
        changeActive(index) {
            this.active = index;
            this.rightData = this.sortList[index].items;
        },
    },
    onLoad() {
        GetSortList().then((data) => {
            console.log(data);
            this.sortList = data.list;
            this.changeActive(0);
            // this.rightData = data.list[0].items;
            // this.rightData = data.list.reduce((pre, current) => {
            //     current.items = current.items.map((item) => {
            //         item.id = `id${parseInt(Math.random() * 10000)}`;
            //         return item;
            //     });
            //     return pre.concat(current.items);
            // }, []);
        });

        GetBanner().then((data) => {
            this.banner = data.list;
        });
    },
    onShow() {},
};
</script>

<style lang="less" scoped>
.menu-item-title {
    font-size: 12px;
    font-weight: 500;
    color: #333333;
    opacity: 1;
    text-align: center;
}
.content-wrap {
    width: 100%;
}

.body {
    display: flex;
    flex-direction: column;
    background-color: rgba(247, 247, 247, 1);
    min-height: 100vh;
}
.content {
    padding: 0 15px calc(env(safe-area-inset-bottom) + 55px);
    overflow: hidden;
    box-sizing: border-box;
    height: calc(100vh - 166px);
    overflow-y: auto;
}
.third-cover {
    width: 54px;
    height: 54px;
    border-radius: 50%;
}
.right-column {
    margin-top: 20px;
    font-size: 15px;
    font-weight: 500;
    color: #333333;
    opacity: 1;
}
.header {
    width: 375px;
    height: 166px;
    background: #eee;
    opacity: 1;
}
.menu {
    // -webkit-overflow-scrolling: touch;
    background-color: #fff;
    padding: 0 10px 90px 2px;
    width: 100px;
    overflow: hidden;
    box-sizing: border-box;
    height: calc(100vh - 166px);
    overflow-y: auto;
}
.menu-item {
    display: flex;
    align-items: center;
    margin-top: 15px;
    width: 104px;
    height: 94px;
}
.menu-real-item {
    width: 77px;
    height: 94px;
    background: rgba(247, 243, 245, 1);
    opacity: 1;
    border-radius: 6px;
}
.menu-sign {
    margin-right: 5px;
    width: 4px;
    height: 34px;
    opacity: 1;
    border-radius: 2px;
}
.menu-sign.on {
    background: #fc8686;
}
.menu-icon {
    margin-top: 14px;
    width: 74px;
    height: 53px;
    > img {
        width: 100%;
        height: 53px;
        object-fit: cover;
    }
}

.content-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
}
.third-item {
    display: flex;
    align-items: center;
    margin-top: 12px;
    padding: 10px;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
    border-radius: 6px;
}
.third-title {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    opacity: 1;
}
.third-desc {
    font-size: 12px;
    color: #999999;
    opacity: 1;
}
</style>
