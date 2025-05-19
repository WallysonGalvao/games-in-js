import { Group, Image, useImage } from "@shopify/react-native-skia";
import React from "react";
import { Position } from "../types";

type SnakeProps = {
  cellSize: number;
  body: Position[];
  direction: Position;
};

const getSegmentSprite = (
  body: Position[],
  index: number,
  direction: Position,
) => {
  const prev = body[index - 1];
  const current = body[index];
  const next = body[index + 1];

  // head
  if (index === 0) {
    if (direction.x === 1) return "head_right";
    if (direction.x === -1) return "head_left";
    if (direction.y === 1) return "head_down";
    return "head_up";
  }

  // tail
  if (index === body.length - 1) {
    if (prev.x > current.x) return "tail_left";
    if (prev.x < current.x) return "tail_right";
    if (prev.y > current.y) return "tail_up";
    return "tail_down";
  }

  // straight body parts
  if (prev.x === next.x) return "body_vertical";
  if (prev.y === next.y) return "body_horizontal";

  // right to up
  if (prev.x < current.x && next.y < current.y) return "body_topleft";
  // down to left
  if (prev.y < current.y && next.x < current.x) return "body_topleft";
  // left to up
  if (prev.x > current.x && next.y < current.y) return "body_topright";
  // down to right
  if (prev.y < current.y && next.x > current.x) return "body_topright";
  // left to down
  if (prev.x > current.x && next.y > current.y) return "body_bottomright";
  // up to right
  if (prev.y > current.y && next.x > current.x) return "body_bottomright";
  // right to down
  if (prev.x < current.x && next.y > current.y) return "body_bottomleft";
  // up to left
  if (prev.y > current.y && next.x < current.x) return "body_bottomleft";

  return "body_horizontal";
};

export const Snake = ({ cellSize, body, direction }: SnakeProps) => {
  const sprites = {
    head_right: useImage(require("../assets/images/head_right.png")),
    head_left: useImage(require("../assets/images/head_left.png")),
    head_up: useImage(require("../assets/images/head_up.png")),
    head_down: useImage(require("../assets/images/head_down.png")),

    tail_right: useImage(require("../assets/images/tail_right.png")),
    tail_left: useImage(require("../assets/images/tail_left.png")),
    tail_up: useImage(require("../assets/images/tail_up.png")),
    tail_down: useImage(require("../assets/images/tail_down.png")),

    body_topleft: useImage(require("../assets/images/body_topleft.png")),
    body_topright: useImage(require("../assets/images/body_topright.png")),
    body_bottomright: useImage(
      require("../assets/images/body_bottomright.png"),
    ),
    body_bottomleft: useImage(require("../assets/images/body_bottomleft.png")),

    body_horizontal: useImage(require("../assets/images/body_horizontal.png")),
    body_vertical: useImage(require("../assets/images/body_vertical.png")),
  };

  return (
    <Group>
      {body.map((segment, index) => {
        const spriteType = getSegmentSprite(body, index, direction);
        const image = sprites[spriteType];

        return (
          <Image
            key={`snake-${index}`}
            image={image}
            x={segment.x * cellSize}
            y={segment.y * cellSize}
            width={cellSize}
            height={cellSize}
          />
        );
      })}
    </Group>
  );
};
