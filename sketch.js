// Global variable declaration
var ground, monkeyHand, reset,
    monkey, monkeyAutomatedCollider, gameState,
    monkeyAutomatedColliderMonkeyXAddNumber,
    waitageTime, score, time, PLAY, END, stones, bananas,
    singlePlayerButton, automatedPlayingButton,
    forest, forest2, timesCanStoneTouch;

var groundImage, monkeyHandImage,
    resetImage, monkeyImage,
    singlePlayerButtonImage, automatedPlayerButtonImage,
    bananaImage, stoneImage, monkeyJumpingImage,
    forestImage, canvas;

var forestImgCounter = 1;
var forest2ImgCounter = 2;

var buffer = 50;

// Preload images
function preload() {
    groundImage = loadImage("ground.png");
    monkeyHandImage = loadImage("monkey_jump_hand.png");
    resetImage = loadImage("reset.png");
    monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
    singlePlayerButtonImage = loadImage("single_player.png");
    automatedPlayerButtonImage = loadImage("automated_gaming_mode.png");
    bananaImage = loadImage("banana.png");
    stoneImage = loadImage("stone.png");
    monkeyJumpingImage = loadImage("monkey-jumping_image.png");
    forestImage = loadImage("jungle.jpg");
}

// Initial setup for the game
function setup() {
    canvas = createCanvas(800, 600);

    ground = createSprite(400, 0, 1600, 50);
    ground.y = (600 - (ground.height / 2));
    ground.visible = false;

    timesCanStoneTouch = 2;

    forest = createSprite(0, 300);
    forest.addImage("forest", forestImage);
    forestImage.width = 1000;
    forest.width = 1000;
    forest.height = 600;
    forest.depth = -100;

    forest2 = createSprite(1000, 300);
    forest2.addImage("forest", forestImage);
    forest2.width = 1000;
    forest2.height = 600;
    forest2.depth = -100;

    monkeyHand = createSprite();
    monkeyHand.addImage("monkey_hand", monkeyHandImage);
    monkeyHand.scale = 0.1;
    monkeyHand.rotation = 180;

    reset = createSprite(200, 275);
    reset.visible = false;

    monkey = createSprite(100, 180);
    monkey.addAnimation("monkey", monkeyImage);
    monkey.scale = 0.14;
    monkey.addImage("monkey-jumping", monkeyJumpingImage);

    monkeyAutomatedCollider = createSprite(0, 0, 65, 800);
    monkeyAutomatedCollider.visible = false;
    monkeyAutomatedColliderMonkeyXAddNumber = 20;

    score = 0;
    time = 0;
    PLAY = ["Solo", "Automated"];
    END = 0;
    gameState = "notStarted";

    stones = createGroup();
    bananas = createGroup();

    singlePlayerButton = createSprite(310, 220);
    singlePlayerButton.addImage("single_player", singlePlayerButtonImage);
    singlePlayerButton.scale = 2;

    automatedPlayingButton = createSprite(490, 220);
    automatedPlayingButton.addImage("automated_gaming_mode", automatedPlayerButtonImage);
    automatedPlayingButton.scale = 2;

    forestImgCounter = 1;
    forestImg2Counter = 2;
    buffer = 50;
}

// Continuous processing for continuous gaming
function draw() {
    fill("red");
    textStyle(BOLD);
    background("lightgreen");
    monkeyHand.x = monkey.x + 10;
    monkeyHand.y = monkey.y - 5;
    monkey.collide(ground);
    camera.position.x += monkey.velocityX;
    camera.position.y = 300;
    ground.x = camera.position.x;
    
    // Forest continuous replacement for continuous forest display
    if (camera.position.x > forestImgCounter * forest.width - buffer) {
        forest.x = (forestImgCounter + 1) * forest.width;
        forestImgCounter += 2;
    }
    if (camera.position.x > forest2ImgCounter * forest.width - buffer) {
        forest2.x = (forest2ImgCounter + 1) * forest.width;
        forest2ImgCounter += 2;
    }
    
    // Show objects
    drawSprites();
    controlGameWithGameStates();
    eraseUselessObjects();
}

