var makeFruit = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.timeBetweenSteps = 300;
  this.$node.addClass('fruit');
};
 
makeFruit.prototype = Object.create(makeDancer.prototype);
makeFruit.prototype.constructor = makeFruit;
makeFruit.prototype.step = function() {
  makeDancer.prototype.step.call(this);
  this.setPosition(this.top, this.left);
};