var React = require('react');
var GmailRightSideChild=require('./GmailRightSideChild');
var GmailRightSide = React.createClass({

  getInitialState: function() {
      return {data: []};
    },
  gmailLogin: function()
  {
    var acToken, tokenType, expiresIn;
    var OAUTHURL    =   'https://accounts.google.com/o/oauth2/v2/auth?';
    var VALIDURL    =   'https://www.googleapis.com/oauth2/v4/token?access_token=';
    var SCOPE       =   'https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly';
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
                console.log("gToken.."+localStorage.getItem('gToken'));
                console.log("gTokenType.."+localStorage.getItem('gTokenType'));
                console.log("gExprireIn.."+localStorage.getItem('gExprireIn'));
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
    this.allLabels();
  },

  allLabels: function()
    {    that=this;
        var accessToken = localStorage.getItem('gToken');
        $.ajax({
         url: 'https://www.googleapis.com/gmail/v1/users/jass.anttal3%40gmail.com/messages?labelIds=INBOX&key={AIzaSyDM-GN70PTxTCO9oictmMoU9ygAtTib16g}',
         dataType: 'json',
         type: 'GET',
         beforeSend: function (request)
         {
           request.setRequestHeader("Authorization", "Bearer "+accessToken);
         },
         success: function(data)
         {
           that.setState({data:data.messages});
           console.log("hello");
           console.log(data);

         }.bind(this),
         error: function(xhr, status, err) {
           console.error(err.toString());
         }.bind(this)
      });

    },


render: function(){
  return(
    <div>
    <button id="authorize-button" onClick={this.gmailLogin}
                className="btn btn-primary pull-right">Login</button>

<GmailRightSideChild data ={this.state.data} />
    </div>



  );
}
});

module.exports=GmailRightSide;
