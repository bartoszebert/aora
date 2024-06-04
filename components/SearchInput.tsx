import { View, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../constants";

interface Props {
  value: string;
  handleChangeText: (text: string) => void;
  otherStyles?: any;
  keyboardType?: any;
}

const SearchInput = ({
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}: Props) => {
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular mt-0.5 text-base"
        placeholder='Search for video topic...'
        placeholderTextColor={"#7b7b8b"}
        value={value}
        onChangeText={handleChangeText}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
