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

function setup() {
    canvas = createCanvas(800, 600);

    ground = createSprite(400, 0);
    // ground.addImage(groundImage);
    // groundImage.width = 1600;
    // groundImage.height = 150;
    ground.width = 1600;
    ground.height = 50;
    ground.y = (600 - (ground.height / 2));
    ground.visible = false;

    // ground2 = createSprite(1200, 0);
    // ground2.addImage(groundImage);
    // groundImage.width = 800;
    // groundImage.height = 150;
    // ground2.width = 800;
    // ground2.height = 150;
    // ground2.y = (600 - (ground.height / 2)) + 50;

    timesCanStoneTouch = 2;

    // forestImage.width = 800;
    // forestImage.scale = 0.5;

    forest = createSprite(0, 300);
    forest.addImage("forest", forestImage);
    forest.width = 800;
    forest.height = 600;
    forest.depth = -100;

    forest2 = createSprite(800, 300);
    forest2.addImage("forest", forestImage);
    forest2.width = 800;
    forest2.height = 600;
    forest2.depth = -100;
    // forestImage.height = 400;
    // forestImage.y = forest.y - 50;

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
    // monkeyAutomatedCollider.visible = false;

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
}