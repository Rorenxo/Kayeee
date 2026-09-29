
import { useState } from "react";
import PortalIntro from "./portal";
import FiveClickIntro from "./components/FiveClickIntro";
import MusicController from "./components/MusicController";
import MemoryStory from "./components/MemoryStory";
import LoveLetter from "./components/LoveLetter";

export default function App() {
  const [stage, setStage] = useState("portal");
  const [musicActive, setMusicActive] = useState(false);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [fadeOutMusic, setFadeOutMusic] = useState(false);

  const handlePortalDone = () => {
    setStage("intro");
  };

  const handleStartMusic = () => {
    setMusicActive(true);
  };

  const handleIntroComplete = () => {
    setMusicActive(true);
    setStage("story");
  };

  const handleProceedToLetter = () => {
    setStage("letter");
  };

  const handleOutroStart = () => {
    setFadeOutMusic(true);
  };

  return (
    <>
      <MusicController
        active={musicActive}
        ducked={voicePlaying}
        fadeOut={fadeOutMusic}
      />

      {stage === "portal" && (
        <PortalIntro
          onDone={handlePortalDone}
        />
      )}

      {stage === "intro" && (
        <FiveClickIntro
          onFinalScene={handleStartMusic}
          onComplete={handleIntroComplete}
        />
      )}

      {stage === "story" && (
        <MemoryStory onProceedToLetter={handleProceedToLetter} />
      )}

      {stage === "letter" && (
        <LoveLetter
          onVoiceMessagePlayStateChange={setVoicePlaying}
          onOutroStart={handleOutroStart}
        />
      )}
    </>
  );
}

