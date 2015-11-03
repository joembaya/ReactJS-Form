
//Loading webcome message

    var Headmymenu = React.createClass({
        
        render: function () {
          return ( 
           <div id='myHomeMenuid'><a href='' >HOME</a> | <a href='signup/index.htm'> Signup </a> | <a href='http://www.athome.lu'> AtHomelu </a></div>
          );
        }
      });
      ReactDOM.render(
        <Headmymenu />,
        document.getElementById('headermenuid')
      );
      
      var Welcomestr = React.createClass({
        
        render: function () {
          return ( 
           <h1>Welcome</h1>
          );
        }
      });
      ReactDOM.render(
        <Welcomestr />,
        document.getElementById('container') 
      );