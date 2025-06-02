import { Canvas, Group } from "@shopify/react-native-skia";
import React from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS, useFrameCallback } from "react-native-reanimated";
import { PLAYER, SCREEN } from "./constants";
import { Obstacle } from "./entities/Obstacle";
import { Player } from "./entities/Player";
import { useObstacleManager } from "./hooks/use-obstacle-manager";
import { usePlayer } from "./hooks/use-player";

export default function InfiniteRunner() {
  const { yPos, velocity, grounded, jump } = usePlayer();

  const { obstacles, nextSpawnTime, addObstacle, updateObstacles } =
    useObstacleManager();

  const tap = Gesture.Tap().onStart(() => {
    runOnJS(jump)();
  });

  // Update obstacle
  useFrameCallback(() => {
    nextSpawnTime.value -= 5;

    if (nextSpawnTime.value <= 0) {
      runOnJS(addObstacle)();
      nextSpawnTime.value = 300; // 1000ms === 1s
    }
    runOnJS(updateObstacles)();
  }, true);

  // Update player
  useFrameCallback(() => {
    if (!grounded.value) {
      yPos.value += velocity.value;
      velocity.value += 1;

      if (yPos.value + PLAYER.height >= SCREEN.height) {
        yPos.value = SCREEN.height - PLAYER.height;
        velocity.value = 0;
        grounded.value = true;
      }
    }
  }, true);

  return (
    <GestureDetector gesture={tap}>
      <View style={{ flex: 1, backgroundColor: "#0a0c21" }}>
        <Canvas style={{ flex: 1 }}>
          <Player x={50} y={yPos} />
          <Group>
            {obstacles.map((obstacle, index) => (
              <Obstacle key={index} x={obstacle.x} y={obstacle.y} />
            ))}
          </Group>
        </Canvas>
      </View>
    </GestureDetector>
  );
}
