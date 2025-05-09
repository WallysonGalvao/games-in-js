import { Pressable, Text } from "react-native";
import { Player } from "../types";

type SquareProps = {
  value: Player | null;
  isWinner: boolean;
  onClick: () => void;
};

const getTextColor = (value: Player | null) =>
  value === "X" ? "text-pink" : "text-white";

const getBorderColor = (value: Player | null, isWinner: boolean) => {
  if (!isWinner) return "border-gray-200";
  return value === "X" ? "border-pink" : "border-white";
};

function Square({ value, isWinner, onClick }: SquareProps) {
  return (
    <Pressable
      onPress={onClick}
      className={`m-2 h-28 w-28 items-center justify-center rounded-xl border-4 ${getBorderColor(value, isWinner)}`}
    >
      {value && (
        <Text className={`text-4xl font-bold ${getTextColor(value)}`}>
          {value}
        </Text>
      )}
    </Pressable>
  );
}

export default Square;
