const SpeechRecognizer = (function () {
  let recognizer;
  let speechConfig;
  let audioConfig;
  let SpeechSDK;

  if (!!window.SpeechSDK) {
    SpeechSDK = window.SpeechSDK;
  }
  else {
    throw new Error('Speech SDK not loaded');
  }

  function SpeechRecognizer(subscriptionKey, serviceRegion) {
    this.subscriptionKey = subscriptionKey;
    this.serviceRegion = serviceRegion;
    speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
  }

  SpeechRecognizer.prototype.Recognize = function (language,recognizingCallBack) {
    speechConfig.speechRecognitionLanguage = language;
    recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    recognizer.recognizing = recognizingCallBack;
    return new Promise(function (resolve, reject) {
      recognizer.recognizeOnceAsync(
        function (result) {
          recognizer.close();
          resolve(result);
        },
        function (err) {
          recognizer.close();
          reject(err);
        });
    });
  };
  
  return SpeechRecognizer;
}());
