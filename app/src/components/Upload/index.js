import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import { DropContainer, UploadMessage } from './styles';

export default class Upload extends Component {

	renderDragMessage = (isDragActive, isDragReject) => {
		switch (true) {
			case !isDragActive:
				return <UploadMessage> Arraste uma imagem de firmware aqui ...</UploadMessage>;
			case isDragReject:
				return <UploadMessage type="error"> Formato nao suportado. Exemplo: firmware.bin (1)</UploadMessage>;
			default:
				return <UploadMessage type="success"> Solte o arquivo .bin</UploadMessage>;
		}
	};

	render() {
		const { onUpload } = this.props;

		return (
			<Dropzone multiple={false} accept="application/octet-stream" onDropAccepted={onUpload}>
				{({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
					<DropContainer
						{...getRootProps()}
						isDragActive={isDragActive}
						isDragReject={isDragReject}>

						<input {...getInputProps()} />
						{this.renderDragMessage(isDragActive, isDragReject)}
					</DropContainer>
				)}
			</Dropzone>
		);
	}
}
