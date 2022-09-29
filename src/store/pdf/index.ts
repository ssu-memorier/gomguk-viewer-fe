import state from '@/store/pdf/state';
import actions from '@/store/pdf/actions';
import createStore from '@/utils/createStore';

const store = createStore(state, actions);

export function usePdfStore() {
    return store;
}
