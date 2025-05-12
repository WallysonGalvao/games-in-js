import { View } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";
import { Card as CardType } from "../types";
import Card from "./Card";

type GameBoardProps = {
  cards: CardType[];
  onCardClick: (id: number) => void;
};

function GameBoard({ cards, onCardClick }: GameBoardProps) {
  return (
    <Animated.View
      entering={FadeInUp.duration(500)}
      exiting={FadeOutUp.duration(500)}
      layout={LinearTransition.duration(500)}
      className="flex w-[70%] flex-row flex-wrap"
    >
      {cards.map((card, index) => (
        <View key={card.id} className="w-1/4 items-center">
          <Card {...card} index={index} onClick={() => onCardClick(card.id)} />
        </View>
      ))}
    </Animated.View>
  );
}

export default GameBoard;
