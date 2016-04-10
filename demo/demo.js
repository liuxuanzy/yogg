#! /usr/bin/env node

'use strict';

const Scene = require('../src/Scene');

let scene = new Scene({
    hero: {
        hp: 30,
        armor: 40,
        name: '我方英雄'
    },
    enemy: {
        hp: 20,
        name: '敌方英雄'
    },
    friendlyMinions: [
        {
            hp: 6,
            ap: 5,
            name: '格斗士'
        }
    ],
    enemyMinions: [
        {
            hp: 4,
            ap: 5,
            name: '囚徒'
        },
        {
            hp: 4,
            ap: 0,
            name: '游学者、秋日'
        },
        {
            hp: 6,
            ap: 6,
            name: '弗丁',
            shield: true
        },
        {
            hp: 7,
            ap: 6,
            name: '毕游侠'
        }
    ]
});

var magic = scene.createMagic(29);
console.log('生成的法术为：' + magic.list.map(a => a.name));

console.log('\n执行前场景：');
console.log(scene.print());

magic.deal();

console.log('\n执行后场景：');
console.log(scene.print());

