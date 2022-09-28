import hasKey from '@/utils/hasKey';

type Listener = (params: any) => void;

export default function createStore(state: any, actions: any) {
    const listenerMap = new Map();

    function $subscribe(target: string, listener: Listener) {
        if (listenerMap.has(target)) {
            listenerMap.get(target).push(listener);
        } else {
            listenerMap.set(target, [listener]);
        }
        return function unSubscribe() {
            listenerMap.set(
                target,
                listenerMap.get(target).filter((l: Listener) => l !== listener)
            );
        };
    }
    const _state = new Proxy(Object.assign(state), {
        set(target, name, value) {
            if (!hasKey(state, name)) {
                return false;
            }
            target[name] = value;
            const listeners = listenerMap.get(name);
            if (listeners) {
                listeners.forEach((listener: Listener) => listener(_state));
            }
            return true;
        },
    });
    const _actions: { [key: string]: any } = {};
    Object.keys(actions).forEach((actionName) => {
        _actions[actionName] = (payload: any) => {
            if (hasKey(actions, actionName)) {
                const actionFunction = actions[actionName];
                actionFunction(_state, payload);
            }

            return;
        };
    });
    return new Proxy(
        {
            $subscribe,
            ..._state,
            ..._actions,
        },
        {
            get(target, name) {
                if (hasKey(_state, name)) {
                    return _state[name];
                }
                if (hasKey(_actions, name)) {
                    return _actions[name];
                }
                if (hasKey(target, name)) {
                    return target[name];
                }

                return undefined;
            },
        }
    );
}
