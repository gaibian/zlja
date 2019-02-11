export default {
    bind(el, binding) {

        console.log(store)

        let mouseStopId;
        let mouseOn = false;
        let startX = 0;
        let startY = 0;
        let that = this;
        let scrLeft = 0;
        let scrTop = 0;
        let getPoint = (obj) => {
            let t = obj.offsetTop;
            let l = obj.offsetLeft;
            while (obj = obj.offsetParent) {
                t += obj.offsetTop;
                l += obj.offsetLeft;
            }
            return {
                top: t,
                left: l
            }
        }
        el.onmousedown = function(e) {
            clearEventBubble(e);
            if (e.buttons !== 1 || e.which !== 1) return;

            mouseStopId = setTimeout(function() {
                mouseOn = true;
                // 获取容器元素
                startX = e.clientX - getPoint(el).left + el.scrollLeft;
                startY = e.clientY - getPoint(el).top + el.scrollTop;
                let selDiv = document.createElement('div');
                selDiv.style.cssText = `position:absolute;width:0;height:0;margin:0;padding:0;border:1px dashed #eee;background-color:#081c27;z-index:1000;opacity:0.1;display:none;`;
                selDiv.id = 'selectDiv';
                // 添加框选元素到容器内
                el.appendChild(selDiv);
                selDiv.style.left = startX + 'px';
                selDiv.style.top = startY + 'px';
            }, 200);
        }

        el.onmousemove = function(e) {
            if (!mouseOn) return;
            clearEventBubble(e);
            let _x = e.clientX - getPoint(el).left + el.scrollLeft;
            let _y = e.clientY - getPoint(el).top + el.scrollTop;
            // 鼠标移动超出容器内部，进行相应的处理
            // 向下拖拽
            if (_y >= _x && el.scrollTop <= _x) {
                el.scrollTop += _y - _x;
            }
            // 向上拖拽
            if (e.clientY <= getPoint(el).top && el.scrollTop > 0) {
                el.scrollTop = Math.abs(e.clientY - getPoint(el).top);
            }
            let selDiv = document.getElementById('selectDiv');
            selDiv.style.display = 'block';
            selDiv.style.left = Math.min(_x, startX) + 'px';
            selDiv.style.top = Math.min(_y, startY) + 'px';
            selDiv.style.width = Math.abs(_x - startX) + 'px';
            selDiv.style.height = Math.abs(_y - startY) + 'px';
        };

        el.onmouseup = function(e) {
            clearTimeout(mouseStopId);
            if (!mouseOn) return;
            clearEventBubble(e);
            let selDiv = document.getElementById('selectDiv');
            let fileDivs = document.getElementsByClassName('fileDiv');
            let selectedEls = [];
            let l = selDiv.offsetLeft;
            let t = selDiv.offsetTop;
            let w = selDiv.offsetWidth;
            let h = selDiv.offsetHeight;
            for (let i = 0; i < fileDivs.length; i++) {
                var sl = fileDivs[i].offsetWidth + fileDivs[i].offsetLeft;
                var st = fileDivs[i].offsetHeight + fileDivs[i].offsetTop;

                if (sl > l && st > t && fileDivs[i].offsetLeft < l + w && fileDivs[i].offsetTop < t + h) {
                    selectedEls.push(fileDivs[i]);
                }
            }
            selDiv.style.display = 'none';
            mouseOn = false;
            bus.$emit('fileAdmin', selectedEls)
        };

        function clearEventBubble(e) {
            if (e.stopPropagation) e.stopPropagation();
            else e.cancelBubble = true;

            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
        }
    }
}