(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = adjoint;

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function adjoint(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};
},{}],2:[function(require,module,exports){
module.exports = clone;

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
function clone(a) {
    var out = new Float32Array(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};
},{}],3:[function(require,module,exports){
module.exports = copy;

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};
},{}],4:[function(require,module,exports){
module.exports = create;

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create() {
    var out = new Float32Array(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};
},{}],5:[function(require,module,exports){
module.exports = determinant;

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};
},{}],6:[function(require,module,exports){
module.exports = fromQuat;

/**
 * Creates a matrix from a quaternion rotation.
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @returns {mat4} out
 */
function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};
},{}],7:[function(require,module,exports){
module.exports = fromRotationTranslation;

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
function fromRotationTranslation(out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    
    return out;
};
},{}],8:[function(require,module,exports){
module.exports = frustum;

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};
},{}],9:[function(require,module,exports){
module.exports = identity;

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};
},{}],10:[function(require,module,exports){
module.exports = {
  create: require('./create')
  , clone: require('./clone')
  , copy: require('./copy')
  , identity: require('./identity')
  , transpose: require('./transpose')
  , invert: require('./invert')
  , adjoint: require('./adjoint')
  , determinant: require('./determinant')
  , multiply: require('./multiply')
  , translate: require('./translate')
  , scale: require('./scale')
  , rotate: require('./rotate')
  , rotateX: require('./rotateX')
  , rotateY: require('./rotateY')
  , rotateZ: require('./rotateZ')
  , fromRotationTranslation: require('./fromRotationTranslation')
  , fromQuat: require('./fromQuat')
  , frustum: require('./frustum')
  , perspective: require('./perspective')
  , perspectiveFromFieldOfView: require('./perspectiveFromFieldOfView')
  , ortho: require('./ortho')
  , lookAt: require('./lookAt')
  , str: require('./str')
}
},{"./adjoint":1,"./clone":2,"./copy":3,"./create":4,"./determinant":5,"./fromQuat":6,"./fromRotationTranslation":7,"./frustum":8,"./identity":9,"./invert":11,"./lookAt":12,"./multiply":13,"./ortho":14,"./perspective":15,"./perspectiveFromFieldOfView":16,"./rotate":17,"./rotateX":18,"./rotateY":19,"./rotateZ":20,"./scale":21,"./str":22,"./translate":23,"./transpose":24}],11:[function(require,module,exports){
module.exports = invert;

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};
},{}],12:[function(require,module,exports){
var identity = require('./identity');

module.exports = lookAt;

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < 0.000001 &&
        Math.abs(eyey - centery) < 0.000001 &&
        Math.abs(eyez - centerz) < 0.000001) {
        return identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};
},{"./identity":9}],13:[function(require,module,exports){
module.exports = multiply;

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};
},{}],14:[function(require,module,exports){
module.exports = ortho;

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function ortho(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};
},{}],15:[function(require,module,exports){
module.exports = perspective;

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};
},{}],16:[function(require,module,exports){
module.exports = perspectiveFromFieldOfView;

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = (far * near) / (near - far);
    out[15] = 0.0;
    return out;
}


},{}],17:[function(require,module,exports){
module.exports = rotate;

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function rotate(out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < 0.000001) { return null; }
    
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};
},{}],18:[function(require,module,exports){
module.exports = rotateX;

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateX(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};
},{}],19:[function(require,module,exports){
module.exports = rotateY;

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateY(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};
},{}],20:[function(require,module,exports){
module.exports = rotateZ;

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
function rotateZ(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};
},{}],21:[function(require,module,exports){
module.exports = scale;

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function scale(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};
},{}],22:[function(require,module,exports){
module.exports = str;

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
function str(a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + 
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};
},{}],23:[function(require,module,exports){
module.exports = translate;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate(out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};
},{}],24:[function(require,module,exports){
module.exports = transpose;

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    
    return out;
};
},{}],25:[function(require,module,exports){
module.exports = add;

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function add(out, a, b) {
    out[0] = a[0] + b[0]
    out[1] = a[1] + b[1]
    out[2] = a[2] + b[2]
    return out
}
},{}],26:[function(require,module,exports){
module.exports = angle

var fromValues = require('./fromValues')
var normalize = require('./normalize')
var dot = require('./dot')

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
function angle(a, b) {
    var tempA = fromValues(a[0], a[1], a[2])
    var tempB = fromValues(b[0], b[1], b[2])
 
    normalize(tempA, tempA)
    normalize(tempB, tempB)
 
    var cosine = dot(tempA, tempB)

    if(cosine > 1.0){
        return 0
    } else {
        return Math.acos(cosine)
    }     
}

},{"./dot":33,"./fromValues":35,"./normalize":44}],27:[function(require,module,exports){
module.exports = clone;

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
function clone(a) {
    var out = new Float32Array(3)
    out[0] = a[0]
    out[1] = a[1]
    out[2] = a[2]
    return out
}
},{}],28:[function(require,module,exports){
module.exports = copy;

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
function copy(out, a) {
    out[0] = a[0]
    out[1] = a[1]
    out[2] = a[2]
    return out
}
},{}],29:[function(require,module,exports){
module.exports = create;

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
function create() {
    var out = new Float32Array(3)
    out[0] = 0
    out[1] = 0
    out[2] = 0
    return out
}
},{}],30:[function(require,module,exports){
module.exports = cross;

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2]

    out[0] = ay * bz - az * by
    out[1] = az * bx - ax * bz
    out[2] = ax * by - ay * bx
    return out
}
},{}],31:[function(require,module,exports){
module.exports = distance;

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2]
    return Math.sqrt(x*x + y*y + z*z)
}
},{}],32:[function(require,module,exports){
module.exports = divide;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function divide(out, a, b) {
    out[0] = a[0] / b[0]
    out[1] = a[1] / b[1]
    out[2] = a[2] / b[2]
    return out
}
},{}],33:[function(require,module,exports){
module.exports = dot;

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}
},{}],34:[function(require,module,exports){
module.exports = forEach;

var vec = require('./create')()

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
function forEach(a, stride, offset, count, fn, arg) {
        var i, l
        if(!stride) {
            stride = 3
        }

        if(!offset) {
            offset = 0
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length)
        } else {
            l = a.length
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i] 
            vec[1] = a[i+1] 
            vec[2] = a[i+2]
            fn(vec, vec, arg)
            a[i] = vec[0] 
            a[i+1] = vec[1] 
            a[i+2] = vec[2]
        }
        
        return a
}
},{"./create":29}],35:[function(require,module,exports){
module.exports = fromValues;

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
function fromValues(x, y, z) {
    var out = new Float32Array(3)
    out[0] = x
    out[1] = y
    out[2] = z
    return out
}
},{}],36:[function(require,module,exports){
module.exports = {
  create: require('./create')
  , clone: require('./clone')
  , angle: require('./angle')
  , fromValues: require('./fromValues')
  , copy: require('./copy')
  , set: require('./set')
  , add: require('./add')
  , subtract: require('./subtract')
  , multiply: require('./multiply')
  , divide: require('./divide')
  , min: require('./min')
  , max: require('./max')
  , scale: require('./scale')
  , scaleAndAdd: require('./scaleAndAdd')
  , distance: require('./distance')
  , squaredDistance: require('./squaredDistance')
  , length: require('./length')
  , squaredLength: require('./squaredLength')
  , negate: require('./negate')
  , inverse: require('./inverse')
  , normalize: require('./normalize')
  , dot: require('./dot')
  , cross: require('./cross')
  , lerp: require('./lerp')
  , random: require('./random')
  , transformMat4: require('./transformMat4')
  , transformMat3: require('./transformMat3')
  , transformQuat: require('./transformQuat')
  , rotateX: require('./rotateX')
  , rotateY: require('./rotateY')
  , rotateZ: require('./rotateZ')
  , forEach: require('./forEach')
}
},{"./add":25,"./angle":26,"./clone":27,"./copy":28,"./create":29,"./cross":30,"./distance":31,"./divide":32,"./dot":33,"./forEach":34,"./fromValues":35,"./inverse":37,"./length":38,"./lerp":39,"./max":40,"./min":41,"./multiply":42,"./negate":43,"./normalize":44,"./random":45,"./rotateX":46,"./rotateY":47,"./rotateZ":48,"./scale":49,"./scaleAndAdd":50,"./set":51,"./squaredDistance":52,"./squaredLength":53,"./subtract":54,"./transformMat3":55,"./transformMat4":56,"./transformQuat":57}],37:[function(require,module,exports){
module.exports = inverse;

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
function inverse(out, a) {
  out[0] = 1.0 / a[0]
  out[1] = 1.0 / a[1]
  out[2] = 1.0 / a[2]
  return out
}
},{}],38:[function(require,module,exports){
module.exports = length;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function length(a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    return Math.sqrt(x*x + y*y + z*z)
}
},{}],39:[function(require,module,exports){
module.exports = lerp;

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
function lerp(out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2]
    out[0] = ax + t * (b[0] - ax)
    out[1] = ay + t * (b[1] - ay)
    out[2] = az + t * (b[2] - az)
    return out
}
},{}],40:[function(require,module,exports){
module.exports = max;

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function max(out, a, b) {
    out[0] = Math.max(a[0], b[0])
    out[1] = Math.max(a[1], b[1])
    out[2] = Math.max(a[2], b[2])
    return out
}
},{}],41:[function(require,module,exports){
module.exports = min;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function min(out, a, b) {
    out[0] = Math.min(a[0], b[0])
    out[1] = Math.min(a[1], b[1])
    out[2] = Math.min(a[2], b[2])
    return out
}
},{}],42:[function(require,module,exports){
module.exports = multiply;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function multiply(out, a, b) {
    out[0] = a[0] * b[0]
    out[1] = a[1] * b[1]
    out[2] = a[2] * b[2]
    return out
}
},{}],43:[function(require,module,exports){
module.exports = negate;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
function negate(out, a) {
    out[0] = -a[0]
    out[1] = -a[1]
    out[2] = -a[2]
    return out
}
},{}],44:[function(require,module,exports){
module.exports = normalize;

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    var len = x*x + y*y + z*z
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len)
        out[0] = a[0] * len
        out[1] = a[1] * len
        out[2] = a[2] * len
    }
    return out
}
},{}],45:[function(require,module,exports){
module.exports = random;

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
function random(out, scale) {
    scale = scale || 1.0

    var r = Math.random() * 2.0 * Math.PI
    var z = (Math.random() * 2.0) - 1.0
    var zScale = Math.sqrt(1.0-z*z) * scale

    out[0] = Math.cos(r) * zScale
    out[1] = Math.sin(r) * zScale
    out[2] = z * scale
    return out
}
},{}],46:[function(require,module,exports){
module.exports = rotateX;

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateX(out, a, b, c){
    var p = [], r=[]
    //Translate point to the origin
    p[0] = a[0] - b[0]
    p[1] = a[1] - b[1]
    p[2] = a[2] - b[2]

    //perform rotation
    r[0] = p[0]
    r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c)
    r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c)

    //translate to correct position
    out[0] = r[0] + b[0]
    out[1] = r[1] + b[1]
    out[2] = r[2] + b[2]

    return out
}
},{}],47:[function(require,module,exports){
module.exports = rotateY;

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateY(out, a, b, c){
    var p = [], r=[]
    //Translate point to the origin
    p[0] = a[0] - b[0]
    p[1] = a[1] - b[1]
    p[2] = a[2] - b[2]
  
    //perform rotation
    r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c)
    r[1] = p[1]
    r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c)
  
    //translate to correct position
    out[0] = r[0] + b[0]
    out[1] = r[1] + b[1]
    out[2] = r[2] + b[2]
  
    return out
}
},{}],48:[function(require,module,exports){
module.exports = rotateZ;

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
function rotateZ(out, a, b, c){
    var p = [], r=[]
    //Translate point to the origin
    p[0] = a[0] - b[0]
    p[1] = a[1] - b[1]
    p[2] = a[2] - b[2]
  
    //perform rotation
    r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c)
    r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c)
    r[2] = p[2]
  
    //translate to correct position
    out[0] = r[0] + b[0]
    out[1] = r[1] + b[1]
    out[2] = r[2] + b[2]
  
    return out
}
},{}],49:[function(require,module,exports){
module.exports = scale;

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
function scale(out, a, b) {
    out[0] = a[0] * b
    out[1] = a[1] * b
    out[2] = a[2] * b
    return out
}
},{}],50:[function(require,module,exports){
module.exports = scaleAndAdd;

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
function scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale)
    out[1] = a[1] + (b[1] * scale)
    out[2] = a[2] + (b[2] * scale)
    return out
}
},{}],51:[function(require,module,exports){
module.exports = set;

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
function set(out, x, y, z) {
    out[0] = x
    out[1] = y
    out[2] = z
    return out
}
},{}],52:[function(require,module,exports){
module.exports = squaredDistance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2]
    return x*x + y*y + z*z
}
},{}],53:[function(require,module,exports){
module.exports = squaredLength;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
    var x = a[0],
        y = a[1],
        z = a[2]
    return x*x + y*y + z*z
}
},{}],54:[function(require,module,exports){
module.exports = subtract;

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function subtract(out, a, b) {
    out[0] = a[0] - b[0]
    out[1] = a[1] - b[1]
    out[2] = a[2] - b[2]
    return out
}
},{}],55:[function(require,module,exports){
module.exports = transformMat3;

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
function transformMat3(out, a, m) {
    var x = a[0], y = a[1], z = a[2]
    out[0] = x * m[0] + y * m[3] + z * m[6]
    out[1] = x * m[1] + y * m[4] + z * m[7]
    out[2] = x * m[2] + y * m[5] + z * m[8]
    return out
}
},{}],56:[function(require,module,exports){
module.exports = transformMat4;

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
function transformMat4(out, a, m) {
    var x = a[0], y = a[1], z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15]
    w = w || 1.0
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w
    return out
}
},{}],57:[function(require,module,exports){
module.exports = transformQuat;

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
function transformQuat(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx
    return out
}
},{}],58:[function(require,module,exports){
var mat4 = require("gl-mat4")
var vec3 = require("gl-vec3")

module.exports = Camera

function Camera (gl, x, y, z, atX, atY, atZ) {
  var viewMatrix = mat4.create()
  var projMatrix = mat4.create()
  var up         = vec3.fromValues(0, 1, 0)

  this.position = vec3.fromValues(x, y, z)
  this.target   = vec3.fromValues(atX, atY, atZ)

  Object.defineProperty(this, "projectionMatrix", {
    get: function () {
      //TODO: this is oddly hardcoded?
      var angle = 50 / 180 * Math.PI 
      var ratio = this.aspectRatio

      return mat4.perspective(projMatrix, angle, ratio, 1, 20)
    } 
  })

  Object.defineProperty(this, "viewMatrix", {
    get: function () {
      return mat4.lookAt(viewMatrix, this.position, this.target, up)
    } 
  })

  Object.defineProperty(this, "aspectRatio", {
    get: function () {
      return gl.drawingBufferWidth / gl.drawingBufferHeight
    } 
  })
}

},{"gl-mat4":10,"gl-vec3":36}],59:[function(require,module,exports){
module.exports = Clock

function Clock () {
  this.lastTime = Date.now()
  this.thisTime = this.lastTime
  this.dT       = this.thisTime - this.lastTime
}

Clock.prototype.tick = function () {
  this.lastTime = this.thisTime
  this.thisTime = Date.now()
  this.dT       = this.thisTime - this.lastTime
}

},{}],60:[function(require,module,exports){
var Clock            = require("./Clock")
var GLStatefulRenderingContext = require("./modules/GLStatefulRenderingContext/GLStatefulRenderingContext")
var resizeWithRatio = require("./dom-utils").resizeWithRatio

module.exports = GLShell

function GLShell (parentNode, aspectRatio) {
  var canvas           = document.createElement("canvas")
  var ctx              = canvas.getContext("webgl")
  var gl               = new GLStatefulRenderingContext(ctx)
  var clock            = new Clock

  var render = function () {
    resizeWithRatio(this.aspectRatio, this.parentNode, this.gl.canvas)
    this.render() 
    requestAnimationFrame(render)
  }.bind(this)

  var update = function () {
    this.clock.tick()
    this.update(this.clock.dT) 
  }.bind(this)

  this.parentNode  = parentNode
  this.gl          = gl
  this.aspectRatio = aspectRatio
  this.clock       = clock

  parentNode.appendChild(canvas)
  requestAnimationFrame(render)
  setInterval(update, 25)
}

GLShell.prototype.render = function () {
  //over write this with your own render function
}

//for convenience, the time since last update is passed as a paramater
GLShell.prototype.update = function (dT) {
  //overwrite this with your own update function
}

},{"./Clock":59,"./dom-utils":72,"./modules/GLStatefulRenderingContext/GLStatefulRenderingContext":75}],61:[function(require,module,exports){
var mat4        = require("gl-mat4")

var GLProgram   = require("./types/GLProgram")
var ScreenQuad  = require("./ScreenQuad")
var matrixUtils = require("./matrix-utils")

var computeTranslationMatrix = matrixUtils.computeTranslationMatrix
var computeTransformMatrix   = matrixUtils.computeTransformMatrix
var computeRotationMatrix    = matrixUtils.computeRotationMatrix
var computeScaleMatrix       = matrixUtils.computeScaleMatrix
var computeModelMatrix       = matrixUtils.computeModelMatrix

module.exports = GPUParticleSystem

var velocityVSrc = "#define GLSLIFY 1\n\nattribute vec2 screenCoord;\n\nvoid main () {\n  gl_Position = vec4(screenCoord, 0.0, 1.0);\n}\n"
var velocityFSrc = "#define GLSLIFY 1\n\nprecision mediump float;\n\nconst float PARTICLE_MASS       = 1.0;\nconst float ATTRACTION_CONSTANT = 0.01;\n\nuniform float dT;\nuniform vec2 viewport;\nuniform sampler2D velocities;\nuniform sampler2D positions;\nuniform mat4 modelMatrix;\n\nstruct Attractor {\n  vec3 position;\n  float mass;\n};\n\nuniform Attractor attractors[3];\n\nvec3 calcForce (float cons,  float mass1, float mass2, vec3 pos1, vec3 pos2) {\n  float dist = max(distance(pos1, pos2), .1);\n  vec3 dir   = (pos1 - pos2) / dist;\n\n  return cons * mass1 * mass2 / (dist * dist) * dir;\n}\n\nvoid main () {\n  vec2 textureIndex = gl_FragCoord.xy / viewport;\n  vec3 velocity     = texture2D(velocities, textureIndex).xyz;\n  vec3 position     = (modelMatrix * texture2D(positions, textureIndex)).xyz;\n  vec3 force        = vec3(0.0, 0.0, 0.0);\n\n  for (int i = 0; i < 3; i++) {\n    force += calcForce(ATTRACTION_CONSTANT, \n                       attractors[i].mass, \n                       PARTICLE_MASS, \n                       attractors[i].position,\n                       position);\n  }\n\n  gl_FragColor = vec4((force / PARTICLE_MASS) * dT + velocity, 1.0);\n}\n"
var positionVSrc = "#define GLSLIFY 1\n\nattribute vec2 screenCoord;\n\nvoid main () {\n  gl_Position = vec4(screenCoord, 0.0, 1.0);\n}\n"
var positionFSrc = "#define GLSLIFY 1\n\nprecision mediump float;\n\nuniform float dT;\nuniform vec2 viewport;\nuniform sampler2D velocities;\nuniform sampler2D positions;\n\nvoid main () {\n  vec2 textureIndex = gl_FragCoord.xy / viewport;\n  vec3 velocity     = texture2D(velocities, textureIndex).xyz;\n  vec3 position     = texture2D(positions, textureIndex).xyz;\n\n  gl_FragColor  = vec4((dT / 10.0 * velocity) + position, 1.0);\n}\n"
var renderVSrc   = "#define GLSLIFY 1\n\nattribute vec2 particleCoord;\n\nuniform sampler2D positions;\nuniform vec2 screenDimensions;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 transformMatrix;\n\nconst float baseSize = 1.5;\n\nvarying vec3 position;\n\nvoid main () {\n  vec4 pos            = texture2D(positions, particleCoord);\n  vec4 worldSpacePos  = modelMatrix * pos;\n  vec4 screenSpacePos = transformMatrix * pos;\n\n  position     = worldSpacePos.xyz;\n  gl_Position  = screenSpacePos;\n  gl_PointSize = baseSize; \n}\n"
var renderFSrc   = "#define GLSLIFY 1\n\nprecision mediump float;\n\nstruct Light {\n  vec3 position;\n  vec3 color;\n  float intensity;\n};\n\nuniform vec4 color;\nuniform Light lights[3];\n\nvarying vec3 position;\n\nvec3 colorFromLight (vec3 position, Light light) {\n  float dist = distance(position, light.position);\n  float i    = clamp(light.intensity / (dist * dist), 0.0, 1.0);\n\n  return i * light.color;\n}\n\nvoid main () {\n  vec3 finalColor = vec3(0.0, 0.0, 0.0);\n\n  for (int i = 0; i < 3; i++) {\n    finalColor += (0.3 * colorFromLight(position, lights[i]));\n  }\n  gl_FragColor = vec4(\n    min(finalColor[0], 1.0),\n    min(finalColor[1], 1.0),\n    min(finalColor[2], 1.0),\n    0.0);\n} \n"

function GPUParticleSystem (gl) {
  var velocityProgram = new GLProgram.fromSource(gl, velocityVSrc, velocityFSrc)
  var positionProgram = new GLProgram.fromSource(gl, positionVSrc, positionFSrc)
  var renderProgram   = new GLProgram.fromSource(gl, renderVSrc, renderFSrc)
  var screenQuad      = new ScreenQuad
  var screenBuffer    = gl.createBuffer()

  if (velocityProgram instanceof Error) console.log(velocityProgram)
  if (positionProgram instanceof Error) console.log(positionProgram)
  if (renderProgram instanceof Error)   console.log(renderProgram)

  gl.bindBuffer(gl.ARRAY_BUFFER, screenBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, screenQuad, gl.STATIC_DRAW)

  //gl.clearColor(0, 0, 0, 0)
  gl.clearColor(1, 1, 1, 1)

  // Each shader has only a attribute bound thus allowing this to work. 
  // The better question is how can we formulate this such that a program
  // specifics it's number of attributes and then an appropriate number of locations
  // are bound as needed
  gl.enableVertexAttribArray(0);
  //gl.enableVertexAttribArray(velocityProgram.attributes.screenCoord)
  //gl.enableVertexAttribArray(positionProgram.attributes.screenCoord)
  //gl.enableVertexAttribArray(renderProgram.attributes.particleCoord)

  this.gl                = gl
  this.screenBuffer      = screenBuffer
  this.velocityProgram   = velocityProgram
  this.positionProgram   = positionProgram
  this.renderProgram     = renderProgram
  this.translationMatrix = mat4.create()
  this.scaleMatrix       = mat4.create()
  this.rotationMatrix    = mat4.create()
  this.modelMatrix       = mat4.create()
  this.transformMatrix   = mat4.create()
}


GPUParticleSystem.prototype.update = function (dT, gpuEmitters, attractors) {
  var gl        = this.gl
  var dTSeconds = dT / 1000
  var vUniforms = this.velocityProgram.uniforms
  var emitter 
  var tmpBuf

  gl.useProgram(this.velocityProgram.program)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ZERO)
  gl.disable(gl.DEPTH_TEST)
  gl.depthMask(false)
  gl.uniform1f(this.velocityProgram.uniforms.dT, dTSeconds)
  gl.bindBuffer(gl.ARRAY_BUFFER, this.screenBuffer)
  gl.vertexAttribPointer(this.velocityProgram.attributes.screenCoord, 
                         2, gl.FLOAT, gl.FALSE, 0, 0)
  for (var i = 0; i < attractors.length; i++) {
    gl.uniform3f(vUniforms["attractors[" + i + "].position"],
                 attractors[i].physics.position[0],
                 attractors[i].physics.position[1],
                 attractors[i].physics.position[2])
    gl.uniform1f(vUniforms["attractors[" + i + "].mass"],
                 attractors[i].physics.mass)
  }


  for (var i = 0; i < gpuEmitters.length; i++) {
    physics = gpuEmitters[i].physics
    emitter = gpuEmitters[i].gpuEmitter

    computeTranslationMatrix(this.translationMatrix, physics.position)
    computeRotationMatrix(this.rotationMatrix, physics.rotation)
    computeScaleMatrix(this.scaleMatrix, physics.scale)
    computeModelMatrix(this.modelMatrix, this.translationMatrix, 
                       this.scaleMatrix, this.rotationMatrix)

    gl.bindFramebuffer(gl.FRAMEBUFFER, emitter.velTargets[1].handle) 
    gl.viewport(0, 0, emitter.velTargets[1].width, 
                      emitter.velTargets[1].height)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, emitter.velTargets[0].texture)
    gl.activeTexture(gl.TEXTURE0 + 1)
    gl.bindTexture(gl.TEXTURE_2D, emitter.posTargets[0].texture)
    gl.uniform1i(this.velocityProgram.uniforms.velocities, 0)
    gl.uniform1i(this.velocityProgram.uniforms.positions, 1)
    gl.uniform2f(this.velocityProgram.uniforms.viewport, 
                 emitter.velTargets[1].width, 
                 emitter.velTargets[1].height)
    gl.uniformMatrix4fv(this.velocityProgram.uniforms.modelMatrix, 
                        false, this.modelMatrix)
                 
    gl.drawArrays(gl.TRIANGLES, 0, 6)

    tmpBuf                = emitter.velTargets[0]
    emitter.velTargets[0] = emitter.velTargets[1]
    emitter.velTargets[1] = tmpBuf
  }

  gl.useProgram(this.positionProgram.program)
  gl.uniform1f(this.positionProgram.uniforms.dT, dTSeconds)
  gl.bindBuffer(gl.ARRAY_BUFFER, this.screenBuffer)
  gl.vertexAttribPointer(this.positionProgram.attributes.screenCoord, 
                         2, gl.FLOAT, gl.FALSE, 0, 0)

  for (var j = 0; j < gpuEmitters.length; j++) {
    emitter = gpuEmitters[j].gpuEmitter

    gl.bindFramebuffer(gl.FRAMEBUFFER, emitter.posTargets[1].handle) 
    gl.viewport(0, 0, emitter.posTargets[1].width, 
                      emitter.posTargets[1].height)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, emitter.velTargets[0].texture)
    gl.activeTexture(gl.TEXTURE0 + 1)
    gl.bindTexture(gl.TEXTURE_2D, emitter.posTargets[0].texture)
    gl.uniform1i(this.positionProgram.uniforms.velocities, 0)
    gl.uniform1i(this.positionProgram.uniforms.positions, 1)
    gl.uniform2f(this.positionProgram.uniforms.viewport, 
                 emitter.posTargets[1].width, 
                 emitter.posTargets[1].height)
    gl.drawArrays(gl.TRIANGLES, 0, 6)

    tmpBuf                = emitter.posTargets[0]
    emitter.posTargets[0] = emitter.posTargets[1]
    emitter.posTargets[1] = tmpBuf
  }
}

GPUParticleSystem.prototype.render = function (camera, lights, gpuEmitters) {
  var gl               = this.gl
  var viewMatrix       = camera.viewMatrix
  var projectionMatrix = camera.projectionMatrix
  var rUniforms        = this.renderProgram.uniforms
  var emitter

  gl.useProgram(this.renderProgram.program)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight)
  gl.uniformMatrix4fv(this.renderProgram.uniforms.viewMatrix, 
                      false, viewMatrix) 
  gl.uniformMatrix4fv(this.renderProgram.uniforms.projectionMatrix, 
                      false, projectionMatrix) 
  gl.uniform2f(this.renderProgram.uniforms.screenDimensions, 
               gl.drawingBufferWidth, gl.drawingBufferHeight)

  for (var i = 0; i < lights.length; i++) {
    gl.uniform3f(rUniforms["lights[" + i + "].position"],
                 lights[i].physics.position[0],
                 lights[i].physics.position[1],
                 lights[i].physics.position[2])
    gl.uniform3f(rUniforms["lights[" + i + "].color"],
                 lights[i].light.color[0],
                 lights[i].light.color[1],
                 lights[i].light.color[2])
    gl.uniform1f(rUniforms["lights[" + i + "].intensity"],
                 lights[i].light.intensity)
  }

  for (var i = 0; i < gpuEmitters.length; i++) {
    physics = gpuEmitters[i].physics
    emitter = gpuEmitters[i].gpuEmitter

    computeTranslationMatrix(this.translationMatrix, physics.position)
    computeRotationMatrix(this.rotationMatrix, physics.rotation)
    computeScaleMatrix(this.scaleMatrix, physics.scale)
    computeModelMatrix(this.modelMatrix, this.translationMatrix, 
                       this.scaleMatrix, this.rotationMatrix)
    computeTransformMatrix(this.transformMatrix, this.modelMatrix,
                           viewMatrix, projectionMatrix)

    gl.uniformMatrix4fv(this.renderProgram.uniforms.modelMatrix, 
                        false, this.modelMatrix)
    gl.uniformMatrix4fv(this.renderProgram.uniforms.transformMatrix, 
                        false, this.transformMatrix)
    gl.uniform4f(this.renderProgram.uniforms.color, 
                 emitter.color[0],
                 emitter.color[1],
                 emitter.color[2],
                 emitter.color[3])
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, emitter.posTargets[0].texture)
    gl.uniform1i(this.renderProgram.uniforms.positions, 0)
    gl.bindBuffer(gl.ARRAY_BUFFER, emitter.coordBuffer)
    gl.vertexAttribPointer(this.renderProgram.attributes.particleCoord, 
                           2, gl.FLOAT, gl.FALSE, 0, 0)
    gl.drawArrays(gl.POINTS, 0, emitter.aliveCount)
  }
}

},{"./ScreenQuad":64,"./matrix-utils":74,"./types/GLProgram":77,"gl-mat4":10}],62:[function(require,module,exports){
module.exports = GamepadManager 

var GAMEPAD_COUNT = 4
var BUTTON_COUNT  = 16

function GamepadState () {
  this.connected = false
  this.axes      = new Array(GAMEPAD_COUNT)
  this.isDowns   = new Array(BUTTON_COUNT) 
  this.justDowns = new Array(BUTTON_COUNT) 
  this.justUps   = new Array(BUTTON_COUNT) 
}

function GamepadManager (win, nav) {
  var getGamePads = (nav.getGamepads || nav.webkitGetGamepads).bind(nav)

  this.handles   = new Array(GAMEPAD_COUNT)
  this.padStates = [
    new GamepadState,
    new GamepadState,
    new GamepadState,
    new GamepadState
  ]

  this.tick = function (dT) {
    var gps = getGamePads()
    var i   = -1 
    var j   = -1
    var ps

    while (++i < GAMEPAD_COUNT) {
      if (gps[i]) {
        ps = this.padStates[i]
        ps.connected = true
        ps.axes      = gps[i].axes 
        while (++j < BUTTON_COUNT) {
          ps.justDowns[j] = gps[i].buttons[j].pressed && !ps.isDowns[j]
          ps.justUps[j]   = ps.isDowns[j] && !gps[i].buttons[j].pressed
          ps.isDowns[j]   = gps[i].buttons[j].pressed
        }
      }
    }
  } 
}

},{}],63:[function(require,module,exports){
module.exports = KeyboardManager

var KEY_COUNT = 256

function KeyboardManager (element) {
  var isDowns       = new Array(KEY_COUNT)
  var justDowns     = new Array(KEY_COUNT)
  var justUps       = new Array(KEY_COUNT)
  var downDurations = new Array(KEY_COUNT)
  
  var handleKeyDown = function (e) {
    var keyCode = e.keyCode

    justDowns[keyCode] = !isDowns[keyCode]
    isDowns[keyCode]   = true
  }

  var handleKeyUp = function (e) {
    var keyCode = e.keyCode

    justUps[keyCode]   = true
    isDowns[keyCode]   = false
  }

  var handleBlur = function () {
    var i = -1

    while (++i < KEY_COUNT) {
      isDowns[i]   = 0
      justDowns[i] = 0
      justUps[i]   = 0
    }
  }

  this.isDowns         = isDowns
  this.justUps         = justUps
  this.justDowns       = justDowns
  this.downDurations   = downDurations
  this.keydownListener = element.addEventListener("keydown", handleKeyDown)
  this.keyupListener   = element.addEventListener("keyup", handleKeyUp)
  this.blurListener    = element.addEventListener("blur", handleBlur)

  //assign tabIndex if there isn't one to allow element to be focused
  element.tabIndex = element.tabIndex === -1 ? 0 : element.tabIndex

  this.tick = function (dT) {
    var i = -1

    while (++i < KEY_COUNT) {
      justDowns[i] = false 
      justUps[i]   = false
      if (isDowns[i]) downDurations[i] += dT
      else            downDurations[i] = 0
    }
  }

  this.detach = function () {
    element.removeEventListener("keydown", this.keydownListener)
    element.removeEventListener("keyup", this.keyupListener)
    element.removeEventListener("blur", this.blurListener)
  }
}

},{}],64:[function(require,module,exports){
module.exports = ScreenQuad

function ScreenQuad () {
  return new Float32Array([
    1, 1, -1, 1, -1, -1,
    1, 1, -1, -1, 1, -1
  ])
}

},{}],65:[function(require,module,exports){
var Physics    = require("../components/Physics")
var Attractive = require("../components/Attractive")

module.exports = Attractor

// [x,y,z] -> Number -> Attractor
function Attractor (position, mass) {
  this.physics      = new Physics(position, [0, 0, 0])
  this.physics.mass = mass
  this.attractive   = new Attractive(true)
}

},{"../components/Attractive":68,"../components/Physics":71}],66:[function(require,module,exports){
var GPUEmitter = require("../components/GPUEmitter")
var Physics    = require("../components/Physics")

module.exports = GPUParticleEmitter

// GLContext -> [x,y,z] -> [r,g,b,a] -> GPUParticleEmitter
function GPUParticleEmitter (gl, position, color) {
  this.physics    = new Physics(position, [0, 0, 0])
  this.gpuEmitter = new GPUEmitter(gl, color)
}

},{"../components/GPUEmitter":69,"../components/Physics":71}],67:[function(require,module,exports){
var Light   = require("../components/Light")
var Physics = require("../components/Physics")

module.exports = PointLight

function PointLight (position, color, intensity) {
  this.physics = new Physics(position, [0, 0, 0]) 
  this.light   = new Light(color, intensity)
}

},{"../components/Light":70,"../components/Physics":71}],68:[function(require,module,exports){
module.exports = Attractive

function Attractive (active) {
  this.active = active == null ? true : active
}

},{}],69:[function(require,module,exports){
var GLRenderTarget = require("../types/GLRenderTarget")

module.exports = GPUEmitter

var PARTICLE_STRIDE = 4

function GPUEmitter (gl, color) {
  if (!gl.getExtension("OES_texture_float")) throw new Error("no float textures")

  var ROW_SIZE       = 256
  var COUNT          = ROW_SIZE * ROW_SIZE
  var positions      = initializeParticleXYZ(0, 0, 0, new Float32Array(4 * COUNT))
  var velocities     = initializeParticleXYZ(0, 0, 0, new Float32Array(4 * COUNT))
  var posTarget1     = new GLRenderTarget(gl, ROW_SIZE, ROW_SIZE, positions)
  var posTarget2     = new GLRenderTarget(gl, ROW_SIZE, ROW_SIZE, positions)
  var velTarget1     = new GLRenderTarget(gl, ROW_SIZE, ROW_SIZE, velocities)
  var velTarget2     = new GLRenderTarget(gl, ROW_SIZE, ROW_SIZE, velocities)
  var particleCoords = buildParticleCoords(ROW_SIZE, ROW_SIZE)
  var coordBuffer    = gl.createBuffer()

  gl.bindBuffer(gl.ARRAY_BUFFER, coordBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, particleCoords, gl.STATIC_DRAW)

  this.posTargets    = [posTarget1, posTarget2]
  this.velTargets    = [velTarget1, velTarget2]
  this.coordBuffer   = coordBuffer
  this.aliveCount    = ROW_SIZE * ROW_SIZE
  this.color         = color
}

function buildParticleCoords (width, height) {
  var array = new Float32Array(width * 2 * height)

  for (var j = 0; j < height; j++) {
    for (var i = 0; i < width; i++) {
      array[j * 2 * width + i * 2]     = [i / width]
      array[j * 2 * width + i * 2 + 1] = [j / height]
    } 
  }
  return array
}

function setParticleXYZ (index, x, y, z, array) {
  array[PARTICLE_STRIDE * index]     = x
  array[PARTICLE_STRIDE * index + 1] = y
  array[PARTICLE_STRIDE * index + 2] = z
  array[PARTICLE_STRIDE * index + 3] = 1
}

function initializeParticleXYZ (x, y, z, array) {
  for (var i = 0; i < array.length / PARTICLE_STRIDE; i++) {
    setParticleXYZ(i, 
                   x + Math.random() - .5, 
                   y + Math.random() - .5, 
                   z + Math.random() - .5, 
                   array)
  }
  return array
}

},{"../types/GLRenderTarget":78}],70:[function(require,module,exports){
module.exports = Light

function Light (color, intensity) {
  this.color     = color
  this.intensity = intensity
}

},{}],71:[function(require,module,exports){
module.exports = Physics

// [x,y,z] -> [dx, dy, dz] -> Physics
function Physics (position, velocity) {
  this.position     = position
  this.velocity     = velocity
  this.acceleration = [0, 0, 0]
  this.mass         = 1
  this.scale        = [1, 1, 1]
  this.rotation     = [0, 0, 0]
}

},{}],72:[function(require,module,exports){
module.exports.resizeWithRatio = resizeWithRatio

function resizeWithRatio (ratio, reference, subject) {
  var targetAspect = reference.clientWidth / reference.clientHeight
  var newWidth     = ratio < targetAspect
    ? ~~(reference.clientHeight * ratio)
    : reference.clientWidth
  var newHeight    = ~~(newWidth / ratio)
  var oldWidth     = subject.clientWidth
  var oldHeight    = subject.clientHeight

  if (oldWidth === newWidth && oldHeight === newHeight) return
  subject.clientWidth  = newWidth
  subject.clientHeight = newHeight
  subject.width        = newWidth
  subject.height       = newHeight
}

},{}],73:[function(require,module,exports){
var GLShell            = require("./GLShell")
var GPUParticleSystem  = require("./GPUParticleSystem")
var KeyboardManager    = require("./KeyboardManager")
var GamepadManager     = require("./GamepadManager")
var GPUParticleEmitter = require("./assemblies/GPUParticleEmitter")
var Attractor          = require("./assemblies/Attractor")
var PointLight         = require("./assemblies/PointLight")
var Camera             = require("./Camera")
var randUtils          = require("./random-utils")
var randomBound        = randUtils.randomBound
var randomVector       = randUtils.randomVector
var shell              = new GLShell(document.body, 1920 / 1080)
var gpuParticleSystem  = new GPUParticleSystem(shell.gl)
var keyboardManager    = new KeyboardManager(document.body)
var gamepadManager     = new GamepadManager(window, navigator)

var entities = [
  new GPUParticleEmitter(shell.gl, randomVector(3, -1, 1), randomVector(4, 0, 1)),
  new GPUParticleEmitter(shell.gl, randomVector(3, -1, 1), randomVector(4, 0, 1)),
  new GPUParticleEmitter(shell.gl, randomVector(3, -1, 1), randomVector(4, 0, 1)),
  new GPUParticleEmitter(shell.gl, randomVector(3, -1, 1), randomVector(4, 0, 1)),
  new GPUParticleEmitter(shell.gl, randomVector(3, -1, 1), randomVector(4, 0, 1)),
  new GPUParticleEmitter(shell.gl, randomVector(3, -1, 1), randomVector(4, 0, 1)),
  new GPUParticleEmitter(shell.gl, randomVector(3, -1, 1), randomVector(4, 0, 1)),
  new GPUParticleEmitter(shell.gl, randomVector(3, -1, 1), randomVector(4, 0, 1)),
  new GPUParticleEmitter(shell.gl, randomVector(3, -1, 1), randomVector(4, 0, 1)),
  new GPUParticleEmitter(shell.gl, randomVector(3, -1, 1), randomVector(4, 0, 1)),
  new Attractor(randomVector(3, -1, 1), randomBound(0, 200)),
  new Attractor(randomVector(3, -1, 1), randomBound(0, 200)),
  new Attractor(randomVector(3, -1, 1), randomBound(0, 200)),
  new PointLight(randomVector(3, -1, 1), randomVector(3, 0, 1), 1),
  new PointLight(randomVector(3, -1, 1), randomVector(3, 0, 1), 1),
  new PointLight(randomVector(3, -1, 1), randomVector(3, 0, 1), 1)
]
var gpuEmitters = entities.filter(function (e) { return !!e.gpuEmitter && !!e.physics})
var attractors  = entities.filter(function (e) { return !!e.attractive && !!e.physics})
var lights      = entities.filter(function (e) { return !!e.light && !!e.physics})
var camera      = new Camera(shell.gl, 0, 0, 2.5, 0, 0, 0)

window.gl = shell.gl

shell.render = function () {
  gpuParticleSystem.render(camera, lights, gpuEmitters)
}

shell.update = function (dT) {
  keyboardManager.tick(dT)
  gamepadManager.tick(dT)

  //down
  if (gamepadManager.padStates[0].isDowns[0]) {
    attractors[0].physics.position[1] -= .01
  }

  //right
  if (gamepadManager.padStates[0].isDowns[1]) {
    attractors[0].physics.position[0] += 0.01
  }

  //left
  if (gamepadManager.padStates[0].isDowns[2]) {
    attractors[0].physics.position[0] -= 0.01
  }

  //up
  if (gamepadManager.padStates[0].isDowns[3]) {
    attractors[0].physics.position[1] += 0.01
  }
  
  gpuParticleSystem.update(dT, gpuEmitters, attractors)
}

},{"./Camera":58,"./GLShell":60,"./GPUParticleSystem":61,"./GamepadManager":62,"./KeyboardManager":63,"./assemblies/Attractor":65,"./assemblies/GPUParticleEmitter":66,"./assemblies/PointLight":67,"./random-utils":76}],74:[function(require,module,exports){
var mat4 = require("gl-mat4")

module.exports.computeTransformMatrix    = computeTransformMatrix
module.exports.computeTranslationMatrix  = computeTranslationMatrix
module.exports.computeRotationMatrix     = computeRotationMatrix
module.exports.computeScaleMatrix        = computeScaleMatrix
module.exports.computeModelMatrix        = computeModelMatrix

function computeTransformMatrix (out, modelMat, viewMat, projMat) {
  mat4.identity(out)
  mat4.multiply(out, projMat, viewMat)
  mat4.multiply(out, out, modelMat)
  return out
}

function computeTranslationMatrix (transMat, position) {
  mat4.identity(transMat)  
  return mat4.translate(transMat, transMat, position)
}


function computeRotationMatrix (rotMat, rotation) {
  mat4.identity(rotMat)
  mat4.rotateX(rotMat, rotMat, rotation[0])
  mat4.rotateY(rotMat, rotMat, rotation[1])
  mat4.rotateZ(rotMat, rotMat, rotation[2])
  return rotMat
}

function computeScaleMatrix (scaleMat, scale) {
  scaleMat[0]  = scale[0]
  scaleMat[5]  = scale[1]
  scaleMat[10] = scale[2]
  return scaleMat
}

function computeModelMatrix (modelMat, transMat, scaleMat, rotMat) {
  mat4.identity(modelMat)
  mat4.multiply(modelMat, transMat, scaleMat)
  return mat4.multiply(modelMat, modelMat, rotMat)
}

},{"gl-mat4":10}],75:[function(require,module,exports){
'use strict';

module.exports = GLStatefulRenderingContext

function proxyValue (outer, inner, propName) {
  Object.defineProperty(outer, propName, {
    get: function () { return inner[propName] } 
  })
}

function proxyFn (outer, inner, propName) {
  outer[propName] = function (a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
    return inner[propName](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10)
  }
}

function ShaderState (type) {
  this.type     = type
  this.src      = ""
  this.compiled = false
}

function ProgramState () {
  this.attachedShaders = {
    vertex:   null,
    fragment: null
  }
  this.linked                = false
  this.validated             = false
  this.activeUniformsCount   = 0
  this.activeAttributesCount = 0
  this.uniforms              = {}
  this.attributes            = {}

  Object.defineProperty(this, "attachedShaderCount", {
    get: function () {
      return (this.attachedShaders.vertex ? 1: 0) + 
             (this.attachedShaders.fragment ? 1 : 0)
    }
  })
}

// TODO: implement when ready
function RenderBufferState () {}

function GLStatefulRenderingContext (ctx) {
  this.shaders       = new WeakMap
  this.programs      = new WeakMap
  this.activeProgram = null
  this.ctx           = ctx

  // PROGRAMS
  this.createProgram = function () {
    var program = ctx.createProgram()

    this.programs.set(program, new ProgramState)
    return program
  }

  this.deleteProgram = function (program) {
    if (this.programs.delete(program)) ctx.deleteProgram(program)
  }

  this.linkProgram = function (program) {
    var pState = this.programs.get(program)
    var numUniforms
    var numAttributes
    var uName
    var aName

    ctx.linkProgram(program)

    numAttributes                = ctx.getProgramParameter(program, ctx.ACTIVE_ATTRIBUTES)
    numUniforms                  = ctx.getProgramParameter(program, ctx.ACTIVE_UNIFORMS)
    pState.activeAttributesCount = numAttributes
    pState.activeUniformsCount   = numUniforms

    for (var i = 0; i < numAttributes; ++i) {
      aName                    = ctx.getActiveAttrib(program, i).name
      pState.attributes[aName] = ctx.getAttribLocation(program, aName)
    }

    for (var j = 0; j < numUniforms; ++j) {
      uName                  = ctx.getActiveUniform(program, j).name
      pState.uniforms[uName] = ctx.getUniformLocation(program, uName)
    }

    pState.linked = ctx.getProgramParameter(program, ctx.LINK_STATUS)
  }

  this.validateProgram = function (program) {
    var pState = this.programs.get(program) 

    if (!pState.validated) {
      ctx.validateProgram(program)  
      pState.validated = ctx.getProgramParameter(program, ctx.VALIDATE_STATUS)
    }
  }

  this.useProgram = function (program) {
    if (this.activeProgram !== program) {
      ctx.useProgram(program)
      this.activeProgram = program
    }
  }

  this.attachShader = function (program, shader) {
    var pState = this.programs.get(program)
    var sState = this.shaders.get(shader)  

    if      (sState.type === ctx.VERTEX_SHADER && 
             pState.attachedShaders.vertex !== shader) {
      ctx.attachShader(program, shader)
      pState.attachedShaders.vertex = shader
    }
    else if (sState.type === ctx.FRAGMENT_SHADER && 
             pState.attachedShaders.fragment !== shader) {
      ctx.attachShader(program, shader)
      pState.attachedShaders.fragment = shader
    }
  }

  this.detachShader = function (program, shader) {
    var pState     = this.programs.get(program)
    var sState     = this.shaders.get(shader)
    var shaderType = sState.type === ctx.VERTEX_SHADER ? vertex : fragment

    if (pState.attachedShaders[shaderType] === shader) {
      ctx.detachShader(program, shader)
      pState.attachedShaders[shaderType] = null
    }
  }
  
  // PROGRAMS -- END
  
  // SHADERS
  this.createShader = function createShader (type) {
    var shader = ctx.createShader(type)

    this.shaders.set(shader, new ShaderState(type))
    return shader
  }

  this.deleteShader = function (shader) {
    if (this.shaders.delete(shader)) ctx.deleteShader(shader)
  }

  this.compileShader = function compileShader (shader) {
    var sState   = this.shaders.get(shader)

    if (!sState.compiled) {
      ctx.compileShader(shader) 
      sState.compiled = ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)
    }
  }

  this.shaderSource = function (shader, src) {
    var sState = this.shaders.get(shader)

    if (src !== sState.src) {
      ctx.shaderSource(shader, src) 
      sState.src = src
    }
  }

  //proxy anything NOT defined above through to the underlying context.
  for (var prop in ctx) {
    if (!this[prop]) {
      if (ctx[prop] instanceof Function) proxyFn(this, ctx, prop) 
      else                               proxyValue(this, ctx, prop)
    }
  }
  // SHADERS -- END
}

},{}],76:[function(require,module,exports){
module.exports.randomBound  = randomBound
module.exports.randomVector = randomVector

function randomBound (min, max) {
  return Math.random () * (max - min) + min
}

function randomVector (vectorSize, min, max) {
  for (var vec = [], i = 0; i < vectorSize; i++) vec.push(randomBound(min, max))

  return vec
}

},{}],77:[function(require,module,exports){
var GLShader = require("./GLShader")

module.exports = GLProgram

function eitherInstanceOf (ctor, v1, v2) {
  return ((v1 instanceof ctor) || (v2 instanceof ctor)) ? true : false
}

function combineErrors (v1, v2) {
  return new Error((v1.message || "") + "\n" + (v2.message || ""))
}

function GLProgram (gl, vs, fs) {
  var program       = gl.createProgram(vs, fs)
  var attributes    = {}
  var uniforms      = {}
  var numAttributes
  var numUniforms
  var aName
  var uName

  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)

  numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES)
  numUniforms   = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)

  for (var i = 0; i < numAttributes; ++i) {
    aName             = gl.getActiveAttrib(program, i).name
    attributes[aName] = gl.getAttribLocation(program, aName)
    gl.enableVertexAttribArray(attributes[aName])
  }

  for (var j = 0; j < numUniforms; ++j) {
    uName           = gl.getActiveUniform(program, j).name
    uniforms[uName] = gl.getUniformLocation(program, uName)
  }

  this.program    = program
  this.uniforms   = uniforms
  this.attributes = attributes
}

//GLContext -> String -> String -> Either Error | GLProgram
GLProgram.fromSource = function (gl, vSrc, fSrc) {
  var vShader = new GLShader(gl, gl.VERTEX_SHADER, vSrc)
  var fShader = new GLShader(gl, gl.FRAGMENT_SHADER, fSrc)

  return (eitherInstanceOf(Error, vShader, fShader))
    ? combineErrors(vShader, fShader)
    : new GLProgram(gl, vShader, fShader)
}

},{"./GLShader":79}],78:[function(require,module,exports){
module.exports = GLRenderTarget

function GLRenderTarget (gl, width, height, data) {
  var texture = gl.createTexture()
  var handle  = gl.createFramebuffer()

  //configure the texture and upload the data
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.FLOAT, data)
  gl.bindTexture(gl.TEXTURE_2D, null)

  gl.bindFramebuffer(gl.FRAMEBUFFER, handle)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D,
                          texture, 0)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)

  this.handle  = handle
  this.width   = width
  this.height  = height
  this.texture = texture
}

},{}],79:[function(require,module,exports){
module.exports = GLShader

//GLContext -> Enum -> String -> Either GLShader | Error
function GLShader (gl, type, src) {
  var shader  = gl.createShader(type)

  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS)
    ? shader
    : new Error(gl.getShaderInfoLog(shader))
}

},{}]},{},[73])
<<<<<<< HEAD
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9hZGpvaW50LmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvY2xvbmUuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9jb3B5LmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvZGV0ZXJtaW5hbnQuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9mcm9tUXVhdC5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L2Zyb21Sb3RhdGlvblRyYW5zbGF0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvZnJ1c3R1bS5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L2lkZW50aXR5LmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9pbnZlcnQuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9sb29rQXQuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9tdWx0aXBseS5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L29ydGhvLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvcGVyc3BlY3RpdmUuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9wZXJzcGVjdGl2ZUZyb21GaWVsZE9mVmlldy5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L3JvdGF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L3JvdGF0ZVguanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9yb3RhdGVZLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvcm90YXRlWi5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L3NjYWxlLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvc3RyLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvdHJhbnNsYXRlLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvdHJhbnNwb3NlLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvYWRkLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvYW5nbGUuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9jbG9uZS5qcyIsIm5vZGVfbW9kdWxlcy9nbC12ZWMzL2NvcHkuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9jcm9zcy5qcyIsIm5vZGVfbW9kdWxlcy9nbC12ZWMzL2Rpc3RhbmNlLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvZGl2aWRlLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvZG90LmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvZm9yRWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9nbC12ZWMzL2Zyb21WYWx1ZXMuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9nbC12ZWMzL2ludmVyc2UuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9sZW5ndGguanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9sZXJwLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvbWF4LmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvbWluLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvbXVsdGlwbHkuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9uZWdhdGUuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9ub3JtYWxpemUuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9yYW5kb20uanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9yb3RhdGVYLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvcm90YXRlWS5qcyIsIm5vZGVfbW9kdWxlcy9nbC12ZWMzL3JvdGF0ZVouanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9zY2FsZS5qcyIsIm5vZGVfbW9kdWxlcy9nbC12ZWMzL3NjYWxlQW5kQWRkLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvc2V0LmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvc3F1YXJlZERpc3RhbmNlLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvc3F1YXJlZExlbmd0aC5qcyIsIm5vZGVfbW9kdWxlcy9nbC12ZWMzL3N1YnRyYWN0LmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvdHJhbnNmb3JtTWF0My5qcyIsIm5vZGVfbW9kdWxlcy9nbC12ZWMzL3RyYW5zZm9ybU1hdDQuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy90cmFuc2Zvcm1RdWF0LmpzIiwic3JjL0NhbWVyYS5qcyIsInNyYy9DbG9jay5qcyIsInNyYy9HTFNoZWxsLmpzIiwic3JjL0dQVVBhcnRpY2xlU3lzdGVtLmpzIiwic3JjL0dhbWVwYWRNYW5hZ2VyLmpzIiwic3JjL0tleWJvYXJkTWFuYWdlci5qcyIsInNyYy9TY3JlZW5RdWFkLmpzIiwic3JjL2Fzc2VtYmxpZXMvQXR0cmFjdG9yLmpzIiwic3JjL2Fzc2VtYmxpZXMvR1BVUGFydGljbGVFbWl0dGVyLmpzIiwic3JjL2Fzc2VtYmxpZXMvUG9pbnRMaWdodC5qcyIsInNyYy9jb21wb25lbnRzL0F0dHJhY3RpdmUuanMiLCJzcmMvY29tcG9uZW50cy9HUFVFbWl0dGVyLmpzIiwic3JjL2NvbXBvbmVudHMvTGlnaHQuanMiLCJzcmMvY29tcG9uZW50cy9QaHlzaWNzLmpzIiwic3JjL2RvbS11dGlscy5qcyIsInNyYy9ncHUtcGFydGljbGVzLmpzIiwic3JjL21hdHJpeC11dGlscy5qcyIsInNyYy9yYW5kb20tdXRpbHMuanMiLCJzcmMvdHlwZXMvR0xQcm9ncmFtLmpzIiwic3JjL3R5cGVzL0dMUmVuZGVyVGFyZ2V0LmpzIiwic3JjL3R5cGVzL0dMU2hhZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBhZGpvaW50O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gYWRqb2ludChvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XTtcblxuICAgIG91dFswXSAgPSAgKGExMSAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIxICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgKyBhMzEgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSk7XG4gICAgb3V0WzFdICA9IC0oYTAxICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjEgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMSAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpKTtcbiAgICBvdXRbMl0gID0gIChhMDEgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSAtIGExMSAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMxICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICAgIG91dFszXSAgPSAtKGEwMSAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTExICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjEgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgb3V0WzRdICA9IC0oYTEwICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjAgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSArIGEzMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpKTtcbiAgICBvdXRbNV0gID0gIChhMDAgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMCAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMwICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikpO1xuICAgIG91dFs2XSAgPSAtKGEwMCAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpIC0gYTEwICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgb3V0WzddICA9ICAoYTAwICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikgLSBhMTAgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSArIGEyMCAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcbiAgICBvdXRbOF0gID0gIChhMTAgKiAoYTIxICogYTMzIC0gYTIzICogYTMxKSAtIGEyMCAqIChhMTEgKiBhMzMgLSBhMTMgKiBhMzEpICsgYTMwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSkpO1xuICAgIG91dFs5XSAgPSAtKGEwMCAqIChhMjEgKiBhMzMgLSBhMjMgKiBhMzEpIC0gYTIwICogKGEwMSAqIGEzMyAtIGEwMyAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSk7XG4gICAgb3V0WzEwXSA9ICAoYTAwICogKGExMSAqIGEzMyAtIGExMyAqIGEzMSkgLSBhMTAgKiAoYTAxICogYTMzIC0gYTAzICogYTMxKSArIGEzMCAqIChhMDEgKiBhMTMgLSBhMDMgKiBhMTEpKTtcbiAgICBvdXRbMTFdID0gLShhMDAgKiAoYTExICogYTIzIC0gYTEzICogYTIxKSAtIGExMCAqIChhMDEgKiBhMjMgLSBhMDMgKiBhMjEpICsgYTIwICogKGEwMSAqIGExMyAtIGEwMyAqIGExMSkpO1xuICAgIG91dFsxMl0gPSAtKGExMCAqIChhMjEgKiBhMzIgLSBhMjIgKiBhMzEpIC0gYTIwICogKGExMSAqIGEzMiAtIGExMiAqIGEzMSkgKyBhMzAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSk7XG4gICAgb3V0WzEzXSA9ICAoYTAwICogKGEyMSAqIGEzMiAtIGEyMiAqIGEzMSkgLSBhMjAgKiAoYTAxICogYTMyIC0gYTAyICogYTMxKSArIGEzMCAqIChhMDEgKiBhMjIgLSBhMDIgKiBhMjEpKTtcbiAgICBvdXRbMTRdID0gLShhMDAgKiAoYTExICogYTMyIC0gYTEyICogYTMxKSAtIGExMCAqIChhMDEgKiBhMzIgLSBhMDIgKiBhMzEpICsgYTMwICogKGEwMSAqIGExMiAtIGEwMiAqIGExMSkpO1xuICAgIG91dFsxNV0gPSAgKGEwMCAqIChhMTEgKiBhMjIgLSBhMTIgKiBhMjEpIC0gYTEwICogKGEwMSAqIGEyMiAtIGEwMiAqIGEyMSkgKyBhMjAgKiAoYTAxICogYTEyIC0gYTAyICogYTExKSk7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBjbG9uZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDR9IGEgbWF0cml4IHRvIGNsb25lXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICovXG5mdW5jdGlvbiBjbG9uZShhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIG91dFs5XSA9IGFbOV07XG4gICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgIG91dFsxMV0gPSBhWzExXTtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBjb3B5O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBtYXQ0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGNvcHkob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgb3V0WzldID0gYVs5XTtcbiAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgb3V0WzExXSA9IGFbMTFdO1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDRcbiAqXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICovXG5mdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAxO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDE7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBkZXRlcm1pbmFudDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAqL1xuZnVuY3Rpb24gZGV0ZXJtaW5hbnQoYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLCBhMTEgPSBhWzVdLCBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLCBhMjEgPSBhWzldLCBhMjIgPSBhWzEwXSwgYTIzID0gYVsxMV0sXG4gICAgICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdLFxuXG4gICAgICAgIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMCxcbiAgICAgICAgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwLFxuICAgICAgICBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTAsXG4gICAgICAgIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMSxcbiAgICAgICAgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExLFxuICAgICAgICBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTIsXG4gICAgICAgIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMCxcbiAgICAgICAgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwLFxuICAgICAgICBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzAsXG4gICAgICAgIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMSxcbiAgICAgICAgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxLFxuICAgICAgICBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgcmV0dXJuIGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmcm9tUXVhdDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBmcm9tUXVhdChvdXQsIHEpIHtcbiAgICB2YXIgeCA9IHFbMF0sIHkgPSBxWzFdLCB6ID0gcVsyXSwgdyA9IHFbM10sXG4gICAgICAgIHgyID0geCArIHgsXG4gICAgICAgIHkyID0geSArIHksXG4gICAgICAgIHoyID0geiArIHosXG5cbiAgICAgICAgeHggPSB4ICogeDIsXG4gICAgICAgIHl4ID0geSAqIHgyLFxuICAgICAgICB5eSA9IHkgKiB5MixcbiAgICAgICAgenggPSB6ICogeDIsXG4gICAgICAgIHp5ID0geiAqIHkyLFxuICAgICAgICB6eiA9IHogKiB6MixcbiAgICAgICAgd3ggPSB3ICogeDIsXG4gICAgICAgIHd5ID0gdyAqIHkyLFxuICAgICAgICB3eiA9IHcgKiB6MjtcblxuICAgIG91dFswXSA9IDEgLSB5eSAtIHp6O1xuICAgIG91dFsxXSA9IHl4ICsgd3o7XG4gICAgb3V0WzJdID0genggLSB3eTtcbiAgICBvdXRbM10gPSAwO1xuXG4gICAgb3V0WzRdID0geXggLSB3ejtcbiAgICBvdXRbNV0gPSAxIC0geHggLSB6ejtcbiAgICBvdXRbNl0gPSB6eSArIHd4O1xuICAgIG91dFs3XSA9IDA7XG5cbiAgICBvdXRbOF0gPSB6eCArIHd5O1xuICAgIG91dFs5XSA9IHp5IC0gd3g7XG4gICAgb3V0WzEwXSA9IDEgLSB4eCAtIHl5O1xuICAgIG91dFsxMV0gPSAwO1xuXG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG5cbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHF1YXRlcm5pb24gcm90YXRpb24gYW5kIHZlY3RvciB0cmFuc2xhdGlvblxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgdmVjKTtcbiAqICAgICB2YXIgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XG4gKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xuICogICAgIG1hdDQubXVsdGlwbHkoZGVzdCwgcXVhdE1hdCk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3ZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uKG91dCwgcSwgdikge1xuICAgIC8vIFF1YXRlcm5pb24gbWF0aFxuICAgIHZhciB4ID0gcVswXSwgeSA9IHFbMV0sIHogPSBxWzJdLCB3ID0gcVszXSxcbiAgICAgICAgeDIgPSB4ICsgeCxcbiAgICAgICAgeTIgPSB5ICsgeSxcbiAgICAgICAgejIgPSB6ICsgeixcblxuICAgICAgICB4eCA9IHggKiB4MixcbiAgICAgICAgeHkgPSB4ICogeTIsXG4gICAgICAgIHh6ID0geCAqIHoyLFxuICAgICAgICB5eSA9IHkgKiB5MixcbiAgICAgICAgeXogPSB5ICogejIsXG4gICAgICAgIHp6ID0geiAqIHoyLFxuICAgICAgICB3eCA9IHcgKiB4MixcbiAgICAgICAgd3kgPSB3ICogeTIsXG4gICAgICAgIHd6ID0gdyAqIHoyO1xuXG4gICAgb3V0WzBdID0gMSAtICh5eSArIHp6KTtcbiAgICBvdXRbMV0gPSB4eSArIHd6O1xuICAgIG91dFsyXSA9IHh6IC0gd3k7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSB4eSAtIHd6O1xuICAgIG91dFs1XSA9IDEgLSAoeHggKyB6eik7XG4gICAgb3V0WzZdID0geXogKyB3eDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IHh6ICsgd3k7XG4gICAgb3V0WzldID0geXogLSB3eDtcbiAgICBvdXRbMTBdID0gMSAtICh4eCArIHl5KTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gdlswXTtcbiAgICBvdXRbMTNdID0gdlsxXTtcbiAgICBvdXRbMTRdID0gdlsyXTtcbiAgICBvdXRbMTVdID0gMTtcbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZydXN0dW07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgZnJ1c3R1bSBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtOdW1iZXJ9IGxlZnQgTGVmdCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IHJpZ2h0IFJpZ2h0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gYm90dG9tIEJvdHRvbSBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IHRvcCBUb3AgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGZydXN0dW0ob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICAgIHZhciBybCA9IDEgLyAocmlnaHQgLSBsZWZ0KSxcbiAgICAgICAgdGIgPSAxIC8gKHRvcCAtIGJvdHRvbSksXG4gICAgICAgIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSAobmVhciAqIDIpICogcmw7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAobmVhciAqIDIpICogdGI7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IChyaWdodCArIGxlZnQpICogcmw7XG4gICAgb3V0WzldID0gKHRvcCArIGJvdHRvbSkgKiB0YjtcbiAgICBvdXRbMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzExXSA9IC0xO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAoZmFyICogbmVhciAqIDIpICogbmY7XG4gICAgb3V0WzE1XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcblxuLyoqXG4gKiBTZXQgYSBtYXQ0IHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBpZGVudGl0eShvdXQpIHtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMTtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAxO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGU6IHJlcXVpcmUoJy4vY3JlYXRlJylcbiAgLCBjbG9uZTogcmVxdWlyZSgnLi9jbG9uZScpXG4gICwgY29weTogcmVxdWlyZSgnLi9jb3B5JylcbiAgLCBpZGVudGl0eTogcmVxdWlyZSgnLi9pZGVudGl0eScpXG4gICwgdHJhbnNwb3NlOiByZXF1aXJlKCcuL3RyYW5zcG9zZScpXG4gICwgaW52ZXJ0OiByZXF1aXJlKCcuL2ludmVydCcpXG4gICwgYWRqb2ludDogcmVxdWlyZSgnLi9hZGpvaW50JylcbiAgLCBkZXRlcm1pbmFudDogcmVxdWlyZSgnLi9kZXRlcm1pbmFudCcpXG4gICwgbXVsdGlwbHk6IHJlcXVpcmUoJy4vbXVsdGlwbHknKVxuICAsIHRyYW5zbGF0ZTogcmVxdWlyZSgnLi90cmFuc2xhdGUnKVxuICAsIHNjYWxlOiByZXF1aXJlKCcuL3NjYWxlJylcbiAgLCByb3RhdGU6IHJlcXVpcmUoJy4vcm90YXRlJylcbiAgLCByb3RhdGVYOiByZXF1aXJlKCcuL3JvdGF0ZVgnKVxuICAsIHJvdGF0ZVk6IHJlcXVpcmUoJy4vcm90YXRlWScpXG4gICwgcm90YXRlWjogcmVxdWlyZSgnLi9yb3RhdGVaJylcbiAgLCBmcm9tUm90YXRpb25UcmFuc2xhdGlvbjogcmVxdWlyZSgnLi9mcm9tUm90YXRpb25UcmFuc2xhdGlvbicpXG4gICwgZnJvbVF1YXQ6IHJlcXVpcmUoJy4vZnJvbVF1YXQnKVxuICAsIGZydXN0dW06IHJlcXVpcmUoJy4vZnJ1c3R1bScpXG4gICwgcGVyc3BlY3RpdmU6IHJlcXVpcmUoJy4vcGVyc3BlY3RpdmUnKVxuICAsIHBlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3OiByZXF1aXJlKCcuL3BlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3JylcbiAgLCBvcnRobzogcmVxdWlyZSgnLi9vcnRobycpXG4gICwgbG9va0F0OiByZXF1aXJlKCcuL2xvb2tBdCcpXG4gICwgc3RyOiByZXF1aXJlKCcuL3N0cicpXG59IiwibW9kdWxlLmV4cG9ydHMgPSBpbnZlcnQ7XG5cbi8qKlxuICogSW52ZXJ0cyBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGludmVydChvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XSxcblxuICAgICAgICBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsXG4gICAgICAgIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMCxcbiAgICAgICAgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwLFxuICAgICAgICBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTEsXG4gICAgICAgIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSxcbiAgICAgICAgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyLFxuICAgICAgICBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsXG4gICAgICAgIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMCxcbiAgICAgICAgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwLFxuICAgICAgICBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzEsXG4gICAgICAgIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSxcbiAgICAgICAgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyLFxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gICAgaWYgKCFkZXQpIHsgXG4gICAgICAgIHJldHVybiBudWxsOyBcbiAgICB9XG4gICAgZGV0ID0gMS4wIC8gZGV0O1xuXG4gICAgb3V0WzBdID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzFdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XG4gICAgb3V0WzNdID0gKGEyMiAqIGIwNCAtIGEyMSAqIGIwNSAtIGEyMyAqIGIwMykgKiBkZXQ7XG4gICAgb3V0WzRdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzVdID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzZdID0gKGEzMiAqIGIwMiAtIGEzMCAqIGIwNSAtIGEzMyAqIGIwMSkgKiBkZXQ7XG4gICAgb3V0WzddID0gKGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMSkgKiBkZXQ7XG4gICAgb3V0WzhdID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzldID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzEwXSA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xuICAgIG91dFsxMV0gPSAoYTIxICogYjAyIC0gYTIwICogYjA0IC0gYTIzICogYjAwKSAqIGRldDtcbiAgICBvdXRbMTJdID0gKGExMSAqIGIwNyAtIGExMCAqIGIwOSAtIGExMiAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzEzXSA9IChhMDAgKiBiMDkgLSBhMDEgKiBiMDcgKyBhMDIgKiBiMDYpICogZGV0O1xuICAgIG91dFsxNF0gPSAoYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwKSAqIGRldDtcbiAgICBvdXRbMTVdID0gKGEyMCAqIGIwMyAtIGEyMSAqIGIwMSArIGEyMiAqIGIwMCkgKiBkZXQ7XG5cbiAgICByZXR1cm4gb3V0O1xufTsiLCJ2YXIgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbG9va0F0O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGxvb2stYXQgbWF0cml4IHdpdGggdGhlIGdpdmVuIGV5ZSBwb3NpdGlvbiwgZm9jYWwgcG9pbnQsIGFuZCB1cCBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHt2ZWMzfSBleWUgUG9zaXRpb24gb2YgdGhlIHZpZXdlclxuICogQHBhcmFtIHt2ZWMzfSBjZW50ZXIgUG9pbnQgdGhlIHZpZXdlciBpcyBsb29raW5nIGF0XG4gKiBAcGFyYW0ge3ZlYzN9IHVwIHZlYzMgcG9pbnRpbmcgdXBcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gbG9va0F0KG91dCwgZXllLCBjZW50ZXIsIHVwKSB7XG4gICAgdmFyIHgwLCB4MSwgeDIsIHkwLCB5MSwgeTIsIHowLCB6MSwgejIsIGxlbixcbiAgICAgICAgZXlleCA9IGV5ZVswXSxcbiAgICAgICAgZXlleSA9IGV5ZVsxXSxcbiAgICAgICAgZXlleiA9IGV5ZVsyXSxcbiAgICAgICAgdXB4ID0gdXBbMF0sXG4gICAgICAgIHVweSA9IHVwWzFdLFxuICAgICAgICB1cHogPSB1cFsyXSxcbiAgICAgICAgY2VudGVyeCA9IGNlbnRlclswXSxcbiAgICAgICAgY2VudGVyeSA9IGNlbnRlclsxXSxcbiAgICAgICAgY2VudGVyeiA9IGNlbnRlclsyXTtcblxuICAgIGlmIChNYXRoLmFicyhleWV4IC0gY2VudGVyeCkgPCAwLjAwMDAwMSAmJlxuICAgICAgICBNYXRoLmFicyhleWV5IC0gY2VudGVyeSkgPCAwLjAwMDAwMSAmJlxuICAgICAgICBNYXRoLmFicyhleWV6IC0gY2VudGVyeikgPCAwLjAwMDAwMSkge1xuICAgICAgICByZXR1cm4gaWRlbnRpdHkob3V0KTtcbiAgICB9XG5cbiAgICB6MCA9IGV5ZXggLSBjZW50ZXJ4O1xuICAgIHoxID0gZXlleSAtIGNlbnRlcnk7XG4gICAgejIgPSBleWV6IC0gY2VudGVyejtcblxuICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQoejAgKiB6MCArIHoxICogejEgKyB6MiAqIHoyKTtcbiAgICB6MCAqPSBsZW47XG4gICAgejEgKj0gbGVuO1xuICAgIHoyICo9IGxlbjtcblxuICAgIHgwID0gdXB5ICogejIgLSB1cHogKiB6MTtcbiAgICB4MSA9IHVweiAqIHowIC0gdXB4ICogejI7XG4gICAgeDIgPSB1cHggKiB6MSAtIHVweSAqIHowO1xuICAgIGxlbiA9IE1hdGguc3FydCh4MCAqIHgwICsgeDEgKiB4MSArIHgyICogeDIpO1xuICAgIGlmICghbGVuKSB7XG4gICAgICAgIHgwID0gMDtcbiAgICAgICAgeDEgPSAwO1xuICAgICAgICB4MiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgeDAgKj0gbGVuO1xuICAgICAgICB4MSAqPSBsZW47XG4gICAgICAgIHgyICo9IGxlbjtcbiAgICB9XG5cbiAgICB5MCA9IHoxICogeDIgLSB6MiAqIHgxO1xuICAgIHkxID0gejIgKiB4MCAtIHowICogeDI7XG4gICAgeTIgPSB6MCAqIHgxIC0gejEgKiB4MDtcblxuICAgIGxlbiA9IE1hdGguc3FydCh5MCAqIHkwICsgeTEgKiB5MSArIHkyICogeTIpO1xuICAgIGlmICghbGVuKSB7XG4gICAgICAgIHkwID0gMDtcbiAgICAgICAgeTEgPSAwO1xuICAgICAgICB5MiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgeTAgKj0gbGVuO1xuICAgICAgICB5MSAqPSBsZW47XG4gICAgICAgIHkyICo9IGxlbjtcbiAgICB9XG5cbiAgICBvdXRbMF0gPSB4MDtcbiAgICBvdXRbMV0gPSB5MDtcbiAgICBvdXRbMl0gPSB6MDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IHgxO1xuICAgIG91dFs1XSA9IHkxO1xuICAgIG91dFs2XSA9IHoxO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0geDI7XG4gICAgb3V0WzldID0geTI7XG4gICAgb3V0WzEwXSA9IHoyO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAtKHgwICogZXlleCArIHgxICogZXlleSArIHgyICogZXlleik7XG4gICAgb3V0WzEzXSA9IC0oeTAgKiBleWV4ICsgeTEgKiBleWV5ICsgeTIgKiBleWV6KTtcbiAgICBvdXRbMTRdID0gLSh6MCAqIGV5ZXggKyB6MSAqIGV5ZXkgKyB6MiAqIGV5ZXopO1xuICAgIG91dFsxNV0gPSAxO1xuXG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBtdWx0aXBseTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBtYXQ0J3NcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge21hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLCBhMTEgPSBhWzVdLCBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLCBhMjEgPSBhWzldLCBhMjIgPSBhWzEwXSwgYTIzID0gYVsxMV0sXG4gICAgICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdO1xuXG4gICAgLy8gQ2FjaGUgb25seSB0aGUgY3VycmVudCBsaW5lIG9mIHRoZSBzZWNvbmQgbWF0cml4XG4gICAgdmFyIGIwICA9IGJbMF0sIGIxID0gYlsxXSwgYjIgPSBiWzJdLCBiMyA9IGJbM107ICBcbiAgICBvdXRbMF0gPSBiMCphMDAgKyBiMSphMTAgKyBiMiphMjAgKyBiMyphMzA7XG4gICAgb3V0WzFdID0gYjAqYTAxICsgYjEqYTExICsgYjIqYTIxICsgYjMqYTMxO1xuICAgIG91dFsyXSA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXRbM10gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG5cbiAgICBiMCA9IGJbNF07IGIxID0gYls1XTsgYjIgPSBiWzZdOyBiMyA9IGJbN107XG4gICAgb3V0WzRdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFs1XSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbNl0gPSBiMCphMDIgKyBiMSphMTIgKyBiMiphMjIgKyBiMyphMzI7XG4gICAgb3V0WzddID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgYjAgPSBiWzhdOyBiMSA9IGJbOV07IGIyID0gYlsxMF07IGIzID0gYlsxMV07XG4gICAgb3V0WzhdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFs5XSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbMTBdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFsxMV0gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG5cbiAgICBiMCA9IGJbMTJdOyBiMSA9IGJbMTNdOyBiMiA9IGJbMTRdOyBiMyA9IGJbMTVdO1xuICAgIG91dFsxMl0gPSBiMCphMDAgKyBiMSphMTAgKyBiMiphMjAgKyBiMyphMzA7XG4gICAgb3V0WzEzXSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbMTRdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFsxNV0gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBvcnRobztcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBvcnRob2dvbmFsIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSByaWdodCBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBvcnRobyhvdXQsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XG4gICAgdmFyIGxyID0gMSAvIChsZWZ0IC0gcmlnaHQpLFxuICAgICAgICBidCA9IDEgLyAoYm90dG9tIC0gdG9wKSxcbiAgICAgICAgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFswXSA9IC0yICogbHI7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAtMiAqIGJ0O1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDIgKiBuZjtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gKGxlZnQgKyByaWdodCkgKiBscjtcbiAgICBvdXRbMTNdID0gKHRvcCArIGJvdHRvbSkgKiBidDtcbiAgICBvdXRbMTRdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBwZXJzcGVjdGl2ZTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge251bWJlcn0gZm92eSBWZXJ0aWNhbCBmaWVsZCBvZiB2aWV3IGluIHJhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBhc3BlY3QgQXNwZWN0IHJhdGlvLiB0eXBpY2FsbHkgdmlld3BvcnQgd2lkdGgvaGVpZ2h0XG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBwZXJzcGVjdGl2ZShvdXQsIGZvdnksIGFzcGVjdCwgbmVhciwgZmFyKSB7XG4gICAgdmFyIGYgPSAxLjAgLyBNYXRoLnRhbihmb3Z5IC8gMiksXG4gICAgICAgIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSBmIC8gYXNwZWN0O1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gZjtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICBvdXRbMTFdID0gLTE7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9ICgyICogZmFyICogbmVhcikgKiBuZjtcbiAgICBvdXRbMTVdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHBlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGZpZWxkIG9mIHZpZXcuXG4gKiBUaGlzIGlzIHByaW1hcmlseSB1c2VmdWwgZm9yIGdlbmVyYXRpbmcgcHJvamVjdGlvbiBtYXRyaWNlcyB0byBiZSB1c2VkXG4gKiB3aXRoIHRoZSBzdGlsbCBleHBlcmllbWVudGFsIFdlYlZSIEFQSS5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge251bWJlcn0gZm92IE9iamVjdCBjb250YWluaW5nIHRoZSBmb2xsb3dpbmcgdmFsdWVzOiB1cERlZ3JlZXMsIGRvd25EZWdyZWVzLCBsZWZ0RGVncmVlcywgcmlnaHREZWdyZWVzXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBwZXJzcGVjdGl2ZUZyb21GaWVsZE9mVmlldyhvdXQsIGZvdiwgbmVhciwgZmFyKSB7XG4gICAgdmFyIHVwVGFuID0gTWF0aC50YW4oZm92LnVwRGVncmVlcyAqIE1hdGguUEkvMTgwLjApLFxuICAgICAgICBkb3duVGFuID0gTWF0aC50YW4oZm92LmRvd25EZWdyZWVzICogTWF0aC5QSS8xODAuMCksXG4gICAgICAgIGxlZnRUYW4gPSBNYXRoLnRhbihmb3YubGVmdERlZ3JlZXMgKiBNYXRoLlBJLzE4MC4wKSxcbiAgICAgICAgcmlnaHRUYW4gPSBNYXRoLnRhbihmb3YucmlnaHREZWdyZWVzICogTWF0aC5QSS8xODAuMCksXG4gICAgICAgIHhTY2FsZSA9IDIuMCAvIChsZWZ0VGFuICsgcmlnaHRUYW4pLFxuICAgICAgICB5U2NhbGUgPSAyLjAgLyAodXBUYW4gKyBkb3duVGFuKTtcblxuICAgIG91dFswXSA9IHhTY2FsZTtcbiAgICBvdXRbMV0gPSAwLjA7XG4gICAgb3V0WzJdID0gMC4wO1xuICAgIG91dFszXSA9IDAuMDtcbiAgICBvdXRbNF0gPSAwLjA7XG4gICAgb3V0WzVdID0geVNjYWxlO1xuICAgIG91dFs2XSA9IDAuMDtcbiAgICBvdXRbN10gPSAwLjA7XG4gICAgb3V0WzhdID0gLSgobGVmdFRhbiAtIHJpZ2h0VGFuKSAqIHhTY2FsZSAqIDAuNSk7XG4gICAgb3V0WzldID0gKCh1cFRhbiAtIGRvd25UYW4pICogeVNjYWxlICogMC41KTtcbiAgICBvdXRbMTBdID0gZmFyIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFsxMV0gPSAtMS4wO1xuICAgIG91dFsxMl0gPSAwLjA7XG4gICAgb3V0WzEzXSA9IDAuMDtcbiAgICBvdXRbMTRdID0gKGZhciAqIG5lYXIpIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFsxNV0gPSAwLjA7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuIiwibW9kdWxlLmV4cG9ydHMgPSByb3RhdGU7XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdDQgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEBwYXJhbSB7dmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHJvdGF0ZShvdXQsIGEsIHJhZCwgYXhpcykge1xuICAgIHZhciB4ID0gYXhpc1swXSwgeSA9IGF4aXNbMV0sIHogPSBheGlzWzJdLFxuICAgICAgICBsZW4gPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KSxcbiAgICAgICAgcywgYywgdCxcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXG4gICAgICAgIGEyMCwgYTIxLCBhMjIsIGEyMyxcbiAgICAgICAgYjAwLCBiMDEsIGIwMixcbiAgICAgICAgYjEwLCBiMTEsIGIxMixcbiAgICAgICAgYjIwLCBiMjEsIGIyMjtcblxuICAgIGlmIChNYXRoLmFicyhsZW4pIDwgMC4wMDAwMDEpIHsgcmV0dXJuIG51bGw7IH1cbiAgICBcbiAgICBsZW4gPSAxIC8gbGVuO1xuICAgIHggKj0gbGVuO1xuICAgIHkgKj0gbGVuO1xuICAgIHogKj0gbGVuO1xuXG4gICAgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgdCA9IDEgLSBjO1xuXG4gICAgYTAwID0gYVswXTsgYTAxID0gYVsxXTsgYTAyID0gYVsyXTsgYTAzID0gYVszXTtcbiAgICBhMTAgPSBhWzRdOyBhMTEgPSBhWzVdOyBhMTIgPSBhWzZdOyBhMTMgPSBhWzddO1xuICAgIGEyMCA9IGFbOF07IGEyMSA9IGFbOV07IGEyMiA9IGFbMTBdOyBhMjMgPSBhWzExXTtcblxuICAgIC8vIENvbnN0cnVjdCB0aGUgZWxlbWVudHMgb2YgdGhlIHJvdGF0aW9uIG1hdHJpeFxuICAgIGIwMCA9IHggKiB4ICogdCArIGM7IGIwMSA9IHkgKiB4ICogdCArIHogKiBzOyBiMDIgPSB6ICogeCAqIHQgLSB5ICogcztcbiAgICBiMTAgPSB4ICogeSAqIHQgLSB6ICogczsgYjExID0geSAqIHkgKiB0ICsgYzsgYjEyID0geiAqIHkgKiB0ICsgeCAqIHM7XG4gICAgYjIwID0geCAqIHogKiB0ICsgeSAqIHM7IGIyMSA9IHkgKiB6ICogdCAtIHggKiBzOyBiMjIgPSB6ICogeiAqIHQgKyBjO1xuXG4gICAgLy8gUGVyZm9ybSByb3RhdGlvbi1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICBvdXRbMF0gPSBhMDAgKiBiMDAgKyBhMTAgKiBiMDEgKyBhMjAgKiBiMDI7XG4gICAgb3V0WzFdID0gYTAxICogYjAwICsgYTExICogYjAxICsgYTIxICogYjAyO1xuICAgIG91dFsyXSA9IGEwMiAqIGIwMCArIGExMiAqIGIwMSArIGEyMiAqIGIwMjtcbiAgICBvdXRbM10gPSBhMDMgKiBiMDAgKyBhMTMgKiBiMDEgKyBhMjMgKiBiMDI7XG4gICAgb3V0WzRdID0gYTAwICogYjEwICsgYTEwICogYjExICsgYTIwICogYjEyO1xuICAgIG91dFs1XSA9IGEwMSAqIGIxMCArIGExMSAqIGIxMSArIGEyMSAqIGIxMjtcbiAgICBvdXRbNl0gPSBhMDIgKiBiMTAgKyBhMTIgKiBiMTEgKyBhMjIgKiBiMTI7XG4gICAgb3V0WzddID0gYTAzICogYjEwICsgYTEzICogYjExICsgYTIzICogYjEyO1xuICAgIG91dFs4XSA9IGEwMCAqIGIyMCArIGExMCAqIGIyMSArIGEyMCAqIGIyMjtcbiAgICBvdXRbOV0gPSBhMDEgKiBiMjAgKyBhMTEgKiBiMjEgKyBhMjEgKiBiMjI7XG4gICAgb3V0WzEwXSA9IGEwMiAqIGIyMCArIGExMiAqIGIyMSArIGEyMiAqIGIyMjtcbiAgICBvdXRbMTFdID0gYTAzICogYjIwICsgYTEzICogYjIxICsgYTIzICogYjIyO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcm90YXRlWDtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFggYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHJvdGF0ZVgob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpLFxuICAgICAgICBhMTAgPSBhWzRdLFxuICAgICAgICBhMTEgPSBhWzVdLFxuICAgICAgICBhMTIgPSBhWzZdLFxuICAgICAgICBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLFxuICAgICAgICBhMjEgPSBhWzldLFxuICAgICAgICBhMjIgPSBhWzEwXSxcbiAgICAgICAgYTIzID0gYVsxMV07XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICAgICAgb3V0WzBdICA9IGFbMF07XG4gICAgICAgIG91dFsxXSAgPSBhWzFdO1xuICAgICAgICBvdXRbMl0gID0gYVsyXTtcbiAgICAgICAgb3V0WzNdICA9IGFbM107XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzRdID0gYTEwICogYyArIGEyMCAqIHM7XG4gICAgb3V0WzVdID0gYTExICogYyArIGEyMSAqIHM7XG4gICAgb3V0WzZdID0gYTEyICogYyArIGEyMiAqIHM7XG4gICAgb3V0WzddID0gYTEzICogYyArIGEyMyAqIHM7XG4gICAgb3V0WzhdID0gYTIwICogYyAtIGExMCAqIHM7XG4gICAgb3V0WzldID0gYTIxICogYyAtIGExMSAqIHM7XG4gICAgb3V0WzEwXSA9IGEyMiAqIGMgLSBhMTIgKiBzO1xuICAgIG91dFsxMV0gPSBhMjMgKiBjIC0gYTEzICogcztcbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJvdGF0ZVk7XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBZIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiByb3RhdGVZKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKSxcbiAgICAgICAgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXSxcbiAgICAgICAgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgICAgIG91dFs0XSAgPSBhWzRdO1xuICAgICAgICBvdXRbNV0gID0gYVs1XTtcbiAgICAgICAgb3V0WzZdICA9IGFbNl07XG4gICAgICAgIG91dFs3XSAgPSBhWzddO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSA9IGEwMCAqIGMgLSBhMjAgKiBzO1xuICAgIG91dFsxXSA9IGEwMSAqIGMgLSBhMjEgKiBzO1xuICAgIG91dFsyXSA9IGEwMiAqIGMgLSBhMjIgKiBzO1xuICAgIG91dFszXSA9IGEwMyAqIGMgLSBhMjMgKiBzO1xuICAgIG91dFs4XSA9IGEwMCAqIHMgKyBhMjAgKiBjO1xuICAgIG91dFs5XSA9IGEwMSAqIHMgKyBhMjEgKiBjO1xuICAgIG91dFsxMF0gPSBhMDIgKiBzICsgYTIyICogYztcbiAgICBvdXRbMTFdID0gYTAzICogcyArIGEyMyAqIGM7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByb3RhdGVaO1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWiBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gcm90YXRlWihvdXQsIGEsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCksXG4gICAgICAgIGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sXG4gICAgICAgIGExMSA9IGFbNV0sXG4gICAgICAgIGExMiA9IGFbNl0sXG4gICAgICAgIGExMyA9IGFbN107XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XG4gICAgICAgIG91dFs4XSAgPSBhWzhdO1xuICAgICAgICBvdXRbOV0gID0gYVs5XTtcbiAgICAgICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgICAgICBvdXRbMTFdID0gYVsxMV07XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzBdID0gYTAwICogYyArIGExMCAqIHM7XG4gICAgb3V0WzFdID0gYTAxICogYyArIGExMSAqIHM7XG4gICAgb3V0WzJdID0gYTAyICogYyArIGExMiAqIHM7XG4gICAgb3V0WzNdID0gYTAzICogYyArIGExMyAqIHM7XG4gICAgb3V0WzRdID0gYTEwICogYyAtIGEwMCAqIHM7XG4gICAgb3V0WzVdID0gYTExICogYyAtIGEwMSAqIHM7XG4gICAgb3V0WzZdID0gYTEyICogYyAtIGEwMiAqIHM7XG4gICAgb3V0WzddID0gYTEzICogYyAtIGEwMyAqIHM7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBzY2FsZTtcblxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcbiAqIEBwYXJhbSB7dmVjM30gdiB0aGUgdmVjMyB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKiovXG5mdW5jdGlvbiBzY2FsZShvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdLCB6ID0gdlsyXTtcblxuICAgIG91dFswXSA9IGFbMF0gKiB4O1xuICAgIG91dFsxXSA9IGFbMV0gKiB4O1xuICAgIG91dFsyXSA9IGFbMl0gKiB4O1xuICAgIG91dFszXSA9IGFbM10gKiB4O1xuICAgIG91dFs0XSA9IGFbNF0gKiB5O1xuICAgIG91dFs1XSA9IGFbNV0gKiB5O1xuICAgIG91dFs2XSA9IGFbNl0gKiB5O1xuICAgIG91dFs3XSA9IGFbN10gKiB5O1xuICAgIG91dFs4XSA9IGFbOF0gKiB6O1xuICAgIG91dFs5XSA9IGFbOV0gKiB6O1xuICAgIG91dFsxMF0gPSBhWzEwXSAqIHo7XG4gICAgb3V0WzExXSA9IGFbMTFdICogejtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBzdHI7XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG1hdCBtYXRyaXggdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICovXG5mdW5jdGlvbiBzdHIoYSkge1xuICAgIHJldHVybiAnbWF0NCgnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgYVszXSArICcsICcgK1xuICAgICAgICAgICAgICAgICAgICBhWzRdICsgJywgJyArIGFbNV0gKyAnLCAnICsgYVs2XSArICcsICcgKyBhWzddICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgIGFbOF0gKyAnLCAnICsgYVs5XSArICcsICcgKyBhWzEwXSArICcsICcgKyBhWzExXSArICcsICcgKyBcbiAgICAgICAgICAgICAgICAgICAgYVsxMl0gKyAnLCAnICsgYVsxM10gKyAnLCAnICsgYVsxNF0gKyAnLCAnICsgYVsxNV0gKyAnKSc7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gdHJhbnNsYXRlO1xuXG4vKipcbiAqIFRyYW5zbGF0ZSBhIG1hdDQgYnkgdGhlIGdpdmVuIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byB0cmFuc2xhdGVcbiAqIEBwYXJhbSB7dmVjM30gdiB2ZWN0b3IgdG8gdHJhbnNsYXRlIGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHRyYW5zbGF0ZShvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdLCB6ID0gdlsyXSxcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXG4gICAgICAgIGEyMCwgYTIxLCBhMjIsIGEyMztcblxuICAgIGlmIChhID09PSBvdXQpIHtcbiAgICAgICAgb3V0WzEyXSA9IGFbMF0gKiB4ICsgYVs0XSAqIHkgKyBhWzhdICogeiArIGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYVsxXSAqIHggKyBhWzVdICogeSArIGFbOV0gKiB6ICsgYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhWzJdICogeCArIGFbNl0gKiB5ICsgYVsxMF0gKiB6ICsgYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzNdICogeCArIGFbN10gKiB5ICsgYVsxMV0gKiB6ICsgYVsxNV07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYTAwID0gYVswXTsgYTAxID0gYVsxXTsgYTAyID0gYVsyXTsgYTAzID0gYVszXTtcbiAgICAgICAgYTEwID0gYVs0XTsgYTExID0gYVs1XTsgYTEyID0gYVs2XTsgYTEzID0gYVs3XTtcbiAgICAgICAgYTIwID0gYVs4XTsgYTIxID0gYVs5XTsgYTIyID0gYVsxMF07IGEyMyA9IGFbMTFdO1xuXG4gICAgICAgIG91dFswXSA9IGEwMDsgb3V0WzFdID0gYTAxOyBvdXRbMl0gPSBhMDI7IG91dFszXSA9IGEwMztcbiAgICAgICAgb3V0WzRdID0gYTEwOyBvdXRbNV0gPSBhMTE7IG91dFs2XSA9IGExMjsgb3V0WzddID0gYTEzO1xuICAgICAgICBvdXRbOF0gPSBhMjA7IG91dFs5XSA9IGEyMTsgb3V0WzEwXSA9IGEyMjsgb3V0WzExXSA9IGEyMztcblxuICAgICAgICBvdXRbMTJdID0gYTAwICogeCArIGExMCAqIHkgKyBhMjAgKiB6ICsgYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhMDEgKiB4ICsgYTExICogeSArIGEyMSAqIHogKyBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGEwMiAqIHggKyBhMTIgKiB5ICsgYTIyICogeiArIGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYTAzICogeCArIGExMyAqIHkgKyBhMjMgKiB6ICsgYVsxNV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB0cmFuc3Bvc2U7XG5cbi8qKlxuICogVHJhbnNwb3NlIHRoZSB2YWx1ZXMgb2YgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiB0cmFuc3Bvc2Uob3V0LCBhKSB7XG4gICAgLy8gSWYgd2UgYXJlIHRyYW5zcG9zaW5nIG91cnNlbHZlcyB3ZSBjYW4gc2tpcCBhIGZldyBzdGVwcyBidXQgaGF2ZSB0byBjYWNoZSBzb21lIHZhbHVlc1xuICAgIGlmIChvdXQgPT09IGEpIHtcbiAgICAgICAgdmFyIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgICAgICBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICAgICAgYTIzID0gYVsxMV07XG5cbiAgICAgICAgb3V0WzFdID0gYVs0XTtcbiAgICAgICAgb3V0WzJdID0gYVs4XTtcbiAgICAgICAgb3V0WzNdID0gYVsxMl07XG4gICAgICAgIG91dFs0XSA9IGEwMTtcbiAgICAgICAgb3V0WzZdID0gYVs5XTtcbiAgICAgICAgb3V0WzddID0gYVsxM107XG4gICAgICAgIG91dFs4XSA9IGEwMjtcbiAgICAgICAgb3V0WzldID0gYTEyO1xuICAgICAgICBvdXRbMTFdID0gYVsxNF07XG4gICAgICAgIG91dFsxMl0gPSBhMDM7XG4gICAgICAgIG91dFsxM10gPSBhMTM7XG4gICAgICAgIG91dFsxNF0gPSBhMjM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3V0WzBdID0gYVswXTtcbiAgICAgICAgb3V0WzFdID0gYVs0XTtcbiAgICAgICAgb3V0WzJdID0gYVs4XTtcbiAgICAgICAgb3V0WzNdID0gYVsxMl07XG4gICAgICAgIG91dFs0XSA9IGFbMV07XG4gICAgICAgIG91dFs1XSA9IGFbNV07XG4gICAgICAgIG91dFs2XSA9IGFbOV07XG4gICAgICAgIG91dFs3XSA9IGFbMTNdO1xuICAgICAgICBvdXRbOF0gPSBhWzJdO1xuICAgICAgICBvdXRbOV0gPSBhWzZdO1xuICAgICAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgICAgIG91dFsxMV0gPSBhWzE0XTtcbiAgICAgICAgb3V0WzEyXSA9IGFbM107XG4gICAgICAgIG91dFsxM10gPSBhWzddO1xuICAgICAgICBvdXRbMTRdID0gYVsxMV07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBhZGQ7XG5cbi8qKlxuICogQWRkcyB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBhZGQob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF1cbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXVxuICAgIG91dFsyXSA9IGFbMl0gKyBiWzJdXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gYW5nbGVcblxudmFyIGZyb21WYWx1ZXMgPSByZXF1aXJlKCcuL2Zyb21WYWx1ZXMnKVxudmFyIG5vcm1hbGl6ZSA9IHJlcXVpcmUoJy4vbm9ybWFsaXplJylcbnZhciBkb3QgPSByZXF1aXJlKCcuL2RvdCcpXG5cbi8qKlxuICogR2V0IHRoZSBhbmdsZSBiZXR3ZWVuIHR3byAzRCB2ZWN0b3JzXG4gKiBAcGFyYW0ge3ZlYzN9IGEgVGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiBUaGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBhbmdsZSBpbiByYWRpYW5zXG4gKi9cbmZ1bmN0aW9uIGFuZ2xlKGEsIGIpIHtcbiAgICB2YXIgdGVtcEEgPSBmcm9tVmFsdWVzKGFbMF0sIGFbMV0sIGFbMl0pXG4gICAgdmFyIHRlbXBCID0gZnJvbVZhbHVlcyhiWzBdLCBiWzFdLCBiWzJdKVxuIFxuICAgIG5vcm1hbGl6ZSh0ZW1wQSwgdGVtcEEpXG4gICAgbm9ybWFsaXplKHRlbXBCLCB0ZW1wQilcbiBcbiAgICB2YXIgY29zaW5lID0gZG90KHRlbXBBLCB0ZW1wQilcblxuICAgIGlmKGNvc2luZSA+IDEuMCl7XG4gICAgICAgIHJldHVybiAwXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWNvcyhjb3NpbmUpXG4gICAgfSAgICAgXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGNsb25lO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gY2xvbmVcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAqL1xuZnVuY3Rpb24gY2xvbmUoYSkge1xuICAgIHZhciBvdXQgPSBuZXcgRmxvYXQzMkFycmF5KDMpXG4gICAgb3V0WzBdID0gYVswXVxuICAgIG91dFsxXSA9IGFbMV1cbiAgICBvdXRbMl0gPSBhWzJdXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gY29weTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgdmVjMyB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgc291cmNlIHZlY3RvclxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBjb3B5KG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF1cbiAgICBvdXRbMV0gPSBhWzFdXG4gICAgb3V0WzJdID0gYVsyXVxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWMzXG4gKlxuICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxuICovXG5mdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoMylcbiAgICBvdXRbMF0gPSAwXG4gICAgb3V0WzFdID0gMFxuICAgIG91dFsyXSA9IDBcbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSBjcm9zcztcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBjcm9zcyhvdXQsIGEsIGIpIHtcbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSxcbiAgICAgICAgYnggPSBiWzBdLCBieSA9IGJbMV0sIGJ6ID0gYlsyXVxuXG4gICAgb3V0WzBdID0gYXkgKiBieiAtIGF6ICogYnlcbiAgICBvdXRbMV0gPSBheiAqIGJ4IC0gYXggKiBielxuICAgIG91dFsyXSA9IGF4ICogYnkgLSBheSAqIGJ4XG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gZGlzdGFuY2U7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbmZ1bmN0aW9uIGRpc3RhbmNlKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgICB5ID0gYlsxXSAtIGFbMV0sXG4gICAgICAgIHogPSBiWzJdIC0gYVsyXVxuICAgIHJldHVybiBNYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6KVxufSIsIm1vZHVsZS5leHBvcnRzID0gZGl2aWRlO1xuXG4vKipcbiAqIERpdmlkZXMgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gZGl2aWRlKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLyBiWzBdXG4gICAgb3V0WzFdID0gYVsxXSAvIGJbMV1cbiAgICBvdXRbMl0gPSBhWzJdIC8gYlsyXVxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGRvdDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKi9cbmZ1bmN0aW9uIGRvdChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXVxufSIsIm1vZHVsZS5leHBvcnRzID0gZm9yRWFjaDtcblxudmFyIHZlYyA9IHJlcXVpcmUoJy4vY3JlYXRlJykoKVxuXG4vKipcbiAqIFBlcmZvcm0gc29tZSBvcGVyYXRpb24gb3ZlciBhbiBhcnJheSBvZiB2ZWMzcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhIHRoZSBhcnJheSBvZiB2ZWN0b3JzIHRvIGl0ZXJhdGUgb3ZlclxuICogQHBhcmFtIHtOdW1iZXJ9IHN0cmlkZSBOdW1iZXIgb2YgZWxlbWVudHMgYmV0d2VlbiB0aGUgc3RhcnQgb2YgZWFjaCB2ZWMzLiBJZiAwIGFzc3VtZXMgdGlnaHRseSBwYWNrZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgTnVtYmVyIG9mIGVsZW1lbnRzIHRvIHNraXAgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBOdW1iZXIgb2YgdmVjM3MgdG8gaXRlcmF0ZSBvdmVyLiBJZiAwIGl0ZXJhdGVzIG92ZXIgZW50aXJlIGFycmF5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYXJnXSBhZGRpdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgdG8gZm5cbiAqIEByZXR1cm5zIHtBcnJheX0gYVxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2goYSwgc3RyaWRlLCBvZmZzZXQsIGNvdW50LCBmbiwgYXJnKSB7XG4gICAgICAgIHZhciBpLCBsXG4gICAgICAgIGlmKCFzdHJpZGUpIHtcbiAgICAgICAgICAgIHN0cmlkZSA9IDNcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFvZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IDBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoY291bnQpIHtcbiAgICAgICAgICAgIGwgPSBNYXRoLm1pbigoY291bnQgKiBzdHJpZGUpICsgb2Zmc2V0LCBhLmxlbmd0aClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGwgPSBhLmxlbmd0aFxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgICAgICAgdmVjWzBdID0gYVtpXSBcbiAgICAgICAgICAgIHZlY1sxXSA9IGFbaSsxXSBcbiAgICAgICAgICAgIHZlY1syXSA9IGFbaSsyXVxuICAgICAgICAgICAgZm4odmVjLCB2ZWMsIGFyZylcbiAgICAgICAgICAgIGFbaV0gPSB2ZWNbMF0gXG4gICAgICAgICAgICBhW2krMV0gPSB2ZWNbMV0gXG4gICAgICAgICAgICBhW2krMl0gPSB2ZWNbMl1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGFcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZyb21WYWx1ZXM7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMzIGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAqL1xuZnVuY3Rpb24gZnJvbVZhbHVlcyh4LCB5LCB6KSB7XG4gICAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoMylcbiAgICBvdXRbMF0gPSB4XG4gICAgb3V0WzFdID0geVxuICAgIG91dFsyXSA9IHpcbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogcmVxdWlyZSgnLi9jcmVhdGUnKVxuICAsIGNsb25lOiByZXF1aXJlKCcuL2Nsb25lJylcbiAgLCBhbmdsZTogcmVxdWlyZSgnLi9hbmdsZScpXG4gICwgZnJvbVZhbHVlczogcmVxdWlyZSgnLi9mcm9tVmFsdWVzJylcbiAgLCBjb3B5OiByZXF1aXJlKCcuL2NvcHknKVxuICAsIHNldDogcmVxdWlyZSgnLi9zZXQnKVxuICAsIGFkZDogcmVxdWlyZSgnLi9hZGQnKVxuICAsIHN1YnRyYWN0OiByZXF1aXJlKCcuL3N1YnRyYWN0JylcbiAgLCBtdWx0aXBseTogcmVxdWlyZSgnLi9tdWx0aXBseScpXG4gICwgZGl2aWRlOiByZXF1aXJlKCcuL2RpdmlkZScpXG4gICwgbWluOiByZXF1aXJlKCcuL21pbicpXG4gICwgbWF4OiByZXF1aXJlKCcuL21heCcpXG4gICwgc2NhbGU6IHJlcXVpcmUoJy4vc2NhbGUnKVxuICAsIHNjYWxlQW5kQWRkOiByZXF1aXJlKCcuL3NjYWxlQW5kQWRkJylcbiAgLCBkaXN0YW5jZTogcmVxdWlyZSgnLi9kaXN0YW5jZScpXG4gICwgc3F1YXJlZERpc3RhbmNlOiByZXF1aXJlKCcuL3NxdWFyZWREaXN0YW5jZScpXG4gICwgbGVuZ3RoOiByZXF1aXJlKCcuL2xlbmd0aCcpXG4gICwgc3F1YXJlZExlbmd0aDogcmVxdWlyZSgnLi9zcXVhcmVkTGVuZ3RoJylcbiAgLCBuZWdhdGU6IHJlcXVpcmUoJy4vbmVnYXRlJylcbiAgLCBpbnZlcnNlOiByZXF1aXJlKCcuL2ludmVyc2UnKVxuICAsIG5vcm1hbGl6ZTogcmVxdWlyZSgnLi9ub3JtYWxpemUnKVxuICAsIGRvdDogcmVxdWlyZSgnLi9kb3QnKVxuICAsIGNyb3NzOiByZXF1aXJlKCcuL2Nyb3NzJylcbiAgLCBsZXJwOiByZXF1aXJlKCcuL2xlcnAnKVxuICAsIHJhbmRvbTogcmVxdWlyZSgnLi9yYW5kb20nKVxuICAsIHRyYW5zZm9ybU1hdDQ6IHJlcXVpcmUoJy4vdHJhbnNmb3JtTWF0NCcpXG4gICwgdHJhbnNmb3JtTWF0MzogcmVxdWlyZSgnLi90cmFuc2Zvcm1NYXQzJylcbiAgLCB0cmFuc2Zvcm1RdWF0OiByZXF1aXJlKCcuL3RyYW5zZm9ybVF1YXQnKVxuICAsIHJvdGF0ZVg6IHJlcXVpcmUoJy4vcm90YXRlWCcpXG4gICwgcm90YXRlWTogcmVxdWlyZSgnLi9yb3RhdGVZJylcbiAgLCByb3RhdGVaOiByZXF1aXJlKCcuL3JvdGF0ZVonKVxuICAsIGZvckVhY2g6IHJlcXVpcmUoJy4vZm9yRWFjaCcpXG59IiwibW9kdWxlLmV4cG9ydHMgPSBpbnZlcnNlO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gaW52ZXJ0XG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIGludmVyc2Uob3V0LCBhKSB7XG4gIG91dFswXSA9IDEuMCAvIGFbMF1cbiAgb3V0WzFdID0gMS4wIC8gYVsxXVxuICBvdXRbMl0gPSAxLjAgLyBhWzJdXG4gIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGxlbmd0aDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG5mdW5jdGlvbiBsZW5ndGgoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdXG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnopXG59IiwibW9kdWxlLmV4cG9ydHMgPSBsZXJwO1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBsZXJwKG91dCwgYSwgYiwgdCkge1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdXG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheClcbiAgICBvdXRbMV0gPSBheSArIHQgKiAoYlsxXSAtIGF5KVxuICAgIG91dFsyXSA9IGF6ICsgdCAqIChiWzJdIC0gYXopXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gbWF4O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gbWF4KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pXG4gICAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSlcbiAgICBvdXRbMl0gPSBNYXRoLm1heChhWzJdLCBiWzJdKVxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IG1pbjtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIG1pbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKVxuICAgIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pXG4gICAgb3V0WzJdID0gTWF0aC5taW4oYVsyXSwgYlsyXSlcbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSBtdWx0aXBseTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiWzBdXG4gICAgb3V0WzFdID0gYVsxXSAqIGJbMV1cbiAgICBvdXRbMl0gPSBhWzJdICogYlsyXVxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IG5lZ2F0ZTtcblxuLyoqXG4gKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBuZWdhdGUob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gLWFbMF1cbiAgICBvdXRbMV0gPSAtYVsxXVxuICAgIG91dFsyXSA9IC1hWzJdXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gbm9ybWFsaXplO1xuXG4vKipcbiAqIE5vcm1hbGl6ZSBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdXG4gICAgdmFyIGxlbiA9IHgqeCArIHkqeSArIHoqelxuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIC8vVE9ETzogZXZhbHVhdGUgdXNlIG9mIGdsbV9pbnZzcXJ0IGhlcmU/XG4gICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKVxuICAgICAgICBvdXRbMF0gPSBhWzBdICogbGVuXG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBsZW5cbiAgICAgICAgb3V0WzJdID0gYVsyXSAqIGxlblxuICAgIH1cbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSByYW5kb207XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gcmFuZG9tKG91dCwgc2NhbGUpIHtcbiAgICBzY2FsZSA9IHNjYWxlIHx8IDEuMFxuXG4gICAgdmFyIHIgPSBNYXRoLnJhbmRvbSgpICogMi4wICogTWF0aC5QSVxuICAgIHZhciB6ID0gKE1hdGgucmFuZG9tKCkgKiAyLjApIC0gMS4wXG4gICAgdmFyIHpTY2FsZSA9IE1hdGguc3FydCgxLjAteip6KSAqIHNjYWxlXG5cbiAgICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHpTY2FsZVxuICAgIG91dFsxXSA9IE1hdGguc2luKHIpICogelNjYWxlXG4gICAgb3V0WzJdID0geiAqIHNjYWxlXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gcm90YXRlWDtcblxuLyoqXG4gKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB4LWF4aXNcbiAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuICogQHBhcmFtIHt2ZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgYW5nbGUgb2Ygcm90YXRpb25cbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gcm90YXRlWChvdXQsIGEsIGIsIGMpe1xuICAgIHZhciBwID0gW10sIHI9W11cbiAgICAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gICAgcFswXSA9IGFbMF0gLSBiWzBdXG4gICAgcFsxXSA9IGFbMV0gLSBiWzFdXG4gICAgcFsyXSA9IGFbMl0gLSBiWzJdXG5cbiAgICAvL3BlcmZvcm0gcm90YXRpb25cbiAgICByWzBdID0gcFswXVxuICAgIHJbMV0gPSBwWzFdKk1hdGguY29zKGMpIC0gcFsyXSpNYXRoLnNpbihjKVxuICAgIHJbMl0gPSBwWzFdKk1hdGguc2luKGMpICsgcFsyXSpNYXRoLmNvcyhjKVxuXG4gICAgLy90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuICAgIG91dFswXSA9IHJbMF0gKyBiWzBdXG4gICAgb3V0WzFdID0gclsxXSArIGJbMV1cbiAgICBvdXRbMl0gPSByWzJdICsgYlsyXVxuXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gcm90YXRlWTtcblxuLyoqXG4gKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB5LWF4aXNcbiAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuICogQHBhcmFtIHt2ZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgYW5nbGUgb2Ygcm90YXRpb25cbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gcm90YXRlWShvdXQsIGEsIGIsIGMpe1xuICAgIHZhciBwID0gW10sIHI9W11cbiAgICAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gICAgcFswXSA9IGFbMF0gLSBiWzBdXG4gICAgcFsxXSA9IGFbMV0gLSBiWzFdXG4gICAgcFsyXSA9IGFbMl0gLSBiWzJdXG4gIFxuICAgIC8vcGVyZm9ybSByb3RhdGlvblxuICAgIHJbMF0gPSBwWzJdKk1hdGguc2luKGMpICsgcFswXSpNYXRoLmNvcyhjKVxuICAgIHJbMV0gPSBwWzFdXG4gICAgclsyXSA9IHBbMl0qTWF0aC5jb3MoYykgLSBwWzBdKk1hdGguc2luKGMpXG4gIFxuICAgIC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cbiAgICBvdXRbMF0gPSByWzBdICsgYlswXVxuICAgIG91dFsxXSA9IHJbMV0gKyBiWzFdXG4gICAgb3V0WzJdID0gclsyXSArIGJbMl1cbiAgXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gcm90YXRlWjtcblxuLyoqXG4gKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB6LWF4aXNcbiAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuICogQHBhcmFtIHt2ZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgYW5nbGUgb2Ygcm90YXRpb25cbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gcm90YXRlWihvdXQsIGEsIGIsIGMpe1xuICAgIHZhciBwID0gW10sIHI9W11cbiAgICAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gICAgcFswXSA9IGFbMF0gLSBiWzBdXG4gICAgcFsxXSA9IGFbMV0gLSBiWzFdXG4gICAgcFsyXSA9IGFbMl0gLSBiWzJdXG4gIFxuICAgIC8vcGVyZm9ybSByb3RhdGlvblxuICAgIHJbMF0gPSBwWzBdKk1hdGguY29zKGMpIC0gcFsxXSpNYXRoLnNpbihjKVxuICAgIHJbMV0gPSBwWzBdKk1hdGguc2luKGMpICsgcFsxXSpNYXRoLmNvcyhjKVxuICAgIHJbMl0gPSBwWzJdXG4gIFxuICAgIC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cbiAgICBvdXRbMF0gPSByWzBdICsgYlswXVxuICAgIG91dFsxXSA9IHJbMV0gKyBiWzFdXG4gICAgb3V0WzJdID0gclsyXSArIGJbMl1cbiAgXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gc2NhbGU7XG5cbi8qKlxuICogU2NhbGVzIGEgdmVjMyBieSBhIHNjYWxhciBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIHNjYWxlKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiXG4gICAgb3V0WzFdID0gYVsxXSAqIGJcbiAgICBvdXRbMl0gPSBhWzJdICogYlxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHNjYWxlQW5kQWRkO1xuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzMncyBhZnRlciBzY2FsaW5nIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBzY2FsZUFuZEFkZChvdXQsIGEsIGIsIHNjYWxlKSB7XG4gICAgb3V0WzBdID0gYVswXSArIChiWzBdICogc2NhbGUpXG4gICAgb3V0WzFdID0gYVsxXSArIChiWzFdICogc2NhbGUpXG4gICAgb3V0WzJdID0gYVsyXSArIChiWzJdICogc2NhbGUpXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gc2V0O1xuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzMgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIHNldChvdXQsIHgsIHksIHopIHtcbiAgICBvdXRbMF0gPSB4XG4gICAgb3V0WzFdID0geVxuICAgIG91dFsyXSA9IHpcbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSBzcXVhcmVkRGlzdGFuY2U7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG5mdW5jdGlvbiBzcXVhcmVkRGlzdGFuY2UoYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICAgICAgeiA9IGJbMl0gLSBhWzJdXG4gICAgcmV0dXJuIHgqeCArIHkqeSArIHoqelxufSIsIm1vZHVsZS5leHBvcnRzID0gc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICovXG5mdW5jdGlvbiBzcXVhcmVkTGVuZ3RoKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXVxuICAgIHJldHVybiB4KnggKyB5KnkgKyB6Knpcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHN1YnRyYWN0O1xuXG4vKipcbiAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBzdWJ0cmFjdChvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC0gYlswXVxuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdXG4gICAgb3V0WzJdID0gYVsyXSAtIGJbMl1cbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSB0cmFuc2Zvcm1NYXQzO1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDMuXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQ0fSBtIHRoZSAzeDMgbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIHRyYW5zZm9ybU1hdDMob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl1cbiAgICBvdXRbMF0gPSB4ICogbVswXSArIHkgKiBtWzNdICsgeiAqIG1bNl1cbiAgICBvdXRbMV0gPSB4ICogbVsxXSArIHkgKiBtWzRdICsgeiAqIG1bN11cbiAgICBvdXRbMl0gPSB4ICogbVsyXSArIHkgKiBtWzVdICsgeiAqIG1bOF1cbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSB0cmFuc2Zvcm1NYXQ0O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDQuXG4gKiA0dGggdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gdHJhbnNmb3JtTWF0NChvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXSxcbiAgICAgICAgdyA9IG1bM10gKiB4ICsgbVs3XSAqIHkgKyBtWzExXSAqIHogKyBtWzE1XVxuICAgIHcgPSB3IHx8IDEuMFxuICAgIG91dFswXSA9IChtWzBdICogeCArIG1bNF0gKiB5ICsgbVs4XSAqIHogKyBtWzEyXSkgLyB3XG4gICAgb3V0WzFdID0gKG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzldICogeiArIG1bMTNdKSAvIHdcbiAgICBvdXRbMl0gPSAobVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdKSAvIHdcbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSB0cmFuc2Zvcm1RdWF0O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge3F1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1RdWF0KG91dCwgYSwgcSkge1xuICAgIC8vIGJlbmNobWFya3M6IGh0dHA6Ly9qc3BlcmYuY29tL3F1YXRlcm5pb24tdHJhbnNmb3JtLXZlYzMtaW1wbGVtZW50YXRpb25zXG5cbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXSxcbiAgICAgICAgcXggPSBxWzBdLCBxeSA9IHFbMV0sIHF6ID0gcVsyXSwgcXcgPSBxWzNdLFxuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjXG4gICAgICAgIGl4ID0gcXcgKiB4ICsgcXkgKiB6IC0gcXogKiB5LFxuICAgICAgICBpeSA9IHF3ICogeSArIHF6ICogeCAtIHF4ICogeixcbiAgICAgICAgaXogPSBxdyAqIHogKyBxeCAqIHkgLSBxeSAqIHgsXG4gICAgICAgIGl3ID0gLXF4ICogeCAtIHF5ICogeSAtIHF6ICogelxuXG4gICAgLy8gY2FsY3VsYXRlIHJlc3VsdCAqIGludmVyc2UgcXVhdFxuICAgIG91dFswXSA9IGl4ICogcXcgKyBpdyAqIC1xeCArIGl5ICogLXF6IC0gaXogKiAtcXlcbiAgICBvdXRbMV0gPSBpeSAqIHF3ICsgaXcgKiAtcXkgKyBpeiAqIC1xeCAtIGl4ICogLXF6XG4gICAgb3V0WzJdID0gaXogKiBxdyArIGl3ICogLXF6ICsgaXggKiAtcXkgLSBpeSAqIC1xeFxuICAgIHJldHVybiBvdXRcbn0iLCJ2YXIgbWF0NCA9IHJlcXVpcmUoXCJnbC1tYXQ0XCIpXHJcbnZhciB2ZWMzID0gcmVxdWlyZShcImdsLXZlYzNcIilcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2FtZXJhXHJcblxyXG5mdW5jdGlvbiBDYW1lcmEgKGdsLCB4LCB5LCB6LCBhdFgsIGF0WSwgYXRaKSB7XHJcbiAgdmFyIHZpZXdNYXRyaXggPSBtYXQ0LmNyZWF0ZSgpXHJcbiAgdmFyIHByb2pNYXRyaXggPSBtYXQ0LmNyZWF0ZSgpXHJcbiAgdmFyIHVwICAgICAgICAgPSB2ZWMzLmZyb21WYWx1ZXMoMCwgMSwgMClcclxuXHJcbiAgdGhpcy5wb3NpdGlvbiA9IHZlYzMuZnJvbVZhbHVlcyh4LCB5LCB6KVxyXG4gIHRoaXMudGFyZ2V0ICAgPSB2ZWMzLmZyb21WYWx1ZXMoYXRYLCBhdFksIGF0WilcclxuXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwicHJvamVjdGlvbk1hdHJpeFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy9UT0RPOiB0aGlzIGlzIG9kZGx5IGhhcmRjb2RlZD9cclxuICAgICAgdmFyIGFuZ2xlID0gNTAgLyAxODAgKiBNYXRoLlBJIFxyXG4gICAgICB2YXIgcmF0aW8gPSB0aGlzLmFzcGVjdFJhdGlvXHJcblxyXG4gICAgICByZXR1cm4gbWF0NC5wZXJzcGVjdGl2ZShwcm9qTWF0cml4LCBhbmdsZSwgcmF0aW8sIDEsIDIwKVxyXG4gICAgfSBcclxuICB9KVxyXG5cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJ2aWV3TWF0cml4XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gbWF0NC5sb29rQXQodmlld01hdHJpeCwgdGhpcy5wb3NpdGlvbiwgdGhpcy50YXJnZXQsIHVwKVxyXG4gICAgfSBcclxuICB9KVxyXG5cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJhc3BlY3RSYXRpb1wiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIGdsLmRyYXdpbmdCdWZmZXJXaWR0aCAvIGdsLmRyYXdpbmdCdWZmZXJIZWlnaHRcclxuICAgIH0gXHJcbiAgfSlcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IENsb2NrXHJcblxyXG5mdW5jdGlvbiBDbG9jayAoKSB7XHJcbiAgdGhpcy5sYXN0VGltZSA9IERhdGUubm93KClcclxuICB0aGlzLnRoaXNUaW1lID0gdGhpcy5sYXN0VGltZVxyXG4gIHRoaXMuZFQgICAgICAgPSB0aGlzLnRoaXNUaW1lIC0gdGhpcy5sYXN0VGltZVxyXG59XHJcblxyXG5DbG9jay5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLmxhc3RUaW1lID0gdGhpcy50aGlzVGltZVxyXG4gIHRoaXMudGhpc1RpbWUgPSBEYXRlLm5vdygpXHJcbiAgdGhpcy5kVCAgICAgICA9IHRoaXMudGhpc1RpbWUgLSB0aGlzLmxhc3RUaW1lXHJcbn1cclxuIiwidmFyIENsb2NrICAgICAgICAgICA9IHJlcXVpcmUoXCIuL0Nsb2NrXCIpXHJcbnZhciByZXNpemVXaXRoUmF0aW8gPSByZXF1aXJlKFwiLi9kb20tdXRpbHNcIikucmVzaXplV2l0aFJhdGlvXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdMU2hlbGxcclxuXHJcbmZ1bmN0aW9uIEdMU2hlbGwgKHBhcmVudE5vZGUsIGFzcGVjdFJhdGlvKSB7XHJcbiAgdmFyIGNhbnZhcyAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpXHJcbiAgdmFyIGdsICAgICAgICAgICAgICAgPSBjYW52YXMuZ2V0Q29udGV4dChcIndlYmdsXCIpXHJcbiAgdmFyIGNsb2NrICAgICAgICAgICAgPSBuZXcgQ2xvY2tcclxuXHJcbiAgdmFyIHJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciByYXRpbyA9IHRoaXMuZ2wuY2FudmFzLmNsaWVudFdpZHRoIC8gdGhpcy5nbC5jYW52YXMuY2xpZW50SGVpZ2h0XHJcblxyXG4gICAgcmVzaXplV2l0aFJhdGlvKHRoaXMuYXNwZWN0UmF0aW8sIHRoaXMucGFyZW50Tm9kZSwgdGhpcy5nbC5jYW52YXMpXHJcbiAgICB0aGlzLnJlbmRlcigpIFxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcclxuICB9LmJpbmQodGhpcylcclxuXHJcbiAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuY2xvY2sudGljaygpXHJcbiAgICB0aGlzLnVwZGF0ZSh0aGlzLmNsb2NrLmRUKSBcclxuICB9LmJpbmQodGhpcylcclxuXHJcbiAgcGFyZW50Tm9kZS5hcHBlbmRDaGlsZChjYW52YXMpXHJcbiAgdGhpcy5wYXJlbnROb2RlICA9IHBhcmVudE5vZGVcclxuICB0aGlzLmdsICAgICAgICAgID0gZ2xcclxuICB0aGlzLmFzcGVjdFJhdGlvID0gYXNwZWN0UmF0aW9cclxuICB0aGlzLmNsb2NrICAgICAgID0gY2xvY2tcclxuXHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcclxuICBzZXRJbnRlcnZhbCh1cGRhdGUsIDI1KVxyXG59XHJcblxyXG5HTFNoZWxsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgLy9vdmVyIHdyaXRlIHRoaXMgd2l0aCB5b3VyIG93biByZW5kZXIgZnVuY3Rpb25cclxufVxyXG5cclxuLy9mb3IgY29udmVuaWVuY2UsIHRoZSB0aW1lIHNpbmNlIGxhc3QgdXBkYXRlIGlzIHBhc3NlZCBhcyBhIHBhcmFtYXRlclxyXG5HTFNoZWxsLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZFQpIHtcclxuICAvL292ZXJ3cml0ZSB0aGlzIHdpdGggeW91ciBvd24gdXBkYXRlIGZ1bmN0aW9uXHJcbn1cclxuIiwidmFyIG1hdDQgICAgICAgID0gcmVxdWlyZShcImdsLW1hdDRcIilcclxuXHJcbnZhciBHTFByb2dyYW0gICA9IHJlcXVpcmUoXCIuL3R5cGVzL0dMUHJvZ3JhbVwiKVxyXG52YXIgU2NyZWVuUXVhZCAgPSByZXF1aXJlKFwiLi9TY3JlZW5RdWFkXCIpXHJcbnZhciBtYXRyaXhVdGlscyA9IHJlcXVpcmUoXCIuL21hdHJpeC11dGlsc1wiKVxyXG5cclxudmFyIGNvbXB1dGVUcmFuc2xhdGlvbk1hdHJpeCA9IG1hdHJpeFV0aWxzLmNvbXB1dGVUcmFuc2xhdGlvbk1hdHJpeFxyXG52YXIgY29tcHV0ZVRyYW5zZm9ybU1hdHJpeCAgID0gbWF0cml4VXRpbHMuY29tcHV0ZVRyYW5zZm9ybU1hdHJpeFxyXG52YXIgY29tcHV0ZVJvdGF0aW9uTWF0cml4ICAgID0gbWF0cml4VXRpbHMuY29tcHV0ZVJvdGF0aW9uTWF0cml4XHJcbnZhciBjb21wdXRlU2NhbGVNYXRyaXggICAgICAgPSBtYXRyaXhVdGlscy5jb21wdXRlU2NhbGVNYXRyaXhcclxudmFyIGNvbXB1dGVNb2RlbE1hdHJpeCAgICAgICA9IG1hdHJpeFV0aWxzLmNvbXB1dGVNb2RlbE1hdHJpeFxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHUFVQYXJ0aWNsZVN5c3RlbVxyXG5cclxudmFyIHZlbG9jaXR5VlNyYyA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG5hdHRyaWJ1dGUgdmVjMiBzY3JlZW5Db29yZDtcXHJcXG5cXHJcXG52b2lkIG1haW4gKCkge1xcclxcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KHNjcmVlbkNvb3JkLCAwLjAsIDEuMCk7XFxyXFxufVxcclxcblwiXHJcbnZhciB2ZWxvY2l0eUZTcmMgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XFxyXFxuXFxyXFxuY29uc3QgZmxvYXQgUEFSVElDTEVfTUFTUyAgICAgICA9IDEuMDtcXHJcXG5jb25zdCBmbG9hdCBBVFRSQUNUSU9OX0NPTlNUQU5UID0gMC4wMTtcXHJcXG5cXHJcXG51bmlmb3JtIGZsb2F0IGRUO1xcclxcbnVuaWZvcm0gdmVjMiB2aWV3cG9ydDtcXHJcXG51bmlmb3JtIHNhbXBsZXIyRCB2ZWxvY2l0aWVzO1xcclxcbnVuaWZvcm0gc2FtcGxlcjJEIHBvc2l0aW9ucztcXHJcXG51bmlmb3JtIG1hdDQgbW9kZWxNYXRyaXg7XFxyXFxuXFxyXFxuc3RydWN0IEF0dHJhY3RvciB7XFxyXFxuICB2ZWMzIHBvc2l0aW9uO1xcclxcbiAgZmxvYXQgbWFzcztcXHJcXG59O1xcclxcblxcclxcbnVuaWZvcm0gQXR0cmFjdG9yIGF0dHJhY3RvcnNbM107XFxyXFxuXFxyXFxudmVjMyBjYWxjRm9yY2UgKGZsb2F0IGNvbnMsICBmbG9hdCBtYXNzMSwgZmxvYXQgbWFzczIsIHZlYzMgcG9zMSwgdmVjMyBwb3MyKSB7XFxyXFxuICBmbG9hdCBkaXN0ID0gbWF4KGRpc3RhbmNlKHBvczEsIHBvczIpLCAuMSk7XFxyXFxuICB2ZWMzIGRpciAgID0gKHBvczEgLSBwb3MyKSAvIGRpc3Q7XFxyXFxuXFxyXFxuICByZXR1cm4gY29ucyAqIG1hc3MxICogbWFzczIgLyAoZGlzdCAqIGRpc3QpICogZGlyO1xcclxcbn1cXHJcXG5cXHJcXG52b2lkIG1haW4gKCkge1xcclxcbiAgdmVjMiB0ZXh0dXJlSW5kZXggPSBnbF9GcmFnQ29vcmQueHkgLyB2aWV3cG9ydDtcXHJcXG4gIHZlYzMgdmVsb2NpdHkgICAgID0gdGV4dHVyZTJEKHZlbG9jaXRpZXMsIHRleHR1cmVJbmRleCkueHl6O1xcclxcbiAgdmVjMyBwb3NpdGlvbiAgICAgPSAobW9kZWxNYXRyaXggKiB0ZXh0dXJlMkQocG9zaXRpb25zLCB0ZXh0dXJlSW5kZXgpKS54eXo7XFxyXFxuICB2ZWMzIGZvcmNlICAgICAgICA9IHZlYzMoMC4wLCAwLjAsIDAuMCk7XFxyXFxuXFxyXFxuICBmb3IgKGludCBpID0gMDsgaSA8IDM7IGkrKykge1xcclxcbiAgICBmb3JjZSArPSBjYWxjRm9yY2UoQVRUUkFDVElPTl9DT05TVEFOVCwgXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICBhdHRyYWN0b3JzW2ldLm1hc3MsIFxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgUEFSVElDTEVfTUFTUywgXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICBhdHRyYWN0b3JzW2ldLnBvc2l0aW9uLFxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24pO1xcclxcbiAgfVxcclxcblxcclxcbiAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgoZm9yY2UgLyBQQVJUSUNMRV9NQVNTKSAqIGRUICsgdmVsb2NpdHksIDEuMCk7XFxyXFxufVxcclxcblwiXHJcbnZhciBwb3NpdGlvblZTcmMgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxuYXR0cmlidXRlIHZlYzIgc2NyZWVuQ29vcmQ7XFxyXFxuXFxyXFxudm9pZCBtYWluICgpIHtcXHJcXG4gIGdsX1Bvc2l0aW9uID0gdmVjNChzY3JlZW5Db29yZCwgMC4wLCAxLjApO1xcclxcbn1cXHJcXG5cIlxyXG52YXIgcG9zaXRpb25GU3JjID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xcclxcblxcclxcbnVuaWZvcm0gZmxvYXQgZFQ7XFxyXFxudW5pZm9ybSB2ZWMyIHZpZXdwb3J0O1xcclxcbnVuaWZvcm0gc2FtcGxlcjJEIHZlbG9jaXRpZXM7XFxyXFxudW5pZm9ybSBzYW1wbGVyMkQgcG9zaXRpb25zO1xcclxcblxcclxcbnZvaWQgbWFpbiAoKSB7XFxyXFxuICB2ZWMyIHRleHR1cmVJbmRleCA9IGdsX0ZyYWdDb29yZC54eSAvIHZpZXdwb3J0O1xcclxcbiAgdmVjMyB2ZWxvY2l0eSAgICAgPSB0ZXh0dXJlMkQodmVsb2NpdGllcywgdGV4dHVyZUluZGV4KS54eXo7XFxyXFxuICB2ZWMzIHBvc2l0aW9uICAgICA9IHRleHR1cmUyRChwb3NpdGlvbnMsIHRleHR1cmVJbmRleCkueHl6O1xcclxcblxcclxcbiAgZ2xfRnJhZ0NvbG9yICA9IHZlYzQoKGRUIC8gMTAuMCAqIHZlbG9jaXR5KSArIHBvc2l0aW9uLCAxLjApO1xcclxcbn1cXHJcXG5cIlxyXG52YXIgcmVuZGVyVlNyYyAgID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbmF0dHJpYnV0ZSB2ZWMyIHBhcnRpY2xlQ29vcmQ7XFxyXFxuXFxyXFxudW5pZm9ybSBzYW1wbGVyMkQgcG9zaXRpb25zO1xcclxcbnVuaWZvcm0gdmVjMiBzY3JlZW5EaW1lbnNpb25zO1xcclxcbnVuaWZvcm0gbWF0NCBtb2RlbE1hdHJpeDtcXHJcXG51bmlmb3JtIG1hdDQgdmlld01hdHJpeDtcXHJcXG51bmlmb3JtIG1hdDQgcHJvamVjdGlvbk1hdHJpeDtcXHJcXG51bmlmb3JtIG1hdDQgdHJhbnNmb3JtTWF0cml4O1xcclxcblxcclxcbmNvbnN0IGZsb2F0IGJhc2VTaXplID0gMS41O1xcclxcblxcclxcbnZhcnlpbmcgdmVjMyBwb3NpdGlvbjtcXHJcXG5cXHJcXG52b2lkIG1haW4gKCkge1xcclxcbiAgdmVjNCBwb3MgICAgICAgICAgICA9IHRleHR1cmUyRChwb3NpdGlvbnMsIHBhcnRpY2xlQ29vcmQpO1xcclxcbiAgdmVjNCB3b3JsZFNwYWNlUG9zICA9IG1vZGVsTWF0cml4ICogcG9zO1xcclxcbiAgdmVjNCBzY3JlZW5TcGFjZVBvcyA9IHRyYW5zZm9ybU1hdHJpeCAqIHBvcztcXHJcXG5cXHJcXG4gIHBvc2l0aW9uICAgICA9IHdvcmxkU3BhY2VQb3MueHl6O1xcclxcbiAgZ2xfUG9zaXRpb24gID0gc2NyZWVuU3BhY2VQb3M7XFxyXFxuICBnbF9Qb2ludFNpemUgPSBiYXNlU2l6ZTsgXFxyXFxufVxcclxcblwiXHJcbnZhciByZW5kZXJGU3JjICAgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuXFxucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XFxyXFxuXFxyXFxuc3RydWN0IExpZ2h0IHtcXHJcXG4gIHZlYzMgcG9zaXRpb247XFxyXFxuICB2ZWMzIGNvbG9yO1xcclxcbiAgZmxvYXQgaW50ZW5zaXR5O1xcclxcbn07XFxyXFxuXFxyXFxudW5pZm9ybSB2ZWM0IGNvbG9yO1xcclxcbnVuaWZvcm0gTGlnaHQgbGlnaHRzWzNdO1xcclxcblxcclxcbnZhcnlpbmcgdmVjMyBwb3NpdGlvbjtcXHJcXG5cXHJcXG52ZWMzIGNvbG9yRnJvbUxpZ2h0ICh2ZWMzIHBvc2l0aW9uLCBMaWdodCBsaWdodCkge1xcclxcbiAgZmxvYXQgZGlzdCA9IGRpc3RhbmNlKHBvc2l0aW9uLCBsaWdodC5wb3NpdGlvbik7XFxyXFxuICBmbG9hdCBpICAgID0gY2xhbXAobGlnaHQuaW50ZW5zaXR5IC8gKGRpc3QgKiBkaXN0KSwgMC4wLCAxLjApO1xcclxcblxcclxcbiAgcmV0dXJuIGkgKiBsaWdodC5jb2xvcjtcXHJcXG59XFxyXFxuXFxyXFxudm9pZCBtYWluICgpIHtcXHJcXG4gIHZlYzMgZmluYWxDb2xvciA9IHZlYzMoMC4wLCAwLjAsIDAuMCk7XFxyXFxuXFxyXFxuICBmb3IgKGludCBpID0gMDsgaSA8IDM7IGkrKykge1xcclxcbiAgICBmaW5hbENvbG9yICs9ICgwLjMgKiBjb2xvckZyb21MaWdodChwb3NpdGlvbiwgbGlnaHRzW2ldKSk7XFxyXFxuICB9XFxyXFxuICBnbF9GcmFnQ29sb3IgPSB2ZWM0KFxcclxcbiAgICBtaW4oZmluYWxDb2xvclswXSwgMS4wKSxcXHJcXG4gICAgbWluKGZpbmFsQ29sb3JbMV0sIDEuMCksXFxyXFxuICAgIG1pbihmaW5hbENvbG9yWzJdLCAxLjApLFxcclxcbiAgICAwLjApO1xcclxcbn0gXFxyXFxuXCJcclxuXHJcbmZ1bmN0aW9uIEdQVVBhcnRpY2xlU3lzdGVtIChnbCkge1xyXG4gIHZhciB2ZWxvY2l0eVByb2dyYW0gPSBuZXcgR0xQcm9ncmFtLmZyb21Tb3VyY2UoZ2wsIHZlbG9jaXR5VlNyYywgdmVsb2NpdHlGU3JjKVxyXG4gIHZhciBwb3NpdGlvblByb2dyYW0gPSBuZXcgR0xQcm9ncmFtLmZyb21Tb3VyY2UoZ2wsIHBvc2l0aW9uVlNyYywgcG9zaXRpb25GU3JjKVxyXG4gIHZhciByZW5kZXJQcm9ncmFtICAgPSBuZXcgR0xQcm9ncmFtLmZyb21Tb3VyY2UoZ2wsIHJlbmRlclZTcmMsIHJlbmRlckZTcmMpXHJcbiAgdmFyIHNjcmVlblF1YWQgICAgICA9IG5ldyBTY3JlZW5RdWFkXHJcbiAgdmFyIHNjcmVlbkJ1ZmZlciAgICA9IGdsLmNyZWF0ZUJ1ZmZlcigpXHJcblxyXG4gIGlmICh2ZWxvY2l0eVByb2dyYW0gaW5zdGFuY2VvZiBFcnJvcikgY29uc29sZS5sb2codmVsb2NpdHlQcm9ncmFtKVxyXG4gIGlmIChwb3NpdGlvblByb2dyYW0gaW5zdGFuY2VvZiBFcnJvcikgY29uc29sZS5sb2cocG9zaXRpb25Qcm9ncmFtKVxyXG4gIGlmIChyZW5kZXJQcm9ncmFtIGluc3RhbmNlb2YgRXJyb3IpICAgY29uc29sZS5sb2cocmVuZGVyUHJvZ3JhbSlcclxuXHJcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHNjcmVlbkJ1ZmZlcilcclxuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgc2NyZWVuUXVhZCwgZ2wuU1RBVElDX0RSQVcpXHJcblxyXG4gIGdsLmNsZWFyQ29sb3IoMCwgMCwgMCwgMClcclxuXHJcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodmVsb2NpdHlQcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQpXHJcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25Qcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQpXHJcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocmVuZGVyUHJvZ3JhbS5hdHRyaWJ1dGVzLnBhcnRpY2xlQ29vcmQpXHJcblxyXG4gIHRoaXMuZ2wgICAgICAgICAgICAgICAgPSBnbFxyXG4gIHRoaXMuc2NyZWVuQnVmZmVyICAgICAgPSBzY3JlZW5CdWZmZXJcclxuICB0aGlzLnZlbG9jaXR5UHJvZ3JhbSAgID0gdmVsb2NpdHlQcm9ncmFtXHJcbiAgdGhpcy5wb3NpdGlvblByb2dyYW0gICA9IHBvc2l0aW9uUHJvZ3JhbVxyXG4gIHRoaXMucmVuZGVyUHJvZ3JhbSAgICAgPSByZW5kZXJQcm9ncmFtXHJcbiAgdGhpcy50cmFuc2xhdGlvbk1hdHJpeCA9IG1hdDQuY3JlYXRlKClcclxuICB0aGlzLnNjYWxlTWF0cml4ICAgICAgID0gbWF0NC5jcmVhdGUoKVxyXG4gIHRoaXMucm90YXRpb25NYXRyaXggICAgPSBtYXQ0LmNyZWF0ZSgpXHJcbiAgdGhpcy5tb2RlbE1hdHJpeCAgICAgICA9IG1hdDQuY3JlYXRlKClcclxuICB0aGlzLnRyYW5zZm9ybU1hdHJpeCAgID0gbWF0NC5jcmVhdGUoKVxyXG59XHJcblxyXG5cclxuR1BVUGFydGljbGVTeXN0ZW0ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkVCwgZ3B1RW1pdHRlcnMsIGF0dHJhY3RvcnMpIHtcclxuICB2YXIgZ2wgICAgICAgID0gdGhpcy5nbFxyXG4gIHZhciBkVFNlY29uZHMgPSBkVCAvIDEwMDBcclxuICB2YXIgdlVuaWZvcm1zID0gdGhpcy52ZWxvY2l0eVByb2dyYW0udW5pZm9ybXNcclxuICB2YXIgZW1pdHRlciBcclxuICB2YXIgdG1wQnVmXHJcblxyXG4gIGdsLnVzZVByb2dyYW0odGhpcy52ZWxvY2l0eVByb2dyYW0ucHJvZ3JhbSlcclxuICBnbC5lbmFibGUoZ2wuQkxFTkQpXHJcbiAgZ2wuYmxlbmRGdW5jKGdsLk9ORSwgZ2wuWkVSTylcclxuICBnbC5kaXNhYmxlKGdsLkRFUFRIX1RFU1QpXHJcbiAgZ2wuZGVwdGhNYXNrKGZhbHNlKVxyXG4gIGdsLnVuaWZvcm0xZih0aGlzLnZlbG9jaXR5UHJvZ3JhbS51bmlmb3Jtcy5kVCwgZFRTZWNvbmRzKVxyXG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnNjcmVlbkJ1ZmZlcilcclxuICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMudmVsb2NpdHlQcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgMiwgZ2wuRkxPQVQsIGdsLkZBTFNFLCAwLCAwKVxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cmFjdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgZ2wudW5pZm9ybTNmKHZVbmlmb3Jtc1tcImF0dHJhY3RvcnNbXCIgKyBpICsgXCJdLnBvc2l0aW9uXCJdLFxyXG4gICAgICAgICAgICAgICAgIGF0dHJhY3RvcnNbaV0ucGh5c2ljcy5wb3NpdGlvblswXSxcclxuICAgICAgICAgICAgICAgICBhdHRyYWN0b3JzW2ldLnBoeXNpY3MucG9zaXRpb25bMV0sXHJcbiAgICAgICAgICAgICAgICAgYXR0cmFjdG9yc1tpXS5waHlzaWNzLnBvc2l0aW9uWzJdKVxyXG4gICAgZ2wudW5pZm9ybTFmKHZVbmlmb3Jtc1tcImF0dHJhY3RvcnNbXCIgKyBpICsgXCJdLm1hc3NcIl0sXHJcbiAgICAgICAgICAgICAgICAgYXR0cmFjdG9yc1tpXS5waHlzaWNzLm1hc3MpXHJcbiAgfVxyXG5cclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBncHVFbWl0dGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgcGh5c2ljcyA9IGdwdUVtaXR0ZXJzW2ldLnBoeXNpY3NcclxuICAgIGVtaXR0ZXIgPSBncHVFbWl0dGVyc1tpXS5ncHVFbWl0dGVyXHJcblxyXG4gICAgY29tcHV0ZVRyYW5zbGF0aW9uTWF0cml4KHRoaXMudHJhbnNsYXRpb25NYXRyaXgsIHBoeXNpY3MucG9zaXRpb24pXHJcbiAgICBjb21wdXRlUm90YXRpb25NYXRyaXgodGhpcy5yb3RhdGlvbk1hdHJpeCwgcGh5c2ljcy5yb3RhdGlvbilcclxuICAgIGNvbXB1dGVTY2FsZU1hdHJpeCh0aGlzLnNjYWxlTWF0cml4LCBwaHlzaWNzLnNjYWxlKVxyXG4gICAgY29tcHV0ZU1vZGVsTWF0cml4KHRoaXMubW9kZWxNYXRyaXgsIHRoaXMudHJhbnNsYXRpb25NYXRyaXgsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhbGVNYXRyaXgsIHRoaXMucm90YXRpb25NYXRyaXgpXHJcblxyXG4gICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBlbWl0dGVyLnZlbFRhcmdldHNbMV0uaGFuZGxlKSBcclxuICAgIGdsLnZpZXdwb3J0KDAsIDAsIGVtaXR0ZXIudmVsVGFyZ2V0c1sxXS53aWR0aCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLnZlbFRhcmdldHNbMV0uaGVpZ2h0KVxyXG4gICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVClcclxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApXHJcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBlbWl0dGVyLnZlbFRhcmdldHNbMF0udGV4dHVyZSlcclxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyAxKVxyXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgZW1pdHRlci5wb3NUYXJnZXRzWzBdLnRleHR1cmUpXHJcbiAgICBnbC51bmlmb3JtMWkodGhpcy52ZWxvY2l0eVByb2dyYW0udW5pZm9ybXMudmVsb2NpdGllcywgMClcclxuICAgIGdsLnVuaWZvcm0xaSh0aGlzLnZlbG9jaXR5UHJvZ3JhbS51bmlmb3Jtcy5wb3NpdGlvbnMsIDEpXHJcbiAgICBnbC51bmlmb3JtMmYodGhpcy52ZWxvY2l0eVByb2dyYW0udW5pZm9ybXMudmlld3BvcnQsIFxyXG4gICAgICAgICAgICAgICAgIGVtaXR0ZXIudmVsVGFyZ2V0c1sxXS53aWR0aCwgXHJcbiAgICAgICAgICAgICAgICAgZW1pdHRlci52ZWxUYXJnZXRzWzFdLmhlaWdodClcclxuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy52ZWxvY2l0eVByb2dyYW0udW5pZm9ybXMubW9kZWxNYXRyaXgsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSwgdGhpcy5tb2RlbE1hdHJpeClcclxuICAgICAgICAgICAgICAgICBcclxuICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCA2KVxyXG5cclxuICAgIHRtcEJ1ZiAgICAgICAgICAgICAgICA9IGVtaXR0ZXIudmVsVGFyZ2V0c1swXVxyXG4gICAgZW1pdHRlci52ZWxUYXJnZXRzWzBdID0gZW1pdHRlci52ZWxUYXJnZXRzWzFdXHJcbiAgICBlbWl0dGVyLnZlbFRhcmdldHNbMV0gPSB0bXBCdWZcclxuICB9XHJcblxyXG4gIGdsLnVzZVByb2dyYW0odGhpcy5wb3NpdGlvblByb2dyYW0ucHJvZ3JhbSlcclxuICBnbC51bmlmb3JtMWYodGhpcy5wb3NpdGlvblByb2dyYW0udW5pZm9ybXMuZFQsIGRUU2Vjb25kcylcclxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5zY3JlZW5CdWZmZXIpXHJcbiAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnBvc2l0aW9uUHJvZ3JhbS5hdHRyaWJ1dGVzLnNjcmVlbkNvb3JkLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgIDIsIGdsLkZMT0FULCBnbC5GQUxTRSwgMCwgMClcclxuXHJcbiAgZm9yICh2YXIgaiA9IDA7IGogPCBncHVFbWl0dGVycy5sZW5ndGg7IGorKykge1xyXG4gICAgZW1pdHRlciA9IGdwdUVtaXR0ZXJzW2pdLmdwdUVtaXR0ZXJcclxuXHJcbiAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIGVtaXR0ZXIucG9zVGFyZ2V0c1sxXS5oYW5kbGUpIFxyXG4gICAgZ2wudmlld3BvcnQoMCwgMCwgZW1pdHRlci5wb3NUYXJnZXRzWzFdLndpZHRoLCBcclxuICAgICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIucG9zVGFyZ2V0c1sxXS5oZWlnaHQpXHJcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKVxyXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMClcclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGVtaXR0ZXIudmVsVGFyZ2V0c1swXS50ZXh0dXJlKVxyXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCArIDEpXHJcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBlbWl0dGVyLnBvc1RhcmdldHNbMF0udGV4dHVyZSlcclxuICAgIGdsLnVuaWZvcm0xaSh0aGlzLnBvc2l0aW9uUHJvZ3JhbS51bmlmb3Jtcy52ZWxvY2l0aWVzLCAwKVxyXG4gICAgZ2wudW5pZm9ybTFpKHRoaXMucG9zaXRpb25Qcm9ncmFtLnVuaWZvcm1zLnBvc2l0aW9ucywgMSlcclxuICAgIGdsLnVuaWZvcm0yZih0aGlzLnBvc2l0aW9uUHJvZ3JhbS51bmlmb3Jtcy52aWV3cG9ydCwgXHJcbiAgICAgICAgICAgICAgICAgZW1pdHRlci5wb3NUYXJnZXRzWzFdLndpZHRoLCBcclxuICAgICAgICAgICAgICAgICBlbWl0dGVyLnBvc1RhcmdldHNbMV0uaGVpZ2h0KVxyXG4gICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIDYpXHJcblxyXG4gICAgdG1wQnVmICAgICAgICAgICAgICAgID0gZW1pdHRlci5wb3NUYXJnZXRzWzBdXHJcbiAgICBlbWl0dGVyLnBvc1RhcmdldHNbMF0gPSBlbWl0dGVyLnBvc1RhcmdldHNbMV1cclxuICAgIGVtaXR0ZXIucG9zVGFyZ2V0c1sxXSA9IHRtcEJ1ZlxyXG4gIH1cclxufVxyXG5cclxuR1BVUGFydGljbGVTeXN0ZW0ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChjYW1lcmEsIGxpZ2h0cywgZ3B1RW1pdHRlcnMpIHtcclxuICB2YXIgZ2wgICAgICAgICAgICAgICA9IHRoaXMuZ2xcclxuICB2YXIgdmlld01hdHJpeCAgICAgICA9IGNhbWVyYS52aWV3TWF0cml4XHJcbiAgdmFyIHByb2plY3Rpb25NYXRyaXggPSBjYW1lcmEucHJvamVjdGlvbk1hdHJpeFxyXG4gIHZhciByVW5pZm9ybXMgICAgICAgID0gdGhpcy5yZW5kZXJQcm9ncmFtLnVuaWZvcm1zXHJcbiAgdmFyIGVtaXR0ZXJcclxuXHJcbiAgZ2wudXNlUHJvZ3JhbSh0aGlzLnJlbmRlclByb2dyYW0ucHJvZ3JhbSlcclxuICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG51bGwpXHJcbiAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVClcclxuICBnbC52aWV3cG9ydCgwLCAwLCB0aGlzLmdsLmRyYXdpbmdCdWZmZXJXaWR0aCwgdGhpcy5nbC5kcmF3aW5nQnVmZmVySGVpZ2h0KVxyXG4gIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5yZW5kZXJQcm9ncmFtLnVuaWZvcm1zLnZpZXdNYXRyaXgsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgZmFsc2UsIHZpZXdNYXRyaXgpIFxyXG4gIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5yZW5kZXJQcm9ncmFtLnVuaWZvcm1zLnByb2plY3Rpb25NYXRyaXgsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgZmFsc2UsIHByb2plY3Rpb25NYXRyaXgpIFxyXG4gIGdsLnVuaWZvcm0yZih0aGlzLnJlbmRlclByb2dyYW0udW5pZm9ybXMuc2NyZWVuRGltZW5zaW9ucywgXHJcbiAgICAgICAgICAgICAgIGdsLmRyYXdpbmdCdWZmZXJXaWR0aCwgZ2wuZHJhd2luZ0J1ZmZlckhlaWdodClcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaWdodHMubGVuZ3RoOyBpKyspIHtcclxuICAgIGdsLnVuaWZvcm0zZihyVW5pZm9ybXNbXCJsaWdodHNbXCIgKyBpICsgXCJdLnBvc2l0aW9uXCJdLFxyXG4gICAgICAgICAgICAgICAgIGxpZ2h0c1tpXS5waHlzaWNzLnBvc2l0aW9uWzBdLFxyXG4gICAgICAgICAgICAgICAgIGxpZ2h0c1tpXS5waHlzaWNzLnBvc2l0aW9uWzFdLFxyXG4gICAgICAgICAgICAgICAgIGxpZ2h0c1tpXS5waHlzaWNzLnBvc2l0aW9uWzJdKVxyXG4gICAgZ2wudW5pZm9ybTNmKHJVbmlmb3Jtc1tcImxpZ2h0c1tcIiArIGkgKyBcIl0uY29sb3JcIl0sXHJcbiAgICAgICAgICAgICAgICAgbGlnaHRzW2ldLmxpZ2h0LmNvbG9yWzBdLFxyXG4gICAgICAgICAgICAgICAgIGxpZ2h0c1tpXS5saWdodC5jb2xvclsxXSxcclxuICAgICAgICAgICAgICAgICBsaWdodHNbaV0ubGlnaHQuY29sb3JbMl0pXHJcbiAgICBnbC51bmlmb3JtMWYoclVuaWZvcm1zW1wibGlnaHRzW1wiICsgaSArIFwiXS5pbnRlbnNpdHlcIl0sXHJcbiAgICAgICAgICAgICAgICAgbGlnaHRzW2ldLmxpZ2h0LmludGVuc2l0eSlcclxuICB9XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZ3B1RW1pdHRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHBoeXNpY3MgPSBncHVFbWl0dGVyc1tpXS5waHlzaWNzXHJcbiAgICBlbWl0dGVyID0gZ3B1RW1pdHRlcnNbaV0uZ3B1RW1pdHRlclxyXG5cclxuICAgIGNvbXB1dGVUcmFuc2xhdGlvbk1hdHJpeCh0aGlzLnRyYW5zbGF0aW9uTWF0cml4LCBwaHlzaWNzLnBvc2l0aW9uKVxyXG4gICAgY29tcHV0ZVJvdGF0aW9uTWF0cml4KHRoaXMucm90YXRpb25NYXRyaXgsIHBoeXNpY3Mucm90YXRpb24pXHJcbiAgICBjb21wdXRlU2NhbGVNYXRyaXgodGhpcy5zY2FsZU1hdHJpeCwgcGh5c2ljcy5zY2FsZSlcclxuICAgIGNvbXB1dGVNb2RlbE1hdHJpeCh0aGlzLm1vZGVsTWF0cml4LCB0aGlzLnRyYW5zbGF0aW9uTWF0cml4LCBcclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYWxlTWF0cml4LCB0aGlzLnJvdGF0aW9uTWF0cml4KVxyXG4gICAgY29tcHV0ZVRyYW5zZm9ybU1hdHJpeCh0aGlzLnRyYW5zZm9ybU1hdHJpeCwgdGhpcy5tb2RlbE1hdHJpeCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld01hdHJpeCwgcHJvamVjdGlvbk1hdHJpeClcclxuXHJcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMucmVuZGVyUHJvZ3JhbS51bmlmb3Jtcy5tb2RlbE1hdHJpeCwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLCB0aGlzLm1vZGVsTWF0cml4KVxyXG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLnJlbmRlclByb2dyYW0udW5pZm9ybXMudHJhbnNmb3JtTWF0cml4LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsIHRoaXMudHJhbnNmb3JtTWF0cml4KVxyXG4gICAgZ2wudW5pZm9ybTRmKHRoaXMucmVuZGVyUHJvZ3JhbS51bmlmb3Jtcy5jb2xvciwgXHJcbiAgICAgICAgICAgICAgICAgZW1pdHRlci5jb2xvclswXSxcclxuICAgICAgICAgICAgICAgICBlbWl0dGVyLmNvbG9yWzFdLFxyXG4gICAgICAgICAgICAgICAgIGVtaXR0ZXIuY29sb3JbMl0sXHJcbiAgICAgICAgICAgICAgICAgZW1pdHRlci5jb2xvclszXSlcclxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApXHJcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBlbWl0dGVyLnBvc1RhcmdldHNbMF0udGV4dHVyZSlcclxuICAgIGdsLnVuaWZvcm0xaSh0aGlzLnJlbmRlclByb2dyYW0udW5pZm9ybXMucG9zaXRpb25zLCAwKVxyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGVtaXR0ZXIuY29vcmRCdWZmZXIpXHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMucmVuZGVyUHJvZ3JhbS5hdHRyaWJ1dGVzLnBhcnRpY2xlQ29vcmQsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAyLCBnbC5GTE9BVCwgZ2wuRkFMU0UsIDAsIDApXHJcbiAgICBnbC5kcmF3QXJyYXlzKGdsLlBPSU5UUywgMCwgZW1pdHRlci5hbGl2ZUNvdW50KVxyXG4gIH1cclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IEdhbWVwYWRNYW5hZ2VyIFxuXG52YXIgR0FNRVBBRF9DT1VOVCA9IDRcbnZhciBCVVRUT05fQ09VTlQgID0gMTZcblxuZnVuY3Rpb24gR2FtZXBhZFN0YXRlICgpIHtcbiAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZVxuICB0aGlzLmF4ZXMgICAgICA9IG5ldyBBcnJheShHQU1FUEFEX0NPVU5UKVxuICB0aGlzLmlzRG93bnMgICA9IG5ldyBBcnJheShCVVRUT05fQ09VTlQpIFxuICB0aGlzLmp1c3REb3ducyA9IG5ldyBBcnJheShCVVRUT05fQ09VTlQpIFxuICB0aGlzLmp1c3RVcHMgICA9IG5ldyBBcnJheShCVVRUT05fQ09VTlQpIFxufVxuXG5mdW5jdGlvbiBHYW1lcGFkTWFuYWdlciAod2luLCBuYXYpIHtcbiAgdmFyIGdldEdhbWVQYWRzID0gKG5hdi5nZXRHYW1lcGFkcyB8fCBuYXYud2Via2l0R2V0R2FtZXBhZHMpLmJpbmQobmF2KVxuXG4gIHRoaXMuaGFuZGxlcyAgID0gbmV3IEFycmF5KEdBTUVQQURfQ09VTlQpXG4gIHRoaXMucGFkU3RhdGVzID0gW1xuICAgIG5ldyBHYW1lcGFkU3RhdGUsXG4gICAgbmV3IEdhbWVwYWRTdGF0ZSxcbiAgICBuZXcgR2FtZXBhZFN0YXRlLFxuICAgIG5ldyBHYW1lcGFkU3RhdGVcbiAgXVxuXG4gIHRoaXMudGljayA9IGZ1bmN0aW9uIChkVCkge1xuICAgIHZhciBncHMgPSBnZXRHYW1lUGFkcygpXG4gICAgdmFyIGkgICA9IC0xIFxuICAgIHZhciBqICAgPSAtMVxuICAgIHZhciBwc1xuXG4gICAgd2hpbGUgKCsraSA8IEdBTUVQQURfQ09VTlQpIHtcbiAgICAgIGlmIChncHNbaV0pIHtcbiAgICAgICAgcHMgPSB0aGlzLnBhZFN0YXRlc1tpXVxuICAgICAgICBwcy5jb25uZWN0ZWQgPSB0cnVlXG4gICAgICAgIHBzLmF4ZXMgICAgICA9IGdwc1tpXS5heGVzIFxuICAgICAgICB3aGlsZSAoKytqIDwgQlVUVE9OX0NPVU5UKSB7XG4gICAgICAgICAgcHMuanVzdERvd25zW2pdID0gZ3BzW2ldLmJ1dHRvbnNbal0ucHJlc3NlZCAmJiAhcHMuaXNEb3duc1tqXVxuICAgICAgICAgIHBzLmp1c3RVcHNbal0gICA9IHBzLmlzRG93bnNbal0gJiYgIWdwc1tpXS5idXR0b25zW2pdLnByZXNzZWRcbiAgICAgICAgICBwcy5pc0Rvd25zW2pdICAgPSBncHNbaV0uYnV0dG9uc1tqXS5wcmVzc2VkXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkTWFuYWdlclxuXG52YXIgS0VZX0NPVU5UID0gMjU2XG5cbmZ1bmN0aW9uIEtleWJvYXJkTWFuYWdlciAoZWxlbWVudCkge1xuICB2YXIgaXNEb3ducyAgICAgICA9IG5ldyBBcnJheShLRVlfQ09VTlQpXG4gIHZhciBqdXN0RG93bnMgICAgID0gbmV3IEFycmF5KEtFWV9DT1VOVClcbiAgdmFyIGp1c3RVcHMgICAgICAgPSBuZXcgQXJyYXkoS0VZX0NPVU5UKVxuICB2YXIgZG93bkR1cmF0aW9ucyA9IG5ldyBBcnJheShLRVlfQ09VTlQpXG4gIFxuICB2YXIgaGFuZGxlS2V5RG93biA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGVcblxuICAgIGp1c3REb3duc1trZXlDb2RlXSA9ICFpc0Rvd25zW2tleUNvZGVdXG4gICAgaXNEb3duc1trZXlDb2RlXSAgID0gdHJ1ZVxuICB9XG5cbiAgdmFyIGhhbmRsZUtleVVwID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIga2V5Q29kZSA9IGUua2V5Q29kZVxuXG4gICAganVzdFVwc1trZXlDb2RlXSAgID0gdHJ1ZVxuICAgIGlzRG93bnNba2V5Q29kZV0gICA9IGZhbHNlXG4gIH1cblxuICB2YXIgaGFuZGxlQmx1ciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaSA9IC0xXG5cbiAgICB3aGlsZSAoKytpIDwgS0VZX0NPVU5UKSB7XG4gICAgICBpc0Rvd25zW2ldICAgPSAwXG4gICAgICBqdXN0RG93bnNbaV0gPSAwXG4gICAgICBqdXN0VXBzW2ldICAgPSAwXG4gICAgfVxuICB9XG5cbiAgdGhpcy5pc0Rvd25zICAgICAgICAgPSBpc0Rvd25zXG4gIHRoaXMuanVzdFVwcyAgICAgICAgID0ganVzdFVwc1xuICB0aGlzLmp1c3REb3ducyAgICAgICA9IGp1c3REb3duc1xuICB0aGlzLmRvd25EdXJhdGlvbnMgICA9IGRvd25EdXJhdGlvbnNcbiAgdGhpcy5rZXlkb3duTGlzdGVuZXIgPSBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleURvd24pXG4gIHRoaXMua2V5dXBMaXN0ZW5lciAgID0gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgaGFuZGxlS2V5VXApXG4gIHRoaXMuYmx1ckxpc3RlbmVyICAgID0gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBoYW5kbGVCbHVyKVxuXG4gIC8vYXNzaWduIHRhYkluZGV4IGlmIHRoZXJlIGlzbid0IG9uZSB0byBhbGxvdyBlbGVtZW50IHRvIGJlIGZvY3VzZWRcbiAgZWxlbWVudC50YWJJbmRleCA9IGVsZW1lbnQudGFiSW5kZXggPT09IC0xID8gMCA6IGVsZW1lbnQudGFiSW5kZXhcblxuICB0aGlzLnRpY2sgPSBmdW5jdGlvbiAoZFQpIHtcbiAgICB2YXIgaSA9IC0xXG5cbiAgICB3aGlsZSAoKytpIDwgS0VZX0NPVU5UKSB7XG4gICAgICBqdXN0RG93bnNbaV0gPSBmYWxzZSBcbiAgICAgIGp1c3RVcHNbaV0gICA9IGZhbHNlXG4gICAgICBpZiAoaXNEb3duc1tpXSkgZG93bkR1cmF0aW9uc1tpXSArPSBkVFxuICAgICAgZWxzZSAgICAgICAgICAgIGRvd25EdXJhdGlvbnNbaV0gPSAwXG4gICAgfVxuICB9XG5cbiAgdGhpcy5kZXRhY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmtleWRvd25MaXN0ZW5lcilcbiAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLmtleXVwTGlzdGVuZXIpXG4gICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYmx1clwiLCB0aGlzLmJsdXJMaXN0ZW5lcilcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBTY3JlZW5RdWFkXHJcblxyXG5mdW5jdGlvbiBTY3JlZW5RdWFkICgpIHtcclxuICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheShbXHJcbiAgICAxLCAxLCAtMSwgMSwgLTEsIC0xLFxyXG4gICAgMSwgMSwgLTEsIC0xLCAxLCAtMVxyXG4gIF0pXHJcbn1cclxuIiwidmFyIFBoeXNpY3MgICAgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9QaHlzaWNzXCIpXHJcbnZhciBBdHRyYWN0aXZlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvQXR0cmFjdGl2ZVwiKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBdHRyYWN0b3JcclxuXHJcbi8vIFt4LHksel0gLT4gTnVtYmVyIC0+IEF0dHJhY3RvclxyXG5mdW5jdGlvbiBBdHRyYWN0b3IgKHBvc2l0aW9uLCBtYXNzKSB7XHJcbiAgdGhpcy5waHlzaWNzICAgICAgPSBuZXcgUGh5c2ljcyhwb3NpdGlvbiwgWzAsIDAsIDBdKVxyXG4gIHRoaXMucGh5c2ljcy5tYXNzID0gbWFzc1xyXG4gIHRoaXMuYXR0cmFjdGl2ZSAgID0gbmV3IEF0dHJhY3RpdmUodHJ1ZSlcclxufVxyXG4iLCJ2YXIgR1BVRW1pdHRlciA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL0dQVUVtaXR0ZXJcIilcclxudmFyIFBoeXNpY3MgICAgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9QaHlzaWNzXCIpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdQVVBhcnRpY2xlRW1pdHRlclxyXG5cclxuLy8gR0xDb250ZXh0IC0+IFt4LHksel0gLT4gW3IsZyxiLGFdIC0+IEdQVVBhcnRpY2xlRW1pdHRlclxyXG5mdW5jdGlvbiBHUFVQYXJ0aWNsZUVtaXR0ZXIgKGdsLCBwb3NpdGlvbiwgY29sb3IpIHtcclxuICB0aGlzLnBoeXNpY3MgICAgPSBuZXcgUGh5c2ljcyhwb3NpdGlvbiwgWzAsIDAsIDBdKVxyXG4gIHRoaXMuZ3B1RW1pdHRlciA9IG5ldyBHUFVFbWl0dGVyKGdsLCBjb2xvcilcclxufVxyXG4iLCJ2YXIgTGlnaHQgICA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL0xpZ2h0XCIpXHJcbnZhciBQaHlzaWNzID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvUGh5c2ljc1wiKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb2ludExpZ2h0XHJcblxyXG5mdW5jdGlvbiBQb2ludExpZ2h0IChwb3NpdGlvbiwgY29sb3IsIGludGVuc2l0eSkge1xyXG4gIHRoaXMucGh5c2ljcyA9IG5ldyBQaHlzaWNzKHBvc2l0aW9uLCBbMCwgMCwgMF0pIFxyXG4gIHRoaXMubGlnaHQgICA9IG5ldyBMaWdodChjb2xvciwgaW50ZW5zaXR5KVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gQXR0cmFjdGl2ZVxuXG5mdW5jdGlvbiBBdHRyYWN0aXZlIChhY3RpdmUpIHtcbiAgdGhpcy5hY3RpdmUgPSBhY3RpdmUgPT0gbnVsbCA/IHRydWUgOiBhY3RpdmVcbn1cbiIsInZhciBHTFJlbmRlclRhcmdldCA9IHJlcXVpcmUoXCIuLi90eXBlcy9HTFJlbmRlclRhcmdldFwiKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHUFVFbWl0dGVyXHJcblxyXG52YXIgUEFSVElDTEVfU1RSSURFID0gNFxyXG5cclxuZnVuY3Rpb24gR1BVRW1pdHRlciAoZ2wsIGNvbG9yKSB7XHJcbiAgaWYgKCFnbC5nZXRFeHRlbnNpb24oXCJPRVNfdGV4dHVyZV9mbG9hdFwiKSkgdGhyb3cgbmV3IEVycm9yKFwibm8gZmxvYXQgdGV4dHVyZXNcIilcclxuXHJcbiAgdmFyIFJPV19TSVpFICAgICAgID0gMjU2XHJcbiAgdmFyIENPVU5UICAgICAgICAgID0gUk9XX1NJWkUgKiBST1dfU0laRVxyXG4gIHZhciBwb3NpdGlvbnMgICAgICA9IGluaXRpYWxpemVQYXJ0aWNsZVhZWigwLCAwLCAwLCBuZXcgRmxvYXQzMkFycmF5KDQgKiBDT1VOVCkpXHJcbiAgdmFyIHZlbG9jaXRpZXMgICAgID0gaW5pdGlhbGl6ZVBhcnRpY2xlWFlaKDAsIDAsIDAsIG5ldyBGbG9hdDMyQXJyYXkoNCAqIENPVU5UKSlcclxuICB2YXIgcG9zVGFyZ2V0MSAgICAgPSBuZXcgR0xSZW5kZXJUYXJnZXQoZ2wsIFJPV19TSVpFLCBST1dfU0laRSwgcG9zaXRpb25zKVxyXG4gIHZhciBwb3NUYXJnZXQyICAgICA9IG5ldyBHTFJlbmRlclRhcmdldChnbCwgUk9XX1NJWkUsIFJPV19TSVpFLCBwb3NpdGlvbnMpXHJcbiAgdmFyIHZlbFRhcmdldDEgICAgID0gbmV3IEdMUmVuZGVyVGFyZ2V0KGdsLCBST1dfU0laRSwgUk9XX1NJWkUsIHZlbG9jaXRpZXMpXHJcbiAgdmFyIHZlbFRhcmdldDIgICAgID0gbmV3IEdMUmVuZGVyVGFyZ2V0KGdsLCBST1dfU0laRSwgUk9XX1NJWkUsIHZlbG9jaXRpZXMpXHJcbiAgdmFyIHBhcnRpY2xlQ29vcmRzID0gYnVpbGRQYXJ0aWNsZUNvb3JkcyhST1dfU0laRSwgUk9XX1NJWkUpXHJcbiAgdmFyIGNvb3JkQnVmZmVyICAgID0gZ2wuY3JlYXRlQnVmZmVyKClcclxuXHJcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGNvb3JkQnVmZmVyKVxyXG4gIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBwYXJ0aWNsZUNvb3JkcywgZ2wuU1RBVElDX0RSQVcpXHJcblxyXG4gIHRoaXMucG9zVGFyZ2V0cyAgICA9IFtwb3NUYXJnZXQxLCBwb3NUYXJnZXQyXVxyXG4gIHRoaXMudmVsVGFyZ2V0cyAgICA9IFt2ZWxUYXJnZXQxLCB2ZWxUYXJnZXQyXVxyXG4gIHRoaXMuY29vcmRCdWZmZXIgICA9IGNvb3JkQnVmZmVyXHJcbiAgdGhpcy5hbGl2ZUNvdW50ICAgID0gUk9XX1NJWkUgKiBST1dfU0laRVxyXG4gIHRoaXMuY29sb3IgICAgICAgICA9IGNvbG9yXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1aWxkUGFydGljbGVDb29yZHMgKHdpZHRoLCBoZWlnaHQpIHtcclxuICB2YXIgYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KHdpZHRoICogMiAqIGhlaWdodClcclxuXHJcbiAgZm9yICh2YXIgaiA9IDA7IGogPCBoZWlnaHQ7IGorKykge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XHJcbiAgICAgIGFycmF5W2ogKiAyICogd2lkdGggKyBpICogMl0gICAgID0gW2kgLyB3aWR0aF1cclxuICAgICAgYXJyYXlbaiAqIDIgKiB3aWR0aCArIGkgKiAyICsgMV0gPSBbaiAvIGhlaWdodF1cclxuICAgIH0gXHJcbiAgfVxyXG4gIHJldHVybiBhcnJheVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRQYXJ0aWNsZVhZWiAoaW5kZXgsIHgsIHksIHosIGFycmF5KSB7XHJcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXhdICAgICA9IHhcclxuICBhcnJheVtQQVJUSUNMRV9TVFJJREUgKiBpbmRleCArIDFdID0geVxyXG4gIGFycmF5W1BBUlRJQ0xFX1NUUklERSAqIGluZGV4ICsgMl0gPSB6XHJcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXggKyAzXSA9IDFcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdGlhbGl6ZVBhcnRpY2xlWFlaICh4LCB5LCB6LCBhcnJheSkge1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoIC8gUEFSVElDTEVfU1RSSURFOyBpKyspIHtcclxuICAgIHNldFBhcnRpY2xlWFlaKGksIFxyXG4gICAgICAgICAgICAgICAgICAgeCArIE1hdGgucmFuZG9tKCkgLSAuNSwgXHJcbiAgICAgICAgICAgICAgICAgICB5ICsgTWF0aC5yYW5kb20oKSAtIC41LCBcclxuICAgICAgICAgICAgICAgICAgIHogKyBNYXRoLnJhbmRvbSgpIC0gLjUsIFxyXG4gICAgICAgICAgICAgICAgICAgYXJyYXkpXHJcbiAgfVxyXG4gIHJldHVybiBhcnJheVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gTGlnaHRcclxuXHJcbmZ1bmN0aW9uIExpZ2h0IChjb2xvciwgaW50ZW5zaXR5KSB7XHJcbiAgdGhpcy5jb2xvciAgICAgPSBjb2xvclxyXG4gIHRoaXMuaW50ZW5zaXR5ID0gaW50ZW5zaXR5XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBQaHlzaWNzXHJcblxyXG4vLyBbeCx5LHpdIC0+IFtkeCwgZHksIGR6XSAtPiBQaHlzaWNzXHJcbmZ1bmN0aW9uIFBoeXNpY3MgKHBvc2l0aW9uLCB2ZWxvY2l0eSkge1xyXG4gIHRoaXMucG9zaXRpb24gICAgID0gcG9zaXRpb25cclxuICB0aGlzLnZlbG9jaXR5ICAgICA9IHZlbG9jaXR5XHJcbiAgdGhpcy5hY2NlbGVyYXRpb24gPSBbMCwgMCwgMF1cclxuICB0aGlzLm1hc3MgICAgICAgICA9IDFcclxuICB0aGlzLnNjYWxlICAgICAgICA9IFsxLCAxLCAxXVxyXG4gIHRoaXMucm90YXRpb24gICAgID0gWzAsIDAsIDBdXHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMucmVzaXplV2l0aFJhdGlvID0gcmVzaXplV2l0aFJhdGlvXHJcblxyXG5mdW5jdGlvbiByZXNpemVXaXRoUmF0aW8gKHJhdGlvLCByZWZlcmVuY2UsIHN1YmplY3QpIHtcclxuICB2YXIgdGFyZ2V0QXNwZWN0ID0gcmVmZXJlbmNlLmNsaWVudFdpZHRoIC8gcmVmZXJlbmNlLmNsaWVudEhlaWdodFxyXG4gIHZhciBuZXdXaWR0aCAgICAgPSByYXRpbyA8IHRhcmdldEFzcGVjdFxyXG4gICAgPyB+fihyZWZlcmVuY2UuY2xpZW50SGVpZ2h0ICogcmF0aW8pXHJcbiAgICA6IHJlZmVyZW5jZS5jbGllbnRXaWR0aFxyXG4gIHZhciBuZXdIZWlnaHQgICAgPSB+fihuZXdXaWR0aCAvIHJhdGlvKVxyXG4gIHZhciBvbGRXaWR0aCAgICAgPSBzdWJqZWN0LmNsaWVudFdpZHRoXHJcbiAgdmFyIG9sZEhlaWdodCAgICA9IHN1YmplY3QuY2xpZW50SGVpZ2h0XHJcblxyXG4gIGlmIChvbGRXaWR0aCA9PT0gbmV3V2lkdGggJiYgb2xkSGVpZ2h0ID09PSBuZXdIZWlnaHQpIHJldHVyblxyXG4gIHN1YmplY3QuY2xpZW50V2lkdGggID0gbmV3V2lkdGhcclxuICBzdWJqZWN0LmNsaWVudEhlaWdodCA9IG5ld0hlaWdodFxyXG4gIHN1YmplY3Qud2lkdGggICAgICAgID0gbmV3V2lkdGhcclxuICBzdWJqZWN0LmhlaWdodCAgICAgICA9IG5ld0hlaWdodFxyXG59XHJcbiIsInZhciBHTFNoZWxsICAgICAgICAgICAgPSByZXF1aXJlKFwiLi9HTFNoZWxsXCIpXHJcbnZhciBHUFVQYXJ0aWNsZVN5c3RlbSAgPSByZXF1aXJlKFwiLi9HUFVQYXJ0aWNsZVN5c3RlbVwiKVxyXG52YXIgS2V5Ym9hcmRNYW5hZ2VyICAgID0gcmVxdWlyZShcIi4vS2V5Ym9hcmRNYW5hZ2VyXCIpXHJcbnZhciBHYW1lcGFkTWFuYWdlciAgICAgPSByZXF1aXJlKFwiLi9HYW1lcGFkTWFuYWdlclwiKVxyXG52YXIgR1BVUGFydGljbGVFbWl0dGVyID0gcmVxdWlyZShcIi4vYXNzZW1ibGllcy9HUFVQYXJ0aWNsZUVtaXR0ZXJcIilcclxudmFyIEF0dHJhY3RvciAgICAgICAgICA9IHJlcXVpcmUoXCIuL2Fzc2VtYmxpZXMvQXR0cmFjdG9yXCIpXHJcbnZhciBQb2ludExpZ2h0ICAgICAgICAgPSByZXF1aXJlKFwiLi9hc3NlbWJsaWVzL1BvaW50TGlnaHRcIilcclxudmFyIENhbWVyYSAgICAgICAgICAgICA9IHJlcXVpcmUoXCIuL0NhbWVyYVwiKVxyXG52YXIgcmFuZFV0aWxzICAgICAgICAgID0gcmVxdWlyZShcIi4vcmFuZG9tLXV0aWxzXCIpXHJcbnZhciByYW5kb21Cb3VuZCAgICAgICAgPSByYW5kVXRpbHMucmFuZG9tQm91bmRcclxudmFyIHJhbmRvbVZlY3RvciAgICAgICA9IHJhbmRVdGlscy5yYW5kb21WZWN0b3JcclxudmFyIHNoZWxsICAgICAgICAgICAgICA9IG5ldyBHTFNoZWxsKGRvY3VtZW50LmJvZHksIDE5MjAgLyAxMDgwKVxyXG52YXIgZ3B1UGFydGljbGVTeXN0ZW0gID0gbmV3IEdQVVBhcnRpY2xlU3lzdGVtKHNoZWxsLmdsKVxyXG52YXIga2V5Ym9hcmRNYW5hZ2VyICAgID0gbmV3IEtleWJvYXJkTWFuYWdlcihkb2N1bWVudC5ib2R5KVxyXG52YXIgZ2FtZXBhZE1hbmFnZXIgICAgID0gbmV3IEdhbWVwYWRNYW5hZ2VyKHdpbmRvdywgbmF2aWdhdG9yKVxyXG5cclxudmFyIGVudGl0aWVzID0gW1xyXG4gIG5ldyBHUFVQYXJ0aWNsZUVtaXR0ZXIoc2hlbGwuZ2wsIHJhbmRvbVZlY3RvcigzLCAtMSwgMSksIHJhbmRvbVZlY3Rvcig0LCAwLCAxKSksXHJcbiAgbmV3IEdQVVBhcnRpY2xlRW1pdHRlcihzaGVsbC5nbCwgcmFuZG9tVmVjdG9yKDMsIC0xLCAxKSwgcmFuZG9tVmVjdG9yKDQsIDAsIDEpKSxcclxuICBuZXcgR1BVUGFydGljbGVFbWl0dGVyKHNoZWxsLmdsLCByYW5kb21WZWN0b3IoMywgLTEsIDEpLCByYW5kb21WZWN0b3IoNCwgMCwgMSkpLFxyXG4gIG5ldyBHUFVQYXJ0aWNsZUVtaXR0ZXIoc2hlbGwuZ2wsIHJhbmRvbVZlY3RvcigzLCAtMSwgMSksIHJhbmRvbVZlY3Rvcig0LCAwLCAxKSksXHJcbiAgbmV3IEdQVVBhcnRpY2xlRW1pdHRlcihzaGVsbC5nbCwgcmFuZG9tVmVjdG9yKDMsIC0xLCAxKSwgcmFuZG9tVmVjdG9yKDQsIDAsIDEpKSxcclxuICBuZXcgR1BVUGFydGljbGVFbWl0dGVyKHNoZWxsLmdsLCByYW5kb21WZWN0b3IoMywgLTEsIDEpLCByYW5kb21WZWN0b3IoNCwgMCwgMSkpLFxyXG4gIG5ldyBHUFVQYXJ0aWNsZUVtaXR0ZXIoc2hlbGwuZ2wsIHJhbmRvbVZlY3RvcigzLCAtMSwgMSksIHJhbmRvbVZlY3Rvcig0LCAwLCAxKSksXHJcbiAgbmV3IEdQVVBhcnRpY2xlRW1pdHRlcihzaGVsbC5nbCwgcmFuZG9tVmVjdG9yKDMsIC0xLCAxKSwgcmFuZG9tVmVjdG9yKDQsIDAsIDEpKSxcclxuICBuZXcgR1BVUGFydGljbGVFbWl0dGVyKHNoZWxsLmdsLCByYW5kb21WZWN0b3IoMywgLTEsIDEpLCByYW5kb21WZWN0b3IoNCwgMCwgMSkpLFxyXG4gIG5ldyBHUFVQYXJ0aWNsZUVtaXR0ZXIoc2hlbGwuZ2wsIHJhbmRvbVZlY3RvcigzLCAtMSwgMSksIHJhbmRvbVZlY3Rvcig0LCAwLCAxKSksXHJcbiAgbmV3IEF0dHJhY3RvcihyYW5kb21WZWN0b3IoMywgLTEsIDEpLCByYW5kb21Cb3VuZCgwLCAyMDApKSxcclxuICBuZXcgQXR0cmFjdG9yKHJhbmRvbVZlY3RvcigzLCAtMSwgMSksIHJhbmRvbUJvdW5kKDAsIDIwMCkpLFxyXG4gIG5ldyBBdHRyYWN0b3IocmFuZG9tVmVjdG9yKDMsIC0xLCAxKSwgcmFuZG9tQm91bmQoMCwgMjAwKSksXHJcbiAgbmV3IFBvaW50TGlnaHQocmFuZG9tVmVjdG9yKDMsIC0xLCAxKSwgcmFuZG9tVmVjdG9yKDMsIDAsIDEpLCAxKSxcclxuICBuZXcgUG9pbnRMaWdodChyYW5kb21WZWN0b3IoMywgLTEsIDEpLCByYW5kb21WZWN0b3IoMywgMCwgMSksIDEpLFxyXG4gIG5ldyBQb2ludExpZ2h0KHJhbmRvbVZlY3RvcigzLCAtMSwgMSksIHJhbmRvbVZlY3RvcigzLCAwLCAxKSwgMSlcclxuXVxyXG52YXIgZ3B1RW1pdHRlcnMgPSBlbnRpdGllcy5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuICEhZS5ncHVFbWl0dGVyICYmICEhZS5waHlzaWNzfSlcclxudmFyIGF0dHJhY3RvcnMgID0gZW50aXRpZXMuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiAhIWUuYXR0cmFjdGl2ZSAmJiAhIWUucGh5c2ljc30pXHJcbnZhciBsaWdodHMgICAgICA9IGVudGl0aWVzLmZpbHRlcihmdW5jdGlvbiAoZSkgeyByZXR1cm4gISFlLmxpZ2h0ICYmICEhZS5waHlzaWNzfSlcclxudmFyIGNhbWVyYSAgICAgID0gbmV3IENhbWVyYShzaGVsbC5nbCwgMCwgMCwgMi41LCAwLCAwLCAwKVxyXG5cclxuc2hlbGwucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gIGdwdVBhcnRpY2xlU3lzdGVtLnJlbmRlcihjYW1lcmEsIGxpZ2h0cywgZ3B1RW1pdHRlcnMpXHJcbn1cclxuXHJcbnNoZWxsLnVwZGF0ZSA9IGZ1bmN0aW9uIChkVCkge1xyXG4gIGtleWJvYXJkTWFuYWdlci50aWNrKGRUKVxyXG4gIGdhbWVwYWRNYW5hZ2VyLnRpY2soZFQpXHJcblxyXG4gIC8vZG93blxyXG4gIGlmIChnYW1lcGFkTWFuYWdlci5wYWRTdGF0ZXNbMF0uaXNEb3duc1swXSkge1xyXG4gICAgYXR0cmFjdG9yc1swXS5waHlzaWNzLnBvc2l0aW9uWzFdIC09IC4wMVxyXG4gIH1cclxuXHJcbiAgLy9yaWdodFxyXG4gIGlmIChnYW1lcGFkTWFuYWdlci5wYWRTdGF0ZXNbMF0uaXNEb3duc1sxXSkge1xyXG4gICAgYXR0cmFjdG9yc1swXS5waHlzaWNzLnBvc2l0aW9uWzBdICs9IDAuMDFcclxuICB9XHJcblxyXG4gIC8vbGVmdFxyXG4gIGlmIChnYW1lcGFkTWFuYWdlci5wYWRTdGF0ZXNbMF0uaXNEb3duc1syXSkge1xyXG4gICAgYXR0cmFjdG9yc1swXS5waHlzaWNzLnBvc2l0aW9uWzBdIC09IDAuMDFcclxuICB9XHJcblxyXG4gIC8vdXBcclxuICBpZiAoZ2FtZXBhZE1hbmFnZXIucGFkU3RhdGVzWzBdLmlzRG93bnNbM10pIHtcclxuICAgIGF0dHJhY3RvcnNbMF0ucGh5c2ljcy5wb3NpdGlvblsxXSArPSAwLjAxXHJcbiAgfVxyXG4gIFxyXG4gIGdwdVBhcnRpY2xlU3lzdGVtLnVwZGF0ZShkVCwgZ3B1RW1pdHRlcnMsIGF0dHJhY3RvcnMpXHJcbn1cclxuIiwidmFyIG1hdDQgPSByZXF1aXJlKFwiZ2wtbWF0NFwiKVxuXG5tb2R1bGUuZXhwb3J0cy5jb21wdXRlVHJhbnNmb3JtTWF0cml4ICAgID0gY29tcHV0ZVRyYW5zZm9ybU1hdHJpeFxubW9kdWxlLmV4cG9ydHMuY29tcHV0ZVRyYW5zbGF0aW9uTWF0cml4ICA9IGNvbXB1dGVUcmFuc2xhdGlvbk1hdHJpeFxubW9kdWxlLmV4cG9ydHMuY29tcHV0ZVJvdGF0aW9uTWF0cml4ICAgICA9IGNvbXB1dGVSb3RhdGlvbk1hdHJpeFxubW9kdWxlLmV4cG9ydHMuY29tcHV0ZVNjYWxlTWF0cml4ICAgICAgICA9IGNvbXB1dGVTY2FsZU1hdHJpeFxubW9kdWxlLmV4cG9ydHMuY29tcHV0ZU1vZGVsTWF0cml4ICAgICAgICA9IGNvbXB1dGVNb2RlbE1hdHJpeFxuXG5mdW5jdGlvbiBjb21wdXRlVHJhbnNmb3JtTWF0cml4IChvdXQsIG1vZGVsTWF0LCB2aWV3TWF0LCBwcm9qTWF0KSB7XG4gIG1hdDQuaWRlbnRpdHkob3V0KVxuICBtYXQ0Lm11bHRpcGx5KG91dCwgcHJvak1hdCwgdmlld01hdClcbiAgbWF0NC5tdWx0aXBseShvdXQsIG91dCwgbW9kZWxNYXQpXG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gY29tcHV0ZVRyYW5zbGF0aW9uTWF0cml4ICh0cmFuc01hdCwgcG9zaXRpb24pIHtcbiAgbWF0NC5pZGVudGl0eSh0cmFuc01hdCkgIFxuICByZXR1cm4gbWF0NC50cmFuc2xhdGUodHJhbnNNYXQsIHRyYW5zTWF0LCBwb3NpdGlvbilcbn1cblxuXG5mdW5jdGlvbiBjb21wdXRlUm90YXRpb25NYXRyaXggKHJvdE1hdCwgcm90YXRpb24pIHtcbiAgbWF0NC5pZGVudGl0eShyb3RNYXQpXG4gIG1hdDQucm90YXRlWChyb3RNYXQsIHJvdE1hdCwgcm90YXRpb25bMF0pXG4gIG1hdDQucm90YXRlWShyb3RNYXQsIHJvdE1hdCwgcm90YXRpb25bMV0pXG4gIG1hdDQucm90YXRlWihyb3RNYXQsIHJvdE1hdCwgcm90YXRpb25bMl0pXG4gIHJldHVybiByb3RNYXRcbn1cblxuZnVuY3Rpb24gY29tcHV0ZVNjYWxlTWF0cml4IChzY2FsZU1hdCwgc2NhbGUpIHtcbiAgc2NhbGVNYXRbMF0gID0gc2NhbGVbMF1cbiAgc2NhbGVNYXRbNV0gID0gc2NhbGVbMV1cbiAgc2NhbGVNYXRbMTBdID0gc2NhbGVbMl1cbiAgcmV0dXJuIHNjYWxlTWF0XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVNb2RlbE1hdHJpeCAobW9kZWxNYXQsIHRyYW5zTWF0LCBzY2FsZU1hdCwgcm90TWF0KSB7XG4gIG1hdDQuaWRlbnRpdHkobW9kZWxNYXQpXG4gIG1hdDQubXVsdGlwbHkobW9kZWxNYXQsIHRyYW5zTWF0LCBzY2FsZU1hdClcbiAgcmV0dXJuIG1hdDQubXVsdGlwbHkobW9kZWxNYXQsIG1vZGVsTWF0LCByb3RNYXQpXG59XG4iLCJtb2R1bGUuZXhwb3J0cy5yYW5kb21Cb3VuZCAgPSByYW5kb21Cb3VuZFxyXG5tb2R1bGUuZXhwb3J0cy5yYW5kb21WZWN0b3IgPSByYW5kb21WZWN0b3JcclxuXHJcbmZ1bmN0aW9uIHJhbmRvbUJvdW5kIChtaW4sIG1heCkge1xyXG4gIHJldHVybiBNYXRoLnJhbmRvbSAoKSAqIChtYXggLSBtaW4pICsgbWluXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJhbmRvbVZlY3RvciAodmVjdG9yU2l6ZSwgbWluLCBtYXgpIHtcclxuICBmb3IgKHZhciB2ZWMgPSBbXSwgaSA9IDA7IGkgPCB2ZWN0b3JTaXplOyBpKyspIHZlYy5wdXNoKHJhbmRvbUJvdW5kKG1pbiwgbWF4KSlcclxuXHJcbiAgcmV0dXJuIHZlY1xyXG59XHJcbiIsInZhciBHTFNoYWRlciA9IHJlcXVpcmUoXCIuL0dMU2hhZGVyXCIpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdMUHJvZ3JhbVxyXG5cclxuZnVuY3Rpb24gZWl0aGVySW5zdGFuY2VPZiAoY3RvciwgdjEsIHYyKSB7XHJcbiAgcmV0dXJuICgodjEgaW5zdGFuY2VvZiBjdG9yKSB8fCAodjIgaW5zdGFuY2VvZiBjdG9yKSkgPyB0cnVlIDogZmFsc2VcclxufVxyXG5cclxuZnVuY3Rpb24gY29tYmluZUVycm9ycyAodjEsIHYyKSB7XHJcbiAgcmV0dXJuIG5ldyBFcnJvcigodjEubWVzc2FnZSB8fCBcIlwiKSArIFwiXFxuXCIgKyAodjIubWVzc2FnZSB8fCBcIlwiKSlcclxufVxyXG5cclxuZnVuY3Rpb24gR0xQcm9ncmFtIChnbCwgdnMsIGZzKSB7XHJcbiAgdmFyIHByb2dyYW0gICAgICAgPSBnbC5jcmVhdGVQcm9ncmFtKHZzLCBmcylcclxuICB2YXIgYXR0cmlidXRlcyAgICA9IHt9XHJcbiAgdmFyIHVuaWZvcm1zICAgICAgPSB7fVxyXG4gIHZhciBudW1BdHRyaWJ1dGVzXHJcbiAgdmFyIG51bVVuaWZvcm1zXHJcbiAgdmFyIGFOYW1lXHJcbiAgdmFyIHVOYW1lXHJcblxyXG4gIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2cylcclxuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnMpXHJcbiAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSlcclxuXHJcbiAgbnVtQXR0cmlidXRlcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX0FUVFJJQlVURVMpXHJcbiAgbnVtVW5pZm9ybXMgICA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX1VOSUZPUk1TKVxyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IG51bUF0dHJpYnV0ZXM7ICsraSkge1xyXG4gICAgYU5hbWUgICAgICAgICAgICAgPSBnbC5nZXRBY3RpdmVBdHRyaWIocHJvZ3JhbSwgaSkubmFtZVxyXG4gICAgYXR0cmlidXRlc1thTmFtZV0gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBhTmFtZSlcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dHJpYnV0ZXNbYU5hbWVdKVxyXG4gIH1cclxuXHJcbiAgZm9yICh2YXIgaiA9IDA7IGogPCBudW1Vbmlmb3JtczsgKytqKSB7XHJcbiAgICB1TmFtZSAgICAgICAgICAgPSBnbC5nZXRBY3RpdmVVbmlmb3JtKHByb2dyYW0sIGopLm5hbWVcclxuICAgIHVuaWZvcm1zW3VOYW1lXSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCB1TmFtZSlcclxuICB9XHJcblxyXG4gIHRoaXMucHJvZ3JhbSAgICA9IHByb2dyYW1cclxuICB0aGlzLnVuaWZvcm1zICAgPSB1bmlmb3Jtc1xyXG4gIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXNcclxufVxyXG5cclxuLy9HTENvbnRleHQgLT4gU3RyaW5nIC0+IFN0cmluZyAtPiBFaXRoZXIgRXJyb3IgfCBHTFByb2dyYW1cclxuR0xQcm9ncmFtLmZyb21Tb3VyY2UgPSBmdW5jdGlvbiAoZ2wsIHZTcmMsIGZTcmMpIHtcclxuICB2YXIgdlNoYWRlciA9IG5ldyBHTFNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgdlNyYylcclxuICB2YXIgZlNoYWRlciA9IG5ldyBHTFNoYWRlcihnbCwgZ2wuRlJBR01FTlRfU0hBREVSLCBmU3JjKVxyXG5cclxuICByZXR1cm4gKGVpdGhlckluc3RhbmNlT2YoRXJyb3IsIHZTaGFkZXIsIGZTaGFkZXIpKVxyXG4gICAgPyBjb21iaW5lRXJyb3JzKHZTaGFkZXIsIGZTaGFkZXIpXHJcbiAgICA6IG5ldyBHTFByb2dyYW0oZ2wsIHZTaGFkZXIsIGZTaGFkZXIpXHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBHTFJlbmRlclRhcmdldFxyXG5cclxuZnVuY3Rpb24gR0xSZW5kZXJUYXJnZXQgKGdsLCB3aWR0aCwgaGVpZ2h0LCBkYXRhKSB7XHJcbiAgdmFyIHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKClcclxuICB2YXIgaGFuZGxlICA9IGdsLmNyZWF0ZUZyYW1lYnVmZmVyKClcclxuXHJcbiAgLy9jb25maWd1cmUgdGhlIHRleHR1cmUgYW5kIHVwbG9hZCB0aGUgZGF0YVxyXG4gIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpXHJcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSlcclxuICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKVxyXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKVxyXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKVxyXG4gIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuUkdCQSwgd2lkdGgsIGhlaWdodCwgMCwgZ2wuUkdCQSwgZ2wuRkxPQVQsIGRhdGEpXHJcbiAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbClcclxuXHJcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBoYW5kbGUpXHJcbiAgZ2wuZnJhbWVidWZmZXJUZXh0dXJlMkQoZ2wuRlJBTUVCVUZGRVIsIGdsLkNPTE9SX0FUVEFDSE1FTlQwLCBnbC5URVhUVVJFXzJELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUsIDApXHJcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxyXG5cclxuICB0aGlzLmhhbmRsZSAgPSBoYW5kbGVcclxuICB0aGlzLndpZHRoICAgPSB3aWR0aFxyXG4gIHRoaXMuaGVpZ2h0ICA9IGhlaWdodFxyXG4gIHRoaXMudGV4dHVyZSA9IHRleHR1cmVcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IEdMU2hhZGVyXHJcblxyXG4vL0dMQ29udGV4dCAtPiBFbnVtIC0+IFN0cmluZyAtPiBFaXRoZXIgR0xTaGFkZXIgfCBFcnJvclxyXG5mdW5jdGlvbiBHTFNoYWRlciAoZ2wsIHR5cGUsIHNyYykge1xyXG4gIHZhciBzaGFkZXIgID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpXHJcblxyXG4gIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNyYylcclxuICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcilcclxuICByZXR1cm4gZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpXHJcbiAgICA/IHNoYWRlclxyXG4gICAgOiBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKVxyXG59XHJcbiJdfQ==
=======
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9hZGpvaW50LmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvY2xvbmUuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9jb3B5LmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvZGV0ZXJtaW5hbnQuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9mcm9tUXVhdC5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L2Zyb21Sb3RhdGlvblRyYW5zbGF0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvZnJ1c3R1bS5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L2lkZW50aXR5LmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9pbnZlcnQuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9sb29rQXQuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9tdWx0aXBseS5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L29ydGhvLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvcGVyc3BlY3RpdmUuanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9wZXJzcGVjdGl2ZUZyb21GaWVsZE9mVmlldy5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L3JvdGF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L3JvdGF0ZVguanMiLCJub2RlX21vZHVsZXMvZ2wtbWF0NC9yb3RhdGVZLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvcm90YXRlWi5qcyIsIm5vZGVfbW9kdWxlcy9nbC1tYXQ0L3NjYWxlLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvc3RyLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvdHJhbnNsYXRlLmpzIiwibm9kZV9tb2R1bGVzL2dsLW1hdDQvdHJhbnNwb3NlLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvYWRkLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvYW5nbGUuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9jbG9uZS5qcyIsIm5vZGVfbW9kdWxlcy9nbC12ZWMzL2NvcHkuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9jcm9zcy5qcyIsIm5vZGVfbW9kdWxlcy9nbC12ZWMzL2Rpc3RhbmNlLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvZGl2aWRlLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvZG90LmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvZm9yRWFjaC5qcyIsIm5vZGVfbW9kdWxlcy9nbC12ZWMzL2Zyb21WYWx1ZXMuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9nbC12ZWMzL2ludmVyc2UuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9sZW5ndGguanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9sZXJwLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvbWF4LmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvbWluLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvbXVsdGlwbHkuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9uZWdhdGUuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9ub3JtYWxpemUuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9yYW5kb20uanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9yb3RhdGVYLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvcm90YXRlWS5qcyIsIm5vZGVfbW9kdWxlcy9nbC12ZWMzL3JvdGF0ZVouanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy9zY2FsZS5qcyIsIm5vZGVfbW9kdWxlcy9nbC12ZWMzL3NjYWxlQW5kQWRkLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvc2V0LmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvc3F1YXJlZERpc3RhbmNlLmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvc3F1YXJlZExlbmd0aC5qcyIsIm5vZGVfbW9kdWxlcy9nbC12ZWMzL3N1YnRyYWN0LmpzIiwibm9kZV9tb2R1bGVzL2dsLXZlYzMvdHJhbnNmb3JtTWF0My5qcyIsIm5vZGVfbW9kdWxlcy9nbC12ZWMzL3RyYW5zZm9ybU1hdDQuanMiLCJub2RlX21vZHVsZXMvZ2wtdmVjMy90cmFuc2Zvcm1RdWF0LmpzIiwic3JjL0NhbWVyYS5qcyIsInNyYy9DbG9jay5qcyIsInNyYy9HTFNoZWxsLmpzIiwic3JjL0dQVVBhcnRpY2xlU3lzdGVtLmpzIiwic3JjL0dhbWVwYWRNYW5hZ2VyLmpzIiwic3JjL0tleWJvYXJkTWFuYWdlci5qcyIsInNyYy9TY3JlZW5RdWFkLmpzIiwic3JjL2Fzc2VtYmxpZXMvQXR0cmFjdG9yLmpzIiwic3JjL2Fzc2VtYmxpZXMvR1BVUGFydGljbGVFbWl0dGVyLmpzIiwic3JjL2Fzc2VtYmxpZXMvUG9pbnRMaWdodC5qcyIsInNyYy9jb21wb25lbnRzL0F0dHJhY3RpdmUuanMiLCJzcmMvY29tcG9uZW50cy9HUFVFbWl0dGVyLmpzIiwic3JjL2NvbXBvbmVudHMvTGlnaHQuanMiLCJzcmMvY29tcG9uZW50cy9QaHlzaWNzLmpzIiwic3JjL2RvbS11dGlscy5qcyIsInNyYy9ncHUtcGFydGljbGVzLmpzIiwic3JjL21hdHJpeC11dGlscy5qcyIsInNyYy9tb2R1bGVzL0dMU3RhdGVmdWxSZW5kZXJpbmdDb250ZXh0L0dMU3RhdGVmdWxSZW5kZXJpbmdDb250ZXh0LmpzIiwic3JjL3JhbmRvbS11dGlscy5qcyIsInNyYy90eXBlcy9HTFByb2dyYW0uanMiLCJzcmMvdHlwZXMvR0xSZW5kZXJUYXJnZXQuanMiLCJzcmMvdHlwZXMvR0xTaGFkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBhZGpvaW50O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0NFxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gYWRqb2ludChvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XTtcblxuICAgIG91dFswXSAgPSAgKGExMSAqIChhMjIgKiBhMzMgLSBhMjMgKiBhMzIpIC0gYTIxICogKGExMiAqIGEzMyAtIGExMyAqIGEzMikgKyBhMzEgKiAoYTEyICogYTIzIC0gYTEzICogYTIyKSk7XG4gICAgb3V0WzFdICA9IC0oYTAxICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjEgKiAoYTAyICogYTMzIC0gYTAzICogYTMyKSArIGEzMSAqIChhMDIgKiBhMjMgLSBhMDMgKiBhMjIpKTtcbiAgICBvdXRbMl0gID0gIChhMDEgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSAtIGExMSAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMxICogKGEwMiAqIGExMyAtIGEwMyAqIGExMikpO1xuICAgIG91dFszXSAgPSAtKGEwMSAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpIC0gYTExICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikgKyBhMjEgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgb3V0WzRdICA9IC0oYTEwICogKGEyMiAqIGEzMyAtIGEyMyAqIGEzMikgLSBhMjAgKiAoYTEyICogYTMzIC0gYTEzICogYTMyKSArIGEzMCAqIChhMTIgKiBhMjMgLSBhMTMgKiBhMjIpKTtcbiAgICBvdXRbNV0gID0gIChhMDAgKiAoYTIyICogYTMzIC0gYTIzICogYTMyKSAtIGEyMCAqIChhMDIgKiBhMzMgLSBhMDMgKiBhMzIpICsgYTMwICogKGEwMiAqIGEyMyAtIGEwMyAqIGEyMikpO1xuICAgIG91dFs2XSAgPSAtKGEwMCAqIChhMTIgKiBhMzMgLSBhMTMgKiBhMzIpIC0gYTEwICogKGEwMiAqIGEzMyAtIGEwMyAqIGEzMikgKyBhMzAgKiAoYTAyICogYTEzIC0gYTAzICogYTEyKSk7XG4gICAgb3V0WzddICA9ICAoYTAwICogKGExMiAqIGEyMyAtIGExMyAqIGEyMikgLSBhMTAgKiAoYTAyICogYTIzIC0gYTAzICogYTIyKSArIGEyMCAqIChhMDIgKiBhMTMgLSBhMDMgKiBhMTIpKTtcbiAgICBvdXRbOF0gID0gIChhMTAgKiAoYTIxICogYTMzIC0gYTIzICogYTMxKSAtIGEyMCAqIChhMTEgKiBhMzMgLSBhMTMgKiBhMzEpICsgYTMwICogKGExMSAqIGEyMyAtIGExMyAqIGEyMSkpO1xuICAgIG91dFs5XSAgPSAtKGEwMCAqIChhMjEgKiBhMzMgLSBhMjMgKiBhMzEpIC0gYTIwICogKGEwMSAqIGEzMyAtIGEwMyAqIGEzMSkgKyBhMzAgKiAoYTAxICogYTIzIC0gYTAzICogYTIxKSk7XG4gICAgb3V0WzEwXSA9ICAoYTAwICogKGExMSAqIGEzMyAtIGExMyAqIGEzMSkgLSBhMTAgKiAoYTAxICogYTMzIC0gYTAzICogYTMxKSArIGEzMCAqIChhMDEgKiBhMTMgLSBhMDMgKiBhMTEpKTtcbiAgICBvdXRbMTFdID0gLShhMDAgKiAoYTExICogYTIzIC0gYTEzICogYTIxKSAtIGExMCAqIChhMDEgKiBhMjMgLSBhMDMgKiBhMjEpICsgYTIwICogKGEwMSAqIGExMyAtIGEwMyAqIGExMSkpO1xuICAgIG91dFsxMl0gPSAtKGExMCAqIChhMjEgKiBhMzIgLSBhMjIgKiBhMzEpIC0gYTIwICogKGExMSAqIGEzMiAtIGExMiAqIGEzMSkgKyBhMzAgKiAoYTExICogYTIyIC0gYTEyICogYTIxKSk7XG4gICAgb3V0WzEzXSA9ICAoYTAwICogKGEyMSAqIGEzMiAtIGEyMiAqIGEzMSkgLSBhMjAgKiAoYTAxICogYTMyIC0gYTAyICogYTMxKSArIGEzMCAqIChhMDEgKiBhMjIgLSBhMDIgKiBhMjEpKTtcbiAgICBvdXRbMTRdID0gLShhMDAgKiAoYTExICogYTMyIC0gYTEyICogYTMxKSAtIGExMCAqIChhMDEgKiBhMzIgLSBhMDIgKiBhMzEpICsgYTMwICogKGEwMSAqIGExMiAtIGEwMiAqIGExMSkpO1xuICAgIG91dFsxNV0gPSAgKGEwMCAqIChhMTEgKiBhMjIgLSBhMTIgKiBhMjEpIC0gYTEwICogKGEwMSAqIGEyMiAtIGEwMiAqIGEyMSkgKyBhMjAgKiAoYTAxICogYTEyIC0gYTAyICogYTExKSk7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBjbG9uZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IG1hdDQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDR9IGEgbWF0cml4IHRvIGNsb25lXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICovXG5mdW5jdGlvbiBjbG9uZShhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIG91dFs5XSA9IGFbOV07XG4gICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgIG91dFsxMV0gPSBhWzExXTtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBjb3B5O1xuXG4vKipcbiAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBtYXQ0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGNvcHkob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgb3V0WzldID0gYVs5XTtcbiAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgb3V0WzExXSA9IGFbMTFdO1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDRcbiAqXG4gKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICovXG5mdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAxO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDE7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBkZXRlcm1pbmFudDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAqL1xuZnVuY3Rpb24gZGV0ZXJtaW5hbnQoYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLCBhMTEgPSBhWzVdLCBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLCBhMjEgPSBhWzldLCBhMjIgPSBhWzEwXSwgYTIzID0gYVsxMV0sXG4gICAgICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdLFxuXG4gICAgICAgIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMCxcbiAgICAgICAgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwLFxuICAgICAgICBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTAsXG4gICAgICAgIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMSxcbiAgICAgICAgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExLFxuICAgICAgICBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTIsXG4gICAgICAgIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMCxcbiAgICAgICAgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwLFxuICAgICAgICBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzAsXG4gICAgICAgIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMSxcbiAgICAgICAgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxLFxuICAgICAgICBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gICAgcmV0dXJuIGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmcm9tUXVhdDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBmcm9tUXVhdChvdXQsIHEpIHtcbiAgICB2YXIgeCA9IHFbMF0sIHkgPSBxWzFdLCB6ID0gcVsyXSwgdyA9IHFbM10sXG4gICAgICAgIHgyID0geCArIHgsXG4gICAgICAgIHkyID0geSArIHksXG4gICAgICAgIHoyID0geiArIHosXG5cbiAgICAgICAgeHggPSB4ICogeDIsXG4gICAgICAgIHl4ID0geSAqIHgyLFxuICAgICAgICB5eSA9IHkgKiB5MixcbiAgICAgICAgenggPSB6ICogeDIsXG4gICAgICAgIHp5ID0geiAqIHkyLFxuICAgICAgICB6eiA9IHogKiB6MixcbiAgICAgICAgd3ggPSB3ICogeDIsXG4gICAgICAgIHd5ID0gdyAqIHkyLFxuICAgICAgICB3eiA9IHcgKiB6MjtcblxuICAgIG91dFswXSA9IDEgLSB5eSAtIHp6O1xuICAgIG91dFsxXSA9IHl4ICsgd3o7XG4gICAgb3V0WzJdID0genggLSB3eTtcbiAgICBvdXRbM10gPSAwO1xuXG4gICAgb3V0WzRdID0geXggLSB3ejtcbiAgICBvdXRbNV0gPSAxIC0geHggLSB6ejtcbiAgICBvdXRbNl0gPSB6eSArIHd4O1xuICAgIG91dFs3XSA9IDA7XG5cbiAgICBvdXRbOF0gPSB6eCArIHd5O1xuICAgIG91dFs5XSA9IHp5IC0gd3g7XG4gICAgb3V0WzEwXSA9IDEgLSB4eCAtIHl5O1xuICAgIG91dFsxMV0gPSAwO1xuXG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG5cbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHF1YXRlcm5pb24gcm90YXRpb24gYW5kIHZlY3RvciB0cmFuc2xhdGlvblxuICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gKlxuICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgdmVjKTtcbiAqICAgICB2YXIgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XG4gKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xuICogICAgIG1hdDQubXVsdGlwbHkoZGVzdCwgcXVhdE1hdCk7XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXG4gKiBAcGFyYW0ge3ZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uKG91dCwgcSwgdikge1xuICAgIC8vIFF1YXRlcm5pb24gbWF0aFxuICAgIHZhciB4ID0gcVswXSwgeSA9IHFbMV0sIHogPSBxWzJdLCB3ID0gcVszXSxcbiAgICAgICAgeDIgPSB4ICsgeCxcbiAgICAgICAgeTIgPSB5ICsgeSxcbiAgICAgICAgejIgPSB6ICsgeixcblxuICAgICAgICB4eCA9IHggKiB4MixcbiAgICAgICAgeHkgPSB4ICogeTIsXG4gICAgICAgIHh6ID0geCAqIHoyLFxuICAgICAgICB5eSA9IHkgKiB5MixcbiAgICAgICAgeXogPSB5ICogejIsXG4gICAgICAgIHp6ID0geiAqIHoyLFxuICAgICAgICB3eCA9IHcgKiB4MixcbiAgICAgICAgd3kgPSB3ICogeTIsXG4gICAgICAgIHd6ID0gdyAqIHoyO1xuXG4gICAgb3V0WzBdID0gMSAtICh5eSArIHp6KTtcbiAgICBvdXRbMV0gPSB4eSArIHd6O1xuICAgIG91dFsyXSA9IHh6IC0gd3k7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSB4eSAtIHd6O1xuICAgIG91dFs1XSA9IDEgLSAoeHggKyB6eik7XG4gICAgb3V0WzZdID0geXogKyB3eDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IHh6ICsgd3k7XG4gICAgb3V0WzldID0geXogLSB3eDtcbiAgICBvdXRbMTBdID0gMSAtICh4eCArIHl5KTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gdlswXTtcbiAgICBvdXRbMTNdID0gdlsxXTtcbiAgICBvdXRbMTRdID0gdlsyXTtcbiAgICBvdXRbMTVdID0gMTtcbiAgICBcbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZydXN0dW07XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgZnJ1c3R1bSBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHtOdW1iZXJ9IGxlZnQgTGVmdCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IHJpZ2h0IFJpZ2h0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge051bWJlcn0gYm90dG9tIEJvdHRvbSBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtOdW1iZXJ9IHRvcCBUb3AgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7TnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGZydXN0dW0ob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICAgIHZhciBybCA9IDEgLyAocmlnaHQgLSBsZWZ0KSxcbiAgICAgICAgdGIgPSAxIC8gKHRvcCAtIGJvdHRvbSksXG4gICAgICAgIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSAobmVhciAqIDIpICogcmw7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAobmVhciAqIDIpICogdGI7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IChyaWdodCArIGxlZnQpICogcmw7XG4gICAgb3V0WzldID0gKHRvcCArIGJvdHRvbSkgKiB0YjtcbiAgICBvdXRbMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzExXSA9IC0xO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAoZmFyICogbmVhciAqIDIpICogbmY7XG4gICAgb3V0WzE1XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcblxuLyoqXG4gKiBTZXQgYSBtYXQ0IHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBpZGVudGl0eShvdXQpIHtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMTtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAxO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBjcmVhdGU6IHJlcXVpcmUoJy4vY3JlYXRlJylcbiAgLCBjbG9uZTogcmVxdWlyZSgnLi9jbG9uZScpXG4gICwgY29weTogcmVxdWlyZSgnLi9jb3B5JylcbiAgLCBpZGVudGl0eTogcmVxdWlyZSgnLi9pZGVudGl0eScpXG4gICwgdHJhbnNwb3NlOiByZXF1aXJlKCcuL3RyYW5zcG9zZScpXG4gICwgaW52ZXJ0OiByZXF1aXJlKCcuL2ludmVydCcpXG4gICwgYWRqb2ludDogcmVxdWlyZSgnLi9hZGpvaW50JylcbiAgLCBkZXRlcm1pbmFudDogcmVxdWlyZSgnLi9kZXRlcm1pbmFudCcpXG4gICwgbXVsdGlwbHk6IHJlcXVpcmUoJy4vbXVsdGlwbHknKVxuICAsIHRyYW5zbGF0ZTogcmVxdWlyZSgnLi90cmFuc2xhdGUnKVxuICAsIHNjYWxlOiByZXF1aXJlKCcuL3NjYWxlJylcbiAgLCByb3RhdGU6IHJlcXVpcmUoJy4vcm90YXRlJylcbiAgLCByb3RhdGVYOiByZXF1aXJlKCcuL3JvdGF0ZVgnKVxuICAsIHJvdGF0ZVk6IHJlcXVpcmUoJy4vcm90YXRlWScpXG4gICwgcm90YXRlWjogcmVxdWlyZSgnLi9yb3RhdGVaJylcbiAgLCBmcm9tUm90YXRpb25UcmFuc2xhdGlvbjogcmVxdWlyZSgnLi9mcm9tUm90YXRpb25UcmFuc2xhdGlvbicpXG4gICwgZnJvbVF1YXQ6IHJlcXVpcmUoJy4vZnJvbVF1YXQnKVxuICAsIGZydXN0dW06IHJlcXVpcmUoJy4vZnJ1c3R1bScpXG4gICwgcGVyc3BlY3RpdmU6IHJlcXVpcmUoJy4vcGVyc3BlY3RpdmUnKVxuICAsIHBlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3OiByZXF1aXJlKCcuL3BlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3JylcbiAgLCBvcnRobzogcmVxdWlyZSgnLi9vcnRobycpXG4gICwgbG9va0F0OiByZXF1aXJlKCcuL2xvb2tBdCcpXG4gICwgc3RyOiByZXF1aXJlKCcuL3N0cicpXG59IiwibW9kdWxlLmV4cG9ydHMgPSBpbnZlcnQ7XG5cbi8qKlxuICogSW52ZXJ0cyBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIGludmVydChvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSwgYTAxID0gYVsxXSwgYTAyID0gYVsyXSwgYTAzID0gYVszXSxcbiAgICAgICAgYTEwID0gYVs0XSwgYTExID0gYVs1XSwgYTEyID0gYVs2XSwgYTEzID0gYVs3XSxcbiAgICAgICAgYTIwID0gYVs4XSwgYTIxID0gYVs5XSwgYTIyID0gYVsxMF0sIGEyMyA9IGFbMTFdLFxuICAgICAgICBhMzAgPSBhWzEyXSwgYTMxID0gYVsxM10sIGEzMiA9IGFbMTRdLCBhMzMgPSBhWzE1XSxcblxuICAgICAgICBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsXG4gICAgICAgIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMCxcbiAgICAgICAgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwLFxuICAgICAgICBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTEsXG4gICAgICAgIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSxcbiAgICAgICAgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyLFxuICAgICAgICBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsXG4gICAgICAgIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMCxcbiAgICAgICAgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwLFxuICAgICAgICBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzEsXG4gICAgICAgIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSxcbiAgICAgICAgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyLFxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcbiAgICAgICAgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gICAgaWYgKCFkZXQpIHsgXG4gICAgICAgIHJldHVybiBudWxsOyBcbiAgICB9XG4gICAgZGV0ID0gMS4wIC8gZGV0O1xuXG4gICAgb3V0WzBdID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzFdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XG4gICAgb3V0WzNdID0gKGEyMiAqIGIwNCAtIGEyMSAqIGIwNSAtIGEyMyAqIGIwMykgKiBkZXQ7XG4gICAgb3V0WzRdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzVdID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzZdID0gKGEzMiAqIGIwMiAtIGEzMCAqIGIwNSAtIGEzMyAqIGIwMSkgKiBkZXQ7XG4gICAgb3V0WzddID0gKGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMSkgKiBkZXQ7XG4gICAgb3V0WzhdID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzldID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzEwXSA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xuICAgIG91dFsxMV0gPSAoYTIxICogYjAyIC0gYTIwICogYjA0IC0gYTIzICogYjAwKSAqIGRldDtcbiAgICBvdXRbMTJdID0gKGExMSAqIGIwNyAtIGExMCAqIGIwOSAtIGExMiAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzEzXSA9IChhMDAgKiBiMDkgLSBhMDEgKiBiMDcgKyBhMDIgKiBiMDYpICogZGV0O1xuICAgIG91dFsxNF0gPSAoYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwKSAqIGRldDtcbiAgICBvdXRbMTVdID0gKGEyMCAqIGIwMyAtIGEyMSAqIGIwMSArIGEyMiAqIGIwMCkgKiBkZXQ7XG5cbiAgICByZXR1cm4gb3V0O1xufTsiLCJ2YXIgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbG9va0F0O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGxvb2stYXQgbWF0cml4IHdpdGggdGhlIGdpdmVuIGV5ZSBwb3NpdGlvbiwgZm9jYWwgcG9pbnQsIGFuZCB1cCBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICogQHBhcmFtIHt2ZWMzfSBleWUgUG9zaXRpb24gb2YgdGhlIHZpZXdlclxuICogQHBhcmFtIHt2ZWMzfSBjZW50ZXIgUG9pbnQgdGhlIHZpZXdlciBpcyBsb29raW5nIGF0XG4gKiBAcGFyYW0ge3ZlYzN9IHVwIHZlYzMgcG9pbnRpbmcgdXBcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gbG9va0F0KG91dCwgZXllLCBjZW50ZXIsIHVwKSB7XG4gICAgdmFyIHgwLCB4MSwgeDIsIHkwLCB5MSwgeTIsIHowLCB6MSwgejIsIGxlbixcbiAgICAgICAgZXlleCA9IGV5ZVswXSxcbiAgICAgICAgZXlleSA9IGV5ZVsxXSxcbiAgICAgICAgZXlleiA9IGV5ZVsyXSxcbiAgICAgICAgdXB4ID0gdXBbMF0sXG4gICAgICAgIHVweSA9IHVwWzFdLFxuICAgICAgICB1cHogPSB1cFsyXSxcbiAgICAgICAgY2VudGVyeCA9IGNlbnRlclswXSxcbiAgICAgICAgY2VudGVyeSA9IGNlbnRlclsxXSxcbiAgICAgICAgY2VudGVyeiA9IGNlbnRlclsyXTtcblxuICAgIGlmIChNYXRoLmFicyhleWV4IC0gY2VudGVyeCkgPCAwLjAwMDAwMSAmJlxuICAgICAgICBNYXRoLmFicyhleWV5IC0gY2VudGVyeSkgPCAwLjAwMDAwMSAmJlxuICAgICAgICBNYXRoLmFicyhleWV6IC0gY2VudGVyeikgPCAwLjAwMDAwMSkge1xuICAgICAgICByZXR1cm4gaWRlbnRpdHkob3V0KTtcbiAgICB9XG5cbiAgICB6MCA9IGV5ZXggLSBjZW50ZXJ4O1xuICAgIHoxID0gZXlleSAtIGNlbnRlcnk7XG4gICAgejIgPSBleWV6IC0gY2VudGVyejtcblxuICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQoejAgKiB6MCArIHoxICogejEgKyB6MiAqIHoyKTtcbiAgICB6MCAqPSBsZW47XG4gICAgejEgKj0gbGVuO1xuICAgIHoyICo9IGxlbjtcblxuICAgIHgwID0gdXB5ICogejIgLSB1cHogKiB6MTtcbiAgICB4MSA9IHVweiAqIHowIC0gdXB4ICogejI7XG4gICAgeDIgPSB1cHggKiB6MSAtIHVweSAqIHowO1xuICAgIGxlbiA9IE1hdGguc3FydCh4MCAqIHgwICsgeDEgKiB4MSArIHgyICogeDIpO1xuICAgIGlmICghbGVuKSB7XG4gICAgICAgIHgwID0gMDtcbiAgICAgICAgeDEgPSAwO1xuICAgICAgICB4MiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgeDAgKj0gbGVuO1xuICAgICAgICB4MSAqPSBsZW47XG4gICAgICAgIHgyICo9IGxlbjtcbiAgICB9XG5cbiAgICB5MCA9IHoxICogeDIgLSB6MiAqIHgxO1xuICAgIHkxID0gejIgKiB4MCAtIHowICogeDI7XG4gICAgeTIgPSB6MCAqIHgxIC0gejEgKiB4MDtcblxuICAgIGxlbiA9IE1hdGguc3FydCh5MCAqIHkwICsgeTEgKiB5MSArIHkyICogeTIpO1xuICAgIGlmICghbGVuKSB7XG4gICAgICAgIHkwID0gMDtcbiAgICAgICAgeTEgPSAwO1xuICAgICAgICB5MiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgeTAgKj0gbGVuO1xuICAgICAgICB5MSAqPSBsZW47XG4gICAgICAgIHkyICo9IGxlbjtcbiAgICB9XG5cbiAgICBvdXRbMF0gPSB4MDtcbiAgICBvdXRbMV0gPSB5MDtcbiAgICBvdXRbMl0gPSB6MDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IHgxO1xuICAgIG91dFs1XSA9IHkxO1xuICAgIG91dFs2XSA9IHoxO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0geDI7XG4gICAgb3V0WzldID0geTI7XG4gICAgb3V0WzEwXSA9IHoyO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAtKHgwICogZXlleCArIHgxICogZXlleSArIHgyICogZXlleik7XG4gICAgb3V0WzEzXSA9IC0oeTAgKiBleWV4ICsgeTEgKiBleWV5ICsgeTIgKiBleWV6KTtcbiAgICBvdXRbMTRdID0gLSh6MCAqIGV5ZXggKyB6MSAqIGV5ZXkgKyB6MiAqIGV5ZXopO1xuICAgIG91dFsxNV0gPSAxO1xuXG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBtdWx0aXBseTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byBtYXQ0J3NcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge21hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICAgIHZhciBhMDAgPSBhWzBdLCBhMDEgPSBhWzFdLCBhMDIgPSBhWzJdLCBhMDMgPSBhWzNdLFxuICAgICAgICBhMTAgPSBhWzRdLCBhMTEgPSBhWzVdLCBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLCBhMjEgPSBhWzldLCBhMjIgPSBhWzEwXSwgYTIzID0gYVsxMV0sXG4gICAgICAgIGEzMCA9IGFbMTJdLCBhMzEgPSBhWzEzXSwgYTMyID0gYVsxNF0sIGEzMyA9IGFbMTVdO1xuXG4gICAgLy8gQ2FjaGUgb25seSB0aGUgY3VycmVudCBsaW5lIG9mIHRoZSBzZWNvbmQgbWF0cml4XG4gICAgdmFyIGIwICA9IGJbMF0sIGIxID0gYlsxXSwgYjIgPSBiWzJdLCBiMyA9IGJbM107ICBcbiAgICBvdXRbMF0gPSBiMCphMDAgKyBiMSphMTAgKyBiMiphMjAgKyBiMyphMzA7XG4gICAgb3V0WzFdID0gYjAqYTAxICsgYjEqYTExICsgYjIqYTIxICsgYjMqYTMxO1xuICAgIG91dFsyXSA9IGIwKmEwMiArIGIxKmExMiArIGIyKmEyMiArIGIzKmEzMjtcbiAgICBvdXRbM10gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG5cbiAgICBiMCA9IGJbNF07IGIxID0gYls1XTsgYjIgPSBiWzZdOyBiMyA9IGJbN107XG4gICAgb3V0WzRdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFs1XSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbNl0gPSBiMCphMDIgKyBiMSphMTIgKyBiMiphMjIgKyBiMyphMzI7XG4gICAgb3V0WzddID0gYjAqYTAzICsgYjEqYTEzICsgYjIqYTIzICsgYjMqYTMzO1xuXG4gICAgYjAgPSBiWzhdOyBiMSA9IGJbOV07IGIyID0gYlsxMF07IGIzID0gYlsxMV07XG4gICAgb3V0WzhdID0gYjAqYTAwICsgYjEqYTEwICsgYjIqYTIwICsgYjMqYTMwO1xuICAgIG91dFs5XSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbMTBdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFsxMV0gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG5cbiAgICBiMCA9IGJbMTJdOyBiMSA9IGJbMTNdOyBiMiA9IGJbMTRdOyBiMyA9IGJbMTVdO1xuICAgIG91dFsxMl0gPSBiMCphMDAgKyBiMSphMTAgKyBiMiphMjAgKyBiMyphMzA7XG4gICAgb3V0WzEzXSA9IGIwKmEwMSArIGIxKmExMSArIGIyKmEyMSArIGIzKmEzMTtcbiAgICBvdXRbMTRdID0gYjAqYTAyICsgYjEqYTEyICsgYjIqYTIyICsgYjMqYTMyO1xuICAgIG91dFsxNV0gPSBiMCphMDMgKyBiMSphMTMgKyBiMiphMjMgKyBiMyphMzM7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBvcnRobztcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBvcnRob2dvbmFsIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSByaWdodCBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHBhcmFtIHtudW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAqIEBwYXJhbSB7bnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBvcnRobyhvdXQsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XG4gICAgdmFyIGxyID0gMSAvIChsZWZ0IC0gcmlnaHQpLFxuICAgICAgICBidCA9IDEgLyAoYm90dG9tIC0gdG9wKSxcbiAgICAgICAgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFswXSA9IC0yICogbHI7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAtMiAqIGJ0O1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDIgKiBuZjtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gKGxlZnQgKyByaWdodCkgKiBscjtcbiAgICBvdXRbMTNdID0gKHRvcCArIGJvdHRvbSkgKiBidDtcbiAgICBvdXRbMTRdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBwZXJzcGVjdGl2ZTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge251bWJlcn0gZm92eSBWZXJ0aWNhbCBmaWVsZCBvZiB2aWV3IGluIHJhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBhc3BlY3QgQXNwZWN0IHJhdGlvLiB0eXBpY2FsbHkgdmlld3BvcnQgd2lkdGgvaGVpZ2h0XG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBwZXJzcGVjdGl2ZShvdXQsIGZvdnksIGFzcGVjdCwgbmVhciwgZmFyKSB7XG4gICAgdmFyIGYgPSAxLjAgLyBNYXRoLnRhbihmb3Z5IC8gMiksXG4gICAgICAgIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSBmIC8gYXNwZWN0O1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gZjtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICBvdXRbMTFdID0gLTE7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9ICgyICogZmFyICogbmVhcikgKiBuZjtcbiAgICBvdXRbMTVdID0gMDtcbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHBlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGZpZWxkIG9mIHZpZXcuXG4gKiBUaGlzIGlzIHByaW1hcmlseSB1c2VmdWwgZm9yIGdlbmVyYXRpbmcgcHJvamVjdGlvbiBtYXRyaWNlcyB0byBiZSB1c2VkXG4gKiB3aXRoIHRoZSBzdGlsbCBleHBlcmllbWVudGFsIFdlYlZSIEFQSS5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gKiBAcGFyYW0ge251bWJlcn0gZm92IE9iamVjdCBjb250YWluaW5nIHRoZSBmb2xsb3dpbmcgdmFsdWVzOiB1cERlZ3JlZXMsIGRvd25EZWdyZWVzLCBsZWZ0RGVncmVlcywgcmlnaHREZWdyZWVzXG4gKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBwZXJzcGVjdGl2ZUZyb21GaWVsZE9mVmlldyhvdXQsIGZvdiwgbmVhciwgZmFyKSB7XG4gICAgdmFyIHVwVGFuID0gTWF0aC50YW4oZm92LnVwRGVncmVlcyAqIE1hdGguUEkvMTgwLjApLFxuICAgICAgICBkb3duVGFuID0gTWF0aC50YW4oZm92LmRvd25EZWdyZWVzICogTWF0aC5QSS8xODAuMCksXG4gICAgICAgIGxlZnRUYW4gPSBNYXRoLnRhbihmb3YubGVmdERlZ3JlZXMgKiBNYXRoLlBJLzE4MC4wKSxcbiAgICAgICAgcmlnaHRUYW4gPSBNYXRoLnRhbihmb3YucmlnaHREZWdyZWVzICogTWF0aC5QSS8xODAuMCksXG4gICAgICAgIHhTY2FsZSA9IDIuMCAvIChsZWZ0VGFuICsgcmlnaHRUYW4pLFxuICAgICAgICB5U2NhbGUgPSAyLjAgLyAodXBUYW4gKyBkb3duVGFuKTtcblxuICAgIG91dFswXSA9IHhTY2FsZTtcbiAgICBvdXRbMV0gPSAwLjA7XG4gICAgb3V0WzJdID0gMC4wO1xuICAgIG91dFszXSA9IDAuMDtcbiAgICBvdXRbNF0gPSAwLjA7XG4gICAgb3V0WzVdID0geVNjYWxlO1xuICAgIG91dFs2XSA9IDAuMDtcbiAgICBvdXRbN10gPSAwLjA7XG4gICAgb3V0WzhdID0gLSgobGVmdFRhbiAtIHJpZ2h0VGFuKSAqIHhTY2FsZSAqIDAuNSk7XG4gICAgb3V0WzldID0gKCh1cFRhbiAtIGRvd25UYW4pICogeVNjYWxlICogMC41KTtcbiAgICBvdXRbMTBdID0gZmFyIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFsxMV0gPSAtMS4wO1xuICAgIG91dFsxMl0gPSAwLjA7XG4gICAgb3V0WzEzXSA9IDAuMDtcbiAgICBvdXRbMTRdID0gKGZhciAqIG5lYXIpIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFsxNV0gPSAwLjA7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuIiwibW9kdWxlLmV4cG9ydHMgPSByb3RhdGU7XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdDQgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEBwYXJhbSB7dmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHJvdGF0ZShvdXQsIGEsIHJhZCwgYXhpcykge1xuICAgIHZhciB4ID0gYXhpc1swXSwgeSA9IGF4aXNbMV0sIHogPSBheGlzWzJdLFxuICAgICAgICBsZW4gPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KSxcbiAgICAgICAgcywgYywgdCxcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXG4gICAgICAgIGEyMCwgYTIxLCBhMjIsIGEyMyxcbiAgICAgICAgYjAwLCBiMDEsIGIwMixcbiAgICAgICAgYjEwLCBiMTEsIGIxMixcbiAgICAgICAgYjIwLCBiMjEsIGIyMjtcblxuICAgIGlmIChNYXRoLmFicyhsZW4pIDwgMC4wMDAwMDEpIHsgcmV0dXJuIG51bGw7IH1cbiAgICBcbiAgICBsZW4gPSAxIC8gbGVuO1xuICAgIHggKj0gbGVuO1xuICAgIHkgKj0gbGVuO1xuICAgIHogKj0gbGVuO1xuXG4gICAgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgdCA9IDEgLSBjO1xuXG4gICAgYTAwID0gYVswXTsgYTAxID0gYVsxXTsgYTAyID0gYVsyXTsgYTAzID0gYVszXTtcbiAgICBhMTAgPSBhWzRdOyBhMTEgPSBhWzVdOyBhMTIgPSBhWzZdOyBhMTMgPSBhWzddO1xuICAgIGEyMCA9IGFbOF07IGEyMSA9IGFbOV07IGEyMiA9IGFbMTBdOyBhMjMgPSBhWzExXTtcblxuICAgIC8vIENvbnN0cnVjdCB0aGUgZWxlbWVudHMgb2YgdGhlIHJvdGF0aW9uIG1hdHJpeFxuICAgIGIwMCA9IHggKiB4ICogdCArIGM7IGIwMSA9IHkgKiB4ICogdCArIHogKiBzOyBiMDIgPSB6ICogeCAqIHQgLSB5ICogcztcbiAgICBiMTAgPSB4ICogeSAqIHQgLSB6ICogczsgYjExID0geSAqIHkgKiB0ICsgYzsgYjEyID0geiAqIHkgKiB0ICsgeCAqIHM7XG4gICAgYjIwID0geCAqIHogKiB0ICsgeSAqIHM7IGIyMSA9IHkgKiB6ICogdCAtIHggKiBzOyBiMjIgPSB6ICogeiAqIHQgKyBjO1xuXG4gICAgLy8gUGVyZm9ybSByb3RhdGlvbi1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cbiAgICBvdXRbMF0gPSBhMDAgKiBiMDAgKyBhMTAgKiBiMDEgKyBhMjAgKiBiMDI7XG4gICAgb3V0WzFdID0gYTAxICogYjAwICsgYTExICogYjAxICsgYTIxICogYjAyO1xuICAgIG91dFsyXSA9IGEwMiAqIGIwMCArIGExMiAqIGIwMSArIGEyMiAqIGIwMjtcbiAgICBvdXRbM10gPSBhMDMgKiBiMDAgKyBhMTMgKiBiMDEgKyBhMjMgKiBiMDI7XG4gICAgb3V0WzRdID0gYTAwICogYjEwICsgYTEwICogYjExICsgYTIwICogYjEyO1xuICAgIG91dFs1XSA9IGEwMSAqIGIxMCArIGExMSAqIGIxMSArIGEyMSAqIGIxMjtcbiAgICBvdXRbNl0gPSBhMDIgKiBiMTAgKyBhMTIgKiBiMTEgKyBhMjIgKiBiMTI7XG4gICAgb3V0WzddID0gYTAzICogYjEwICsgYTEzICogYjExICsgYTIzICogYjEyO1xuICAgIG91dFs4XSA9IGEwMCAqIGIyMCArIGExMCAqIGIyMSArIGEyMCAqIGIyMjtcbiAgICBvdXRbOV0gPSBhMDEgKiBiMjAgKyBhMTEgKiBiMjEgKyBhMjEgKiBiMjI7XG4gICAgb3V0WzEwXSA9IGEwMiAqIGIyMCArIGExMiAqIGIyMSArIGEyMiAqIGIyMjtcbiAgICBvdXRbMTFdID0gYTAzICogYjIwICsgYTEzICogYjIxICsgYTIzICogYjIyO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcm90YXRlWDtcblxuLyoqXG4gKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFggYXhpc1xuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHJvdGF0ZVgob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpLFxuICAgICAgICBhMTAgPSBhWzRdLFxuICAgICAgICBhMTEgPSBhWzVdLFxuICAgICAgICBhMTIgPSBhWzZdLFxuICAgICAgICBhMTMgPSBhWzddLFxuICAgICAgICBhMjAgPSBhWzhdLFxuICAgICAgICBhMjEgPSBhWzldLFxuICAgICAgICBhMjIgPSBhWzEwXSxcbiAgICAgICAgYTIzID0gYVsxMV07XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICAgICAgb3V0WzBdICA9IGFbMF07XG4gICAgICAgIG91dFsxXSAgPSBhWzFdO1xuICAgICAgICBvdXRbMl0gID0gYVsyXTtcbiAgICAgICAgb3V0WzNdICA9IGFbM107XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzRdID0gYTEwICogYyArIGEyMCAqIHM7XG4gICAgb3V0WzVdID0gYTExICogYyArIGEyMSAqIHM7XG4gICAgb3V0WzZdID0gYTEyICogYyArIGEyMiAqIHM7XG4gICAgb3V0WzddID0gYTEzICogYyArIGEyMyAqIHM7XG4gICAgb3V0WzhdID0gYTIwICogYyAtIGExMCAqIHM7XG4gICAgb3V0WzldID0gYTIxICogYyAtIGExMSAqIHM7XG4gICAgb3V0WzEwXSA9IGEyMiAqIGMgLSBhMTIgKiBzO1xuICAgIG91dFsxMV0gPSBhMjMgKiBjIC0gYTEzICogcztcbiAgICByZXR1cm4gb3V0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJvdGF0ZVk7XG5cbi8qKlxuICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBZIGF4aXNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiByb3RhdGVZKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKSxcbiAgICAgICAgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXSxcbiAgICAgICAgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuXG4gICAgaWYgKGEgIT09IG91dCkgeyAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgICAgIG91dFs0XSAgPSBhWzRdO1xuICAgICAgICBvdXRbNV0gID0gYVs1XTtcbiAgICAgICAgb3V0WzZdICA9IGFbNl07XG4gICAgICAgIG91dFs3XSAgPSBhWzddO1xuICAgICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuICAgIG91dFswXSA9IGEwMCAqIGMgLSBhMjAgKiBzO1xuICAgIG91dFsxXSA9IGEwMSAqIGMgLSBhMjEgKiBzO1xuICAgIG91dFsyXSA9IGEwMiAqIGMgLSBhMjIgKiBzO1xuICAgIG91dFszXSA9IGEwMyAqIGMgLSBhMjMgKiBzO1xuICAgIG91dFs4XSA9IGEwMCAqIHMgKyBhMjAgKiBjO1xuICAgIG91dFs5XSA9IGEwMSAqIHMgKyBhMjEgKiBjO1xuICAgIG91dFsxMF0gPSBhMDIgKiBzICsgYTIyICogYztcbiAgICBvdXRbMTFdID0gYTAzICogcyArIGEyMyAqIGM7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByb3RhdGVaO1xuXG4vKipcbiAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWiBheGlzXG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gcm90YXRlWihvdXQsIGEsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYyA9IE1hdGguY29zKHJhZCksXG4gICAgICAgIGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgIGEwMyA9IGFbM10sXG4gICAgICAgIGExMCA9IGFbNF0sXG4gICAgICAgIGExMSA9IGFbNV0sXG4gICAgICAgIGExMiA9IGFbNl0sXG4gICAgICAgIGExMyA9IGFbN107XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7IC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XG4gICAgICAgIG91dFs4XSAgPSBhWzhdO1xuICAgICAgICBvdXRbOV0gID0gYVs5XTtcbiAgICAgICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgICAgICBvdXRbMTFdID0gYVsxMV07XG4gICAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG4gICAgb3V0WzBdID0gYTAwICogYyArIGExMCAqIHM7XG4gICAgb3V0WzFdID0gYTAxICogYyArIGExMSAqIHM7XG4gICAgb3V0WzJdID0gYTAyICogYyArIGExMiAqIHM7XG4gICAgb3V0WzNdID0gYTAzICogYyArIGExMyAqIHM7XG4gICAgb3V0WzRdID0gYTEwICogYyAtIGEwMCAqIHM7XG4gICAgb3V0WzVdID0gYTExICogYyAtIGEwMSAqIHM7XG4gICAgb3V0WzZdID0gYTEyICogYyAtIGEwMiAqIHM7XG4gICAgb3V0WzddID0gYTEzICogYyAtIGEwMyAqIHM7XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBzY2FsZTtcblxuLyoqXG4gKiBTY2FsZXMgdGhlIG1hdDQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzNcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICogQHBhcmFtIHttYXQ0fSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcbiAqIEBwYXJhbSB7dmVjM30gdiB0aGUgdmVjMyB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKiovXG5mdW5jdGlvbiBzY2FsZShvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdLCB6ID0gdlsyXTtcblxuICAgIG91dFswXSA9IGFbMF0gKiB4O1xuICAgIG91dFsxXSA9IGFbMV0gKiB4O1xuICAgIG91dFsyXSA9IGFbMl0gKiB4O1xuICAgIG91dFszXSA9IGFbM10gKiB4O1xuICAgIG91dFs0XSA9IGFbNF0gKiB5O1xuICAgIG91dFs1XSA9IGFbNV0gKiB5O1xuICAgIG91dFs2XSA9IGFbNl0gKiB5O1xuICAgIG91dFs3XSA9IGFbN10gKiB5O1xuICAgIG91dFs4XSA9IGFbOF0gKiB6O1xuICAgIG91dFs5XSA9IGFbOV0gKiB6O1xuICAgIG91dFsxMF0gPSBhWzEwXSAqIHo7XG4gICAgb3V0WzExXSA9IGFbMTFdICogejtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBzdHI7XG5cbi8qKlxuICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDRcbiAqXG4gKiBAcGFyYW0ge21hdDR9IG1hdCBtYXRyaXggdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICovXG5mdW5jdGlvbiBzdHIoYSkge1xuICAgIHJldHVybiAnbWF0NCgnICsgYVswXSArICcsICcgKyBhWzFdICsgJywgJyArIGFbMl0gKyAnLCAnICsgYVszXSArICcsICcgK1xuICAgICAgICAgICAgICAgICAgICBhWzRdICsgJywgJyArIGFbNV0gKyAnLCAnICsgYVs2XSArICcsICcgKyBhWzddICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgIGFbOF0gKyAnLCAnICsgYVs5XSArICcsICcgKyBhWzEwXSArICcsICcgKyBhWzExXSArICcsICcgKyBcbiAgICAgICAgICAgICAgICAgICAgYVsxMl0gKyAnLCAnICsgYVsxM10gKyAnLCAnICsgYVsxNF0gKyAnLCAnICsgYVsxNV0gKyAnKSc7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gdHJhbnNsYXRlO1xuXG4vKipcbiAqIFRyYW5zbGF0ZSBhIG1hdDQgYnkgdGhlIGdpdmVuIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gKiBAcGFyYW0ge21hdDR9IGEgdGhlIG1hdHJpeCB0byB0cmFuc2xhdGVcbiAqIEBwYXJhbSB7dmVjM30gdiB2ZWN0b3IgdG8gdHJhbnNsYXRlIGJ5XG4gKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gKi9cbmZ1bmN0aW9uIHRyYW5zbGF0ZShvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sIHkgPSB2WzFdLCB6ID0gdlsyXSxcbiAgICAgICAgYTAwLCBhMDEsIGEwMiwgYTAzLFxuICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXG4gICAgICAgIGEyMCwgYTIxLCBhMjIsIGEyMztcblxuICAgIGlmIChhID09PSBvdXQpIHtcbiAgICAgICAgb3V0WzEyXSA9IGFbMF0gKiB4ICsgYVs0XSAqIHkgKyBhWzhdICogeiArIGFbMTJdO1xuICAgICAgICBvdXRbMTNdID0gYVsxXSAqIHggKyBhWzVdICogeSArIGFbOV0gKiB6ICsgYVsxM107XG4gICAgICAgIG91dFsxNF0gPSBhWzJdICogeCArIGFbNl0gKiB5ICsgYVsxMF0gKiB6ICsgYVsxNF07XG4gICAgICAgIG91dFsxNV0gPSBhWzNdICogeCArIGFbN10gKiB5ICsgYVsxMV0gKiB6ICsgYVsxNV07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYTAwID0gYVswXTsgYTAxID0gYVsxXTsgYTAyID0gYVsyXTsgYTAzID0gYVszXTtcbiAgICAgICAgYTEwID0gYVs0XTsgYTExID0gYVs1XTsgYTEyID0gYVs2XTsgYTEzID0gYVs3XTtcbiAgICAgICAgYTIwID0gYVs4XTsgYTIxID0gYVs5XTsgYTIyID0gYVsxMF07IGEyMyA9IGFbMTFdO1xuXG4gICAgICAgIG91dFswXSA9IGEwMDsgb3V0WzFdID0gYTAxOyBvdXRbMl0gPSBhMDI7IG91dFszXSA9IGEwMztcbiAgICAgICAgb3V0WzRdID0gYTEwOyBvdXRbNV0gPSBhMTE7IG91dFs2XSA9IGExMjsgb3V0WzddID0gYTEzO1xuICAgICAgICBvdXRbOF0gPSBhMjA7IG91dFs5XSA9IGEyMTsgb3V0WzEwXSA9IGEyMjsgb3V0WzExXSA9IGEyMztcblxuICAgICAgICBvdXRbMTJdID0gYTAwICogeCArIGExMCAqIHkgKyBhMjAgKiB6ICsgYVsxMl07XG4gICAgICAgIG91dFsxM10gPSBhMDEgKiB4ICsgYTExICogeSArIGEyMSAqIHogKyBhWzEzXTtcbiAgICAgICAgb3V0WzE0XSA9IGEwMiAqIHggKyBhMTIgKiB5ICsgYTIyICogeiArIGFbMTRdO1xuICAgICAgICBvdXRbMTVdID0gYTAzICogeCArIGExMyAqIHkgKyBhMjMgKiB6ICsgYVsxNV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB0cmFuc3Bvc2U7XG5cbi8qKlxuICogVHJhbnNwb3NlIHRoZSB2YWx1ZXMgb2YgYSBtYXQ0XG4gKlxuICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiB0cmFuc3Bvc2Uob3V0LCBhKSB7XG4gICAgLy8gSWYgd2UgYXJlIHRyYW5zcG9zaW5nIG91cnNlbHZlcyB3ZSBjYW4gc2tpcCBhIGZldyBzdGVwcyBidXQgaGF2ZSB0byBjYWNoZSBzb21lIHZhbHVlc1xuICAgIGlmIChvdXQgPT09IGEpIHtcbiAgICAgICAgdmFyIGEwMSA9IGFbMV0sIGEwMiA9IGFbMl0sIGEwMyA9IGFbM10sXG4gICAgICAgICAgICBhMTIgPSBhWzZdLCBhMTMgPSBhWzddLFxuICAgICAgICAgICAgYTIzID0gYVsxMV07XG5cbiAgICAgICAgb3V0WzFdID0gYVs0XTtcbiAgICAgICAgb3V0WzJdID0gYVs4XTtcbiAgICAgICAgb3V0WzNdID0gYVsxMl07XG4gICAgICAgIG91dFs0XSA9IGEwMTtcbiAgICAgICAgb3V0WzZdID0gYVs5XTtcbiAgICAgICAgb3V0WzddID0gYVsxM107XG4gICAgICAgIG91dFs4XSA9IGEwMjtcbiAgICAgICAgb3V0WzldID0gYTEyO1xuICAgICAgICBvdXRbMTFdID0gYVsxNF07XG4gICAgICAgIG91dFsxMl0gPSBhMDM7XG4gICAgICAgIG91dFsxM10gPSBhMTM7XG4gICAgICAgIG91dFsxNF0gPSBhMjM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb3V0WzBdID0gYVswXTtcbiAgICAgICAgb3V0WzFdID0gYVs0XTtcbiAgICAgICAgb3V0WzJdID0gYVs4XTtcbiAgICAgICAgb3V0WzNdID0gYVsxMl07XG4gICAgICAgIG91dFs0XSA9IGFbMV07XG4gICAgICAgIG91dFs1XSA9IGFbNV07XG4gICAgICAgIG91dFs2XSA9IGFbOV07XG4gICAgICAgIG91dFs3XSA9IGFbMTNdO1xuICAgICAgICBvdXRbOF0gPSBhWzJdO1xuICAgICAgICBvdXRbOV0gPSBhWzZdO1xuICAgICAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgICAgIG91dFsxMV0gPSBhWzE0XTtcbiAgICAgICAgb3V0WzEyXSA9IGFbM107XG4gICAgICAgIG91dFsxM10gPSBhWzddO1xuICAgICAgICBvdXRbMTRdID0gYVsxMV07XG4gICAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG91dDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBhZGQ7XG5cbi8qKlxuICogQWRkcyB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBhZGQob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF1cbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXVxuICAgIG91dFsyXSA9IGFbMl0gKyBiWzJdXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gYW5nbGVcblxudmFyIGZyb21WYWx1ZXMgPSByZXF1aXJlKCcuL2Zyb21WYWx1ZXMnKVxudmFyIG5vcm1hbGl6ZSA9IHJlcXVpcmUoJy4vbm9ybWFsaXplJylcbnZhciBkb3QgPSByZXF1aXJlKCcuL2RvdCcpXG5cbi8qKlxuICogR2V0IHRoZSBhbmdsZSBiZXR3ZWVuIHR3byAzRCB2ZWN0b3JzXG4gKiBAcGFyYW0ge3ZlYzN9IGEgVGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiBUaGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBhbmdsZSBpbiByYWRpYW5zXG4gKi9cbmZ1bmN0aW9uIGFuZ2xlKGEsIGIpIHtcbiAgICB2YXIgdGVtcEEgPSBmcm9tVmFsdWVzKGFbMF0sIGFbMV0sIGFbMl0pXG4gICAgdmFyIHRlbXBCID0gZnJvbVZhbHVlcyhiWzBdLCBiWzFdLCBiWzJdKVxuIFxuICAgIG5vcm1hbGl6ZSh0ZW1wQSwgdGVtcEEpXG4gICAgbm9ybWFsaXplKHRlbXBCLCB0ZW1wQilcbiBcbiAgICB2YXIgY29zaW5lID0gZG90KHRlbXBBLCB0ZW1wQilcblxuICAgIGlmKGNvc2luZSA+IDEuMCl7XG4gICAgICAgIHJldHVybiAwXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWNvcyhjb3NpbmUpXG4gICAgfSAgICAgXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGNsb25lO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gY2xvbmVcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAqL1xuZnVuY3Rpb24gY2xvbmUoYSkge1xuICAgIHZhciBvdXQgPSBuZXcgRmxvYXQzMkFycmF5KDMpXG4gICAgb3V0WzBdID0gYVswXVxuICAgIG91dFsxXSA9IGFbMV1cbiAgICBvdXRbMl0gPSBhWzJdXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gY29weTtcblxuLyoqXG4gKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgdmVjMyB0byBhbm90aGVyXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgc291cmNlIHZlY3RvclxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBjb3B5KG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF1cbiAgICBvdXRbMV0gPSBhWzFdXG4gICAgb3V0WzJdID0gYVsyXVxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWMzXG4gKlxuICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxuICovXG5mdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoMylcbiAgICBvdXRbMF0gPSAwXG4gICAgb3V0WzFdID0gMFxuICAgIG91dFsyXSA9IDBcbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSBjcm9zcztcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBjcm9zcyhvdXQsIGEsIGIpIHtcbiAgICB2YXIgYXggPSBhWzBdLCBheSA9IGFbMV0sIGF6ID0gYVsyXSxcbiAgICAgICAgYnggPSBiWzBdLCBieSA9IGJbMV0sIGJ6ID0gYlsyXVxuXG4gICAgb3V0WzBdID0gYXkgKiBieiAtIGF6ICogYnlcbiAgICBvdXRbMV0gPSBheiAqIGJ4IC0gYXggKiBielxuICAgIG91dFsyXSA9IGF4ICogYnkgLSBheSAqIGJ4XG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gZGlzdGFuY2U7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge051bWJlcn0gZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gKi9cbmZ1bmN0aW9uIGRpc3RhbmNlKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdLFxuICAgICAgICB5ID0gYlsxXSAtIGFbMV0sXG4gICAgICAgIHogPSBiWzJdIC0gYVsyXVxuICAgIHJldHVybiBNYXRoLnNxcnQoeCp4ICsgeSp5ICsgeip6KVxufSIsIm1vZHVsZS5leHBvcnRzID0gZGl2aWRlO1xuXG4vKipcbiAqIERpdmlkZXMgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gZGl2aWRlKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLyBiWzBdXG4gICAgb3V0WzFdID0gYVsxXSAvIGJbMV1cbiAgICBvdXRbMl0gPSBhWzJdIC8gYlsyXVxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGRvdDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gKi9cbmZ1bmN0aW9uIGRvdChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXVxufSIsIm1vZHVsZS5leHBvcnRzID0gZm9yRWFjaDtcblxudmFyIHZlYyA9IHJlcXVpcmUoJy4vY3JlYXRlJykoKVxuXG4vKipcbiAqIFBlcmZvcm0gc29tZSBvcGVyYXRpb24gb3ZlciBhbiBhcnJheSBvZiB2ZWMzcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhIHRoZSBhcnJheSBvZiB2ZWN0b3JzIHRvIGl0ZXJhdGUgb3ZlclxuICogQHBhcmFtIHtOdW1iZXJ9IHN0cmlkZSBOdW1iZXIgb2YgZWxlbWVudHMgYmV0d2VlbiB0aGUgc3RhcnQgb2YgZWFjaCB2ZWMzLiBJZiAwIGFzc3VtZXMgdGlnaHRseSBwYWNrZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgTnVtYmVyIG9mIGVsZW1lbnRzIHRvIHNraXAgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBOdW1iZXIgb2YgdmVjM3MgdG8gaXRlcmF0ZSBvdmVyLiBJZiAwIGl0ZXJhdGVzIG92ZXIgZW50aXJlIGFycmF5XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcbiAqIEBwYXJhbSB7T2JqZWN0fSBbYXJnXSBhZGRpdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgdG8gZm5cbiAqIEByZXR1cm5zIHtBcnJheX0gYVxuICogQGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2goYSwgc3RyaWRlLCBvZmZzZXQsIGNvdW50LCBmbiwgYXJnKSB7XG4gICAgICAgIHZhciBpLCBsXG4gICAgICAgIGlmKCFzdHJpZGUpIHtcbiAgICAgICAgICAgIHN0cmlkZSA9IDNcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFvZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IDBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoY291bnQpIHtcbiAgICAgICAgICAgIGwgPSBNYXRoLm1pbigoY291bnQgKiBzdHJpZGUpICsgb2Zmc2V0LCBhLmxlbmd0aClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGwgPSBhLmxlbmd0aFxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgICAgICAgdmVjWzBdID0gYVtpXSBcbiAgICAgICAgICAgIHZlY1sxXSA9IGFbaSsxXSBcbiAgICAgICAgICAgIHZlY1syXSA9IGFbaSsyXVxuICAgICAgICAgICAgZm4odmVjLCB2ZWMsIGFyZylcbiAgICAgICAgICAgIGFbaV0gPSB2ZWNbMF0gXG4gICAgICAgICAgICBhW2krMV0gPSB2ZWNbMV0gXG4gICAgICAgICAgICBhW2krMl0gPSB2ZWNbMl1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGFcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGZyb21WYWx1ZXM7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB2ZWMzIGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAqL1xuZnVuY3Rpb24gZnJvbVZhbHVlcyh4LCB5LCB6KSB7XG4gICAgdmFyIG91dCA9IG5ldyBGbG9hdDMyQXJyYXkoMylcbiAgICBvdXRbMF0gPSB4XG4gICAgb3V0WzFdID0geVxuICAgIG91dFsyXSA9IHpcbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogcmVxdWlyZSgnLi9jcmVhdGUnKVxuICAsIGNsb25lOiByZXF1aXJlKCcuL2Nsb25lJylcbiAgLCBhbmdsZTogcmVxdWlyZSgnLi9hbmdsZScpXG4gICwgZnJvbVZhbHVlczogcmVxdWlyZSgnLi9mcm9tVmFsdWVzJylcbiAgLCBjb3B5OiByZXF1aXJlKCcuL2NvcHknKVxuICAsIHNldDogcmVxdWlyZSgnLi9zZXQnKVxuICAsIGFkZDogcmVxdWlyZSgnLi9hZGQnKVxuICAsIHN1YnRyYWN0OiByZXF1aXJlKCcuL3N1YnRyYWN0JylcbiAgLCBtdWx0aXBseTogcmVxdWlyZSgnLi9tdWx0aXBseScpXG4gICwgZGl2aWRlOiByZXF1aXJlKCcuL2RpdmlkZScpXG4gICwgbWluOiByZXF1aXJlKCcuL21pbicpXG4gICwgbWF4OiByZXF1aXJlKCcuL21heCcpXG4gICwgc2NhbGU6IHJlcXVpcmUoJy4vc2NhbGUnKVxuICAsIHNjYWxlQW5kQWRkOiByZXF1aXJlKCcuL3NjYWxlQW5kQWRkJylcbiAgLCBkaXN0YW5jZTogcmVxdWlyZSgnLi9kaXN0YW5jZScpXG4gICwgc3F1YXJlZERpc3RhbmNlOiByZXF1aXJlKCcuL3NxdWFyZWREaXN0YW5jZScpXG4gICwgbGVuZ3RoOiByZXF1aXJlKCcuL2xlbmd0aCcpXG4gICwgc3F1YXJlZExlbmd0aDogcmVxdWlyZSgnLi9zcXVhcmVkTGVuZ3RoJylcbiAgLCBuZWdhdGU6IHJlcXVpcmUoJy4vbmVnYXRlJylcbiAgLCBpbnZlcnNlOiByZXF1aXJlKCcuL2ludmVyc2UnKVxuICAsIG5vcm1hbGl6ZTogcmVxdWlyZSgnLi9ub3JtYWxpemUnKVxuICAsIGRvdDogcmVxdWlyZSgnLi9kb3QnKVxuICAsIGNyb3NzOiByZXF1aXJlKCcuL2Nyb3NzJylcbiAgLCBsZXJwOiByZXF1aXJlKCcuL2xlcnAnKVxuICAsIHJhbmRvbTogcmVxdWlyZSgnLi9yYW5kb20nKVxuICAsIHRyYW5zZm9ybU1hdDQ6IHJlcXVpcmUoJy4vdHJhbnNmb3JtTWF0NCcpXG4gICwgdHJhbnNmb3JtTWF0MzogcmVxdWlyZSgnLi90cmFuc2Zvcm1NYXQzJylcbiAgLCB0cmFuc2Zvcm1RdWF0OiByZXF1aXJlKCcuL3RyYW5zZm9ybVF1YXQnKVxuICAsIHJvdGF0ZVg6IHJlcXVpcmUoJy4vcm90YXRlWCcpXG4gICwgcm90YXRlWTogcmVxdWlyZSgnLi9yb3RhdGVZJylcbiAgLCByb3RhdGVaOiByZXF1aXJlKCcuL3JvdGF0ZVonKVxuICAsIGZvckVhY2g6IHJlcXVpcmUoJy4vZm9yRWFjaCcpXG59IiwibW9kdWxlLmV4cG9ydHMgPSBpbnZlcnNlO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB2ZWN0b3IgdG8gaW52ZXJ0XG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIGludmVyc2Uob3V0LCBhKSB7XG4gIG91dFswXSA9IDEuMCAvIGFbMF1cbiAgb3V0WzFdID0gMS4wIC8gYVsxXVxuICBvdXRbMl0gPSAxLjAgLyBhWzJdXG4gIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGxlbmd0aDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWMzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICovXG5mdW5jdGlvbiBsZW5ndGgoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdXG4gICAgcmV0dXJuIE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnopXG59IiwibW9kdWxlLmV4cG9ydHMgPSBsZXJwO1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBsZXJwKG91dCwgYSwgYiwgdCkge1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdXG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheClcbiAgICBvdXRbMV0gPSBheSArIHQgKiAoYlsxXSAtIGF5KVxuICAgIG91dFsyXSA9IGF6ICsgdCAqIChiWzJdIC0gYXopXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gbWF4O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzMnc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gbWF4KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pXG4gICAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSlcbiAgICBvdXRbMl0gPSBNYXRoLm1heChhWzJdLCBiWzJdKVxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IG1pbjtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIG1pbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKVxuICAgIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pXG4gICAgb3V0WzJdID0gTWF0aC5taW4oYVsyXSwgYlsyXSlcbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSBtdWx0aXBseTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHR3byB2ZWMzJ3NcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiWzBdXG4gICAgb3V0WzFdID0gYVsxXSAqIGJbMV1cbiAgICBvdXRbMl0gPSBhWzJdICogYlsyXVxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IG5lZ2F0ZTtcblxuLyoqXG4gKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBuZWdhdGUob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gLWFbMF1cbiAgICBvdXRbMV0gPSAtYVsxXVxuICAgIG91dFsyXSA9IC1hWzJdXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gbm9ybWFsaXplO1xuXG4vKipcbiAqIE5vcm1hbGl6ZSBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdXG4gICAgdmFyIGxlbiA9IHgqeCArIHkqeSArIHoqelxuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAgIC8vVE9ETzogZXZhbHVhdGUgdXNlIG9mIGdsbV9pbnZzcXJ0IGhlcmU/XG4gICAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKVxuICAgICAgICBvdXRbMF0gPSBhWzBdICogbGVuXG4gICAgICAgIG91dFsxXSA9IGFbMV0gKiBsZW5cbiAgICAgICAgb3V0WzJdID0gYVsyXSAqIGxlblxuICAgIH1cbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSByYW5kb207XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9tbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gcmFuZG9tKG91dCwgc2NhbGUpIHtcbiAgICBzY2FsZSA9IHNjYWxlIHx8IDEuMFxuXG4gICAgdmFyIHIgPSBNYXRoLnJhbmRvbSgpICogMi4wICogTWF0aC5QSVxuICAgIHZhciB6ID0gKE1hdGgucmFuZG9tKCkgKiAyLjApIC0gMS4wXG4gICAgdmFyIHpTY2FsZSA9IE1hdGguc3FydCgxLjAteip6KSAqIHNjYWxlXG5cbiAgICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHpTY2FsZVxuICAgIG91dFsxXSA9IE1hdGguc2luKHIpICogelNjYWxlXG4gICAgb3V0WzJdID0geiAqIHNjYWxlXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gcm90YXRlWDtcblxuLyoqXG4gKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB4LWF4aXNcbiAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuICogQHBhcmFtIHt2ZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgYW5nbGUgb2Ygcm90YXRpb25cbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gcm90YXRlWChvdXQsIGEsIGIsIGMpe1xuICAgIHZhciBwID0gW10sIHI9W11cbiAgICAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gICAgcFswXSA9IGFbMF0gLSBiWzBdXG4gICAgcFsxXSA9IGFbMV0gLSBiWzFdXG4gICAgcFsyXSA9IGFbMl0gLSBiWzJdXG5cbiAgICAvL3BlcmZvcm0gcm90YXRpb25cbiAgICByWzBdID0gcFswXVxuICAgIHJbMV0gPSBwWzFdKk1hdGguY29zKGMpIC0gcFsyXSpNYXRoLnNpbihjKVxuICAgIHJbMl0gPSBwWzFdKk1hdGguc2luKGMpICsgcFsyXSpNYXRoLmNvcyhjKVxuXG4gICAgLy90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuICAgIG91dFswXSA9IHJbMF0gKyBiWzBdXG4gICAgb3V0WzFdID0gclsxXSArIGJbMV1cbiAgICBvdXRbMl0gPSByWzJdICsgYlsyXVxuXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gcm90YXRlWTtcblxuLyoqXG4gKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB5LWF4aXNcbiAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuICogQHBhcmFtIHt2ZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgYW5nbGUgb2Ygcm90YXRpb25cbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gcm90YXRlWShvdXQsIGEsIGIsIGMpe1xuICAgIHZhciBwID0gW10sIHI9W11cbiAgICAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gICAgcFswXSA9IGFbMF0gLSBiWzBdXG4gICAgcFsxXSA9IGFbMV0gLSBiWzFdXG4gICAgcFsyXSA9IGFbMl0gLSBiWzJdXG4gIFxuICAgIC8vcGVyZm9ybSByb3RhdGlvblxuICAgIHJbMF0gPSBwWzJdKk1hdGguc2luKGMpICsgcFswXSpNYXRoLmNvcyhjKVxuICAgIHJbMV0gPSBwWzFdXG4gICAgclsyXSA9IHBbMl0qTWF0aC5jb3MoYykgLSBwWzBdKk1hdGguc2luKGMpXG4gIFxuICAgIC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cbiAgICBvdXRbMF0gPSByWzBdICsgYlswXVxuICAgIG91dFsxXSA9IHJbMV0gKyBiWzFdXG4gICAgb3V0WzJdID0gclsyXSArIGJbMl1cbiAgXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gcm90YXRlWjtcblxuLyoqXG4gKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB6LWF4aXNcbiAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuICogQHBhcmFtIHt2ZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuICogQHBhcmFtIHt2ZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgYW5nbGUgb2Ygcm90YXRpb25cbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gcm90YXRlWihvdXQsIGEsIGIsIGMpe1xuICAgIHZhciBwID0gW10sIHI9W11cbiAgICAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gICAgcFswXSA9IGFbMF0gLSBiWzBdXG4gICAgcFsxXSA9IGFbMV0gLSBiWzFdXG4gICAgcFsyXSA9IGFbMl0gLSBiWzJdXG4gIFxuICAgIC8vcGVyZm9ybSByb3RhdGlvblxuICAgIHJbMF0gPSBwWzBdKk1hdGguY29zKGMpIC0gcFsxXSpNYXRoLnNpbihjKVxuICAgIHJbMV0gPSBwWzBdKk1hdGguc2luKGMpICsgcFsxXSpNYXRoLmNvcyhjKVxuICAgIHJbMl0gPSBwWzJdXG4gIFxuICAgIC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cbiAgICBvdXRbMF0gPSByWzBdICsgYlswXVxuICAgIG91dFsxXSA9IHJbMV0gKyBiWzFdXG4gICAgb3V0WzJdID0gclsyXSArIGJbMl1cbiAgXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gc2NhbGU7XG5cbi8qKlxuICogU2NhbGVzIGEgdmVjMyBieSBhIHNjYWxhciBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIHNjYWxlKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiXG4gICAgb3V0WzFdID0gYVsxXSAqIGJcbiAgICBvdXRbMl0gPSBhWzJdICogYlxuICAgIHJldHVybiBvdXRcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHNjYWxlQW5kQWRkO1xuXG4vKipcbiAqIEFkZHMgdHdvIHZlYzMncyBhZnRlciBzY2FsaW5nIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAqIEBwYXJhbSB7dmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBzY2FsZUFuZEFkZChvdXQsIGEsIGIsIHNjYWxlKSB7XG4gICAgb3V0WzBdID0gYVswXSArIChiWzBdICogc2NhbGUpXG4gICAgb3V0WzFdID0gYVsxXSArIChiWzFdICogc2NhbGUpXG4gICAgb3V0WzJdID0gYVsyXSArIChiWzJdICogc2NhbGUpXG4gICAgcmV0dXJuIG91dFxufSIsIm1vZHVsZS5leHBvcnRzID0gc2V0O1xuXG4vKipcbiAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzMgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIHNldChvdXQsIHgsIHksIHopIHtcbiAgICBvdXRbMF0gPSB4XG4gICAgb3V0WzFdID0geVxuICAgIG91dFsyXSA9IHpcbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSBzcXVhcmVkRGlzdGFuY2U7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMydzXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gKiBAcGFyYW0ge3ZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICovXG5mdW5jdGlvbiBzcXVhcmVkRGlzdGFuY2UoYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXSxcbiAgICAgICAgeiA9IGJbMl0gLSBhWzJdXG4gICAgcmV0dXJuIHgqeCArIHkqeSArIHoqelxufSIsIm1vZHVsZS5leHBvcnRzID0gc3F1YXJlZExlbmd0aDtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHZlYzNcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICovXG5mdW5jdGlvbiBzcXVhcmVkTGVuZ3RoKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXVxuICAgIHJldHVybiB4KnggKyB5KnkgKyB6Knpcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHN1YnRyYWN0O1xuXG4vKipcbiAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICogQHBhcmFtIHt2ZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiBzdWJ0cmFjdChvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC0gYlswXVxuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdXG4gICAgb3V0WzJdID0gYVsyXSAtIGJbMl1cbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSB0cmFuc2Zvcm1NYXQzO1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDMuXG4gKlxuICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHttYXQ0fSBtIHRoZSAzeDMgbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gKi9cbmZ1bmN0aW9uIHRyYW5zZm9ybU1hdDMob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLCB5ID0gYVsxXSwgeiA9IGFbMl1cbiAgICBvdXRbMF0gPSB4ICogbVswXSArIHkgKiBtWzNdICsgeiAqIG1bNl1cbiAgICBvdXRbMV0gPSB4ICogbVsxXSArIHkgKiBtWzRdICsgeiAqIG1bN11cbiAgICBvdXRbMl0gPSB4ICogbVsyXSArIHkgKiBtWzVdICsgeiAqIG1bOF1cbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSB0cmFuc2Zvcm1NYXQ0O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDQuXG4gKiA0dGggdmVjdG9yIGNvbXBvbmVudCBpcyBpbXBsaWNpdGx5ICcxJ1xuICpcbiAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gKiBAcGFyYW0ge3ZlYzN9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAqIEBwYXJhbSB7bWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAqL1xuZnVuY3Rpb24gdHJhbnNmb3JtTWF0NChvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXSxcbiAgICAgICAgdyA9IG1bM10gKiB4ICsgbVs3XSAqIHkgKyBtWzExXSAqIHogKyBtWzE1XVxuICAgIHcgPSB3IHx8IDEuMFxuICAgIG91dFswXSA9IChtWzBdICogeCArIG1bNF0gKiB5ICsgbVs4XSAqIHogKyBtWzEyXSkgLyB3XG4gICAgb3V0WzFdID0gKG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzldICogeiArIG1bMTNdKSAvIHdcbiAgICBvdXRbMl0gPSAobVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdKSAvIHdcbiAgICByZXR1cm4gb3V0XG59IiwibW9kdWxlLmV4cG9ydHMgPSB0cmFuc2Zvcm1RdWF0O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIHF1YXRcbiAqXG4gKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICogQHBhcmFtIHt2ZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gKiBAcGFyYW0ge3F1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICogQHJldHVybnMge3ZlYzN9IG91dFxuICovXG5mdW5jdGlvbiB0cmFuc2Zvcm1RdWF0KG91dCwgYSwgcSkge1xuICAgIC8vIGJlbmNobWFya3M6IGh0dHA6Ly9qc3BlcmYuY29tL3F1YXRlcm5pb24tdHJhbnNmb3JtLXZlYzMtaW1wbGVtZW50YXRpb25zXG5cbiAgICB2YXIgeCA9IGFbMF0sIHkgPSBhWzFdLCB6ID0gYVsyXSxcbiAgICAgICAgcXggPSBxWzBdLCBxeSA9IHFbMV0sIHF6ID0gcVsyXSwgcXcgPSBxWzNdLFxuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjXG4gICAgICAgIGl4ID0gcXcgKiB4ICsgcXkgKiB6IC0gcXogKiB5LFxuICAgICAgICBpeSA9IHF3ICogeSArIHF6ICogeCAtIHF4ICogeixcbiAgICAgICAgaXogPSBxdyAqIHogKyBxeCAqIHkgLSBxeSAqIHgsXG4gICAgICAgIGl3ID0gLXF4ICogeCAtIHF5ICogeSAtIHF6ICogelxuXG4gICAgLy8gY2FsY3VsYXRlIHJlc3VsdCAqIGludmVyc2UgcXVhdFxuICAgIG91dFswXSA9IGl4ICogcXcgKyBpdyAqIC1xeCArIGl5ICogLXF6IC0gaXogKiAtcXlcbiAgICBvdXRbMV0gPSBpeSAqIHF3ICsgaXcgKiAtcXkgKyBpeiAqIC1xeCAtIGl4ICogLXF6XG4gICAgb3V0WzJdID0gaXogKiBxdyArIGl3ICogLXF6ICsgaXggKiAtcXkgLSBpeSAqIC1xeFxuICAgIHJldHVybiBvdXRcbn0iLCJ2YXIgbWF0NCA9IHJlcXVpcmUoXCJnbC1tYXQ0XCIpXG52YXIgdmVjMyA9IHJlcXVpcmUoXCJnbC12ZWMzXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gQ2FtZXJhXG5cbmZ1bmN0aW9uIENhbWVyYSAoZ2wsIHgsIHksIHosIGF0WCwgYXRZLCBhdFopIHtcbiAgdmFyIHZpZXdNYXRyaXggPSBtYXQ0LmNyZWF0ZSgpXG4gIHZhciBwcm9qTWF0cml4ID0gbWF0NC5jcmVhdGUoKVxuICB2YXIgdXAgICAgICAgICA9IHZlYzMuZnJvbVZhbHVlcygwLCAxLCAwKVxuXG4gIHRoaXMucG9zaXRpb24gPSB2ZWMzLmZyb21WYWx1ZXMoeCwgeSwgeilcbiAgdGhpcy50YXJnZXQgICA9IHZlYzMuZnJvbVZhbHVlcyhhdFgsIGF0WSwgYXRaKVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInByb2plY3Rpb25NYXRyaXhcIiwge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgLy9UT0RPOiB0aGlzIGlzIG9kZGx5IGhhcmRjb2RlZD9cbiAgICAgIHZhciBhbmdsZSA9IDUwIC8gMTgwICogTWF0aC5QSSBcbiAgICAgIHZhciByYXRpbyA9IHRoaXMuYXNwZWN0UmF0aW9cblxuICAgICAgcmV0dXJuIG1hdDQucGVyc3BlY3RpdmUocHJvak1hdHJpeCwgYW5nbGUsIHJhdGlvLCAxLCAyMClcbiAgICB9IFxuICB9KVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInZpZXdNYXRyaXhcIiwge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG1hdDQubG9va0F0KHZpZXdNYXRyaXgsIHRoaXMucG9zaXRpb24sIHRoaXMudGFyZ2V0LCB1cClcbiAgICB9IFxuICB9KVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImFzcGVjdFJhdGlvXCIsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBnbC5kcmF3aW5nQnVmZmVyV2lkdGggLyBnbC5kcmF3aW5nQnVmZmVySGVpZ2h0XG4gICAgfSBcbiAgfSlcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gQ2xvY2tcblxuZnVuY3Rpb24gQ2xvY2sgKCkge1xuICB0aGlzLmxhc3RUaW1lID0gRGF0ZS5ub3coKVxuICB0aGlzLnRoaXNUaW1lID0gdGhpcy5sYXN0VGltZVxuICB0aGlzLmRUICAgICAgID0gdGhpcy50aGlzVGltZSAtIHRoaXMubGFzdFRpbWVcbn1cblxuQ2xvY2sucHJvdG90eXBlLnRpY2sgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubGFzdFRpbWUgPSB0aGlzLnRoaXNUaW1lXG4gIHRoaXMudGhpc1RpbWUgPSBEYXRlLm5vdygpXG4gIHRoaXMuZFQgICAgICAgPSB0aGlzLnRoaXNUaW1lIC0gdGhpcy5sYXN0VGltZVxufVxuIiwidmFyIENsb2NrICAgICAgICAgICAgPSByZXF1aXJlKFwiLi9DbG9ja1wiKVxudmFyIEdMU3RhdGVmdWxSZW5kZXJpbmdDb250ZXh0ID0gcmVxdWlyZShcIi4vbW9kdWxlcy9HTFN0YXRlZnVsUmVuZGVyaW5nQ29udGV4dC9HTFN0YXRlZnVsUmVuZGVyaW5nQ29udGV4dFwiKVxudmFyIHJlc2l6ZVdpdGhSYXRpbyA9IHJlcXVpcmUoXCIuL2RvbS11dGlsc1wiKS5yZXNpemVXaXRoUmF0aW9cblxubW9kdWxlLmV4cG9ydHMgPSBHTFNoZWxsXG5cbmZ1bmN0aW9uIEdMU2hlbGwgKHBhcmVudE5vZGUsIGFzcGVjdFJhdGlvKSB7XG4gIHZhciBjYW52YXMgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKVxuICB2YXIgY3R4ICAgICAgICAgICAgICA9IGNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2xcIilcbiAgdmFyIGdsICAgICAgICAgICAgICAgPSBuZXcgR0xTdGF0ZWZ1bFJlbmRlcmluZ0NvbnRleHQoY3R4KVxuICB2YXIgY2xvY2sgICAgICAgICAgICA9IG5ldyBDbG9ja1xuXG4gIHZhciByZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmVzaXplV2l0aFJhdGlvKHRoaXMuYXNwZWN0UmF0aW8sIHRoaXMucGFyZW50Tm9kZSwgdGhpcy5nbC5jYW52YXMpXG4gICAgdGhpcy5yZW5kZXIoKSBcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKVxuICB9LmJpbmQodGhpcylcblxuICB2YXIgdXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY2xvY2sudGljaygpXG4gICAgdGhpcy51cGRhdGUodGhpcy5jbG9jay5kVCkgXG4gIH0uYmluZCh0aGlzKVxuXG4gIHRoaXMucGFyZW50Tm9kZSAgPSBwYXJlbnROb2RlXG4gIHRoaXMuZ2wgICAgICAgICAgPSBnbFxuICB0aGlzLmFzcGVjdFJhdGlvID0gYXNwZWN0UmF0aW9cbiAgdGhpcy5jbG9jayAgICAgICA9IGNsb2NrXG5cbiAgcGFyZW50Tm9kZS5hcHBlbmRDaGlsZChjYW52YXMpXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpXG4gIHNldEludGVydmFsKHVwZGF0ZSwgMjUpXG59XG5cbkdMU2hlbGwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgLy9vdmVyIHdyaXRlIHRoaXMgd2l0aCB5b3VyIG93biByZW5kZXIgZnVuY3Rpb25cbn1cblxuLy9mb3IgY29udmVuaWVuY2UsIHRoZSB0aW1lIHNpbmNlIGxhc3QgdXBkYXRlIGlzIHBhc3NlZCBhcyBhIHBhcmFtYXRlclxuR0xTaGVsbC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRUKSB7XG4gIC8vb3ZlcndyaXRlIHRoaXMgd2l0aCB5b3VyIG93biB1cGRhdGUgZnVuY3Rpb25cbn1cbiIsInZhciBtYXQ0ICAgICAgICA9IHJlcXVpcmUoXCJnbC1tYXQ0XCIpXG5cbnZhciBHTFByb2dyYW0gICA9IHJlcXVpcmUoXCIuL3R5cGVzL0dMUHJvZ3JhbVwiKVxudmFyIFNjcmVlblF1YWQgID0gcmVxdWlyZShcIi4vU2NyZWVuUXVhZFwiKVxudmFyIG1hdHJpeFV0aWxzID0gcmVxdWlyZShcIi4vbWF0cml4LXV0aWxzXCIpXG5cbnZhciBjb21wdXRlVHJhbnNsYXRpb25NYXRyaXggPSBtYXRyaXhVdGlscy5jb21wdXRlVHJhbnNsYXRpb25NYXRyaXhcbnZhciBjb21wdXRlVHJhbnNmb3JtTWF0cml4ICAgPSBtYXRyaXhVdGlscy5jb21wdXRlVHJhbnNmb3JtTWF0cml4XG52YXIgY29tcHV0ZVJvdGF0aW9uTWF0cml4ICAgID0gbWF0cml4VXRpbHMuY29tcHV0ZVJvdGF0aW9uTWF0cml4XG52YXIgY29tcHV0ZVNjYWxlTWF0cml4ICAgICAgID0gbWF0cml4VXRpbHMuY29tcHV0ZVNjYWxlTWF0cml4XG52YXIgY29tcHV0ZU1vZGVsTWF0cml4ICAgICAgID0gbWF0cml4VXRpbHMuY29tcHV0ZU1vZGVsTWF0cml4XG5cbm1vZHVsZS5leHBvcnRzID0gR1BVUGFydGljbGVTeXN0ZW1cblxudmFyIHZlbG9jaXR5VlNyYyA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG5hdHRyaWJ1dGUgdmVjMiBzY3JlZW5Db29yZDtcXG5cXG52b2lkIG1haW4gKCkge1xcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KHNjcmVlbkNvb3JkLCAwLjAsIDEuMCk7XFxufVxcblwiXG52YXIgdmVsb2NpdHlGU3JjID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xcblxcbmNvbnN0IGZsb2F0IFBBUlRJQ0xFX01BU1MgICAgICAgPSAxLjA7XFxuY29uc3QgZmxvYXQgQVRUUkFDVElPTl9DT05TVEFOVCA9IDAuMDE7XFxuXFxudW5pZm9ybSBmbG9hdCBkVDtcXG51bmlmb3JtIHZlYzIgdmlld3BvcnQ7XFxudW5pZm9ybSBzYW1wbGVyMkQgdmVsb2NpdGllcztcXG51bmlmb3JtIHNhbXBsZXIyRCBwb3NpdGlvbnM7XFxudW5pZm9ybSBtYXQ0IG1vZGVsTWF0cml4O1xcblxcbnN0cnVjdCBBdHRyYWN0b3Ige1xcbiAgdmVjMyBwb3NpdGlvbjtcXG4gIGZsb2F0IG1hc3M7XFxufTtcXG5cXG51bmlmb3JtIEF0dHJhY3RvciBhdHRyYWN0b3JzWzNdO1xcblxcbnZlYzMgY2FsY0ZvcmNlIChmbG9hdCBjb25zLCAgZmxvYXQgbWFzczEsIGZsb2F0IG1hc3MyLCB2ZWMzIHBvczEsIHZlYzMgcG9zMikge1xcbiAgZmxvYXQgZGlzdCA9IG1heChkaXN0YW5jZShwb3MxLCBwb3MyKSwgLjEpO1xcbiAgdmVjMyBkaXIgICA9IChwb3MxIC0gcG9zMikgLyBkaXN0O1xcblxcbiAgcmV0dXJuIGNvbnMgKiBtYXNzMSAqIG1hc3MyIC8gKGRpc3QgKiBkaXN0KSAqIGRpcjtcXG59XFxuXFxudm9pZCBtYWluICgpIHtcXG4gIHZlYzIgdGV4dHVyZUluZGV4ID0gZ2xfRnJhZ0Nvb3JkLnh5IC8gdmlld3BvcnQ7XFxuICB2ZWMzIHZlbG9jaXR5ICAgICA9IHRleHR1cmUyRCh2ZWxvY2l0aWVzLCB0ZXh0dXJlSW5kZXgpLnh5ejtcXG4gIHZlYzMgcG9zaXRpb24gICAgID0gKG1vZGVsTWF0cml4ICogdGV4dHVyZTJEKHBvc2l0aW9ucywgdGV4dHVyZUluZGV4KSkueHl6O1xcbiAgdmVjMyBmb3JjZSAgICAgICAgPSB2ZWMzKDAuMCwgMC4wLCAwLjApO1xcblxcbiAgZm9yIChpbnQgaSA9IDA7IGkgPCAzOyBpKyspIHtcXG4gICAgZm9yY2UgKz0gY2FsY0ZvcmNlKEFUVFJBQ1RJT05fQ09OU1RBTlQsIFxcbiAgICAgICAgICAgICAgICAgICAgICAgYXR0cmFjdG9yc1tpXS5tYXNzLCBcXG4gICAgICAgICAgICAgICAgICAgICAgIFBBUlRJQ0xFX01BU1MsIFxcbiAgICAgICAgICAgICAgICAgICAgICAgYXR0cmFjdG9yc1tpXS5wb3NpdGlvbixcXG4gICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uKTtcXG4gIH1cXG5cXG4gIGdsX0ZyYWdDb2xvciA9IHZlYzQoKGZvcmNlIC8gUEFSVElDTEVfTUFTUykgKiBkVCArIHZlbG9jaXR5LCAxLjApO1xcbn1cXG5cIlxudmFyIHBvc2l0aW9uVlNyYyA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG5hdHRyaWJ1dGUgdmVjMiBzY3JlZW5Db29yZDtcXG5cXG52b2lkIG1haW4gKCkge1xcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KHNjcmVlbkNvb3JkLCAwLjAsIDEuMCk7XFxufVxcblwiXG52YXIgcG9zaXRpb25GU3JjID0gXCIjZGVmaW5lIEdMU0xJRlkgMVxcblxcbnByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xcblxcbnVuaWZvcm0gZmxvYXQgZFQ7XFxudW5pZm9ybSB2ZWMyIHZpZXdwb3J0O1xcbnVuaWZvcm0gc2FtcGxlcjJEIHZlbG9jaXRpZXM7XFxudW5pZm9ybSBzYW1wbGVyMkQgcG9zaXRpb25zO1xcblxcbnZvaWQgbWFpbiAoKSB7XFxuICB2ZWMyIHRleHR1cmVJbmRleCA9IGdsX0ZyYWdDb29yZC54eSAvIHZpZXdwb3J0O1xcbiAgdmVjMyB2ZWxvY2l0eSAgICAgPSB0ZXh0dXJlMkQodmVsb2NpdGllcywgdGV4dHVyZUluZGV4KS54eXo7XFxuICB2ZWMzIHBvc2l0aW9uICAgICA9IHRleHR1cmUyRChwb3NpdGlvbnMsIHRleHR1cmVJbmRleCkueHl6O1xcblxcbiAgZ2xfRnJhZ0NvbG9yICA9IHZlYzQoKGRUIC8gMTAuMCAqIHZlbG9jaXR5KSArIHBvc2l0aW9uLCAxLjApO1xcbn1cXG5cIlxudmFyIHJlbmRlclZTcmMgICA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG5hdHRyaWJ1dGUgdmVjMiBwYXJ0aWNsZUNvb3JkO1xcblxcbnVuaWZvcm0gc2FtcGxlcjJEIHBvc2l0aW9ucztcXG51bmlmb3JtIHZlYzIgc2NyZWVuRGltZW5zaW9ucztcXG51bmlmb3JtIG1hdDQgbW9kZWxNYXRyaXg7XFxudW5pZm9ybSBtYXQ0IHZpZXdNYXRyaXg7XFxudW5pZm9ybSBtYXQ0IHByb2plY3Rpb25NYXRyaXg7XFxudW5pZm9ybSBtYXQ0IHRyYW5zZm9ybU1hdHJpeDtcXG5cXG5jb25zdCBmbG9hdCBiYXNlU2l6ZSA9IDEuNTtcXG5cXG52YXJ5aW5nIHZlYzMgcG9zaXRpb247XFxuXFxudm9pZCBtYWluICgpIHtcXG4gIHZlYzQgcG9zICAgICAgICAgICAgPSB0ZXh0dXJlMkQocG9zaXRpb25zLCBwYXJ0aWNsZUNvb3JkKTtcXG4gIHZlYzQgd29ybGRTcGFjZVBvcyAgPSBtb2RlbE1hdHJpeCAqIHBvcztcXG4gIHZlYzQgc2NyZWVuU3BhY2VQb3MgPSB0cmFuc2Zvcm1NYXRyaXggKiBwb3M7XFxuXFxuICBwb3NpdGlvbiAgICAgPSB3b3JsZFNwYWNlUG9zLnh5ejtcXG4gIGdsX1Bvc2l0aW9uICA9IHNjcmVlblNwYWNlUG9zO1xcbiAgZ2xfUG9pbnRTaXplID0gYmFzZVNpemU7IFxcbn1cXG5cIlxudmFyIHJlbmRlckZTcmMgICA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5cXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcXG5cXG5zdHJ1Y3QgTGlnaHQge1xcbiAgdmVjMyBwb3NpdGlvbjtcXG4gIHZlYzMgY29sb3I7XFxuICBmbG9hdCBpbnRlbnNpdHk7XFxufTtcXG5cXG51bmlmb3JtIHZlYzQgY29sb3I7XFxudW5pZm9ybSBMaWdodCBsaWdodHNbM107XFxuXFxudmFyeWluZyB2ZWMzIHBvc2l0aW9uO1xcblxcbnZlYzMgY29sb3JGcm9tTGlnaHQgKHZlYzMgcG9zaXRpb24sIExpZ2h0IGxpZ2h0KSB7XFxuICBmbG9hdCBkaXN0ID0gZGlzdGFuY2UocG9zaXRpb24sIGxpZ2h0LnBvc2l0aW9uKTtcXG4gIGZsb2F0IGkgICAgPSBjbGFtcChsaWdodC5pbnRlbnNpdHkgLyAoZGlzdCAqIGRpc3QpLCAwLjAsIDEuMCk7XFxuXFxuICByZXR1cm4gaSAqIGxpZ2h0LmNvbG9yO1xcbn1cXG5cXG52b2lkIG1haW4gKCkge1xcbiAgdmVjMyBmaW5hbENvbG9yID0gdmVjMygwLjAsIDAuMCwgMC4wKTtcXG5cXG4gIGZvciAoaW50IGkgPSAwOyBpIDwgMzsgaSsrKSB7XFxuICAgIGZpbmFsQ29sb3IgKz0gKDAuMyAqIGNvbG9yRnJvbUxpZ2h0KHBvc2l0aW9uLCBsaWdodHNbaV0pKTtcXG4gIH1cXG4gIGdsX0ZyYWdDb2xvciA9IHZlYzQoXFxuICAgIG1pbihmaW5hbENvbG9yWzBdLCAxLjApLFxcbiAgICBtaW4oZmluYWxDb2xvclsxXSwgMS4wKSxcXG4gICAgbWluKGZpbmFsQ29sb3JbMl0sIDEuMCksXFxuICAgIDAuMCk7XFxufSBcXG5cIlxuXG5mdW5jdGlvbiBHUFVQYXJ0aWNsZVN5c3RlbSAoZ2wpIHtcbiAgdmFyIHZlbG9jaXR5UHJvZ3JhbSA9IG5ldyBHTFByb2dyYW0uZnJvbVNvdXJjZShnbCwgdmVsb2NpdHlWU3JjLCB2ZWxvY2l0eUZTcmMpXG4gIHZhciBwb3NpdGlvblByb2dyYW0gPSBuZXcgR0xQcm9ncmFtLmZyb21Tb3VyY2UoZ2wsIHBvc2l0aW9uVlNyYywgcG9zaXRpb25GU3JjKVxuICB2YXIgcmVuZGVyUHJvZ3JhbSAgID0gbmV3IEdMUHJvZ3JhbS5mcm9tU291cmNlKGdsLCByZW5kZXJWU3JjLCByZW5kZXJGU3JjKVxuICB2YXIgc2NyZWVuUXVhZCAgICAgID0gbmV3IFNjcmVlblF1YWRcbiAgdmFyIHNjcmVlbkJ1ZmZlciAgICA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG5cbiAgaWYgKHZlbG9jaXR5UHJvZ3JhbSBpbnN0YW5jZW9mIEVycm9yKSBjb25zb2xlLmxvZyh2ZWxvY2l0eVByb2dyYW0pXG4gIGlmIChwb3NpdGlvblByb2dyYW0gaW5zdGFuY2VvZiBFcnJvcikgY29uc29sZS5sb2cocG9zaXRpb25Qcm9ncmFtKVxuICBpZiAocmVuZGVyUHJvZ3JhbSBpbnN0YW5jZW9mIEVycm9yKSAgIGNvbnNvbGUubG9nKHJlbmRlclByb2dyYW0pXG5cbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHNjcmVlbkJ1ZmZlcilcbiAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHNjcmVlblF1YWQsIGdsLlNUQVRJQ19EUkFXKVxuXG4gIC8vZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAwKVxuICBnbC5jbGVhckNvbG9yKDEsIDEsIDEsIDEpXG5cbiAgLy8gRWFjaCBzaGFkZXIgaGFzIG9ubHkgYSBhdHRyaWJ1dGUgYm91bmQgdGh1cyBhbGxvd2luZyB0aGlzIHRvIHdvcmsuIFxuICAvLyBUaGUgYmV0dGVyIHF1ZXN0aW9uIGlzIGhvdyBjYW4gd2UgZm9ybXVsYXRlIHRoaXMgc3VjaCB0aGF0IGEgcHJvZ3JhbVxuICAvLyBzcGVjaWZpY3MgaXQncyBudW1iZXIgb2YgYXR0cmlidXRlcyBhbmQgdGhlbiBhbiBhcHByb3ByaWF0ZSBudW1iZXIgb2YgbG9jYXRpb25zXG4gIC8vIGFyZSBib3VuZCBhcyBuZWVkZWRcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoMCk7XG4gIC8vZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodmVsb2NpdHlQcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQpXG4gIC8vZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25Qcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQpXG4gIC8vZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocmVuZGVyUHJvZ3JhbS5hdHRyaWJ1dGVzLnBhcnRpY2xlQ29vcmQpXG5cbiAgdGhpcy5nbCAgICAgICAgICAgICAgICA9IGdsXG4gIHRoaXMuc2NyZWVuQnVmZmVyICAgICAgPSBzY3JlZW5CdWZmZXJcbiAgdGhpcy52ZWxvY2l0eVByb2dyYW0gICA9IHZlbG9jaXR5UHJvZ3JhbVxuICB0aGlzLnBvc2l0aW9uUHJvZ3JhbSAgID0gcG9zaXRpb25Qcm9ncmFtXG4gIHRoaXMucmVuZGVyUHJvZ3JhbSAgICAgPSByZW5kZXJQcm9ncmFtXG4gIHRoaXMudHJhbnNsYXRpb25NYXRyaXggPSBtYXQ0LmNyZWF0ZSgpXG4gIHRoaXMuc2NhbGVNYXRyaXggICAgICAgPSBtYXQ0LmNyZWF0ZSgpXG4gIHRoaXMucm90YXRpb25NYXRyaXggICAgPSBtYXQ0LmNyZWF0ZSgpXG4gIHRoaXMubW9kZWxNYXRyaXggICAgICAgPSBtYXQ0LmNyZWF0ZSgpXG4gIHRoaXMudHJhbnNmb3JtTWF0cml4ICAgPSBtYXQ0LmNyZWF0ZSgpXG59XG5cblxuR1BVUGFydGljbGVTeXN0ZW0ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkVCwgZ3B1RW1pdHRlcnMsIGF0dHJhY3RvcnMpIHtcbiAgdmFyIGdsICAgICAgICA9IHRoaXMuZ2xcbiAgdmFyIGRUU2Vjb25kcyA9IGRUIC8gMTAwMFxuICB2YXIgdlVuaWZvcm1zID0gdGhpcy52ZWxvY2l0eVByb2dyYW0udW5pZm9ybXNcbiAgdmFyIGVtaXR0ZXIgXG4gIHZhciB0bXBCdWZcblxuICBnbC51c2VQcm9ncmFtKHRoaXMudmVsb2NpdHlQcm9ncmFtLnByb2dyYW0pXG4gIGdsLmVuYWJsZShnbC5CTEVORClcbiAgZ2wuYmxlbmRGdW5jKGdsLk9ORSwgZ2wuWkVSTylcbiAgZ2wuZGlzYWJsZShnbC5ERVBUSF9URVNUKVxuICBnbC5kZXB0aE1hc2soZmFsc2UpXG4gIGdsLnVuaWZvcm0xZih0aGlzLnZlbG9jaXR5UHJvZ3JhbS51bmlmb3Jtcy5kVCwgZFRTZWNvbmRzKVxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5zY3JlZW5CdWZmZXIpXG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy52ZWxvY2l0eVByb2dyYW0uYXR0cmlidXRlcy5zY3JlZW5Db29yZCwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgMiwgZ2wuRkxPQVQsIGdsLkZBTFNFLCAwLCAwKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGF0dHJhY3RvcnMubGVuZ3RoOyBpKyspIHtcbiAgICBnbC51bmlmb3JtM2YodlVuaWZvcm1zW1wiYXR0cmFjdG9yc1tcIiArIGkgKyBcIl0ucG9zaXRpb25cIl0sXG4gICAgICAgICAgICAgICAgIGF0dHJhY3RvcnNbaV0ucGh5c2ljcy5wb3NpdGlvblswXSxcbiAgICAgICAgICAgICAgICAgYXR0cmFjdG9yc1tpXS5waHlzaWNzLnBvc2l0aW9uWzFdLFxuICAgICAgICAgICAgICAgICBhdHRyYWN0b3JzW2ldLnBoeXNpY3MucG9zaXRpb25bMl0pXG4gICAgZ2wudW5pZm9ybTFmKHZVbmlmb3Jtc1tcImF0dHJhY3RvcnNbXCIgKyBpICsgXCJdLm1hc3NcIl0sXG4gICAgICAgICAgICAgICAgIGF0dHJhY3RvcnNbaV0ucGh5c2ljcy5tYXNzKVxuICB9XG5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGdwdUVtaXR0ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgcGh5c2ljcyA9IGdwdUVtaXR0ZXJzW2ldLnBoeXNpY3NcbiAgICBlbWl0dGVyID0gZ3B1RW1pdHRlcnNbaV0uZ3B1RW1pdHRlclxuXG4gICAgY29tcHV0ZVRyYW5zbGF0aW9uTWF0cml4KHRoaXMudHJhbnNsYXRpb25NYXRyaXgsIHBoeXNpY3MucG9zaXRpb24pXG4gICAgY29tcHV0ZVJvdGF0aW9uTWF0cml4KHRoaXMucm90YXRpb25NYXRyaXgsIHBoeXNpY3Mucm90YXRpb24pXG4gICAgY29tcHV0ZVNjYWxlTWF0cml4KHRoaXMuc2NhbGVNYXRyaXgsIHBoeXNpY3Muc2NhbGUpXG4gICAgY29tcHV0ZU1vZGVsTWF0cml4KHRoaXMubW9kZWxNYXRyaXgsIHRoaXMudHJhbnNsYXRpb25NYXRyaXgsIFxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjYWxlTWF0cml4LCB0aGlzLnJvdGF0aW9uTWF0cml4KVxuXG4gICAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBlbWl0dGVyLnZlbFRhcmdldHNbMV0uaGFuZGxlKSBcbiAgICBnbC52aWV3cG9ydCgwLCAwLCBlbWl0dGVyLnZlbFRhcmdldHNbMV0ud2lkdGgsIFxuICAgICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIudmVsVGFyZ2V0c1sxXS5oZWlnaHQpXG4gICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVClcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKVxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGVtaXR0ZXIudmVsVGFyZ2V0c1swXS50ZXh0dXJlKVxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyAxKVxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIGVtaXR0ZXIucG9zVGFyZ2V0c1swXS50ZXh0dXJlKVxuICAgIGdsLnVuaWZvcm0xaSh0aGlzLnZlbG9jaXR5UHJvZ3JhbS51bmlmb3Jtcy52ZWxvY2l0aWVzLCAwKVxuICAgIGdsLnVuaWZvcm0xaSh0aGlzLnZlbG9jaXR5UHJvZ3JhbS51bmlmb3Jtcy5wb3NpdGlvbnMsIDEpXG4gICAgZ2wudW5pZm9ybTJmKHRoaXMudmVsb2NpdHlQcm9ncmFtLnVuaWZvcm1zLnZpZXdwb3J0LCBcbiAgICAgICAgICAgICAgICAgZW1pdHRlci52ZWxUYXJnZXRzWzFdLndpZHRoLCBcbiAgICAgICAgICAgICAgICAgZW1pdHRlci52ZWxUYXJnZXRzWzFdLmhlaWdodClcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMudmVsb2NpdHlQcm9ncmFtLnVuaWZvcm1zLm1vZGVsTWF0cml4LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLCB0aGlzLm1vZGVsTWF0cml4KVxuICAgICAgICAgICAgICAgICBcbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgNilcblxuICAgIHRtcEJ1ZiAgICAgICAgICAgICAgICA9IGVtaXR0ZXIudmVsVGFyZ2V0c1swXVxuICAgIGVtaXR0ZXIudmVsVGFyZ2V0c1swXSA9IGVtaXR0ZXIudmVsVGFyZ2V0c1sxXVxuICAgIGVtaXR0ZXIudmVsVGFyZ2V0c1sxXSA9IHRtcEJ1ZlxuICB9XG5cbiAgZ2wudXNlUHJvZ3JhbSh0aGlzLnBvc2l0aW9uUHJvZ3JhbS5wcm9ncmFtKVxuICBnbC51bmlmb3JtMWYodGhpcy5wb3NpdGlvblByb2dyYW0udW5pZm9ybXMuZFQsIGRUU2Vjb25kcylcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMuc2NyZWVuQnVmZmVyKVxuICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMucG9zaXRpb25Qcm9ncmFtLmF0dHJpYnV0ZXMuc2NyZWVuQ29vcmQsIFxuICAgICAgICAgICAgICAgICAgICAgICAgIDIsIGdsLkZMT0FULCBnbC5GQUxTRSwgMCwgMClcblxuICBmb3IgKHZhciBqID0gMDsgaiA8IGdwdUVtaXR0ZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgZW1pdHRlciA9IGdwdUVtaXR0ZXJzW2pdLmdwdUVtaXR0ZXJcblxuICAgIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgZW1pdHRlci5wb3NUYXJnZXRzWzFdLmhhbmRsZSkgXG4gICAgZ2wudmlld3BvcnQoMCwgMCwgZW1pdHRlci5wb3NUYXJnZXRzWzFdLndpZHRoLCBcbiAgICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLnBvc1RhcmdldHNbMV0uaGVpZ2h0KVxuICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMClcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBlbWl0dGVyLnZlbFRhcmdldHNbMF0udGV4dHVyZSlcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwICsgMSlcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBlbWl0dGVyLnBvc1RhcmdldHNbMF0udGV4dHVyZSlcbiAgICBnbC51bmlmb3JtMWkodGhpcy5wb3NpdGlvblByb2dyYW0udW5pZm9ybXMudmVsb2NpdGllcywgMClcbiAgICBnbC51bmlmb3JtMWkodGhpcy5wb3NpdGlvblByb2dyYW0udW5pZm9ybXMucG9zaXRpb25zLCAxKVxuICAgIGdsLnVuaWZvcm0yZih0aGlzLnBvc2l0aW9uUHJvZ3JhbS51bmlmb3Jtcy52aWV3cG9ydCwgXG4gICAgICAgICAgICAgICAgIGVtaXR0ZXIucG9zVGFyZ2V0c1sxXS53aWR0aCwgXG4gICAgICAgICAgICAgICAgIGVtaXR0ZXIucG9zVGFyZ2V0c1sxXS5oZWlnaHQpXG4gICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIDYpXG5cbiAgICB0bXBCdWYgICAgICAgICAgICAgICAgPSBlbWl0dGVyLnBvc1RhcmdldHNbMF1cbiAgICBlbWl0dGVyLnBvc1RhcmdldHNbMF0gPSBlbWl0dGVyLnBvc1RhcmdldHNbMV1cbiAgICBlbWl0dGVyLnBvc1RhcmdldHNbMV0gPSB0bXBCdWZcbiAgfVxufVxuXG5HUFVQYXJ0aWNsZVN5c3RlbS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGNhbWVyYSwgbGlnaHRzLCBncHVFbWl0dGVycykge1xuICB2YXIgZ2wgICAgICAgICAgICAgICA9IHRoaXMuZ2xcbiAgdmFyIHZpZXdNYXRyaXggICAgICAgPSBjYW1lcmEudmlld01hdHJpeFxuICB2YXIgcHJvamVjdGlvbk1hdHJpeCA9IGNhbWVyYS5wcm9qZWN0aW9uTWF0cml4XG4gIHZhciByVW5pZm9ybXMgICAgICAgID0gdGhpcy5yZW5kZXJQcm9ncmFtLnVuaWZvcm1zXG4gIHZhciBlbWl0dGVyXG5cbiAgZ2wudXNlUHJvZ3JhbSh0aGlzLnJlbmRlclByb2dyYW0ucHJvZ3JhbSlcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxuICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKVxuICBnbC52aWV3cG9ydCgwLCAwLCB0aGlzLmdsLmRyYXdpbmdCdWZmZXJXaWR0aCwgdGhpcy5nbC5kcmF3aW5nQnVmZmVySGVpZ2h0KVxuICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMucmVuZGVyUHJvZ3JhbS51bmlmb3Jtcy52aWV3TWF0cml4LCBcbiAgICAgICAgICAgICAgICAgICAgICBmYWxzZSwgdmlld01hdHJpeCkgXG4gIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5yZW5kZXJQcm9ncmFtLnVuaWZvcm1zLnByb2plY3Rpb25NYXRyaXgsIFxuICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLCBwcm9qZWN0aW9uTWF0cml4KSBcbiAgZ2wudW5pZm9ybTJmKHRoaXMucmVuZGVyUHJvZ3JhbS51bmlmb3Jtcy5zY3JlZW5EaW1lbnNpb25zLCBcbiAgICAgICAgICAgICAgIGdsLmRyYXdpbmdCdWZmZXJXaWR0aCwgZ2wuZHJhd2luZ0J1ZmZlckhlaWdodClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpZ2h0cy5sZW5ndGg7IGkrKykge1xuICAgIGdsLnVuaWZvcm0zZihyVW5pZm9ybXNbXCJsaWdodHNbXCIgKyBpICsgXCJdLnBvc2l0aW9uXCJdLFxuICAgICAgICAgICAgICAgICBsaWdodHNbaV0ucGh5c2ljcy5wb3NpdGlvblswXSxcbiAgICAgICAgICAgICAgICAgbGlnaHRzW2ldLnBoeXNpY3MucG9zaXRpb25bMV0sXG4gICAgICAgICAgICAgICAgIGxpZ2h0c1tpXS5waHlzaWNzLnBvc2l0aW9uWzJdKVxuICAgIGdsLnVuaWZvcm0zZihyVW5pZm9ybXNbXCJsaWdodHNbXCIgKyBpICsgXCJdLmNvbG9yXCJdLFxuICAgICAgICAgICAgICAgICBsaWdodHNbaV0ubGlnaHQuY29sb3JbMF0sXG4gICAgICAgICAgICAgICAgIGxpZ2h0c1tpXS5saWdodC5jb2xvclsxXSxcbiAgICAgICAgICAgICAgICAgbGlnaHRzW2ldLmxpZ2h0LmNvbG9yWzJdKVxuICAgIGdsLnVuaWZvcm0xZihyVW5pZm9ybXNbXCJsaWdodHNbXCIgKyBpICsgXCJdLmludGVuc2l0eVwiXSxcbiAgICAgICAgICAgICAgICAgbGlnaHRzW2ldLmxpZ2h0LmludGVuc2l0eSlcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZ3B1RW1pdHRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBwaHlzaWNzID0gZ3B1RW1pdHRlcnNbaV0ucGh5c2ljc1xuICAgIGVtaXR0ZXIgPSBncHVFbWl0dGVyc1tpXS5ncHVFbWl0dGVyXG5cbiAgICBjb21wdXRlVHJhbnNsYXRpb25NYXRyaXgodGhpcy50cmFuc2xhdGlvbk1hdHJpeCwgcGh5c2ljcy5wb3NpdGlvbilcbiAgICBjb21wdXRlUm90YXRpb25NYXRyaXgodGhpcy5yb3RhdGlvbk1hdHJpeCwgcGh5c2ljcy5yb3RhdGlvbilcbiAgICBjb21wdXRlU2NhbGVNYXRyaXgodGhpcy5zY2FsZU1hdHJpeCwgcGh5c2ljcy5zY2FsZSlcbiAgICBjb21wdXRlTW9kZWxNYXRyaXgodGhpcy5tb2RlbE1hdHJpeCwgdGhpcy50cmFuc2xhdGlvbk1hdHJpeCwgXG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2NhbGVNYXRyaXgsIHRoaXMucm90YXRpb25NYXRyaXgpXG4gICAgY29tcHV0ZVRyYW5zZm9ybU1hdHJpeCh0aGlzLnRyYW5zZm9ybU1hdHJpeCwgdGhpcy5tb2RlbE1hdHJpeCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdNYXRyaXgsIHByb2plY3Rpb25NYXRyaXgpXG5cbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMucmVuZGVyUHJvZ3JhbS51bmlmb3Jtcy5tb2RlbE1hdHJpeCwgXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSwgdGhpcy5tb2RlbE1hdHJpeClcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMucmVuZGVyUHJvZ3JhbS51bmlmb3Jtcy50cmFuc2Zvcm1NYXRyaXgsIFxuICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsIHRoaXMudHJhbnNmb3JtTWF0cml4KVxuICAgIGdsLnVuaWZvcm00Zih0aGlzLnJlbmRlclByb2dyYW0udW5pZm9ybXMuY29sb3IsIFxuICAgICAgICAgICAgICAgICBlbWl0dGVyLmNvbG9yWzBdLFxuICAgICAgICAgICAgICAgICBlbWl0dGVyLmNvbG9yWzFdLFxuICAgICAgICAgICAgICAgICBlbWl0dGVyLmNvbG9yWzJdLFxuICAgICAgICAgICAgICAgICBlbWl0dGVyLmNvbG9yWzNdKVxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgZW1pdHRlci5wb3NUYXJnZXRzWzBdLnRleHR1cmUpXG4gICAgZ2wudW5pZm9ybTFpKHRoaXMucmVuZGVyUHJvZ3JhbS51bmlmb3Jtcy5wb3NpdGlvbnMsIDApXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGVtaXR0ZXIuY29vcmRCdWZmZXIpXG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0aGlzLnJlbmRlclByb2dyYW0uYXR0cmlidXRlcy5wYXJ0aWNsZUNvb3JkLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIDIsIGdsLkZMT0FULCBnbC5GQUxTRSwgMCwgMClcbiAgICBnbC5kcmF3QXJyYXlzKGdsLlBPSU5UUywgMCwgZW1pdHRlci5hbGl2ZUNvdW50KVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEdhbWVwYWRNYW5hZ2VyIFxuXG52YXIgR0FNRVBBRF9DT1VOVCA9IDRcbnZhciBCVVRUT05fQ09VTlQgID0gMTZcblxuZnVuY3Rpb24gR2FtZXBhZFN0YXRlICgpIHtcbiAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZVxuICB0aGlzLmF4ZXMgICAgICA9IG5ldyBBcnJheShHQU1FUEFEX0NPVU5UKVxuICB0aGlzLmlzRG93bnMgICA9IG5ldyBBcnJheShCVVRUT05fQ09VTlQpIFxuICB0aGlzLmp1c3REb3ducyA9IG5ldyBBcnJheShCVVRUT05fQ09VTlQpIFxuICB0aGlzLmp1c3RVcHMgICA9IG5ldyBBcnJheShCVVRUT05fQ09VTlQpIFxufVxuXG5mdW5jdGlvbiBHYW1lcGFkTWFuYWdlciAod2luLCBuYXYpIHtcbiAgdmFyIGdldEdhbWVQYWRzID0gKG5hdi5nZXRHYW1lcGFkcyB8fCBuYXYud2Via2l0R2V0R2FtZXBhZHMpLmJpbmQobmF2KVxuXG4gIHRoaXMuaGFuZGxlcyAgID0gbmV3IEFycmF5KEdBTUVQQURfQ09VTlQpXG4gIHRoaXMucGFkU3RhdGVzID0gW1xuICAgIG5ldyBHYW1lcGFkU3RhdGUsXG4gICAgbmV3IEdhbWVwYWRTdGF0ZSxcbiAgICBuZXcgR2FtZXBhZFN0YXRlLFxuICAgIG5ldyBHYW1lcGFkU3RhdGVcbiAgXVxuXG4gIHRoaXMudGljayA9IGZ1bmN0aW9uIChkVCkge1xuICAgIHZhciBncHMgPSBnZXRHYW1lUGFkcygpXG4gICAgdmFyIGkgICA9IC0xIFxuICAgIHZhciBqICAgPSAtMVxuICAgIHZhciBwc1xuXG4gICAgd2hpbGUgKCsraSA8IEdBTUVQQURfQ09VTlQpIHtcbiAgICAgIGlmIChncHNbaV0pIHtcbiAgICAgICAgcHMgPSB0aGlzLnBhZFN0YXRlc1tpXVxuICAgICAgICBwcy5jb25uZWN0ZWQgPSB0cnVlXG4gICAgICAgIHBzLmF4ZXMgICAgICA9IGdwc1tpXS5heGVzIFxuICAgICAgICB3aGlsZSAoKytqIDwgQlVUVE9OX0NPVU5UKSB7XG4gICAgICAgICAgcHMuanVzdERvd25zW2pdID0gZ3BzW2ldLmJ1dHRvbnNbal0ucHJlc3NlZCAmJiAhcHMuaXNEb3duc1tqXVxuICAgICAgICAgIHBzLmp1c3RVcHNbal0gICA9IHBzLmlzRG93bnNbal0gJiYgIWdwc1tpXS5idXR0b25zW2pdLnByZXNzZWRcbiAgICAgICAgICBwcy5pc0Rvd25zW2pdICAgPSBncHNbaV0uYnV0dG9uc1tqXS5wcmVzc2VkXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEtleWJvYXJkTWFuYWdlclxuXG52YXIgS0VZX0NPVU5UID0gMjU2XG5cbmZ1bmN0aW9uIEtleWJvYXJkTWFuYWdlciAoZWxlbWVudCkge1xuICB2YXIgaXNEb3ducyAgICAgICA9IG5ldyBBcnJheShLRVlfQ09VTlQpXG4gIHZhciBqdXN0RG93bnMgICAgID0gbmV3IEFycmF5KEtFWV9DT1VOVClcbiAgdmFyIGp1c3RVcHMgICAgICAgPSBuZXcgQXJyYXkoS0VZX0NPVU5UKVxuICB2YXIgZG93bkR1cmF0aW9ucyA9IG5ldyBBcnJheShLRVlfQ09VTlQpXG4gIFxuICB2YXIgaGFuZGxlS2V5RG93biA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGtleUNvZGUgPSBlLmtleUNvZGVcblxuICAgIGp1c3REb3duc1trZXlDb2RlXSA9ICFpc0Rvd25zW2tleUNvZGVdXG4gICAgaXNEb3duc1trZXlDb2RlXSAgID0gdHJ1ZVxuICB9XG5cbiAgdmFyIGhhbmRsZUtleVVwID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIga2V5Q29kZSA9IGUua2V5Q29kZVxuXG4gICAganVzdFVwc1trZXlDb2RlXSAgID0gdHJ1ZVxuICAgIGlzRG93bnNba2V5Q29kZV0gICA9IGZhbHNlXG4gIH1cblxuICB2YXIgaGFuZGxlQmx1ciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaSA9IC0xXG5cbiAgICB3aGlsZSAoKytpIDwgS0VZX0NPVU5UKSB7XG4gICAgICBpc0Rvd25zW2ldICAgPSAwXG4gICAgICBqdXN0RG93bnNbaV0gPSAwXG4gICAgICBqdXN0VXBzW2ldICAgPSAwXG4gICAgfVxuICB9XG5cbiAgdGhpcy5pc0Rvd25zICAgICAgICAgPSBpc0Rvd25zXG4gIHRoaXMuanVzdFVwcyAgICAgICAgID0ganVzdFVwc1xuICB0aGlzLmp1c3REb3ducyAgICAgICA9IGp1c3REb3duc1xuICB0aGlzLmRvd25EdXJhdGlvbnMgICA9IGRvd25EdXJhdGlvbnNcbiAgdGhpcy5rZXlkb3duTGlzdGVuZXIgPSBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUtleURvd24pXG4gIHRoaXMua2V5dXBMaXN0ZW5lciAgID0gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgaGFuZGxlS2V5VXApXG4gIHRoaXMuYmx1ckxpc3RlbmVyICAgID0gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBoYW5kbGVCbHVyKVxuXG4gIC8vYXNzaWduIHRhYkluZGV4IGlmIHRoZXJlIGlzbid0IG9uZSB0byBhbGxvdyBlbGVtZW50IHRvIGJlIGZvY3VzZWRcbiAgZWxlbWVudC50YWJJbmRleCA9IGVsZW1lbnQudGFiSW5kZXggPT09IC0xID8gMCA6IGVsZW1lbnQudGFiSW5kZXhcblxuICB0aGlzLnRpY2sgPSBmdW5jdGlvbiAoZFQpIHtcbiAgICB2YXIgaSA9IC0xXG5cbiAgICB3aGlsZSAoKytpIDwgS0VZX0NPVU5UKSB7XG4gICAgICBqdXN0RG93bnNbaV0gPSBmYWxzZSBcbiAgICAgIGp1c3RVcHNbaV0gICA9IGZhbHNlXG4gICAgICBpZiAoaXNEb3duc1tpXSkgZG93bkR1cmF0aW9uc1tpXSArPSBkVFxuICAgICAgZWxzZSAgICAgICAgICAgIGRvd25EdXJhdGlvbnNbaV0gPSAwXG4gICAgfVxuICB9XG5cbiAgdGhpcy5kZXRhY2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLmtleWRvd25MaXN0ZW5lcilcbiAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLmtleXVwTGlzdGVuZXIpXG4gICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYmx1clwiLCB0aGlzLmJsdXJMaXN0ZW5lcilcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBTY3JlZW5RdWFkXG5cbmZ1bmN0aW9uIFNjcmVlblF1YWQgKCkge1xuICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheShbXG4gICAgMSwgMSwgLTEsIDEsIC0xLCAtMSxcbiAgICAxLCAxLCAtMSwgLTEsIDEsIC0xXG4gIF0pXG59XG4iLCJ2YXIgUGh5c2ljcyAgICA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL1BoeXNpY3NcIilcbnZhciBBdHRyYWN0aXZlID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvQXR0cmFjdGl2ZVwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEF0dHJhY3RvclxuXG4vLyBbeCx5LHpdIC0+IE51bWJlciAtPiBBdHRyYWN0b3JcbmZ1bmN0aW9uIEF0dHJhY3RvciAocG9zaXRpb24sIG1hc3MpIHtcbiAgdGhpcy5waHlzaWNzICAgICAgPSBuZXcgUGh5c2ljcyhwb3NpdGlvbiwgWzAsIDAsIDBdKVxuICB0aGlzLnBoeXNpY3MubWFzcyA9IG1hc3NcbiAgdGhpcy5hdHRyYWN0aXZlICAgPSBuZXcgQXR0cmFjdGl2ZSh0cnVlKVxufVxuIiwidmFyIEdQVUVtaXR0ZXIgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9HUFVFbWl0dGVyXCIpXG52YXIgUGh5c2ljcyAgICA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnRzL1BoeXNpY3NcIilcblxubW9kdWxlLmV4cG9ydHMgPSBHUFVQYXJ0aWNsZUVtaXR0ZXJcblxuLy8gR0xDb250ZXh0IC0+IFt4LHksel0gLT4gW3IsZyxiLGFdIC0+IEdQVVBhcnRpY2xlRW1pdHRlclxuZnVuY3Rpb24gR1BVUGFydGljbGVFbWl0dGVyIChnbCwgcG9zaXRpb24sIGNvbG9yKSB7XG4gIHRoaXMucGh5c2ljcyAgICA9IG5ldyBQaHlzaWNzKHBvc2l0aW9uLCBbMCwgMCwgMF0pXG4gIHRoaXMuZ3B1RW1pdHRlciA9IG5ldyBHUFVFbWl0dGVyKGdsLCBjb2xvcilcbn1cbiIsInZhciBMaWdodCAgID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvTGlnaHRcIilcbnZhciBQaHlzaWNzID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvUGh5c2ljc1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBvaW50TGlnaHRcblxuZnVuY3Rpb24gUG9pbnRMaWdodCAocG9zaXRpb24sIGNvbG9yLCBpbnRlbnNpdHkpIHtcbiAgdGhpcy5waHlzaWNzID0gbmV3IFBoeXNpY3MocG9zaXRpb24sIFswLCAwLCAwXSkgXG4gIHRoaXMubGlnaHQgICA9IG5ldyBMaWdodChjb2xvciwgaW50ZW5zaXR5KVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBBdHRyYWN0aXZlXG5cbmZ1bmN0aW9uIEF0dHJhY3RpdmUgKGFjdGl2ZSkge1xuICB0aGlzLmFjdGl2ZSA9IGFjdGl2ZSA9PSBudWxsID8gdHJ1ZSA6IGFjdGl2ZVxufVxuIiwidmFyIEdMUmVuZGVyVGFyZ2V0ID0gcmVxdWlyZShcIi4uL3R5cGVzL0dMUmVuZGVyVGFyZ2V0XCIpXG5cbm1vZHVsZS5leHBvcnRzID0gR1BVRW1pdHRlclxuXG52YXIgUEFSVElDTEVfU1RSSURFID0gNFxuXG5mdW5jdGlvbiBHUFVFbWl0dGVyIChnbCwgY29sb3IpIHtcbiAgaWYgKCFnbC5nZXRFeHRlbnNpb24oXCJPRVNfdGV4dHVyZV9mbG9hdFwiKSkgdGhyb3cgbmV3IEVycm9yKFwibm8gZmxvYXQgdGV4dHVyZXNcIilcblxuICB2YXIgUk9XX1NJWkUgICAgICAgPSAyNTZcbiAgdmFyIENPVU5UICAgICAgICAgID0gUk9XX1NJWkUgKiBST1dfU0laRVxuICB2YXIgcG9zaXRpb25zICAgICAgPSBpbml0aWFsaXplUGFydGljbGVYWVooMCwgMCwgMCwgbmV3IEZsb2F0MzJBcnJheSg0ICogQ09VTlQpKVxuICB2YXIgdmVsb2NpdGllcyAgICAgPSBpbml0aWFsaXplUGFydGljbGVYWVooMCwgMCwgMCwgbmV3IEZsb2F0MzJBcnJheSg0ICogQ09VTlQpKVxuICB2YXIgcG9zVGFyZ2V0MSAgICAgPSBuZXcgR0xSZW5kZXJUYXJnZXQoZ2wsIFJPV19TSVpFLCBST1dfU0laRSwgcG9zaXRpb25zKVxuICB2YXIgcG9zVGFyZ2V0MiAgICAgPSBuZXcgR0xSZW5kZXJUYXJnZXQoZ2wsIFJPV19TSVpFLCBST1dfU0laRSwgcG9zaXRpb25zKVxuICB2YXIgdmVsVGFyZ2V0MSAgICAgPSBuZXcgR0xSZW5kZXJUYXJnZXQoZ2wsIFJPV19TSVpFLCBST1dfU0laRSwgdmVsb2NpdGllcylcbiAgdmFyIHZlbFRhcmdldDIgICAgID0gbmV3IEdMUmVuZGVyVGFyZ2V0KGdsLCBST1dfU0laRSwgUk9XX1NJWkUsIHZlbG9jaXRpZXMpXG4gIHZhciBwYXJ0aWNsZUNvb3JkcyA9IGJ1aWxkUGFydGljbGVDb29yZHMoUk9XX1NJWkUsIFJPV19TSVpFKVxuICB2YXIgY29vcmRCdWZmZXIgICAgPSBnbC5jcmVhdGVCdWZmZXIoKVxuXG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBjb29yZEJ1ZmZlcilcbiAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHBhcnRpY2xlQ29vcmRzLCBnbC5TVEFUSUNfRFJBVylcblxuICB0aGlzLnBvc1RhcmdldHMgICAgPSBbcG9zVGFyZ2V0MSwgcG9zVGFyZ2V0Ml1cbiAgdGhpcy52ZWxUYXJnZXRzICAgID0gW3ZlbFRhcmdldDEsIHZlbFRhcmdldDJdXG4gIHRoaXMuY29vcmRCdWZmZXIgICA9IGNvb3JkQnVmZmVyXG4gIHRoaXMuYWxpdmVDb3VudCAgICA9IFJPV19TSVpFICogUk9XX1NJWkVcbiAgdGhpcy5jb2xvciAgICAgICAgID0gY29sb3Jcbn1cblxuZnVuY3Rpb24gYnVpbGRQYXJ0aWNsZUNvb3JkcyAod2lkdGgsIGhlaWdodCkge1xuICB2YXIgYXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KHdpZHRoICogMiAqIGhlaWdodClcblxuICBmb3IgKHZhciBqID0gMDsgaiA8IGhlaWdodDsgaisrKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICBhcnJheVtqICogMiAqIHdpZHRoICsgaSAqIDJdICAgICA9IFtpIC8gd2lkdGhdXG4gICAgICBhcnJheVtqICogMiAqIHdpZHRoICsgaSAqIDIgKyAxXSA9IFtqIC8gaGVpZ2h0XVxuICAgIH0gXG4gIH1cbiAgcmV0dXJuIGFycmF5XG59XG5cbmZ1bmN0aW9uIHNldFBhcnRpY2xlWFlaIChpbmRleCwgeCwgeSwgeiwgYXJyYXkpIHtcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXhdICAgICA9IHhcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXggKyAxXSA9IHlcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXggKyAyXSA9IHpcbiAgYXJyYXlbUEFSVElDTEVfU1RSSURFICogaW5kZXggKyAzXSA9IDFcbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZVBhcnRpY2xlWFlaICh4LCB5LCB6LCBhcnJheSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aCAvIFBBUlRJQ0xFX1NUUklERTsgaSsrKSB7XG4gICAgc2V0UGFydGljbGVYWVooaSwgXG4gICAgICAgICAgICAgICAgICAgeCArIE1hdGgucmFuZG9tKCkgLSAuNSwgXG4gICAgICAgICAgICAgICAgICAgeSArIE1hdGgucmFuZG9tKCkgLSAuNSwgXG4gICAgICAgICAgICAgICAgICAgeiArIE1hdGgucmFuZG9tKCkgLSAuNSwgXG4gICAgICAgICAgICAgICAgICAgYXJyYXkpXG4gIH1cbiAgcmV0dXJuIGFycmF5XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IExpZ2h0XG5cbmZ1bmN0aW9uIExpZ2h0IChjb2xvciwgaW50ZW5zaXR5KSB7XG4gIHRoaXMuY29sb3IgICAgID0gY29sb3JcbiAgdGhpcy5pbnRlbnNpdHkgPSBpbnRlbnNpdHlcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gUGh5c2ljc1xuXG4vLyBbeCx5LHpdIC0+IFtkeCwgZHksIGR6XSAtPiBQaHlzaWNzXG5mdW5jdGlvbiBQaHlzaWNzIChwb3NpdGlvbiwgdmVsb2NpdHkpIHtcbiAgdGhpcy5wb3NpdGlvbiAgICAgPSBwb3NpdGlvblxuICB0aGlzLnZlbG9jaXR5ICAgICA9IHZlbG9jaXR5XG4gIHRoaXMuYWNjZWxlcmF0aW9uID0gWzAsIDAsIDBdXG4gIHRoaXMubWFzcyAgICAgICAgID0gMVxuICB0aGlzLnNjYWxlICAgICAgICA9IFsxLCAxLCAxXVxuICB0aGlzLnJvdGF0aW9uICAgICA9IFswLCAwLCAwXVxufVxuIiwibW9kdWxlLmV4cG9ydHMucmVzaXplV2l0aFJhdGlvID0gcmVzaXplV2l0aFJhdGlvXG5cbmZ1bmN0aW9uIHJlc2l6ZVdpdGhSYXRpbyAocmF0aW8sIHJlZmVyZW5jZSwgc3ViamVjdCkge1xuICB2YXIgdGFyZ2V0QXNwZWN0ID0gcmVmZXJlbmNlLmNsaWVudFdpZHRoIC8gcmVmZXJlbmNlLmNsaWVudEhlaWdodFxuICB2YXIgbmV3V2lkdGggICAgID0gcmF0aW8gPCB0YXJnZXRBc3BlY3RcbiAgICA/IH5+KHJlZmVyZW5jZS5jbGllbnRIZWlnaHQgKiByYXRpbylcbiAgICA6IHJlZmVyZW5jZS5jbGllbnRXaWR0aFxuICB2YXIgbmV3SGVpZ2h0ICAgID0gfn4obmV3V2lkdGggLyByYXRpbylcbiAgdmFyIG9sZFdpZHRoICAgICA9IHN1YmplY3QuY2xpZW50V2lkdGhcbiAgdmFyIG9sZEhlaWdodCAgICA9IHN1YmplY3QuY2xpZW50SGVpZ2h0XG5cbiAgaWYgKG9sZFdpZHRoID09PSBuZXdXaWR0aCAmJiBvbGRIZWlnaHQgPT09IG5ld0hlaWdodCkgcmV0dXJuXG4gIHN1YmplY3QuY2xpZW50V2lkdGggID0gbmV3V2lkdGhcbiAgc3ViamVjdC5jbGllbnRIZWlnaHQgPSBuZXdIZWlnaHRcbiAgc3ViamVjdC53aWR0aCAgICAgICAgPSBuZXdXaWR0aFxuICBzdWJqZWN0LmhlaWdodCAgICAgICA9IG5ld0hlaWdodFxufVxuIiwidmFyIEdMU2hlbGwgICAgICAgICAgICA9IHJlcXVpcmUoXCIuL0dMU2hlbGxcIilcbnZhciBHUFVQYXJ0aWNsZVN5c3RlbSAgPSByZXF1aXJlKFwiLi9HUFVQYXJ0aWNsZVN5c3RlbVwiKVxudmFyIEtleWJvYXJkTWFuYWdlciAgICA9IHJlcXVpcmUoXCIuL0tleWJvYXJkTWFuYWdlclwiKVxudmFyIEdhbWVwYWRNYW5hZ2VyICAgICA9IHJlcXVpcmUoXCIuL0dhbWVwYWRNYW5hZ2VyXCIpXG52YXIgR1BVUGFydGljbGVFbWl0dGVyID0gcmVxdWlyZShcIi4vYXNzZW1ibGllcy9HUFVQYXJ0aWNsZUVtaXR0ZXJcIilcbnZhciBBdHRyYWN0b3IgICAgICAgICAgPSByZXF1aXJlKFwiLi9hc3NlbWJsaWVzL0F0dHJhY3RvclwiKVxudmFyIFBvaW50TGlnaHQgICAgICAgICA9IHJlcXVpcmUoXCIuL2Fzc2VtYmxpZXMvUG9pbnRMaWdodFwiKVxudmFyIENhbWVyYSAgICAgICAgICAgICA9IHJlcXVpcmUoXCIuL0NhbWVyYVwiKVxudmFyIHJhbmRVdGlscyAgICAgICAgICA9IHJlcXVpcmUoXCIuL3JhbmRvbS11dGlsc1wiKVxudmFyIHJhbmRvbUJvdW5kICAgICAgICA9IHJhbmRVdGlscy5yYW5kb21Cb3VuZFxudmFyIHJhbmRvbVZlY3RvciAgICAgICA9IHJhbmRVdGlscy5yYW5kb21WZWN0b3JcbnZhciBzaGVsbCAgICAgICAgICAgICAgPSBuZXcgR0xTaGVsbChkb2N1bWVudC5ib2R5LCAxOTIwIC8gMTA4MClcbnZhciBncHVQYXJ0aWNsZVN5c3RlbSAgPSBuZXcgR1BVUGFydGljbGVTeXN0ZW0oc2hlbGwuZ2wpXG52YXIga2V5Ym9hcmRNYW5hZ2VyICAgID0gbmV3IEtleWJvYXJkTWFuYWdlcihkb2N1bWVudC5ib2R5KVxudmFyIGdhbWVwYWRNYW5hZ2VyICAgICA9IG5ldyBHYW1lcGFkTWFuYWdlcih3aW5kb3csIG5hdmlnYXRvcilcblxudmFyIGVudGl0aWVzID0gW1xuICBuZXcgR1BVUGFydGljbGVFbWl0dGVyKHNoZWxsLmdsLCByYW5kb21WZWN0b3IoMywgLTEsIDEpLCByYW5kb21WZWN0b3IoNCwgMCwgMSkpLFxuICBuZXcgR1BVUGFydGljbGVFbWl0dGVyKHNoZWxsLmdsLCByYW5kb21WZWN0b3IoMywgLTEsIDEpLCByYW5kb21WZWN0b3IoNCwgMCwgMSkpLFxuICBuZXcgR1BVUGFydGljbGVFbWl0dGVyKHNoZWxsLmdsLCByYW5kb21WZWN0b3IoMywgLTEsIDEpLCByYW5kb21WZWN0b3IoNCwgMCwgMSkpLFxuICBuZXcgR1BVUGFydGljbGVFbWl0dGVyKHNoZWxsLmdsLCByYW5kb21WZWN0b3IoMywgLTEsIDEpLCByYW5kb21WZWN0b3IoNCwgMCwgMSkpLFxuICBuZXcgQXR0cmFjdG9yKHJhbmRvbVZlY3RvcigzLCAtMSwgMSksIHJhbmRvbUJvdW5kKDAsIDIwMCkpLFxuICBuZXcgQXR0cmFjdG9yKHJhbmRvbVZlY3RvcigzLCAtMSwgMSksIHJhbmRvbUJvdW5kKDAsIDIwMCkpLFxuICBuZXcgQXR0cmFjdG9yKHJhbmRvbVZlY3RvcigzLCAtMSwgMSksIHJhbmRvbUJvdW5kKDAsIDIwMCkpLFxuICBuZXcgUG9pbnRMaWdodChyYW5kb21WZWN0b3IoMywgLTEsIDEpLCByYW5kb21WZWN0b3IoMywgMCwgMSksIDEpLFxuICBuZXcgUG9pbnRMaWdodChyYW5kb21WZWN0b3IoMywgLTEsIDEpLCByYW5kb21WZWN0b3IoMywgMCwgMSksIDEpLFxuICBuZXcgUG9pbnRMaWdodChyYW5kb21WZWN0b3IoMywgLTEsIDEpLCByYW5kb21WZWN0b3IoMywgMCwgMSksIDEpXG5dXG52YXIgZ3B1RW1pdHRlcnMgPSBlbnRpdGllcy5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuICEhZS5ncHVFbWl0dGVyICYmICEhZS5waHlzaWNzfSlcbnZhciBhdHRyYWN0b3JzICA9IGVudGl0aWVzLmZpbHRlcihmdW5jdGlvbiAoZSkgeyByZXR1cm4gISFlLmF0dHJhY3RpdmUgJiYgISFlLnBoeXNpY3N9KVxudmFyIGxpZ2h0cyAgICAgID0gZW50aXRpZXMuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiAhIWUubGlnaHQgJiYgISFlLnBoeXNpY3N9KVxudmFyIGNhbWVyYSAgICAgID0gbmV3IENhbWVyYShzaGVsbC5nbCwgMCwgMCwgMi41LCAwLCAwLCAwKVxuXG53aW5kb3cuZ2wgPSBzaGVsbC5nbFxuXG5zaGVsbC5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGdwdVBhcnRpY2xlU3lzdGVtLnJlbmRlcihjYW1lcmEsIGxpZ2h0cywgZ3B1RW1pdHRlcnMpXG59XG5cbnNoZWxsLnVwZGF0ZSA9IGZ1bmN0aW9uIChkVCkge1xuICBrZXlib2FyZE1hbmFnZXIudGljayhkVClcbiAgZ2FtZXBhZE1hbmFnZXIudGljayhkVClcblxuICBpZiAoZ2FtZXBhZE1hbmFnZXIucGFkU3RhdGVzWzBdLmp1c3REb3duc1swXSkgY29uc29sZS5sb2coXCJhIHdhcyBwdXNoZWRcIilcbiAgaWYgKGdhbWVwYWRNYW5hZ2VyLnBhZFN0YXRlc1swXS5pc0Rvd25zWzBdKSBjb25zb2xlLmxvZyhcImEgaXMgZG93blwiKVxuICBpZiAoZ2FtZXBhZE1hbmFnZXIucGFkU3RhdGVzWzBdLmp1c3RVcHNbMF0pIGNvbnNvbGUubG9nKFwiYSB3YXMgcmVsZWFzZWRcIilcbiAgZ3B1UGFydGljbGVTeXN0ZW0udXBkYXRlKGRULCBncHVFbWl0dGVycywgYXR0cmFjdG9ycylcbn1cbiIsInZhciBtYXQ0ID0gcmVxdWlyZShcImdsLW1hdDRcIilcblxubW9kdWxlLmV4cG9ydHMuY29tcHV0ZVRyYW5zZm9ybU1hdHJpeCAgICA9IGNvbXB1dGVUcmFuc2Zvcm1NYXRyaXhcbm1vZHVsZS5leHBvcnRzLmNvbXB1dGVUcmFuc2xhdGlvbk1hdHJpeCAgPSBjb21wdXRlVHJhbnNsYXRpb25NYXRyaXhcbm1vZHVsZS5leHBvcnRzLmNvbXB1dGVSb3RhdGlvbk1hdHJpeCAgICAgPSBjb21wdXRlUm90YXRpb25NYXRyaXhcbm1vZHVsZS5leHBvcnRzLmNvbXB1dGVTY2FsZU1hdHJpeCAgICAgICAgPSBjb21wdXRlU2NhbGVNYXRyaXhcbm1vZHVsZS5leHBvcnRzLmNvbXB1dGVNb2RlbE1hdHJpeCAgICAgICAgPSBjb21wdXRlTW9kZWxNYXRyaXhcblxuZnVuY3Rpb24gY29tcHV0ZVRyYW5zZm9ybU1hdHJpeCAob3V0LCBtb2RlbE1hdCwgdmlld01hdCwgcHJvak1hdCkge1xuICBtYXQ0LmlkZW50aXR5KG91dClcbiAgbWF0NC5tdWx0aXBseShvdXQsIHByb2pNYXQsIHZpZXdNYXQpXG4gIG1hdDQubXVsdGlwbHkob3V0LCBvdXQsIG1vZGVsTWF0KVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVUcmFuc2xhdGlvbk1hdHJpeCAodHJhbnNNYXQsIHBvc2l0aW9uKSB7XG4gIG1hdDQuaWRlbnRpdHkodHJhbnNNYXQpICBcbiAgcmV0dXJuIG1hdDQudHJhbnNsYXRlKHRyYW5zTWF0LCB0cmFuc01hdCwgcG9zaXRpb24pXG59XG5cblxuZnVuY3Rpb24gY29tcHV0ZVJvdGF0aW9uTWF0cml4IChyb3RNYXQsIHJvdGF0aW9uKSB7XG4gIG1hdDQuaWRlbnRpdHkocm90TWF0KVxuICBtYXQ0LnJvdGF0ZVgocm90TWF0LCByb3RNYXQsIHJvdGF0aW9uWzBdKVxuICBtYXQ0LnJvdGF0ZVkocm90TWF0LCByb3RNYXQsIHJvdGF0aW9uWzFdKVxuICBtYXQ0LnJvdGF0ZVoocm90TWF0LCByb3RNYXQsIHJvdGF0aW9uWzJdKVxuICByZXR1cm4gcm90TWF0XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVTY2FsZU1hdHJpeCAoc2NhbGVNYXQsIHNjYWxlKSB7XG4gIHNjYWxlTWF0WzBdICA9IHNjYWxlWzBdXG4gIHNjYWxlTWF0WzVdICA9IHNjYWxlWzFdXG4gIHNjYWxlTWF0WzEwXSA9IHNjYWxlWzJdXG4gIHJldHVybiBzY2FsZU1hdFxufVxuXG5mdW5jdGlvbiBjb21wdXRlTW9kZWxNYXRyaXggKG1vZGVsTWF0LCB0cmFuc01hdCwgc2NhbGVNYXQsIHJvdE1hdCkge1xuICBtYXQ0LmlkZW50aXR5KG1vZGVsTWF0KVxuICBtYXQ0Lm11bHRpcGx5KG1vZGVsTWF0LCB0cmFuc01hdCwgc2NhbGVNYXQpXG4gIHJldHVybiBtYXQ0Lm11bHRpcGx5KG1vZGVsTWF0LCBtb2RlbE1hdCwgcm90TWF0KVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdMU3RhdGVmdWxSZW5kZXJpbmdDb250ZXh0XG5cbmZ1bmN0aW9uIHByb3h5VmFsdWUgKG91dGVyLCBpbm5lciwgcHJvcE5hbWUpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG91dGVyLCBwcm9wTmFtZSwge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5uZXJbcHJvcE5hbWVdIH0gXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHByb3h5Rm4gKG91dGVyLCBpbm5lciwgcHJvcE5hbWUpIHtcbiAgb3V0ZXJbcHJvcE5hbWVdID0gZnVuY3Rpb24gKGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCwgYTksIGExMCkge1xuICAgIHJldHVybiBpbm5lcltwcm9wTmFtZV0oYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSwgYTEwKVxuICB9XG59XG5cbmZ1bmN0aW9uIFNoYWRlclN0YXRlICh0eXBlKSB7XG4gIHRoaXMudHlwZSAgICAgPSB0eXBlXG4gIHRoaXMuc3JjICAgICAgPSBcIlwiXG4gIHRoaXMuY29tcGlsZWQgPSBmYWxzZVxufVxuXG5mdW5jdGlvbiBQcm9ncmFtU3RhdGUgKCkge1xuICB0aGlzLmF0dGFjaGVkU2hhZGVycyA9IHtcbiAgICB2ZXJ0ZXg6ICAgbnVsbCxcbiAgICBmcmFnbWVudDogbnVsbFxuICB9XG4gIHRoaXMubGlua2VkICAgICAgICAgICAgICAgID0gZmFsc2VcbiAgdGhpcy52YWxpZGF0ZWQgICAgICAgICAgICAgPSBmYWxzZVxuICB0aGlzLmFjdGl2ZVVuaWZvcm1zQ291bnQgICA9IDBcbiAgdGhpcy5hY3RpdmVBdHRyaWJ1dGVzQ291bnQgPSAwXG4gIHRoaXMudW5pZm9ybXMgICAgICAgICAgICAgID0ge31cbiAgdGhpcy5hdHRyaWJ1dGVzICAgICAgICAgICAgPSB7fVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImF0dGFjaGVkU2hhZGVyQ291bnRcIiwge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICh0aGlzLmF0dGFjaGVkU2hhZGVycy52ZXJ0ZXggPyAxOiAwKSArIFxuICAgICAgICAgICAgICh0aGlzLmF0dGFjaGVkU2hhZGVycy5mcmFnbWVudCA/IDEgOiAwKVxuICAgIH1cbiAgfSlcbn1cblxuLy8gVE9ETzogaW1wbGVtZW50IHdoZW4gcmVhZHlcbmZ1bmN0aW9uIFJlbmRlckJ1ZmZlclN0YXRlICgpIHt9XG5cbmZ1bmN0aW9uIEdMU3RhdGVmdWxSZW5kZXJpbmdDb250ZXh0IChjdHgpIHtcbiAgdGhpcy5zaGFkZXJzICAgICAgID0gbmV3IFdlYWtNYXBcbiAgdGhpcy5wcm9ncmFtcyAgICAgID0gbmV3IFdlYWtNYXBcbiAgdGhpcy5hY3RpdmVQcm9ncmFtID0gbnVsbFxuICB0aGlzLmN0eCAgICAgICAgICAgPSBjdHhcblxuICAvLyBQUk9HUkFNU1xuICB0aGlzLmNyZWF0ZVByb2dyYW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByb2dyYW0gPSBjdHguY3JlYXRlUHJvZ3JhbSgpXG5cbiAgICB0aGlzLnByb2dyYW1zLnNldChwcm9ncmFtLCBuZXcgUHJvZ3JhbVN0YXRlKVxuICAgIHJldHVybiBwcm9ncmFtXG4gIH1cblxuICB0aGlzLmRlbGV0ZVByb2dyYW0gPSBmdW5jdGlvbiAocHJvZ3JhbSkge1xuICAgIGlmICh0aGlzLnByb2dyYW1zLmRlbGV0ZShwcm9ncmFtKSkgY3R4LmRlbGV0ZVByb2dyYW0ocHJvZ3JhbSlcbiAgfVxuXG4gIHRoaXMubGlua1Byb2dyYW0gPSBmdW5jdGlvbiAocHJvZ3JhbSkge1xuICAgIHZhciBwU3RhdGUgPSB0aGlzLnByb2dyYW1zLmdldChwcm9ncmFtKVxuICAgIHZhciBudW1Vbmlmb3Jtc1xuICAgIHZhciBudW1BdHRyaWJ1dGVzXG4gICAgdmFyIHVOYW1lXG4gICAgdmFyIGFOYW1lXG5cbiAgICBjdHgubGlua1Byb2dyYW0ocHJvZ3JhbSlcblxuICAgIG51bUF0dHJpYnV0ZXMgICAgICAgICAgICAgICAgPSBjdHguZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBjdHguQUNUSVZFX0FUVFJJQlVURVMpXG4gICAgbnVtVW5pZm9ybXMgICAgICAgICAgICAgICAgICA9IGN0eC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGN0eC5BQ1RJVkVfVU5JRk9STVMpXG4gICAgcFN0YXRlLmFjdGl2ZUF0dHJpYnV0ZXNDb3VudCA9IG51bUF0dHJpYnV0ZXNcbiAgICBwU3RhdGUuYWN0aXZlVW5pZm9ybXNDb3VudCAgID0gbnVtVW5pZm9ybXNcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtQXR0cmlidXRlczsgKytpKSB7XG4gICAgICBhTmFtZSAgICAgICAgICAgICAgICAgICAgPSBjdHguZ2V0QWN0aXZlQXR0cmliKHByb2dyYW0sIGkpLm5hbWVcbiAgICAgIHBTdGF0ZS5hdHRyaWJ1dGVzW2FOYW1lXSA9IGN0eC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBhTmFtZSlcbiAgICB9XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IG51bVVuaWZvcm1zOyArK2opIHtcbiAgICAgIHVOYW1lICAgICAgICAgICAgICAgICAgPSBjdHguZ2V0QWN0aXZlVW5pZm9ybShwcm9ncmFtLCBqKS5uYW1lXG4gICAgICBwU3RhdGUudW5pZm9ybXNbdU5hbWVdID0gY3R4LmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCB1TmFtZSlcbiAgICB9XG5cbiAgICBwU3RhdGUubGlua2VkID0gY3R4LmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgY3R4LkxJTktfU1RBVFVTKVxuICB9XG5cbiAgdGhpcy52YWxpZGF0ZVByb2dyYW0gPSBmdW5jdGlvbiAocHJvZ3JhbSkge1xuICAgIHZhciBwU3RhdGUgPSB0aGlzLnByb2dyYW1zLmdldChwcm9ncmFtKSBcblxuICAgIGlmICghcFN0YXRlLnZhbGlkYXRlZCkge1xuICAgICAgY3R4LnZhbGlkYXRlUHJvZ3JhbShwcm9ncmFtKSAgXG4gICAgICBwU3RhdGUudmFsaWRhdGVkID0gY3R4LmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgY3R4LlZBTElEQVRFX1NUQVRVUylcbiAgICB9XG4gIH1cblxuICB0aGlzLnVzZVByb2dyYW0gPSBmdW5jdGlvbiAocHJvZ3JhbSkge1xuICAgIGlmICh0aGlzLmFjdGl2ZVByb2dyYW0gIT09IHByb2dyYW0pIHtcbiAgICAgIGN0eC51c2VQcm9ncmFtKHByb2dyYW0pXG4gICAgICB0aGlzLmFjdGl2ZVByb2dyYW0gPSBwcm9ncmFtXG4gICAgfVxuICB9XG5cbiAgdGhpcy5hdHRhY2hTaGFkZXIgPSBmdW5jdGlvbiAocHJvZ3JhbSwgc2hhZGVyKSB7XG4gICAgdmFyIHBTdGF0ZSA9IHRoaXMucHJvZ3JhbXMuZ2V0KHByb2dyYW0pXG4gICAgdmFyIHNTdGF0ZSA9IHRoaXMuc2hhZGVycy5nZXQoc2hhZGVyKSAgXG5cbiAgICBpZiAgICAgIChzU3RhdGUudHlwZSA9PT0gY3R4LlZFUlRFWF9TSEFERVIgJiYgXG4gICAgICAgICAgICAgcFN0YXRlLmF0dGFjaGVkU2hhZGVycy52ZXJ0ZXggIT09IHNoYWRlcikge1xuICAgICAgY3R4LmF0dGFjaFNoYWRlcihwcm9ncmFtLCBzaGFkZXIpXG4gICAgICBwU3RhdGUuYXR0YWNoZWRTaGFkZXJzLnZlcnRleCA9IHNoYWRlclxuICAgIH1cbiAgICBlbHNlIGlmIChzU3RhdGUudHlwZSA9PT0gY3R4LkZSQUdNRU5UX1NIQURFUiAmJiBcbiAgICAgICAgICAgICBwU3RhdGUuYXR0YWNoZWRTaGFkZXJzLmZyYWdtZW50ICE9PSBzaGFkZXIpIHtcbiAgICAgIGN0eC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgc2hhZGVyKVxuICAgICAgcFN0YXRlLmF0dGFjaGVkU2hhZGVycy5mcmFnbWVudCA9IHNoYWRlclxuICAgIH1cbiAgfVxuXG4gIHRoaXMuZGV0YWNoU2hhZGVyID0gZnVuY3Rpb24gKHByb2dyYW0sIHNoYWRlcikge1xuICAgIHZhciBwU3RhdGUgICAgID0gdGhpcy5wcm9ncmFtcy5nZXQocHJvZ3JhbSlcbiAgICB2YXIgc1N0YXRlICAgICA9IHRoaXMuc2hhZGVycy5nZXQoc2hhZGVyKVxuICAgIHZhciBzaGFkZXJUeXBlID0gc1N0YXRlLnR5cGUgPT09IGN0eC5WRVJURVhfU0hBREVSID8gdmVydGV4IDogZnJhZ21lbnRcblxuICAgIGlmIChwU3RhdGUuYXR0YWNoZWRTaGFkZXJzW3NoYWRlclR5cGVdID09PSBzaGFkZXIpIHtcbiAgICAgIGN0eC5kZXRhY2hTaGFkZXIocHJvZ3JhbSwgc2hhZGVyKVxuICAgICAgcFN0YXRlLmF0dGFjaGVkU2hhZGVyc1tzaGFkZXJUeXBlXSA9IG51bGxcbiAgICB9XG4gIH1cbiAgXG4gIC8vIFBST0dSQU1TIC0tIEVORFxuICBcbiAgLy8gU0hBREVSU1xuICB0aGlzLmNyZWF0ZVNoYWRlciA9IGZ1bmN0aW9uIGNyZWF0ZVNoYWRlciAodHlwZSkge1xuICAgIHZhciBzaGFkZXIgPSBjdHguY3JlYXRlU2hhZGVyKHR5cGUpXG5cbiAgICB0aGlzLnNoYWRlcnMuc2V0KHNoYWRlciwgbmV3IFNoYWRlclN0YXRlKHR5cGUpKVxuICAgIHJldHVybiBzaGFkZXJcbiAgfVxuXG4gIHRoaXMuZGVsZXRlU2hhZGVyID0gZnVuY3Rpb24gKHNoYWRlcikge1xuICAgIGlmICh0aGlzLnNoYWRlcnMuZGVsZXRlKHNoYWRlcikpIGN0eC5kZWxldGVTaGFkZXIoc2hhZGVyKVxuICB9XG5cbiAgdGhpcy5jb21waWxlU2hhZGVyID0gZnVuY3Rpb24gY29tcGlsZVNoYWRlciAoc2hhZGVyKSB7XG4gICAgdmFyIHNTdGF0ZSAgID0gdGhpcy5zaGFkZXJzLmdldChzaGFkZXIpXG5cbiAgICBpZiAoIXNTdGF0ZS5jb21waWxlZCkge1xuICAgICAgY3R4LmNvbXBpbGVTaGFkZXIoc2hhZGVyKSBcbiAgICAgIHNTdGF0ZS5jb21waWxlZCA9IGN0eC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBjdHguQ09NUElMRV9TVEFUVVMpXG4gICAgfVxuICB9XG5cbiAgdGhpcy5zaGFkZXJTb3VyY2UgPSBmdW5jdGlvbiAoc2hhZGVyLCBzcmMpIHtcbiAgICB2YXIgc1N0YXRlID0gdGhpcy5zaGFkZXJzLmdldChzaGFkZXIpXG5cbiAgICBpZiAoc3JjICE9PSBzU3RhdGUuc3JjKSB7XG4gICAgICBjdHguc2hhZGVyU291cmNlKHNoYWRlciwgc3JjKSBcbiAgICAgIHNTdGF0ZS5zcmMgPSBzcmNcbiAgICB9XG4gIH1cblxuICAvL3Byb3h5IGFueXRoaW5nIE5PVCBkZWZpbmVkIGFib3ZlIHRocm91Z2ggdG8gdGhlIHVuZGVybHlpbmcgY29udGV4dC5cbiAgZm9yICh2YXIgcHJvcCBpbiBjdHgpIHtcbiAgICBpZiAoIXRoaXNbcHJvcF0pIHtcbiAgICAgIGlmIChjdHhbcHJvcF0gaW5zdGFuY2VvZiBGdW5jdGlvbikgcHJveHlGbih0aGlzLCBjdHgsIHByb3ApIFxuICAgICAgZWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm94eVZhbHVlKHRoaXMsIGN0eCwgcHJvcClcbiAgICB9XG4gIH1cbiAgLy8gU0hBREVSUyAtLSBFTkRcbn1cbiIsIm1vZHVsZS5leHBvcnRzLnJhbmRvbUJvdW5kICA9IHJhbmRvbUJvdW5kXG5tb2R1bGUuZXhwb3J0cy5yYW5kb21WZWN0b3IgPSByYW5kb21WZWN0b3JcblxuZnVuY3Rpb24gcmFuZG9tQm91bmQgKG1pbiwgbWF4KSB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSAoKSAqIChtYXggLSBtaW4pICsgbWluXG59XG5cbmZ1bmN0aW9uIHJhbmRvbVZlY3RvciAodmVjdG9yU2l6ZSwgbWluLCBtYXgpIHtcbiAgZm9yICh2YXIgdmVjID0gW10sIGkgPSAwOyBpIDwgdmVjdG9yU2l6ZTsgaSsrKSB2ZWMucHVzaChyYW5kb21Cb3VuZChtaW4sIG1heCkpXG5cbiAgcmV0dXJuIHZlY1xufVxuIiwidmFyIEdMU2hhZGVyID0gcmVxdWlyZShcIi4vR0xTaGFkZXJcIilcblxubW9kdWxlLmV4cG9ydHMgPSBHTFByb2dyYW1cblxuZnVuY3Rpb24gZWl0aGVySW5zdGFuY2VPZiAoY3RvciwgdjEsIHYyKSB7XG4gIHJldHVybiAoKHYxIGluc3RhbmNlb2YgY3RvcikgfHwgKHYyIGluc3RhbmNlb2YgY3RvcikpID8gdHJ1ZSA6IGZhbHNlXG59XG5cbmZ1bmN0aW9uIGNvbWJpbmVFcnJvcnMgKHYxLCB2Mikge1xuICByZXR1cm4gbmV3IEVycm9yKCh2MS5tZXNzYWdlIHx8IFwiXCIpICsgXCJcXG5cIiArICh2Mi5tZXNzYWdlIHx8IFwiXCIpKVxufVxuXG5mdW5jdGlvbiBHTFByb2dyYW0gKGdsLCB2cywgZnMpIHtcbiAgdmFyIHByb2dyYW0gICAgICAgPSBnbC5jcmVhdGVQcm9ncmFtKHZzLCBmcylcbiAgdmFyIGF0dHJpYnV0ZXMgICAgPSB7fVxuICB2YXIgdW5pZm9ybXMgICAgICA9IHt9XG4gIHZhciBudW1BdHRyaWJ1dGVzXG4gIHZhciBudW1Vbmlmb3Jtc1xuICB2YXIgYU5hbWVcbiAgdmFyIHVOYW1lXG5cbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZzKVxuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnMpXG4gIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pXG5cbiAgbnVtQXR0cmlidXRlcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX0FUVFJJQlVURVMpXG4gIG51bVVuaWZvcm1zICAgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkFDVElWRV9VTklGT1JNUylcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG51bUF0dHJpYnV0ZXM7ICsraSkge1xuICAgIGFOYW1lICAgICAgICAgICAgID0gZ2wuZ2V0QWN0aXZlQXR0cmliKHByb2dyYW0sIGkpLm5hbWVcbiAgICBhdHRyaWJ1dGVzW2FOYW1lXSA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sIGFOYW1lKVxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dHJpYnV0ZXNbYU5hbWVdKVxuICB9XG5cbiAgZm9yICh2YXIgaiA9IDA7IGogPCBudW1Vbmlmb3JtczsgKytqKSB7XG4gICAgdU5hbWUgICAgICAgICAgID0gZ2wuZ2V0QWN0aXZlVW5pZm9ybShwcm9ncmFtLCBqKS5uYW1lXG4gICAgdW5pZm9ybXNbdU5hbWVdID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sIHVOYW1lKVxuICB9XG5cbiAgdGhpcy5wcm9ncmFtICAgID0gcHJvZ3JhbVxuICB0aGlzLnVuaWZvcm1zICAgPSB1bmlmb3Jtc1xuICB0aGlzLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzXG59XG5cbi8vR0xDb250ZXh0IC0+IFN0cmluZyAtPiBTdHJpbmcgLT4gRWl0aGVyIEVycm9yIHwgR0xQcm9ncmFtXG5HTFByb2dyYW0uZnJvbVNvdXJjZSA9IGZ1bmN0aW9uIChnbCwgdlNyYywgZlNyYykge1xuICB2YXIgdlNoYWRlciA9IG5ldyBHTFNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgdlNyYylcbiAgdmFyIGZTaGFkZXIgPSBuZXcgR0xTaGFkZXIoZ2wsIGdsLkZSQUdNRU5UX1NIQURFUiwgZlNyYylcblxuICByZXR1cm4gKGVpdGhlckluc3RhbmNlT2YoRXJyb3IsIHZTaGFkZXIsIGZTaGFkZXIpKVxuICAgID8gY29tYmluZUVycm9ycyh2U2hhZGVyLCBmU2hhZGVyKVxuICAgIDogbmV3IEdMUHJvZ3JhbShnbCwgdlNoYWRlciwgZlNoYWRlcilcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gR0xSZW5kZXJUYXJnZXRcblxuZnVuY3Rpb24gR0xSZW5kZXJUYXJnZXQgKGdsLCB3aWR0aCwgaGVpZ2h0LCBkYXRhKSB7XG4gIHZhciB0ZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpXG4gIHZhciBoYW5kbGUgID0gZ2wuY3JlYXRlRnJhbWVidWZmZXIoKVxuXG4gIC8vY29uZmlndXJlIHRoZSB0ZXh0dXJlIGFuZCB1cGxvYWQgdGhlIGRhdGFcbiAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSlcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSlcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSlcbiAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpXG4gIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKVxuICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIHdpZHRoLCBoZWlnaHQsIDAsIGdsLlJHQkEsIGdsLkZMT0FULCBkYXRhKVxuICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKVxuXG4gIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgaGFuZGxlKVxuICBnbC5mcmFtZWJ1ZmZlclRleHR1cmUyRChnbC5GUkFNRUJVRkZFUiwgZ2wuQ09MT1JfQVRUQUNITUVOVDAsIGdsLlRFWFRVUkVfMkQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUsIDApXG4gIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbClcblxuICB0aGlzLmhhbmRsZSAgPSBoYW5kbGVcbiAgdGhpcy53aWR0aCAgID0gd2lkdGhcbiAgdGhpcy5oZWlnaHQgID0gaGVpZ2h0XG4gIHRoaXMudGV4dHVyZSA9IHRleHR1cmVcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gR0xTaGFkZXJcblxuLy9HTENvbnRleHQgLT4gRW51bSAtPiBTdHJpbmcgLT4gRWl0aGVyIEdMU2hhZGVyIHwgRXJyb3JcbmZ1bmN0aW9uIEdMU2hhZGVyIChnbCwgdHlwZSwgc3JjKSB7XG4gIHZhciBzaGFkZXIgID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpXG5cbiAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc3JjKVxuICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcilcbiAgcmV0dXJuIGdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKVxuICAgID8gc2hhZGVyXG4gICAgOiBuZXcgRXJyb3IoZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKVxufVxuIl19
>>>>>>> 754f98fb0f252a4b8de0554bd62172c6a01fcc6f
