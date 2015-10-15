_.mixin({
  containsArray: function(arrays, array) {
    return _.some(arrays, function(value) {
      return _.isEqual(value, array);
    });
  }
});

class Menu extends React.Component {
  render() {
    const styles = {
      menu: {
        backgroundColor: '#EFEFEF',
        display: 'block',
        width: '150px',
        height: '300px',
        border: '1px solid #CCC',
        float: 'left',
        margin: '20px'
      },
      h3: {
        margin: '12px'
      }
    }
    return (
      <div id='menu' style={styles.menu}>
        <h3 style={styles.h3}>Player: {this.props.turn}</h3>
      </div>
    );
  }
}

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      checked: false 
    } 

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    if( !this.state.checked ){
      this.setState({ 
        checked: true,
        turn: this.props.turn
      });
      this.props.changeTurn();
    }
  } 

  render() {
    const styles = {
      width: '150',
      height: '150',
      outline: '1px solid #b4b4b4',
      float: 'left',
      lineHeight: '140px',
      textAlign: 'center',
      fontSize: '100px'
    } 
  
    return (
      <div style={styles} onClick={this.handleClick}>
        {this.state.turn}
      </div>
    );
  }
}

class Game extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = { 
      turn: 'x',
      winnables: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ]      
    }

    this.changeTurn = this.changeTurn.bind(this)
  }

  checkBoard(){
    var xs = [];
    var os = [];
    for( var ref in this.refs ){
      var square = this.refs[ref.toString()].state.turn;
      if (square == "x"){
        xs.push( parseInt(ref) );
      } else if ( square == "o" ){
        os.push( parseInt(ref) );
      }
    }
    for( var i = 0; i < this.state.winnables.length; i++ ){
      var winnable = this.state.winnables[i];

      if (_.containsArray(xs, winnable)) {
        return 'x';
      } else if (_.containsArray(os, winnable)) {
        return 'o';
      } 
    }

    return '';
  }

  changeTurn() {
    this.setState({
      turn: this.state.turn == "x" ? "o" : "x",
      winner: this.checkBoard()
    });
  }

  render() {
    const styles = {
      width: '450',
      height: '450',
      padding: '0',
      margin: '0',
      float: 'left',
      outline: '1px solid #b4b4b4',
      margin: '20 0 0 20'
    } 
    var cells = [];
    for (var i = 0; i < 9; i++) {
      cells.push(
        <Cell ref={i} turn={this.state.turn} changeTurn={this.changeTurn}/>
      );
    };

    return (
      <div>
        <div id='game' style={styles}>{cells}</div>
        <Menu turn={this.state.turn}/>
      </div>
    );
  }
}

ReactDOM.render(<Game/>, document.getElementById('content')); 
