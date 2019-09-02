import { State, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { IChatState, ChatStateModel } from 'app/models/chat-state';

export class addChatMessage {
  static readonly type = '[chat] addChatMessage';
  constructor(public message: IChatState) {}
}

@State<ChatStateModel>({
  name: 'chat',
  defaults: {
    messages: []
  }
})
export class ChatState implements NgxsOnInit {
  @Action(addChatMessage)
  addChatMessage(ctx: StateContext<ChatStateModel>, action: addChatMessage) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      messages: [...state.messages, action.message]
    });
  }

  ngxsOnInit(ctx: StateContext<ChatStateModel>) {
    console.log('state initialized');
    ctx.dispatch([]);
  }
}
