import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import GlobalStyle from './styles/global';
import { Container, Content } from './styles/app';

import Upload from './components/Upload';
import FileList from './components/FileList';

import api from './services/api';

class App extends Component {

	state = {
		uploadedFiles: [],
	};

	async componentDidMount() {
		const response = await api.get('/images/project/esp_01m');

		this.setState({
			uploadedFiles: response.data.map(file => ({
				id: uniqueId(),
				name: file,
				uploaded: true
			}))
		});
	}

	handleUpload = files => {
		const uploadedFiles = files.map(file => ({
			file,
			id: uniqueId(),
			name: file.name,
			readableSize: filesize(file.size),
			progress: 0,
			uploaded: false,
			error: false,
			project: 'project',
			board: 'esp_01m',
			version: '6_1_4',
			url: null,
		}));

		this.setState({
			uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
		});

		uploadedFiles.forEach(this.processUpload);
	};

	updateFileProgress = (id, data) => {
		this.setState({
			uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
				return id === uploadedFile.id ? { ...uploadedFile, ...data } : uploadedFile;
			})
		});
	};

	processUpload = (firmware) => {
		let data = new FormData();

		data.append('project', firmware.project);
		data.append('board', firmware.board);
		data.append('version', firmware.version);
		data.append('firmware', firmware.file, firmware.name);

		api.post('/deploy', data, {
			headers: { 'Content-Type': 'multipart/form-data' },
			onUploadProgress: e => {
				const progress = parseInt(Math.round((e.loaded * 100) / e.total));
				this.updateFileProgress(firmware.id, { progress });
			}
		}).then(response => {
			this.updateFileProgress(firmware.id, {
				uploaded: true,
				url: response.data.path
			})
		}).catch(() => this.updateFileProgress(firmware.id, { error: true }));
	};

	handleDelete = async (id) => {
		this.setState({
			uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
		});
	};

	render() {
		const { uploadedFiles } = this.state;

		return (
			<Container>
				<Content>
					<Upload onUpload={this.handleUpload} />
					{!!uploadedFiles.length && (
						<FileList files={uploadedFiles} onDelete={this.handleDelete}/>
					)}
				</Content>
				<GlobalStyle />
			</Container>
		);
	}
}

export default App;