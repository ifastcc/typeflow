'use client';

import { useState, useEffect } from 'react';

const TypingPractice = ({ text: initialText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedChars, setTypedChars] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentWordStart, setCurrentWordStart] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [hasWordError, setHasWordError] = useState(false);
  const [animationType, setAnimationType] = useState('gentle-bounce');
  const [text, setText] = useState(initialText);

  // 判断字符是否需要自动跳过
  const shouldSkipChar = (char) => {
    return [' ', '\t', '\n', '\r'].includes(char);
  };

  // 获取当前单词的完整内容
  const getCurrentWord = () => {
    let endIndex = currentIndex;
    while (endIndex < text.length && !shouldSkipChar(text[endIndex])) {
      endIndex++;
    }
    return text.slice(currentWordStart, endIndex);
  };

  // 自动跳过特殊字符的函数
  const skipSpecialChars = (index) => {
    let nextIndex = index;
    while (nextIndex < text.length && shouldSkipChar(text[nextIndex])) {
      setTypedChars(prev => [...prev, true]); // 特殊字符自动标记为正确
      nextIndex++;
    }
    // 更新当前索引和单词起始位置
    setCurrentIndex(nextIndex);
    setCurrentWordStart(nextIndex);
    // 清空当前输入和错误状态
    setCurrentInput('');
    setHasWordError(false);
    return nextIndex;
  };

  useEffect(() => {
    // 初始化时处理特殊字符
    if (currentIndex === 0 && text) {
      const nextIndex = skipSpecialChars(0);
      setCurrentIndex(nextIndex);
      setCurrentWordStart(nextIndex);
    }
  }, [text]); // 添加 text 作为依赖项

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (currentIndex >= text.length) return;

      // 如果当前单词有错误，阻止继续输入
      if (hasWordError) {
        e.preventDefault();
        return;
      }

      // 预处理：在单词开头时忽略特殊字符输入
      if (currentInput.length === 0 && shouldSkipChar(e.key)) {
        e.preventDefault();
        return;
      }

      const currentWord = getCurrentWord();
      const newInput = currentInput + e.key;
      
      // 实时更新输入内容
      setCurrentInput(newInput);
      
      // 检查字符是否正确（即使后续可能出错也要记录）
      const isCorrect = e.key.toLowerCase() === text[currentIndex].toLowerCase();
      setTypedChars(prev => [...prev, isCorrect]);
      setCurrentIndex(prev => prev + 1);

      // 检查是否完成当前单词
      if (newInput.length === currentWord.length) {
        // 最终检查整个单词是否正确
        if (newInput.toLowerCase() !== currentWord.toLowerCase()) {
          setHasWordError(true);
        } else {
          // 正确时跳过特殊字符
          const nextIndex = currentWordStart + currentWord.length;
          const newIndex = skipSpecialChars(nextIndex);
          setProgress((newIndex) / text.length * 100);
        }
      }
    };

    const handleKeyDown = (e) => {
      // 处理退格键
      if (e.key === 'Backspace') {
        e.preventDefault();
        
        // 允许在以下情况回退：
        // 1. 当前单词有输入内容
        // 2. 当前处于错误状态（即使没有输入内容）
        if (currentInput.length > 0 || hasWordError) {
          // 计算新的输入内容和索引
          const newInput = currentInput.slice(0, -1);
          const newIndex = currentWordStart + newInput.length;
          
          // 更新状态
          setCurrentIndex(Math.max(currentWordStart, newIndex));
          setTypedChars(prev => prev.slice(0, -1));
          setProgress((newIndex) / text.length * 100);
          setCurrentInput(newInput);
          setHasWordError(false);
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, text, currentWordStart, currentInput, hasWordError]);

  // 新增文件导入处理函数
  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newText = event.target.result;
      // 重置所有状态
      setText(newText);
      setCurrentIndex(0);
      setTypedChars([]);
      setProgress(0);
      setCurrentWordStart(0);
      setCurrentInput('');
      setHasWordError(false);
      // 在下一个事件循环中处理特殊字符
      setTimeout(() => skipSpecialChars(0), 0);
    };
    reader.readAsText(file);
  };

  const renderText = () => {
    return text.split('').map((char, index) => {
      let className = 'text-gray-400'; // 未输入的字符
      
      // 只显示到最后一个正确字符的位置
      if (index < currentIndex) {
        className = typedChars[index] ? 'text-green-500' : 'text-red-500';
      }
      // 当前输入位置（可能包含错误）
      if (index === currentIndex) {
        if (hasWordError) {
          className = 'bg-red-200 text-black font-bold';
        } else {
          // 根据设置选择动画效果
          const animation = animationType === 'none' ? '' : 
                          animationType === 'bounce' ? 'animate-bounce' : 
                          'animate-gentle-bounce';
          className = `text-gray-400 inline-block ${animation}`;
        }
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* 设置面板 */}
      <div className="mb-4 flex justify-between">
        {/* 新增文件导入按钮 */}
        <label className="px-3 py-1 border rounded-lg shadow-sm text-sm cursor-pointer 
                        hover:bg-gray-50 transition-colors">
          📁 导入文本
          <input 
            type="file" 
            accept=".txt" 
            onChange={handleFileImport}
            className="hidden"
          />
        </label>
        
        <select 
          value={animationType}
          onChange={(e) => setAnimationType(e.target.value)}
          className="px-3 py-1 border rounded-lg shadow-sm text-sm"
        >
          <option value="none">无动画</option>
          <option value="gentle-bounce">温和跳动</option>
          <option value="bounce">明显跳动</option>
        </select>
      </div>

      {/* 当前输入显示框 - 改为固定高度 */}
      <div className="h-16 flex justify-center items-center mb-4">
        <div className={`inline-flex items-center justify-center px-4 h-10 min-w-[120px] transition-all duration-300 
          ${hasWordError 
            ? 'bg-red-100 text-red-800' 
            : 'bg-blue-100 text-blue-800 animate-glow'
          } rounded-full text-base shadow-sm`}>
          <span className="truncate">{currentInput}</span>
          {hasWordError && <span className="ml-2 shrink-0">❌ 单词输入有误</span>}
        </div>
      </div>
      
      <div className="mb-8 text-xl leading-relaxed whitespace-pre-wrap">
        {renderText()}
      </div>
      
      <div className="fixed bottom-8 left-0 right-0">
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">
              进度: {Math.round(progress)}%
            </div>
            <div className="text-lg font-semibold">
              正确率: {typedChars.length > 0 
                ? Math.round((typedChars.filter(Boolean).length / typedChars.length) * 100)
                : 100}%
            </div>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingPractice; 