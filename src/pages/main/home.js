import { test as tt } from '../../util/test.js';
import { ref } from '@vue/reactivity';
export function test() {
    tt();
    const demo = ref(1);
    return demo;
}
