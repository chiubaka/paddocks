// References:
// * http://www.mathopenref.com/polygonirregulararea.html
// * http://www.mathopenref.com/coordtrianglearea.html

function areaOfTriangle(p1, p2, p3) {
  return Math.abs((p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y))/2);
}

