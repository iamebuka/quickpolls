import React, { Component } from 'react'
import {Icon} from '@material-ui/core'
import '../components/navigation.css'
class Navigation extends Component {
    onClick = () => {
        this.props.onSidebarToggle()
    }
    render() {
        return (
            <div>
                <header>
                    <div className="left">

                    </div>
                    <div className="right">
                        <button className="button" onClick={this.onClick}><Icon>palette</Icon></button>

                    </div>
                </header>
            </div>
        )
    }
}

export default Navigation