import {  } from '../actions/member-actions';

export default function member(state =
                              { icon: 'glyphicon glyphicon-user',
                                panelMessage: {
                                  label: "Recently Online:",
                                  text: "Kin"
                                }
                            }, action) {
  switch (action.type) {
    default:
      return state;
  }
}
