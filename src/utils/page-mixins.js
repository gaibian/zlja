import { debounce } from '@/utils'

export default {
    mounted() {
        let _btmHeight = 0;
        let _addHeight = 0;
        this.valHandle();
        this.__resizeMainHanlder = debounce(() => {

            this.valHandle(_btmHeight, _addHeight);
        }, 100);
        window.addEventListener('resize', this.__resizeMainHanlder)
    },
    methods: {
        valHandle(_btmHeight, _addHeight) {
            let _height = this.$refs.mainContainer.offsetHeight - 40;

            if (this.$refs.topAdd) {
                _addHeight = this.$refs.topAdd.offsetHeight;

            } else {
                _addHeight = 0;
            }
            if (this.$refs.btmGroup) {
                _btmHeight = this.$refs.btmGroup.offsetHeight;
            } else {
                _btmHeight = 20;
            }
            let _heightVal = _height - (_addHeight + _btmHeight);
            this.tableHeight = _heightVal;

        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.__resizeMainHanlder)
    }
}