// <script>
// export default {
//     name:'tab',
//     props:{
//         index:{
//             required: true,
//             type: [String, Number]
//         },
//         label:{
//             type:String,
//             default: 'tab'
//         }
//     },
//     computed: {
//         active() {
//             return this.index === this.$parent.value
//         }
//     },
//     mounted() {
//         this.$parent.panes.push(this)
//     },
//     methods:{
//         handleClick() {
//             this.$parent.onChange(this.index)
//         }
//     },
//     render() {
//         const tab = this.$slots.label || <span>{this.label}</span>
//         const className = {
//             tab: true,
//             active: this.active
//         }
//         return (
//             <li class={className} on-click={this.handleClick}>
//                 {tab}
//             </li>
//         )
//     }
// }
// </script>
// <style lang="scss" scoped>
// .tab{
//     float:left;
//     width:80px;
//     height:40px;
//     line-height:40px;
//     text-align: center;
//     &.active{
//         border-bottom:red 1px solid;
//     }
// }
// </style>

