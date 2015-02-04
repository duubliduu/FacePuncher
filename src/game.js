var game = new Phaser.Game(
    640,
    360,
    Phaser.AUTO,
    '',
    {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
);

var Boxer,
    Target,
    interval,
    sprites = [
        'FighterALeftHead',
        'FighterARightHead',
        'FighterALeftBody',
        'FighterARightBody'
    ],
    recoveryTime = 500,
    ready = true;

function getRandomSprite(){
    var i = Math.floor(Math.random() * sprites.length);
    return sprites[i];
}

function jab(){

    if (ready === false) {
        return;
    }

    var randomSprite = getRandomSprite();

    Boxer.kill();
    Boxer = game.add.sprite(Boxer.x,Boxer.y, randomSprite);

    game.add.audio('Swing').play();

    if (randomSprite == "FighterALeftBody" || randomSprite == "FighterARightBody") {
        game.add.audio('BodyHit').play();
    } else {
        game.add.audio('HeadHit').play();
    }

    Target.kill();
    Target = game.add.sprite(Target.x,Target.y,'FighterBHurt');

    ready = false;

    interval = setInterval(
        function(){
            Boxer.kill();
            Boxer = game.add.sprite(Boxer.x, Boxer.y, 'FighterAIdle');

            Target.kill();
            Target = game.add.sprite(Target.x,Target.y,'FighterBIdle');

            ready = true;
            clearInterval(interval);

        }, recoveryTime
    )
}


function preload(){
    game.load.image('FighterAIdle', 'Assets/Fighter-A_0000s_0000_Idle.png');
    game.load.image('FighterALeftHead', 'Assets/Fighter-A_0000s_0002_Left-Head.png');
    game.load.image('FighterALeftBody', 'Assets/Fighter-A_0000s_0001_Left-Body.png');
    game.load.image('FighterARightBody', 'Assets/Fighter-A_0000s_0003_Right-Body.png');
    game.load.image('FighterARightHead', 'Assets/Fighter-A_0000s_0004_Right-Head.png');
    game.load.image('FighterBHurt', 'Assets/Fighter-B_0000s_0000_Hurt-light-head.png');
    game.load.image('FighterBIdle', 'Assets/Fighter-B_0000s_0001_Idle.png');
    game.load.audio('HeadHit', 'Assets/971_1245804720.mp3');
    game.load.audio('Swing', 'Assets/2211_1288804326.mp3');
    game.load.audio('BodyHit', 'Assets/4889_1333037688.mp3');
}

function create(){

    Boxer = game.add.sprite(0, 0, 'FighterAIdle');
    Target = game.add.sprite(0, 0, 'FighterBIdle');

    Boxer.x = game.width / 2 - Boxer.width + 100;
    Boxer.y = game.height / 2 - Boxer.height / 2;

    Target.x = game.width / 2;
    Target.y = game.height / 2 - Target.height / 2;

    this.game.stage.backgroundColor = '#fff';

    game.input.onTap.add(jab, this);
}


function update(){
}

function render(){

}
