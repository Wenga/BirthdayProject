TextDisplay3D = function() {

	var scope = this;

    this.fontLoader = null;
    this.font = null;
    this.fontGeometry = null; 
    this.sceneGroup = null;
    this.displayText = "";
    this.textMesh = null;
    this.needUpdate = false;
    this.materials = [
        new THREE.MeshStandardMaterial( { color: 0xffffff, flatShading: true, metalness:1, roughness:0} ), // front
        new THREE.MeshStandardMaterial( { color: 0xffffff, metalness:1, roughness:0} ) // side
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

    this.refreshText = function() 
    {
        if (!this.needUpdate)
            return;
        if ( ! this.displayText )
            return;

        this.needUpdate = false;
        this.sceneGroup.remove( this.textMesh );
        this.createText();
    }

    this.createText = function() 
    {
        this.fontGeometry = new THREE.TextGeometry( this.displayText, {
            font: this.font,
            size: 16,
            height: 2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize:0.5,
            bevelOffset: 0,
            bevelSegments: 1
        } );

        this.fontGeometry.computeBoundingBox();
        const centerOffset = - 0.5 * ( this.fontGeometry.boundingBox.max.x - this.fontGeometry.boundingBox.min.x );

        this.textMesh = new THREE.Mesh( this.fontGeometry, this.materials );

        this.textMesh.position.x = centerOffset;
        this.textMesh.position.y = 30;
        this.textMesh.position.z = 0;

        this.textMesh.rotation.x = 0;
        this.textMesh.rotation.y = Math.PI * 2;

        this.sceneGroup.add( this.textMesh );
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
};