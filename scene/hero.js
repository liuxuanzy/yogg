#! /usr/bin/env node

// 抽牌解析

'use strict';

const fs = require('fs');
const minimist = require('minimist');
const Scene = require('../src/Scene');

const args = minimist(process.argv.slice(2), {
    alias: {
        // 要执行的场景
        scene: 's',

        // 最多要执行的法术数量
        num: 'n',

        // 执行多少次
        times: 't'
    }
});

let scene = null;

try {
    scene = require(`./${args.scene}.json`);
}
catch (e) {
    console.log('您选择的场景不存在！');
    process.exit(0);
}

let result = [];

for (let i = 1; i <= args.num; i++) {

    let info = {
        num: i,
        hero: 0,
        enemy: 0
    };

    for (let j = 0; j < args.times; j++) {

        let s = new Scene(scene);
        let magic = s.createMagic(i);
        magic.deal();

        let ifo = s.info();
        let hero = ifo.hero;
        let enemy = ifo.enemy;

        info.hero += 2001 - hero.armor - hero.hp;
        info.enemy += 2001 - enemy.armor - enemy.hp;
    }

    result.push(info);
}

for (let item of result) {
    console.log(item.num + `\t\t${item.selfA}\t\t${item.selfH}\t\t${item.hero}\t\t${item.enemy}`);
}