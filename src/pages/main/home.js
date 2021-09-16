import { ref } from '@vue/reactivity';
import { test1 } from '../../util/test';
export function test() {
    const demo = ref(1);
    return demo;
}

console.log('home->01');
