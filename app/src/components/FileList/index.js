import React from 'react';

import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdFileDownload } from 'react-icons/md';
import { Container, FileInfo, Preview } from './styles';

const FileList = ({ files, onDelete }) => (
  <Container>
    {files.map(uploadedFile => (
      <li key={uploadedFile.id}>
        <FileInfo>
          <Preview src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDuCahNj9qAZWHDoKcK0jIKUV93VH1TYlQGlTMvxFk4_wt_KGu"} />
          <div>
            <strong>{uploadedFile.name}</strong>
            <span> {uploadedFile.readableSize} {uploadedFile.url && <button onClick={() => onDelete(uploadedFile.id)}> Excluir </button>} </span>
          </div>
        </FileInfo>

        <div>
          {!uploadedFile.uploaded && !uploadedFile.error && (
            <CircularProgressbar
              styles={{
                root: { width: 30 },
                path: { stroke: "#FF4D00" }

              }}
              strokeWidth={10}
              value={uploadedFile.progress} />
          )}

          {uploadedFile.url && (
            <a href={uploadedFile.url} target="_blank" rel="noopener noreferrer">
              <MdFileDownload style={{ marginRight: 8 }} size={24} color="#222" />
            </a>
          )}

          {uploadedFile.uploaded && <MdCheckCircle size={24} color="#FF4D00" />}
          {uploadedFile.error && <MdError size={24} color="#e57878" />}
        </div>

      </li>

    ))}
  </Container>
);

export default FileList;
