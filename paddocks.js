// References:
// * http://www.mathopenref.com/polygonirregulararea.html
// * http://www.mathopenref.com/coordtrianglearea.html
// * http://www.mathopenref.com/coordpolygonarea.html

function areaOfPolygon(points) {
  var numPoints = points.length;
  var area = 0;
  for (var i = 0; i < numPoints; i++) {
    p1 = points[i];
    p2 = points[0];
    if (i < numPoints - 1) {
      p2 = points[i+1];
    }
    area += p1.x * p2.y - p1.y * p2.x;
  }
  area /= 2;
  area = Math.abs(area);
  return area;
}

// TODO: File input
var testCase1 = [{x: 4, y: 6}, {x: 4, y: -4}, {x: 8, y: -4}, {x: 8, y: -8}, {x: -4, y: -8}, {x: -4, y: 6}];
console.log(areaOfPolygon(testCase1));
