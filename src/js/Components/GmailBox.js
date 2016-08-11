var React = require('react');

var Compose = require('./Compose');
var GmailLeft=require('./GmailLeft');
var ManageNav=require('./ManageNav');
var GmailRightSideChild=require('./GmailRightSideChild');
var GmailBox = React.createClass({
  getInitialState: function() {
    return ({labelData: [], inbox: [], allMessages: [], MessageDetail: []});
  },

  gmailLogin: function()
  {
    var acToken, tokenType, expiresIn;
    var OAUTHURL    =   'https://accounts.google.com/o/oauth2/v2/auth?';
    var VALIDURL    =   'https://www.googleapis.com/oauth2/v4/token?access_token=';
    var SCOPE       =   'https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send';
    var CLIENTID    =   '504450865581-6nrt4909i48gpl09t5uk7rf3oeq72tsk.apps.googleusercontent.com';
    var REDIRECT    =   'http://localhost:8085';
    var TYPE        =   'token';
    var _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
    var win         =   window.open(_url, "windowname1", 'width=800, height=600');

    var pollTimer   =   window.setInterval(function()
    {
      try
      {
        if (win.document.URL.indexOf(REDIRECT) != -1)
        {
          window.clearInterval(pollTimer);
          var url =   win.document.URL;
          acToken =   gup(url, 'access_token');
          tokenType = gup(url, 'token_type');
          expiresIn = gup(url, 'expires_in');
          localStorage.setItem('gToken',acToken);
          localStorage.setItem('gTokenType',tokenType);
          localStorage.setItem('gExprireIn',expiresIn);
          function gup(url, name) {
            name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
            var regexS = "[\\#&]"+name+"=([^&#]*)";
            var regex = new RegExp( regexS );
            var results = regex.exec( url );
            if( results == null )
            return "";
            else
            return results[1];
          }
          win.close();
        }
      }
      catch(e)
      {
        console.log(e);
      }
    }, 500);
    this.my_label();
    this.displayInbox();
  },


  my_label: function()
  {
    var accessToken = localStorage.getItem('gToken');
    $.ajax({
      url: 'https://www.googleapis.com/gmail/v1/users/jass.anttal3%40gmail.com/labels?key={AIzaSyDM-GN70PTxTCO9oictmMoU9ygAtTib16g}',
      dataType: 'json',
      type: 'GET',
      beforeSend: function (request)
      {
        request.setRequestHeader("Authorization", "Bearer "+accessToken);
      },
      success: function(data)
      {
        this.setState({labelData:data.labels});
        console.log("Helllo");
        console.log(data.labels);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)
    });
  },
  encode: function(subject) {
    var enc_subject = Utilities.base64Encode(subject, Utilities.Charset.UTF_8);
    return '=?utf-8?B?' + enc_subject + '?=';
  },

  displayInbox: function(){
    var accessToken = localStorage.getItem('gToken');
    $.ajax({
      url: 'https://www.googleapis.com/gmail/v1/users/jass.anttal3%40gmail.com/messages?labelIds=INBOX&maxResults=10&key={AIzaSyDM-GN70PTxTCO9oictmMoU9ygAtTib16g}',
      dataType: 'json',
      type: 'GET',
      beforeSend: function (request)
      {
        request.setRequestHeader("Authorization", "Bearer "+accessToken);
      },
      success: function(msg)
      {

        var display_data = msg.messages
        for(var key in display_data){
          var id = display_data[key].id;

          this.displayInboxMessages(id);
        }
        this.setState({allMessages:this.state.MessageDetail});
        this.state.MessageDetail=[];
        //console.log(id);

      }.bind(this),
      async: false,
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)

    });
  },

  displayInboxMessages: function(msg_id){
    var accessToken = localStorage.getItem('gToken');
    $.ajax({
      url: 'https://www.googleapis.com/gmail/v1/users/jass.anttal3%40gmail.com/messages/'+msg_id+'?key={AIzaSyDM-GN70PTxTCO9oictmMoU9ygAtTib16g}',
      dataType: 'json',
      type: 'GET',
      beforeSend: function (request)
      {
        request.setRequestHeader("Authorization", "Bearer "+accessToken);
      },
      success: function(inbox)
      {
        this.state.MessageDetail.push(inbox);
        // this.setState({inbox:inbox.messages});
      }.bind(this),
      async:false,
      error: function(xhr, status, err) {
        console.error(err.toString());
      }.bind(this)

    });
  },

  render: function(){
    return(

      <div>
      <ManageNav/>
      <div className="col-sm-2">
      <Compose/>
      </div>
      <div className="col-md-12">
      <button id="authorize-button" onClick={this.gmailLogin}
      className="btn btn-primary pull-right">Login</button>

      <div className="col-md-2">
      <GmailLeft labelData={this.state.labelData}/>
      </div>
      <div className="col-md-10">
      <GmailRightSideChild allMessagesData={this.state.allMessages}/>
      </div>
      </div>

      </div>

    );
  }
});
module.exports = GmailBox;
