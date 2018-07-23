import React from 'react';
import Slider from '@material-ui/lab/Slider';
import { Icon, Input, TextField } from "@material-ui/core"
import './npoll.css'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { Button } from '@material-ui/core';
import Navigation from './Navigation';
import {Link} from 'react-router-dom'

import { CirclePicker } from 'react-color';
import FontPicker from 'font-picker-react'
class Npoll extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ui: {
                show_theme_pane: false,
                poll_preview: false,
                poll_success:false
            },
            poll_id: null,
            poll_category: "",
            polls: [{
                type: "default",
                question: "hello",
                options: ["john", "emeka", "james"],
                value: "",

            }
            ],
            poll_theme: {
                color: "#000",
                font: "Open Sans",
                backgroundColor: "#e91e63",
                position: "relative",
                width: "100%",
                borderRadius: "0px",
                padding: "20px"
            }
        }


    }
componentWillMount(){
 

}
handleCreate=()=>{
    let payload ={};
    let polls = [...this.state.polls]
    //reset the value field to empty string
    polls.map(item =>{
        item.value =""
    });

 payload.polls = polls;
 payload.poll_theme = this.state.poll_theme;
 payload.poll_category = this.state.poll_category

 this.newPoll(payload).then(data=> { 
     console.log(data); 
     alert("successfull");
    this.setState({poll_success: true,
                   poll_id: data.id});
    })

}
newPoll= async (data)=>{
    let poll = await fetch("/api/poll", { method: "POST", 
    headers: new Headers({ 'Content-Type': 'application/json'}),
    body: JSON.stringify(data)
});
let rawdata = await poll.json();
return rawdata;
}
    /**
     * <button onClick={this.addSlidePollObject}>Slide poll object</button>
       <button onClick={this.addOptionPollObject}>option poll object</button>
                        {
                type: "slider",
                question: "hello",
                options: [0, 100],
                value: 0,

            }
     * 
     */
    onBackgroundColorChange = (color) => {
        var theme = { ...this.state.poll_theme }
        theme.backgroundColor = color.hex
        this.setState({ poll_theme: theme })
    }

    onForegroundColorChange = (color) => {
        var theme = { ...this.state.poll_theme }
        theme.color = color.hex
        this.setState({ poll_theme: theme })
    }

    onFontChange = nextFont => {
        var theme = { ...this.state.poll_theme }
        theme.font = nextFont.family
        this.setState({ poll_theme: theme })

    }
    handlePreview =()=>{
        var ui = { ...this.state.ui }
        ui.poll_preview = !ui.poll_preview
        this.setState({ ui: ui })
    }
    onChange = (e) => {
        e.persist();
        let polls = [...this.state.polls]
        switch (e.target.dataset.field) {
            case "option":
                console.log("option", e.target.dataset.poll, e.target.dataset.option)
                polls[e.target.dataset.poll].options[e.target.dataset.option] = e.target.value
                this.setState({ polls: polls })
                break;
            case "question":
                polls[e.target.dataset.poll].question = e.target.value;
                this.setState({ polls: polls })
                break;

        }


    }
    onLastChange = (e) => {
        e.persist()
        let polls = [...this.state.polls]
        if (polls[e.target.dataset.poll].options.length < 6) {
            polls[e.target.dataset.poll].options.push(e.target.value)
            this.setState({ polls: polls })
            e.target.value = ""
            console.log(e)
            console.log("%c" + e.target.dataset.poll, "color: green")
        }


    }
    addSlidePollObject = () => {
        let polls = [...this.state.polls, {
            type: "slider",
            question: "",
            options: [0, 100],
            value: 0,
        }];

        this.setState({ polls: polls })

    }
    onPollOptionSelect = (e, value, poll  ) => {
       let polls = [...this.state.polls];
        polls[poll].value = value;
        this.setState({ polls: polls })
      
    }
    onPollSliderChange = (e, value, poll) => {
        let polls = [...this.state.polls];
        polls[poll].value = value;
        this.setState({ polls: polls })
    }
    addOptionPollObject = () => {
        let polls = [...this.state.polls, {
            type: "default",
            question: "",
            options: ["", ""],
            value: "",

        }];

        this.setState({ polls: polls })

    }
    onPollOptionDelete = (poll, option) => {
        let polls = [...this.state.polls]
        if (polls[poll].options.length > 2) {
            polls[poll].options.splice(option, 1)
            this.setState({ polls: polls })
        }
    }
    onPollObjectDelete = (poll) => {
        let polls = [...this.state.polls]
        if (polls.length > 0) {
            polls.splice(poll, 1)
            this.setState({ polls: polls })
        }
    }
    onToggleThemeingPane = () => {
        var ui = { ...this.state.ui }
        ui.show_theme_pane = !ui.show_theme_pane
        
        this.setState({ ui: ui })

        
       
    }
    render() {

        return (
            <div>
                <Navigation onSidebarToggle={this.onToggleThemeingPane}/>
                <div className="flex-container">
                    <div className="flex-item">

                        {this.state.ui.poll_preview === false ?
                            (
                                <div>
                                    {this.state.polls.map((poll, pollindex) => {
                                        return poll.type === "default" ?
                                            (
                                                <section>
                                                    <button className="button remove-section transparent" onClick={() => this.onPollObjectDelete(pollindex)}><Icon>delete</Icon></button>
                                                    <label className="bold heading-text heading-sm">Question:</label>
                                                    <textarea className="form-control" name="question" data-field="question" data-poll={pollindex} value={poll.question} onChange={this.onChange} >
                                                    </textarea>
                                                    <ul className="options">
                                                        {poll.options.map((option, optionindex) => {
                                                            return <li className="item"> 
                                                            <label className="bold heading-text heading-sm">option {optionindex + 1}</label>
                                                            <input className="form-control padding-right20" key={pollindex + "option" + optionindex} data-field="option" data-poll={pollindex} data-option={optionindex} value={poll.options[optionindex]} onChange={this.onChange} required autoFocus /> <button className="button transparent absolute" onClick={() => this.onPollOptionDelete(pollindex, optionindex)}><Icon>close</Icon></button></li>

                                                        })}
                                                        <li className="item">
                                                            <input className="form-control padding-right20" data-poll={pollindex} onChange={this.onLastChange} />
                                                        </li>
                                                    </ul>

                                                </section>
                                            ) : (
                                                <section>
                                                    <button className="button remove-section transparent" onClick={() => this.onPollObjectDelete(pollindex)}><Icon>delete</Icon></button>
                                                    <textarea className="form-control" data-field="question" data-poll={pollindex} value={poll.question} onChange={this.onChange}></textarea>

                                                    <input key={pollindex + "" + 0} data-field="option" data-poll={pollindex} data-option={0} value={poll.options[0]} onChange={this.onChange} required readOnly />
                                                    <input key={pollindex + "" + 1} data-field="option" data-poll={pollindex} data-option={1} value={poll.options[1]} onChange={this.onChange} required />
                                                    <FormControl>
                                                        <InputLabel htmlFor="age-auto-width">Age</InputLabel>
                                                        <Select
                                                            value={poll.options[1]}
                                                            onChange={this.handleChange}
                                                            input={<Input name="age" data-field="option" data-poll={pollindex} data-option={1} id="age-auto-width" />}
                                                            autoWidth
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value={2}>2</MenuItem>
                                                            <MenuItem value={3}>3</MenuItem>
                                                            <MenuItem value={4}>4</MenuItem>
                                                            <MenuItem value={5}>5</MenuItem>
                                                            <MenuItem value={6}>6</MenuItem>
                                                            <MenuItem value={7}>7</MenuItem>
                                                            <MenuItem value={8}>8</MenuItem>
                                                            <MenuItem value={9}>9</MenuItem>
                                                            <MenuItem value={10}>10</MenuItem>
                                                        </Select>
                                                        <FormHelperText>Auto width</FormHelperText>
                                                    </FormControl>


                                                </section>
                                            )



                                    })}
&nbsp; &nbsp;&nbsp; &nbsp; 
                                  <Button variant="contained" color="primary" onClick={this.handleCreate}>
                                        Create Poll
                    </Button> &nbsp; &nbsp; &nbsp; &nbsp;
                    <Button variant="contained" color="primary" onClick={this.handlePreview}>
                                        Preview
                    </Button>

                     {this.state.ui.poll_preview == true ? <div> <a href={"/poll/"+`${this.state.poll_id}`}>visit poll </a> </div> : null}
               
                                </div>
                            ) : (
                               
                                    <div className="apply-font" style={this.state.poll_theme}>
                                        {this.state.polls.map((poll, pollindex) => {
                                            return poll.type === "default" ?
                                                (
                                                    <div>
                                                        <div>
                                                            <h4 className="question"> {poll.question}</h4>
                                                        </div>
                                                        <div className="paddingTop">
                                                            <FormControl component="fieldset" required >
                                                                <FormLabel component="legend">Options</FormLabel>
                                                                <RadioGroup
                                                                    aria-label="gender"
                                                                    name="options"
                                                                    value={poll.value}
                                                                    onChange={(e, value) => this.onPollOptionSelect(e, value, pollindex)}
                                                                >
                                                                    {poll.options.map((option, optionindex) => {
                                                                        return <FormControlLabel value={option} control={<Radio />} label={option} />

                                                                    })}
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div>
                                                            <h4 className="question"> {poll.question}</h4>
                                                        </div>
                                                        <div>
                                                            <Slider value={poll.value} min={poll.options[0]} max={poll.options[1]} step={1} onChange={(e, value) => this.onPollSliderChange(e, value, pollindex)} />
                                                        </div>
                                                    </div>
                                                )



                                        })}
                                        <div className="paddingTop">
                                        
                                            <Button variant="contained" color="primary" onClick={this.handleVote}>
                                                Vote !
                                            </Button>
                                            &nbsp; &nbsp; &nbsp; &nbsp;
                                            <Button variant="contained" color="primary" onClick={this.handlePreview}>
                                                Continue poll
                                            </Button>
                                        
                                        </div>
                                    </div>
                                

                            )
                        }

                    </div>

                </div>
                <aside className={this.state.ui.show_theme_pane ? "side-bar show" : "side-bar"}>
                    <header>
                        <h4>Theme</h4> <button className="button transparent absolute" onClick={this.onToggleThemeingPane}><Icon>close</Icon></button>
                    </header>
                    <div>
                        <h6 className="heading-text">background color</h6>
                        <CirclePicker
                            color={this.state.poll_theme.backgroundColor}
                            onChangeComplete={this.onBackgroundColorChange}
                        />
                    </div>
                    <div>
                        <h6 className="heading-text">foreground color</h6>
                        <CirclePicker
                            color={this.state.poll_theme.color}
                            onChangeComplete={this.onForegroundColorChange}
                        />
                    </div>
                    <div>
                        <h6 className="heading-text">font</h6>
                        <FontPicker
                            apiKey={process.env.REACT_APP_API_KEY}
                            activeFont={this.state.poll_theme.font}
                            onChange={this.onFontChange}
                        />
                    </div>
                </aside>
            </div>

        )
    }

}

export default Npoll