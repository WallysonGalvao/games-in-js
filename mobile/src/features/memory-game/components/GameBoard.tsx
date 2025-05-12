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
      {cards.map((card) => (
        <View key={card.id} className="w-1/4 items-center">
          <Card {...card} onClick={() => onCardClick(card.id)} />
        </View>
      ))}
    </Animated.View>
  );
}

export default GameBoard;

// 17h28
// frango 1h10
// feijao 50min
