function speak() {
  // Create a SpeechSynthesisUtterance
  const utterance = new SpeechSynthesisUtterance("TEST!");

  // Select a voice
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices[0]; // Choose a specific voice

  // Speak the text
  speechSynthesis.speak(utterance);
}

function speakCapture(srcPiece, dstPiece) {
  var pieceName;
  var sentence;
  let srcTeam = srcPiece.toUpperCase() === srcPiece;
  let dstTeam = dstPiece.toUpperCase() === dstPiece;

  if (srcTeam) sentence = "White ";
  else sentence = "Black ";

  switch (srcPiece.toUpperCase()) {
    case "P":
      pieceName = "Pawn";
      break;
    case "R":
      pieceName = "Rook";
      break;
    case "N":
      pieceName = "Knight";
      break;
    case "B":
      pieceName = "Bishop";
      break;
    case "Q":
      pieceName = "Queen";
      break;
    case "K":
      pieceName = "King";
      break;
  }

  sentence += pieceName + " takes ";

  if (dstTeam) sentence += " white ";
  else sentence += " black ";

  switch (dstPiece.toUpperCase()) {
    case "P":
      pieceName = "Pawn";
      break;
    case "R":
      pieceName = "Rook";
      break;
    case "N":
      pieceName = "Knight";
      break;
    case "B":
      pieceName = "Bishop";
      break;
    case "Q":
      pieceName = "Queen";
      break;
    case "K":
      pieceName = "King";
      break;
  }

  sentence += pieceName;

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

  if (srcTeam) sentence = "White ";
  else sentence = "Black ";

  utterance = new SpeechSynthesisUtterance(sentence + "wins!");
  utterance.voice = voices[0];
  speechSynthesis.speak(utterance);
}
