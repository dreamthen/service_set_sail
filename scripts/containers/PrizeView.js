import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Pagination, Table} from "antd";
import sizeConfig from "../configs/sizeConfig";
import {
    getBonusesList,
    getBonusesListAction
} from "../actions/prize";
import {
    prizeTable
} from "../configs/tableConfig";

class PrizeView extends React.Component {
    static propTypes = {
        bonusesList: PropTypes.array,
        current: PropTypes.number,
        total: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            tableHeight: window.innerHeight - 266
        };
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
        const {
            getBonusesListHandler
        } = this.props;
        getBonusesListHandler.bind(this)({current: 1});
    }

    /**
     * 点击分页，重新渲染
     * @param page
     */
    loadMore(page) {
        const {
            getBonusesListHandler
        } = this.props;
        getBonusesListHandler.bind(this)({current: page});
    }

    render() {
        const {
            bonusesList,
            current,
            total
        } = this.props;
        const {
            tableHeight
        } = this.state;
        const {
            loadMore
        } = this;
        const columns = prizeTable();
        return (
            <section className="main-view-prize-table">
                <Table
                    columns={columns}
                    dataSource={bonusesList}
                    pagination={false}
                    rowClassName="main-view-prize-table-row"
                    scroll={{y: tableHeight}}
                />
                <div className="main-view-prize-pagination">
                    <Pagination
                        current={current}
                        showQuickJumper={true}
                        pageSize={sizeConfig.PAGE_SIZE}
                        showTotal={total => `共${total}条`}
                        total={total}
                        onChange={loadMore.bind(this)}
                    />
                </div>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const {
        isFresh
    } = state.mainReducer;
    return {
        ...state.prizeTableReducer,
        isFresh
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