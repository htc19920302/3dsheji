export default {
    install (Vue) {
        Vue.prototype.gValue = (() => {
            var checkedArray = {
                data:{},
                init:{}
            }
            return {
                checkedArray
            }
        })()
    }
}
