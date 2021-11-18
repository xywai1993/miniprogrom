<template>
    <div>
        <canvas id="previewCanvas" type="2d" class="canvas canvas1" style="width: 313px; height: 508px"></canvas>
        <div class="flex g-flex-between-center bottom-info">
            <div class="author-avatar">
                <img :src="avatar" class="g-img" />
            </div>
            <div class="flex-1 ml-10 nickname">{{ nickname }}</div>
            <div class="flex">
                <div class="icon like-icon" :class="{ 'like-icon-on': isLike }" @click="toggleLike">{{ likeCount }}</div>
                <div class="icon collect-icon" :class="{ 'collect-icon-on': isFollow }" @click="toggleFollow">{{ followCount }}</div>
                <div class="icon mini-share-icon" @click="showMenu">分享</div>
            </div>
            <!-- <button open-type="share" class="btn">
            <div class="share-btn">分享</div>
            </button>-->
        </div>
        <div v-if="showShareMenu" class="shadow" @click="hideMenu">
            <div class="share-menu">
                <div class="share-menu-title">分享</div>
                <div class="flex justify-content-around">
                    <button class="btn" open-type="share">
                        <div class="share-icon wx-icon"></div>
                        <p class="share-action">微信好友</p>
                    </button>
                    <div @click="createPoster">
                        <div class="share-icon poster-icon"></div>
                        <p class="share-action">生成分享图</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div v-if="shareImg" class="shadow" @click="shareImg = false">
            <div class="share-qr-wrap">
                <div class="share-close" @click="closeShare"></div>
                <img :src="img1" class="img1" />
                <div class="save" @click.stop="save">保存图片</div>
            </div>
        </div> -->
    </div>
</template>
<config lang="json">
{
    "component": true
}
</config>
<script>
import { GetPosterData, ToggleFollow, ToggleLike } from '../../server';
import { drawImage } from '../../utils/canvas';
import { setSceneQuery, showToast, toggleLoading, wxPromise, previewImage, parseScene } from '../../utils/utils';

function styleOne(data, componentContext) {
    const authorAvatar = data.author.avatar;
    const authorName = data.author.nickname;
    const nickname = data.nickname;
    const shareCover = data.share_cover;
    const shareText = data.share_text;
    const avatar = data.avatar || 'https://image.douba.cn/common/default-avatar.png';
    const qr = data.qrcode;
    const bg = 'https://image.douba.cn/baoma/poster-bg.png';
    const slogan = '写的不错，值得推荐';

    return drawImage(
        [
            {
                type: 'qr',
                url: authorAvatar, // author avatar
                position: { x: 22, y: 15, w: 25 },
            },
            { type: 'text', content: authorName, position: { x: 56, y: 21 }, fontBold: 600, fontSize: '14px', maxWidth: 200 },
            { type: 'text', content: shareText, position: { x: 22, y: 50 }, fontBold: 400, fontSize: '14px', maxWidth: 310 },
            {
                type: 'img',
                url: shareCover, // 封面
                position: { x: 16, y: 103, w: 281, h: 327 },
                mode: 'width',
            },
            {
                type: 'img',
                url: bg,
                position: [0, 403, 314, 106],
            },

            {
                type: 'qr',
                url: qr, //二维码
                position: [223, 426, 67, 67],
            },
            {
                type: 'imgFill',
                url: avatar, // 自己的头像
                position: { x: 17, y: 439, w: 40, h: 40 },
            },

            {
                type: 'text',
                content: nickname, //昵称
                position: [65, 439],
                font: 'bold 14px serif',
                align: 'left',
                fillColor: '#000',
                maxWidth: 400,
            },
            {
                type: 'text',
                content: slogan, //昵称
                position: [65, 463],
                font: '400 12px serif',
                align: 'left',
                fillColor: 'rgba(59, 25, 39, 1)',
                maxWidth: 400,
            },
        ],
        { width: 313, height: 508, canvasId: 'previewCanvas', componentContext }
    );
}

