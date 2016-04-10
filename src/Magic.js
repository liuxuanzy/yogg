/**
 * @file Magic 全部法术类
 * @author liuxuanzy(liuxuanzy@qq.com)
 */

'use strict';

const MAGIC_LIST_CONFIG = require('./config');

/**
 * 法术基类
 *
 * @class MagicBase
 */
class MagicBase {

    /**
     * 构造函数
     *
     * @param {Object} options 配置信息
     */
    constructor(options) {

        /**
         * 法术的名字
         *
         * @type {string}
         */
        this.name = options.name;

        /**
         * 法术的费用
         *
         * @type {number}
         */
        this.cost = options.cost;

        /**
         * 法术的描述
         *
         * @type {string}
         */
        this.description = options.description;

        // 如果构造的时候有deal，则重写
        if (options.deal) {
            this.deal = options.deal;
        }
    }

    /**
     * 法术处理函数
     *
     * @public
     * @abstract
     * @param {Scene} scene 场景
     */
    deal(scene) {
        //throw new Error('法术处理函数必须重载');
    }
}

// 全部法术列表
const MAGIC_LIST = MAGIC_LIST_CONFIG.map(a => new MagicBase(a));

/**
 * 法术队列类
 *
 * @type {Magic}
 */
module.exports = class Magic {

    /**
     * 构造函数
     *
     * @param {Scene} scene 场景
     * @param {number} count 法术的数量
     */
    constructor(scene, count) {

        /**
         * 当前选中的法术列表
         *
         * @type {Array}
         */
        this.list = [];

        /**
         * 当前场景
         *
         * @type {Scene}
         */
        this.scene = scene;

        for (let i = 0; i < count; i++) {
            this.list.push(Magic.randomMagic());
        }
    }

    deal() {

        for (let magic of this.list) {
            magic.deal(this.scene);

            if (this.scene.finished) {
                break;
            }
        }
    }

    /**
     * 产生随机法术
     *
     * @returns {*}
     */
    static randomMagic() {
        let index = Math.floor(Math.random() * MAGIC_LIST.length);
        return MAGIC_LIST[index];
    }
};



