// In the PlayerCharacter's update() method:
function updateCharacterLighting(character, probeVolume) {
    // 1. Find nearest probes (simplified for clarity)
    // In a real app, use a faster spatial structure like an Octree
    // For now, we'll find the 8 probes forming a cube around the character
    const surroundingProbes = findSurroundingProbes(character.position, probeVolume);

    if (!surroundingProbes) return; // Character is outside the volume

    // 2. Interpolate the Spherical Harmonics (SH) coefficients
    // This is the core of the technique. We use trilinear interpolation.
    const blendedCoefficients = interpolateProbes(character.position, surroundingProbes);

    // 3. Apply the result to a single, temporary probe
    // It's much more efficient to have ONE probe object that you update
    // than creating a new one every frame.
    if (!character.userData.interpolatedProbe) {
        character.userData.interpolatedProbe = new LightProbe();
        scene.add(character.userData.interpolatedProbe); // Add it once
    }
    
    // Copy the blended data into the probe's SH object
    character.userData.interpolatedProbe.sh.fromArray(blendedCoefficients);

    // Three.js's renderer will automatically see this probe and use it
    // to light any materials within its range (which is infinite by default).
    // A more advanced system would assign this probe directly to the material.
}
