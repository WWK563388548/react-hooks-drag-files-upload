import React, { useState } from 'react';
import styled from 'styled-components';
import FilesUpload from './FilesUpload';

const FilesUploadArea= styled.div`
    width: 100%;
    height: 100%;
    // padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
    font-size: 24px;
    color: #555555;
    border: 2px #c3c3c3 dashed;
    border-radius: 12px;

    .area__icon {
        font-size: 64px;
        margin-top: 20px;
    }
`;

const App = () => {

  const [uploadingFiles, setUploadingFiles] = useState([]);
  // 拖拽完成处理事件
  const onUpload = (files) => {
    console.log(files);
    setUploadingFiles(files)
  };

  return (
    <div>
        <FilesUpload
          onUpload={onUpload}
          count={10} // 数量控制
          formats={['jpg', 'png', 'pdf']} // 文件类型
        >
          <FilesUploadArea>
            Upload files?
            <span
                role='img'
                aria-label='emoji'
                className='area__icon'
            >
                &#128526;
            </span>
          </FilesUploadArea> 
        </FilesUpload>

        {uploadingFiles && uploadingFiles.map(file => {
          return <div key={file.name}>{file.name}</div>
        })}
    </div>
  );
}

export default App;
