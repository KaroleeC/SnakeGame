var score = 0;
var playing = false;

$(document).ready(function() {
  window.fruit = [];
  window.snake = [];
  console.log($('.gameBoard').height(), $('.gameBoard').width());
  $('.addSpriteButton').on('click', function(event) {
    var spriteMakerFunctionName = $(this).data('sprite-maker-function-name');
    // get the maker function for the kind of sprite we're supposed to make
    var spriteMakerFunction = window[spriteMakerFunctionName];
    // make a sprite with a random position
    var sprite = new spriteMakerFunction(
      $('.gameBoard').height() * Math.random(),
      $('.gameBoard').width() * Math.random(),
      Math.random() * 1000
    );
    $('.gameBoard').append(sprite.$node);
    if (sprite instanceof makeSnakeSprite) {
      window.snake.push(sprite);
    } else {
      sprite.$node.attr('id', window.fruit.length);
      window.fruit.push(sprite);  
    } 
  });
  
  $('.startGameButton').on('click', function() {
    startGame();
    playing = true;
    console.log(playing);
  });

  //listener for key press 
  $('body').keydown((e) => {
    e.preventDefault();
    if (playing) {
      switch (e.keyCode) {

      case 37: 
        console.log('top, left', window.red[0].top, window.red[0].left);
        window.red.forEach( (item, index) => {
          if ( index > 0 ) {
            item.previousLeft = item.left;
            item.left = window.red[index - 1].previousLeft;
            item.previousTop = item.top;
            item.top = window.red[index - 1].previousTop;
          } else {
            item.previousLeft = item.left;
            item.left -= 15;
            item.previousTop = item.top;
          }
        });
        checkDistance();
        checkBody(window.red[0].top, window.red[0].left);
        break;
    
      case 38: 
        console.log('top, left', window.red[0].top, window.red[0].left);
        window.red.forEach( (item, index) => {
          if ( index > 0 ) {
            item.previousTop = item.top;
            item.top = window.red[index - 1].previousTop;
            item.previousLeft = item.left;
            item.left = window.red[index - 1].previousLeft;
          } else {
            item.previousTop = item.top;
            item.previousLeft = item.left;
            item.top -= 15;
          }
        });
        checkDistance();
        checkBody(window.red[0].top, window.red[0].left);
        break;
    
      case 39: 
        console.log('top, left', window.red[0].top, window.red[0].left);
        window.red.forEach( (item, index) => {
          if ( index > 0 ) {
            item.previousLeft = item.left;
            item.left = window.red[index - 1].previousLeft;
            item.previousTop = item.top;
            item.top = window.red[index - 1].previousTop;
          } else {
            item.previousTop = item.top;
            item.previousLeft = item.left;
            item.left += 15;
          }
        });
        checkDistance();
        checkBody(window.red[0].top, window.red[0].left)
        break;
    
      case 40: 
        console.log('top, left', window.red[0].top, window.red[0].left)
        window.red.forEach( (item, index) => {
          if ( index > 0 ) {
            item.previousTop = item.top;
            item.top = window.red[index - 1].previousTop;
            item.previousLeft = item.left;
            item.left = window.red[index - 1].previousLeft;
          } else {
            item.previousLeft = item.left;
            item.previousTop = item.top;
            item.top += 15;
          }
        });
        checkDistance();
        checkBody(window.red[0].top, window.red[0].left);
        break;
      } 
    } else {
      console.log('Your game ended. Start a new Game');
    }

  });

});


const startGame = function() {
  //delete all previous game aspects
  $('#gameOverModal').css('display', 'none');
  $('.gameBoard').empty();
  window.fruit.splice(0);
  window.snake.splice(0);
  score = 0;
  
  $('.score').text(score);
  //spawn 10 fruit instances
  for (let i = 0; i < 10; i++ ) {
    var fruit = new makeFruit(
      $('.gameBoard').height() * Math.random(),
      $('.gameBoard').width() * Math.random(),
      Math.random() * 1000
    );
    $('.gameBoard').append(fruit.$node);
    fruit.$node.attr('id', window.fruit.length);
    window.fruit.push(fruit);  
  }
  //spawn 1 snake
  var snake = new makeSnakeSprite(
    $('.gameBoard').height() / 2,
    $('.gameBoard').width() / 2,
    50
  );
  $('.gameBoard').append(snake.$node);
  window.snake.push(snake);  
};