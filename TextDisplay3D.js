function separateGroups( bufGeom ) {

  var outGeometries = [];

  var groups = bufGeom.groups;

  var origVerts = bufGeom.getAttribute( 'position' ).array;
  var origNormals = bufGeom.getAttribute( 'normal' ).array;
  var origNormals = bufGeom.getAttribute( 'uv' ).array;
  var origNumVerts = Math.floor( origVerts.length / 3 );
  const glyphCount = groups.length / 2;

  for ( var ig = 0, ng = glyphCount; ig < ng; ig ++ ) 
  {
    var newBufGeom = new THREE.BufferGeometry();
    var destNumVerts = groups[2 * ig].count + groups[2 * ig + 1].count;
    var newPositions = new Float32Array( destNumVerts * 3 );
    var newNormals = new Float32Array( destNumVerts * 3 );
    var newUVs = new Float32Array( destNumVerts * 3 );
    var previousIdx = 0;
    for (var subMesh = 0; subMesh < 2; subMesh++)
    {    
        var group = groups[2 *  ig  + subMesh];
        destNumVerts = group.count;
        for ( var iv = 0; iv < destNumVerts; iv ++ ) {

            var indexOrig = 3 * ( group.start + iv );
            var indexDest = 3 * iv + previousIdx;
    
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
        previousIdx = group.count * 3;
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

const ANIM_DELTA = 1. / 60;

TextDisplay3D = function() {

  var scope = this;

    this.fontLoader = null;
    this.font = null;
    this.sceneGroup = null;
    this.displayText = "";
    this.textMeshes = [];
    this.needUpdate = false;
    this.isUpdating = false; // font geometry is being updated.
    this._tLastUpdate = 0; // use to lock frame rate when using motion mode.
    this.materials = [
        new THREE.ShaderMaterial({
            fragmentShader: fragmentShader,
            vertexShader: vertexShader
          }),
        new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true, reflectivity:1, fog:false, emissive: 0x000000 }), // front
        new THREE.MeshStandardMaterial( { color: 0xffffff, flatShading: true, metalness:0.8, roughness:0} ),  // side
    ];
    this.geoCenter = new THREE.Vector3(0, 0, -200).normalize()
    this.zOffset = -300.;

  this.init = function(scene) {
        scene.add(new THREE.AmbientLight(0xffffff));

        if (!this.fontLoader)
            this.fontLoader = new THREE.FontLoader();

        this.fontLoader.load( './Fonts/gentilis_regular.typeface.json', function ( font ) {
            scope.font = font;
            scope.needUpdate = true;
        } );

        this.sceneGroup = new THREE.Group();
        scene.add( this.sceneGroup );
  };

    this.refreshText = function(t, camera) 
    {
        if (!this.needUpdate && !this.isUpdating)
        {
            this.animateGeo(t, camera);
            return;
        }
        if (!this.displayText)
            return;

        if (this.isUpdating)
            return;

        this.needUpdate = false;
        this.isUpdating = true;
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

        this.sceneGroup.position.set(0,0,0);
        const processedGeo = separateGroups(fontGeometry);
        this.textMeshes = [];
        const glyphCount = processedGeo.length;
        for(var i = 0; i < glyphCount; ++i)
        {
            var glyph = processedGeo[i];
            glyph.computeBoundingBox();
            var center = new THREE.Vector3();
            glyph.boundingBox.getCenter(center);
            glyph.center();
            var glyphGroup = new THREE.Group();
            var mesh = new THREE.Mesh(glyph, this.materials[1]);
            glyphGroup.add(mesh);

            glyphGroup.position.set(center.x, center.y, center.z);
            //glyphGroup.position.z += this.zOffset;
            glyphGroup.rotation.y = 0.;
            this.textMeshes.push({group : glyphGroup, posWorld : center});   
            this.sceneGroup.add(glyphGroup);
        }
        const aabb = new THREE.Box3();
        aabb.setFromObject(this.sceneGroup);
        aabb.getCenter(this.geoCenter);
        this.sceneGroup.position.x = -this.geoCenter.x;
        this.sceneGroup.position.z = this.zOffset;
        this.geoCenter.x = 0;
        this.geoCenter.z = this.zOffset;
        this.geoCenter.normalize().negate();
        this.isUpdating = false;
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
        this.materials[1].envMap = sky;
        this.materials[1].needsUpdate = true;
    }

    this.animateGeo = function(elapsedTime, camera)
    {
        if (elapsedTime - this._tLastUpdate < ANIM_DELTA)
        {
            return;
        }
        this._tLastUpdate = elapsedTime;
        const lookAt = new THREE.Vector3(0, 0, -1);
        camera.getWorldDirection(lookAt);
        const delta = (lookAt.dot(this.geoCenter) + 1);
        const sqrtDelta = Math.sqrt(delta);
        const glyphCount = this.textMeshes.length;
        const csa = delta < 0.1 ? sqrtDelta * 3.162 : 1;
        for(var i = 0; i < glyphCount ; ++i)
        {
            const rx = 0.25 * (elapsedTime + i);
            const ry = 0.67 * (elapsedTime + 0.192873 * i);
            const rz = 0.48 * (elapsedTime + 0.23864 * i);
            const glyphGroup = this.textMeshes[i].group;
            const dx = sqrtDelta * 56. * Math.sin(elapsedTime + i);
            const dy = sqrtDelta * 60. * Math.sin(0.8236 * (elapsedTime + i));
            const dz = sqrtDelta * 47. * Math.sin(0.4756 * (elapsedTime + 0.758 * i));         
            glyphGroup.rotation.x = delta * rx;
            glyphGroup.rotation.y = delta * ry;
            glyphGroup.rotation.z = delta * rz;
            glyphGroup.position.x = this.textMeshes[i].posWorld.x + dx;
            glyphGroup.position.y = this.textMeshes[i].posWorld.y + dy;
            glyphGroup.position.z = this.textMeshes[i].posWorld.z + dz;
            this.materials[1].emissive = new THREE.Color(1 - csa, 1 - csa, 1 - csa);
            this.materials[1].reflectivity = csa;
            this.materials[1].needsUpdate = true;
        }
    }

};