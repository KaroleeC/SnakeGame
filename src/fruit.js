var makeFruit = function(top, left, timeBetweenSteps) {
  makeSprite.call(this, top, left, timeBetweenSteps);
  this.timeBetweenSteps = 300;
  this.$node.addClass('fruit');
};
 
makeFruit.prototype = Object.create(makeSprite.prototype);
makeFruit.prototype.constructor = makeFruit;
makeFruit.prototype.step = function() {
  makeSprite.prototype.step.call(this);
  this.setPosition(this.top, this.left);
};