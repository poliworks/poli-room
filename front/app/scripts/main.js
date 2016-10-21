
var appDiscovery = "/api/discovery";

function loadDiscovery(discoveryUrl) {
  $.ajax(discoveryUrl, {
    type: "GET",
  })
}

var Main = React.createClass({
  render: function () {
    return(
      <div classID="main">
        Main
      </div>)
  }
});

ReactDOM.render(<Main />, document.getElementById('content'));
