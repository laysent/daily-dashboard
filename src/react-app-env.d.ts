/// <reference types="react-scripts" />

interface YoukuCallbackResult {
  error: number;
  html: string;
  message: string;
}

interface Window {
  youku_callback?: (obj: YoukuCallbackResult) => void;
}
