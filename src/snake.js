var makeSnakeSprite = function(top, left, timeBetweenSteps) {
  makeSprite.call(this, top, left, timeBetweenSteps);
  this.timeBetweenSteps = 50;
  this.$node.addClass('snake');
  //this.step();
  //this.setPosition(this.top, this.left);
  //this.checkDistance();
  this.previousTop = 0;
  this.previousLeft = 0; 
};

makeSnakeSprite.prototype = Object.create(makeSprite.prototype);
makeSnakeSprite.prototype.constructor = makeSnakeSprite;
makeSnakeSprite.prototype.step = function() {
  makeSprite.prototype.step.call(this);
  this.setPosition(this.top, this.left);
};