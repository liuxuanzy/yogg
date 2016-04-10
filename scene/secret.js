#! /usr/bin/env node

// 奥秘解析

'use strict';

const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const Scene = require('../src/Scene');
const MAGIC_LIST_CONFIG = require('../src/config');

const MAGIC_NAME_MAP = {};

MAGIC_LIST_CONFIG.forEach(a => MAGIC_NAME_MAP[a.name] = a);

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
        count: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        },
        cost: {
            1: 0,
            2: 0,
            3: 0
        }
    };

    for (let j = 0; j < args.times; j++) {

        let s = new Scene(scene);
        let magic = s.createMagic(i);
        magic.deal();

        let secret = s.info().hero.secret;

        info.count[secret.length]++;

        for (let item of secret) {

            let cost = MAGIC_NAME_MAP[item].cost;

            info.cost[cost]++;
        }
    }

    result.push(info);
}

for (let item of result) {
    console.log(item.num
        + `\t\t${item.count[0]}\t\t${item.count[1]}\t\t${item.count[2]}\t\t${item.count[3]}\t\t${item.count[4]}\t\t${item.count[5]}`
        + `\t\t${item.cost[1]}\t\t${item.cost[2]}\t\t${item.cost[3]}`)
}