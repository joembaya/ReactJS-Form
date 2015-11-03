//Loading webcome message

    var HeadMymenu = React.createClass({
        
        render: function () {
          return ( 
           <div><a href='/index.htm' >HOME</a> | <a href=''> Signup </a> | <a href='http://www.athome.lu'> AtHomelu </a></div>
          );
        }
      });
      ReactDOM.render(
        <HeadMymenu />,
        document.getElementById('headermenuid')
      );


//Loading form
var abc=1;
var fldname="";
var fldfname="";
var fldemail="";
 
var successmsg=""; 
//Step one form

var StepOneForm = React.createClass({
    render: function() {
        return (
            <div><br / ><br /><fieldset id='firstfld' ref='firstfld'   > 
                <h2>Step 1</h2> 
                <br / >
                  
                <input name='name' type='text' id='nameid'  ref='name' placeholder='Name' defaultValue={fldname} /> 
                <span> </span> 
                <input type='button' name='next' id='currid' value='Next' onClick={this.nextStep}  />
              </fieldset></div>
        );
    }, nextStep: function(e) {
        e.preventDefault()
            fldname= this.refs.name.getDOMNode().value
            //alert(fldname)
            if(fldname!="" && fldname!==null)
            {
               abc+=1
               ReactDOM.render( <StepTwoForm /> , document.getElementById('container')); 
            }            
  },
     getInitialState: function() {
         return {
             name: ''
         }
     }
});

//Render Second Fieldset
var StepTwoForm = React.createClass({
    render: function() {
        return (
                <div><br / ><br /><fieldset id='sndfld' class='' style={{display: 'block'}} ref='sndfld'>
                    <h2>Step 2</h2> 
                    <br / >
                    <input name='fname' type='text' ref='fname' placeholder='First name' defaultValue={fldfname}/> 
                    <span> </span> 
                    <input type='button' name='next' value='Next' id='fstbckid' onClick={this.nextStep}  /><br / ><br />   
                    <input type='button' name='next' value='Back' id='sndid' ref='myFname' onClick={this.backStep}  />
                    
                </fieldset></div>
        );
    }, nextStep: function(e) {
    e.preventDefault()

    
      fldfname = this.refs.fname.getDOMNode().value
    
     if(fldfname!=="" && fldfname!==null)
     {
        abc+=1
        ReactDOM.render( <StepThreeForm /> , document.getElementById('container'));
     }
    
  }
   , backStep: function(e) {
    e.preventDefault()
    ReactDOM.render( <StepOneForm /> , document.getElementById('container'));
  }
});

//Render thrird fieldset

var StepThreeForm = React.createClass({
    render: function() {
        return (
              <div><form method='POST' action='./api/v1/signup' onSubmit={this.handlingSubmit}><br / ><br /><fieldset id='trdfld'  ref='trdfld'>
                <h2>Step 3</h2> 
                <br / >
                <input name='email' type='email'  placeholder='Email' ref='myEmail' defaultValue={fldemail}  /> <span> </span> 
                <input type='submit' name='submit'  value='Validate' onClick={this.handlingSubmit}  />
                <br / ><br />
                <input type='button' name='next'  value='Back' id='thrdidbck' onClick={this.backStep} />
                  
              </fieldset></form></div>
        );
    }
    , handlingSubmit: function(e) {
    e.preventDefault() //Processing form to be sent
    fldemail=this.refs.myEmail.getDOMNode().value
    
    if(fldemail!="" && fldemail!=null)
    {       
                 
          
                e.preventDefault()
                 
                var data = {
                    name: fldname,
                    fname: fldfname,
                    email: fldemail
                }
 
                var http = new XMLHttpRequest();
                var url = "../api/v1/signup";
                var params = "name="+fldname+"&fname="+fldfname+"&email="+fldemail;
                http.open("POST", url, true);
                
                 
                http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                http.setRequestHeader("Content-length", params.length);
                http.setRequestHeader("Connection", "close");
                
                http.onreadystatechange = function() {//Call a function when the state changes.
                    if(http.readyState == 4 && http.status == 200) {
                        successmsg= removeStrChar(http.responseText); 
                        ReactDOM.render( <SuccessMessage /> , document.getElementById('container'));
                    }
                }
                http.send(params);
    }
    else
    {
        alert("Please enter an email adress");
    }
    
  }
,

backStep: function(e) {
    e.preventDefault()
    fldemail=this.refs.myEmail.getDOMNode().value
    ReactDOM.render( <StepTwoForm /> , document.getElementById('container'));
  }
});

var SuccessMessage = React.createClass({
    render: function() {
        return (
            <div><br / ><br /> 
                <h3>Thanks for your registration, your details are following:</h3> 
                <br / >
                  
                <span>{successmsg} </span>  <br /><br />
                <input type='button' name='next' id='currid' value='Back to home' onClick={this.redirectMe}  />
               </div>
        );
    }, redirectMe: function(e) {
        e.preventDefault() 
        window.location.href = '../index.htm';       
  }
});
 
//Spliting POST data
function removeStrChar(str){
    str=str.trim();
    str =str.substring(str.indexOf("{") + 1, str.indexOf("}"));
    var res = str.split(", ");
    var resname =res[0].split(":");
    var resfname =res[1].split(":");
    var resfemail =res[2].split(":");
    return resname[1].replace(/'/g, "")+" "+resfname[1].replace(/'/g, "")+" "+resfemail[1].replace(/'/g, "");
  }

//Rendering first Components
 if(abc==1)
 {
    ReactDOM.render( <StepOneForm /> , document.getElementById('container'));
 }
 