import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class PrizeView extends React.Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {

    }
}

function mapDispatchToProps(dispatch, ownProps){
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrizeView);