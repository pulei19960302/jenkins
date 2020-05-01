// 会话类型
export const MSG_TYPE = {
    HEART_BEAT: 1001, // 心跳消息
    ENTER: 2000,      //客服进入
    NORMAL: 2100,    //正常消息
    READ: 2200,      //消息已读
    PULL_LIST: 2500, //拉取会话  
    SEARCH_LIST: 2550, //搜索  
    GET_MSG: 2600,  //消息列表
    SWITCH_SERVICE: 2800, //转移客服
    NEW_CONVERSATION: 2099, // 新会话
    SERVICE_EXI: 5000, //客服下线
    SERVICE_ONLINE: 5001, // 客服上线
    SERVICE_BUSY: 5002, //客服忙碌
}

export const MSG_CONTENT_TYPE = {
    TEXT: 1,   // 文本
    IMAGE: 2,  // 图片
    VIDEO: 3   // 视频
}

export const PERSON_TYPE = {
    CUSTOMER_SERVICE: 1,   // 客服
    CUSTOMER: 2,  // 用户
}