// export default {
//     props: {
//         avatar: {
//             type: String,
//             default: '',
//         },
//         nickname: {
//             type: String,
//             default: '',
//         },
//         collectData: {
//             type: Object,
//             default() {
//                 return {
//                     id: '',
//                     like_count: 0,
//                     is_like: '',
//                     is_follow: '',
//                     follow_count: 0,
//                 };
//             },
//         },
//     },
//     data() {
//         return {
//             isLike: this.collectData.is_like,
//             isFollow: this.collectData.is_follow,
//             likeCount: this.collectData.like_count,
//             followCount: this.collectData.follow_count,
//             showShareMenu: false,
//             img1: '',
//             shareImg: false,
//         };
//     },
//     watch: {
//         collectData(val) {
//             this.isLike = val.is_like;
//             this.isFollow = val.is_follow;
//             this.likeCount = val.like_count;
//             this.followCount = val.follow_count;
//         },
//         shareImg(val) {
//             if (val && !this.img1) {
//                 this.createPoster(this.collectData.id);
//             }
//         },
//     },

//     computed: {},
//     methods: {
//         toggleFollow() {
//             ToggleFollow(this.collectData.id).then(() => {
//                 this.isFollow = !this.isFollow;
//                 if (this.isFollow) {
//                     // showToast('点赞成功', 1000);
//                     this.followCount += 1;
//                 } else {
//                     this.followCount -= 1;
//                 }
//             });
//         },
//         toggleLike() {
//             ToggleLike(this.collectData.id).then(() => {
//                 this.isLike = !this.isLike;
//                 if (this.isLike) {
//                     // showToast('点赞成功', 1000);
//                     this.likeCount = 1 + this.likeCount;
//                 } else {
//                     this.likeCount = this.likeCount - 1;
//                 }
//             });
//         },
//         createPoster(id) {
//             if (this.img1) {
//                 previewImage([this.img1]);
//                 return;
//             }
//             const pages = getCurrentPages(); //获取加载的页面

//             const currentPage = pages[pages.length - 1]; //获取当前页面的对象

//             const url = currentPage.route; //当前页面url
//             const pageId = currentPage.options.id || parseScene(currentPage.options.scene).id;
//             console.log({ url }, currentPage.options);
//             toggleLoading(1);
//             GetPosterData(id, url, setSceneQuery({ id: pageId })).then((data) => {
//                 styleOne(data).then((img) => {
//                     this.img1 = img;
//                     previewImage([this.img1]);
//                     toggleLoading(0);
//                 });
//             });
//         },
//         save() {
//             wx.authorize({
//                 scope: 'scope.writePhotosAlbum',
//                 fail() {
//                     showToast('保存图片需授权，请手动打开授权管理页面进行授权');
//                 },
//             });
//             console.log(this.img1);
//             wxPromise(wx.saveImageToPhotosAlbum, {
//                 filePath: this.img1,
//             })
//                 .then((data) => {
//                     showToast('保存成功');
//                 })
//                 .catch((data) => {
//                     // showToast(data);
//                     console.log(data);
//                 });
//         },
//     },
//     onLoad() {},
//     onUnload() {
//         this.img1 = '';
//         Object.assign(this, this.$data, this.$options.propsData);
//     },
// };

