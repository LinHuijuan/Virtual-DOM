class Element {
  constructor(tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
  }

  render() {
    // 1.根据tagName构建
    var ele = document.createElement(this.tagName);
    var props = this.props;

    // 2.设置节点的DOM属性
    for (var propName in props) {
      var propValue = props[propName];
      ele.setAttribute(propName, propValue);
    }

    // 3.递归构建子节点
    var children = this.children || [];

    children.forEach(function (child) {
      var childEle = (child instanceof Element) ?
        child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
        :
        document.createTextNode(child) // 字符串则构建文本节点
      ele.appendChild(childEle);
    });

    return ele;
  }
}

export function el(tagName, props, children){
  return new Element(tagName, props, children);
};