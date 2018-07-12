// tv:
var currentRangeEndDate = 0;
var _GlobalTV = {
    klineTime: (localStorage.getItem("klineTime") ||
        localStorage.setItem("klineTime", _w_.kiline.times)),
    _KData = [],
    name = "eth_btc",
    language = "zh",
    line: "",
};
var currentSymbolInfo;
var fixDepthNumber = function(name) {
    if (!name || !_w_.ruleD[name].depth) {
        return 1000000;
    }
    var b = "1";
    var n = _w_.ruleD[name].depth.split(",")[0].split(".")[1].length;
    for (var i = 0; i < n; i++) {
        b = b + "0";
    }
    return parseFloat(b);
};

switch (_GlobalTV.language) {
    case "zh":
        _GlobalTV.line = "分时";
        break;
    case "en":
        _GlobalTV.line = "line";
        break;
    default:
        _GlobalTV.line = "시분할";
}
if (!_GlobalTV.language) {
    _GlobalTV.language = "en";
    _GlobalTV.line = "line";
}
_w_.config = {
    supports_search: true,
    supports_group_request: false,
    supports_marks: false,
    supports_timescale_marks: false,
    supports_time: false,
    exchanges: [
        { value: "", name: "All Exchanges", desc: "" },
        { value: "XETRA", name: "XETRA", desc: "XETRA" },
        { value: "NSE", name: "NSE", desc: "NSE" }
    ],
    symbolsTypes: [
        { name: "All types", value: "" },
        { name: "Stock", value: "stock" },
        { name: "Index", value: "index" }
    ]
};
_w_.symbols = {
    name: _GlobalTV.name,
    "exchange-traded": "",
    "exchange-listed": "",
    minmov: 1,
    minmov2: 0,
    pointvalue: 1,
    session: "0000-2400:1234567",
    has_intraday: true,
    has_no_volume: false,
    volume_precision: 1,
    description: _GlobalTV.name.toUpperCase(),
    type: "bitcoin",
    supported_resolutions: ['1', '5', '15', '30', '60', '1440', '10080', '302400'],
    pricescale: 1000000,
    ticker: _GlobalTV.name.toUpperCase()
};
var fixTime = function(t) {
    switch (t) {
        case _GlobalTV.klineTime:
            return "1";
            break;
        case "1min":
            return "1";
            break;
        case "5min":
            return "5";
            break;
        case "15min":
            return "15";
            break;
        case "30min":
            return "30";
            break;
        case "60min":
            return "60";
            break;
        case "1day":
            return "1440";
            break;
        case "1week":
            return "10080";
            break;
        case "1month":
            return "302400";
        case "1":
            return "1min";
            break;
        case "5":
            return "5min";
            break;
        case "15":
            return "15min";
            break;
        case "30":
            return "30min";
            break;
        case "60":
            return "60min";
            break;
        case "1440":
            return "1day";
            break;
        case "10080":
            return "1week";
            break;
        case "302400":
            return "1month";
            break;
        case "1D":
            return "1day";
            break;
        case "1W":
            return "1week";
            break;
        case "1M":
            return "1month";
            break;
    }
};
var setData = function(obj) {
    return {
        time: obj.id * 1000,
        close: obj.close,
        open: obj.open,
        high: obj.high,
        low: obj.low,
        volume: obj.vol
    };
};

