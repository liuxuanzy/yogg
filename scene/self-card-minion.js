'use strict';

const fs = require('fs');
const Scene = require('../src/Scene');

let guid = 1;

function createMinion() {

    return {
        name: 'Minion' + guid++,
        hp: Math.floor(Math.random() * 8) + 1,
        ap: Math.floor(Math.random() * 8)
    }
}

function createSence(a, b) {

    let friendlyMinions = [];

    for (let i = 0; i < a; i++) {
        friendlyMinions.push(createMinion());
    }

    let enemyMinions = [];

    for (let i = 0; i < b; i++) {
        enemyMinions.push(createMinion());
    }

    return {
        hero: {
            hp: 30,
            armor: 2000,
            name: '我方英雄'
        },
        enemy: {
            hp: 20,
            armor: 2000,
            name: '敌方英雄'
        },
        friendlyMinions: friendlyMinions,
        enemyMinions: enemyMinions
    }
}

for (let a = 1; a <= 7; a++) {

    let result = [];

    for (let b = 0; b <= 7; b++) {

        let scene = createSence(a - 1, b);

        let info = {
            self: 0,
            other: 0
        };

        for (let j = 0; j < 10000; j++) {

            let s = new Scene(scene);
            let magic = s.createMagic(10);
            magic.deal();
            let hero = s.info().hero;

            info.self += hero.selfCards;
            info.other += hero.otherCards;
        }

        result.push((info.self - 11000) + '/' + (info.other - 5000));
    }

    console.log(result.join('\t\t'));
}
