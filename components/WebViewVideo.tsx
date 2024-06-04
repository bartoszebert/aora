import { View, Text } from "react-native";
import React from "react";
import WebView from "react-native-webview";

interface Props {
  video: string;
  handleVideoEnd: () => void;
  videoStyles?: string;
  videoWrapperStyles?: string;
}

const WebViewVideo = ({
  video,
  handleVideoEnd,
  videoStyles,
  videoWrapperStyles,
}: Props) => {
  const injectedJavaScript = `
    (function() {
      function waitForVideo() {
        const video = document.querySelector('video');
        if (video) {
          video.addEventListener('ended', function() {
            window.ReactNativeWebView.postMessage('videoEnded');
          });
        } else {
          setTimeout(waitForVideo, 500);
        }
      }
      waitForVideo();
    })();
    true;
  `;

  return (
    <View className={videoWrapperStyles}>
      <WebView
        source={{ uri: video }}
        className={videoStyles}
        injectedJavaScript={injectedJavaScript}
        allowsFullscreenVideo
        onMessage={(event) => {
          if (event.nativeEvent.data === "videoEnded") {
            handleVideoEnd();
          }
        }}
        onError={(error) => console.log("WebView Error: ", error)}
      />
    </View>
  );
};

export default WebViewVideo;
