import Layout from '../../views/mainLayout/Layout.vue';
import api from "../../api";

export default {
    component: Layout,
    name: 'Product',
    path: '/Product',
    meta: { shortTitle: '商品', icon: 'shopping' , menu_permissions: ['goods-manage']},
    redirect: 'noredirect',
    rank: 3,
    children: [
        {
            path: 'ProductList',
            name: 'ProductList',
            component: () => import('@/views/product/productManage/ProductList'),
            meta: { title: '商品列表', menu_permissions: [api.product.addGoods.list] }
        },
        {
            path: 'AddProduct',
            name: 'AddProduct',
            hidden: true,
            component: () => import('@/views/product/productManage/AddProduct'),
            meta: { title: '添加商品', menu_permissions: [api.product.addGoods.add_second_post] }
        },
        {
            path: 'EditProduct/:type/:id',
            name: 'EditProduct',
            hidden: true,
            component: () => import('@/views/product/productManage/AddProduct'),
            meta: { title: '编辑商品' }
        },
        // {
        //     path: 'EvaluateProduct',
        //     name: 'EvaluateProduct',
        //     component: () => import('@/views/product/productManage/EvaluateProduct'),
        //     meta: { title: '商品反馈' , menu_permissions: [api.product.evaluate.list] }
        // },

        {
            path: 'ConfigProduct',
            name: 'ConfigProduct',
            // fatherTitle: '商品配置',
            component: () => import('@/views/product/productConfig/ConfigProduct'),
            meta: { title: '商品分类' , menu_permissions: [api.product.product.list] }
        },
        {
            path: 'ProductType',
            name: 'ProductType',
            component: () => import('@/views/product/productConfig/ProductTypes'),
            meta: { title: '类目规格' }
        },
        {
            path: 'NewConfigProduct',
            name: 'NewConfigProduct',
            hidden: true,
            component: () => import('@/views/product/productConfig/components/NewConfigProduct'),
            meta: { title: '新增下级' }
        },
        {
            path: 'EditConfigProduct/:type/:id',
            name: 'EditConfigProduct',
            hidden: true,
            component: () => import('@/views/product/productConfig/components/NewConfigProduct'),
            meta: { title: '编辑下级' }
        },
        {
            path: 'TypesList/:type/:id',
            name: 'TypesList',
            hidden: true,
            component: () => import('@/views/product/productConfig/components/TypesList'),
            meta: { title: '属性列表' }
        },
        {
            path: 'TypeValusList/:type/:pid/:id',
            name: 'TypeValusList',
            hidden: true,
            component: () => import('@/views/product/productConfig/components/TypeValusList'),
            meta: { title: '属性值列表' }
        },
        {
            path: 'ParametersList/:type/:id',
            name: 'ParametersList',
            hidden: true,
            component: () => import('@/views/product/productConfig/components/ParametersList'),
            meta: { title: '参数列表' }
        },
        {
            path: 'ParametersValusList/:type/:pid/:id',
            name: 'ParametersValusList',
            hidden: true,
            component: () => import('@/views/product/productConfig/components/ParametersValusList'),
            meta: { title: '参数值列表' }
        },
        {
            path: 'NewTypesOrParameters',
            name: 'NewTypesOrParameters',
            hidden: true,
            component: () => import('@/views/product/productConfig/components/NewTypesOrParameters'),
            meta: { title: '添加分类' }
        },
        {
            path: 'NewParameters',
            name: 'NewParameters',
            hidden: true,
            component: () => import('@/views/product/productConfig/components/NewParameters'),
            meta: { title: '添加参数' }
        },
        {
            path: 'BrandManage',
            name: 'BrandManage',
            component: () => import('@/views/product/productConfig/BrandManage'),
            meta: { title: '品牌管理', menu_permissions: [api.product.brand.list] }
        },
        {
            path: 'NewBrand',
            name: 'NewBrand',
            hidden: true,
            component: () => import('@/views/product/productConfig/components/NewBrand'),
            meta: { title: '添加品牌' }
        },
        {
            path: 'EditBrand/:type/:id',
            name: 'EditBrand',
            hidden: true,
            component: () => import('@/views/product/productConfig/components/NewBrand'),
            meta: { title: '编辑品牌' }
        },
        // {
        //     path: 'PictureLibraryManage',
        //     name: 'PictureLibraryManage',
        //     component: () => import('@/views/product/productConfig/PictureLibraryManage'),
        //     meta: { title: '图片库管理' }
        // },
        // {
        //     path: 'NewPictureLibrary',
        //     name: 'NewPictureLibrary',
        //     hidden: true,
        //     component: () => import('@/views/product/productConfig/components/NewPictureLibrary'),
        //     meta: { title: '新建相册' }
        // },
        // {
        //     path: 'PictureList',
        //     name: 'PictureList',
        //     hidden: true,
        //     component: () => import('@/views/product/productConfig/components/PictureList'),
        //     meta: { title: '相册列表' }
        // },
        {
            path: 'LabelManage',
            name: 'LabelManage',
            component: () => import('@/views/product/productConfig/LabelManage'),
            meta: { title: '标签管理', menu_permissions: [api.product.label.list]},
        },
        {
            path: 'EvaluateProduct',
            name: 'EvaluateProduct',
            component: () => import('@/views/product/productManage/EvaluateProduct'),
            meta: { title: '商品评价' , menu_permissions: [api.product.evaluate.list] }
        },{
            path: 'EvaluateDetails',
            name: 'EvaluateDetails',
            hidden: true,
            component: () => import('@/views/product/productManage/components/EvaluateDetails'),
            meta: { title: '评价详情' }
        },
        {
            path: 'SupplierManage',
            name: 'SupplierManage',
            component: () => import('@/views/product/productConfig/SupplierManage'),
            meta: { title: '供应商管理' , menu_permissions: [api.product.supplier.list]}
        },
        {
            path: 'NewSupplier',
            name: 'NewSupplier',
            component: () => import('@/views/product/productConfig/components/NewSupplier'),
            meta: { title: '新增供应商' },
            hidden:true,
        },
        {
            path: 'EditSupplier/:type/:id',
            name: 'EditSupplier',
            component: () => import('@/views/product/productConfig/components/NewSupplier'),
            meta: { title: '编辑供应商' },
            hidden:true,
        },
        // {
        //     path: 'SearchKeywordsManage',
        //     name: 'SearchKeywordsManage',
        //     component: () => import('@/views/product/productConfig/SearchKeywordsManage'),
        //     meta: { title: '搜索词管理', menu_permissions: [api.product.search.list]}
        // }
    ]
};
