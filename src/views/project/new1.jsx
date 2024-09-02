import React, { useRef, useEffect } from "react";
import * as THREE from "three";
// import Car from "../../assets/images/car.jpg"; // Import the local image

const SphereViewer = ({images}) => {
  const mountRef = useRef(null);
  const WIDTH = 1200;
  const HEIGHT = 675;
  const ASPECT_RATIO = 2 / 1;
  const FOV = 80;

  let pitch = 0;
  let yaw = 0;
  let dragging = false;
  let sx = 0;
  let sy = 0;

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, 0.1, 1000);
    camera.rotation.order = "YXZ";

    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    mountRef.current.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
  //  const src = 'https://www.shutterstock.com/image-illustration/360-degrees-home-interior-view-260nw-1227932110.jpg'; // Use the local image import
    // const src = 'https://images.unsplash.com/photo-1551672579-862434bcfe7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    loader.load(src, (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.repeat.x = -1;

      const geometry = new THREE.SphereGeometry(10, 360, 64);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
      });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      animate();
    });

    const onMouseMove = (event) => {
      if (dragging) {
        yaw -= event.movementX * 0.01;
        pitch -= event.movementY * 0.01;
        pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
      }
    };

    const onMouseDown = () => {
      dragging = true;
    };

    const onMouseUp = () => {
      dragging = false;
    };

    const onTouchStart = (event) => {
      dragging = true;
      sx = event.touches[0].pageX;
      sy = event.touches[0].pageY;
    };

    const onTouchEnd = () => {
      dragging = false;
    };

    const onTouchMove = (event) => {
      if (dragging) {
        yaw -= (event.touches[0].pageX - sx) * 0.01;
        pitch -= (event.touches[0].pageY - sy) * 0.01;
        pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
        sx = event.touches[0].pageX;
        sy = event.touches[0].pageY;
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      camera.rotation.y = -yaw;
      camera.rotation.x = -pitch;
      renderer.render(scene, camera);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchend", onTouchEnd);
    document.addEventListener("touchmove", onTouchMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("touchmove", onTouchMove);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default SphereViewer;
