import { useThree, useFrame } from "@react-three/fiber";

export default function ViewTracker({ setView }) {
  const { camera } = useThree();
  useFrame(() => {
    const angle = Math.atan2(camera.position.x, camera.position.z);
    const normalized = angle % (2 * Math.PI);

    if (Math.abs(normalized) < 0.3) {
      setView("front");
    } else if (Math.abs(Math.abs(normalized) - Math.PI) < 0.3) {
      setView("back");
    }
  });

  return null;
}
