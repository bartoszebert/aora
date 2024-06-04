import {
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { CustomAnimation } from "react-native-animatable";
import WebViewVideo from "./WebViewVideo";

const zoomIn: CustomAnimation = {
  0: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
  1: {
    scaleX: 1.1,
    scaleY: 1.1,
  },
};

const zoomOut: CustomAnimation = {
  0: {
    scaleX: 1.1,
    scaleY: 1.1,
  },
  1: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
};

interface TrendingItemProps {
  activeItem: any;
  item: any;
}

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <WebViewVideo
          video={item.video}
          handleVideoEnd={() => setPlay(false)}
          videoStyles="w-52 h-72 rounded-[35px] overflow-hidden mt-3 bg-white/10"
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          className="relative justify-center items-center"
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] overflow-hidden my-5 shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

interface Props {
  posts: { id: number }[];
}

const Trending = ({ posts }: Props) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item: any) => item.$id.toString()}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