function openTradeview() {
    var widget = (window.tvWidget = new TradingView.widget({
        fullscreen: true,
        autosize: true,
        symbol: _GlobalTV.name,
        interval: fixTime(_GlobalTV.klineTime),
        timezone: "exchange",
        toolbar_bg: "#222634",
        container_id: "tv_chart_container",
        datafeed: new Datafeeds.UDFCompatibleDatafeed(),
        library_path: "./charting_library/",
        custom_css_url: './css/library.css',
        locale: _GlobalTV.language,
        drawings_access: { type: "black", tools: [{ name: "Regression Trend" }] },
        disabled_features: ['use_localstorage_for_settings', 'header_symbol_search', 'timeframes_toolbar', 'volume_force_overlay', 'header_saveload', 'header_resolutions', 'header_compare', 'header_screenshot', 'adaptive_logo', 'show_chart_property_page', 'symbol_search_hot_key', 'header_chart_type', 'header_undo_redo'], //禁用部分功能
        enabled_features: ['study_templates', 'hide_left_toolbar_by_default'], //启用部分功能
        charts_storage_url: "https://saveload.tradingview.com",
        charts_storage_api_version: "1.1",
        client_id: "tradingview.com",
        user_id: "public_user_id",
        loading_screen: {
            background: 'blue'
        },
        debug: false,
        studies_overrides: {
            "volume.volume.color.0": _w_.kiline.fall,
            "volume.volume.color.1": _w_.kiline.rise,
            "volume.volume.transparency": 50
        },
        overrides: {
            //坐标轴和刻度标签颜色
            "scalesProperties.lineColor": "#505d7b",
            "scalesProperties.textColor": "#333e58",
            //网格线
            "paneProperties.vertGridProperties.color": "#1e273c",
            "paneProperties.vertGridProperties.style": 0,
            "paneProperties.horzGridProperties.color": "#1e273c",
            "paneProperties.horzGridProperties.style": 0,
            //k线的颜色
            "symbolWatermarkProperties.transparency": 90,
            "scalesProperties.textColor": "#ddd",
            "paneProperties.vertGridProperties.color": "#242e47",
            "paneProperties.horzGridProperties.color": "#242e47",
            "paneProperties.crossHairProperties.color": "#fafafa",
            volumePaneSize: "small",
            "paneProperties.legendProperties.showLegend": false, //折叠信息
            "paneProperties.background": "#222634",
            "mainSeriesProperties.candleStyle": {
                upColor: _w_.kiline.rise,
                downColor: _w_.kiline.fall,
                drawBorder: true,
                borderColor: "#ff3933",
                borderUpColor: _w_.kiline.rise,
                borderDownColor: _w_.kiline.fall,
                drawWick: true,
                wickColor: "#737375",
                wickUpColor: _w_.kiline.rise,
                wickDownColor: _w_.kiline.fall,
                barColorsOnPrevClose: !1
            }
        }
    }));
    widget.onChartReady(function() {

        widget.chart().createStudy("Moving Average", true, false, [5], null, {
            "plot.color": "#9660c4"
        });
        widget.chart().createStudy("Moving Average", false, false, [10], null, {
            "plot.color": "#84aad5"
        });
        widget.chart().createStudy("Moving Average", false, false, [20], null, {
            "plot.color": "#55b263"
        });
        var c = widget.chart().getAllStudies();

        function setMAShow() {
            widget.chart().setEntityVisibility(c[0].id, true);
            widget.chart().setEntityVisibility(c[1].id, true);
            widget.chart().setEntityVisibility(c[2].id, true);
        }

        function setMAHide() {
            widget.chart().setEntityVisibility(c[0].id, false);
            widget.chart().setEntityVisibility(c[1].id, false);
            widget.chart().setEntityVisibility(c[2].id, false);
        }
        //创建分时按钮
        widget
            .createButton()
            .attr("title", _GlobalTV.line)
            .on("click", function(a) {
                setMAShow(_GlobalTV.klineTime);
                if (widget.chart().resolution() == "1") {
                    $($(a)[0].target)
                        .parent()
                        .siblings()
                        .find(".textColor")
                        .removeClass("textColor");
                    $($(a)[0].target).addClass("textColor");
                    widget.chart().setChartType(3);
                } else {
                    widget.chart().setResolution("1", function(e) {
                        $($(a)[0].target)
                            .parent()
                            .siblings()
                            .find(".textColor")
                            .removeClass("textColor");
                        $($(a)[0].target).addClass("textColor");
                        widget.chart().setChartType(3);
                    });
                }
                setMAHide();
            })
            .append(
                $('<span title="' + _GlobalTV.klineTime + '">' + _GlobalTV.klineTime + "</span>")
            );
        //创建时间按钮
        var timeList = ['1min', '5min', '15min', '30min', '60min', '1day', '1week', '1month'];
        timeList.forEach(function(v) {
            var button = widget.createButton();
            button.attr("title", v);
            button.append($("<span>" + v + "</span>"));
            button.on("click", function(a) {
                setMAShow();
                if (widget.chart().resolution() === "1" && v === "1min") {
                    $($(a)[0].target)
                        .parent()
                        .siblings()
                        .find(".textColor")
                        .removeClass("textColor");
                    $($(a)[0].target).addClass("textColor");
                    widget.chart().setChartType(1);
                } else {
                    widget.chart().setResolution(fixTime(v), function() {
                        $($(a)[0].target)
                            .parent()
                            .siblings()
                            .find(".textColor")
                            .removeClass("textColor");
                        $($(a)[0].target).addClass("textColor");
                        widget.chart().setChartType(1);
                    });
                }
                localStorage.setItem("klineTime", v);
                _GlobalTV.klineTime = v;
            });
            _GlobalTV.klineTime === v && button.addClass("textColor");
        });
        widget.createButton()
            .append($('<script type="text/javascript">$(".tv-close-panel.left").trigger("click")</script>'))
            .attr('style', 'display:none;');
        setTimeout(() => {
            this.isshowLoading = false
        }, 100)
    });
}

function request_data(symbolInfo, resolution, rangeStartDate, rangeEndDate) {
    currentSymbolInfo = symbolInfo;
    currentRangeEndDate = rangeEndDate * 1000;
    _GlobalTV.klineTime = fixTime(resolution);
    // 切换刻度-已经有其他刻度的图表；
    treading_req()
}

function treading_req() {
    tradJs.ws.send(
        JSON.stringify({
            'req': "market_" + _GlobalTV.name + "_kline_" + _GlobalTV.klineTime,
        })
    )
}


