<template>
    <div class="body">
        <div class="question-box">
            <div class="g-flex-between-center">
                <div class="orders">{{ aa.hello }}{{ num }}/{{ questionLen }}</div>

                <div class="flex">
                    <!-- <div>举报</div>
                    <div>警告</div>-->
                </div>
            </div>
            <div class="mt-20 question">{{ question }}（提示：{{ needClickNum }}个正确答案）</div>
        </div>
        <!-- <div class="mt-10">提示：有{{ needClickNum }}个正确答案</div> -->
        <ul class="options-box mt-30">
            <li
                v-for="(li, i) in options"
                :key="id"
                class="options-items"
                :class="{ jse: uA[i].e, jsr: uA[i].r, json: uA[i].on }"
                @click="choice(i)"
            >
                <h3 class="abc-icon">{{ abc[i] }}</h3>
                <div class="flex-1">{{ li.content }}</div>
            </li>
        </ul>
        <div v-if="public && analysis" class="analysis">
            <span class="tip">答案解析</span>
            ：{{ analysis }}
        </div>
        <div>{{ aa.hello }}</div>
        <div>{{ bb }}</div>
        <div>{{ cc }}</div>
        <div class="flex button-submit">
            <div class="back" @click="cancel"></div>
            <div v-if="num !== questionLen" class="submit" @click="next">下一题</div>
            <div v-if="num == questionLen && public" class="submit" @click="back">挑战其他题</div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { GetItem, GetMaterialsDetails } from '../../server/index.js';
// import { CreatePage, setup } from '../../wx-runtime';
import { setup, pp, ppRef, pComputed } from "@yiper.fan/wx-mini-runtime";

// Page(p);

let question = [];
const page = {
    data: {
        question: '',
        questionLen: 0,
        options: [{ id: 1, content: '我教了这么多届学生，你们班是纪律最差的' }],
        abc: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        num: 1,
        uA: [{ on: false }],
        questionType: 1, // 1 单选，2 多选
        analysis: '',
        public: false,
        clickTimes: 0, //用户剩余点击次数
        needClickNum: 0, //提示用户有几个正确答案
    },
    choice(index) {
        // this.setData({ num: 5 });
        // const list = this.uA.map((item) => item);
        // list[index] = !list[index];

        console.log({ index });

        if (this.public) {
            return;
        }

        this.uA = this.uA.map((item, i) => {
            if (Number(index) === i) {
                if (!item.on) {
                    this.clickTimes -= 1;
                }
                item.on = true;
            }
            // item.error = item.on !== item.right;
            return item;
        });
        console.log(this.uA);
        if (this.clickTimes === 0) {
            console.log('公布答案');
            this.public = true;
            this.uA = this.uA.map((item, i) => {
                const right = Number(this.options[i].is_right) === 1 ? true : false;
                return {
                    on: false,
                    r: right,
                    e: item.on !== right,
                };
            });
        }
    },
    setQuestion(index) {
        const data = question[index];
        this.num = index + 1;
        this.options = data.answers;
        this.uA = data.answers.map((item) => {
            if (item.is_right === 1) {
                this.clickTimes += 1;
            }
            return {
                on: false,
                r: false,
                e: false,
            };
        });
        this.needClickNum = this.clickTimes;
        this.question = data.question;
        this.analysis = data.analysis;
    },
    next() {
        if (this.public) {
            this.public = false;
            this.setQuestion(this.num);
        }
    },
    back() {
        goTo(-1);
    },
    cancel() {
        if (this.public && this.num == this.questionLen) {
            this.back();
        } else {
            wx.showModal({
                title: '退出当前答题',
                content: '您是否退出答题？',
                // confirmText: '复制',
                success: (res) => {
                    if (res.confirm) {
                        console.log('用户点击确定');
                        this.back();
                    }
                },
            });
        }
    },

    onLoad(options) {
        console.log('onload', options);

        GetMaterialsDetails(77).then((d) => {
            console.log(d);
        });
        GetItem(760).then((dd) => {
            question = dd.questions;
            this.setQuestion(0);
        });
    },
};
// CreatePage(page);

setup(() => {
    let options = ppRef([{ id: 1, content: '我教了这么多届学生,你们班是纪律最差的' }]);
    const aa = pp({ hello: 1 });
    const bb = pComputed(() => {
        return aa.hello + 1000;
    })
    const cc = pComputed(() => {
        return bb.value + 1;
    })
    const back = () => {
        goTo(-1);
    };

    const onLoad = (op) => {
        console.log('会执行嘛');

        setTimeout(() => {
            aa.hello = 200;
        }, 2000)
    };
    return {
        options,
        back,
        onLoad,
        aa,
        bb,
    };
});
</script>

<style lang="less" scoped>
.body {
    padding: 20px 16px 100px;
    background-color: rgba(242, 242, 242, 1);
    min-height: 100vh;
    box-sizing: border-box;
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
.question {
    font-weight: 500;
    font-size: 15px;
}
.options-items {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 14px;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 6px;
    color: rgba(102, 102, 102, 1);
    border: 1px solid #fff;
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
    padding: 8px 24px calc(env(safe-area-inset-bottom) + 8px);
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
    background: url("./static/back.png") center/40px 40px no-repeat;
}
.analysis {
    padding: 12px;
    background: rgba(59, 25, 39, 0.13);
    border-radius: 14px;
    > .tip {
        font-weight: bold;
    }
}
.json {
    border: 1px solid #fc8686;
}

.jse {
    border: 1px solid #ff334b;
    background: #fdf7f2;
    > .abc-icon {
        background-color: #ff334b;
        color: #fff;
    }
}
.jsr {
    border: 1px solid #60d460;
    background: #f5fdf5;
    > .abc-icon {
        background-color: #60d460;
        color: #fff;
    }
}
</style>
