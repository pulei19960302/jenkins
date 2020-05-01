import { _ } from '@/OMS/utils';

function setDeepValue(state, keyString, value) {
    if (keyString.indexOf('.') > -1) {
        const validStr = keyString.split('.');
        setDeepValue(state[validStr[0]], validStr[1], value);
    } else {
        state[keyString] = value;
    }
}

function setTargetValue(state, keyString, value) {
    if (keyString.indexOf('.') > -1) {
        // 匹配'a.b.c.d'模式进行递归
        setDeepValue(state, keyString, value);
    } else {
        state[keyString] = value;
    }
}

export default ({
    SET_STATE(state, payload) {
        if (_.isObject(payload)) {
            for (const key in payload) {
                setTargetValue(state, key, payload[key]);
            }
        } else {
            throw new Error('payload must be Object');
        }
    }
});

