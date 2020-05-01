import api from '@/api';

const product = {
    name: 'product',
    namespaced: true,
    state: {
        goods_id: null,         // 商品ID
        allGoods: [],           // 所有商品
        allCategories: [],      // 所有商品分类
        isGetGoods: false,      // 商品列表只会获取一次接口，标记判断
        isGetCategories: false  // 商品分类只会获取一次接口，标记判断
    },
    actions: {
        /**
         * 所有商品
         * @param query
         * @returns {Promise<void>}
         */
        async getAllGoods({ state, commit }, query) {
            try {
                const { data } = await api.common.getGoodsSelect(query);
                if(query) return Promise.resolve(data.list.items);
                commit('SET_STATE', {
                    allGoods: data.list.items,
                    isGetGoods: true
                });
            } catch (e) {
                return Promise.reject(false);
                throw new Error(e);
            }

        },
        /**
         * 商品分类
         * @param query
         * @returns {Promise<void>}
         */
        async getAllCategories({ state, commit }, query) {
            try {
                const { data } = await api.product.tree(query);
                commit('SET_STATE', {
                    allCategories: data.category,
                    isGetCategories: true
                });
            } catch (e) {
                throw new Error(e);
            }

        }
    }
};

export default product;
