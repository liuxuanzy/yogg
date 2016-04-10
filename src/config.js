/**
 * @file config 法术列表
 * @author liuxuanzy(liuxuanzy@qq.com)
 */

'use strict';

module.exports = [

    // 基本法术
    {
        name: '背刺',
        cost: 0,
        description: '对1名未受伤的敌对随从造成2点伤害。',
        deal: scene => {

            for (let role of scene.enemyMinions) {

                if (role.current === role.hp) {
                    role.dealDamage(2);
                    break;
                }
            }
        }
    },
    {
        name: '激活',
        cost: 0,
        description: '仅在本回合中，获得2个法力水晶。'
    },
    {
        name: '猎人印记',
        cost: 0,
        description: '在本回合内，将1个随从的生命变为1。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.current = role.hp = 1;
            }
        }
    },
    {
        name: '图腾之力',
        cost: 0,
        description: '使你的图腾获得+2生命值。'
    },
    {
        name: '牺牲契约',
        cost: 0,
        description: '牺牲一个恶魔，为你的英雄恢复5点生命值。'
    },
    {
        name: '先祖治疗',
        cost: 0,
        description: '为一个随从恢复所有生命值并使其获得嘲讽。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.current = role.hp;
            }
        }
    },
    {
        name: '月火术',
        cost: 0,
        description: '造成1点伤害。',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.dealDamage(1);
            }
        }
    },
    {
        name: '奥术飞弹',
        cost: 1,
        description: '造成3点伤害，随机分配给敌方角色。',
        deal: scene => {

            for (let i = 0; i < 3; i++) {
                let role = scene.randRole(false, true);
                role.dealDamage(1);
            }
        }
    },
    {
        name: '奥术射击',
        cost: 1,
        description: '造成2点伤害。',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.dealDamage(2);
            }
        }
    },
    {
        name: '保护之手',
        cost: 1,
        description: '使一个随从获得圣盾。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.shield = true;
            }

        }
    },
    {
        name: '冰霜震击',
        cost: 1,
        description: '对一个敌方角色造成1点伤害，并使其冻结。',
        deal: scene => {

            let role = scene.randRole(false);

            role.dealDamage(1);
            role.frozen = true;
        }
    },
    {
        name: '腐蚀术',
        cost: 1,
        description: '选择一个敌方随从，在你的回合开始时，消灭该随从。'
    },
    {
        name: '镜像',
        cost: 1,
        description: '召唤两个0/2，并具有嘲讽的随从。',
        deal: scene => {

            scene.addMinion({
                hp: 2,
                name: '镜像',
                ap: 0
            });

            scene.addMinion({
                hp: 2,
                name: '镜像',
                ap: 0
            });
        }
    },
    {
        name: '力量祝福',
        cost: 1,
        description: '使一个随从获得+3攻击力。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.ap += 3;
            }
        }
    },
    {
        name: '灵魂之火',
        cost: 1,
        description: '造成4点伤害，随机弃一张牌。',
        deal: scene => {
            let role = scene.randRole();
            role.dealDamage(4);
            scene.hero.supplementCard(-1);
        }
    },
    {
        name: '谦逊',
        cost: 1,
        description: '使一个随从的攻击力变为1。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.ap = 1;
            }
        }
    },
    {
        name: '神圣惩击',
        cost: 1,
        description: '造成2点伤害。',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.dealDamage(2);
            }
        }
    },
    {
        name: '石化武器',
        cost: 1,
        description: '在本回合中，使一个友方角色获得+3攻击力。',
        deal: scene => {

            let roles = [scene.hero].concat(scene.friendlyMinions.filter(a => !a.dead));
            let index = Math.floor(Math.random() * roles.length);
            let role = roles[index];
            role.ap += 3;
        }
    },
    {
        name: '死亡缠绕',
        cost: 1,
        description: '对一个随从造成1点伤害，如果死亡缠绕将其杀死，抽一张牌。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.dealDamage(1);

                if (role.dead) {
                    scene.hero.drawCard(1);
                }
            }
        }
    },
    {
        name: '心灵视界',
        cost: 1,
        description: '随机复制你的对手手牌中的一张牌，将其置入你的手牌。',
        deal: scene => {
            scene.hero.supplementCard(1);
        }
    },
    {
        name: '旋风斩',
        cost: 1,
        description: '对所有随从造成1点伤害。',
        deal: scene => {

            let roles = scene.allRole(true);

            for (let role of roles) {
                role.dealDamage(1);
            }
        }
    },
    {
        name: '影袭',
        cost: 1,
        description: '对敌方英雄造成3点伤害。',
        deal: scene => {
            scene.enemy.dealDamage(3);
        }
    },
    {
        name: '斩杀',
        cost: 1,
        description: '消灭一个受过伤害的敌方随从。',
        deal: scene => {

            let roles = scene.allRole(true).filter(a => a.current < a.hp);

            if (roles.length) {

                let index = Math.floor(Math.random() * roles.length);
                let role = roles[index];
                role.current = 0;
            }
        }
    },
    {
        name: '爪击',
        cost: 1,
        description: '使你的英雄获得2点护甲值，并在本回合中获得+2攻击力。',
        deal: scene => {
            scene.hero.addArmor(2);
            scene.hero.ap += 2;
        }
    },
    {
        name: '真言术：盾',
        cost: 1,
        description: '使一个随从获得+2生命值。抽一张牌。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.current += 2;
                role.hp += 2;
                scene.hero.drawCard(1);
            }
        }
    },
    {
        name: '致命药膏',
        cost: 1,
        description: '使你的武器获得+2攻击力。'
    },
    {
        name: '追踪术',
        cost: 1,
        description: '查看你卡堆顶部的3张牌，抽取1张，弃掉其它2张。',
        deal: scene => {
            scene.hero.drawCard(1);
            scene.hero.pushStack(-2);
        }
    },
    {
        name: '暗言术：痛',
        cost: 2,
        description: '消灭一个攻击力小于或等于3的随从。',
        deal: scene => {
            let roles = scene.allRole(true).filter(a => a.ap <= 3);

            if (!roles.length) {
                return;
            }

            let index = Math.floor(Math.random() * roles.length);
            let role = roles[index];

            if (role) {
                role.current = 0;
            }
        }
    },
    {
        name: '毒刃',
        cost: 2,
        description: '造成1点伤害，抽一张牌。',
        deal: scene => {

            let role = scene.randRole();
            role.dealDamage(1);
            scene.hero.drawCard(1);
        }
    },
    {
        name: '风怒',
        cost: 2,
        description: '使一个随从获得风怒。'
    },
    {
        name: '寒冰箭',
        cost: 2,
        description: '对一个角色造成3点伤害，并使其冻结。',
        deal: scene => {

            let role = scene.randRole();

            role.dealDamage(3);
            role.frozen = true;
        }
    },
    {
        name: '闷棍',
        cost: 2,
        description: '将一个敌方随从移回其拥有者的手牌。',
        deal: scene => {

            let role = scene.randRole(true, true);

            if(role){
                role.current = 0;
                scene.enemy.supplementCard(1);
            }
        }
    },
    {
        name: '魔爆术',
        cost: 2,
        description: '对所有敌方随从造成1点伤害。',
        deal: scene => {

            // 取得所有敌人角色
            let roles = scene.allRole(true, true);

            for (let role of roles) {
                role.dealDamage(1);
            }
        }
    },
    {
        name: '神圣之灵',
        cost: 2,
        description: '使一个随从的生命值翻倍。',
        deal: scene => {
            let role = scene.randRole(true);

            if (role) {
                role.current *= 2;
                role.hp *= 2;
            }

        }
    },
    {
        name: '圣光术',
        cost: 2,
        description: '恢复6点生命值。',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.restoreHealth(6);
            }
        }
    },
    {
        name: '顺劈斩',
        cost: 2,
        description: '对2个随机敌方随从造成2点伤害。',
        deal: scene => {

            let roles = scene.randTwoEnemy();

            for (let role of roles) {
                role.dealDamage(2);
            }
        }
    },
    {
        name: '心灵震爆',
        cost: 2,
        description: '对敌方英雄造成5点伤害。',
        deal: scene => {
            scene.enemy.dealDamage(5);
        }
    },
    {
        name: '野性成长',
        cost: 2,
        description: '获得一颗空的法力水晶。',
        deal: scene => {
            scene.hero.supplementCard(1);
        }
    },
    {
        name: '野性印记',
        cost: 2,
        description: '使1个随从获得嘲讽以及+2/+2。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.current += 2;
                role.hp += 2;
                role.ap += 2;
            }
        }
    },
    {
        name: '英勇打击',
        cost: 2,
        description: '在本回合中，使你的英雄获得+4攻击力。',
        deal: scene => {
            scene.hero.ap += 4;
        }
    },
    {
        name: '暗言术：灭',
        cost: 3,
        description: '消灭一个攻击力大于或等于5的随从。',
        deal: scene => {

            let roles = scene.allRole(true).filter(a => a.ap >= 5);

            if (!roles.length) {
                return;
            }

            let index = Math.floor(Math.random() * roles.length);
            let role = roles[index];

            if (role) {
                role.current = 0;
            }
        }
    },
    {
        name: '暗影箭',
        cost: 3,
        description: '对1名随从造成4点伤害。',
        deal: scene => {
            let role = scene.randRole(true);

            if (role) {
                role.dealDamage(4);
            }
        }
    },
    {
        name: '奥术智慧',
        cost: 3,
        description: '抽2张牌。',
        deal: scene => {
            scene.hero.drawCard(2);
        }
    },
    {
        name: '冰霜新星',
        cost: 3,
        description: '冻结所有敌方随从。',
        deal: scene => {

            let roles = scene.allRole(true, true);

            for (let role of roles) {
                role.frozen = true;
            }
        }
    },
    {
        name: '冲锋',
        cost: 3,
        description: '使一个友方随从获得+2攻击力和冲锋。',
        deal: scene => {
            let roles = scene.friendlyMinions.filter(a => !a.dead);

            if(roles.length){
                let index = Math.floor(Math.random() * roles.length);
                let role = roles[index];
                role.ap += 2;
            }
        }
    },
    {
        name: '刀扇',
        cost: 3,
        description: '对所有敌方随从造成1点伤害，抽一张牌。',
        deal: scene => {

            let roles = scene.allRole(true, true);

            for (let role of roles) {
                role.dealDamage(1);
            }

            scene.hero.drawCard(1);
        }
    },
    {
        name: '动物伙伴',
        cost: 3,
        description: '随机召唤1头野兽宠物。',
        deal: scene => {

            let index = Math.floor(Math.random() * 3);

            if (index === 1) {
                scene.addMinion({
                    name: '雷欧克',
                    ap: 2,
                    hp: 4
                });
            }
            else if (index === 2) {
                scene.addMinion({
                    name: '霍夫',
                    ap: 4,
                    hp: 2
                });
            }
            else {
                scene.addMinion({
                    name: '米莎',
                    ap: 4,
                    hp: 4
                });
            }
        }
    },
    {
        name: '盾牌格挡',
        cost: 3,
        description: '获得5点护甲。抽1张牌。',
        deal: scene => {
            scene.hero.addArmor(5);
            scene.hero.drawCard(1);
        }
    },
    {
        name: '杀戮命令',
        cost: 3,
        description: '造成3点伤害。如果你有野兽，那么造成5点伤害取而代之。',
        deal: scene => {

            let role = scene.randRole();

            if (role) {
                role.dealDamage(3);
            }
        }
    },
    {
        name: '吸取生命',
        cost: 3,
        description: '造成2点伤害，为你的英雄恢复2点生命值。',
        deal: scene => {

            let role = scene.randRole();

            if (role) {
                role.dealDamage(4);
            }

            scene.hero.restoreHealth(2);
        }
    },
    {
        name: '妖术',
        cost: 3,
        description: '使一个随从变形成为一个0/1并具有嘲讽的青蛙。',
        data: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.current = 0;
            }

            scene.addMinion({
                hp: 1,
                ap: 0,
                name: '青蛙'
            });
        }
    },
    {
        name: '野蛮咆哮',
        cost: 3,
        description: '在本回合中，使你的所有角色获得+2攻击力。',
        deal: scene => {

            let roles = [scene.hero].concat(scene.friendlyMinions.filter(a => !a.dead));

            for (let role of roles) {
                role.ap += 2;
            }
        }
    },
    {
        name: '治疗之触',
        cost: 3,
        description: '恢复8点生命值。',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.restoreHealth(8);
            }
        }
    },
    {
        name: '变形术',
        cost: 4,
        description: '使一个随从变形成为1/1的绵羊。',
        data: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.current = 0;
            }

            scene.addMinion({
                hp: 1,
                ap: 1,
                name: '绵羊'
            });
        }
    },
    {
        name: '地狱烈焰',
        cost: 4,
        description: '对所有角色造成3点伤害。',
        deal: scene => {

            let roles = scene.allRole();

            for (let role of roles) {
                role.dealDamage(3);
            }
        }
    },
    {
        name: '多重射击',
        cost: 4,
        description: '随机对2名敌对随从造成3点伤害。',
        deal: scene => {

            let roles = scene.randTwoEnemy();

            for (let role of roles) {
                role.dealDamage(3);
            }
        }
    },
    {
        name: '愤怒之锤',
        cost: 4,
        description: '造成3点伤害，抽一张牌。',
        deal: scene => {

            let role = scene.randRole();
            role.dealDamage(3);
            scene.hero.drawCard(1);
        }
    },
    {
        name: '奉献',
        cost: 4,
        description: '对所有敌人造成2点伤害。',
        deal: scene => {

            let roles = scene.allRole(false, true);

            for (let role of roles) {
                role.dealDamage(2);
            }
        }
    },
    {
        name: '横扫',
        cost: 4,
        description: '对一个敌人造成4点伤害，并对所有其他敌人造成1点伤害。',
        deal: scene => {

            let roles = scene.allRole(false, true);

            let target = scene.randRole(false, true);

            for (let role of roles) {

                if (role !== target) {
                    role.dealDamage(1);
                }
                else {
                    role.dealDamage(4);
                }
            }
        }
    },
    {
        name: '火球术',
        cost: 4,
        description: '造成6点伤害。',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.dealDamage(6);
            }
        }
    },
    {
        name: '王者祝福',
        cost: 4,
        description: '使一个随从获得+4/+4。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.hp += 4;
                role.current += 4;
                role.ap += 4;
            }
        }
    },
    {
        name: '刺杀',
        cost: 5,
        description: '消灭一个敌方随从。',
        deal: scene => {

            let role = scene.randRole(true, true);

            if (role) {
                role.current = 0;
            }
        }
    },
    {
        name: '神圣新星',
        cost: 5,
        description: '对所有敌方角色造成2点伤害，为所有友方角色恢复2点生命值。',
        deal: scene => {

            let roles = scene.allRole(false, true);

            for (let role of roles) {
                role.dealDamage(2);
            }

            roles = [scene.hero].concat(scene.friendlyMinions.filter(a => !a.dead));

            for (let role of roles) {
                role.restoreHealth(2);
            }
        }
    },
    {
        name: '嗜血',
        cost: 5,
        description: '在本回合中，使你的随从获得+3攻击力。',
        deal: scene => {

            let roles = scene.friendlyMinions.filter(a => !a.dead);

            for (let role of roles) {
                role.ap += 3;
            }
        }
    },
    {
        name: '消失',
        cost: 6,
        description: '将所有随从移回其拥有者的手牌。',
        deal: scene => {

            let enemy = scene.allRole(true, true).length;
            let roles = scene.allRole(true);

            for (let role of roles) {
                role.current = 0;
            }

            scene.hero.supplementCard(roles.length - enemy);
            scene.enemy.supplementCard(enemy);
        }
    },
    {
        name: '星火术',
        cost: 6,
        description: '造成5点伤害，抽1张牌。',
        deal: scene => {

            let role = scene.randRole();
            role.dealDamage(5);
            scene.hero.drawCard(1);
        }
    },
    {
        name: '疾跑',
        cost: 7,
        description: '抽4张牌。',
        deal: scene => {

            scene.hero.drawCard(4);
        }
    },
    {
        name: '烈焰风暴',
        cost: 7,
        description: '对所有敌方随从造成4点伤害。',
        deal: scene => {

            let roles = scene.allRole(true, true);

            for (let role of roles) {
                role.dealDamage(4);
            }
        }
    },
    {
        name: '精神控制',
        cost: 10,
        description: '获得一个敌方随从的控制权。',
        deal: scene => {

            let role = scene.randRole(true, true);

            if (role) {

                let index = scene.enemyMinions.indexOf(role);
                scene.enemyMinions.splice(index, 1);

                if (scene.friendlyMinions.filter(a => !a.dead).length <= 6) {
                    scene.friendlyMinions.push(role);
                }
            }
        }
    },
    {
        name: '暗影步',
        cost: 0,
        description: '使一个友方随从移回你的手牌，它的法力值消耗减少(2)点。',
        deal: scene => {

            let roles = scene.friendlyMinions.filter(a => !a.dead);
            let index = Math.floor(Math.random() * roles.length);
            let role = roles[index];

            if (role) {
                role.current = 0;
                scene.hero.supplementCard(1);
            }
        }
    },
    {
        name: '沉默',
        cost: 0,
        description: '沉默一个随从。'
    },
    {
        name: '怒火中烧',
        cost: 0,
        description: '对一个随从造成1点伤害，该随从获得+2攻击力。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.dealDamage(1);
                role.ap += 2;
            }
        }
    },
    {
        name: '伺机待发',
        cost: 0,
        description: '在本回合中，你所施放的下一个法术的法力值消耗减少(3)点。'
    },
    {
        name: '治疗之环',
        cost: 0,
        description: '为所有随从恢复4点生命值。',
        deal: scene => {

            let roles = scene.allRole(true);

            for (let role of roles) {
                role.restoreHealth(4);
            }
        }
    },
    {
        name: '冰枪术',
        cost: 1,
        description: '使一个角色冻结，如果它已经被冻结，则改为对其造成4点伤害。',
        deal: scene => {

            let role = scene.randRole();

            if (role.frozen) {
                role.dealDamage(4);
            }

            role.frozen = true;
        }
    },
    {
        name: '叉状闪电',
        cost: 1,
        description: '对2个随机敌方随从造成2点伤害，过载：(2)',
        deal: scene => {

            let roles = scene.randTwoEnemy();

            for (let role of roles) {
                role.dealDamage(2);
            }
        }
    },
    {
        name: '忏悔',
        cost: 1,
        description: '奥秘：当你的对手召唤一个随从，使该随从的生命值降为1。',
        deal: scene => {
            scene.hero.addSecret('忏悔');
        }
    },
    {
        name: '崇高牺牲',
        cost: 1,
        description: '奥秘：每当一个敌人攻击时，召唤一个2/1的防御者，并使其成为攻击的目标。',
        deal: scene => {
            scene.hero.addSecret('崇高牺牲');
        }
    },
    {
        name: '大地震击',
        cost: 1,
        description: '沉默一个随从，然后对其造成1点伤害。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.shield = false;
                role.dealDamage(1);
            }
        }
    },
    {
        name: '盾牌猛击',
        cost: 1,
        description: '你每有1点护甲值，便对一个随从造成1点伤害。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.dealDamage(scene.hero.armor);
            }
        }
    },
    {
        name: '救赎',
        cost: 1,
        description: '奥秘：当一个你的随从死亡时，使其回到战场，并具有1点生命值。',
        deal: scene => {
            scene.hero.addSecret('救赎');
        }
    },
    {
        name: '狂野怒火',
        cost: 1,
        description: '在本回合内，使1个野兽获得+2攻击和免疫。'
    },
    {
        name: '冷血',
        cost: 1,
        description: '使一个随从获得+2攻击力；连击：改为获得+4攻击力。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.ap += 2;
            }
        }
    },
    {
        name: '力量的代价',
        cost: 1,
        description: '直到回合结束，使一个友方随从获得+4/+4，然后将其消灭。',
        deal: scene => {

            let roles = scene.friendlyMinions.filter(a => !a.dead);

            if (!roles) {
                return;
            }
            let index = Math.floor(Math.random() * roles.length);
            let role = roles[index];

            if (role) {
                role.hp += 4;
                role.current += 4;
                role.ap += 4;
            }
        }
    },
    {
        name: '闪电箭',
        cost: 1,
        description: '造成3点伤害，过载：(1)',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.dealDamage(3);
            }
        }
    },
    {
        name: '升级！',
        cost: 1,
        description: '如果你有一把武器，使它获得+1/+1。否则，装备一把1/3的武器。'
    },
    {
        name: '心灵之火',
        cost: 1,
        description: '使一个随从的攻击力等同于其生命值。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.ap = role.current;
            }
        }
    },
    {
        name: '野蛮之击',
        cost: 1,
        description: '对一个随从造成等同于你的英雄攻击力的伤害。',
        deal: scene => {

            let ap = scene.hero.ap;
            let role = scene.randRole(true);

            if (role && ap) {
                role.dealDamage(ap);
            }
        }
    },
    {
        name: '以眼还眼',
        cost: 1,
        description: '奥秘：每当你的英雄受到伤害时，对敌方英雄造成等量的伤害。',
        deal: scene => {
            scene.hero.addSecret('以眼还眼');
        }
    },
    {
        name: '隐藏',
        cost: 1,
        description: '直到你的下个回合，使所有友方随从获得潜行。'
    },
    {
        name: '智慧祝福',
        cost: 1,
        description: '选择一个随从，每当它进行攻击时，抽一张牌。'
    },
    {
        name: '自然平衡',
        cost: 1,
        description: '消灭一个随从，你的对手抽两张牌。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.current = 0;
            }

            scene.enemy.drawCard(2);
        }
    },
    {
        name: '爆炸陷阱',
        cost: 2,
        description: '奥秘：当你的英雄受到攻击时，对所有敌人造成2点伤害。',
        deal: scene => {
            scene.hero.addSecret('爆炸陷阱');
        }
    },
    {
        name: '背叛',
        cost: 2,
        description: '一个敌方随从对其相邻的随从造成等同于其攻击力的伤害。',
        deal: scene => {

            let target = scene.randRole(true, true);

            if (target) {
                let roles = scene.neighbouringRoles(target);

                for (let role of roles) {
                    role.dealDamage(target.ap);
                }
            }
        }
    },
    {
        name: '冰冻陷阱',
        cost: 2,
        description: '奥秘：当1个敌对随从攻击时，让其返回到所有者手中，并令其消耗增加(2)',
        deal: scene => {
            scene.hero.addSecret('冰冻陷阱');
        }
    },
    {
        name: '刺骨',
        cost: 2,
        description: '造成2点伤害。连击：造成4点伤害取而代之。',
        deal: scene => {

            let role = scene.randRole();

            if (role) {
                role.dealDamage(2);
            }
        }
    },
    {
        name: '毒蛇陷阱',
        cost: 2,
        description: '奥秘：当你的1个随从遭到攻击时，召唤3条1/1毒蛇。',
        deal: scene => {
            scene.hero.addSecret('毒蛇陷阱');
        }
    },
    {
        name: '恶魔之火',
        cost: 2,
        description: '对一个随从造成2点伤害，如果该随从是友方恶魔，则改为使其获得+2/+2。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.dealDamage(2);
            }
        }
    },
    {
        name: '愤怒',
        cost: 2,
        description: '抉择：对一个随从造成3点伤害；或者造成1点伤害并抽一张牌。',
        deal: scene => {

            let role = scene.randRole(true);

            if (!role) {
                return;
            }

            // 随机化处理
            if (Math.random() < 0.5) {
                role.dealDamage(3);
            }
            else {
                role.dealDamage(1);
                scene.hero.drawCard(1);
            }
        }
    },
    {
        name: '剑刃乱舞',
        cost: 2,
        description: '摧毁你的武器，对所有敌方角色造成等同于其攻击力的伤害。'
    },
    {
        name: '狙击',
        cost: 2,
        description: '奥秘：当对手打出1个随从时，对该随从造成4点伤害。',
        deal: scene => {
            scene.hero.addSecret('狙击');
        }
    },
    {
        name: '狂暴',
        cost: 2,
        description: '使一个受过伤害的随从获得+3/+3。',
        deal: scene => {

            let roles = scene.allRole(true).filter(a => a.current < a.hp);

            if (roles.length) {

                let index = Math.floor(Math.random() * roles.length);
                let role = roles[index];

                role.current += 3;
                role.hp += 3;
                role.ap = +3;
            }
        }
    },
    {
        name: '猛击',
        cost: 2,
        description: '对一个随从造成2点伤害，如果它依然存活，则抽一张牌。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {

                role.dealDamage(2);

                if (!role.dead) {
                    scene.hero.drawCard(1);
                }
            }
        }
    },
    {
        name: '命令怒吼',
        cost: 2,
        description: '本回合内，你随从的血量无法低于1点。'
    },
    {
        name: '生而平等',
        cost: 2,
        description: '将所有随从的生命值变为1。',
        deal: scene => {

            let roles = scene.allRole(true);

            for (let role of roles) {
                role.current = role.hp = 1;
            }
        }
    },
    {
        name: '误导',
        cost: 2,
        description: '奥秘：当一个角色攻击你的英雄时，让他随机攻击另外一个角色取而代之。',
        deal: scene => {
            scene.hero.addSecret('误导');
        }
    },
    {
        name: '先祖之魂',
        cost: 2,
        description: '选择一个随从，当该随从被消灭时，它将返回战场。'
    },
    {
        name: '野性之力',
        cost: 2,
        description: '抉择：使你的随从获得+1/+1；或者召唤一个3/2的猎豹。',
        deal: scene => {

            if (Math.random() < 0.5) {
                scene.addMinion({
                    name: '猎豹',
                    ap: 3,
                    hp: 2
                });
            }
            else {
                let roles = scene.friendlyMinions.filter(a => a.dead);

                for (let role of roles) {
                    role.ap += 1;
                    role.hp += 1;
                    role.current += 1;
                }
            }

        }
    },
    {
        name: '战斗怒火',
        cost: 2,
        description: '每有一个受到伤害的友方角色，便抽一张牌。',
        deal: scene => {

            let roles = [scene.hero].concat(scene.friendlyMinions.filter(a => !a.dead));

            for (let role of roles) {

                if (role.current < role.hp) {
                    scene.hero.drawCard(1);
                }
            }
        }
    },
    {
        name: '照明弹',
        cost: 2,
        description: '使所有随从失去潜行效果。摧毁敌方所有奥秘。抽1张牌。',
        deal: scene => {
            scene.hero.drawCard(1);
        }
    },
    {
        name: '暗影形态',
        cost: 3,
        description: '你的英雄技能变为“造成2点伤害”，如果已经处于暗影形态下：改为“造成3点伤害”。'
    },
    {
        name: '法术反制',
        cost: 3,
        description: '奥秘：当你的对手施放法术时，反制该法术。',
        deal: scene => {
            scene.hero.addSecret('法术反制');
        }
    },
    {
        name: '感知恶魔',
        cost: 3,
        description: '从你的牌库中随机将2张恶魔牌置入你的手牌。'
    },
    {
        name: '关门放狗',
        cost: 3,
        description: '战场上每有一个敌方随从，便召唤一个1/1并具有冲锋的猎犬。',
        deal: scene => {

            let count = scene.allRole(true, true).length;

            for (let i = 0; i < count; i++) {
                scene.addMinion({
                    name: '猎犬',
                    ap: 1,
                    hp: 1
                });
            }
        }
    },
    {
        name: '寒冰护体',
        cost: 3,
        description: '奥秘：当你的英雄受到攻击时，获得8点护甲值。',
        deal: scene => {
            scene.hero.addSecret('寒冰护体');
        }
    },
    {
        name: '寒冰屏障',
        cost: 3,
        description: '奥秘：每当你的英雄将要承受致命伤害时，防止这些伤害，并使其在本回合中获得免疫。',
        deal: scene => {
            scene.hero.addSecret('寒冰屏障');
        }
    },
    {
        name: '镜像实体',
        cost: 3,
        description: '奥秘：当一个敌方随从进行攻击时，召唤一个该随从的复制。',
        deal: scene => {
            scene.hero.addSecret('镜像实体');
        }
    },
    {
        name: '裂颅之击',
        cost: 3,
        description: '对敌方英雄造成2点伤害；连击：在下个回合将其移回你的手牌。',
        deal: scene => {
            scene.enemy.dealDamage(2);
        }
    },
    {
        name: '扰咒术',
        cost: 3,
        description: '奥秘：当一个敌方法术以一个随从为目标时，召唤一个1/3的随从并使其成为新的目标。',
        deal: scene => {
            scene.hero.addSecret('扰咒术');
        }
    },
    {
        name: '熔岩爆裂',
        cost: 3,
        description: '造成5点伤害，过载：(2)',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.dealDamage(5);
            }
        }
    },
    {
        name: '闪电风暴',
        cost: 3,
        description: '对所有敌方随从造成2到3点伤害，过载：(2)',
        deal: scene => {

            let roles = scene.allRole(true, true);

            for (let role of roles) {
                role.dealDamage(2 + Math.floor(Math.random() * 2));
            }
        }
    },
    {
        name: '神恩术',
        cost: 3,
        description: '抽若干数量的牌，直到你的手牌数量等同于你的对手的手牌数量。'
    },
    {
        name: '视界术',
        cost: 3,
        description: '抽一张牌，该牌的法力值消耗减少(3)点。',
        deal: scene => {
            scene.hero.drawCard(1);
        }
    },
    {
        name: '思维窃取',
        cost: 3,
        description: '复制对手的牌库中的2张牌，并将其置入你的手牌。',
        deal: scene => {
            scene.hero.supplementCard(2);
        }
    },
    {
        name: '野性狼魂',
        cost: 3,
        description: '召唤2个2/3并具有嘲讽的幽灵狼。过载：(2)',
        deal: scene => {

            scene.addMinion({
                name: '幽灵狼',
                ap: 2,
                hp: 3
            });

            scene.addMinion({
                name: '幽灵狼',
                ap: 2,
                hp: 3
            });
        }
    },
    {
        name: '蒸发',
        cost: 3,
        description: '奥秘：当一个随从攻击你的英雄，将其消灭。',
        deal: scene => {
            scene.hero.addSecret('蒸发');
        }
    },
    {
        name: '致命射击',
        cost: 3,
        description: '随机摧毁1个敌对随从。',
        deal: scene => {

            let role = scene.randRole(true, true);

            if (role) {
                role.current = 0;
            }
        }
    },
    {
        name: '自然印记',
        cost: 3,
        description: '抉择：使一个随从获得+4攻击力；或者+4生命值并具有嘲讽。',
        deal: scene => {

            let role = scene.randRole(true);

            if(role){
                if (Math.random() < 0.5) {
                    role.ap += 4;
                }
                else {
                    role.hp += 4;
                    role.current += 4;
                }
            }
        }
    },
    {
        name: '暗影狂乱',
        cost: 4,
        description: '直到回合结束，获得一个攻击力小于或等于3的敌方随从的控制权。'
    },
    {
        name: '暗影烈焰',
        cost: 4,
        description: '消灭一个友方随从，对所有敌方随从造成等同于其攻击力的伤害。',
        deal: scene => {

            let roles = scene.friendlyMinions.filter(a => !a.dead);

            if (!roles.length) {
                return;
            }

            let index = Math.floor(Math.random() * roles.length);
            let target = roles[index];

            roles = scene.allRole(true, true);

            target.current = 0;

            for (let role of roles) {
                role.dealDamage(target.ap);
            }
        }
    },
    {
        name: '冰锥术',
        cost: 4,
        description: '冻结一个随从和其相邻的随从，并对它们造成1点伤害。',
        deal: scene => {

            let target = scene.randRole(true);

            if(target){

                let neighbouringRoles = scene.neighbouringRoles(target).concat(target);

                for (let role of neighbouringRoles) {
                    role.frozen = true;
                    role.dealDamage(1);
                }
            }
        }
    },
    {
        name: '丛林之魂',
        cost: 4,
        description: '使你的随从获得“亡语：召唤一个2/2的树人。”'
    },
    {
        name: '控心术',
        cost: 4,
        description: '随机复制对手的牌库中的一张随从牌，并将其置入战场。'
    },
    {
        name: '群体驱散',
        cost: 4,
        description: '沉默所有敌方随从，抽一张牌。',
        deal: scene => {
            scene.hero.drawCard(1);
        }
    },
    {
        name: '撕咬',
        cost: 4,
        description: '在本回合中，使你的英雄获得+4攻击力和4点护甲值。',
        deal: scene => {
            scene.hero.addArmor(4);
            scene.hero.ap += 4
        }
    },
    {
        name: '致死打击',
        cost: 4,
        description: '造成4点伤害；如果你的英雄的生命值小于或等于12点，则改为造成6点伤害。',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.dealDamage(scene.hero.hp <= 12 ? 6 : 4);
            }
        }
    },
    {
        name: '爆炸射击',
        cost: 5,
        description: '对1个随从造成5点伤害，并对相邻目标造成2点伤害。',
        deal: scene => {

            let target = scene.randRole(true);

            if(target){
                let roles = scene.neighbouringRoles(target);

                target.dealDamage(5);

                for (let role of roles) {
                    role.dealDamage(2);
                }
            }
        }
    },
    {
        name: '绝命乱斗',
        cost: 5,
        description: '随机选择一个随从，消灭除了该随从外的所有其他随从。',
        deal: scene => {

            let target = scene.randRole(true);
            let roles = scene.allRole(true);

            for (let role of roles) {
                if (role !== target) {
                    role.current = 0;
                }
            }
        }
    },
    {
        name: '末日灾祸',
        cost: 5,
        description: '对一个角色造成2点伤害，如果末日灾祸杀死该角色，随机召唤一个恶魔。',
        deal: scene => {

            let role = scene.randRole();
            role.dealDamage(2);

            if (role.dead) {

                // 取一个平均的股数身材
                scene.addMinion({
                    name: '随机恶魔',
                    ap: 4,
                    hp: 5
                })
            }

        }
    },
    {
        name: '神圣愤怒',
        cost: 5,
        description: '抽一张牌，并造成等同于其法力值消耗的伤害。',
        deal: scene => {

            let role = scene.randRole();

            let damage = Math.floor(Math.random() * 13);

            if (damage === 11) {
                damage = 20;
            }

            role.dealDamage(damage);
        }
    },
    {
        name: '受祝福的勇士',
        cost: 5,
        description: '使一个随从的攻击力翻倍。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.ap *= 2;
            }
        }
    },
    {
        name: '星辰坠落',
        cost: 5,
        description: '抉择：对一个随从造成5点伤害；或者对所有敌方随从造成2点伤害。',
        deal: scene => {

            if (Math.random() > 0.5) {
                let role = scene.randRole(true);

                if (role) {
                    role.dealDamage(5);
                }

                return;
            }

            let roles = scene.allRole(true, true);

            for (let role of roles) {
                role.dealDamage(2);
            }
        }
    },
    {
        name: '滋养',
        cost: 5,
        description: '抉择：获得2个法力水晶；或者抽3张牌。',
        deal: scene => {

            if (Math.random() < 0.5) {
                scene.hero.drawCard(3);
            }
        }
    },
    {
        name: '暴风雪',
        cost: 6,
        description: '对所有敌方随从造成2点伤害，并使其冻结。',
        deal: scene => {

            let roles = scene.allRole(true, true);

            for (let role of roles) {
                role.dealDamage(2);
                role.frozen = true;
            }
        }
    },
    {
        name: '复仇之怒',
        cost: 6,
        description: '造成8点伤害，随机分配给敌方角色。',
        deal: scene => {

            for (let i = 0; i < 8; i++) {
                let role = scene.randRole(false, true);
                role.dealDamage(1);
            }
        }
    },
    {
        name: '灵魂虹吸',
        cost: 6,
        description: '消灭一个随从，为你的英雄恢复3点生命值。',
        deal: scene => {
            let role = scene.randRole(true);

            if (role) {
                role.current = 0;
                scene.hero.restoreHealth(3);
            }
        }
    },
    {
        name: '神圣之火',
        cost: 6,
        description: '造成5点伤害。为你的英雄恢复5点生命值。',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.dealDamage(5);
            }

            scene.hero.restoreHealth(5);
        }
    },
    {
        name: '自然之力',
        cost: 6,
        description: '召唤3个2/2并具有冲锋的树人，在回合结束时，消灭这些树人。',
        deal: scene => {

            scene.addMinion({
                name: '树人',
                ap: 2,
                hp: 2
            });

            scene.addMinion({
                name: '树人',
                ap: 2,
                hp: 2
            });

            scene.addMinion({
                name: '树人',
                ap: 2,
                hp: 2
            });
        }
    },
    {
        name: '扭曲虚空',
        cost: 8,
        description: '消灭所有随从。',
        deal: scene => {

            let roles = scene.allRole(true);

            for (let role of roles) {
                role.current = 0;
            }
        }
    },
    {
        name: '圣疗术',
        cost: 8,
        description: '恢复8点生命。抽3张牌。',
        deal: scene => {

            let role = scene.randRole();
            role.restoreHealth(8);
            scene.hero.drawCard(3);
        }
    },
    {
        name: '炎爆术',
        cost: 10,
        description: '造成10点伤害。',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.dealDamage(10);
            }
        }
    },

    // 狂野开始
    {
        name: '复仇',
        cost: 1,
        description: '奥秘：当你的随从死亡时，使一个随机友方随从获得+3/+2。',
        deal: scene => {
            scene.hero.addSecret('复仇');
        }
    },
    {
        name: '转生',
        cost: 2,
        description: '消灭一个随从，然后将其复活，并恢复所有生命值。',
        deal: scene => {

            let role = scene.randRole(true);

            // 简单用恢复满血替代
            if (role) {
                role.current = role.hp;
            }

        }
    },
    {
        name: '复制',
        cost: 3,
        description: '当一个友方随从死亡时，将两个该随从的复制置入你的手牌。',
        deal: scene => {
            scene.hero.addSecret('复制');
        }
    },
    {
        name: '剧毒之种',
        cost: 4,
        description: '消灭所有随从，并召唤等量的2/2的树人代替他们。',
        deal: scene => {

            let count = scene.allRole(true, true).length;
            let roles = scene.allRole(true);

            for (let role of roles) {
                role.current = 0;
            }

            for (let i = 0; i < count; i++) {
                scene.addEnemyMinion({
                    name: '树人',
                    ap: 2,
                    hp: 2
                });
            }

            for (let i = 0; i < (roles.length - count); i++) {
                scene.addMinion({
                    name: '树人',
                    ap: 2,
                    hp: 2
                });
            }
        }
    },
    {
        name: '纳鲁之光',
        cost: 1,
        description: '恢复3点生命值。如果该目标仍处于受伤状态，则召唤一个圣光护卫者。',
        deal: scene => {

            let role = scene.randRole();

            role.restoreHealth(3);

            if ('current' in role && role.current < role.hp || !('current' in role) && role.hp < 30) {
                scene.addMinion({
                    name: '圣光护卫者',
                    ap: 1,
                    hp: 3
                })
            }
        }
    },
    {
        name: '暗色炸弹',
        cost: 2,
        description: '造成3点伤害。',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.dealDamage(3);
            }
        }
    },
    {
        name: '不稳定的传送门',
        cost: 2,
        description: '将一个随机随从卡牌加入你的手牌。该随从的法力值消耗减少(3)点。',
        deal: scene => {
            scene.hero.supplementCard(1);
        }
    },
    {
        name: '光明圣印',
        cost: 2,
        description: '为你的英雄恢复4点生命值，并在本回合中获得+2攻击力。',
        deal: scene => {
            scene.hero.restoreHealth(4);
            scene.hero.ap += 2;
        }
    },
    {
        name: '假死',
        cost: 2,
        description: '触发所有友方随从亡语效果。'
    },
    {
        name: '连环爆裂',
        cost: 2,
        description: '造成3到6点伤害，过载：(1)。',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.dealDamage(3 + Math.floor(Math.random() * 3));
            }
        }
    },
    {
        name: '烈焰轰击',
        cost: 2,
        description: '对一个随机敌方随从造成4点伤害。',
        deal: scene => {

            let role = scene.randRole(true, true);

            if (role) {
                role.dealDamage(4);
            }
        }
    },
    {
        name: '召唤宠物',
        cost: 2,
        description: '抽一张牌。如果该牌是野兽牌，则其法力值消耗减少(4)点。',
        deal: scene => {
            scene.hero.drawCard(1);
        }
    },
    {
        name: '弹射之刃',
        cost: 3,
        description: '对一个随机随从造成1点伤害。重复此效果，直到某个随从死亡。',
        deal: scene => {

            let role = null;

            do {

                role = scene.randRole(true);

                if (role) {
                    role.dealDamage(1);
                }
            }
            while (role && !role.dead)
        }
    },
    {
        name: '维纶的恩泽',
        cost: 3,
        description: '使一个随从获得+2/+4并具有法术伤害+1。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.ap += 2;
                role.hp += 4;
                role.current += 4;
            }
        }
    },
    {
        name: '作战动员',
        cost: 3,
        description: '召唤三个1/1白银之手新兵，装备一把1/4的武器。',
        deal: scene => {

            scene.addMinion({
                name: '白银之手新兵',
                ap: 1,
                hp: 1
            });

            scene.addMinion({
                name: '白银之手新兵',
                ap: 1,
                hp: 1
            });

            scene.addMinion({
                name: '白银之手新兵',
                ap: 1,
                hp: 1
            });
        }
    },
    {
        name: '暗中破坏',
        cost: 4,
        description: '消灭一个随机敌方随从，连击：并且摧毁你的对手的武器。',
        deal: scene => {

            let role = scene.randRole(true, true);

            if (role) {
                role.current = 0;
            }
        }
    },
    {
        name: '麦迪文的残影',
        cost: 4,
        description: '复制你的所有随从，并将其置入你的手牌。',
        deal: scene => {
            let count = scene.friendlyMinions.filter(a => !a.dead).length;

            scene.hero.supplementCard(count);
        }
    },
    {
        name: '先祖召唤',
        cost: 4,
        description: '每个玩家从手牌中将一个随机随从置入战场。'
    },
    {
        name: '小鬼爆破',
        cost: 4,
        description: '对一个随从造成2-4点伤害。每造成1点伤害，便召唤一个1/1的小鬼。',
        deal: scene => {

            let damage = 2 + Math.floor(Math.random() * 3);
            let role = scene.randRole(true);

            if(role){

                role.dealDamage(damage);

                for (let i = 0; i < damage; i++) {
                    scene.addMinion({
                        name: '小鬼',
                        ap: 1,
                        hp: 1
                    });
                }
            }
        }
    },
    {
        name: '修补匠的磨刀油',
        cost: 4,
        description: '使你的武器获得+3攻击力。连击：使一个随机友方随从获得+3攻击力。'
    },
    {
        name: '恶魔之心',
        cost: 5,
        description: '对一个随从造成5点伤害，如果该随从是友方恶魔，则改为使其获得+5/+5。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.dealDamage(5);
            }
        }
    },
    {
        name: '眼镜蛇射击',
        cost: 5,
        description: '对一个随从和敌方英雄造成3点伤害。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.dealDamage(3);
            }

            scene.enemy.dealDamage(3);
        }
    },
    {
        name: '黑暗低语者',
        cost: 6,
        description: '抉择：召唤5个小精灵；或者使一个随从获得+5/+5并具有嘲讽。',
        deal: scene => {

            if (Math.random() < 0.5) {

                let role = scene.randRole(true);

                if (role) {
                    role.hp += 5;
                    role.current += 5;
                    role.ap += 5;
                }
                else {

                    scene.addMinion({
                        name: '小精灵',
                        ap: 1,
                        hp: 1
                    });

                    scene.addMinion({
                        name: '小精灵',
                        ap: 1,
                        hp: 1
                    });

                    scene.addMinion({
                        name: '小精灵',
                        ap: 1,
                        hp: 1
                    });

                    scene.addMinion({
                        name: '小精灵',
                        ap: 1,
                        hp: 1
                    });

                    scene.addMinion({
                        name: '小精灵',
                        ap: 1,
                        hp: 1
                    });
                }
            }
        }
    },
    {
        name: '回收',
        cost: 6,
        description: '将一个敌方随从洗回你的对手的牌库。',
        deal: scene => {

            let role = scene.randRole(true, true);

            if (role) {
                role.current = 0;
                scene.enemy.pushStack(1);
            }
        }
    },
    {
        name: '圣光炸弹',
        cost: 6,
        description: '对所有随从造成等同于其攻击力的伤害。',
        deal: scene => {

            let roles = scene.allRole(true);

            for (let role of roles) {
                role.dealDamage(role.ap);
            }
        }
    },
    {
        name: '重碾',
        cost: 7,
        description: '消灭一个随从。如果你控制任何受伤的随从，该法术的法力值消耗减少(4)点。',
        deal: scene => {

            let role = scene.randRole(true, true);

            if (role) {
                role.current = 0;
            }
        }
    },
    {
        name: '生命之树',
        cost: 9,
        description: '为所有角色恢复所有生命值。',
        deal: scene => {

            let roles = scene.allRole();

            for (let role of roles) {
                if ('current' in role) {
                    role.current = role.hp;
                }
                else {
                    role.hp = 30;
                }
            }
        }
    },
    // 狂野结束

    {
        name: '复仇打击',
        cost: 2,
        description: '对所有随从造成1点伤害。如果你的生命值小于或等于12点，则改为造成3点伤害。',
        deal: scene => {

            let roles = scene.allRole(true);

            for (let role of roles) {
                role.dealDamage(scene.hero.hp <= 12 ? 3 : 1);
            }
        }
    },
    {
        name: '复活术',
        cost: 2,
        description: '随机召唤一个在本局对战中死亡的友方随从。'
    },
    {
        name: '快速射击',
        cost: 2,
        description: '造成3点伤害。如果你没有其他手牌，则抽一张牌。',
        deal: scene => {

            let role = scene.randRole();
            role.dealDamage(3);
        }
    },
    {
        name: '熔岩震击',
        cost: 2,
        description: '造成2点伤害。将你所有过载的法力水晶解锁。',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.dealDamage(2);
            }
        }
    },
    {
        name: '夜幕奇袭',
        cost: 2,
        description: '选择一个随从。将该随从的3个复制洗入你的牌库。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                scene.hero.pushStack(3);
            }
        }
    },
    {
        name: '恶魔之怒',
        cost: 3,
        description: '对所有非恶魔随从造成2点伤害。',
        deal: scene => {

            let roles = scene.allRole(true);

            for (let role of roles) {
                role.dealDamage(2);
            }
        }
    },
    {
        name: '龙息术',
        cost: 5,
        description: '造成4点伤害。在本回合中每有一个随从死亡，该牌的法力值消耗就减少(1)点。',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.dealDamage(4);
            }
        }
    },
    {
        name: '严正警戒',
        cost: 5,
        description: '抽两张牌。在本回合中每有一个随从死亡，该牌的法力值消耗就减少(1)点。',
        deal: scene => {
            scene.hero.drawCard(2);
        }
    },
    {
        name: '奥数冲击',
        cost: 1,
        description: '对一个随从造成2点伤害。该法术在受到法术伤害的增益效果时，效果翻倍。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.dealDamage(2);
            }
        }
    },
    {
        name: '活体根须',
        cost: 1,
        description: '抉择：造成2点伤害；或者召唤两个1/1的树苗。',
        deal: scene => {

            if (Math.random() < 0.5) {
                let role = scene.randRole();
                role.dealDamage(2);
            }
            else {
                scene.addMinion({
                    name: '树苗',
                    ap: 1,
                    hp: 1
                });

                scene.addMinion({
                    name: '树苗',
                    ap: 1,
                    hp: 1
                });
            }
        }
    },
    {
        name: '快速治疗',
        cost: 1,
        description: '恢复5点生命值。',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.restoreHealth(5);
            }
        }
    },
    {
        name: '真言术：耀',
        cost: 1,
        description: '选择一个随从。每当其进行攻击，为你的英雄恢复4点生命值。'
    },
    {
        name: '争强好胜',
        cost: 1,
        description: '奥秘：在你的回合开始时，使你的随从获得+1/+1。',
        deal: scene => {
            scene.hero.addSecret('争强好胜');
        }
    },
    {
        name: '捕熊陷阱',
        cost: 2,
        description: '奥秘：在你的英雄受到攻击后，召唤一个3/3并具有嘲讽的灰熊',
        deal: scene => {
            scene.hero.addSecret('捕熊陷阱');
        }
    },
    {
        name: '策反',
        cost: 2,
        description: '复制一个敌方随从，并将其置入你的手牌。',
        deal: scene => {
            scene.hero.supplementCard(1);
        }
    },
    {
        name: '恶魔融合',
        cost: 2,
        description: '使一个恶魔获得+3/+3，使你的对手获得一个法力水晶。'
    },
    {
        name: '加固',
        cost: 2,
        description: '使你具有嘲讽的随从获得+2/+2。'
    },
    {
        name: '迷乱',
        cost: 2,
        description: '使所有随从的攻击力和生命值互换。',
        deal: scene => {

            let roles = scene.allRole(true);

            for (let role of roles) {

                role.hp = role.ap;
                role.ap = role.current;
                role.current = role.hp;

            }
        }
    },
    {
        name: '先祖知识',
        cost: 2,
        description: '抽两张牌。过载：(2)',
        deal: scene => {
            scene.hero.drawCard(2);
        }
    },
    {
        name: '子弹上膛',
        cost: 2,
        description: '在本回合中，每当你施放一个法术，随机将一张猎人职业牌置入你的手牌。'
    },
    {
        name: '变形术：野猪',
        cost: 3,
        description: '使一个随从变形为4/2并具有冲锋的野猪。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.hp = role.current = 2;
                role.current = 4;
                role.name = '野猪';
            }
        }
    },
    {
        name: '腐根',
        cost: 3,
        description: '消灭一个随从。随机将一个随从置入你对手的手牌。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.current = 0;
                scene.enemy.supplementCard(1);
            }
        }
    },
    {
        name: '轮回',
        cost: 3,
        description: '奥秘：当一个友方随从死亡时，随机召唤一个法力值消耗相同的随从。',
        deal: scene => {
            scene.hero.addSecret('轮回');
        }
    },
    {
        name: '怒袭',
        cost: 3,
        description: '造成3点伤害。获得3点护甲值。',
        deal: scene => {
            let role = scene.randRole();

            if (role) {
                role.dealDamage(3);
            }

            scene.hero.addArmor(3);
        }
    },
    {
        name: '剽窃',
        cost: 3,
        description: '随机将两张（你的对手职业的）职业卡牌加入你的手牌。',
        deal: scene => {
            scene.hero.supplementCard(2);
        }
    },
    {
        name: '潜于地下',
        cost: 3,
        description: '将三张“伏击”牌洗入你对手的牌库，当你的对手抽到该牌时，你召唤一个4/4的蛛魔。',
        deal: scene => {
            scene.enemy.pushStack(3);
        }
    },
    {
        name: '强风射击',
        cost: 3,
        description: '对一个随从及其相邻的随从造成2点伤害。',
        deal: scene => {

            let target = scene.randRole(true);

            if(target){
                let roles = scene.neighbouringRoles(target);

                target.dealDamage(2);

                for (let role of roles) {
                    role.dealDamage(2);
                }
            }
        }
    },
    {
        name: '英勇圣印',
        cost: 3,
        description: '使一个随从获得+3攻击力，并具有圣盾。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.ap += 3;
                role.shield = true;
            }
        }
    },
    {
        name: '元素毁灭',
        cost: 3,
        description: '对所有随从造成4-5点伤害。过载：(5)',
        deal: scene => {

            let roles = scene.allRole(true);

            for (let role of roles) {
                role.dealDamage(4 + Math.floor(Math.random() * 2));
            }
        }
    },
    {
        name: '治疗波',
        cost: 3,
        description: '恢复7点生命值。揭示双方牌库里的一张随从牌，如果你的牌法力消耗较大，则恢复14点生命值。',
        deal: scene => {

            let role = scene.randRole();

            role.restoreHealth(7);

            if (Math.random() < 0.5) {
                role.restoreHealth(7);
            }
        }
    },
    {
        name: '加拉克苏斯之拳',
        cost: 4,
        description: '当你打出或丢弃该牌时，对一个随机敌人造成4点伤害。',
        deal: scene => {
            let role = scene.randRole(true, true);

            if (role) {
                role.dealDamage(4);
            }
        }
    },
    {
        name: '星界沟通',
        cost: 4,
        description: '获得十个法力水晶。弃掉你的手牌。'
    },
    {
        name: '烈焰长枪',
        cost: 5,
        description: '对一个随从造成8点伤害。',
        deal: scene => {
            let role = scene.randRole(true);

            if (role) {
                role.dealDamage(8);
            }
        }
    },
    {
        name: '黑暗契约',
        cost: 6,
        description: '随机消灭两个敌方随从。随机弃两张牌。',
        deal: scene => {

            let roles = scene.randTwoEnemy();

            for (let role of roles) {
                role.current = 0
            }

            scene.hero.supplementCard(-2);
        }
    },
    {
        name: '精英对决',
        cost: 6,
        description: '除了每个玩家攻击力最高的随从之外，消灭其他所有随从。',
        deal: scene => {

            let roles = scene.friendlyMinions.filter(a => !a.dead);

            if (roles.length > 1) {

                let max = 0;
                let target = null;

                for (let role of roles) {

                    if (role.ap >= max) {
                        max = role.ap;
                        target = role;
                    }
                }

                for (let role of roles) {
                    if (role !== target) {
                        role.current = 0;
                    }
                }

            }

            roles = scene.enemyMinions.filter(a => !a.dead);

            if (roles.length > 1) {

                let max = 0;
                let target = null;

                for (let role of roles) {

                    if (role.ap >= max) {
                        max = role.ap;
                        target = role;
                    }
                }

                for (let role of roles) {
                    if (role !== target) {
                        role.current = 0;
                    }
                }
            }
        }
    },
    {
        name: '天降蛛群',
        cost: 6,
        description: '召唤三个1/1的结网蛛。',
        deal: scene => {

            scene.addMinion({
                name: '结网蛛',
                ap: 1,
                hp: 1
            });

            scene.addMinion({
                name: '结网蛛',
                ap: 1,
                hp: 1
            });

            scene.addMinion({
                name: '结网蛛',
                ap: 1,
                hp: 1
            });
        }
    },
    {
        name: '审判',
        cost: 1,
        description: '奥秘：当你的对手打出一张随从牌时，如果他控制至少三个随从，则将其消灭。',
        deal: scene => {
            scene.hero.addSecret('审判');
        }
    },
    {
        name: '乌鸦神像',
        cost: 1,
        description: '抉择：发现一张随从牌；或者发现一张法术牌。',
        deal: scene => {
            scene.hero.supplementCard(1);
        }
    },
    {
        name: '毒镖陷阱',
        cost: 2,
        description: '奥秘：当对方使用英雄技能时，对一个随机敌人造成5点伤害。',
        deal: scene => {
            scene.hero.addSecret('毒镖陷阱');
        }
    },
    {
        name: '拉法姆的诅咒',
        cost: 2,
        description: '使你的对手获得一张“诅咒！”牌。在对手的回合开始时，如果它在对手的手牌中，则造成2点伤害。'
    },
    {
        name: '探险帽',
        cost: 2,
        description: '使一个随从获得+1/+1，以及亡语：将一个探险帽置入你的手牌。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.ap += 1;
                role.hp += 1;
                role.current += 1;
            }
        }
    },
    {
        name: '老旧的火把',
        cost: 3,
        description: '造成3点伤害。将一张可造成6点伤害的“炽烈的火把”洗入你的牌库。',
        deal: scene => {

            let role = scene.randRole();

            if (role) {
                role.dealDamage(3);
                scene.hero.pushStack(1);
            }
        }
    },
    {
        name: '极恶之咒',
        cost: 5,
        description: '对所有随从造成3点伤害。将该牌洗入你对手的牌库。',
        deal: scene => {

            let roles = scene.allRole(true);

            for (let role of roles) {
                role.dealDamage(3);
            }

            scene.enemy.supplementCard(1);
        }
    },
    {
        name: '埋葬',
        cost: 6,
        description: '选择一个敌方随从。将该随从洗入你的牌库。',
        deal: scene => {

            let role = scene.randRole(true, true);

            if (role) {
                role.hp = 0;
                scene.hero.pushStack(1);
            }
        }
    },
    {
        name: '鱼人恩典',
        cost: 7,
        description: '使你的随从获得+2/+2。你每控制一个鱼人，该牌的法力值消耗便减少(1)点。',
        deal: scene => {

            let roles = scene.friendlyMinions.filter(a => !a.dead);

            for (let role of roles) {
                role.ap += 2;
                role.hp += 2;
                role.current += 2;
            }
        }
    },
    {
        name: '亡者归来',
        cost: 10,
        description: '召唤七个在本局对战中死亡的鱼人。'
    },
    {
        name: '禁忌畸变',
        cost: 0,
        description: '消耗你所有的法力值，随机召唤一个法力值消耗相同的随从。',
        deal: scene => {

            // 默认召唤一个11的随从
            scene.addMinion({
                name: '小精灵',
                hp: 1,
                ap: 1
            })
        }
    },
    {
        name: '禁忌烈焰',
        cost: 0,
        description: '消耗你所有的法力值，对一个随从造成等同于所消耗法力值数量的伤害。'
    },
    {
        name: '禁忌治疗',
        cost: 0,
        description: '消耗你所有的法力值，恢复等同于所消耗法力值数量两倍的生命值。'
    },
    {
        name: '弃暗投明',
        cost: 2,
        description: '将你的英雄技能和术士职业牌替换成其他职业的。这些牌的法力消耗减少(1)点。'
    },
    {
        name: '亚煞极印记',
        cost: 2,
        description: '使一个随从获得+2/+2。如果该随从是野兽，抽一张牌。',
        deal: scene => {

            let role = scene.randRole(true);

            if (role) {
                role.ap += 2;
                role.hp += 2;
                role.current += 2;
            }
        }
    },
    {
        name: '寄生感染',
        cost: 3,
        description: '使你的所有随从获得“亡语：随机将一张野兽牌置入你的手牌。”'
    },
    {
        name: '暗言术：骇',
        cost: 4,
        description: '消灭所有攻击力小于或等于2的随从。',
        deal: scene => {
            let roles = scene.allRole(true).filter(a => a.ap <= 2);

            for (let role of roles) {
                role.current = 0;
            }
        }
    },
    {
        name: '惩黑除恶',
        cost: 5,
        description: '召唤五个1/1的白银之手新兵。',
        deal: scene => {

            scene.addMinion({
                name: '白银之手新兵',
                ap: 1,
                hp: 1
            });

            scene.addMinion({
                name: '白银之手新兵',
                ap: 1,
                hp: 1
            });

            scene.addMinion({
                name: '白银之手新兵',
                ap: 1,
                hp: 1
            });

            scene.addMinion({
                name: '白银之手新兵',
                ap: 1,
                hp: 1
            });

            scene.addMinion({
                name: '白银之手新兵',
                ap: 1,
                hp: 1
            });

        }
    },
    {
        name: '秘法宝典',
        cost: 5,
        description: '随机将三张法师的法术牌置入你的手牌。',
        deal: scene => {
            scene.hero.supplementCard(3);
        }
    },
    {
        name: '末日降临',
        cost: 10,
        description: '消灭所有随从。每消灭一个随从，便抽一张牌。',
        deal: scene => {

            let roles = scene.allRole(true);

            for (let role of roles) {
                role.current = 0;
            }

            scene.hero.drawCard(roles.length);
        }
    },
    {
        name: '狂乱传染',
        cost: 3,
        description: '造成9点伤害，随机分配到所有角色身上',
        deal: scene => {

            for (let i = 0; i < 9; i++) {
                let role = scene.randRole();
                role.dealDamage(1);
            }
        }
    }
];