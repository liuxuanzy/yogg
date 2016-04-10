/**
 * @file Hero 英雄类
 * @author liuxuanzy(liuxuanzy@qq.com)
 */


'use strict';

/**
 * 英雄
 *
 * @class Hero
 */
module.exports = class Hero {

    /**
     * 构造函数
     *
     * @param {Object} options 配置信息
     */
    constructor(options) {

        /**
         * 血量
         *
         * @public
         * @type {number}
         */
        this.hp = options.hp;

        /**
         * 护甲
         *
         * @public
         * @type {number}
         */
        this.armor = options.armor || 0;

        /**
         * 本回合获得的攻击力
         *
         * @type {number}
         */
        this.ap = 0;

        /**
         * 英雄的名字
         *
         * @type {string}
         */
        this.name = options.name;

        /**
         * 英雄是否冻结
         *
         * @type {boolean}
         */
        this.frozen = false;

        /**
         * 抽到的卡牌
         *
         * @type {number}
         */
        this.selfCards = 0;

        /**
         * 随机补充的卡牌
         *
         * @type {number}
         */
        this.otherCards = 0;

        /**
         * 增加的牌库牌
         *
         * @type {number}
         */
        this.stackCards = 0;

        /**
         * 角色添加的奥秘
         *
         * @type {Array}
         */
        this.secret = [];
    }

    /**
     * 造成N点伤害
     *
     * @public
     * @param {number} n 伤害的数量
     */
    dealDamage(n) {

        this.armor -= n;

        if (this.armor < 0) {
            this.hp += this.armor;
            this.armor = 0;
        }
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

        this.hp = Math.min(this.hp + n, 30);
    }

    /**
     * 加N点护甲
     *
     * @public
     * @param {number} n 治疗的数量
     */
    addArmor(n) {

        if (this.dead) {
            return;
        }

        this.armor += n;
    }

    /**
     * 抽N张牌
     *
     * @public
     * @param {number} n 数量
     */
    drawCard(n) {
        this.selfCards += n;
    }

    /**
     * 补充N张随机手牌
     *
     * @public
     * @param {number} n 数量
     */
    supplementCard(n) {
        this.otherCards += n;
    }

    /**
     * 增加牌库数量
     *
     * @public
     * @param {number} n 数量
     */
    pushStack(n) {
        this.stackCards += n;
    }

    /**
     * 添加一个奥秘
     *
     * @param name
     */
    addSecret(name) {

        if (this.secret.length < 5 && this.secret.indexOf(name) < 0) {
            this.secret.push(name);
        }
    }

    /**
     * 角色是否死亡
     *
     * @type {boolean}
     */
    get dead() {
        return this.hp <= 0;
    }
};