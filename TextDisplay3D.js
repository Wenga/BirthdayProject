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
        new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true, reflectivity:1 } ), // front
        new THREE.MeshPhongMaterial( { color: 0xffffff, reflectivity:1 } ) // side
    ];

	this.init = function(scene) {

        if (!this.fontLoader)
            this.fontLoader = new THREE.FontLoader();

        this.fontLoader.load( 'optimer_bold.typeface.json', function ( font ) {
            scope.font = font;
            scope.needUpdate = true;
        } );

        this.sceneGroup = new THREE.Group();
        this.sceneGroup.position.z = -100;
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
            bevelEnabled: falses,
            bevelThickness: 1,
            bevelSize:0,
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
        this.materials = [
            new THREE.MeshStandardMaterial( {
                metalness: 1,
                roughness: 0,
                envMapIntensity: 1.2,
                envMap:sky,
                flatShading: true
            } ),
            new THREE.MeshStandardMaterial( {
                metalness: 1,
                roughness: 0,
                envMapIntensity: 1.2,
                envMap:sky
            } ),
        ];
        this.needUpdate = true;
    }
};