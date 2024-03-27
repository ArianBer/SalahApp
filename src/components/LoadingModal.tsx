import React from "react";
import { Modal } from "react-native";
import FullScreenLoader from "./FullScreenLoader";
import { ViewBox } from "../styles/theme";

interface LoadingModalProps {
  isLoading: boolean;
}
const LoadingModal = ({ isLoading }: LoadingModalProps) => {
  return (
    <Modal transparent visible={isLoading} animationType="fade">
      <ViewBox
        flex={1}
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      >
        <ViewBox height={200} width={200} bg="white" borderRadius={"14"}>
          <FullScreenLoader />
        </ViewBox>
      </ViewBox>
    </Modal>
  );
};

export default LoadingModal;
