import { el } from './element.js';
import { diff } from './diff.js';
import { patch } from './patch.js';

// 1. 构建虚拟DOM
var tree = el('div', {'id': 'container'}, [
  el('h1', {style: 'color: blue'}, ['simple virtal dom']),
  el('h2', {style: 'color: blue'}, ['Hello, virtual']),
  el('ul', {style: 'color: blue'}, [el('li',{},[''])])
])

// 2. 通过虚拟DOM构建真正的DOM
var root = tree.render()
document.body.appendChild(root)

// 3. 生成新的虚拟DOM
var newTree = el('div', {'id': 'container'}, [
  el('h1', {style: 'color: red'}, ['simple virtal dom']),
  el('h2', {style: 'color: blue'}, ['Hello, virtual-dom']),
  el('ul', {style: 'color: red'}, [el('li',{},['haha'])])
])

// 4. 比较两棵虚拟DOM树的不同
var patches = diff(tree, newTree);

// 5. 在真正的DOM元素上应用变更
patch(root, patches);