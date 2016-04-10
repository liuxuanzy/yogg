/**
 * @file Minion 仆从类
 * @author liuxuanzy(liuxuanzy@qq.com)
 */

'use strict';

/**
 * 仆从
 *
 * @class Minion
 */
module.exports = class Minion {

    /**
     * 构造函数
     *
     * @param {Object} options 配置信息
     */
    constructor(options) {

        /**
         * 最大血量
         *
         * @public
         * @type {number}
         */
        this.hp = options.hp;

        /**
         * 当前血量
         *
         * @public
         * @type {number}
         */
        this.current = options.hp;

        /**
         * 仆从的攻击
         *
         * @public
         * @type {number}
         */
        this.ap = options.ap;

        /**
         * 随从的名字
         *
         * @type {string}
         */
        this.name = options.name;

        /**
         * 随从是否冻结
         *
         * @type {boolean}
         */
        this.frozen = false;

        /**
         * 是否有圣盾
         *
         * @type {boolean}
         */
        this.shield = options.shield;
    }

    /**
     * 造成N点伤害
     *
     * @public
     * @param {number} n 伤害的数量
     */
    dealDamage(n) {

        if (this.shield && n > 0) {
            this.shield = false;
            return;
        }

        this.current -= n;
    }

    /**
     * 治疗N点血
     *
     * @public
     * @param {number} n 治疗的数量
     */
    restoreHealth(n) {

        if (this.dead) {
            return;
        }

        this.current = Math.min(this.current + n, this.hp);
    }

    /**
     * 角色是否死亡
     *
     * @type {boolean}
     */
    get dead() {
        return this.current <= 0;
    }
};
