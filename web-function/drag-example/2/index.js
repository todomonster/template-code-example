/**
dragstart：开始拖元素触发，作用于拖拽元素
dragenter：元素拖进可drop元素（绑定drop事件的元素）时触发，作用于目标元素
dragover：当元素拖动到drop元素上时触发，作用于目标元素
drop：当元素放下到drop元素触发，作用于目标元素
dragleave ：当元素离开drop元素时触发，作用于目标元素
drag：每次元素被拖动时会触发，作用于目标元素
dragend：放开拖动元素时触发，作用于目标元素

完成一次拖放的事件过程是： dragstart –> dragenter –> dragover –> drop –> dragend
 */
function dragHandler() {
    const dragBox = document.getElementById("drag-box");
    let draggedNode = null;

    const matchesDragRule = (e) => matchesDragRule;

    dragBox.addEventListener("dragstart", (e) => {
        if (matchesDragRule(e)) {
            draggedNode = e.target;
        }
    });

    dragBox.addEventListener("dragover", (e) => {
        // 可以任意移動
        e.preventDefault();
    });

    const matchesDropRule = (e) => {
        return draggedNode !== e.target && // 目標節點的 節點是不是 自己
            e.target.parentElement === dragBox // 目標節點的父節點是不是 dragBox
    }

    dragBox.addEventListener("drop", (e) => {
        if (matchesDropRule(e)) {
            const temp = document.createElement("div");
            dragBox.replaceChild(temp, e.target);
            dragBox.replaceChild(e.target, draggedNode);
            dragBox.replaceChild(draggedNode, temp);
        }
    });

}

dragHandler();