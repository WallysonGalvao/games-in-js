import { Canvas, Fill, Text, useFont } from "@shopify/react-native-skia";
import React, { useEffect, useState } from "react";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import {
  CELL_SIZE,
  colors,
  DIRECTIONS,
  INITIAL_SNAKE_POSITION,
} from "./constants";
import { Food } from "./entities/Food";
import { Snake } from "./entities/Snake";
import { useFood } from "./hooks/use-food";
import { useSnake } from "./hooks/use-snake";

import { PressStart2P_400Regular } from "@expo-google-fonts/press-start-2p";
import { GridLines } from "./components/GridLines";
import { Tiles } from "./components/Tiles";
import { GameOverScreen, InitialScreen } from "./ScreenManager";

export default function SnakeGame() {
  const font = useFont(PressStart2P_400Regular, 20);

  const { position: foodPosition, respawn } = useFood();
  const { body, setBody, move, checkCollisions, changeDirection, addTail } =
    useSnake();

  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const tap = Gesture.Tap().onStart((event) => {
    const { absoluteX, absoluteY } = event;
    const head = body[0];
    const headX = head.x * CELL_SIZE + CELL_SIZE / 2;
    const headY = head.y * CELL_SIZE + CELL_SIZE / 2;

    const angle =
      (Math.atan2(absoluteY - headY, absoluteX - headX) * 180) / Math.PI;

    let newDirection;

    if (angle > -45 && angle < 45) newDirection = DIRECTIONS.RIGHT;
    else if (angle >= 45 && angle < 135) newDirection = DIRECTIONS.DOWN;
    else if (angle >= 135 || angle < -135) newDirection = DIRECTIONS.LEFT;
    else newDirection = DIRECTIONS.UP;

    runOnJS(changeDirection)(newDirection);
  });

  const reset = () => {
    respawn();
    setScore(0);
    setBody(INITIAL_SNAKE_POSITION);
    setIsPlaying(true);
    setIsGameOver(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPlaying) return;

      const hasCollided = checkCollisions();
      if (!hasCollided) {
        move();

        const head = body?.[0];

        if (head?.x === foodPosition?.x && head?.y === foodPosition?.y) {
          addTail();
          setScore((prev) => prev + 1);
          respawn();
        }
      } else {
        setIsPlaying(false);
        setIsGameOver(true);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [body, foodPosition, move, checkCollisions, respawn, addTail, isPlaying]);

  if (!isPlaying && !isGameOver) {
    return (
      <InitialScreen
        setIsPlaying={setIsPlaying}
        setIsGameOver={setIsGameOver}
      />
    );
  }

  if (isGameOver) {
    return <GameOverScreen score={score} reset={reset} />;
  }

  return (
    <GestureDetector gesture={tap}>
      <Canvas style={{ flex: 1 }}>
        <Fill color={colors.bg} />
        <Tiles />
        <GridLines />
        <Snake cellSize={CELL_SIZE} body={body} />
        <Food cellSize={CELL_SIZE} position={foodPosition} />
        <Text x={10} y={25} text={`Score:${score}`} color="white" font={font} />
      </Canvas>
    </GestureDetector>
  );
}
