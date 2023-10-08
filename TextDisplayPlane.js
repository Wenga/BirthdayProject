function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
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
    return lines;
}

TextDisplayPlane = function() { 
    var scope = this;
    this.textMesh = null;
    this.displayText = "";
    this.textCanvas = null;
    this.needUpdate = false;
    this._tLastUpdate = 0; // use to lock frame rate when using motion mode.
    this.mat = null;
  
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
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#f000000";
        
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
            this.textMesh.position.set(0, 0, 100);
            this.textMesh.rotation.y = Math.PI;
        }
      
        this.sceneGroup.add(this.textMesh);
    }
  
    this.updateText = function(text)
    {
    }
  
  };