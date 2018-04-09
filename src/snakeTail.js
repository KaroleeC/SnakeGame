var makeSnakeTail = function(top, left, timeBetweenSteps) {
  makeSnakeSprite.call(this, top, left, timeBetweenSteps);
  this.timeBetweenSteps = 50;
  this.$node.addClass('tail');
  //this.top = window.red[window.red.length - 1].previousTop;
  //this.left = window.red[window.red.length - 1].previousLeft;
  this.previousTop = 0;
  this.previousLeft = 0; 
};

makeSnakeTail.prototype = Object.create(makeSnakeSprite.prototype);
makeSnakeTail.prototype.constructor = makeSnakeTail;
makeSnakeTail.prototype.step = function() {
  makeSnakeSprite.prototype.step.call(this);
  this.setPosition(this.top, this.left);
};
