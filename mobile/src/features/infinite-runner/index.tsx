import { Canvas } from "@shopify/react-native-skia";
import React from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS, useFrameCallback } from "react-native-reanimated";
import { PLAYER, SCREEN } from "./constants";
import { Obstacle } from "./entities/Obstacle";
import { Player } from "./entities/Player";
import { useObstacle } from "./hooks/use-obstacle";
import { useObstacleManager } from "./hooks/use-obstacle-manager";
import { usePlayer } from "./hooks/use-player";

export default function InfiniteRunner() {
  const { yPos, velocity, grounded, jump } = usePlayer();
  const { xPos: obstacleXPos, yPos: obstacleYPos } = useObstacle();
  const { obstacles, nextSpawnTime, setObstacles } = useObstacleManager();

  const tap = Gesture.Tap().onStart(() => {
    runOnJS(jump)();
  });

  const addObstacle = () => {
    console.log("addObstacle");
    setObstacles([...obstacles, { x: obstacleXPos, y: obstacleYPos }]);
  };

  const updateObstacle = () => {
    console.log("updateObstacle");
    setObstacles(
      obstacles.map((obstacle) => {
        obstacle.x.value -= 5;
        return obstacle;
      }),
    );
  };

  // Update obstacle
  useFrameCallback(() => {
    nextSpawnTime.value -= 5;

    if (nextSpawnTime.value <= 0) {
      runOnJS(addObstacle)();
      nextSpawnTime.value = 300; // 1000ms === 1s
    }
    runOnJS(updateObstacle)();
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
          {obstacles.map((obstacle, index) => (
            <Obstacle key={index} x={obstacle.x} y={obstacle.y} />
          ))}
        </Canvas>
      </View>
    </GestureDetector>
  );
}
