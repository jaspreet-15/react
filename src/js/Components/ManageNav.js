var React=require("react");

var ManageNav=React.createClass({
 render:function(){
   return(
   <div>
   <nav className="navbar navbar-default navbar-inverse">
   <div className="container-fluid">

   <div className="navbar-header">
   <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
   <span className="sr-only">Toggle navigation</span>
   <span className="icon-bar"></span>
   <span className="icon-bar"></span>
   <span className="icon-bar"></span>
   </button>
   <a className="navbar-brand" href="#">Gmail</a>
   </div>

   <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">


   <form className="navbar-form navbar-left">
   <div className="form-group">
     <input type="text" className="form-control" placeholder="Search" />
   </div>
   <button type="submit" className="btn btn-default">Submit</button>
   </form>
   <ul className="nav navbar-nav navbar-right">
   <li><a href="#">LogOut</a></li>
   <li className="dropdown">
     <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Profile <span className="caret"></span></a>
     <ul className="dropdown-menu">
       <li><a href="#">Settings</a></li>
       <li><a href="#">My account</a></li>
       </ul>
 </li>
   </ul>
   </div>
   </div>
   </nav>

    </div>
 );
 }

 });

module.exports=ManageNav;
