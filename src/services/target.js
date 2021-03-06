const commonTarget = {
  qiniu_target: 'https://up-z0.qiniup.com/', // 七牛请求地址
  qiniu_img_url: 'http://img-ecs.hehewin.com', // 七牛资源地址
}

const devTarget = {
  // http_target: 'http://mall.yongtaihejia.com/',
  http_target: 'http://dev.ecs.hehewin.net/', //后台接口
  ws_target: 'ws://218.244.149.78:8302', // im
  im_server: 'http://218.244.149.78:8301',
}

const prodTarget = {
  http_target: 'https://ecs.hehewin.com/', //后台接口
  ws_target: 'https://im-ws.hehewin.com', // im
  im_server: 'https://im-api.hehewin.com/',
}

const testTarget = {
  http_target: 'http://mall.yongtaihejia.com/',
  // http_target: 'http://218.244.149.78:8201', //后台接口
  ws_target: 'ws://218.244.149.78:8302', // im
  im_server: 'http://218.244.149.78:8301',
}

const env = process.env.BUILD_ENV ? process.env.BUILD_ENV : 'dev';

const iconFont = '//at.alicdn.com/t/font_1723300_j4ym46tkz5.js'

const target = env === 'dev' ? devTarget : (env === 'test' ? testTarget : prodTarget);


module.exports = {
  ...commonTarget,
  ...target,
  iconFont
}
