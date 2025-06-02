import { Canvas, Group } from "@shopify/react-native-skia";
import React from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  runOnJS,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";
import {
  INITIAL_GAME_SPEED,
  PLAYER,
  SCREEN,
  SPAWN_MAX_TIME,
  SPAWN_MIN_TIME,
} from "./constants";
import { Obstacle } from "./entities/Obstacle";
import { Player } from "./entities/Player";
import { useObstacleManager } from "./hooks/use-obstacle-manager";
import { usePlayer } from "./hooks/use-player";

export default function InfiniteRunner() {
  const { yPos, velocity, grounded, jump } = usePlayer();
  const { obstacles, addObstacle, updateObstacles } = useObstacleManager();

  const lastTimestamp = useSharedValue(0);
  const deltatime = useSharedValue(0);

  const nextSpawnTime = useSharedValue(0);
  const gameSpeed = useSharedValue(INITIAL_GAME_SPEED);

  const tap = Gesture.Tap().onStart(() => {
    runOnJS(jump)();
  });

  useFrameCallback(({ timestamp }) => {
    deltatime.value = timestamp - lastTimestamp.value;
    lastTimestamp.value = timestamp;
    // gameSpeed.value += 0.3 * (deltatime.value / 1000);
  }, true);

  // Update obstacle
  useFrameCallback(() => {
    if (nextSpawnTime.value <= 0) {
      runOnJS(addObstacle)();

      const speedFactor = INITIAL_GAME_SPEED / gameSpeed.value;

      nextSpawnTime.value =
        Math.floor(
          Math.random() * (SPAWN_MAX_TIME - SPAWN_MIN_TIME) + SPAWN_MIN_TIME,
        ) * speedFactor;
    }

    nextSpawnTime.value -= deltatime.value;

    runOnJS(updateObstacles)(gameSpeed.value);
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
              <Obstacle
                key={index}
                x={obstacle.x}
                y={obstacle.y}
                height={obstacle.height}
              />
            ))}
          </Group>
        </Canvas>
      </View>
    </GestureDetector>
  );
}
