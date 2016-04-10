/**
 * @file Scene 场景类
 * @author liuxuanzy(liuxuanzy@qq.com)
 */

'use strict';

const Hero = require('./Hero');
const Minion = require('./Minion');
const Magic = require('./Magic');

/**
 * 场景
 *
 * @class Scene
 */
module.exports = class Scene {

    /**
     * 构造函数
     *
     * @param {Object} options 配置信息
     */
    constructor(options) {

        /**
         * 己方英雄
         *
         * @private
         * @type {Hero}
         */
        this.hero = new Hero(options.hero);

        /**
         * 敌方英雄
         *
         * @private
         * @type {Hero}
         */
        this.enemy = new Hero(options.enemy);

        /**
         * 全部友方随从
         *
         * @private
         * @type {Array.<Minion>}
         */
        this.friendlyMinions = options.friendlyMinions.map(m => new Minion(m));

        /**
         * 全部敌方随从
         *
         * @private
         * @type {Array.<Minion>}
         */
        this.enemyMinions = options.enemyMinions.map(m => new Minion(m));

        // 不能超过6个友方随从
        if (this.friendlyMinions.length > 6) {
            throw new Error('不能添加超过6个友方随从，不然没办法使用YOGG');
        }

        // 添加一个YOGG进去
        this.friendlyMinions.push(new Minion({
            name: '尤格萨隆',
            hp: 5,
            ap: 7
        }));
    }

    /**
     * 是否已经结束
     *
     * @returns {boolean}
     */
    get finished() {
        return this.hero.dead || this.enemy.dead;
    }

    /**
     * 随机获取一个角色
     *
     * @param {boolean=} minionOnly 只选择随从
     * @param {boolean=} enemyOnly 只选择敌人
     * @returns {*}
     */
    randRole(minionOnly, enemyOnly) {

        let roles = this.allRole(minionOnly, enemyOnly);
        let index = Math.floor(Math.random() * roles.length);

        return roles[index];
    }

    /**
     * 获取全部角色
     *
     * @param {boolean=} minionOnly 只选择随从
     * @param {boolean=} enemyOnly 只选择敌人
     * @returns {*}
     */
    allRole(minionOnly, enemyOnly) {

        let roles = [];

        if (!minionOnly) {

            if (!enemyOnly) {
                roles.push(this.hero);
            }

            roles.push(this.enemy);
        }

        if (!enemyOnly) {
            roles.push.apply(roles, this.friendlyMinions.filter(a => !a.dead));
        }

        roles.push.apply(roles, this.enemyMinions.filter(a => !a.dead));

        return roles;
    }

    /**
     * 获取邻近的两个随从
     *
     */
    neighbouringRoles(minion) {

        let minions = this.allRole(true, true);

        let index = minions.indexOf(minion);

        if (index < 0) {
            minions = this.friendlyMinions.filter(a => !a.dead);
            index = minions.indexOf(minion);
        }

        let ret = [];

        if (index - 1 >= 0) {
            ret.push(minions[index - 1]);
        }

        if (index + 1 < minions.length) {
            ret.push(minions[index + 1]);
        }

        return ret;
    }

    /**
     * 获取两个随机敌方随从
     *
     */
    randTwoEnemy() {

        let roles = this.allRole(true, true);

        if (roles.length < 2) {
            return [];
        }

        let index = Math.floor(Math.random() * roles.length);
        let first = roles[index];
        index = Math.floor(Math.random() * roles.length);
        let second = roles[index];

        while (first === second) {
            index = Math.floor(Math.random() * roles.length);
            second = roles[index];
        }

        return [first, second];
    }

    /**
     * 添加随处
     *
     */
    addMinion(options) {

        let roles = this.friendlyMinions.filter(a => !a.dead);

        if (roles.length >= 7) {
            return;
        }

        let minion = new Minion(options);

        this.friendlyMinions.push(minion);
    }

    addEnemyMinion(options) {

        let roles = this.enemyMinions.filter(a => !a.dead);

        if (roles.length >= 7) {
            return;
        }

        let minion = new Minion(options);

        this.friendlyMinions.push(minion);
    }

    /**
     * 获取场景信息
     *
     * @returns {{}}
     */
    info() {

        return {
            hero: {
                hp: this.hero.hp,
                armor: this.hero.armor,
                dead: this.hero.dead,
                name: this.hero.name,
                selfCards: this.hero.selfCards,
                stackCards: this.hero.stackCards,
                otherCards: this.hero.otherCards,
                secret: this.hero.secret
            },
            enemy: {
                hp: this.enemy.hp,
                armor: this.enemy.armor,
                dead: this.enemy.dead,
                name: this.enemy.name,
                selfCards: this.enemy.selfCards,
                stackCards: this.enemy.stackCards,
                otherCards: this.enemy.otherCards
            },
            friendlyMinions: this.friendlyMinions.map(a => {
                return {
                    name: a.name,
                    hp: a.current,
                    ap: a.ap,
                    dead: a.dead,
                    shield: a.shield
                };
            }),
            enemyMinions: this.enemyMinions.map(a => {
                return {
                    name: a.name,
                    hp: a.current,
                    ap: a.ap,
                    dead: a.dead,
                    shield: a.shield
                };
            })
        }
    }

    /**
     * 显示
     *
     */
    print() {

        let info = this.info();
        let hero = info.hero;
        let enemy = info.enemy;
        let friendlyMinions = info.friendlyMinions;
        let enemyMinions = info.enemyMinions;

        let arr = [];

        let card = [];

        if (hero.selfCards) {
            card.push(`，共抽取${hero.selfCards}张牌`);
        }

        if (hero.otherCards > 0) {
            card.push(`，共补充${hero.otherCards}张随机牌`);
        }

        if (hero.otherCards < 0) {
            card.push(`，共丢失${-hero.otherCards}张手牌`);
        }

        if (hero.stackCards > 0) {
            card.push(`，共增加${hero.stackCards}张牌库`);
        }

        if (hero.stackCards < 0) {
            card.push(`，共减少${-hero.stackCards}张牌库`);
        }

        if (hero.secret.length > 0) {
            card.push(`，共增加${hero.secret.length}个奥秘：` + hero.secret.join(','));
        }

        if (hero.dead) {
            arr.push(`${hero.name}阵亡！` + card.join(''));
        }
        else {
            arr.push(`${hero.name}还有${hero.hp}点血量` + (hero.armor ? `${hero.armor}点护甲` : '') + card.join(''));
        }

        arr.push(`${hero.name}随从如下：`);
        arr.push.apply(arr, friendlyMinions.map(a => {

            if (a.dead) {
                return `    ${a.name}已经死亡`
            }

            return `    ${a.name}：${a.ap}/${a.hp}` + (a.shield ? '（圣盾）' : '');
        }));

        card = [];

        if (enemy.selfCards) {
            card.push(`，共抽取${enemy.selfCards}张牌`);
        }

        if (enemy.otherCards > 0) {
            card.push(`，共补充${enemy.otherCards}张随机牌`);
        }

        if (enemy.otherCards < 0) {
            card.push(`，共丢失${-enemy.otherCards}张手牌`);
        }

        if (enemy.stackCards > 0) {
            card.push(`，共增加${enemy.stackCards}张牌库`);
        }

        if (enemy.stackCards < 0) {
            card.push(`，共减少${-enemy.stackCards}张牌库`);
        }

        if (enemy.dead) {
            arr.push(`${enemy.name}阵亡！` + card.join(''));
        }
        else {
            arr.push(`${enemy.name}还有${enemy.hp}点血量` + (enemy.armor ? `${enemy.armor}点护甲` : '') + card.join(''));
        }

        arr.push(`${enemy.name}随从如下：`);
        arr.push.apply(arr, enemyMinions.map(a => {

            if (a.dead) {
                return `    ${a.name}已经死亡`
            }

            return `    ${a.name}：${a.ap}/${a.hp}` + (a.shield ? '（圣盾）' : '');
        }));

        return arr.join('\n');
    }

    /**
     * 创建法术队列
     *
     * @param n 法术的数量
     */
    createMagic(n) {
        return new Magic(this, n);
    }
};
