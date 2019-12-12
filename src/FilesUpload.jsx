import React, { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

const setBackgroundColor = (messageType) => {
  if(messageType === 'success'){
    return 'background-color: #e7f7e7;'
  } else if(messageType === 'error'){
    return 'background-color: #f7e7e7;'
  } else {
    return 'background-color: #e7e7e7;'
  }
};

const setColor = (messageType) => {
  if(messageType === 'success'){
    return 'color: #8ecf99;'
  } else if(messageType === 'error'){
    return 'color: #cf8e99;'
  } else {
    return 'color: #7f8e99;'
  }
};

const FilesUploadPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  border-radius: 12px;
  ${props => setBackgroundColor(props.type)}
  ${props => setColor(props.type)}
  font-size: 24px;
  opacity: 1;
  text-align: center;
  line-height: 1.4;

  .area__icon {
    font-size: 64px;
    margin-top: 20px;
  }
`;

const FilesUpload = (props) => {
  // 操作DOM: useRef()
  // useRef()返回一个可变的ref对象
  // ref对象的 current 属性被初始化为传递的参数
  // 返回的对象将存留在整个组件的生命周期中
  const drop = useRef(); // 落下层
  const drag = useRef(); // 拖拽活动层
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState({ show: false, text: null, type: null });

  // 原本EventListener的事件需要在componentDidMount添加，在componentWillUnmount中销毁
  // 可以将添加(componentDidMount)和移除(componentWillUnmount)的逻辑放在一起
  useEffect(() => {
    // useRef 的 drop.current 取代了 ref 的 this.drop
    drop.current.addEventListener('dragover', handleDragOver);
    drop.current.addEventListener('drop', handleDrop);
    drop.current.addEventListener('dragenter', handleDragEnter);
    drop.current.addEventListener('dragleave', handleDragLeave);
    return () => {
      drop.current.removeEventListener('dragover', handleDragOver);
      drop.current.removeEventListener('drop', handleDrop);
      drop.current.removeEventListener('dragenter', handleDragEnter);
      drop.current.removeEventListener('dragleave', handleDragLeave);
    };
  });

  // 用来确定放置目标（FilesUploadPlaceholder节点（DOM））是否接受放置
  const handleDragEnter = (e) => {
    e.preventDefault(); //阻止事件的默认行为(如在浏览器打开文件)
    e.stopPropagation(); // 阻止事件冒泡
    e.target !== drag.current && setDragging(true)
  };

  // 拖拽上传的文件离开FilesUploadPlaceholder节点（DOM）的范围外移动时
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target === drag.current && setDragging(false)
  };

  // 拖拽上传的文件在FilesUploadPlaceholder节点（DOM）的范围内移动时
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // 控制drop函数
  // 完成拖拽（落下）, 并用来确定给用户显示怎样的反馈信息
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false)
    const { count, formats } = props;
    const files = [...e.dataTransfer.files];
    if (count && count < files.length) {
        showMessage(`Sorry, You only can upload ${count} file`, 'error', 2000);
        return;
    }
    if (formats && files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
        showMessage(`Sorry, You only can upload ${formats.join(', ')} file`, 'error', 2000);
        return;
    }
    if (files && files.length) {
        showMessage('Success！', 'success', 1000);
        props.onUpload(files);
    }
  };

  // 控制显示文本
  const showMessage = (text, type, timeout) => {
    setMessage({ show: true, text, type})
    setTimeout(() => setMessage({ 
      show: false,
      text: null,
      type: null, 
    }), timeout);
  };

  return (
    <div
      ref={drop}
      className='FilesUpload'
      style={{position: 'relative'}}
    >
      {message.show && (
        <FilesUploadPlaceholder type={message.type}>
          {message.text}
          <span
            role='img'
            aria-label='emoji'
            className='area__icon'
          >
            {message.type === 'error' ? <>&#128546;</> : <>&#128536;</>}
          </span>
        </FilesUploadPlaceholder>
      )}
      {dragging && (
        <FilesUploadPlaceholder ref={drag}>
          Start upload
          <span
            role='img'
            aria-label='emoji'
            className='area__icon'
          >
            &#128541;
          </span>
        </FilesUploadPlaceholder>
      )}
      {props.children}
    </div>
  );
}

FilesUpload.propTypes = {
  onUpload: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  count: PropTypes.number,
  formats: PropTypes.arrayOf(PropTypes.string)
}

export default FilesUpload;