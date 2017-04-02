const GLOBAL_SPEED_SCALE = 0.5; // allows the game to go in slow motion

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomFloat(min, max) {
  return (Math.random() * (max - min)) + min;
}

function checkCollisionShapes(shape1, shape2) {
  var r1 = shape1.boundingBox();
  var r2 = shape2.boundingBox();

  if ((r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top)) {
    return false;
  }

  var bounds1 = shape1.bounds();
  var bounds2 = shape2.bounds();

  return checkCollisionBounds(bounds1, bounds2)
}

function checkCollisionBounds(bounds1, bounds2) {
  var i;
  for (i = 0; i < bounds1.length; i++) {
    if (checkCollisionPointBounds(bounds1[i], bounds2)) {
      return true;
    }
  }

  for (i = 0; i < bounds2.length; i++) {
    if (checkCollisionPointBounds(bounds2[i], bounds1)) {
      return true;
    }
  }

  return false;
}

function checkCollisionPointBounds(point, bounds) {
  var sum_signs = 0, j = 0, on_edge = false, cross_product, shapeLength = bounds.length;
  for (var i = 0; i < shapeLength; i++) {
    j++;
    if (j == shapeLength) {
      j = 0;
    }
    cross_product = (point.x - bounds[i].x) * (bounds[j].y - bounds[i].y) - (point.y - bounds[i].y) * (bounds[j].x - bounds[i].x);
    if (cross_product == 0) {
      on_edge = true;
    }
    sum_signs += sign(cross_product);
  }

  if (on_edge) {
    return 0;
  }

  return sum_signs == shapeLength || sum_signs == -shapeLength;
}

function sign(x) {
  return x > 0 ? 1 : x < 0 ? -1 : 0;
}
