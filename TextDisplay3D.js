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
        new THREE.MeshStandardMaterial( { color: 0xffffff, flatShading: true, metalness:1, roughness:0.5} ),  // side
    ];

  this.init = function(scene) {

        if (!this.fontLoader)
            this.fontLoader = new THREE.FontLoader();

        this.fontLoader.load( './Fonts/gentilis_regular.typeface.json', function ( font ) {
            scope.font = font;
            scope.needUpdate = true;
        } );

        this.sceneGroup = new THREE.Group();
        this.sceneGroup.position.z = -200;
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
        for (var i = this.sceneGroup.length - 1; i >= 0; i--) {
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

        console.log(fontGeometry);
        const processedGeo = separateGroups(fontGeometry);
        for(var i = 0; i < processedGeo.length; ++i)
        {
            processedGeo[i].computeBoundingBox();
            this.textMeshes.push(new THREE.Mesh( processedGeo[i], this.materials[0]));
            this.sceneGroup.add(this.textMeshes[i]);
            this.textMeshes[i].position.x = 0
            this.textMeshes[i].position.y = 0;
            this.textMeshes[i].position.z = 0;
    
            this.textMeshes[i].rotation.x = 0;
            this.textMeshes[i].rotation.y = Math.PI * 2;
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
        const glyphCount = this.textMeshes.length / 2;
        for(var i = 0; i < glyphCount ; ++i)
        {
            const rx = Math.random() * 0.02;
            const ry = Math.random() * 0.02;
            this.textMeshes[i].rotation.x += rx;
            this.textMeshes[i].rotation.y += ry;
            this.textMeshes[i + glyphCount].rotation.x += rx;
            this.textMeshes[i + glyphCount].rotation.y += ry;
        }
    }
};