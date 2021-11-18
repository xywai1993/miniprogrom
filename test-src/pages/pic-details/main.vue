<template>
    <div class="body">
        <swiper class="header" :style="{ height: swiperHeight }" @change="changeCurrent">
            <swiper-item v-for="(item, index) in imgList" :key="index" @click="preview(item)">
                <image :src="item" mode="widthFix" class="g-img"></image>
            </swiper-item>
        </swiper>
        <div class="nums">{{ current }}/{{ len }}</div>
        <column-box :title="pageData.title" :tag="pageData.tags"></column-box>
        <div class="content">
            <div class="mt-10">
                <mp-html :content="pageData.content"></mp-html>
                <!-- <text>{{ contentStr }}</text> -->
            </div>
        </div>
        <canvas id="tmp-canvas" type="2d" class="tmp-canvas"></canvas>
        <author-info :avatar="pageData.author.avatar" :nickname="pageData.author.nickname" :collect-data="collectData"></author-info>
    </div>
</template>
<config lang="json">
{
    "usingComponents": {
        "mp-html": "/static/mp-weixin/index",
        "author-info": "/components/author-info/main",
        "column-box": "/components/column-box/main"
    }
}
</config>
<script>
import { parseScene, setUrlQuery } from '../../utils/utils';

import { GetMaterialsDetails } from '../../server';
// import AuthorInfo from '../../page-components/author-info';
// import CollectBox from '../../page-components/collect-box';
import { previewImage } from '../../utils/utils';
import { getImageInfo } from '../../utils/canvas';
import { CreatePage } from '../../wx-runtime';

CreatePage({
    data: {
        pageData: { author: {} },
        items: {},
        imgList: [],
        contentStr: '',
        current: 1,
        swiperHeight: '400px',
        len: 1,
    },
    createImgList(list) {
        this.imgList = list.reduce((pre, cur) => {
            return pre.concat(cur.items.map((item) => item.cover));
        }, []);
        console.log(this.imgList);
        this.setSwiperHeight(this.imgList[0]);
        this.len = this.imgList.length;
        if (!this.imgList.length) {
            this.imgList = [this.pageData.cover];
        }
    },
    changeCurrent(e) {
        console.log('changeCurrent', e);
        this.current = e.detail.current + 1;
    },
    preview(item) {
        previewImage(this.imgList, item);
    },
    setSwiperHeight(img) {
        const windowInfo = wx.getWindowInfo();
        const query = wx.createSelectorQuery();
        query
            .select('#tmp-canvas')
            .fields({ node: true, size: true })
            .exec((res) => {
                const canvas = res[0].node;
                // const ctx = canvas.getContext('2d');
                getImageInfo(img, canvas).then(({ height, width }) => {
                    this.swiperHeight = Math.ceil(windowInfo.screenWidth / (width / height)) + 'px';
                });
            });
    },
    onLoad(options) {
        console.log({ options });
        // let id = this.getSceneId(options);
        GetMaterialsDetails(70).then((data) => {
            this.pageData = data;
            this.createImgList(data.items);
            // this.createCollectData(data);
        });
    },
    onUnload() {
        Object.assign(this, this.$options.data());
    },
    onShareAppMessage() {
        return {
            title: this.pageData.share_text || this.pageData.title,
            imageUrl: this.pageData.share_cover || this.pageData.cover,
        };
    },
});
</script>

<style lang="less" scoped>
.header {
    min-height: 320px;
    // flex: 1;
}
.nums {
    position: absolute;
    right: 15px;
    top: 20px;
    width: 44px;
    height: 24px;
    line-height: 24px;
    background: rgba(0, 0, 0, 0.33);
    opacity: 1;
    border-radius: 16px;
    text-align: center;
    color: #fff;
}
.body {
    background-color: rgba(247, 247, 247, 1);
    padding-bottom: 100px;
}
.column {
    position: relative;
    margin-top: -16px;
    border-radius: 20px 20px 0 0;
    padding: 0 20px;
    height: 54px;
    background: url('./static/column.png') left top/100% 100% no-repeat;
    z-index: 100;
    > .h1 {
        padding-left: 24px;
        font-size: 16px;
        font-weight: 500;
        color: #fc8686;
        opacity: 1;
        height: 20px;
        line-height: 19px;
        background: url('./static/column-icon.png') left center/18px auto no-repeat;
    }
}

.content {
    padding: 15px;
}
.tmp-canvas {
    position: absolute;
    left: -1000px;
    top: -1000px;
}
</style>
