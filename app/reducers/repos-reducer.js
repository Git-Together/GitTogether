import {  } from '../actions/repos-actions';

export default function repos(state =
                              { icon: 'glyphicon glyphicon-th-list',
                                panelMessage: {
                                  label: "Here Are your Repos",
                                  text: "Repos"
                                }

                              }, action) {
  switch (action.type) {
    default:
      return state;
  }
}
