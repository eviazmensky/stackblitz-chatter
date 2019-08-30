export interface IChatState {
  sender: string;
  message: string;
}

export interface ChatStateModel {
  messages: IChatState[];
}
