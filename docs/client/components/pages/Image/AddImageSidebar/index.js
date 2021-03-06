import React, { Component } from 'react';
// eslint-disable-next-line import/no-unresolved
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
// eslint-disable-next-line import/no-unresolved
import createImagePlugin from 'draft-js-image-plugin';
import ImageAdd from './ImageAdd';
// eslint-disable-next-line import/no-unresolved
import editorStyles from './editorStyles.css';
import createSideToolbarPlugin from 'draft-js-image-sidebar-plugin'; // eslint-disable-line import/no-unresolved
const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;
const imagePlugin = createImagePlugin();
const plugins = [imagePlugin, sideToolbarPlugin];
import sideBarEditorStyles from '../../SideToolbar/SimpleSideToolbarEditor/editorStyles.css';
const text = 'Click on the + button below and insert "/images/canada-landscape-small.jpg" to add the landscape image. Alternativly you can use any image url on the web.';

export default class CustomImageEditor extends Component {

  state = {
    editorState: createEditorStateWithText(text),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div>
        <div className={editorStyles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          <SideToolbar />
        </div>
        <ImageAdd
          editorState={this.state.editorState}
          onChange={this.onChange}
          modifier={imagePlugin.addImage}
        />
      </div>
    );
  }
}
