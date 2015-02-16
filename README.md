# paddocks

## Algorithm
### Area of any polygon
* Given a set of points, define a list of edges between those points.
* For each edge in the list of edges:
    * Pair with every other edge in the list of edges:
        * If the edges intersect, break the two edges into four edges using the intersection point.
* If no edges intersected, can short-circuit and use the formula for the area of a non-complex polygon.
* Otherwise:
    * For each point in the original set of points: 
        * Find the smallest polygon containing this point.
        * Compute the area of this polygon and add its area to the sum.
        * Remove all edges that included the original point from the list of edges.
    * Keep a list of all of the polygons that have already been added to the area.
    * For each edge that remains:
        * Find the smallest polygon containing this edge.
        * If this polygon has already been added to the area:
            * Do nothing with this polygon.
        * Else:
            * Compute area of this polygon using the formula for the area of a non-complex polygon.
            * Add this area to the overall area of the shape.
* Return the area of the shape.

### Smallest polygon containing a given an edge
Breadth-first search using Djikstra's
* Create a priority queue to store edges to explore.
* Maintain a set of already used edges.
* Pick an edge containing the given point and add that edge both to the set of used edges and to the priority queue with a cost of 1.
* While the priority queue is not empty:
    * Remove the first edge from the priority queue (element with lowest cost).
    * Find all unused edges that contain the endpoint of this element.
    * If any of these edges contains the starting point, then we are done and the cost is the cost of the dequeued element + 1 (can store additional information in priority queue elements to retrace path and get edges)
    * Otherwise, add each edge to the priority queue with cost 1 + the cost of the dequeued edge.

## Complex Polygons
* Can detect if a polygon is complex by taking all pairs of edges and seeing if they intersect each other. If no edges intersect, the polygon is not complex, and its area is computable using a formula
* If a polygon is complex, need to redefine the problem in order to get the correct area.
    * Need a new description of points that redescribes the shape without intersections. How do I algorithmically determine this new set of points?
        *Any intersection point between two edges can be used to redefine the two edges as four, non-intersecting edges. The challenge here, though, is defining the order of those edges such that the points are in clockwise order as original.
            * What about using a different polygon representation to make this less challenging? If I just have a set of edges, and can algorithmically generate an ordering of points, I could find the right area.
            * Algorithm that should work up to 5 edges, where the most complicated shape is, I think, a 5-pointed star:
                * Find all intersecting edges, break them into smaller edges.
                * While there are original polygon points that have not been used, choose any point in the original polygon description:
                    * Find the smallest polygon that includes this point, compute its area and add it to the sum.
                    * Delete edges that use that original point
                * When done, if there are remaining edges, consider them as a single shape, compute their area, and add it to the sum.
                * Problem: does not work when, once all edges containing original points are deleted, there are multiple sub polygons defined by the remaining edges. Because at this point, I can't think of a good heuristic for deleting edges. Choosing a point and finding the smallest polygon that includes that point will still help, but need to delete edges at the end and if some edges are used more than once, it's hard to tell what to delete.
                * Solution: Keep track of the set of edges used to define each shape. Create the smallest possible polygon with ALL shapes, and do not add the area to the sum if we determine that we have already considered this shape.
    * OR need to break the polygon into several, non-complex polygons and sum their areas.
    
