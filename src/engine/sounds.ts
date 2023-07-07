export enum Sound {
  MENU_PICK = 'menu_pick',
  MENU_CONFIRM = 'menu_confirm',
  BOOK = 'book',
  NEW_CLIENT = 'new_client',
  TABLE_MOVE = 'table_move',
  BUBBLES = 'bubbles',
  GOOD_POTION = 'good_potion',
  BAD_POTION = 'bad_potion',
  KNIFE = 'knife',
  SPELL = 'spell',
  SPELL_BAD = 'spell_bad',
}

export function playSound(sound: Sound, loop: boolean = false): (() => void) {
  const audio = playdate.sound.sampleplayer.new(`sounds/${sound.toLowerCase()}`);

  const repeatCount = loop ? 0 : 1;
  audio.play(repeatCount);

  return () => audio.stop();
}
