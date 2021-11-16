<template>
    <div class="body">
        <div class="question-box">
            <div class="g-flex-between-center">
                <div class="orders">{{ num }}/10</div>
                <div class="flex">
                    <div>举报</div>
                    <div>警告</div>
                </div>
            </div>
            <div class="mt-20">
                我再说一次，这是一道送分题
                同学们，这是一道送分题。你要是因为这道题被扣分，你就没救了，今天是1号，1号同学来回答一下问题，大家都知道，我不喜欢拖堂，只讲 2分钟!
            </div>
        </div>
        <ul class="options-box mt-30">
            <li class="g-flex-start-center options-items" v-for="(li, i) in options" :key="li.id" @click="choice(li.id, 'ss')">
                <h3 class="abc-icon">{{ abc[i] }}</h3>
                <div class="flex-1">{{ li.content }}</div>
            </li>
        </ul>
        <div class="flex button-submit">
            <div class="back"></div>
            <div class="submit">提交</div>
        </div>
    </div>
</template>

<script>
// import { parseScene, setUrlQuery } from '../../utils/utils';

// import { GetMaterialsDetails } from '../../server';
// // import AuthorInfo from '../../page-components/author-info';
// // import CollectBox from '../../page-components/collect-box';
// import { previewImage } from '../../utils/utils';
// import { getImageInfo } from '../../utils/canvas';
// // import DetailsMixin from '../../mixin/details';
// // import ColumnBox from '../../page-components/column-box';

// export default {
//     // components: {
//     //     'author-info': AuthorInfo,
//     //     'column-box': ColumnBox,
//     // },
//     // mixins: [DetailsMixin],
//     data() {
//         return {
//             pageData: { author: {} },
//             items: {},
//             imgList: [],
//             contentStr: '',
//             current: 1,
//             swiperHeight: '400px',
//         };
//     },
//     computed: {
//         len() {
//             return this.imgList.length;
//         },
//     },
//     created() {},

//     methods: {
//         createImgList(list) {
//             this.imgList = list.reduce((pre, cur) => {
//                 return pre.concat(cur.items.map((item) => item.cover));
//             }, []);
//             console.log(this.imgList);
//             this.setSwiperHeight(this.imgList[0]);
//             if (!this.imgList.length) {
//                 this.imgList = [this.pageData.cover];
//             }
//         },
//         changeCurrent(e) {
//             this.current = e.target.current + 1;
//         },
//         preview(item) {
//             previewImage(this.imgList, item);
//         },
//         setSwiperHeight(img) {
//             const windowInfo = wx.getWindowInfo();
//             const query = wx.createSelectorQuery();
//             query
//                 .select('#tmp-canvas')
//                 .fields({ node: true, size: true })
//                 .exec((res) => {
//                     const canvas = res[0].node;
//                     // const ctx = canvas.getContext('2d');
//                     getImageInfo(img, canvas).then(({ height, width }) => {
//                         this.swiperHeight = Math.ceil(windowInfo.screenWidth / (width / height)) + 'px';
//                     });
//                 });
//         },
//     },
//     onLoad(options) {
//         console.log({ options });
//         let id = this.getSceneId(options);
//         GetMaterialsDetails(id).then((data) => {
//             this.pageData = data;
//             this.createImgList(data.items);
//             this.createCollectData(data);
//         });
//     },
//     onUnload() {
//         Object.assign(this, this.$options.data());
//     },
//     onShareAppMessage() {
//         return {
//             title: this.pageData.share_text || this.pageData.title,
//             imageUrl: this.pageData.share_cover || this.pageData.cover,
//         };
//     },
// };
import { CreatePage } from '../../wx-util/index.js';

// Page(p);
const page = {
    data: {
        options: [
            { id: 1, content: '我教了这么多届学生，你们班是纪律最差的' },
            { id: 2, content: '我教了这么多届学生，你们班是纪律最差的233232' },
            { id: 3, content: '我教了这么多届学生，你们班是纪律最差的好差超级吵吵架是的🙆🏻‍♀️' },
            { id: 4, content: '我教了这么多届学生，你们班是纪律最差的好差超级吵吵架是的🙆🏻‍♀️,老师都气坏了' },
        ],
        abc: ['A', 'B', 'C', 'D', 'E'],
        num: 1,
    },
    choice(id, b) {
        // this.setData({ num: 5 });
        console.log('choice', this);
    },
    onLoad() {
        console.log('onload', this);
    },
};
CreatePage(page);
</script>

<style lang="less" scoped>
.body {
    padding: 20px 16px 100px;
    background-color: rgba(242, 242, 242, 1);
    min-height: 100vh;
}
.orders {
    width: 41px;
    height: 24px;
    line-height: 24px;
    background: #f7f3f5;
    border-radius: 16px;
    text-align: center;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    opacity: 1;
}
.question-box {
    background-color: #fff;
    padding: 15px 15px 20px;

    border-radius: 6px;
}
.options-items {
    padding: 14px;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 6px;
    color: rgba(102, 102, 102, 1);
}
.abc-icon {
    margin-right: 7px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    background: #f7f3f5;
    border-radius: 50%;
    opacity: 1;
    text-align: center;
    font-weight: bold;
    font-size: 17px;
}
.button-submit {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 8px 24px env(safe-area-inset-bottom);
    background-color: #fff;
}
.submit {
    width: 187px;
    height: 44px;
    line-height: 44px;
    background: #fc8686;
    border-radius: 22px;
    text-align: center;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
}
.back {
    margin-right: 30px;
    width: 40px;
    height: 40px;
    background: url('./static/back.png') center/40px 40px no-repeat;
}
</style>
