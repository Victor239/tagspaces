export default function globalKeyBindings() {
  return [
    {
      name: 'globalShowTagSpaces',
      command: 'CommandOrControl+Shift+W',
    },
    {
      name: 'globalShowSearch',
      command: 'CommandOrControl+Shift+F',
    },
    {
      name: 'globalNewTextFile',
      command: 'CommandOrControl+Shift+N',
    },
    {
      name: 'globalNextFile',
      command: 'CommandOrControl+Shift+D',
    },
    {
      name: 'globalPreviousFile',
      command: 'CommandOrControl+Shift+A',
    },
    {
      name: 'globalResumePlayback',
      command: 'CommandOrControl+Shift+P',
    },
    {
      name: 'globalMediaPlayPause',
      command: 'MediaPlayPause',
    },
    {
      name: 'globalMediaNextTrack',
      command: 'MediaNextTrack',
    },
    {
      name: 'globalMediaPrevTrack',
      command: 'MediaPreviousTrack',
    },
  ];
}
