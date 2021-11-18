<template>
    <div class="body">
        <div class="product-wrap-box">
            <div class="product-box">
                <div class="flex">
                    <div class="product-cover-wrap"></div>
                    <div class="flex-1">
                        <h2 class="product-title">舒克冲牙器口腔清洁</h2>
                        <ul class="flex mt-10">
                            <li class="product-attr">领劵可减30</li>
                        </ul>
                        <div class="flex align-items-end">
                            <div class="product-price">￥99.99</div>
                            <div class="flex-1 product-origin-price">￥199.9</div>
                            <div class="go-buy">直达链接</div>
                        </div>
                    </div>
                </div>
                <div class="recommend-box">
                    <span class="product-recommend-title">推荐理由：</span>
                    推荐回购的博皓冲牙器，感应式宠电，安全方便，智能高脉冲水流，差旅便携，轻享洁齿，一冲即净，不伤牙龈，差旅便携，轻享洁齿，……
                </div>
            </div>
        </div>
        <author-info :avatar="pageData.author.avatar" :nickname="pageData.author.nickname" :collect-data="collectData"></author-info>
    </div>
</template>
<config lang="json">
{
    "usingComponents": {
        "author-info": "/components/author-info/main"
    }
}
</config>
<script>
import { GetItem, GetMaterialsDetails } from '../../server/index.js';
import { CreatePage } from '../../wx-runtime';

// Page(p);

let question = [];
const page = {
    data: {
        collectData: {
            id: '',
            like_count: 100,
            is_like: 1,
            is_follow: 1,
            follow_count: 1,
        },
    },

    onLoad(options) {
        console.log('onload', options);

        GetMaterialsDetails(77).then((d) => {
            console.log(d);
        });
        GetItem(760).then((dd) => {
            question = dd.questions;
        });
    },
};
CreatePage(page);
</script>

<style lang="less">
.product-wrap-box {
    padding: 0 20px;
}
.product-box {
    background: #ffffff;
    border-radius: 6px;
}
.product-cover-wrap {
    width: 104px;
    height: 104px;
}
.product-title {
    font-size: 16px;

    font-weight: 500;

    color: #333333;
}
.product-attr {
    padding: 4px 10px;
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #3b1927;
    border-radius: 13px;
    background: rgba(59, 25, 39, 0.13);
}
.product-price {
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ff334b;
    opacity: 1;
}
.product-origin-price {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    opacity: 1;
    text-decoration: line-through;
}
.go-buy {
    width: 69px;
    height: 24px;
    line-height: 24px;
    background: #fc8686;
    opacity: 1;
    border-radius: 12px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    opacity: 1;
    text-align: center;
}
.recommend-box {
    background: #f2f2f2;
    padding: 5px;
    border-radius: 3px;
}
.product-recommend-title {
    color: #333333;
    font-weight: bold;
}
</style>
