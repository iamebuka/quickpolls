import React from 'react'
import { app } from '../base'
import LoadingScreen from './LoadingScreen'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import '../components/poll.css'

class Poll extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            poll: null,
           
           
        }
    }
    findPollById = async (id) => {
        let poll = await fetch("/api/poll/" + id, { method: "GET" });
        let rawdata = await poll.json();
        return rawdata;
    }

    findPollByIDUpdate = async (data) => {
        let poll = await fetch("/api/poll", {
            method: "PUT",
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        });
        let rawdata = await poll.json();
        return rawdata;
    }
    toggleVoteSuccess = () => {
        this.setState({ voted: true })
        setTimeout(() => {
            this.setState({ voted: false })
        }, 5000)
    }
    onPollOptionSelect=(e, value, poll)=>{
        let polls = [...this.state.poll.polls];
        polls[poll].value = value;
        this.setState({ polls: polls })
    }
    handleVote = () => {
        let id = this.props.match.params.pollID
        var poll = [...this.state.poll.polls];
        var response = [0];
        poll.map(item => {
            response.push(item.value)
        })
        this.findPollByIDUpdate({id:id, response: response }).then(data => {
            console.log("update response: "+data)
         this.toggleVoteSuccess();
        })


    }

    handleChange = (e) => {
        e.persist()
        console.log("labels", e.target.labels[0])
        console.log("change", e)
        var label = e.target.labels[0].dataset.votes;
        alert(Number(label) + 1)
        this.setState({ value: e.target.value })
    }

    
    componentWillMount() {
        let id = this.props.match.params.pollID
        this.findPollById(id).then(data => {
            console.log(data)
            this.setState({
                poll: { ...data },
                loading: false
            })
        })
    }
    render() {
        if (this.state.loading) {
            return <LoadingScreen />
        }
        return (

            <div style={this.state.poll.poll_theme}>
                {this.state.poll.polls.map((poll, pollindex) => {
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
                                    <Slider value={poll.value} min={poll.options[0]} max={poll.options[1]} step={1} onChange={(e, value) => this.onPollOptionSelect(e, value, pollindex)} />
                                </div>
                            </div>
                        )



                })}


                <div className="paddingTop">
                    <Button variant="contained" color="primary" onClick={this.handleVote}>
                        Vote !
                    </Button>
                </div>
                {
                    this.state.voted ?
                        <div style={{ position: "absolute", width: "100%", height: "100%", top: "0px", left: "0px", textAlign: "center" }}>Done</div>
                        :
                        null
                }

            </div>
        )
    }

}

export default Poll