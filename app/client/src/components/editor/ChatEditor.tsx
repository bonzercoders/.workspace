import { useEffect, useRef, useState } from "react"
import {
  Bold,
  Code2,
  Italic,
  Plus,
  Quote,
  Strikethrough,
  Underline,
} from "lucide-react"
import { KEYS, normalizeNodeId } from "platejs"
import { Plate, useEditorRef, usePlateEditor } from "platejs/react"

import { BaseEditorKit } from "@/components/editor/kits/editor-base-kit"
import { setBlockType } from "@/components/editor/kits/transforms"
import micIcon from "@/assets/mic.png"
import { AlignToolbarButton } from "@/components/ui/align-toolbar-button"
import { Button } from "@/components/ui/button"
import { Editor, EditorContainer } from "@/components/ui/editor"
import { RedoToolbarButton, UndoToolbarButton } from "@/components/ui/history-toolbar-button"
import { LinkToolbarButton } from "@/components/ui/link-toolbar-button"
import { BulletedListToolbarButton } from "@/components/ui/list-toolbar-button"
import { MarkToolbarButton } from "@/components/ui/mark-toolbar-button"
import { MediaToolbarButton } from "@/components/ui/media-toolbar-button"
import { Toolbar, ToolbarButton, ToolbarGroup } from "@/components/ui/toolbar"
import { TurnIntoToolbarButton } from "@/components/ui/turn-into-toolbar-button"

const initialValue = normalizeNodeId([
  {
    children: [{ text: "" }],
    type: KEYS.p,
  },
])

function QuoteToolbarButton() {
  const editor = useEditorRef()

  return (
    <ToolbarButton
      className="chat-editor__toolbar-button"
      onClick={() => {
        setBlockType(editor, KEYS.blockquote)
        editor.tf.focus()
      }}
      onMouseDown={(event) => event.preventDefault()}
      tooltip="Quote"
    >
      <Quote className="chat-editor__toolbar-icon" />
    </ToolbarButton>
  )
}

export function ChatEditor() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const editor = usePlateEditor({
    plugins: BaseEditorKit,
    value: initialValue,
  })

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (menuRef.current?.contains(event.target as Node)) {
        return
      }

      setIsMenuOpen(false)
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick)
    document.addEventListener("keydown", closeOnEscape)

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [isMenuOpen])

  return (
    <section aria-label="Chat editor" className="chat-editor" role="region">
      <Plate editor={editor}>
        <Toolbar aria-label="Formatting tools" className="chat-editor__toolbar">
          <ToolbarGroup className="chat-editor__toolbar-group">
            <UndoToolbarButton className="chat-editor__toolbar-button" />
            <RedoToolbarButton className="chat-editor__toolbar-button" />
          </ToolbarGroup>

          <ToolbarGroup className="chat-editor__toolbar-group">
            <TurnIntoToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup className="chat-editor__toolbar-group">
            <BulletedListToolbarButton />
            <QuoteToolbarButton />
          </ToolbarGroup>

          <ToolbarGroup className="chat-editor__toolbar-group">
            <MarkToolbarButton className="chat-editor__toolbar-button" nodeType={KEYS.bold}>
              <Bold className="chat-editor__toolbar-icon" />
            </MarkToolbarButton>
            <MarkToolbarButton className="chat-editor__toolbar-button" nodeType={KEYS.italic}>
              <Italic className="chat-editor__toolbar-icon" />
            </MarkToolbarButton>
            <MarkToolbarButton className="chat-editor__toolbar-button" nodeType={KEYS.strikethrough}>
              <Strikethrough className="chat-editor__toolbar-icon" />
            </MarkToolbarButton>
            <MarkToolbarButton className="chat-editor__toolbar-button" nodeType={KEYS.code}>
              <Code2 className="chat-editor__toolbar-icon" />
            </MarkToolbarButton>
            <MarkToolbarButton className="chat-editor__toolbar-button" nodeType={KEYS.underline}>
              <Underline className="chat-editor__toolbar-icon" />
            </MarkToolbarButton>
          </ToolbarGroup>

          <ToolbarGroup className="chat-editor__toolbar-group">
            <LinkToolbarButton className="chat-editor__toolbar-button" />
            <AlignToolbarButton />
            <MediaToolbarButton nodeType={KEYS.img} />
          </ToolbarGroup>

          <div className="chat-editor__toolbar-status">
            <span className="chat-editor__toolbar-status-dot" />
            connected
          </div>
        </Toolbar>

        <EditorContainer className="chat-editor__editor-shell" variant="default">
          <Editor className="chat-editor__input" placeholder="Type your message..." variant="none" />
        </EditorContainer>
      </Plate>

      <footer className="chat-editor__footer">
        <div className="chat-editor__footer-left">
          <div className="chat-editor__menu-wrapper" ref={menuRef}>
            <button
              aria-expanded={isMenuOpen}
              aria-haspopup="menu"
              aria-label="More actions"
              className="chat-editor__action-button"
              onClick={() => setIsMenuOpen((previous) => !previous)}
              type="button"
            >
              <Plus className="chat-editor__action-icon" />
            </button>

            {isMenuOpen ? (
              <div aria-label="Editor actions" className="chat-editor__menu" role="menu">
                <button className="chat-editor__menu-item" role="menuitem" type="button">
                  File upload
                </button>
                <button className="chat-editor__menu-item" role="menuitem" type="button">
                  New chat
                </button>
              </div>
            ) : null}
          </div>

          <button aria-label="Use microphone" className="chat-editor__action-button is-mic" type="button">
            <img alt="" aria-hidden="true" className="chat-editor__mic-icon" src={micIcon} />
          </button>
        </div>

        <Button className="chat-editor__send-button" type="button" variant="default">
          Send
        </Button>
      </footer>
    </section>
  )
}
