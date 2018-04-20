import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Pagination, Table} from "antd";
import sizeConfig from "../configs/sizeConfig";
import {
    getBonusesList,
    getBonusesListAction,
    resetBonusesAction
} from "../actions/graph";
import {
    graphTable
} from "../configs/tableConfig";

class GraphView extends React.Component {
    static propTypes = {
        bonusesList: PropTypes.array,
        current: PropTypes.number,
        total: PropTypes.number,
        time: PropTypes.number,
        count: PropTypes.string,
        isFresh: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.canvasDOMSumInstance = new Map();
        this.canvasDOMCutBayInstance = new Map();
        this.canvasDOMSum = null;
        this.canvasDOMCutBay = null;
    }

    componentWillReceiveProps(nextProps) {
        const {
            getBonusesListHandler
        } = this.props;
        if (!this.props.isFresh && nextProps.isFresh) {
            getBonusesListHandler.bind(this)({current: 1});
        }
    }

    /**
     * 和值折线
     */
    Stroke(domInstance, dom) {
        return new Promise(function promise(resolve, reject) {
            let table = this.table,
                table_head_height = table.querySelectorAll(".ant-table-thead")[0].clientHeight,
                tableLeft = table.getBoundingClientRect().left,
                tableTop = table.getBoundingClientRect().top,
                canvasDOMSumInstance = this[domInstance],
                size = canvasDOMSumInstance.size,
                canvasDOMInstance_arr = [],
                canvasDOMInstance_result = [],
                index = 0,
                canvasDOMContainer = null,
                canvasDOM = [];
            if (this[dom]) {
                table.removeChild(this[dom]);
                this[dom] = null;
            }
            if (canvasDOMSumInstance && size > 0) {
                canvasDOMContainer = document.createElement("div");
                canvasDOMContainer["style"] = "position:absolute;width:100%;height:calc(100% - 38px);top:0;left:0";
                for (let [mapKey, mapValue] of canvasDOMSumInstance.entries()) {
                    let node = mapValue;
                    node["top"] -= tableTop;
                    node["left"] -= tableLeft;
                    canvasDOMInstance_arr = [...canvasDOMInstance_arr, node];
                }
                while (index < canvasDOMInstance_arr.length - 1) {
                    let canvasTop_next = canvasDOMInstance_arr[index + 1]["top"],
                        canvasTop = canvasDOMInstance_arr[index]["top"],
                        canvasLeft_next = canvasDOMInstance_arr[index + 1]["left"],
                        canvasLeft = canvasDOMInstance_arr[index]["left"],
                        canvasType = canvasDOMInstance_arr[index]["type"],
                        height = Math.abs(canvasTop_next - canvasTop),
                        width = Math.abs(canvasLeft_next - canvasLeft),
                        top = height * index + height / 2 + table_head_height,
                        left = canvasLeft_next > canvasLeft ? (canvasLeft + 18) : (canvasLeft_next + 18),
                        isTransform = canvasLeft_next < canvasLeft;
                    canvasDOMInstance_result = [...canvasDOMInstance_result, {
                        height,
                        width: width ? width : width + 2,
                        top,
                        left,
                        isTransform,
                        type: canvasType
                    }];
                    index++;
                }
                for (let [key, value] of canvasDOMInstance_result.entries()) {
                    let canvas_node = document.createElement("canvas");
                    canvas_node["width"] = value["width"];
                    canvas_node["height"] = value["height"];
                    canvas_node["style"] = `position:absolute;top:${value["top"]}px;left:${value["left"]}px;`;
                    let canvas_node_ctx = canvas_node.getContext("2d");
                    if (value["isTransform"]) {
                        canvas_node_ctx.moveTo(value["width"], 0);
                        canvas_node_ctx.lineTo(0, value["height"]);
                    } else {
                        canvas_node_ctx.moveTo(0, 0);
                        canvas_node_ctx.lineTo(value["width"], value["height"]);
                    }
                    canvas_node_ctx.strokeStyle = value["type"];
                    canvas_node_ctx.stroke();
                    canvasDOM = [...canvasDOM, canvas_node];
                }
                for (let [key, value] of canvasDOM.entries()) {
                    canvasDOMContainer.appendChild(value);
                }
                this[dom] = canvasDOMContainer;
                table.appendChild(this[dom]);
            }
            resolve();
        }.bind(this));
    }

    componentDidUpdate() {
        const {
            Stroke
        } = this;
        Stroke.bind(this)("canvasDOMSumInstance", "canvasDOMSum").then(function resolve() {
            Stroke.bind(this)("canvasDOMCutBayInstance", "canvasDOMCutBay");
        }.bind(this), function reject() {

        }.bind(this));
    }

    componentDidMount() {
        const {
            getBonusesListHandler
        } = this.props;
        getBonusesListHandler.bind(this)({current: 1});
    }

    componentWillUnmount() {
        const {
            resetBonusesHandler
        } = this.props;
        resetBonusesHandler.bind(this)();
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
            loadMore
        } = this;
        const columns = graphTable.bind(this)();
        return (
            <section ref={(ref) => {
                this.table = ref
            }} className="main-view-graph-table">
                <Table
                    columns={columns}
                    dataSource={bonusesList}
                    pagination={false}
                    rowClassName="main-view-graph-table-row"
                    bordered={true}
                />
                <div className="main-view-graph-pagination">
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
        ...state.graphTableReducer,
        isFresh
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        async getBonusesListHandler(pageNum) {
            let bonuses = await getBonusesList.bind(this)(pageNum["current"]);
            for (let [key, value] of bonuses["bonusesList"].entries()) {
                let number = value["number"],
                    num_arr = number.split(",");
                if (num_arr.length > 0) {
                    value["numberOne"] = num_arr[0];
                    value["numberTwo"] = num_arr[1];
                    value["numberThree"] = num_arr[2];
                }
            }
            dispatch(getBonusesListAction({
                ...pageNum,
                ...bonuses
            }));
        },
        resetBonusesHandler() {
            dispatch(resetBonusesAction.bind(this)());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphView);