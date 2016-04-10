#! /usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const Scene = require('../src/Scene');

const args = minimist(process.argv.slice(2), {
    alias: {
        // 要执行的场景
        scene: 's',
        //帮助
        help: 'h',

        // 要执行的法术数量
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

let info = [];

for (let i = 0; i < args.times; i++) {

    let s = new Scene(scene);
    let magic = s.createMagic(args.num);
    magic.deal();

    info.push({
        // 生成的法术列表
        magic: magic.list.map(a => a.name),
        // 执行后的场景
        scene: s.info()
    });
}

fs.writeFileSync(
    path.resolve(__dirname, `../log/${args.scene}_${args.num}_${Date.now()}.json`),
    JSON.stringify(info, null, 4),
    'utf8'
);
