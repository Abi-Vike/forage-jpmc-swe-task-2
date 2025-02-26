import React, {Component} from 'react';
import DataStreamer, {ServerRespond} from './DataStreamer';
import Graph from './Graph';
import './App.css';
import {setInterval} from "timers";

/**
 * State declaration for <App />
 */
// make showGraph of boolean type - conditional
interface IState {
    data: ServerRespond[],
    showGraph: boolean
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      // showGraph should be hidden initially and only runs if user clicks start streaming button
      data: [],
      showGraph : false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    if (this.state.showGraph){
        return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data every 100ms
   */
  getDataFromServer() {
    let x = 0;
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
                this.setState({
                    data: serverResponds,
                    showGraph : true,
                 });
            });
            x++;
            if (x > 1000) {
                clearInterval(interval);
            }
        }, 100);
    }

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // made it get data from the server continuously
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