Component({
    options: {
        addGlobalClass: true,
    },
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        avatar: {
            type: String,
            value: '',
            observer: function (newVal, oldVal) {
                // this.tag = tagClassName[newVal.type - 1];
                // 属性值变化时执行
                // this.setData({ tag: tagClassName[newVal.type - 1] });
            },
        },
        nickname: {
            type: String,
            value: '',
        },
        collectData: {
            type: Object,
            value: {
                id: '76',
                like_count: 0,
                is_like: '',
                is_follow: '',
                follow_count: 0,
            },
            observer: function (val, oldVal) {
                // this.tag = tagClassName[newVal.type - 1];
                // 属性值变化时执行
                // this.setData({ tag: tagClassName[newVal.type - 1] });

                if (val) {
                    this.setData({
                        isLike: val.is_like,
                        isFollow: val.is_follow,
                        likeCount: val.like_count,
                        followCount: val.follow_count,
                    });
                }
            },
        },
    },
    data: {
        // 这里是一些组件内部数据
        isLike: 0,
        isFollow: 0,
        likeCount: 10,
        followCount: 10,
        showShareMenu: false,
        img1: '',
        shareImg: false,
    },
    methods: {
        // 这里是一个自定义方法
        customMethod: function () {
            console.log(112233);
        },
        showMenu() {
            this.setData({ showShareMenu: true });
        },
        hideMenu() {
            this.setData({ showShareMenu: false });
        },
        createPoster() {
            const id = 74;
            console.log(77777, this.data);
            if (this.data.img1) {
                previewImage([this.data.img1]);
                return;
            }
            const pages = getCurrentPages(); //获取加载的页面

            const currentPage = pages[pages.length - 1]; //获取当前页面的对象

            const url = currentPage.route; //当前页面url
            const pageId = currentPage.options.id || parseScene(currentPage.options.scene).id;
            console.log({ url }, currentPage.options);
            toggleLoading(1);
            GetPosterData(id, url, setSceneQuery({ id: pageId })).then((data) => {
                styleOne(data, this).then((img) => {
                    // this.img1 = img;
                    this.setData({ img1: img });
                    previewImage([img]);
                    toggleLoading(0);
                });
            });
        },
        toggleFollow() {
            ToggleFollow(this.collectData.id).then(() => {
                this.isFollow = !this.isFollow;
                if (this.isFollow) {
                    // showToast('点赞成功', 1000);
                    this.followCount += 1;
                } else {
                    this.followCount -= 1;
                }
            });
        },
        toggleLike() {
            ToggleLike(this.collectData.id).then(() => {
                this.isLike = !this.isLike;
                if (this.isLike) {
                    // showToast('点赞成功', 1000);
                    this.likeCount = 1 + this.likeCount;
                } else {
                    this.likeCount = this.likeCount - 1;
                }
            });
        },
    },
    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function () {},
        moved: function () {},
        detached: function () {},
    },
});
</script>

<style lang="less" scoped>
.save {
    margin: 10px auto 0;
    width: 148px;
    height: 44px;
    background: rgba(252, 134, 134, 1);
    border-radius: 23px;
    text-align: center;
    line-height: 44px;
    color: #fff;
}
.share-menu-title {
    text-align: center;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    opacity: 1;
    margin-bottom: 30px;
}
.share-menu {
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    padding: 20px 0 30px;
    border-radius: 12px 12px 0px 0px;
}
.share-action {
    margin-top: 15px;
    text-align: center;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    opacity: 1;
}
.like-icon {
    background-image: url('./static/like-icon.png');
}
.like-icon-on {
    background-image: url('./static/like-on.png');
}
.collect-icon {
    background-image: url('./static/collect-icon.png');
}
.collect-icon-on {
    background-image: url('./static/collect-on.png');
}
.share-icon {
    width: 48px;
    height: 48px;
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 48px auto;
}
.wx-icon {
    background-image: url('./static/wx.png');
}
.poster-icon {
    background-image: url('./static/big-share-icon.png');
}
.icon {
    padding-top: 22px;
    margin-left: 25px;
    width: 24px;
    background-repeat: no-repeat;
    background-position: top center;
    background-size: 20px auto;
    font-size: 10px;
    text-align: center;
}
.mini-share-icon {
    background-image: url('./static/share.png');
}
.btn {
    border: none;
    padding: 0;
    margin: 0;
    background-color: transparent;
    width: 60px;
}
button::after {
    border: none;
}
.btn::after {
    border: none;
}
.nickname {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    opacity: 1;
}
.bottom-info {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px calc(10px + env(safe-area-inset-bottom));
    border-top: 1px solid rgba(247, 243, 245, 1);
    background: #fff;
}
.author-avatar {
    width: 38px;
    height: 38px;
    > .g-img {
        width: 38px;
        height: 38px;
        border-radius: 50%;
    }
}

.canvas {
    /* todo 调试请注释下面这几条*/
    position: absolute;
    left: -580px;
    top: -595px;
    opacity: 0;
}
.canvas1 {
    width: 375px;
    height: 610px;
}
.img1 {
    display: block;
    width: 90%;
    height: 80vh;
    object-fit: cover;
    margin: 30px auto;
}
</style>
