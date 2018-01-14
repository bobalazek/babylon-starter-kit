/********** Enums **********/

export enum PhysicsColliderEnum {
    Sphere,
    Box,
    Capsule,
    Cylinder,
    Cone,
    Plane,
    Terrain,
    Convex,
    Concave
}

export enum PhysicsConstrantEnum {
    PointToPoint, // ball socket
    Hinge,
    Slider,
    ConeTwist,
    Fixed,
    Generic6DoF // generic 6 degrees of Freedom
}
