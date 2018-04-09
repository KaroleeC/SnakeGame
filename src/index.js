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
        console.log('top, left', window.snake[0].top, window.snake[0].left);
        window.snake.forEach( (item, index) => {
          if ( index > 0 ) {
            item.previousLeft = item.left;
            item.left = window.snake[index - 1].previousLeft;
            item.previousTop = item.top;
            item.top = window.snake[index - 1].previousTop;
          } else {
            item.previousLeft = item.left;
            item.left -= 15;
            item.previousTop = item.top;
          }
        });
        checkDistance();
        checkBody(window.snake[0].top, window.snake[0].left);
        break;
    
      case 38: 
        console.log('top, left', window.snake[0].top, window.snake[0].left);
        window.snake.forEach( (item, index) => {
          if ( index > 0 ) {
            item.previousTop = item.top;
            item.top = window.snake[index - 1].previousTop;
            item.previousLeft = item.left;
            item.left = window.snake[index - 1].previousLeft;
          } else {
            item.previousTop = item.top;
            item.previousLeft = item.left;
            item.top -= 15;
          }
        });
        checkDistance();
        checkBody(window.snake[0].top, window.snake[0].left);
        break;
    
      case 39: 
        console.log('top, left', window.snake[0].top, window.snake[0].left);
        window.snake.forEach( (item, index) => {
          if ( index > 0 ) {
            item.previousLeft = item.left;
            item.left = window.snake[index - 1].previousLeft;
            item.previousTop = item.top;
            item.top = window.snake[index - 1].previousTop;
          } else {
            item.previousTop = item.top;
            item.previousLeft = item.left;
            item.left += 15;
          }
        });
        checkDistance();
        checkBody(window.snake[0].top, window.snake[0].left)
        break;
    
      case 40: 
        console.log('top, left', window.snake[0].top, window.snake[0].left)
        window.snake.forEach( (item, index) => {
          if ( index > 0 ) {
            item.previousTop = item.top;
            item.top = window.snake[index - 1].previousTop;
            item.previousLeft = item.left;
            item.left = window.snake[index - 1].previousLeft;
          } else {
            item.previousLeft = item.left;
            item.previousTop = item.top;
            item.top += 15;
          }
        });
        checkDistance();
        checkBody(window.snake[0].top, window.snake[0].left);
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


const checkDistance = function() {
  for (let i = 0; i < window.fruit.length; i++) {
    let fruit = window.fruit[i];
    var getPositionAtTopLeft = function (element) {
      return {
        x: element.left,
        y: element.top
      };
    };

    var getDistanceBetweenElements = function(a, b) {
      var aPosition = getPositionAtTopLeft(a);
      var bPosition = getPositionAtTopLeft(b);
      
      return Math.sqrt(
        Math.pow(aPosition.x - bPosition.x, 2) + 
        Math.pow(aPosition.y - bPosition.y, 2) 
      );
    };

    var distance = getDistanceBetweenElements(window.snake[0], fruit);
    //check if items path cross
    if (distance < 30) {
      //remove fruit from dom and window.fruit
      $(`#${fruit.$node[0].id}`).remove();
      window.fruit.splice(i, 1);  
      //add tail
      var tail = new makeSnakeTail(
        window.snake[window.snake.length - 1].previousTop,
        window.snake[window.snake.length - 1].previousLeft,
        Math.random() * 1000
      );
      $('.gameBoard').append(tail.$node);
      window.snake.push(tail); 
      score += 1;
      $('.score').text(score);
    } 
  }
};

const checkBody = function(left, top) {
  if (top > $('.gameBoard').width() || top < 0) {
    
    console.log('you hit the wall! top', top);
    console.log($('.gameBoard').width());
    playing = false;
    $('#gameOverModal').css('display', 'block');
  }
  if (left > $('.gameBoard').height() || left < 35) {
    console.log('you hit the wall! Left', left);
    console.log($('.gameBoard').height());
    playing = false;
    $('#gameOverModal').css('display', 'block');
  }
};
