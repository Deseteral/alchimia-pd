interface Message {
  text: string[],
  rightSide: boolean,
}

interface MessageBoard {
  messages: Message[],
}

export { Message, MessageBoard };
