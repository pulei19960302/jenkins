import Mock from 'mockjs';
import login  from './modules/login';

Mock.setup({
    timeout: '350-500'
});

// 登录
Mock.mock(/\/account\/login/, 'post', login.LOGIN);
Mock.mock(/\/account\/info/, 'get', login.USER_INFO);
Mock.mock(/\/account\/logout/, 'get', login.LOGINOUT);

export default Mock;
