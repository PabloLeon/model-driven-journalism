import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

const styles = {
  root: {
    fontFamily: "'Helvetica', sans-serif",
    padding: 20,
    width: 600
  },
  editor: {
    border: "1px solid #ccc",
    cursor: "text",
    padding: 10,
    maxHeight: 200,
    minHeight: 200,
    height: "100%",
    overflow: "auto"
  },
  button: {
    marginTop: 10,
    textAlign: "center"
  }
};
export default class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });
    this.logState = () => console.log(this.state.editorState.toJS());
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  }
  render() {
    return (
      <div style={styles.root}>
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="Enter some text..."
            ref="editor"
          />
        </div>
      </div>
    );
  }
}
