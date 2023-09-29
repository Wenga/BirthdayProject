function separateGroups( bufGeom ) {

  var outGeometries = [];

  var groups = bufGeom.groups;

  var origVerts = bufGeom.getAttribute( 'position' ).array;
  var origNormals = bufGeom.getAttribute( 'normal' ).array;
  var origNormals = bufGeom.getAttribute( 'uv' ).array;
  var origNumVerts = Math.floor( origVerts.length / 3 );

  for ( var ig = 0, ng = groups.length; ig < ng; ig ++ ) {

    var group = groups[ ig ];

    var destNumVerts = group.count;

    var newBufGeom = new THREE.BufferGeometry();
    var newPositions = new Float32Array( destNumVerts * 3 );
    var newNormals = new Float32Array( destNumVerts * 3 );
        var newUVs = new Float32Array( destNumVerts * 3 );

    for ( var iv = 0; iv < destNumVerts; iv ++ ) {

      var indexOrig = 3 * ( group.start + iv );
      var indexDest = 3 * iv;

      newPositions[ indexDest ] = origVerts[ indexOrig ];
      newPositions[ indexDest + 1 ] = origVerts[ indexOrig + 1 ];
      newPositions[ indexDest + 2 ] = origVerts[ indexOrig + 2 ];

      newNormals[ indexDest ] = origNormals[ indexOrig ];
      newNormals[ indexDest + 1 ] = origNormals[ indexOrig + 1 ];
      newNormals[ indexDest + 2 ] = origNormals[ indexOrig + 2 ];

      newUVs[ indexDest ] = origNormals[ indexOrig ];
      newUVs[ indexDest + 1 ] = origNormals[ indexOrig + 1 ];
      newUVs[ indexDest + 2 ] = origNormals[ indexOrig + 2 ];

    }

    newBufGeom.setAttribute( 'position', new THREE.Float32BufferAttribute( newPositions, 3 ) );
    newBufGeom.setAttribute( 'normal', new THREE.Float32BufferAttribute( newNormals, 3 ) );
        newBufGeom.setAttribute( 'uv', new THREE.Float32BufferAttribute( newUVs, 3 ) );
    outGeometries.push( newBufGeom );

  }

  return outGeometries;

}

var logged = false;

function fx(center,group, x, y, z)
{
    // const aabb = new THREE.Box3();
    // aabb.setFromObject(group);
    // var center = new THREE.Vector3();
    // aabb.getCenter(center);
    for (var i = 0; i < group.children.length; ++i)
    {
        group.children[i].translateX(-center.x);
        group.children[i].translateY(-center.y);
        group.children[i].translateZ(-center.z - 200); 
    }   
    const re = new THREE.Euler(x, y, z, 'XYZ' );
    var quat = new THREE.Quaternion().setFromEuler(re);
    group.applyQuaternion(quat);
 
    for (var i = 0; i < group.children.length; ++i)
    {
        group.children[i].translateX(center.x);
        group.children[i].translateY(center.y);
        group.children[i].translateZ(center.z + 200); 
    } 
}

// in case we choose to use custom shaders in the end
const vertexShader = /*glsl*/`
uniform float randFactor;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = /*glsl*/`
void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`;

TextDisplay3D = function() {

  var scope = this;

    this.fontLoader = null;
    this.font = null;
    this.sceneGroup = null;
    this.displayText = "";
    this.textMeshes = [];
    this.needUpdate = false;
    this.materials = [
        new THREE.ShaderMaterial({
            fragmentShader: fragmentShader,
            vertexShader: vertexShader
          }),
        //new THREE.MeshStandardMaterial( { color: 0xffffff, flatShading: true, metalness:1, roughness:0} ), // front
        new THREE.MeshStandardMaterial( { color: 0xffffff, flatShading: true, metalness:1, roughness:0} ),  // side
    ];

  this.init = function(scene) {

        if (!this.fontLoader)
            this.fontLoader = new THREE.FontLoader();

        this.fontLoader.load( './Fonts/gentilis_regular.typeface.json', function ( font ) {
            scope.font = font;
            scope.needUpdate = true;
        } );

        this.sceneGroup = new THREE.Group();
        scene.add( this.sceneGroup );
  };

    this.refreshText = function(t) 
    {
        if (!this.needUpdate)
        {
            this.animateGeo(t);
            return;
        }
        if (!this.displayText)
            return;

        this.needUpdate = false;
        for (var i = this.sceneGroup.children.length - 1; i >= 0; i--) {
            this.sceneGroup.remove(this.sceneGroup.children[i]);
        }
        this.createText();
    }

    this.createText = function() 
    {
        const fontGeometry = new THREE.TextGeometry( this.displayText, {
            font: this.font,
            size: 16,
            height: 2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.5,
            bevelSize:0.2,
            bevelOffset: 0,
            bevelSegments: 1
        } );

        fontGeometry.computeBoundingBox();
        const centerOffset = - 0.5 * ( fontGeometry.boundingBox.max.x - fontGeometry.boundingBox.min.x );

        const processedGeo = separateGroups(fontGeometry);
        this.textMeshes = [];
        const glyphCount = processedGeo.length / 2;
        for(var i = 0; i < glyphCount; ++i)
        {
            var glyphFace = processedGeo[2 * i];
            var bevelEdge = processedGeo[2 * i + 1];
            glyphFace.computeBoundingBox();
            bevelEdge.computeBoundingBox();
            var glyphGroup = new THREE.Group();
            glyphGroup.add(new THREE.Mesh(glyphFace, this.materials[1]));
            glyphGroup.add(new THREE.Mesh(bevelEdge, this.materials[1]));
            glyphGroup.position.z = -200;
            const aabb = new THREE.Box3();
            aabb.setFromObject(glyphGroup);
            var center = new THREE.Vector3();
            aabb.getCenter(center);
            this.textMeshes.push({group : glyphGroup, pos : center});
            this.sceneGroup.add(glyphGroup);
            glyphGroup.rotation.y = Math.PI * 2;
        }
    }

    this.updateText = function(text)
    {
        this.displayText = text;
        if (this.font)
            this.needUpdate = true;
    }

    this.updateEnvironmentMap = function(sky)
    {
        // automatic updated with standard material.
        // override if choose to use cube texture
    }

    this.animateGeo = function(elapsedTime)
    {

        const glyphCount = this.textMeshes.length;
        for(var i = 0; i < glyphCount ; ++i)
        {
            const rx = Math.PI * 0.005;
            const ry = Math.PI * 0.003;
            //fx(this.textMeshes[i].pos, this.textMeshes[i].group, rx, ry, 0);
            this.textMeshes[i].group.translateY(0.1 * Math.sin(elapsedTime + i));
        }
    }
};