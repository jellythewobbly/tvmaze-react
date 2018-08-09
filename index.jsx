class Home extends React.Component {
	render() {
		return (
			<div className="container text-center">
				<h1 className="my-2">TVMaze React</h1>
				<Search />
			</div>
		);
	}
}

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			placeholder: 'Enter a Movie Title...',
			inputValue: '',
			showResults: false
		};
	}

	handleInputChange = event => {
		this.setState({ inputValue: event.target.value });
	};

	handleSubmit = () => {
		this.setState({
			inputValue: '',
			showResults: true
		});
	};

	searchAgain = () => {
		this.setState({
			showResults: false
		});
	};

	render() {
		return (
			<div>
				{!this.state.showResults && (
					<React.Fragment>
						<input
							className="form-control w-50 mx-auto my-2"
							name="textBox"
							placeholder={this.state.placeholder}
							value={this.state.inputValue}
							onChange={this.handleInputChange}
						/>
						<input
							className="btn btn-primary w-25 mx-auto my-2"
							type="submit"
							onClick={this.handleSubmit}
							value="Search"
						/>
					</React.Fragment>
				)}

				{this.state.showResults && (
					<React.Fragment>
						<input
							className="btn btn-primary w-25 mx-auto my-2"
							type="submit"
							onClick={this.searchAgain}
							value="Search Again"
						/>
						<Results />
					</React.Fragment>
				)}
			</div>
		);
	}
}

class Results extends React.Component {
	render() {
		let shows = results.map(show => {
			return (
				<Result
					key={show.show.id}
					img={show.show.image.medium}
					name={show.show.name}
				/>
			);
		});

		return <div className="row my-5">{shows}</div>;
	}
}

class Result extends React.Component {
	render() {
		return (
			<div className="col-lg-2 mx-2">
				<div className="card" style={{ width: '12rem' }}>
					<img className="card-img-top" src={this.props.img} />
					<h4 className="card-title">{this.props.name}</h4>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Home />, document.getElementById('root'));
