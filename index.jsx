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
			showResults: false,
			movies: []
		};
	}

	handleInputChange = event => {
		this.setState({ inputValue: event.target.value });
	};

	searchAgain = () => {
		this.setState({
			showResults: false
		});
	};

	clickHandler = async () => {
		let response = await fetch(
			'http://api.tvmaze.com/search/shows?q=' + this.state.inputValue
		);
		let data = await response.json();
		this.setState({
			movies: data,
			showResults: true,
			inputValue: ''
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
							onClick={this.clickHandler}
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
						<Results movies={this.state.movies} />
					</React.Fragment>
				)}
			</div>
		);
	}
}

class Results extends React.Component {
	render() {
		let shows = this.props.movies.map(show => {
			return (
				<Result
					key={show.show.id}
					img={
						show.show.image
							? show.show.image.medium
							: 'https://picsum.photos/210/295'
					}
					name={show.show.name}
				/>
			);
		});

		return (
			<div className="row my-5 d-flex justify-content-around">{shows}</div>
		);
	}
}

class Result extends React.Component {
	render() {
		return (
			<div className="col-2 mx-1 my-2 p-0">
				<div className="card" style={{ width: 'fit-content' }}>
					<img
						className="card-img-top"
						src={this.props.img}
						alt={this.props.name}
					/>
					<h4 className="card-title">{this.props.name}</h4>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Home />, document.getElementById('root'));
