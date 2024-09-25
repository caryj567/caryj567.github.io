function speak(piece, newX, newY) {
  var pieceName = "UNKNOWN";
  var sentence;
  switch (piece.toUpperCase()) {
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
  sentence = pieceName + " to ";
  switch (newX) {
    case 0:
      sentence += "aa"; //fix the pronunciation a little bit
      break;
    case 1:
      sentence += "b";
      break;
    case 2:
      sentence += "c";
      break;
    case 3:
      sentence += "d";
      break;
    case 4:
      sentence += "e";
      break;
    case 5:
      sentence += "f";
      break;
    case 6:
      sentence += "g";
      break;
    case 7:
      sentence += "h";
      break;
  }
  sentence += Math.abs(8 - newY); //map 0-7 to 8-1
  const utterance = new SpeechSynthesisUtterance(sentence);

  // Select a voice
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices[0];

  speechSynthesis.speak(utterance);
}

function speakWin(startPiece, endPiece) {
  var team;
  if (startPiece.toUpperCase() == startPiece)
    //a white piece made the winning move
    team = "White";
  else team = "Black";

  const utterance = new SpeechSynthesisUtterance(team + " Wins!");

  // Select a voice
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices[0];

  speechSynthesis.speak(utterance);
}