// Erasing useless objects for better memory and avoiding memory leakage
function eraseUselessObjects() {
    if (stones.length > 0) {
        stones.setScaleEach((monkey.scale / 3) * 3.2);
        if (stones.get(0).x < -30) {
            stones.destroyEach();
        }
    }
    if (bananas.length > 0) {
        bananas.setScaleEach((monkey.scale / 3) * 1.6);
        if (bananas.get(0).x < -30) {
            bananas.destroyEach();
        }
    }
}

// Control the game with the states that affect the gaming
function controlGameWithGameStates() {
    // When the points are less then 0, end the game
    if (score < 0) {
        gameState = END;
    }

    // When the game is not started
    if (gameState === "notStarted") {
        waitageTime += 1;
        ground.velocityX = 0;
        textSize(20);
        text('Press these buttons to start playing, control the monkey with'
            + ' the arrow keys and spacebar if you are not in '
            + 'automated gaimng mode.'
            + ' Else, if you are, enjoy watching!'
            + ' Press F5 Function key to reset the game.', 5, 290, 795);
        textSize(18);
        text("Play with", 260, 195, 380, 235);
        text("Controlling", 260, 220, 380, 235);
        textSize(14);
        text("Enter Automated ", 432.5, 205);
        text("Gaming mode", 432.5, 230);
        monkey.visible = false;
        timesCanStoneTouch = 2;
        monkeyHand.visible = false;
        singlePlayerButton.visible = true;
        automatedPlayingButton.visible = true;
        reset.visible = false;
        score = 0;
        time = 0;
        if (mousePressedOver(singlePlayerButton)) {
            gameState = PLAY[0];
        }

        if (mousePressedOver(automatedPlayingButton)) {
            gameState = PLAY[1];
        }
    }

    // When the game is not notStarted and is either of the playing modes or the end modes
    if (gameState != "notStarted") {
        textSize(23);
        text("Survival Time: " + time, (camera.position.x - (canvas.width / 2)) + 300, 50);
        text("Score: " + score, (camera.position.x - (canvas.width / 2)) + 300, 120);
        text("Times you can touch the stones: " + timesCanStoneTouch, (camera.position.x - (canvas.width / 2)) + 190, 85);
    }

    // When the user wantes to play the game manually
    if (gameState === PLAY[0]) {
        time += Math.round((World.frameRate / 30));
        monkey.visible = true;
        monkeyHand.visible = true;
        singlePlayerButton.visible = false;
        automatedPlayingButton.visible = false;

        setPropertiesOfObjects();
        spawnStones();
        spawnBananas();

        if (keyDown("space") || keyDown("up")) {
            if (monkey.y > 480) {
                monkey.velocityY = -18.5;
            }
        }
        else {
            monkey.changeAnimation("monkey", monkeyImage);
        }

        if (stones.length > 0) {
            if (monkey.isTouching(stones)) {
                stones.get(0).x = 30;
                timesCanStoneTouch -= 1;
                monkey.scale = 0.14;
                score -= 20;
            }
        }

        if (monkey.y < 435) {
            monkey.changeAnimation("monkey-jumping", monkeyJumpingImage);
            monkeyHand.visible = true;
            monkeyHand.rotationSpeed = 16;
        }
        else {
            monkey.changeAnimation("monkey", monkeyImage);
            monkeyHand.visible = false;
        }


        if (keyWentDown("space") || keyWentDown("up")) {
            monkeyHand.pointTo(190, 390);
        }


        if (bananas.length > 0) {
            if (monkey.isTouching(bananas) || monkeyHand.isTouching(bananas)) {
                bananas.destroyEach();
                score += 2;
                if (monkey.scale < 1.6 && score % 10 === 0) {
                    monkey.scale *= 1.05;
                }
            }
        }
    }

    // When the user wants to play the game by seeing how the computer plays
    if (gameState === PLAY[1]) {
        time += Math.round((World.frameRate / 30));
        monkey.visible = true;
        monkeyHand.visible = true;
        singlePlayerButton.visible = false;
        automatedPlayingButton.visible = false;

        setPropertiesOfObjects();
        spawnStones();
        spawnBananas();

        if (monkey.y < 480) {
            monkey.changeAnimation("monkey", monkeyImage);
        }

        if (stones.length > 0) {
            if (monkey.isTouching(stones)) {
                stones.get(0).x = 30;
                timesCanStoneTouch -= 1;
                monkey.scale = 0.14;
                score -= 20;
            }
        }

        if (bananas.length > 0) {
            if (monkey.isTouching(bananas) || monkeyHand.isTouching(bananas)) {
                bananas.destroyEach();
                score += 2;
                if (monkey.scale < 1.6 && score % 10 === 0) {
                    monkey.scale *= 1.05;
                }
            }
        }

        if (stones.length > 0 && monkeyAutomatedCollider.isTouching(stones) && monkey.y > 435) {
            monkey.velocityY = -18.5;
        }

        for (var i in bananas) {
            if (bananas.length > 0 && monkeyAutomatedCollider.isTouching(bananas) && monkey.y > 435) {
                monkey.velocityY = -18.5;
            }
        }

        if (monkey.y < 435) {
            monkey.changeAnimation("monkey-jumping", monkeyJumpingImage);
            monkeyHand.visible = true;
            monkeyHand.rotationSpeed = 16;
        }
        else {
            monkey.changeAnimation("monkey", monkeyImage);
            monkeyHand.visible = false;
        }
    }

    // When the game has ended and the player has lost
    if (gameState === END) {
        monkey.changeAnimation("monkey-jumping", monkeyJumpingImage);
        monkey.rotation = -120;
        monkey.x = 100;
        monkey.y = 500;
        monkeyHand.x = monkey.x;
        monkeyHand.visible = true;
        monkeyHand.rotationSpeed = 0;
        monkey.velocityX = 0;
        bananas.destroyEach();
        stones.destroyEach();
        stones.setVelocityXEach(-14);
        bananas.setVelocityXEach(-8);
        text("Game Over! Don't you want to play again?" +
            "                                  :D", (camera.position.x - (canvas.width / 2)) + 15, 195, camera.position.x + 385);
        reset.visible = true;
        reset.addImage("reset", resetImage);

        if (mousePressedOver(reset)) {
            gameState = "notStarted";
            timesCanStoneTouch = 2;
            score = 0;
            monkey.rotation = 0;
        }
    }
}

