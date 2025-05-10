import { Sparkles } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

function Card() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Pressable
      className="relative h-16 w-16 cursor-pointer"
      onPress={handleClick}
    >
      {/* View do 3D */}
      <View
        className={`preserve-3d h-full w-full transition-transform duration-500 ${isFlipped && "rotate-y-180"}`}
      >
        {/* Card back */}
        <View className="backface-hidden absolute flex h-full w-full items-center justify-center rounded-xl border-2 border-white/20 bg-pink">
          <Sparkles className="h-6 w-6 text-white" />
        </View>

        {/* Card front */}
        <View className="backface-hidden rotate-y-180 absolute flex h-full w-full items-center justify-center rounded-xl border-2 border-purple-200 bg-white">
          <Text>🍬</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default Card;
