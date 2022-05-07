import React, { useEffect, useState } from 'react'
import { ContentState, EditorState } from 'draft-js'
import dynamic from 'next/dynamic'
import { convertFromHTML, convertToRaw } from 'draft-js'
import PropTypes from 'prop-types'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false },
)

const TextEditor = ({ value, handler, isEdit }) => {
  const blocksFromHTML = convertFromHTML(value)
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  )

  const [payload, setPayload] = useState({
    editorState: EditorState.createEmpty(),
  })

  const changeHandler = (params) => {
    setPayload({ editorState: params })
    handler(draftToHtml(convertToRaw(payload.editorState.getCurrentContent())))
  }

  useEffect(() => {
    if (isEdit) {
      setPayload({ editorState: EditorState.createWithContent(state) })
    }
  }, [isEdit])

  return (
    <Editor
      editorStyle={{
        minHeight: '250px',
        padding: '0 10px',
      }}
      editorState={payload.editorState}
      toolbarClassName="toolbar-class"
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      onEditorStateChange={changeHandler}
    />
  )
}

TextEditor.propTypes = {
  value: PropTypes.string,
  handler: PropTypes.func,
  isEdit: PropTypes.bool,
  uploadHandler: PropTypes.func,
}

TextEditor.defaultProps = {
  value: '',
  handler: () => {},
  uploadHandler: () => {},
}

export default TextEditor
