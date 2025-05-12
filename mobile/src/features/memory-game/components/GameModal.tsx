import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type GameModalProps = {
  moves: number;
  time: string;
  visible: boolean;
  onRestart: () => void;
};

function GameModal({ moves, time, visible, onRestart }: GameModalProps) {
  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.modalOverlay}>
        <View className="max-w-sm rounded-xl bg-white p-6 text-center">
          <Text className="mb-4 text-2xl font-bold">
            🎉 Congratulations! 🎉
          </Text>
          <Text className="mb-6 text-center text-lg">
            You completed the game in {"\n"}
            <Text className="font-bold">{moves} moves</Text> and{" "}
            <Text className="font-bold">{time}</Text>!
          </Text>
          <Pressable
            onPress={onRestart}
            className="items-center rounded-lg bg-pink px-6 py-3"
          >
            <Text className="font-semibold text-white">Play Again</Text>
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
