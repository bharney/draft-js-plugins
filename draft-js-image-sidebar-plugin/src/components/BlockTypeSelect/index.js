/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  EditorState,
  AtomicBlockUtils,
} from 'draft-js';

export default class BlockTypeSelect extends React.Component {
  state = {
    style: {
      transform: 'translate(-50%) scale(0)',
    },
    open: false,
    keepOpenHover: false
  }

  // When the popover is open and users click anywhere on the page,
  // the popover should close
  componentDidMount() {
    document.addEventListener('click', this.closePopover);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closePopover);
  }

  toggleToolbar = () => {
    this.preventNextClose = true;
    if (this.state.open) {
      this.setState({
        style: {
          transform: 'translate(-50%) scale(0)',
        },
         keepOpenHover: false,
        open: false,
      });
    }
    else {
      this.setState({
        style: {
          transform: 'translate(-50%) scale(1)',
          transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        },
        keepOpenHover: true,
        open: true
      });
    }
  }

  closePopover = () => {
    if (!this.preventNextClose && this.state.open) {
      this.setState({
        style: {
              transform: 'translate(-50%) scale(0)',
            },
        open: false,
        keepOpenHover: false,
      });
    }
    this.preventNextClose = false;
  };

  onMouseEnter = () => {
     this.setState({ keepOpenHover: true });
  }

  onMouseLeave = () => {
    this.setState({ keepOpenHover: false });
      setTimeout(() => {
        if(!this.state.keepOpenHover){
          this.setState({
            style: {
              transform: 'translate(-50%) scale(0)',
            },
            open: false,
            keepOpenHover: false,
          });
        }
      },500)
  }

  render() {
    const { theme, getEditorState, setEditorState } = this.props;
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div className={theme.blockTypeSelectStyles.blockType} onMouseDown={this.toggleToolbar}>
          <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
        {/*
          The spacer is needed so the popup doesn't go away when moving from the
          blockType div to the popup.
        */}
        <div className={theme.blockTypeSelectStyles.spacer} />
        <div className={theme.blockTypeSelectStyles.popup} style={this.state.style}>
          {this.props.structure.map((Component, index) => (
            <Component
              key={index}
              getEditorState={getEditorState}
              setEditorState={setEditorState}
              theme={theme.buttonStyles}
            />
          ))}
        </div>
      </div>

    );
  }
}
