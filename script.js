

// Get a reference to the canvas element
const canvas = document.getElementById('myCanvas');

// Create a Three.js renderer and set it to use the canvas element
const renderer = new THREE.WebGLRenderer({ canvas });

// Set the size of the renderer
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 0.1; // Set the camera position

// Create a cube geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Load the textures for each face
const textureLoader = new THREE.TextureLoader();
const materialArray = [
  new THREE.MeshBasicMaterial({ map: textureLoader.load('corgi.jpg'), side: THREE.BackSide }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load('corgi.jpg'), side: THREE.BackSide }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load('corgi.jpg'), side: THREE.BackSide }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load('corgi.jpg'), side: THREE.BackSide }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load('corgi.jpg'), side: THREE.BackSide }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load('corgi.jpg'), side: THREE.BackSide })
];

// Create the skybox material
const skyboxMaterial = new THREE.MeshFaceMaterial(materialArray);

// Create the skybox mesh
const skybox = new THREE.Mesh(geometry, skyboxMaterial);

// Add the skybox to the scene
scene.add(skybox);

// Rotate the camera around its position
const rotationSpeed = 0.01;
function animate() {
    requestAnimationFrame(animate);

    // Rotate the camera
    camera.rotation.y += rotationSpeed;
    camera.rotation.z += rotationSpeed;

    renderer.render(scene, camera);
}
animate();

//Handle Resizing
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
  
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize(newWidth, newHeight);
  });

