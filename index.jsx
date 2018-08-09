class App extends React.Component {
    render() {
        return (
            <div className="container text-center">
                <h1 className="my-2">TV MAZE</h1>
                <Input />
            </div>
        )
    }
}

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: 'Search Here',
            inputValue: '',
            showResults: false
        };
    }

    handleInputChange = event => {
        this.setState({inputValue : event.target.value});
    }

    handleSubmit = () => {
        this.setState({
            inputValue: '',
            showResults: true
        });
    }

    render() {
        return (
            <div>
                <input className="form-control w-50 mx-auto my-2" name="textBox" placeholder={this.state.placeholder} value={this.state.inputValue} onChange={this.handleInputChange} />
                <input className="btn btn-primary w-25 mx-auto my-2" type="submit" onClick={this.handleSubmit} value="Search" />
                {this.state.showResults &&
                <QueryResults />
                }
            </div>
        );
    }
}

class QueryResults extends React.Component {
    render() {
        let shows = results.map(show => {
            return (
                <div className="col-lg-2 mx-2" key={show.show.id}>
                    <div className="card" style={{width: '12rem'}}>
                    <img className="card-img-top" src={show.show.image.medium} />
                    <h4 className="card-title">{show.show.name}</h4>
                    </div>
                </div>
            );
        });
    
        return (
            <div className="row my-5">{shows}</div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));