// Continuous properties of the game to be set for the game to run efficiently
function setPropertiesOfObjects() {
    monkeyHand.setCollider("rectangle", 0, 0, 20, 25, monkeyHand.rotation);
    monkey.collide(ground);
    monkeyHand.x = monkey.x + 10;
    monkeyHand.y = monkey.y - 5;
    monkeyAutomatedCollider.x = monkey.x
        + monkeyAutomatedColliderMonkeyXAddNumber;
    monkeyAutomatedCollider.y = monkey.y;


    if (monkey.velocityX <= 0 && monkey.velocityX > -23) {
        monkey.velocityX = ((3 + 2 * time / 50));
    }

    stones.collide(ground);
    bananas.collide(ground);

    monkey.velocityY += 0.8;

    var velocityX = -1 * (monkey.velocityX * 5) / 3;
    if (bananas.length > 0) {
        bananas.get(0).velocityX = velocityX;
    }
    if (timesCanStoneTouch <= 0) {
        gameState = END;
    }

    stones.collide(ground);
    bananas.collide(ground);

    monkeyHand.scale = monkey.scale;
}

// Spawn the bananas according to the position of camera
function spawnBananas() {
    if (World.frameCount % 200 === 0) {
        var bananaY = random(220, 350);
        var banana = createSprite(camera.position.x + 850, bananaY);
        banana.addImage("banana", bananaImage);
        banana.scale = 0.05;
        bananas.add(banana);
        banana.velocityY += 0.5;
    }
}

// Spawn the stones according to the position of camera
function spawnStones() {
    if (World.frameCount % 240 === 0) {
        var stone = createSprite((camera.position.x - (canvas.width / 2)) + 900, 400, 3, 3);
        stone.addImage("stone", stoneImage);
        stone.setCollider("circle", 0, 0, 105);
        stone.velocityY += 10;
        stones.add(stone);
    }
}