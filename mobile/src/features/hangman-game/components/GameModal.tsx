import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { GAME_STATUS } from "../constants";
import { GameStatus } from "../types";

type GameModalProps = {
  gameStatus: GameStatus;
  word: string;
  onNewWord: () => void;
};

function GameModal({ gameStatus, word, onNewWord }: GameModalProps) {
  if (gameStatus === GAME_STATUS.PLAYING) return null;

  const isWinner = gameStatus === GAME_STATUS.WON;
  const title = isWinner ? "🎉 Congratulations! 🎉" : "💀 Game Over 💀";

  return (
    <Modal
      transparent
      animationType="slide"
      visible={
        gameStatus === GAME_STATUS.WON || gameStatus === GAME_STATUS.LOST
      }
    >
      <View style={styles.modalOverlay}>
        <View className="max-w-sm rounded-xl bg-white p-6 text-center">
          <Text className="mb-4 text-center text-2xl font-bold">
            {title}
            {!isWinner && (
              <Text className="text-xl">
                {"\n"}The word was: {word.toUpperCase()}
              </Text>
            )}
          </Text>
          <Pressable
            onPress={onNewWord}
            className="rounded-lg bg-pink px-4 py-2"
          >
            <Text className="text-center font-semibold text-white">
              New Word
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default GameModal;
