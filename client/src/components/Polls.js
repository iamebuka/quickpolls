import React, {Component} from 'react'
import {app} from '../base'




class Polls extends Component{
    state={
        message: "test",
        options:[["hello", 0],["", 0]],
        min: 1,
        current:1,
        max:5,
        generatedPollurl:""
    }
resetApp =() =>{
    this.setState({
        message: "",
        options:[["", 0],["", 0]],
    })
}
onChange =(e)=>{
this.setState({message: e.target.value})
}
ontextChange =(e)=>{
   /*  var array = [...this.state.options]; 
    array.splice(e.target.dataset.key,1)
    console.log(array)
    this.setState({options: array })
    console.log(this.state.options) */
    var options = [...this.state.options]
    options[e.target.dataset.key][0] = e.target.value
    this.setState({
        options: options
    })


}
onSubmitPoll=(e)=>{
var key =  app.database().ref().child("poll").push().key

//var poll ={options:{}}
var poll ={}
poll.message = this.state.message
poll.options = this.state.options
/* this.state.options.map((item)=>{
poll.options[item[0]] = 0
}) */

var updates = {};
updates['/poll/' + key] = poll;
return app.database().ref().update(updates).then(()=>{
    this.resetApp()
    this.setState({
        generatedPollurl: key
    })
});

}
onLastChange =(e)=>{
    e.persist()
//let parent = document.querySelector()
console.log(e)
console.log("%c"+e.target.dataset.key, "color: green")
/* e.target.parentElement.innerHTML += ""
console.log(e.target.parentElement.innerHTML) */
this.setState({options: [...this.state.options,[e.target.value,0]]})
e.target.value =""
}
    render(){
        return(
          <div>
           <input name="message" value={this.state.message} onChange={this.onChange}/>
           <div id="parent">
           {this.state.options.map((item,index) => {
            
        
            return <input data-key={`${index}`} onChange={this.ontextChange}  value={this.state.options[`${index}`][0]} required autoFocus/>
            

           }   
                             
           )}
           <input onChange={this.onLastChange}/>
          </div>
          <button onClick={this.onSubmitPoll}>Submit</button>
          {this.state.generatedPollurl.length > 1 ? <a href={"/poll/"+`${this.state.generatedPollurl}`}>visit poll </a> : null}

          </div>

        )
    }
}

export default Polls