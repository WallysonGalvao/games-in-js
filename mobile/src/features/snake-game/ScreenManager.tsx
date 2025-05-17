import { PressStart2P_400Regular } from "@expo-google-fonts/press-start-2p";
import { Canvas, Fill, Text, useFont } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

const SCREEN = Dimensions.get("window");
const TITLE_FONT_SIZE = 30;
const INSTRUCTION_FONT_SIZE = 16;
const BACKGROUND_COLOR = "rgba(0,0,0,0.7)";
const TEXT_COLOR = "white";

type TextElement = {
  content: string;
  font: ReturnType<typeof useFont>;
  yPosition: number;
};

type InitialScreenProps = {
  setIsPlaying: (value: boolean) => void;
  setIsGameOver: (value: boolean) => void;
};

type GameOverScreenProps = {
  score: number;
  reset: () => void;
};

const renderTextElement = ({ content, font, yPosition }: TextElement) => {
  if (!font) return null;

  const { width: textWidth } = font.measureText(content);

  return (
    <Text
      key={content}
      x={(SCREEN.width - textWidth) / 2}
      y={yPosition}
      text={content}
      color={TEXT_COLOR}
      font={font}
    />
  );
};

function InitialScreen({ setIsPlaying, setIsGameOver }: InitialScreenProps) {
  const titleFont = useFont(PressStart2P_400Regular, TITLE_FONT_SIZE);
  const instructionFont = useFont(
    PressStart2P_400Regular,
    INSTRUCTION_FONT_SIZE,
  );

  if (!titleFont || !instructionFont) return null;

  const textElements: TextElement[] = [
    {
      content: "Snake Game",
      font: titleFont,
      yPosition: 100,
    },
    {
      content: "Tap to Start",
      font: instructionFont,
      yPosition: 150,
    },
    {
      content: "Swipe to control",
      font: instructionFont,
      yPosition: 200,
    },
    {
      content: "the snake!",
      font: instructionFont,
      yPosition: 230,
    },
  ];

  const tap = Gesture.Tap().onStart(() => {
    runOnJS(setIsPlaying)(true);
    runOnJS(setIsGameOver)(false);
  });

  return (
    <GestureDetector gesture={tap}>
      <Canvas style={{ flex: 1 }}>
        <Fill color={BACKGROUND_COLOR} />
        {textElements.map(renderTextElement)}
      </Canvas>
    </GestureDetector>
  );
}

function GameOverScreen({ score, reset }: GameOverScreenProps) {
  const titleFont = useFont(PressStart2P_400Regular, TITLE_FONT_SIZE);
  const instructionFont = useFont(
    PressStart2P_400Regular,
    INSTRUCTION_FONT_SIZE,
  );

  if (!titleFont || !instructionFont) return null;

  const textElements: TextElement[] = [
    {
      content: "Game Over!",
      font: titleFont,
      yPosition: 100,
    },
    {
      content: `Final Score: ${score}`,
      font: instructionFont,
      yPosition: 150,
    },
    {
      content: "Tap to restart",
      font: instructionFont,
      yPosition: 200,
    },
  ];

  const tap = Gesture.Tap().onStart(() => {
    runOnJS(reset)();
  });

  return (
    <GestureDetector gesture={tap}>
      <Canvas style={{ flex: 1 }}>
        <Fill color={BACKGROUND_COLOR} />
        {textElements.map(renderTextElement)}
      </Canvas>
    </GestureDetector>
  );
}

export { GameOverScreen, InitialScreen };
