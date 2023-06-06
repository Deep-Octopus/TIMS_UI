import hljs from "highlight.js";


const install = function (Vue){
    Vue.directive('highlight', function (el) {
        const blocks = el.querySelectorAll('pre code')
        blocks.forEach(block => {
            hljs.highlightBlock(block)
        })
    })
}
export default install
