import { shallowMount } from '@vue/test-utils';
import createStore from '@/utils/createStore';

type Counter = {
    count: number;
};
describe('createStore 사용법', () => {
    let store: any;
    test('createStore 생성', () => {
        /**
         * 상태(state)와 액션함수들(actions) 을 넣어 store를 생성할 수 있습니다.
         */
        const state = {
            count: 0,
        };
        const actions = {
            increase(state: Counter) {
                state.count++;
            },
            setCount(state: Counter, payload: number) {
                state.count = payload;
            },
        };
        store = createStore(state, actions);
    });

    test('store에서 상태값 가져오기', () => {
        /**
         * store[propName] 방식으로 스토어에서 필요한 값을 가져옵니다.
         */
        const count = store.count;
        expect(count).toBe(0);
    });

    test('action으로 상태값 변경하기', () => {
        /**
         * store[actionName]() 방식으로 스토어에서 필요한 액션을 수행해 값을 변경합니다.
         * 파라미터를 전달할 수도 있습니다.
         */
        store.increase();
        expect(store.count).toBe(1);

        store.setCount(0);
        expect(store.count).toBe(0);
    });

    test('store 구독하기', () => {
        /**
         * store.$subscribe 메소드로 특정 상태를 구독할 수 있습니다.
         * 콜백 내부에서 store를 변경하는 메소드를 수행해 무한루프가 생기지 않게 유의해야합니다.
         * $subscribe는 unsubscribe 함수를 반환하며 이를 시행해 구독을 취소할 수 있습니다.
         */
        const unsubscriber = store.$subscribe('count', (state: Counter) => {
            console.log(`count is changed to ${state.count}`);
        });
        store.setCount(1); // count is changed to 1

        unsubscriber();
        store.setCount(0); // 구독을 해지했기 때문에 아무것도 출력하지 않습니다.
    });
});
