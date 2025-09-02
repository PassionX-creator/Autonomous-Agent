import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface VoiceInterfaceProps {
  darkMode?: boolean; // Optional prop to toggle dark mode 
}

export const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ darkMode = false }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    // Web Speech API setup
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      console.warn("SpeechRecognition API not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + " " + transcriptPart);
        }
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = async () => {
    if (recognitionRef.current && !listening) {
      setTranscript("");
      recognitionRef.current.start();
      setListening(true);

      // Setup audio context for visualization
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      analyser.fftSize = 256;
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      drawWaveform();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && listening) {
      recognitionRef.current.stop();
      setListening(false);

      // Stop visualization
      audioContextRef.current?.close();
    }
  };

  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!ctx || !analyserRef.current) return;
      requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = darkMode ? "#1f2937" : "#f9fafb"; // dark/light background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = darkMode ? "#00ffff" : "#2563eb"; // cyan/blue wave
      ctx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-6">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`
          ${darkMode ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-gray-200"}
          backdrop-blur-xl border rounded-xl p-8 w-full max-w-2xl
        `}
      >
        <div className="text-center space-y-6">
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Voice Interface 🎤
          </h2>

          {/* Waveform Canvas */}
          <canvas
            ref={canvasRef}
            width={500}
            height={100}
            className="mx-auto rounded-lg border border-gray-500"
          />

          {/* Transcript Box */}
          <motion.div
            transition={{ delay: 0.2 }}
            className={`
              ${darkMode ? "bg-gray-800/80 border-gray-700" : "bg-white/80 border-gray-200"}
              backdrop-blur-xl border rounded-xl p-6
            `}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Transcript
            </h3>
            <p
              className={`${
                darkMode ? "text-gray-300" : "text-gray-700"
              } whitespace-pre-line`}
            >
              {transcript || "Start speaking to see the transcript..."}
            </p>
          </motion.div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={startListening}
              disabled={listening}
              className={`px-6 py-2 rounded-lg ${
                listening
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              } text-white transition`}
            >
              Start
            </button>
            <button
              onClick={stopListening}
              disabled={!listening}
              className={`px-6 py-2 rounded-lg ${
                !listening
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              } text-white transition`}
            >
              Stop
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
//export default VoiceInterface;
