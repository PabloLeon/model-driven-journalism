import React from "react";
import { Editor, Raw } from "slate";

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

const initialState = Raw.deserialize(
  {
    nodes: [
      {
        kind: "block",
        type: "paragraph",
        nodes: [
          {
            kind: "text",
            text: "A line of text in a paragraph."
          }
        ]
      }
    ]
  },
  { terse: true }
);

function CodeNode(props) {
  return (
    <pre {...props.attributes}>
      <code>
        {props.children}
      </code>
    </pre>
  );
}

export default class JEditor extends React.Component {
  state = {
    state: initialState,
    schema: {
      nodes: {
        code: CodeNode
      }
    }
  };

  onChange = state => {
    this.setState({ state });
  };

  onKeyDown = (event, data, state) => {
    if (event.which !== 67 || !event.metaKey || !event.altKey) return;

    event.preventDefault();

    // Determine whether any of the currently selected blocks are code blocks.
    const isCode = state.blocks.some(block => block.type === "code");

    // Toggle the block type depending on `isCode`.
    return state.transform().setBlock(isCode ? "paragraph" : "code").apply();
  };

  render = () => {
    return (
      <div style={styles.root}>
        <div style={styles.editor}>
          <Editor
            schema={this.state.schema}
            state={this.state.state}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
          />
        </div>
      </div>
    );
  };
}
