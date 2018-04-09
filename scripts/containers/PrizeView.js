import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Table} from "antd"
import {
    getBonusesList,
    getBonusesListAction
} from "../actions/prize";

class PrizeView extends React.Component {
    static propTypes = {
        bonusesList: PropTypes.array,
        current: PropTypes.number,
        total: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const {
            getBonusesListHandler
        } = this.props;
        getBonusesListHandler.bind(this)({current: 1});
    }

    render() {
        const {
             bonusesList
        } = this.props;
        return (
            <section className="main-view-prize-table">
                <Table
                    dataSource={bonusesList}
                />
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        ...state.prizeTableReducer
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        async getBonusesListHandler(pageNum) {
            let bonuses = await getBonusesList.bind(this)(pageNum["current"]);
            dispatch(getBonusesListAction({
                ...pageNum,
                ...bonuses
            }));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrizeView);