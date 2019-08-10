let index = 0;  // 当前比较节点的索引
function dfsWalk(oldNode, newNode, index, patches) {

  // 存放当前节点的补丁
  let currentPatch = [];

  // rule1:新节点为null：{type: 'REMOVE', index}
  if (newNode === null) {
    currentPatch.push({
      type: 'REMOVE',
      index
    });
  }

  // rule2:文本节点不一致：{ type: 'TEXT', text: newNode }
  else if (typeof oldNode === 'string' && typeof newNode === 'string') {
    if (oldNode !== newNode) {
      currentPatch.push({
        type: 'TEXT',
        text: newNode
      });
    }
  }

  // rule3: 节点类型相同而属性不同：{type: 'ATTR', attr: {class: 'list-group'}}
  else if (oldNode.tagName === newNode.tagName) {
    let attrPatch = diffAttr(oldNode.props, newNode.props);
    if (Object.keys(attrPatch).length) {
      currentPatch.push({
        type: 'ATTR',
        attr: attrPatch
      });
    }
    
    // 如果有子节点，遍历子节点
    diffChildren(oldNode.children, newNode.children, patches);
  }

  // rule4: 节点类型不相同{type: 'REPLACE', newNode}
  else {
    currentPatch.push({
      type: 'REPLACE',
      newNode: newNode
    });
  }

  if (currentPatch.length) {
    patches[index] = currentPatch;
  }
};

function diffAttr(oldAttrs, newAttrs) {

  // 存放属性补丁
  let attrPatch = {};

  // 旧节点已被改变的属性
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      // 有可能是undefined，即新节点没有该属性
      attrPatch[key] = newAttrs[key]; 
    }
  }

  // 新节点添加的属性
  for (let key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      attrPatch[key] = newAttrs[key];
    }
  }

  return attrPatch;
}



function diffChildren(oldChildren, newChildren, patches) {
  oldChildren.forEach((child, idx) => {
    dfsWalk(child, newChildren[idx], ++index, patches);
  });
}

export function diff(oldTree, newTree) {
  // 存放所有节点的补丁
  let patches = {};
  // 递归树 比较后的结果放到补丁里
  dfsWalk(oldTree, newTree, index, patches);

  return patches;
};