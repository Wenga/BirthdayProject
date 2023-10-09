function getLines(ctx, text, maxWidth) {
    var indentedLines = text.split('\n');
    var lines = [];
    for (var j = 0; j < indentedLines.length; j++)
    {
        var words = indentedLines[j].split(" ");
        var currentLine = words[0];
    
        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var width = ctx.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
    }
    return lines;
}

TextDisplayPlane = function() { 
    var scope = this;
    this.textMesh = null;
    this.displayText = "";
    this.textCanvas = null;
    this.needUpdate = false;
    this._tLastNFocus = 0; // use to lock frame rate when using motion mode.
    this.mat = null;
    this.hintMat = null;
    this.hintCube = null;
    this.geoCenter = new THREE.Vector3(0, 0, 100);
  
    this.init = function(scene) {
          this.sceneGroup = new THREE.Group();
          scene.add( this.sceneGroup );
    };
    
    this.showText = function(text)
    {
        if (!this.textCanvas)
        {
            this.textCanvas = document.createElement('canvas');
            this.textCanvas.width = 800;
            this.textCanvas.height = 600;
        }
        var ctx = this.textCanvas.getContext('2d');

        ctx.clearRect(0,0,this.textCanvas.width,this.textCanvas.height); 

        ctx.font = "Normal 24px Arial";
        var lines = getLines(ctx, text, 780);
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(255,255,255,1)";

        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#000000";
        
        for (let j = 0; j < lines.length; ++j)
        {
            ctx.fillText(lines[j], 400, 28 * j + 20); 
        }       

        ctx.restore();
      
        // canvas contents will be used for a texture
        var fontPlaneTexture = new THREE.Texture(this.textCanvas)
        fontPlaneTexture.needsUpdate = true;
      
        if (!this.mat)
        {
            this.mat = new THREE.MeshBasicMaterial({
                map: fontPlaneTexture,
                side: THREE.DoubleSide
            });
            this.mat.transparent = true;
        }
        else
        {
            this.mat.map = fontPlaneTexture;
            this.mat.needsUpdate = true;
        }
      
        if (!this.textMesh)
        {
            this.textMesh =  new THREE.Mesh(
                new THREE.PlaneGeometry(160, 120),
                this.mat
            );
            this.textMesh.position.set(0, -80, 0);
            this.textMesh.rotation.y = Math.PI;
            this.sceneGroup.add(this.textMesh);

            const hintGeo = new THREE.BoxGeometry( 4, 4, 4 ); 
            this.hintMat = new THREE.MeshStandardMaterial({color: 0xffffff, flatShading: true, metalness:0.9, emissive: 0x000000} ); 
            this.hintCube = new THREE.Mesh( hintGeo, this.hintMat ); 
            this.sceneGroup.add( this.hintCube );
        }
        this.sceneGroup.position.set(0, 80, 100);
        this.geoCenter = this.sceneGroup.position.clone();
        this.geoCenter.add(this.textMesh.position);
        this.geoCenter.normalize().negate();
    }

    this.updateEnvironmentMap = function(texture)
    {
        this.hintMat.needsUpdate = true;
    }
    
    this.updateGeo = function(et, camera)
    {
        const lookAt = new THREE.Vector3(0, 0, -1);
        camera.getWorldDirection(lookAt);
        const delta = (lookAt.dot(this.geoCenter) + 1);
        const stareTime = 0.5;
        const expandTime = 0.5;
        this.hintCube.rotation.x = et;
        this.hintCube.rotation.y = et;
        if (delta > 0.1)
        {
            this._tLastNFocus = et;
            // close
            if (this.mat.opacity != 0.)
            {
                this.mat.opacity = 0.;
                this.mat.needsUpdate = true;
            }
            const ec = this.hintMat.emissive;
            if (ec.r != 0 || ec.g != 0 || ec.b != 0)
            {
                this.hintMat.emissive = new THREE.Color(0, 0, 0);
                this.hintMat.needsUpdate = true;
            }
        }
        else if(et - this._tLastNFocus < stareTime)
        {
            const p = (et - this._tLastNFocus)/stareTime;
            this.hintMat.emissive = new THREE.Color(p, p, p);
            this.hintMat.needsUpdate = true;
        }
        else if(et - this._tLastNFocus < stareTime + expandTime)
        {
            // staring
            const p = (et - this._tLastNFocus - stareTime)/expandTime;

            this.mat.opacity = p;
            this.mat.needsUpdate = true;
        }
        else
        {
            if (this.mat.opacity != 1.)
            {
                this.mat.opacity = 1.;
                this.mat.needsUpdate = true;
            }
            // reading
        }
    }
  
  };