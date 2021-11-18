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
                {{ question }}
            </div>
        </div>
        <ul class="options-box mt-30">
            <li class="g-flex-start-center options-items" v-for="(li, i) in options" :key="li.id" @click="choice(i)" :class="{ 'js-on': userAnswer[i] }">
                <h3 class="abc-icon">{{ abc[i] }}</h3>
                <div class="flex-1">{{ li.answer }}</div>
            </li>
        </ul>
        <div class="flex button-submit">
            <div class="back"></div>
            <div class="submit">提交</div>
        </div>
    </div>
</template>

<script>
import { GetItem, GetMaterialsDetails } from '../../server/index.js';
import { CreatePage } from '../../wx-runtime';

// Page(p);

let question = [];
const page = {
    data: {
        question: '',
        options: [{ id: 1, content: '我教了这么多届学生，你们班是纪律最差的' }],
        abc: ['A', 'B', 'C', 'D', 'E'],
        num: 1,
        userAnswer: [],
        questionType: 1, // 1 单选，2 多选
    },
    choice(index) {
        // this.setData({ num: 5 });
        this.userAnswer[index] = !this.userAnswer[index];
        this.userAnswer = this.userAnswer;
    },
    setQuestion(index) {
        const data = question[index];
        this.num = index + 1;
        this.options = data.answers;
        this.userAnswer = data.answers.map((i) => false);
        this.question = data.question;
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
.js-on {
    border: 1px solid green;
}
</style>
