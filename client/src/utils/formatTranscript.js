const formatTranscript = (transcript) => {
  const newTranscript = transcript.replace(/\[\[|\]\]|{{|}}|\(\(|\)\)/g, '');
  return newTranscript.split('\n');
};

export default formatTranscript;
