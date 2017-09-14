import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor'; // eslint-disable-line import/no-unresolved
import createHashtagPlugin from 'draft-js-hashtag-plugin'; // eslint-disable-line import/no-unresolved
import createStickerPlugin from 'draft-js-sticker-plugin'; // eslint-disable-line import/no-unresolved
import createLinkifyPlugin from 'draft-js-linkify-plugin'; // eslint-disable-line import/no-unresolved
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'; // eslint-disable-line import/no-unresolved
import createUndoPlugin from 'draft-js-undo-plugin'; // eslint-disable-line import/no-unresolved
import {
  // convertToRaw,
  // convertFromRaw,
  ContentState,
  EditorState,
} from 'draft-js';
import styles from './styles.css';
import stickers from './stickers';
import mentions from './mentions';
// import initialState from './initialState';

const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();
const mentionPlugin = createMentionPlugin();
const undoPlugin = createUndoPlugin();
const stickerPlugin = createStickerPlugin({
  stickers,
});
const { MentionSuggestions } = mentionPlugin;
const { StickerSelect } = stickerPlugin;
const { UndoButton, RedoButton } = undoPlugin;

const plugins = [
  hashtagPlugin,
  stickerPlugin,
  linkifyPlugin,
  mentionPlugin,
  undoPlugin,
];

// const contentState = ContentState.createFromBlockArray(convertFromRaw(initialState));
const contentState = ContentState.createFromText('You can add Emojis by typing colon : or mentions with an @. Add Stickers and undo your actions with the undo button below …');

export default class UnicornEditor extends Component {

  state = {
    editorState: EditorState.createWithContent(contentState),
    suggestions: mentions,
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onMentionSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            spellCheck
            ref={(element) => { this.editor = element; }}
          />
        </div>
        <div>
          <MentionSuggestions
            onSearchChange={this.onMentionSearchChange}
            suggestions={this.state.suggestions}
          />
          <div className={styles.editorButton}>
            <StickerSelect editor={this} />
          </div>
          <div className={styles.editorButton}>
            <UndoButton />
          </div>
          <div className={styles.editorButton}>
            <RedoButton />
          </div>
        </div>
      </div>
    );
  }
}
