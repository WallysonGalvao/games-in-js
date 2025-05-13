type WordDisplayProps = {
  word: string;
  guessedLetters: Set<string>;
};

// "vercel" => ["v", "e", "r", "c", "e", "l"]
function WordDisplay({ word, guessedLetters }: WordDisplayProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:space-x-2">
      {word.split("").map((letter, index) => (
        <div
          key={index}
          className="flex h-10 w-6 justify-center border-b-2 border-gray-100 pb-2 text-2xl font-bold uppercase text-white sm:h-12 sm:w-8"
        >
          {guessedLetters.has(letter) ? letter : ""}
        </div>
      ))}
    </div>
  );
}

export default WordDisplay;
