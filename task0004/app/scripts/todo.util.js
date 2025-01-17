/**
 * @file todo.util.js
 * @author zchen9(zhao.zchen9@gmail.com)
 */

define(function(){

    /**
     * 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
     *
     * @class
     */
    var each = function(arr, fn) {
        for (var i = 0, len = arr.length; i < len; i++) {
            fn(arr[i], i);
        }
    };

    /**
     * 判断class属性
     *
     * @class
     */
    var hasClass = function(tagStr, classStr) {
        //这个正则表达式是因为class可以有多个,判断是否包含
        var arr = tagStr.className.split(/\s+/); 
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] == classStr) {
                return true;
            }
        }
        return false;
    };

    /**
     * 为element增加一个样式名为newClassName的新样式
     *
     * @class
     */
    var addClass = function(element, value) {
        //判断className属性是否为空
        if (!element.className) {
            element.className = value;
        }
        else {
            //若不为空，把空格和新的class设置值追加到className属性上去
            newClassName = element.className;
            newClassName += " ";
            newClassName += value;
            element.className = newClassName;
        }
    };

    /**
     * 移除element中的样式oldClassName
     *
     * @class
     */
    var removeClass = function(element, oldClassName) {
        if (element.className == oldClassName) {
            try{
                element.removeAttribute("class");
            }
            catch(ex) {
                element.className = "";
            }
        }
    };

    /**
     * 实现一个简单的$()选择器
     *
     * @class
     */
    var selector = function(selector) {

        var selItem = selector.split(" ");
        var itemLen = selItem.length;

        var elements = document.getElementsByTagName("*");
        var eleLen = elements.length;

        if (itemLen === 1) {
            var aitem = selItem.toString();
            switch (aitem.substr(0, 1)) {
                case "#":
                    return document.getElementById(aitem.substr(1));
                    break;
                case ".":
                    if (document.getElementsByClassName) {
                        return document.getElementsByClassName(aitem.substr(1));
                    }
                    else {
                        var ret = [];
                        for (var i = 0; i < eleLen; i++) {
                            if (hasClass(elements[i], aitem.substr(1))) {
                                ret.push(elements[i]);
                            }
                        }
                        return ret;
                    }
                    break;
                case "[":
                    if (aitem.charAt(aitem.length - 1) === "]") {

                        var item = aitem.substring(1, aitem.length - 1);

                        if (item.indexOf("=") != -1) {
                            var items = item.split("=");
                            for (var j = 0; j < eleLen; j++) {
                                if (elements[j].getAttribute(items[0]) === items[1]) {
                                    return elements[j];
                                }
                            }
                        }
                        else {
                            for (var i = 0; i < eleLen; i++) {
                                if (elements[i].hasAttribute(item)) {
                                    return elements[i];
                                }
                            }
                        }
                    }
                    else {
                        throw Error( "']' is missing !" );
                    }
                    break;
                default :
                    return document.getElementsByTagName(aitem);
            }
        }
        else {
            for (var k = 1; k < itemLen; i++) {
                
                if (selItem[0].substr(0, 1) == "#") {
                    var itemId = document.getElementById(selItem[0].substr(1));
                    switch (selItem[k].substr(0, 1)) {
                        case ".":
                            return itemId.getElementsByClassName(selItem[k].substr(1))[0];
                            break;
                        default :
                            return itemId.getElementsByTagName(selItem[k]);
                    }
                }
                else if (selItem[0].substr(0, 1) == ".") {
                    var itemClass = document.getElementsByClassName(selItem[0].substr(1));
                    switch (selItem[k].substr(0, 1)) {
                        case "#":
                            return itemClass.getElementById(selItem[k].substr(1));
                            break;
                        default :
                            return itemId.getElementsByTagName(selItem[k]);
                    }
                }
            }
        }
    };


    /**
     * 给一个element绑定一个针对event事件的响应，响应函数为listener
     *
     * @class
     */
    var addEvent = function(element, event, listener) {
        if (element.addEventListener) {
            element.addEventListener(event, listener, false);
        }
        else if (element.attachEvent) {
            element.attachEvent("on" + event, listener);
        }
        else {
            element["on" + event] = listener;
        }
    };

    /**
     * 实现对click事件的绑定
     *
     * @class
     */
    var addClickEvent = function(element, listener) {
        if (element.addEventListener) {
            element.addEventListener("click", listener, false);
        }
        else if (element.attachEvent) {
            element.attachEvent("onclick", listener);
        }else {
            element["onclick"] = listener;
        }
    };

    /**
     * 阻止事件冒泡
     *
     * @class
     */
    var stopBubble = function(e) {
        // 如果提供了事件对象，则这是一个非IE浏览器
        if (e && e.stopPropagation) {
            // 因此它支持W3C的stopPropagation()方法
            e.stopPropagation();
        }
        else {
            // 否则，我们需要使用IE的方式来取消事件冒泡
            window.event.cancelBubble = true;
        }
    };

    /**
     *功能：阻止事件默认行为
     *
     * @class
     */
    var stopDefault = function(e) {
        // 阻止默认浏览器动作(W3C)
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        else {
            // IE中阻止函数器默认动作的方式
            window.event.returnValue = false;
        }
        return false;
    };

    //遍历元素监听事件
    var delegateEleEvent = function(ele, listener) {
        for (var i = 0, len = ele.length; i < len; i++) {
            listener(ele[i]);
        }
    };

    //遍历元素添加点击事件
    var delegateClickEvent = function(ele, listener) {
        for (var i = 0, len = ele.length; i < len; i++) {
            addClickEvent(ele[i], listener);
        }
    };

    //遍历元素初始化样式
    var  delegateInitClass = function(ele, classname) {
        var eles = ele.parentNode.children;
        for (var i = 0, len = eles.length; i < len; i++) {
            removeClass(eles[i], classname);
        }
        addClass(ele, classname);
    };

    //添加数组原型方法 查找指定位置的元素
    Array.prototype.indexOf = function(val) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i] == val) {
                return i;
            }
        }
        return -1;
    };

    //添加数组原型方法 去除指定位置的元素
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };

    // 移动端slider组件
    function Silder(options) {
        this.dom = options.dom;
        this.wrap = options.wrap;

        if (this.init()) {
            this.renderDOM();
            this.bindDom();
        }
    };

    Silder.prototype.init = function() {
        this.idx = 0;
        this.innerW = window.innerWidth;

        if (this.innerW <= 768) {
            return true;
        }

        return false;
    };

    Silder.prototype.renderDOM = function() {
        var innerW = this.innerW;
        var sections = this.dom;
        var wrap = this.wrap;

        if (innerW <= 768) {

            wrap.style.width = innerW + "px";

            each(sections, function(item, i) {
                item.style.width = innerW + "px";
                item.style.display = "inline-block";
                item.style.position = "absolute";
                item.style.webkitTransform = "translate3d(" + innerW * i + "px, 0, 0)";
            });
        }
    };

    Silder.prototype.goIndex = function(n) {
        var idx = this.idx;
        var dom = this.dom;
        var len = this.dom.length;
        var curIdx = 0;

        if (typeof n === "number") {
            curIdx = n;
        }
        else if (typeof n === "string") {
            curIdx = idx + n * 1;
        }

        if (curIdx > len - 1) {
            curIdx = len - 1;
        }
        else if (curIdx < 0) {
            curIdx = 0;
        }

        this.idx = curIdx;

        dom[curIdx].style.webkitTransition = "-webkit-transform .3s ease-out";
        dom[curIdx - 1] && (dom[curIdx - 1].style.webkitTransition = "-webkit-transform .3s ease-out");
        dom[curIdx + 1] && (dom[curIdx + 1].style.webkitTransition = "-webkit-transform .3s ease-out");

        dom[curIdx].style.webkitTransform = "translate3d(0, 0, 0)";

        for (var i = 0; i < curIdx; i++) {
            dom[i] && (dom[i].style.webkitTransform = "translate3d(-"
                                                                    + this.innerW 
                                                                    + "px, 0, 0)"
                        );
        }
        for (var ii = curIdx + 1; ii < len; ii++) {
            dom[ii] && (dom[ii].style.webkitTransform = "translate3d("
                                                                    + this.innerW 
                                                                    + "px, 0, 0)"
                        );
        };


        //for todo-nav
        var todoNav = selector(".todo-nav")[0];
        var todoNavUl = todoNav.getElementsByTagName("ul")[0];
        switch (curIdx) {
            case 0:
                todoNavUl.style.borderTop = "2px solid #7690B4";
            break;
            case 1:
                todoNavUl.style.borderTop = "2px solid #EBB74C";
            break;
            case 2:
                todoNavUl.style.borderTop = "2px solid #E8919F";
            break;
        }
    };

    Silder.prototype.bindDom = function() {
        var self = this;
        var innerW = self.innerW;
        var wrap = self.wrap;

        var startHandler = function(e) {

            stopBubble(e);

            e = e || window.event;
            var target = e.target || e.srcElement;

            self.startTime = new Date() * 1;

            self.startX = e.touches[0].pageX;
            self.startY = e.touches[0].pageY;

            if (target.nodeName.toUpperCase() == "SECTION") {
                self.target = target;
            }
        };

        var moveHandler = function(e) {

            stopBubble(e);

            self.offsetX = e.targetTouches[0].pageX - self.startX;
            self.offsetY = e.targetTouches[0].pageY - self.startY;

            // 判断手势是否是垂直还是水平
            if (self.offsetY < 50 && Math.abs(self.offsetX) > 15) {
                stopDefault(e);
            }

            var dom = self.dom;
            var i = self.idx - 1;
            var len = dom.length;

            for (i; i < len; i++) {
                dom[i] 
                && (dom[i].style.webkitTransition = "-webkit-transform 0s ease-out");
                dom[i] 
                && (dom[i].style.webkitTransform = "translate3d("
                                                    + ((i - self.idx) * innerW + self.offsetX)
                                                    +"px, 0, 0)");
            }
        };

        var endHandler = function(e) {

            stopBubble(e);

            var boundary = innerW / 12;
            var endTime = new Date() * 1;

            if (endTime - self.startTime > 150) {

                switch (true) {
                    case self.offsetX >= boundary:
                        self.goIndex("-1");
                        break;
                    case self.offsetX < 0 && self.offsetX < -boundary:
                        self.goIndex("+1");
                        break;
                    default:
                        self.goIndex("0");
                }

            }
            else {

                switch (true) {
                    case self.startX < 10:
                        self.goIndex("-1");
                        break;
                    case self.startX > innerW - 10:
                        self.goIndex("+1");
                        break;
                    default:
                        self.goIndex(self.idx);
                }

            }
        };

        addEvent(wrap, "touchstart", startHandler);
        addEvent(wrap, "touchmove", moveHandler);
        addEvent(wrap, "touchend", endHandler);
    };

    /**
     * 返回val在规定字节长度max内的值
     *  
     * @param {String} val 传入字符串值
     * @param {number} max 传入字符串允许的最大长度
     * 
     * 代码参考：http://www.cnblogs.com/gossip/archive/2010/10/13/1849896.html
     */
    var getByteVal = function(val, max) {
        var returnValue = '';
        var byteValLen = 0;
        for (var i = 0, len = val.length; i < len; i++) {
            if (val[i].match(/[^\x00-\xff]/ig) != null) {
                byteValLen += 2;
            }
            else {
                byteValLen += 1;
            }
            if (byteValLen > max) {
                alert("名称不能超过十位汉字！请重新想个简短的名字吧~");
                init.addCateName.value = "";
                return false;
            }
            if (byteValLen == 0) {
                alert("名称不能为空！快起个名字吧~");
                init.addCateName.value = "";
                return false;
            }
            returnValue += val[i];
        }
        return returnValue;
    };

    /**
     * 检查时间
     *  
     * @param {String} time 传入列表时间值
     * @return {String} taskDate 若日期检查无误，返回该值
     */
    var checkTime = function(time) {
        var dates = time.split("-");
        var year = parseInt(dates[0]);
        var month = parseInt(dates[1] - 1);
        var day = parseInt(dates[2]);

        var curDate = new Date();
        var taskDate = new Date(year,month,day);

        if (curDate > taskDate) {
            alert("任务日期设置的太超前啦~再检查一下~");
            return false;
        }
        else {
            return taskDate;
        }
    };

    /**
     * 防护XSS
     *  
     * @param {String} str 传入输入值
     * @return {String} strs 若输入值检查无误，返回该值
     *
     * 代码参考：http://www.shangxueba.com/jingyan/1904034.html
     */

     var checkXSS = function(str) {
        var reg = new RegExp("[$*()=|'\\[\\].<>/@#&{}]");
        var strs = "";
        for (var i = 0, len = str.length; i < len; i++) {
            strs = strs + str.substr(i, 1).replace(reg, "");
        }
        return strs;
     };

     /**
     * 检查编辑内容
     *  
     * @param {String} title 传入任务对象的标题值
     * @param {String} time 传入任务对象的时间值
     * @param {String} content 传入任务对象的内容值
     * @return {Array} 返回匿名数组，内容为检测无误的任务标题、日期、内容
     */
    var checkTask = function(title, time, content) {
        var timeRex = /^(\d{4})\-(\d{2})\-(\d{2})$/;
        if (title.value == ""
            || time.value == ""
            || content.value == ""
            ) {
            alert("请仔细检查任务，查看是否填写完整~");
            return false;
        }
        if (getByteVal(title.value, 20)) {
            var taskTitle = checkXSS(getByteVal(title.value, 20));
        }
        else {
            return false;
        }
        if (timeRex.test(time.value) 
            && checkTime(time.value)
            ) {
            var taskTime = checkTime(time.value);
        }
        else {
            return false;
        }
        if (content.value) {
            var taskContent = checkXSS(content.value);
        }
        else {
            return false;
        }
        
        //返回检查正确的内容<标题、时间、内容>
        return [taskTitle, taskTime, taskContent];
    };

    /**
     * 根据属性值进行排序
     *  
     * @param {String} properyName 传入数组属性名
     */
    var compare = function(properyName) {
        return function(obj1, obj2) {
            var val1 = obj1[properyName];
            var val2 = obj2[properyName];
            if (val1 < val2) {
                return -1;
            } 
            else if (val1 > val2) {
                return 1;
            } 
            else {
                return 0;
            }
        }
    };

    /**
     * 格式化输出对象中的时间
     *  
     * @param {Object} obj 传入任务对象
     */
    var formatTime = function(obj) {
        var taskTime = new Date(obj.time);
        if (taskTime) {
            var year = taskTime.getFullYear();
            var month = taskTime.getMonth() + 1;
            var date = taskTime.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (date < 10) {
                date = "0" + date;
            }

            return [year, month, date].join("-");
        }
    };

    

    return {

        formatTime: formatTime,
        compare: compare,
        checkTask: checkTask,
        checkXSS: checkXSS,
        getByteVal: getByteVal,
        silder: new Silder({
                    dom: selector("section"),
                    wrap: selector(".todo-container")[0]
                }),

        delegateInitClass: delegateInitClass,
        delegateClickEvent: delegateClickEvent,
        delegateEleEvent: delegateEleEvent,
        stopBubble: stopBubble,
        addClickEvent: addClickEvent,
        addEvent: addEvent,
        hasClass: hasClass,
        $: selector,
        removeClass: removeClass,
        addClass: addClass,
        each: each
    }

});
