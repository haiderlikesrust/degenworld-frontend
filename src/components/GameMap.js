import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sky } from '@react-three/drei';
import * as THREE from 'three';
import './GameMap.css';

function Terrain({ size = 1000 }) {
  const terrainRef = useRef();
  
  // Create terrain with subtle texture variation
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, 64, 64);
    const vertices = geo.attributes.position;
    
    // Add subtle height variation for texture
    for (let i = 0; i < vertices.count; i++) {
      const x = vertices.getX(i);
      const z = vertices.getZ(i);
      const y = Math.sin(x * 0.01) * Math.cos(z * 0.01) * 2;
      vertices.setY(i, y);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, [size]);

  // Neutral, less green ground texture
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Desaturated neutral grey-green
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, '#9a9a9a');
    gradient.addColorStop(0.5, '#8a8a8a');
    gradient.addColorStop(1, '#7a7a7a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Subtle noise
    for (let i = 0; i < 300; i++) {
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.05})`;
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 1, 1);
    }
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    return tex;
  }, []);

  return (
    <mesh ref={terrainRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <primitive object={geometry} />
      <meshStandardMaterial
        map={texture}
        roughness={1}
        metalness={0}
        color="#9a9a9a"
      />
    </mesh>
  );
}

function Road({ from, to, level }) {
  const roadGeometry = useMemo(() => {
    const start = new THREE.Vector3(from.x, 0.15, from.y);
    const end = new THREE.Vector3(to.x, 0.15, to.y);
    
    // Use straight lines instead of curves to reduce overlaps
    const curve = new THREE.LineCurve3(start, end);
    
    // Even thinner roads to reduce visual clutter
    const width = (level * 0.2 + 0.5);
    const segments = 32; // Fewer segments for straight roads
    const radialSegments = 6;
    
    return new THREE.TubeGeometry(curve, segments, width, radialSegments, false);
  }, [from, to, level]);

  return (
    <group>
      <mesh geometry={roadGeometry} receiveShadow castShadow>
        <meshStandardMaterial 
          color="#8a8a8a" 
          roughness={0.9} 
          metalness={0}
        />
      </mesh>
      {/* Subtle road markings */}
      <mesh geometry={roadGeometry} position={[0, 0.05, 0]}>
        <meshStandardMaterial 
          color="#6a6a6a" 
          roughness={0.7}
          emissive="#6a6a6a"
          emissiveIntensity={0.05}
        />
      </mesh>
    </group>
  );
}

function Building({ building, position, onSelect, isSelected, isHovered }) {
  const height = (building.level * 4 + 8) * 1.3; // Bigger buildings
  const width = 10 * 1.2;
  const depth = 10 * 1.2;

  const color = getBuildingColor(building.type);
  const buildingRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (buildingRef.current && !isSelected) {
      buildingRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
    }
  });

  const outlineWidth = isSelected ? 0.3 : (hovered || isHovered ? 0.2 : 0);
  const scale = isSelected ? 1.1 : (hovered || isHovered ? 1.05 : 1);

  return (
    <group 
      position={[position.x, height / 2, position.y]} 
      ref={buildingRef}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onSelect && onSelect(building)}
    >
      {/* Subtle shadow for depth */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow>
        <circleGeometry args={[Math.max(width, depth) / 2 * 1.4, 32]} />
        <meshStandardMaterial 
          color="#000000" 
          transparent 
          opacity={0.25}
          roughness={1}
        />
      </mesh>
      
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={color}
          roughness={0.6}
          metalness={0.3}
          emissive={isSelected ? color : '#000000'}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </mesh>
      
      {/* Outline effect */}
      {outlineWidth > 0 && (
        <mesh>
          <boxGeometry args={[width + outlineWidth, height + outlineWidth, depth + outlineWidth]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.5}
            side={THREE.BackSide}
          />
        </mesh>
      )}
      
      {/* Roof */}
      <mesh position={[0, height / 2 + 1.5, 0]} castShadow>
        <coneGeometry args={[width * 0.85, 4, 4]} />
        <meshStandardMaterial
          color={color === '#8b4513' ? '#654321' : color}
          roughness={0.7}
        />
      </mesh>
      
      {/* Windows with glow */}
      {Array.from({ length: Math.floor(height / 3) }).map((_, i) => (
        <group key={i}>
          <mesh position={[width / 2 + 0.1, (i - Math.floor(height / 6)) * 3, 0]}>
            <planeGeometry args={[1.2, 1.8]} />
            <meshStandardMaterial 
              color="#ffd700" 
              emissive="#ffd700" 
              emissiveIntensity={0.5 + Math.random() * 0.3} 
            />
          </mesh>
          <mesh position={[-width / 2 - 0.1, (i - Math.floor(height / 6)) * 3, 0]}>
            <planeGeometry args={[1.2, 1.8]} />
            <meshStandardMaterial 
              color="#ffd700" 
              emissive="#ffd700" 
              emissiveIntensity={0.5 + Math.random() * 0.3} 
            />
          </mesh>
        </group>
      ))}
      
      {/* Label - smaller, lighter, only on hover */}
      {hovered && (
        <Text
          position={[0, height + 2.5, 0]}
          fontSize={1.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.1}
          outlineColor="#000000"
          opacity={0.9}
        >
          {building.type.replace('_', ' ')}
        </Text>
      )}
    </group>
  );
}

function Shop({ shop, position, onSelect, isSelected, isHovered }) {
  const size = 8 * 1.2; // Bigger shops
  const shopRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (shopRef.current && !isSelected) {
      shopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  const outlineWidth = isSelected ? 0.3 : (hovered || isHovered ? 0.2 : 0);
  const scale = isSelected ? 1.15 : (hovered || isHovered ? 1.1 : 1);

  return (
    <group 
      position={[position.x, size / 2, position.y]} 
      ref={shopRef}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onSelect && onSelect(shop)}
    >
      {/* Shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]} receiveShadow>
        <circleGeometry args={[size / 2 * 1.3, 32]} />
        <meshStandardMaterial 
          color="#000000" 
          transparent 
          opacity={0.3}
        />
      </mesh>
      
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[size / 2, size / 2, size, 8]} />
        <meshStandardMaterial
          color="#ffd700"
          roughness={0.4}
          metalness={0.6}
          emissive={isSelected ? "#ffd700" : "#000000"}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>
      
      {/* Outline */}
      {outlineWidth > 0 && (
        <mesh>
          <cylinderGeometry args={[size / 2 + outlineWidth, size / 2 + outlineWidth, size + outlineWidth, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.5}
            side={THREE.BackSide}
          />
        </mesh>
      )}
      
      {/* Sign */}
      <mesh position={[0, size / 2 + 1.5, size / 2 + 0.1]} castShadow>
        <boxGeometry args={[size * 0.9, 1.5, 0.2]} />
        <meshStandardMaterial color="#ff6b35" />
      </mesh>
      <Text
        position={[0, size / 2 + 1.5, size / 2 + 0.25]}
        fontSize={2}
        color="#fff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.1}
        outlineColor="#000"
      >
        {shop.type.replace('_', ' ')}
      </Text>
    </group>
  );
}

function Scene({ gameState, onBuildingSelect, onShopSelect, selectedBuilding, selectedShop, controlsRef }) {
  const { buildings = [], roads = [], shops = [] } = gameState;

  return (
    <>
      {/* Enhanced Lighting with depth and gradient */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[50, 150, 50]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={600}
        shadow-camera-left={-300}
        shadow-camera-right={300}
        shadow-camera-top={300}
        shadow-camera-bottom={-300}
        shadow-bias={-0.0001}
        shadow-radius={4}
      />
      <directionalLight
        position={[-50, 100, -50]}
        intensity={0.3}
        color="#ffffff"
      />
      {/* Ambient light gradient for depth */}
      <hemisphereLight intensity={0.3} color="#f0f4f8" groundColor="#9a9a9a" />
      
      {/* Fog for depth - reduced opacity so structures feel grounded */}
      <fog attach="fog" args={['#e8ecf1', 280, 650]} />

      {/* Sky and Environment */}
      <Sky
        distance={450000}
        sunPosition={[50, 100, 50]}
        inclination={0}
        azimuth={0.25}
      />

      {/* Terrain - darker, more natural */}
      <Terrain size={1000} />
      
      {/* Ground plane for better shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[2000, 2000]} />
        <meshStandardMaterial color="#9a9a9a" roughness={1} metalness={0} />
      </mesh>

      {/* Roads - render above terrain */}
      {roads && roads.length > 0 && roads.map((road) => (
        <Road
          key={road.id}
          from={road.from}
          to={road.to}
          level={road.level || 1}
        />
      ))}

      {/* Buildings */}
      {buildings && buildings.length > 0 && buildings.map((building) => (
        <Building
          key={building.id}
          building={building}
          position={{ x: building.x, y: building.y }}
          onSelect={onBuildingSelect}
          isSelected={selectedBuilding?.id === building.id}
        />
      ))}

      {/* Shops */}
      {shops && shops.length > 0 && shops.map((shop) => (
        <Shop
          key={shop.id}
          shop={shop}
          position={{ x: shop.x, y: shop.y }}
          onSelect={onShopSelect}
          isSelected={selectedShop?.id === shop.id}
        />
      ))}

      {/* Camera Controls - Immersive view */}
      <OrbitControls
        ref={controlsRef}
        enablePan
        enableZoom
        enableRotate
        minDistance={30}
        maxDistance={300}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        target={buildings.length > 0 ? [
          buildings.reduce((sum, b) => sum + b.x, 0) / buildings.length,
          0,
          buildings.reduce((sum, b) => sum + b.y, 0) / buildings.length
        ] : [0, 0, 0]}
      />
    </>
  );
}

function GameMap({ gameState }) {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const controlsRef = useRef();
  
  if (!gameState) return null;

  // Calculate center of buildings for camera
  const buildings = gameState.buildings || [];
  const centerX = buildings.length > 0 ? buildings.reduce((sum, b) => sum + b.x, 0) / buildings.length : 0;
  const centerZ = buildings.length > 0 ? buildings.reduce((sum, b) => sum + b.y, 0) / buildings.length : 0;
  
  // Better camera position - closer and centered on buildings
  const cameraPosition = buildings.length > 0 
    ? [centerX + 50, 45, centerZ + 50]
    : [100, 80, 100];

  return (
    <div className="game-map">
      <div className="map-container-3d">
        <Canvas
          camera={{ position: cameraPosition, fov: 55 }}
          gl={{ antialias: true, alpha: false }}
        >
          <Scene 
            gameState={gameState} 
            onBuildingSelect={setSelectedBuilding}
            onShopSelect={setSelectedShop}
            selectedBuilding={selectedBuilding}
            selectedShop={selectedShop}
            controlsRef={controlsRef}
          />
        </Canvas>
        
        {/* Floating Camera Controls HUD */}
        <div className="camera-controls-hud">
          <button 
            className="camera-btn" 
            onClick={() => {
              // Reset camera by reloading the scene
              window.location.reload();
            }}
            title="Reset Camera"
          >
            🎯
          </button>
          <button 
            className="camera-btn"
            onClick={() => {
              // Zoom in using mouse wheel simulation
              const canvas = document.querySelector('.map-container-3d canvas');
              if (canvas) {
                const event = new WheelEvent('wheel', { deltaY: -100, bubbles: true });
                canvas.dispatchEvent(event);
              }
            }}
            title="Zoom In"
          >
            ➕
          </button>
          <button 
            className="camera-btn"
            onClick={() => {
              // Zoom out using mouse wheel simulation
              const canvas = document.querySelector('.map-container-3d canvas');
              if (canvas) {
                const event = new WheelEvent('wheel', { deltaY: 100, bubbles: true });
                canvas.dispatchEvent(event);
              }
            }}
            title="Zoom Out"
          >
            ➖
          </button>
        </div>
        
        {/* Icon-based Legend Toggles */}
        <div className="map-legend-icons">
          <button className="legend-toggle active" title="Buildings">
            <span className="legend-icon building-icon">🏢</span>
          </button>
          <button className="legend-toggle active" title="Roads">
            <span className="legend-icon road-icon">🛣️</span>
          </button>
          <button className="legend-toggle active" title="Shops">
            <span className="legend-icon shop-icon">🏪</span>
          </button>
        </div>
        
        {/* Building Info Panel */}
        {selectedBuilding && (
          <div className="building-info-panel">
            <button className="close-panel" onClick={() => setSelectedBuilding(null)}>×</button>
            <h3>{selectedBuilding.type.replace('_', ' ')}</h3>
            <div className="info-row">
              <span className="info-label">Level:</span>
              <span className="info-value">{selectedBuilding.level || 1}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Built:</span>
              <span className="info-value">{new Date(selectedBuilding.builtAt).toLocaleDateString()}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Income:</span>
              <span className="info-value">+{selectedBuilding.level * 10} coins/day</span>
            </div>
            <button className="upgrade-btn">Upgrade Building</button>
          </div>
        )}
        
        {selectedShop && (
          <div className="building-info-panel">
            <button className="close-panel" onClick={() => setSelectedShop(null)}>×</button>
            <h3>{selectedShop.type.replace('_', ' ')}</h3>
            <div className="info-row">
              <span className="info-label">Level:</span>
              <span className="info-value">{selectedShop.level || 1}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Owner:</span>
              <span className="info-value">{selectedShop.owner || 'Available'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Revenue:</span>
              <span className="info-value">+{selectedShop.level * 15} coins/day</span>
            </div>
            <button className="upgrade-btn">Upgrade Shop</button>
          </div>
        )}
      </div>
    </div>
  );
}

function getBuildingColor(type) {
  // Role-based colors: purple=residential, green=education, red=industry
  const colors = {
    town_hall: '#667eea',      // Purple - Government
    residential: '#667eea',     // Purple - Housing (role: residential)
    commercial: '#667eea',     // Purple - Business (keep consistent)
    industrial: '#c94a4a',      // Red - Industry (role: production)
    educational: '#6b9a7a',     // Muted green - Education (role: learning)
    hospital: '#667eea',        // Purple - Health (keep consistent)
    park: '#6b9a7a',           // Muted green - Nature
  };
  return colors[type] || '#95a5a6';
}

export default GameMap;
