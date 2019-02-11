<template>
<div class="tabs">
  <div class="tabs-bar">
    <div :class="tabCls(item)"
          v-for="(item,index) in navList"
        @click = "handleChange(index)" :key="item.name">
    {{item.label}}
    </div>
  </div>
  <div class="tabs-content">
    <slot></slot>
  </div>
</div>
</template>
<script>
export default {
    name:'Tabs',
    props:{
        value: [String,Number],
        required: true,
    },
    data() {
        return {
            currentValue: this.value,
            navList: []
        }
    },
    methods:{
        tabCls (item) {
            return [  //绑定class 可以是数组和对象都行的
                'tabs-tab',
                {
                'tabs-tab-active': item.name === this.currentValue
                }
            ]
        },
        getTabs () {
            return this.$children.filter(function (item) {
                return item.$options.name === 'pane'
            })
        },
        updateNav () {
    //获取标题，name,并放置到navList数组中
            this.navList = []
            let _this = this
            this.getTabs().forEach(function (pane, index) {
                _this.navList.push({
                label: pane.label,
                name: pane.name || index

                })
                if (!pane.name) pane.name = index
                if (index === 0) {
                    if (!_this.currentValue) {
                        _this.currentValue = pane.name || index
                    }
                }
            })
            this.updateStatus()
        },
        updateStatus () {
            let tabs = this.getTabs()
            let _this = this
            tabs.forEach(function (tab) {
                let b = tab.name === _this.currentValue
                tab.show = b
                return tab.show
            })
        },
        handleChange (index) {
            let nav = this.navList[index]
            let name = nav.name
            this.currentValue = name
            this.$emit('input', name)
            this.$emit('on-click', name)
        }
    },
    watch: {
        value: function (val) {
            this.currentValue = val
        },
        currentValue () {
            this.updateStatus()
        }
    }
}
</script>

