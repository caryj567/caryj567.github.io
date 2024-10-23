function speak() {
  // Create a SpeechSynthesisUtterance
  const utterance = new SpeechSynthesisUtterance("TEST!");

  // Select a voice
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices[0]; // Choose a specific voice

  // Speak the text
  speechSynthesis.speak(utterance);
}

function speakCapture(piece, targetPiece) {
  var pieceName;
  var sentence;
  let team = Team(piece);
  let tTeam = Team(targetPiece);

  if (!team) sentence = "White ";
  else sentence = "Black ";

  sentence += piece.name + " takes ";

  if (!tTeam) sentence += " white ";
  else sentence += " black ";


  sentence += targetPiece.name;

  const utterance = new SpeechSynthesisUtterance(sentence);

  // Select a voice
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices[0]; // Choose a specific voice

  // Speak the text
  speechSynthesis.speak(utterance);
}

function speakWin(srcTeam) {
  var utterance;
  var sentence;
  const voices = speechSynthesis.getVoices();

  if (!srcTeam) sentence = "White ";
  else sentence = "Black ";

  utterance = new SpeechSynthesisUtterance(sentence + "wins!");
  utterance.voice = voices[0];
  speechSynthesis.speak(utterance);
}
