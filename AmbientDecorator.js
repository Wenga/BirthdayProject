function sphereSampleRandom(radius)
{
    const u = Math.random();
    const v = Math.random();  
    const phi = 2 * Math.PI * u;
    const theta = Math.acos(2 * v - 1);
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(theta);

    return new THREE.Vector3(x, y, z);
}

const vsParticle = /*glsl*/`
attribute float scale;
void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = scale * ( 300.0 / - mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
}
`;

const fsPaticle = /*glsl*/`
uniform vec3 color;
void main() {
    if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
    gl_FragColor = vec4( color, 1.0 );
}
`;

AmbientDecorator = function() {
    var scope = this;
    this._particles = null;
    this._vectors = []

    this.init = function(scene) 
    {
        const particleMaterial = new THREE.PointsMaterial( { size: 0.8, color: 0xffffff, blending: THREE.AdditiveBlending, transparent: true, vertexColors:true, opacity:0.5 } );
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 300;
        const positions = [];//new Float32Array(particlesCount * 3);
        const colors = [];//new Float32Array(particlesCount * 3);
        const sizes = [];//new Float32Array(particlesCount);

        for (let i = 0; i < particlesCount; i++) {
            const r = Math.random() * 50. + 100;
            const vertex = sphereSampleRandom(r);
            vertex.delay = Date.now() + (0.1236 * i);
            vertex.rotationAxis = new THREE.Vector3(0, Math.random() * 2 - 1, Math.random() * 2 - 1)
            vertex.rotationAxis.normalize()
            vertex.rotationSpeed = Math.random() * 0.01
            this._vectors.push(vertex)
        
            positions.push(vertex.x, vertex.y, vertex.z)
            sizes.push(Math.random() * 0.1);
            colors.push(Math.random(), Math.random(), Math.random());
        }

        particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
        particlesGeometry.setAttribute('scale', new THREE.Float32BufferAttribute(sizes, 1))

        // const customMatParticle = new THREE.ShaderMaterial( {

        //     uniforms: {
        //         color: { value: new THREE.Color( 0xffffff ) },
        //     },
        //     vertexShader: vsParticle,
        //     fragmentShader: fsPaticle       
        // } );

        const particlesMesh = new THREE.Points(particlesGeometry, particleMaterial);
        particlesMesh.counter = 0;
        scene.add(particlesMesh);
        this._particles = particlesMesh;
    };

    this.updateAnimation = function()
    {
        var ps = this._particles.geometry.getAttribute( 'position' ).array;
        for (let i = 0; i < this._vectors.length; i++) {
            const vector = this._vectors[i];
            vector.applyAxisAngle(vector.rotationAxis, vector.rotationSpeed);
      
            ps[i * 3] = vector.x
            ps[i * 3 + 1] = vector.y
            ps[i * 3 + 2] = vector.z
          }
      
          this._particles.geometry.setAttribute('position', new THREE.Float32BufferAttribute(ps, 3))
    };

};