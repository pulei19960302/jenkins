import { message } from 'antd'
import G6 from '@antv/g6'
import { createUUID } from 'utils';
export default async function (member_id, width = 800) {
  const { data } = await $api.user.userFindLevel3({
    member_id
  })

  
  
  if (!data.children || data.children.length === 0) return Promise.reject()

  nomalizeData(data)
  // const width = width;
  const height = 500;
  const graph = new G6.TreeGraph({
    container: 'user_relation_chart_container',
    width,
    height,
    fitView:true,
    minZoom:1,
    modes: {
      default: [
        {
          type: 'collapse-expand',
          onChange: function onChange(item, collapsed) {
            const data = item.getModel()
            data.collapsed = collapsed;
            return true;
          },
        },
        {
          type: 'tooltip',
          formatText: function formatText(model) {
            const text =
              `ID：${model.member_id}
               昵称：${model.nickname}
               类型：${model.member_type_name}
               电话:${model.phone}
               积分:${model.integral}`
            return text;
          },
        },
        'drag-canvas',
        //   'zoom-canvas',
      ],
    },
    defaultNode: {
      size: [100, 20],
      type: 'rect',
      style: {
        fill: '#DEE9FF',
        stroke: '#5B8FF9',
      },
    },
    defaultEdge: {
      type: 'cubic-horizontal',
      style: {
        stroke: '#A3B1BF',
      },
    },
    layout: {
      type: 'compactBox',
      direction: 'LR',
      getId: function getId(d) {
        return d.id
      },
      getHeight: function getHeight() {
        return 16;
      },
      getWidth: function getWidth() {
        return 16;
      },
      getVGap: function getVGap() {
        return 10;
      },
      getHGap: function getHGap() {
        return 100;
      },
    },
  });

  graph.node(function (node) {
    return {
      label: node.nickname,
      // labelCfg: {
      //   offset: 10,
      //   position: node.children && node.children.length > 0 ? 'left' : 'right',
      // },
    };
  });
  graph.data(data);
  graph.render();
  graph.fitView();
  graph.on('node:click', function (evt) {
    const item = evt.item;
    const nodeId = item.get('id');
    const model = item.getModel();
    const children = model.children;
    if (!children || children.length === 0) {
      $api.user.userFindLevel1({
        member_id: model.member_id
      }).then(res => {
        if (res.data && res.data.children && res.data.children.length) {
          res.data.children.forEach(it => {
            it.id = createUUID()
          })
          const parentData = graph.findDataById(nodeId);
          parentData.children = res.data.children
          graph.changeData();
        } else {
          message.error('没有下级了', 3)
        }
      })
    }
  })
}

function nomalizeData(obj) {
  obj.id = createUUID()
  if (obj.children && obj.children.length > 0) {
    obj.children.forEach(it => {
      nomalizeData(it)
    })
  }
}