import { useEffect, useRef } from "react";
import { useToastMessage } from "./useToastMessage";
import { FormState } from "@/utils/formStateHelper";

export const useToastMessageWithSound = (formState: FormState) => {
  useToastMessage(formState);
  const prevTimestamp = useRef(formState.timestamp);

  const playSound =
    formState.message && formState.timestamp !== prevTimestamp.current;

  useEffect(() => {
    if (playSound) {
      const soundConfig = getSoundConfig(formState.status);
      if (soundConfig) {
        playSoundEffect(soundConfig);
        prevTimestamp.current = formState.timestamp;
      }
    }
  }, [formState, playSound]);

  const audioContext = global.window && new window.AudioContext();

  function getSoundConfig(status: string) {
    switch (status) {
      case "SUCCESS":
        return {
          type: "sine",
          frequency: 800,
          duration: 300,
        };
      case "WARN":
        return {
          type: "sawtooth",
          frequency: 500,
          duration: 400,
        };
      case "ERROR":
        return {
          type: "triangle",
          frequency: 1000,
          duration: 500,
        };
      case "INFO":
        return {
          type: "triangle",
          frequency: 600,
          duration: 350,
        };
      default:
        return null;
    }
  }

  function playSoundEffect(config: any) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = config.type;
    oscillator.frequency.setValueAtTime(
      config.frequency,
      audioContext.currentTime,
    );
    oscillator.connect(gainNode);

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.05); // Fade in
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + config.duration / 1000,
    ); // Fade out

    gainNode.connect(audioContext.destination);

    oscillator.start();
    setTimeout(function () {
      oscillator.stop();
    }, config.duration);
  }
};