// tv -end

var tradJs = {
    init: function() {
        this.market = "";
        this.symbolList = [];
        this.symbolOBJ = {

        };
        this.sdnum = "0";
        this.isUnsub = false;
        this.isChart = false;
        this.isLogin = false;
        this.odre = "";
        this.next = false;
        this.count = 0;
        // 接口数据：
        this.countCoin = null;
        this.baseCoin = null;
        this.price = null;
        // 最小购买单价和最小购买数量
        // this.minVolume = null
        // this.minPrice = null
        this.inputPriceBuy = null;
        this.inputVolumeBuy = null;
        this.inputPriceSell = null;
        this.inputVolumeSell = null;
        // 拖拽参数
        this.isMove = false;
        this.dragCX = null;
        this.draging = null;
        this.marketType = null;
        // 弹窗状态
        this.alertFun = null;
        this.mx = 0;
        this.leftX = 0;
        this.perLeftX = 0;
        this.defmarket = {
            m: localStorage.setItem("m", 'btc'),
            s: localStorage.setItem("s", 'ethbtc')
        };
        this.doNext = null;
        this.nextNum = 1;
        this.clockClick = true;
        this.swidthKline = 1;
        // this.event();
        // this.marketTitle();
        // this.initDom()
        this.marketWs();
    },
    event: function() {

    },
    marketList: function() {
        this.ws && this.marketSend('sub')
    },
    // 市场列表ws请求
    marketSend: function(type) {
        // K线图请求
        this.ws.send(
            JSON.stringify({
                'req': "market_" + _GlobalTV.name + "_kline_" + _GlobalTV.klineTime
            })
        );
        //行情
        this.ws.send(
            JSON.stringify({
                'sub': "market.tickers." + _GlobalTV.name
            })
        );
    },
    // 请求实时 K 线数据
    subData: function(subType) {
        var subJSON = {};
        subJSON[subType] = "market_" + _GlobalTV.name + "_kline_" + _GlobalTV.klineTime
        this.ws.send(
            JSON.stringify(subJSON)
        );
    },
    // 市场列表ws链接
    marketWs: function() {
        this.ws = new WebSocket(_w_.wsUrl);
        this.ws.binaryType = "arraybuffer";
        this.ws.onopen = function(evt) {
            this.marketSend("req");
            openTradeview();
        }.bind(this);
        this.ws.onmessage = function(evt) {
            var data = _w_.fixM(evt.data, this.ws);
            if (!data) {
                console.log(data)
                return;
            }
            // var symbol = data.channel && data.channel.split("_")[1];
            // if (data && data.channel && data.channel.indexOf("_kline_") > -1) {
            // K线图
            var newData = false;
            var noData = { noData: false };
            if (data["data"]) {
                if (data["data"].length) {
                    var array = [],
                        ds = data.data;
                    for (var i = 0; i < ds.length; i++) {
                        array.push(setData(ds[i]));
                    }
                    _GlobalTV._KData = array.reverse();
                    this.subData("sub");
                    newData = true;
                    setTimeout(function() {
                        window.onDataCallback(_GlobalTV._KData, noData);
                    }, 2000);
                } else {
                    this.subData("sub");
                    window.onDataCallback([], { noData: true });
                }
            } else if (data["tick"]) {
                var ds = setData(data.tick);
                if (_GlobalTV._KData.length) {
                    for (var i = _GlobalTV._KData.length - 1; i >= 0; i--) {
                        if (ds.time > _GlobalTV._KData[i].time) {
                            _GlobalTV._KData.splice(i + 1, 0, ds);
                            break;
                        } else if (ds.time == _GlobalTV._KData[i].time) {
                            _GlobalTV._KData.splice(i, 1, ds);
                            break;
                        }
                    }
                } else {
                    _GlobalTV._KData.push(ds);
                }
                newData = true;
            }
            if (newData && window.onDataCallback) {
                if (data["data"]) {
                    var noData = { noData: false };
                    if (currentRangeEndDate < _GlobalTV._KData[0].time) {
                        _GlobalTV._KData = [];
                        noData.noData = true;
                    }
                    window.onDataCallback(_GlobalTV._KData, noData);
                } else if (window.onRealtimeCallback) {
                    _GlobalTV._KData = [_GlobalTV._KData[_GlobalTV._KData.length - 1]];
                    window.onRealtimeCallback(
                        _GlobalTV._KData[_GlobalTV._KData.length - 1]
                    );
                }
            }
            // } 
            // else {
            //   // 其他
            //   if (data.event_rep && data.event_rep === "rep") {
            //     // 历史数据
            //     this.pagenewDeal(data);
            //     this.pageSendnewDeal("sub");
            //   } else if (data && data.tick) {
            //     if (data.channel.indexOf(this.symbolOBJ.symbol) < 0) {
            //       return;
            //     }
            //   }
            // }
        }.bind(this);
    }
};
tradJs.init();