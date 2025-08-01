import {
    WebGLCubeRenderTarget,
    CubeCamera,
    LightProbe,
    LightProbeGenerator
} from 'three';

// --- In your app's initialization for the selected dynamic object ---

// 1. Create the CubeCamera and its Render Target
const probeResolution = 256;
const cubeRenderTarget = new WebGLCubeRenderTarget(probeResolution);
const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget); // near, far, renderTarget

// Add the CubeCamera to the dynamic object so it moves with it
dynamicObject.add(cubeCamera);

// 2. Create the LightProbe
const lightProbe = new LightProbe();

// Add the LightProbe to the scene so it can affect all materials
scene.add(lightProbe);

// 3. Assign the probe to the dynamic object's material
// (You might want a more sophisticated system for this)
dynamicObject.traverse((child) => {
    if (child.isMesh) {
        // By setting envMap, you get reflections.
        // The LightProbe will handle the diffuse lighting contribution.
        child.material.envMap = cubeRenderTarget.texture;
        child.material.needsUpdate = true;
    }
});


// --- In your animation/render loop ---

function animate() {
    requestAnimationFrame(animate);

    // This is the CRITICAL part controlled by your UI
    // For now, let's update it every frame
    if (isProbeUpdateNeeded()) { // This function would check your UI settings
        // Hide the dynamic object itself before rendering the probe
        dynamicObject.visible = false;

        // Update the CubeCamera
        cubeCamera.update(renderer, scene);

        // Update the LightProbe from the render target
        lightProbe.copy(LightProbeGenerator.fromCubeRenderTarget(renderer, cubeRenderTarget));

        // Make the dynamic object visible again
        dynamicObject.visible = true;
    }

    renderer.render(scene, camera);
}

// Example of how the logic for updating could work
let lastPosition = new Vector3();
const updateThreshold = 0.5; // From your UI

function isProbeUpdateNeeded() {
    // Logic for "Every Frame", "Every N Frames", etc. would go here.
    // Example for "On Move":
    const currentPosition = dynamicObject.position;
    if (currentPosition.distanceTo(lastPosition) > updateThreshold) {
        lastPosition.copy(currentPosition);
        return true;
    }
    return false;
}