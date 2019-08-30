import { State , Action, StateContext, NgxsOnInit} from '@ngxs/store';
import {IChatState, ChatStateModel} from 'app/models/chat-state';

export class AddMessage {
  static readonly type = '[chat] AddMessage';
  constructor(public message: IChatState) {}
}

@State<ChatStateModel>({
  name: 'chat',
  defaults: {
    messages: []
  }
})

export class ChatState implements NgxsOnInit {
  @Action(AddMessage)
  AddMessage(ctx: StateContext<ChatStateModel>, action: AddMessage) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      messages: [
        ...state.messages,
        action.message
      ]
    });
  }

  ngxsOnInit(ctx: StateContext<ChatStateModel>) {
    console.log('state initialized');
    ctx.dispatch([]);
  }
}


