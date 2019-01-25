import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Table} from "antd";
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
        bonusesGraphList: PropTypes.array,
        bonusesList: PropTypes.array,
        total: PropTypes.number,
        time: PropTypes.number,
        count: PropTypes.string,
        isFresh: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            tableHeight: window.innerHeight - 130
        };
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
            let table = document.querySelectorAll(".ant-table-body")[0],
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
                        top = height * index + height / 2,
                        left = canvasLeft_next > canvasLeft ? canvasLeft - 8 : canvasLeft_next - 8,
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
                    if (key === canvasDOMInstance_result.length - 1) {
                        canvas_node["className"] = "canvasDOM_end";
                    }
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
            Stroke.bind(this)("canvasDOMCutBayInstance", "canvasDOMCutBay").then(function resolve() {
                let tableScroll = document.querySelectorAll(".ant-table-body")[0],
                    table = tableScroll.querySelectorAll(".ant-table-tbody")[0],
                    tableHeight = table.offsetHeight,
                    tableScrollHeight = tableScroll.offsetHeight;
                if (document.querySelectorAll(".canvasDOM_end")[1]) {
                    tableScroll.scrollTop = tableHeight - tableScrollHeight;
                }
            }.bind(this), function reject() {

            }.bind(this));
        }.bind(this), function reject() {

        }.bind(this));
    }

    componentDidMount() {
        const {
            getBonusesListHandler
        } = this.props;
        getBonusesListHandler.bind(this)();
    }

    componentWillUnmount() {
        const {
            resetBonusesHandler
        } = this.props;
        resetBonusesHandler.bind(this)();
    }

    render() {
        const {
            bonusesGraphList
        } = this.props;
        const {
            tableHeight
        } = this.state;
        const columns = graphTable.bind(this)();
        console.log(window.innerWidth, window.innerHeight);
        return (
            <section ref={(ref) => {
                this.table = ref
            }} className="main-view-graph-table">
                <Table
                    className="graph-table"
                    columns={columns}
                    dataSource={bonusesGraphList}
                    pagination={false}
                    rowClassName="main-view-graph-table-row"
                    bordered={true}
                    scroll={{y: tableHeight}}
                />
                <footer className="main-view-graph-footer">
                    <main className="main-view-graph-footer-main">
                        陕西快三
                    </main>
                    <aside className="main-view-graph-footer-graph">
                        http://sxk3.1jtec.com/graph
                    </aside>
                </footer>
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
        async getBonusesListHandler() {
            let bonuses = await getBonusesList.bind(this)();
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
                ...bonuses
            }));
        },
        resetBonusesHandler() {
            dispatch(resetBonusesAction.bind(this)());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphView);