let camera, scene, renderer;
let deviceOrientationControl;
let textDisplay3D;
const clock = new THREE.Clock();

let isUserInteracting = false,
  onPointerDownMouseX = 0, onPointerDownMouseY = 0,
  lon = 0, onPointerDownLon = 0,
  lat = 0, onPointerDownLat = 0,
  phi = 0, theta = 0;

// debounce texture loading in case people spam buttons
var previousSkyIndex = skyIndex;
const THRESHOLD_LOAD = 1
var thresholdChecker = 0

let storedOrientation  = {
  initialzed : false, 
};


init();
animate();

function init() {

  const container = document.getElementById( 'container' );

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

  scene = new THREE.Scene();

  textDisplay3D = new TextDisplay3D();
  textDisplay3D.init(scene);
  textDisplay3D.updateText("Test");

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  reloadScene();

  container.appendChild( renderer.domElement );

  container.style.touchAction = 'none';
  container.addEventListener( 'pointerdown', onPointerDown );

  document.addEventListener( 'wheel', onDocumentMouseWheel );

  document.addEventListener( 'dragover', function ( event ) {

    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';

  } );

  document.addEventListener( 'dragenter', function () {

    document.body.style.opacity = 0.5;

  } );

  document.addEventListener( 'dragleave', function () {

    document.body.style.opacity = 1;

  } );

  window.addEventListener( 'resize', onWindowResize );

  const toggleMotion = document.getElementById("toggle-motion");
  toggleMotion.addEventListener('click', promptGrant);
  toggleMotion.addEventListener('change', function(){
    if(this.checked)
      motionOn();
    else
      motionOff();
  });

} // init

function loadTexture(texturePath)
{
  new THREE.TextureLoader().load(texturePath, function ( texture ) {

    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.SRGBColorSpace;

    const pmremGenerator = new THREE.PMREMGenerator( renderer );
    pmremGenerator.compileEquirectangularShader();
    const pngCubeRenderTarget = pmremGenerator.fromEquirectangular( texture );
    scene.background = texture;
    scene.environment = pngCubeRenderTarget.texture;
    scene.backgroundIntensity = 0;
    textDisplay3D.updateEnvironmentMap(pngCubeRenderTarget.texture);
  } );
}

function onWindowResize() 
{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onPointerDown( event ) 
{

  if ( event.isPrimary === false ) return;

  isUserInteracting = true;

  onPointerDownMouseX = event.clientX;
  onPointerDownMouseY = event.clientY;

  onPointerDownLon = lon;
  onPointerDownLat = lat;

  document.addEventListener( 'pointermove', onPointerMove );
  document.addEventListener( 'pointerup', onPointerUp );

}

function onPointerMove( event ) 
{

  if ( event.isPrimary === false ) return;

  lon = ( onPointerDownMouseX - event.clientX ) * 0.1 + onPointerDownLon;
  lat = ( event.clientY - onPointerDownMouseY ) * 0.1 + onPointerDownLat;

}

function onPointerUp( event ) 
{
  if ( event.isPrimary === false ) return;

  isUserInteracting = false;

  document.removeEventListener( 'pointermove', onPointerMove );
  document.removeEventListener( 'pointerup', onPointerUp );
}

function onDocumentMouseWheel( event ) 
{
  const fov = camera.fov + event.deltaY * 0.05;
  camera.fov = THREE.MathUtils.clamp( fov, 10, 75 );
  camera.updateProjectionMatrix();
}

function promptGrant()
{
  if (storedOrientation.initialzed)
    return;

  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    // Handle iOS 13+ devices.
    DeviceOrientationEvent.requestPermission()
      .then((state) => {
        console.log(state)
        if (state === 'granted') {
          deviceOrientationControl = new DeviceOrientationControls(camera);
          storedOrientation.initialzed = true;
          motionOn();
        } else {
          console.error('Request to access the orientation was rejected');
        }
      })
      .catch(console.error);
  } else {
    // Handle regular non iOS 13+ devices.
    deviceOrientationControl = new DeviceOrientationControls(camera);
    storedOrientation.initialzed = true;
    motionOn();
  }
}

function motionOn()
{
  if (storedOrientation.initialzed)
  {
    deviceOrientationControl.connect();
    return;
  }
}

function motionOff()
{
  deviceOrientationControl.disconnect();
}

// there is an update on selected skyIndex, reset all the things needed.
function reloadScene()
{
  const sceneDetail = SceneSetUp.getInstance().getSceneDetails(skyIndex);
  textDisplay3D.updateText(sceneDetail.TextContent);
  loadTexture(sceneDetail.SkyPath);
}

function checkSkyUpdate(deltaTime)
{
  thresholdChecker += deltaTime;
  if (thresholdChecker > THRESHOLD_LOAD)
  {
    thresholdChecker = 0;
  }
  if (previousSkyIndex != skyIndex)
  {
    previousSkyIndex = skyIndex;
    reloadScene();
  }
}

function animate() 
{
  requestAnimationFrame( animate );
  update();
}

function update() {

  if ( isUserInteracting === false && storedOrientation.initialzed) 
  {
      deviceOrientationControl.update();
  }
  else 
  {
    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.MathUtils.degToRad( 90 - lat );
    theta = THREE.MathUtils.degToRad( lon );

    const x = 500 * Math.sin( phi ) * Math.cos( theta );
    const y = 500 * Math.cos( phi );
    const z = 500 * Math.sin( phi ) * Math.sin( theta );

    camera.lookAt( x, y, z );
  }

  const deltaTime = clock.getDelta();
  checkSkyUpdate(deltaTime);
  textDisplay3D.refreshText();
  renderer.render( scene, camera );
}
