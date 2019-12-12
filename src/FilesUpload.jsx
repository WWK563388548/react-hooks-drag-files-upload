import React, { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FilesUploadContainer = styled.div`
    width: 300px;
    height: 200px;
    padding: 50px;
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

const FilesUpload = (props) => {
    return (
        <FilesUploadContainer>
            Upload files?
            <span
                role='img'
                aria-label='emoji'
                className='area__icon'
            >
                &#128526;
            </span>
        </FilesUploadContainer>
    );
}

FilesUpload.propTypes = {
    onUpload: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    count: PropTypes.number,
    formats: PropTypes.arrayOf(PropTypes.string)
}

export default FilesUpload;