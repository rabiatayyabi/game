// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 0;
var winningScore = 50;
//var background;

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
    createItem(400, 390, 'mushroom');
    createItem(80, 250, 'pineapple');
    createItem(500, 140, 'pineapple');
    createItem(50, 90, 'sausage');  
    createItem(630, 300, 'sausage');
    
}

// add platforms to the game
function addPlatforms() {
    platforms = game.add.physicsGroup();
    platforms.create(350, 475, 'platform');
    platforms.create(70, 170, 'platform');
    platforms.create(120, 340, 'platform-2'); 
    platforms.create(500, 220, 'platform-2');
    platforms.create(600, 385, 'platform-2');
    platforms.setAll('body.immovable', true);
    
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(600, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  if (item.key === 'mushroom') {
     currentScore = currentScore + 20;
  }
  if (item.key === 'pineapple') {
     currentScore = currentScore - 10;
  }
    if (item.key === 'sausage') {
     currentScore = currentScore + 25;
  }
    if (currentScore === winningScore) {
      createBadge();
    }
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#2D2D2D';
    
    //Load images
    game.load.image('platform-2', 'platform1.png');
    game.load.image('platform', 'pf2.png'); 
    game.load.image('background', 'brickwall.png');  
    
    //Load spritesheets
    game.load.spritesheet('player', 'tomato.png', 105.6, 72);
    game.load.spritesheet('mushroom', 'mushroom.png', 103.8, 56);
    game.load.spritesheet('badge', 'badge.png', 160, 200); 
    game.load.spritesheet('pineapple', 'pineapple.png', 105, 58); 
    game.load.spritesheet('sausage', 'sausage.png', 48, 46);    
  }

  // initial game set up
  function create() {
    background = game.add.tileSprite(0, 0, 800, 600, 'background');
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;
    
    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
      

  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

//$('#right').click(function(){
//  $(this).data('clicked', true);
//}); 
      
    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
 
//   else if ((cursors.right.isDown) || $(".right").click()) {     
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 400;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player winw the game
    if (won === true) {
//      winningMessage.text = "GAME OVER!";
        currentScore = 0;
        game.state.restart (game);
        
    }
////// buttons
//      
//    ///right button 
//$('#right').mouseenter(function(){
//  $(this).data('clicked', true);
//}); 
//      
//      $('#right').mouseleave(function(){
//  $(this).data('notClicked', true);
//}); 
//      
//if(jQuery('#right').data('clicked')) {
//          player.animations.play('walk', 10, true);
//      player.body.velocity.x = 400;
//      player.scale.x = 1;
//} else if(jQuery('#right').data('notClicked')){
//    player.animations.stop();
//    
//}
//  
//      
//      $('#left').mouseenter(function(){
//  $(this).data('clicked', true);
//}); 
//      
//      $('#left').mouseleave(function(){
//  $(this).data('notClicked', true);
//}); 
//      
//if(jQuery('#left').data('clicked')) {
//           player.animations.play('walk', 10, true);
//      player.body.velocity.x = -300;
//      player.scale.x = - 1;
//} else if(jQuery('#left').data('notClicked')){
//    player.animations.stop();
//    
//}
//  
//      
//         
//      $('#jump').mouseenter(function(){
//  $(this).data('clicked', true);
//}); 
//      
//      $('#jump').mouseleave(function(){
//  $(this).data('notClicked', true);
//}); 
//      
//if(jQuery('#jump').data('clicked')) {
//      player.body.velocity.y = -400;
//} else if(jQuery('#jump').data('notClicked')){
//    player.animations.stop();
//    
//}   
//      
//      
  }

  function render() {

  }

};
