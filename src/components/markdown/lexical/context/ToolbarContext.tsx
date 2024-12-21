/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {ElementFormatType} from 'lexical';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Code, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, List, ListOrdered, ListTodo, Sheet, Sigma, Text, TextQuote } from 'lucide-react';

export const MIN_ALLOWED_FONT_SIZE = 8;
export const MAX_ALLOWED_FONT_SIZE = 72;
export const DEFAULT_FONT_SIZE = 15;

const rootTypeToRootName = {
  root: 'Root',
  table: 'Table',
};

export const blockTypeToBlockName = {
  paragraph: '正文',
  h1: '一级标题',
  h2: '二级标题',
  h3: '三级标题',
  h4: '四级标题',
  h5: '五级标题',
  h6: '六级标题',
  bullet: '无序列表',
  number: '有序列表',
  quote: '引用',
  check: '待办列表',
  code: '代码块',
  table: '表格',
  equation: '公式',
};

export const blockTypeToBlockIcon: Record<string, ReactNode> = {
  paragraph: <Text size={16} />,
  h1: <Heading1 size={16} />,
  h2: <Heading2 size={16} />,
  h3: <Heading3 size={16} />,
  h4: <Heading4 size={16} />,
  h5: <Heading5 size={16} />,
  h6: <Heading6 size={16} />,
  bullet: <List size={16} />,
  number: <ListOrdered size={16} />,
  quote: <TextQuote size={16} />,
  check: <ListTodo size={16} />,
  code: <Code size={16} />,
  table: <Sheet size={16} />,
  equation: <Sigma size={16} />,
};

const INITIAL_TOOLBAR_STATE = {
  bgColor: '#fff',
  blockType: 'paragraph' as keyof typeof blockTypeToBlockName,
  canRedo: false,
  canUndo: false,
  codeLanguage: '',
  elementFormat: 'left' as ElementFormatType,
  fontColor: '#000',
  fontFamily: 'Arial',
  // Current font size in px
  fontSize: `${DEFAULT_FONT_SIZE}px`,
  // Font size input value - for controlled input
  fontSizeInputValue: `${DEFAULT_FONT_SIZE}`,
  isBold: false,
  isCode: false,
  isImageCaption: false,
  isItalic: false,
  isLink: false,
  isRTL: false,
  isStrikethrough: false,
  isSubscript: false,
  isSuperscript: false,
  isUnderline: false,
  rootType: 'root' as keyof typeof rootTypeToRootName,
};

type ToolbarState = typeof INITIAL_TOOLBAR_STATE;

// Utility type to get keys and infer value types
type ToolbarStateKey = keyof ToolbarState;
type ToolbarStateValue<Key extends ToolbarStateKey> = ToolbarState[Key];

type ContextShape = {
  toolbarState: ToolbarState;
  updateToolbarState<Key extends ToolbarStateKey>(
    key: Key,
    value: ToolbarStateValue<Key>,
  ): void;
};

const Context = createContext<ContextShape | undefined>(undefined);

export const ToolbarContext = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [toolbarState, setToolbarState] = useState(INITIAL_TOOLBAR_STATE);
  const selectionFontSize = toolbarState.fontSize;

  const updateToolbarState = useCallback(
    <Key extends ToolbarStateKey>(key: Key, value: ToolbarStateValue<Key>) => {
      setToolbarState((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  useEffect(() => {
    updateToolbarState('fontSizeInputValue', selectionFontSize.slice(0, -2));
  }, [selectionFontSize, updateToolbarState]);

  const contextValue = useMemo(() => {
    return {
      toolbarState,
      updateToolbarState,
    };
  }, [toolbarState, updateToolbarState]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useToolbarState = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useToolbarState must be used within a ToolbarProvider');
  }

  return context;
};