var makeSprite = function(top, left, timeBetweenSteps) {
  this.$node = $('<span class="sprite"></span>');
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  this.step();
  this.setPosition(this.top, this.left);
};
makeSprite.prototype.step = function() {
  setTimeout(this.step.bind(this), this.timeBetweenSteps);
};

makeSprite.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};