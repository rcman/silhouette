

## Key Features:

1. **Lightmap Baking**:
   - Creates a UV map of the box geometry
   - Bakes lighting information into a texture
   - Applies baked texture as a lightmap to the box

2. **Reflection Mapping**:
   - Uses a cube camera to capture environment reflections
   - Applies dynamic reflections to the sphere
   - Updates reflections in real-time as objects move

3. **Light Probe**:
   - Generates a light probe from scene lighting
   - Provides realistic ambient illumination
   - Dynamically updates lighting on all objects

4. **Additional Features**:
   - Orbit controls for camera navigation
   - Responsive design with window resize handling
   - Shadow casting for directional light
   - Animated rotation of objects

## How It Works:

1. The scene contains three main objects:
   - Box with baked lightmap
   - Reflective sphere with dynamic environment mapping
   - Ground plane

2. The baking process:
   - Creates a separate scene for baking
   - Renders UV coordinates to a texture
   - Uses this texture as a lightmap on the box

3. Reflection system:
   - Cube camera captures environment from sphere's position
   - Updates reflections each frame
   - Creates realistic metallic reflections

4. Light probe:
   - Samples lighting information from the scene
   - Provides consistent ambient lighting
   - Works with both baked and dynamic lighting

The implementation balances performance and visual quality by combining precomputed elements (lightmap) with real-time effects (reflections, light probe). You can adjust material properties like roughness and metalness to achieve different visual effects.