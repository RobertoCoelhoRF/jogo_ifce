//Cria e exibe os elementos visuais
function createassets(scene){
    scene.add.image( 500, 210,"fundo")
//plataforma
    //scene.add.image( 500, 479,"plataforma")
    plataforma = scene.physics.add.staticGroup();
    plataforma.create(500, 479, "plataforma");
    //player
    //scene.add.image( 500, 250,"player")
    player = scene.physics.add.sprite(500, 250, "player");
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);
    criarAnimations(scene);
    player.anims.play("parado", true);
    
    //star: coletável
    var pos = Phaser.Math.FloatBetween(100, 900);
    star = scene.physics.add.sprite(pos, 0, "star");
    star.setBounce(0.2);

     //bomb
     bombs = scene.physics.add.group();
    

    //Colliders
    scene.physics.add.collider(player, plataforma);
    scene.physics.add.collider(star, plataforma);
    scene.physics.add.overlap(star, player, coletarStar);
    scene.physics.add.collider(bombs, plataforma);
    scene.physics.add.collider(bombs, player, gameover);

    /* Entradas do teclado*/ 
    teclado = scene.input.keyboard.createCursorKeys();

    //HUD
    var configTxt = {
        fontSize: "25px",
        fontFamily: 'Arial Black',
    };
    pontosTxt = scene.add.text( 20, 20, "Pontos: 0", configTxt);
}

function coletarStar(star, player){
    let pos = Phaser.Math.FloatBetween(100, 900);
    star.setX(pos);
    star.setY(0);
    star.setVelocityY(0);

    pontos++;
    pontosTxt.setText("Pontos: " + pontos);

    let bomb = bombs.create(pos, 0, "bombs");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(50);
}

function gameover(player, bombs){
    player.setVisible(false);
    isGameOver = true;
    var configTxt = {
        fontSize: "45px",
        fontFamily: "Arial Black",
    };
    player.scene.add.text(350, 250, "Game Over", configTxt);
    
}


function criarAnimations(scene) {
var parado = {
    key: "parado",
    frames: [{ key: "player", frame: 4 }],
};
    scene.anims.create(parado);

    var left = {
        key: "left",
        frames: scene.anims.generateFrameNumbers("player", {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1,
    };
        scene.anims.create(left);
    
        var right = {
            key: "right",
            frames: scene.anims.generateFrameNumbers("player", {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1,
        };
            scene.anims.create(right);
}