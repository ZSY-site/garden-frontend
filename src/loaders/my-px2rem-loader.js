var css = require('css');
// import css from 'css'
var pxRegExp = /\b(\d+(\.\d+)?)px\b/; // 数字加px, 比如: 200px  20.5px 等等
var pxGlobalRegExp = new RegExp(pxRegExp.source, 'g');
var loaderUtils = require('loader-utils');
// import loaderUtils from 'loader-utils'

class MyPx2rem {
    constructor(config) {
        this.config = config;
    }
    generateRem(cssText) { // 参数为css源代码
        let self = this; // 缓存this

        // rules是数组
        function processRules(rules) {
            if (rules) {
                for (var i = 0; i < rules.length; i++) {
                    var rule = rules[i];
                    var declarations = rule.declarations;
                    if (declarations) {
                        for (var j = 0; j < declarations.length; j++) {
                            var declaration = declarations[j];
                            if (declaration.type === 'declaration' && pxRegExp.test(declaration.value)) {
                                declaration.value = self._getCalcValue('rem', declaration.value);
                            }
                        }
                    }
                }
            }
        }

        // css.parse方法可以css源代码转为css抽象语法树, css抽象语法树其实就是一个描述css代码的js对象
        var astObj = css.parse(cssText);
        // console.log(JSON.stringify(astObj.stylesheet.rules, null, 2));  // 可以输出看看

        // 把rules数组传入
        processRules(astObj.stylesheet.rules);

        return css.stringify(astObj);
    }

    // 得到计算后的值
    _getCalcValue(type, value) {
        var {
            remUnit,
            remPrecision
        } = this.config;
        return value.replace(pxGlobalRegExp, (_, $1) => { // $1 是正则第一个分组
            // 使用toFixed方法保留多少位小数
            let val = (parseFloat($1) / remUnit).toFixed(remPrecision); // 比如 750/75 = 10 

            // 最后 10+rem, 即10rem
            return val + type;
        });
    }
}

function loader(source) {
    var options = loaderUtils.getOptions(this);

    if (options.exclude && options.exclude.test(this.resource)) {
        return source; // 那么就不转换了，直接返回
    }

    var px2remIns = new MyPx2rem(options);
    // console.log('老的css源代码：', source)
    let targetSource = px2remIns.generateRem(source);
    // console.log('新的css源代码:', targetSource)
    return targetSource;
}

let source = `
    #root{
        width:750px;
        height:750px;
    }
`;

// loader(source)

module.exports = loader