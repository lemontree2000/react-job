import { createStore } from 'redux';

// 1 通过store

// 通过reducer建立

// 根据老的state 和action 生成新的state
/**
 * reducer
 * @param {*} state 
 * @param {*} action 
 */
function counter(state = 0, action) {
    console.log(action);
    switch (action.type) {
        case '加机关枪':
            return state + 1;
        case '减机关枪':
            return state - 1;
        default:
            return state;
    }
}

// 1 新建store 
const store = createStore(counter);

const init = store.getState();
console.log(init);


function listener() {
    const current = store.getState();
    console.log(`现在有机关枪${current}`);
}

store.subscribe(listener);
store.dispatch({
    type: '加机关枪',
    data: 22
});
store.dispatch({
    type: '加机关枪',
    data: 22
});
store.dispatch({
    type: '加机关枪',
    data: 22
});
store.dispatch({
    type: '减机关枪',
    data: 22
});