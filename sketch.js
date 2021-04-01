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

function draw() {
    doDrawWork();
}

function doDrawWork() {
    fill("red");
    textStyle(BOLD);
    background("lightgreen");
    logConsoles();
    monkeyHand.x = monkey.x + 10;
    monkeyHand.y = monkey.y - 5;
    monkey.collide(ground);
    camera.position.x += monkey.velocityX;
    camera.position.y = 300;
    ground.x = camera.position.x;
    // ground2.x = camera.position.x + 400;
    logCameraBla();
    if (camera.position.x % 772 === 0) {
        forest.x = (camera.position.x + ((forest2.x + (forest2.width / 2)) - 10)) - 200;
    }
    if (camera.position.x % 1792 === 0) {
        forest2.x = (camera.position.x + ((forest.x + (forest.width / 2)) - 10)) - 1200;
    }

    // forest.x = camera.position.x;

    // if (camera.position.x % 635 === 589 && camera.position.x !== 0) {
    //     var forest_other = createSprite(camera.x, 300);
    //     forest_other.addImage("forest", forestImage);
    //     forest_other.width = 800;
    //     forest_other.height = 600;
    //     forest_other.depth = -100;
    //     console.log("camera.position.x % 635 = 0");
    // }

    // forest.width = camera.position.x;
    // forestImage.width = forest.width;

    drawSprites();
    controlGameWithGameStates();
    text("Mouse X: " + mouseX, (camera.position.x - (canvas.width / 2)) + 400, 250);
    text("Mouse Y: " + mouseY, (camera.position.x - (canvas.width / 2)) + 400, 350);
}

function logCameraBla() {
    if (camera.position.x % 772 === 0) {
        console.log(true, 772);
    }
    if (camera.position.x % 1792 === 0) {
        console.log(true, 1792);
    }
}

function logConsoles() {
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

function controlGameWithGameStates() {
    if (score < 0) {
        gameState = END;
    }

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
    if (gameState != "notStarted") {
        textSize(23);
        text("Survival Time: " + time, camera.position.x + 300, 50);
        text("Score: " + score, camera.position.x + 300, 120);
        text("Times you can touch the stones: " + timesCanStoneTouch, camera.position.x + 190, 85);
        // text("MouseX: " + mouseX, 250, 170);
        // text("MouseY:  " + mouseY, 250, 230);
    }
    if (gameState === PLAY[0]) {
        time += Math.round((World.frameRate / 30));
        monkey.visible = true;
        monkeyHand.visible = true;
        singlePlayerButton.visible = false;
        automatedPlayingButton.visible = false;

        setPropertiesOfObjects();
        spawnStones();
        spawnBananas();

        // forest.setVelocity(-1 * ((1 + time / 70)), 0);

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
                // switch (score) {
                //     case 10: monkey.scale = 0.14;
                //         break;
                //     case 20: monkey.scale = 0.145;
                //         break;
                //     case 30: monkey.scale = 0.15;
                //         break;
                //     case 40: monkey.scale = 0.155;
                //         break;
                //     default: break;
                // }
                if (monkey.scale < 1.6 && score % 10 === 0) {
                    monkey.scale *= 1.05;
                }
            }
        }
    }
    if (gameState === PLAY[1]) {
        monkey.visible = true;
        monkeyHand.visible = true;
        singlePlayerButton.visible = false;
        automatedPlayingButton.visible = false;
        // forest.setVelocity(-1 * ((3 + 2 * time / 50)), 0);

        setPropertiesOfObjects();
        spawnStones();
        spawnBananas();

        // time += Math.round((World.frameRate / 30));

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
                // switch (score) {
                //     case 10: monkey.scale = 0.14;
                //         break;
                //     case 20: monkey.scale = 0.145;
                //         break;
                //     case 30: monkey.scale = 0.15;
                //         break;
                //     case 40: monkey.scale = 0.155;
                //         break;
                //     default: break;
                // }
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

        if (monkey.y < 435/* || forest.velocityX === 0*/) {
            monkey.changeAnimation("monkey-jumping", monkeyJumpingImage);
            monkeyHand.visible = true;
            monkeyHand.rotationSpeed = 16;
        }
        else {
            monkey.changeAnimation("monkey", monkeyImage);
            monkeyHand.visible = false;
        }
    }
    if (gameState === END) {
        monkey.changeAnimation("monkey-jumping", monkeyJumpingImage);
        monkey.rotation = -120;
        monkey.x = 100;
        monkey.y = 500;
        // monkey.y += 0.4;
        monkeyHand.x = monkey.x;
        monkeyHand.visible = true;
        monkeyHand.rotationSpeed = 0;
        monkey.velocityX = 0;
        bananas.destroyEach();
        stones.destroyEach();
        stones.setVelocityXEach(-14);
        bananas.setVelocityXEach(-8);
        text("Game Over! Don't you want to play again?" +
            "                                  :D", camera.position.x + 15, 195, camera.position.x + 385);
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

    if (stones.length > 0) {
        stones.get(0).velocityX = velocityX;
    }

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

function spawnBananas() {
    // if (World.frameCount % 110 === 0) {
    if (World.frameCount % 200 === 0) {
    // if (camera.position.x % 175 === 0) {
        // bananas.destroyEach();
        // bananas.clear();
        var bananaY = random(220, 350);
        var banana = createSprite(camera.position.x + 850, bananaY);
        banana.addImage("banana", bananaImage);
        console.log("Banana spawn");
        banana.scale = 0.05;
        bananas.add(banana);
        banana.velocityY += 0.5;
        monkeyAutomatedColliderMonkeyXAddNumber = random(50, 80);
        // if (bananaSpawnTime > 120) { bananaSpawnTime -= 10; }
    }
}
function spawnStones() {
    // if (World.frameCount % 180 === 0) {
    if (World.frameCount % 240 === 0) {
    // if (camera.position.x % 350 === 0) {
        // stones.destroyEach();
        // stones.clear();
        var stone = createSprite(camera.position.x + 900, 400, 3, 3);
        stone.addImage("stone", stoneImage);
        // stone.scale = 0.1;
        stone.setCollider("circle", 0, 0, 105);
        console.log("Stone spawn");
        stone.rotationSpeed = -1 * monkey.velocityX * 5 / 2;
        stone.velocityY += 10;
        stones.add(stone);
        monkeyAutomatedColliderMonkeyXAddNumber = random(50, 80);
        // if (stoneSpawnTime > 170) { stoneSpawnTime -= 10; }
    }
}