let index = 0;

function dfsPatchWalk(node, patches) {
    let currentPatches = patches[index++];

    let childNodes = node.childNodes;
    // 先序深度遍历，继续遍历递归子节点
    childNodes.forEach(child => dfsPatchWalk(child, patches));

    if (currentPatches) {
        // 对当前节点进行补丁
        doPatch(node, currentPatches);
    }
}

function doPatch(node, patches) {
    // 遍历所有打过的补丁
    patches.forEach(patch => {
        switch (patch.type) {
            case 'ATTR':
                for (let key in patch.attr) {
                    let value = patch.attr[key];
                    if (value) {
                        node.setAttribute(key, value);
                    } else {
                        node.removeAttribute(key);
                    }
                }
                break;
            case 'TEXT':
                node.textContent = patch.text;
                break;
            case 'REPLACE':
                let newNode = patch.newNode;
                newNode = (newNode instanceof Element) ? newNode.render() : document.createTextNode(newNode);
                node.parentNode.replaceChild(newNode, node);
                break;
            case 'REMOVE':
                node.parentNode.removeChild(node);
                break;
            default:
                break;
        }
    });
}


export function patch(node, patches) {
    dfsPatchWalk(node, patches);
};