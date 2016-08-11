var React=require("react");

var GmailLeft1 = React.createClass({
  render: function(){
    return(
      <tr>
      <td>
      <button className="btn btn-success" onClick={this.props.labelData.name}>{this.props.labelData.name}</button>
      </td>
      </tr>
    );
  }
});
module.exports=GmailLeft1;
