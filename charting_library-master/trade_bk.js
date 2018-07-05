// tv:
const isTreadingView = "1";
if (isTreadingView === "1") {
  var currentRangeEndDate = 0;
  var _GlobalTV = {};
  var currentSymbolInfo;
  var klineTime = localStorage.getItem("klineTime");
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
  !klineTime && localStorage.setItem("klineTime", _w_.kiline.times);
  _GlobalTV.lastTimeS = localStorage.getItem("klineTime");
  _GlobalTV._KData = [];
  _GlobalTV.name = "";
  _GlobalTV.language = "zh";
  _GlobalTV.line = "";
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
      {
        value: "coin",
        name: "coin",
        desc: "coin"
      }
    ],
    symbolsTypes: [
      {
        name: "bitcoin",
        value: "bitcoin"
      }
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
    supported_resolutions: [
      "1",
      "5",
      "15",
      "30",
      "60",
      "1440",
      "10080",
      "302400"
    ],
    pricescale: 1000000,
    ticker: _GlobalTV.name.toUpperCase()
  };
  var fixTime = function(t) {
    switch (t) {
      case _GlobalTV.line:
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
    _w_.symbols.pricescale = fixDepthNumber(_GlobalTV.name);
    var widget = (window.tvWidget = new TradingView.widget({
      fullscreen: true,
      symbol: "AAPL",
      interval: fixTime(_GlobalTV.lastTimeS),
      timezone: "exchange",
      toolbar_bg: "#283552",
      container_id: "tv_chart_container",
      datafeed: new Datafeeds.UDFCompatibleDatafeed(),
      library_path: "./charting_library/",
      locale: _GlobalTV.language,
      drawings_access: { type: "black", tools: [{ name: "Regression Trend" }] },
      disabled_features: [
        "use_localstorage_for_settings",
        "header_symbol_search",
        "timeframes_toolbar",
        "volume_force_overlay",
        "header_saveload",
        "header_resolutions",
        "header_compare",
        "header_undo_redo",
        "header_screenshot",
        "display_market_status",
        "adaptive_logo"
      ], //禁用部分功能
      enabled_features: ["study_templates"], //启用部分功能
      charts_storage_url: "https://saveload.tradingview.com",
      charts_storage_api_version: "1.1",
      client_id: "tradingview.com",
      user_id: "public_user_id",
      loading_screen: {
        background: "#000"
      },
      debug: false,
      studies_overrides: {
        "volume.volume.color.0": _w_.kiline.fall,
        "volume.volume.color.1": _w_.kiline.rise,
        "volume.volume.transparency": 50
      },
      overrides: {
        //k线的颜色
        "symbolWatermarkProperties.transparency": 90,
        "scalesProperties.textColor": "#ddd",
        "paneProperties.vertGridProperties.color": "#242e47",
        "paneProperties.horzGridProperties.color": "#242e47",
        "paneProperties.crossHairProperties.color": "#fafafa",
        volumePaneSize: "small",
        "paneProperties.legendProperties.showLegend": false, //折叠信息
        "paneProperties.background": "#283552",
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
      widget
        .chart()
        .createStudy("Moving Average", false, false, [5], null, {
          "plot.color": "#9660c4"
        });
      widget
        .chart()
        .createStudy("Moving Average", false, false, [10], null, {
          "plot.color": "#84aad5"
        });
      widget
        .chart()
        .createStudy("Moving Average", false, false, [20], null, {
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
      widget
        .createButton()
        .attr("title", _GlobalTV.line)
        .on("click", function(a) {
          setMAShow(_GlobalTV.line);
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
          $(
            '<span title="' + _GlobalTV.line + '">' + _GlobalTV.line + "</span>"
          )
        );
      var timeList = [
        "1min",
        "5min",
        "15min",
        "30min",
        "60min",
        "1day",
        "1week",
        "1month"
      ];
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
          _GlobalTV.lastTimeS = v;
        });
        _GlobalTV.lastTimeS === v && button.addClass("textColor");
      });
      widget
        .createButton()
        .append(
          $(
            '<script type="text/javascript">$(".tv-close-panel.left").trigger("click")</script>'
          )
        )
        .attr("style", "display:none;");
    });
  }
  function request_data(symbolInfo, resolution, rangeStartDate, rangeEndDate) {
    currentSymbolInfo = symbolInfo;
    currentRangeEndDate = rangeEndDate * 1000;
    _GlobalTV.lastTimeS = fixTime(resolution);
    // 切换刻度-已经有其他刻度的图表；
    // treading_req()
  }
  function treading_req() {
    tradJs.ws.send(
      JSON.stringify({
        event: "sub",
        params: {
          cb_id: "ethbtc",
          channel: "market_ethbtc_ticker"
        }
      })
    );
  }
} else if (isTreadingView === "0") {
  $("#klineBox").show();
  var lan = {
    zh: {
      kTxt: [
        ["C_line", "分时"],
        ["C_1m", "1分钟"],
        ["C_5m", "5分钟"],
        ["C_30m", "30分钟"],
        ["C_15m", "15分钟"],
        ["C_1h", "1小时"],
        ["C_1d", "日线"],
        ["C_1w", "周线"],
        ["C_1month", "月线"],
        ["chart_sic", "技术指标"],
        ["chart_stc", "画线工具"],
        ["C_loading", "正在读取数据..."],
        ["C_cursor", "光标"],
        ["C_cross_cursor", "十字光标"],
        ["C_seg_line", "线段"],
        ["C_straight_line", "直线"],
        ["C_ray_line", "射线"],
        ["C_arrow_line", "箭头"],
        ["C_horz_seg_line", "水平线段"],
        ["C_horz_straight_line", "水平直线"],
        ["C_horz_ray_line", "水平射线"],
        ["C_vert_straight_line", "垂直直线"],
        ["C_price_line", "价格线"],
        ["C_tri_parallel_line", "价格通道线"],
        ["C_bi_parallel_line", "平行直线"],
        ["C_bi_parallel_ray", "平行射线"],
        ["C_fib_retrace", "斐波纳契回调"],
        ["C_fib_fans", "斐波纳契扇形"]
      ],
      time: {
        y: "年",
        m: "月",
        d: "日",
        "1": "1月",
        "2": "2月",
        "3": "3月",
        "4": "4月",
        "5": "5月",
        "6": "6月",
        "7": "7月",
        "8": "8月",
        "9": "9月",
        "10": "10月",
        "11": "11月",
        "12": "12月"
      },
      others: {
        data: "时间",
        o: "开",
        h: "高",
        l: "低",
        c: "收",
        cf: "涨幅",
        af: "振幅",
        v: "量"
      }
    },
    en: {
      kTxt: [
        ["C_line", "Line"],
        ["C_1m", "1m"],
        ["C_5m", "5m"],
        ["C_30m", "30m"],
        ["C_15m", "15m"],
        ["C_1h", "1h"],
        ["C_1d", "1d"],
        ["C_1w", "1w"],
        ["C_1month", "1month"],
        ["chart_sic", "Indicator"],
        ["chart_stc", "Tools"],
        ["C_loading", "Loading..."],
        ["C_cursor", "Cursor"],
        ["C_cross_cursor", "Cross Cursor"],
        ["C_seg_line", "Trend Line"],
        ["C_straight_line", "Extended"],
        ["C_ray_line", "Ray"],
        ["C_arrow_line", "Arrow"],
        ["C_horz_seg_line", "Horizontal Line"],
        ["C_horz_straight_line", "Horizontal Extended"],
        ["C_horz_ray_line", "Horizontal Ray"],
        ["C_vert_straight_line", "Vertical Extended"],
        ["C_price_line", "Price Line"],
        ["C_tri_parallel_line", "Parallel Channel"],
        ["C_bi_parallel_line", "Parallel Lines"],
        ["C_bi_parallel_ray", "Parallel Rays"],
        ["C_fib_retrace", "Fibonacci Retracements"],
        ["C_fib_fans", "Fibonacci Fans"]
      ],
      time: {
        y: "",
        m: "",
        d: "",
        "1": "Jan.",
        "2": "Feb.",
        "3": "Mar.",
        "4": "Apr.",
        "5": "May.",
        "6": "Jun.",
        "7": "Jul.",
        "8": "Aug.",
        "9": "Sep.",
        "10": "Oct.",
        "11": "Nov.",
        "12": "Dec."
      },
      others: {
        data: "DATA",
        o: "O",
        h: "H",
        l: "L",
        c: "C",
        cf: "CHANGE",
        af: "AMPLITUDE",
        v: "V"
      }
    },
    ko: {
      kTxt: [
        ["C_line", "시간"],
        ["C_1m", "1분"],
        ["C_5m", "5분"],
        ["C_30m", "30분"],
        ["C_15m", "15분"],
        ["C_1h", "1시간"],
        ["C_1d", "1일 이동평균선"],
        ["C_1w", "1주 이동평균선"],
        ["C_1month", "1month"],
        ["chart_sic", "수평선"],
        ["chart_stc", "Tools"],
        ["C_loading", "Loading..."],
        ["C_cursor", "Cursor"],
        ["C_cross_cursor", "Cross Cursor"],
        ["C_seg_line", "Trend Line"],
        ["C_straight_line", "Extended"],
        ["C_ray_line", "Ray"],
        ["C_arrow_line", "수평선"],
        ["C_horz_seg_line", "수평선"],
        ["C_horz_straight_line", "Horizontal Extended"],
        ["C_horz_ray_line", "Horizontal Ray"],
        ["C_vert_straight_line", "Vertical Extended"],
        ["C_price_line", "Price Line"],
        ["C_tri_parallel_line", "Parallel Channel"],
        ["C_bi_parallel_line", "Parallel Lines"],
        ["C_bi_parallel_ray", "Parallel Rays"],
        ["C_fib_retrace", "Fibonacci Retracements"],
        ["C_fib_fans", "Fibonacci Fans"]
      ],
      time: {
        y: "",
        m: "",
        d: "",
        "1": "Jan.",
        "2": "Feb.",
        "3": "Mar.",
        "4": "Apr.",
        "5": "May.",
        "6": "Jun.",
        "7": "Jul.",
        "8": "Aug.",
        "9": "Sep.",
        "10": "Oct.",
        "11": "Nov.",
        "12": "Dec."
      },
      others: {
        data: "DATA",
        o: "O",
        h: "H",
        l: "L",
        c: "C",
        cf: "CHANGE",
        af: "AMPLITUDE",
        v: "V"
      }
    }
  };
  var def = {
    url: _w_.wsUrl,
    moneyType: localStorage.getItem("s"),
    skin: "light",
    lang: "zh",
    defTime: _w_.kiline.times,
    rise: _w_.kiline.rise,
    fall: _w_.kiline.fall
  };
  var _Global = {
    _KData: new Object(),
    time_type: "2",
    mark_from: "11",
    limit: "1000",
    rParam: "marketFrom=11&type=2&limit=1000",
    periodMap: null,
    chartMgr: null,
    ghReqest: null,
    TimeOutId: null,
    button_down: false,
    url: def.url,
    period: "1day",
    moneyType: def.moneyType,
    WebSocket: {
      send: function() {},
      onmessage: function() {}
    },
    scale: null
  };
  // -----------------------------------------------------
  String.prototype.toFixed = function(rate) {
    return Number(this).toFixed(rate);
  };

  _Global.scale = {
    "1month": "1month",
    "1week": "1week",
    "1day": "1day",
    "60min": "60min",
    "30min": "30min",
    "15m": "15min",
    "15min": "15min",
    "5min": "5min",
    "1min": "1min"
  };

  _Global.pMap = {
    "1month": "5",
    "01w": "4",
    "01d": "3",
    "01h": "10",
    "30m": "9",
    "15m": "2",
    "05m": "1",
    "01m": "0"
  };

  _Global.tagMapPeriod = {
    "1month": "1month",
    "1week": "01w",
    "1day": "01d",
    "60min": "01h",
    "30min": "30m",
    "15min": "15m",
    "5min": "05m",
    "1min": "01m"
  };

  var classId = 0;

  var lastTimeS, isLine;
  var fixDe = function(num) {
    // 科学计数法计算
    num = parseFloat(num);
    if ((num + "").indexOf("E-") > -1 || (num + "").indexOf("e-") > -1) {
      var a =
          (num + "").indexOf("E-") > -1
            ? (num + "").split("E-")
            : (num + "").split("e-"),
        b = a[0],
        c = parseInt(a[1]),
        d = [],
        i;
      for (i = 0; i < c - 1; i++) {
        d[i] = 0;
      }
      num = "0." + d.join("") + b;
    }
    return num;
  };
  /**
   *
   */
  function new_class() {
    var argc = arguments.length;
    var func = function() {};
    var sClass;
    if (argc) {
      sClass = arguments[0];
      for (var k in sClass.prototype) func.prototype[k] = sClass.prototype[k];
    }
    for (var i = 1; i < argc; i++) {
      var feature = arguments[i];
      var f = feature.prototype._cTruct;
      if (f) {
        if (!func.prototype._fCtors) func.prototype._fCtors = [];
        func.prototype._fCtors.push(f);
        delete feature.prototype._cTruct;
      }
      for (var k in feature.prototype) func.prototype[k] = feature.prototype[k];
      if (f) feature.prototype._cTruct = f;
    }
    var newClass = function() {
      if (this._cTruct) this._cTruct.apply(this, arguments);
      if (this._fCtors) {
        var a = this._fCtors;
        var i,
          c = a.length;
        for (i = 0; i < c; i++) a[i].apply(this, arguments);
      }
    };
    func.prototype._classId = classId++;
    if (sClass != undefined) {
      newClass.__classId = sClass.prototype;
      func.prototype.__classId = sClass;
    }
    newClass.prototype = new func();
    return newClass;
  }

  function iITance(obj, clazz) {
    var classId = clazz.prototype._classId;
    if (obj._classId == classId) return true;
    var __classId = obj.__classId;
    while (__classId != undefined) {
      if (__classId.prototype._classId == classId) return true;
      __classId = __classId.prototype.__classId;
    }
    return false;
  }

  /**
   * Class: mEves.
   */
  var mEves = new_class();

  mEves.prototype._cTruct = function() {
    this._handlers = [];
  };

  mEves.prototype.addHandler = function(o, f) {
    if (this._indexOf(o, f) < 0)
      this._handlers.push({
        obj: o,
        func: f
      });
  };

  mEves.prototype.removeHandler = function(o, f) {
    var i = this._indexOf(o, f);
    if (i >= 0) this._handlers.splice(i, 1);
  };

  mEves.prototype.raise = function(s, g) {
    var a = this._handlers;
    var e,
      i,
      c = a.length;
    for (i = 0; i < c; i++) {
      e = a[i];
      e.func.call(e.obj, s, g);
    }
  };

  mEves.prototype._indexOf = function(o, f) {
    var a = this._handlers;
    var e,
      i,
      c = a.length;
    for (i = 0; i < c; i++) {
      e = a[i];
      if (o == e.obj && f == e.func) return i;
    }
    return -1;
  };

  String.fromFloat = function(v, fractionDigits) {
    var text = v.toFixed(fractionDigits);
    for (var i = text.length - 1; i >= 0; i--) {
      if (text[i] == ".") return text.substring(0, i);
      if (text[i] != "0") return text.substring(0, i + 1);
    }
  };

  var eEnv = new_class();

  eEnv.get = function() {
    return eEnv.inst;
  };

  eEnv.set = function(env) {
    eEnv.inst = env;
  };

  eEnv.prototype.getDataSource = function() {
    return this._ds;
  };

  eEnv.prototype.setDataSource = function(ds) {
    return (this._ds = ds);
  };

  eEnv.prototype.getFirstIndex = function() {
    return this._firstIndex;
  };

  eEnv.prototype.setFirstIndex = function(n) {
    return (this._firstIndex = n);
  };

  var Expr = new_class();

  Expr.prototype._cTruct = function() {
    this._rid = 0;
  };

  Expr.prototype.execute = function(index) {};

  Expr.prototype.reserve = function(rid, count) {};

  Expr.prototype.clear = function() {};

  var OpenExpr = new_class(Expr);

  var HighExpr = new_class(Expr);

  var LowExpr = new_class(Expr);

  var CloseExpr = new_class(Expr);

  var VolumeExpr = new_class(Expr);

  OpenExpr.prototype.execute = function(index) {
    return eEnv.get()._ds.getDataAt(index).open;
  };

  HighExpr.prototype.execute = function(index) {
    return eEnv.get()._ds.getDataAt(index).high;
  };

  LowExpr.prototype.execute = function(index) {
    return eEnv.get()._ds.getDataAt(index).low;
  };

  CloseExpr.prototype.execute = function(index) {
    return eEnv.get()._ds.getDataAt(index).close;
  };

  VolumeExpr.prototype.execute = function(index) {
    return eEnv.get()._ds.getDataAt(index).volume;
  };

  var ConstExpr = new_class(Expr);

  ConstExpr.prototype._cTruct = function(v) {
    ConstExpr.__classId._cTruct.call(this);
    this._value = v;
  };

  ConstExpr.prototype.execute = function(index) {
    return this._value;
  };

  var PExpr = new_class(Expr);

  PExpr.prototype._cTruct = function(name, minValue, maxValue, defaultValue) {
    PExpr.__classId._cTruct.call(this);
    this._name = name;
    this._minValue = minValue;
    this._maxValue = maxValue;
    this._value = this._defaultValue = defaultValue;
  };

  PExpr.prototype.execute = function(index) {
    return this._value;
  };

  PExpr.prototype.getMinValue = function() {
    return this._minValue;
  };

  PExpr.prototype.getMaxValue = function() {
    return this._maxValue;
  };

  PExpr.prototype.getDefValue = function() {
    return this._defaultValue;
  };

  PExpr.prototype.getValue = function() {
    return this._value;
  };

  PExpr.prototype.setValue = function(v) {
    if (v == 0) this._value = 0;
    else if (v < this._minValue) this._value = this._minValue;
    else if (v > this._maxValue) this._value = this._maxValue;
    else this._value = v;
  };

  var OPENExpr = new_class(Expr);

  var OpaExpr = new_class(Expr);

  var OpBExpr = new_class(Expr);

  var OpCDExpr = new_class(Expr);

  OPENExpr.prototype._cTruct = function(a) {
    OPENExpr.__classId._cTruct.call(this);
    this._exprA = a;
  };

  OPENExpr.prototype.reserve = function(rid, count) {
    if (this._rid < rid) {
      this._rid = rid;
      this._exprA.reserve(rid, count);
    }
  };

  OPENExpr.prototype.clear = function() {
    this._exprA.clear();
  };

  OpaExpr.prototype._cTruct = function(a, b) {
    OpaExpr.__classId._cTruct.call(this);
    this._exprA = a;
    this._exprB = b;
  };

  OpaExpr.prototype.reserve = function(rid, count) {
    if (this._rid < rid) {
      this._rid = rid;
      this._exprA.reserve(rid, count);
      this._exprB.reserve(rid, count);
    }
  };

  OpaExpr.prototype.clear = function() {
    this._exprA.clear();
    this._exprB.clear();
  };

  OpBExpr.prototype._cTruct = function(a, b, c) {
    OpBExpr.__classId._cTruct.call(this);
    this._exprA = a;
    this._exprB = b;
    this._exprC = c;
  };

  OpBExpr.prototype.reserve = function(rid, count) {
    if (this._rid < rid) {
      this._rid = rid;
      this._exprA.reserve(rid, count);
      this._exprB.reserve(rid, count);
      this._exprC.reserve(rid, count);
    }
  };

  OpBExpr.prototype.clear = function() {
    this._exprA.clear();
    this._exprB.clear();
    this._exprC.clear();
  };

  OpCDExpr.prototype._cTruct = function(a, b, c, d) {
    OpCDExpr.__classId._cTruct.call(this);
    this._exprA = a;
    this._exprB = b;
    this._exprC = c;
    this._exprD = d;
  };

  OpCDExpr.prototype.reserve = function(rid, count) {
    if (this._rid < rid) {
      this._rid = rid;
      this._exprA.reserve(rid, count);
      this._exprB.reserve(rid, count);
      this._exprC.reserve(rid, count);
      this._exprD.reserve(rid, count);
    }
  };

  OpCDExpr.prototype.clear = function() {
    this._exprA.clear();
    this._exprB.clear();
    this._exprC.clear();
    this._exprD.clear();
  };

  var NegExpr = new_class(OPENExpr);

  NegExpr.prototype._cTruct = function(a) {
    NegExpr.__classId._cTruct.call(this, a);
  };

  NegExpr.prototype.execute = function(index) {
    return -this._exprA.execute(index);
  };

  var AddExpr = new_class(OpaExpr);

  var SubExpr = new_class(OpaExpr);

  var MulExpr = new_class(OpaExpr);

  var DivExpr = new_class(OpaExpr);

  AddExpr.prototype._cTruct = function(a, b) {
    AddExpr.__classId._cTruct.call(this, a, b);
  };

  SubExpr.prototype._cTruct = function(a, b) {
    SubExpr.__classId._cTruct.call(this, a, b);
  };

  MulExpr.prototype._cTruct = function(a, b) {
    MulExpr.__classId._cTruct.call(this, a, b);
  };

  DivExpr.prototype._cTruct = function(a, b) {
    DivExpr.__classId._cTruct.call(this, a, b);
  };

  AddExpr.prototype.execute = function(index) {
    return this._exprA.execute(index) + this._exprB.execute(index);
  };

  SubExpr.prototype.execute = function(index) {
    return this._exprA.execute(index) - this._exprB.execute(index);
  };

  MulExpr.prototype.execute = function(index) {
    return this._exprA.execute(index) * this._exprB.execute(index);
  };

  DivExpr.prototype.execute = function(index) {
    var a = this._exprA.execute(index);
    var b = this._exprB.execute(index);
    if (a == 0) return a;
    if (b == 0) return a > 0 ? 1e6 : -1e6;
    return a / b;
  };

  var GtExpr = new_class(OpaExpr);

  var GeExpr = new_class(OpaExpr);

  var LtExpr = new_class(OpaExpr);

  var LeExpr = new_class(OpaExpr);

  var EqExpr = new_class(OpaExpr);

  GtExpr.prototype._cTruct = function(a, b) {
    GtExpr.__classId._cTruct.call(this, a, b);
  };

  GeExpr.prototype._cTruct = function(a, b) {
    GeExpr.__classId._cTruct.call(this, a, b);
  };

  LtExpr.prototype._cTruct = function(a, b) {
    LtExpr.__classId._cTruct.call(this, a, b);
  };

  LeExpr.prototype._cTruct = function(a, b) {
    LeExpr.__classId._cTruct.call(this, a, b);
  };

  EqExpr.prototype._cTruct = function(a, b) {
    EqExpr.__classId._cTruct.call(this, a, b);
  };

  GtExpr.prototype.execute = function(index) {
    return this._exprA.execute(index) > this._exprB.execute(index) ? 1 : 0;
  };

  GeExpr.prototype.execute = function(index) {
    return this._exprA.execute(index) >= this._exprB.execute(index) ? 1 : 0;
  };

  LtExpr.prototype.execute = function(index) {
    return this._exprA.execute(index) < this._exprB.execute(index) ? 1 : 0;
  };

  LeExpr.prototype.execute = function(index) {
    return this._exprA.execute(index) <= this._exprB.execute(index) ? 1 : 0;
  };

  EqExpr.prototype.execute = function(index) {
    return this._exprA.execute(index) == this._exprB.execute(index) ? 1 : 0;
  };

  var MaxExpr = new_class(OpaExpr);

  MaxExpr.prototype._cTruct = function(a, b) {
    MaxExpr.__classId._cTruct.call(this, a, b);
  };

  MaxExpr.prototype.execute = function(index) {
    return Math.max(this._exprA.execute(index), this._exprB.execute(index));
  };

  var AbsExpr = new_class(OPENExpr);

  AbsExpr.prototype._cTruct = function(a) {
    AbsExpr.__classId._cTruct.call(this, a);
  };

  AbsExpr.prototype.execute = function(index) {
    return Math.abs(this._exprA.execute(index));
  };

  var RefExpr = new_class(OpaExpr);

  RefExpr.prototype._cTruct = function(a, b) {
    RefExpr.__classId._cTruct.call(this, a, b);
    this._offset = -1;
  };

  RefExpr.prototype.execute = function(index) {
    if (this._offset < 0) {
      this._offset = this._exprB.execute(index);
      if (this._offset < 0) throw "offset < 0";
    }
    index -= this._offset;
    if (index < 0) throw "index < 0";
    var result = this._exprA.execute(index);
    if (isNaN(result)) throw "NaN";
    return result;
  };

  var AndExpr = new_class(OpaExpr);

  var OrExpr = new_class(OpaExpr);

  AndExpr.prototype._cTruct = function(a, b) {
    AndExpr.__classId._cTruct.call(this, a, b);
  };

  OrExpr.prototype._cTruct = function(a, b) {
    OrExpr.__classId._cTruct.call(this, a, b);
  };

  AndExpr.prototype.execute = function(index) {
    return this._exprA.execute(index) != 0 && this._exprB.execute(index) != 0
      ? 1
      : 0;
  };

  OrExpr.prototype.execute = function(index) {
    return this._exprA.execute(index) != 0 || this._exprB.execute(index) != 0
      ? 1
      : 0;
  };

  var IfExpr = new_class(OpBExpr);

  IfExpr.prototype._cTruct = function(a, b, c) {
    IfExpr.__classId._cTruct.call(this, a, b, c);
  };

  IfExpr.prototype.execute = function(index) {
    return this._exprA.execute(index) != 0
      ? this._exprB.execute(index)
      : this._exprC.execute(index);
  };

  var AssignExpr = new_class(OPENExpr);

  AssignExpr.prototype._cTruct = function(name, a) {
    AssignExpr.__classId._cTruct.call(this, a);
    this._name = name;
    this._buf = [];
  };

  AssignExpr.prototype.getName = function() {
    return this._name;
  };

  AssignExpr.prototype.execute = function(index) {
    return this._buf[index];
  };

  AssignExpr.prototype.assign = function(index) {
    this._buf[index] = this._exprA.execute(index);
    if (eEnv.get()._firstIndex >= 0)
      if (isNaN(this._buf[index]) && !isNaN(this._buf[index - 1]))
        throw this._name + ".assign(" + index + "): NaN";
  };

  AssignExpr.prototype.reserve = function(rid, count) {
    if (this._rid < rid) {
      for (var c = count; c > 0; c--) this._buf.push(NaN);
    }
    AssignExpr.__classId.reserve.call(this, rid, count);
  };

  AssignExpr.prototype.clear = function() {
    AssignExpr.__classId.clear.call(this);
    this._buf = [];
  };

  var _out_put_style = {
    None: 0,
    Line: 1,
    VolumeStick: 2,
    MACDStick: 3,
    SARPoint: 4
  };

  var OutputExpr = new_class(AssignExpr);

  OutputExpr.prototype._cTruct = function(name, a, style, color) {
    OutputExpr.__classId._cTruct.call(this, name, a);
    this._style = style === undefined ? _out_put_style.Line : style;
    this._color = color;
  };

  OutputExpr.prototype.getStyle = function() {
    return this._style;
  };

  OutputExpr.prototype.getColor = function() {
    return this._color;
  };

  var _range_put = new_class(OutputExpr);

  _range_put.prototype._cTruct = function(name, a, style, color) {
    _range_put.__classId._cTruct.call(this, name, a, style, color);
  };

  _range_put.prototype.getName = function() {
    return this._name + this._exprA.getRange();
  };

  var RangeExpr = new_class(OpaExpr);

  RangeExpr.prototype._cTruct = function(a, b) {
    RangeExpr.__classId._cTruct.call(this, a, b);
    this._range = -1;
    this._buf = [];
  };

  RangeExpr.prototype.getRange = function() {
    return this._range;
  };

  RangeExpr.prototype.initRange = function() {
    this._range = this._exprB.execute(0);
  };

  RangeExpr.prototype.execute = function(index) {
    if (this._range < 0) this.initRange();
    var rA = (this._buf[index].resultA = this._exprA.execute(index));
    var r = (this._buf[index].result = this.calcResult(index, rA));
    return r;
  };

  RangeExpr.prototype.reserve = function(rid, count) {
    if (this._rid < rid) {
      for (var c = count; c > 0; c--)
        this._buf.push({
          resultA: NaN,
          result: NaN
        });
    }
    RangeExpr.__classId.reserve.call(this, rid, count);
  };

  RangeExpr.prototype.clear = function() {
    RangeExpr.__classId.clear.call(this);
    this._range = -1;
    this._buf = [];
  };

  var HhvExpr = new_class(RangeExpr);

  var LlvExpr = new_class(RangeExpr);

  HhvExpr.prototype._cTruct = function(a, b) {
    HhvExpr.__classId._cTruct.call(this, a, b);
  };

  LlvExpr.prototype._cTruct = function(a, b) {
    LlvExpr.__classId._cTruct.call(this, a, b);
  };

  HhvExpr.prototype.calcResult = function(index, resultA) {
    if (this._range == 0) return NaN;
    var first = eEnv.get()._firstIndex;
    if (first < 0) return resultA;
    if (index > first) {
      var n = this._range;
      var result = resultA;
      var start = index - n + 1;
      var i = Math.max(first, start);
      for (; i < index; i++) {
        var p = this._buf[i];
        if (result < p.resultA) result = p.resultA;
      }
      return result;
    } else {
      return resultA;
    }
  };

  LlvExpr.prototype.calcResult = function(index, resultA) {
    if (this._range == 0) return NaN;
    var first = eEnv.get()._firstIndex;
    if (first < 0) return resultA;
    if (index > first) {
      var n = this._range;
      var result = resultA;
      var start = index - n + 1;
      var i = Math.max(first, start);
      for (; i < index; i++) {
        var p = this._buf[i];
        if (result > p.resultA) result = p.resultA;
      }
      return result;
    } else {
      return resultA;
    }
  };

  var CountExpr = new_class(RangeExpr);

  CountExpr.prototype._cTruct = function(a, b) {
    CountExpr.__classId._cTruct.call(this, a, b);
  };

  CountExpr.prototype.calcResult = function(index, resultA) {
    if (this._range == 0) return NaN;
    var first = eEnv.get()._firstIndex;
    if (first < 0) return 0;
    if (index >= first) {
      var n = this._range - 1;
      if (n > index - first) n = index - first;
      var count = 0;
      for (; n >= 0; n--) {
        if (this._buf[index - n].resultA != 0) count++;
      }
      return count;
    } else {
      return 0;
    }
  };

  var SumExpr = new_class(RangeExpr);

  SumExpr.prototype._cTruct = function(a, b) {
    SumExpr.__classId._cTruct.call(this, a, b);
  };

  SumExpr.prototype.calcResult = function(index, resultA) {
    var first = eEnv.get()._firstIndex;
    if (first < 0) return resultA;
    if (index > first) {
      var n = this._range;
      if (n == 0 || n >= index + 1 - first) {
        return this._buf[index - 1].result + resultA;
      }
      return (
        this._buf[index - 1].result + resultA - this._buf[index - n].resultA
      );
    } else {
      return resultA;
    }
  };

  var StdExpr = new_class(RangeExpr);

  StdExpr.prototype._cTruct = function(a, b) {
    StdExpr.__classId._cTruct.call(this, a, b);
  };

  StdExpr.prototype.calcResult = function(index, resultA) {
    if (this._range == 0) return NaN;
    var stdData = this._stdBuf[index];
    var first = eEnv.get()._firstIndex;
    if (first < 0) {
      stdData.resultMA = resultA;
      return 0;
    }
    if (index > first) {
      var n = this._range;
      if (n >= index + 1 - first) {
        n = index + 1 - first;
        stdData.resultMA =
          this._stdBuf[index - 1].resultMA * (1 - 1 / n) + resultA / n;
      } else {
        stdData.resultMA =
          this._stdBuf[index - 1].resultMA +
          (resultA - this._buf[index - n].resultA) / n;
      }
      var sum = 0;
      for (var i = index - n + 1; i <= index; i++)
        sum += Math.pow(this._buf[i].resultA - stdData.resultMA, 2);
      return Math.sqrt(sum / n);
    }
    stdData.resultMA = resultA;
    return 0;
  };

  StdExpr.prototype.reserve = function(rid, count) {
    if (this._rid < rid) {
      for (var c = count; c > 0; c--)
        this._stdBuf.push({
          resultMA: NaN
        });
    }
    StdExpr.__classId.reserve.call(this, rid, count);
  };

  StdExpr.prototype.clear = function() {
    StdExpr.__classId.clear.call(this);
    this._stdBuf = [];
  };

  var MaExpr = new_class(RangeExpr);

  MaExpr.prototype._cTruct = function(a, b) {
    MaExpr.__classId._cTruct.call(this, a, b);
  };

  MaExpr.prototype.calcResult = function(index, resultA) {
    if (this._range == 0) return NaN;
    var first = eEnv.get()._firstIndex;
    if (first < 0) return resultA;
    if (index > first) {
      var n = this._range;
      if (n >= index + 1 - first) {
        n = index + 1 - first;
        return this._buf[index - 1].result * (1 - 1 / n) + resultA / n;
      }
      return (
        this._buf[index - 1].result +
        (resultA - this._buf[index - n].resultA) / n
      );
    } else {
      return resultA;
    }
  };

  var EmaExpr = new_class(RangeExpr);

  EmaExpr.prototype._cTruct = function(a, b) {
    EmaExpr.__classId._cTruct.call(this, a, b);
  };

  EmaExpr.prototype.initRange = function() {
    EmaExpr.__classId.initRange.call(this);
    this._alpha = 2 / (this._range + 1);
  };

  EmaExpr.prototype.calcResult = function(index, resultA) {
    if (this._range == 0) return NaN;
    var first = eEnv.get()._firstIndex;
    if (first < 0) return resultA;
    if (index > first) {
      var prev = this._buf[index - 1];
      return this._alpha * (resultA - prev.result) + prev.result;
    }
    return resultA;
  };

  var ExzmExpr = new_class(EmaExpr);

  ExzmExpr.prototype._cTruct = function(a, b) {
    ExzmExpr.__classId._cTruct.call(this, a, b);
  };

  ExzmExpr.prototype.calcResult = function(index, resultA) {
    var first = eEnv.get()._firstIndex;
    if (first < 0) return resultA;
    if (index > first) {
      var n = this._range;
      var prev = this._buf[index - 1];
      if (n >= index + 1 - first) {
        n = index + 1 - first;
        return prev.result * (1 - 1 / n) + resultA / n;
      }
      return this._alpha * (resultA - prev.result) + prev.result;
    }
    return resultA;
  };

  var SmaExpr = new_class(RangeExpr);

  SmaExpr.prototype._cTruct = function(a, b, c) {
    SmaExpr.__classId._cTruct.call(this, a, b);
    this._exprC = c;
    this._mul;
  };

  SmaExpr.prototype.initRange = function() {
    SmaExpr.__classId.initRange.call(this);
    this._mul = this._exprC.execute(0);
  };

  SmaExpr.prototype.calcResult = function(index, resultA) {
    if (this._range == 0) return NaN;
    var first = eEnv.get()._firstIndex;
    if (first < 0) return resultA;
    if (index > first) {
      var n = this._range;
      if (n > index + 1 - first) n = index + 1 - first;
      return ((n - 1) * this._buf[index - 1].result + resultA * this._mul) / n;
    }
    return resultA;
  };

  var SarExpr = new_class(OpCDExpr);

  SarExpr.prototype._cTruct = function(a, b, c, d) {
    SarExpr.__classId._cTruct.call(this, a, b, c, d);
    this._buf = [];
    this._range = -1;
    this._min;
    this._step;
    this._max;
  };

  SarExpr.prototype.execute = function(index) {
    if (this._range < 0) {
      this._range = this._exprA.execute(0);
      this._min = this._exprB.execute(0) / 100;
      this._step = this._exprC.execute(0) / 100;
      this._max = this._exprD.execute(0) / 100;
    }
    var data = this._buf[index];
    var eEnv = eEnv.get();
    var first = eEnv._firstIndex;
    if (first < 0) {
      data.longPos = true;
      data.sar = eEnv._ds.getDataAt(index).low;
      data.ep = eEnv._ds.getDataAt(index).high;
      data.af = 0.02;
    } else {
      var high = eEnv._ds.getDataAt(index).high;
      var low = eEnv._ds.getDataAt(index).low;
      var prev = this._buf[index - 1];
      data.sar = prev.sar + prev.af * (prev.ep - prev.sar);
      if (prev.longPos) {
        data.longPos = true;
        if (high > prev.ep) {
          data.ep = high;
          data.af = Math.min(prev.af + this._step, this._max);
        } else {
          data.ep = prev.ep;
          data.af = prev.af;
        }
        if (data.sar > low) {
          data.longPos = false;
          var i = index - this._range + 1;
          for (i = Math.max(i, first); i < index; i++) {
            var h = eEnv._ds.getDataAt(i).high;
            if (high < h) high = h;
          }
          data.sar = high;
          data.ep = low;
          data.af = 0.02;
        }
      } else {
        data.longPos = false;
        if (low < prev.ep) {
          data.ep = low;
          data.af = Math.min(prev.af + this._step, this._max);
        } else {
          data.ep = prev.ep;
          data.af = prev.af;
        }
        if (data.sar < high) {
          data.longPos = true;
          var i = index - this._range + 1;
          for (i = Math.max(i, first); i < index; i++) {
            var l = eEnv._ds.getDataAt(i).low;
            if (low > l) low = l;
          }
          data.sar = low;
          data.ep = high;
          data.af = 0.02;
        }
      }
    }
    return data.sar;
  };

  SarExpr.prototype.reserve = function(rid, count) {
    if (this._rid < rid) {
      for (var c = count; c > 0; c--)
        this._buf.push({
          longPos: true,
          sar: NaN,
          ep: NaN,
          af: NaN
        });
    }
    SarExpr.__classId.reserve.call(this, rid, count);
  };

  SarExpr.prototype.clear = function() {
    SarExpr.__classId.clear.call(this);
    this._range = -1;
  };

  var _indtor = new_class();

  _indtor.prototype._cTruct = function() {
    this._eEnv = new eEnv();
    this._rid = 0;
    this._params = [];
    this._as = [];
    this._outputs = [];
  };

  _indtor.prototype._add_pmeter = function(expr) {
    this._params.push(expr);
  };

  _indtor.prototype.addAssign = function(expr) {
    this._as.push(expr);
  };

  _indtor.prototype._add_outP = function(expr) {
    this._outputs.push(expr);
  };

  _indtor.prototype.getPCount = function() {
    return this._params.length;
  };

  _indtor.prototype.getParameterAt = function(index) {
    return this._params[index];
  };

  _indtor.prototype.getOutputCount = function() {
    return this._outputs.length;
  };

  _indtor.prototype.getOutputAt = function(index) {
    return this._outputs[index];
  };

  _indtor.prototype.clear = function() {
    this._eEnv.setFirstIndex(-1);
    var i, cnt;
    cnt = this._as.length;
    for (i = 0; i < cnt; i++) {
      this._as[i].clear();
    }
    cnt = this._outputs.length;
    for (i = 0; i < cnt; i++) {
      this._outputs[i].clear();
    }
  };

  _indtor.prototype.reserve = function(count) {
    this._rid++;
    var i, cnt;
    cnt = this._as.length;
    for (i = 0; i < cnt; i++) {
      this._as[i].reserve(this._rid, count);
    }
    cnt = this._outputs.length;
    for (i = 0; i < cnt; i++) {
      this._outputs[i].reserve(this._rid, count);
    }
  };

  _indtor.prototype.execute = function(ds, index) {
    if (index < 0) return;
    this._eEnv.setDataSource(ds);
    eEnv.set(this._eEnv);
    try {
      var i, cnt;
      cnt = this._as.length;
      for (i = 0; i < cnt; i++) {
        this._as[i].assign(index);
      }
      cnt = this._outputs.length;
      for (i = 0; i < cnt; i++) {
        this._outputs[i].assign(index);
      }
      if (this._eEnv.getFirstIndex() < 0) this._eEnv.setFirstIndex(index);
    } catch (e) {
      if (this._eEnv.getFirstIndex() >= 0) {
        console.log(e);
        throw e;
      }
    }
  };

  _indtor.prototype.getParameters = function() {
    var params = [];
    var i,
      cnt = this._params.length;
    for (i = 0; i < cnt; i++) params.push(this._params[i].getValue());
    return params;
  };

  _indtor.prototype.setParameters = function(params) {
    if (params instanceof Array && params.length == this._params.length) {
      for (var i in this._params) this._params[i].setValue(params[i]);
    }
  };

  var hlcInd = new_class(_indtor);

  hlcInd.prototype._cTruct = function() {
    hlcInd.__classId._cTruct.call(this);
    var M1 = new PExpr("M1", 2, 1e3, 60);
    this._add_pmeter(M1);
    this._add_outP(new OutputExpr("HIGH", new HighExpr(), _out_put_style.None));
    this._add_outP(new OutputExpr("LOW", new LowExpr(), _out_put_style.None));
    this._add_outP(
      new OutputExpr(
        "CLOSE",
        new CloseExpr(),
        _out_put_style.Line,
        Theme.Co._indtor0
      )
    );
    this._add_outP(
      new _range_put(
        "MA",
        new MaExpr(new CloseExpr(), M1),
        _out_put_style.Line,
        Theme.Co._indtor1
      )
    );
  };

  hlcInd.prototype.getName = function() {
    return "CLOSE";
  };

  var __indtor = new_class(_indtor);

  __indtor.prototype._cTruct = function() {
    __indtor.__classId._cTruct.call(this);
    var M1 = new PExpr("M1", 2, 1e3, 7);
    var M2 = new PExpr("M2", 2, 1e3, 30);
    var M3 = new PExpr("M3", 2, 1e3, 0);
    var M4 = new PExpr("M4", 2, 1e3, 0);
    this._add_pmeter(M1);
    this._add_pmeter(M2);
    this._add_pmeter(M3);
    this._add_pmeter(M4);
    this._add_outP(new _range_put("MA", new MaExpr(new CloseExpr(), M1)));
    this._add_outP(new _range_put("MA", new MaExpr(new CloseExpr(), M2)));
    this._add_outP(new _range_put("MA", new MaExpr(new CloseExpr(), M3)));
    this._add_outP(new _range_put("MA", new MaExpr(new CloseExpr(), M4)));
  };

  __indtor.prototype.getName = function() {
    return "MA";
  };

  var _new_indtor = new_class(_indtor);

  _new_indtor.prototype._cTruct = function() {
    _new_indtor.__classId._cTruct.call(this);
    var M1 = new PExpr("M1", 2, 1e3, 7);
    var M2 = new PExpr("M2", 2, 1e3, 30);
    var M3 = new PExpr("M3", 2, 1e3, 0);
    var M4 = new PExpr("M4", 2, 1e3, 0);
    this._add_pmeter(M1);
    this._add_pmeter(M2);
    this._add_pmeter(M3);
    this._add_pmeter(M4);
    this._add_outP(new _range_put("EMA", new EmaExpr(new CloseExpr(), M1)));
    this._add_outP(new _range_put("EMA", new EmaExpr(new CloseExpr(), M2)));
    this._add_outP(new _range_put("EMA", new EmaExpr(new CloseExpr(), M3)));
    this._add_outP(new _range_put("EMA", new EmaExpr(new CloseExpr(), M4)));
  };

  _new_indtor.prototype.getName = function() {
    return "EMA";
  };

  var _vo_indtor = new_class(_indtor);

  _vo_indtor.prototype._cTruct = function() {
    _vo_indtor.__classId._cTruct.call(this);
    var M1 = new PExpr("M1", 2, 500, 5);
    var M2 = new PExpr("M2", 2, 500, 10);
    this._add_pmeter(M1);
    this._add_pmeter(M2);
    var VOLUME = new OutputExpr(
      "VOLUME",
      new VolumeExpr(),
      _out_put_style.VolumeStick,
      Theme.Co.Text4
    );
    this._add_outP(VOLUME);
    this._add_outP(
      new _range_put(
        "MA",
        new MaExpr(VOLUME, M1),
        _out_put_style.Line,
        Theme.Co._indtor0
      )
    );
    this._add_outP(
      new _range_put(
        "MA",
        new MaExpr(VOLUME, M2),
        _out_put_style.Line,
        Theme.Co._indtor1
      )
    );
  };

  _vo_indtor.prototype.getName = function() {
    return "VOLUME";
  };

  var _MACD_indtor = new_class(_indtor);

  _MACD_indtor.prototype._cTruct = function() {
    _MACD_indtor.__classId._cTruct.call(this);
    var SHORT = new PExpr("SHORT", 2, 200, 12);
    var LONG = new PExpr("LONG", 2, 200, 26);
    var MID = new PExpr("MID", 2, 200, 9);
    this._add_pmeter(SHORT);
    this._add_pmeter(LONG);
    this._add_pmeter(MID);
    var DIF = new OutputExpr(
      "DIF",
      new SubExpr(
        new EmaExpr(new CloseExpr(), SHORT),
        new EmaExpr(new CloseExpr(), LONG)
      )
    );
    this._add_outP(DIF);
    var DEA = new OutputExpr("DEA", new EmaExpr(DIF, MID));
    this._add_outP(DEA);
    var MACD = new OutputExpr(
      "MACD",
      new MulExpr(new SubExpr(DIF, DEA), new ConstExpr(2)),
      _out_put_style.MACDStick
    );
    this._add_outP(MACD);
  };

  _MACD_indtor.prototype.getName = function() {
    return "MACD";
  };

  var _DMI_indtor = new_class(_indtor);

  _DMI_indtor.prototype._cTruct = function() {
    _DMI_indtor.__classId._cTruct.call(this);
    var N = new PExpr("N", 2, 90, 14);
    var MM = new PExpr("MM", 2, 60, 6);
    this._add_pmeter(N);
    this._add_pmeter(MM);
    var MTR = new AssignExpr(
      "MTR",
      new ExzmExpr(
        new MaxExpr(
          new MaxExpr(
            new SubExpr(new HighExpr(), new LowExpr()),
            new AbsExpr(
              new SubExpr(
                new HighExpr(),
                new RefExpr(new CloseExpr(), new ConstExpr(1))
              )
            )
          ),
          new AbsExpr(
            new SubExpr(
              new RefExpr(new CloseExpr(), new ConstExpr(1)),
              new LowExpr()
            )
          )
        ),
        N
      )
    );
    this.addAssign(MTR);
    var HD = new AssignExpr(
      "HD",
      new SubExpr(new HighExpr(), new RefExpr(new HighExpr(), new ConstExpr(1)))
    );
    this.addAssign(HD);
    var LD = new AssignExpr(
      "LD",
      new SubExpr(new RefExpr(new LowExpr(), new ConstExpr(1)), new LowExpr())
    );
    this.addAssign(LD);
    var DMP = new AssignExpr(
      "DMP",
      new ExzmExpr(
        new IfExpr(
          new AndExpr(new GtExpr(HD, new ConstExpr(0)), new GtExpr(HD, LD)),
          HD,
          new ConstExpr(0)
        ),
        N
      )
    );
    this.addAssign(DMP);
    var DMM = new AssignExpr(
      "DMM",
      new ExzmExpr(
        new IfExpr(
          new AndExpr(new GtExpr(LD, new ConstExpr(0)), new GtExpr(LD, HD)),
          LD,
          new ConstExpr(0)
        ),
        N
      )
    );
    this.addAssign(DMM);
    var PDI = new OutputExpr(
      "PDI",
      new MulExpr(new DivExpr(DMP, MTR), new ConstExpr(100))
    );
    this._add_outP(PDI);
    var MDI = new OutputExpr(
      "MDI",
      new MulExpr(new DivExpr(DMM, MTR), new ConstExpr(100))
    );
    this._add_outP(MDI);
    var ADX = new OutputExpr(
      "ADX",
      new ExzmExpr(
        new MulExpr(
          new DivExpr(
            new AbsExpr(new SubExpr(MDI, PDI)),
            new AddExpr(MDI, PDI)
          ),
          new ConstExpr(100)
        ),
        MM
      )
    );
    this._add_outP(ADX);
    var ADXR = new OutputExpr("ADXR", new ExzmExpr(ADX, MM));
    this._add_outP(ADXR);
  };

  _DMI_indtor.prototype.getName = function() {
    return "DMI";
  };

  var D__indtor = new_class(_indtor);

  D__indtor.prototype._cTruct = function() {
    D__indtor.__classId._cTruct.call(this);
    var N1 = new PExpr("N1", 2, 60, 10);
    var N2 = new PExpr("N2", 2, 250, 50);
    var M = new PExpr("M", 2, 100, 10);
    this._add_pmeter(N1);
    this._add_pmeter(N2);
    this._add_pmeter(M);
    var DIF = new OutputExpr(
      "DIF",
      new SubExpr(
        new MaExpr(new CloseExpr(), N1),
        new MaExpr(new CloseExpr(), N2)
      )
    );
    this._add_outP(DIF);
    var DIFMA = new OutputExpr("DIFMA", new MaExpr(DIF, M));
    this._add_outP(DIFMA);
  };

  D__indtor.prototype.getName = function() {
    return "DMA";
  };

  var TRIX_indtor = new_class(_indtor);

  TRIX_indtor.prototype._cTruct = function() {
    TRIX_indtor.__classId._cTruct.call(this);
    var N = new PExpr("N", 2, 100, 12);
    var M = new PExpr("M", 2, 100, 9);
    this._add_pmeter(N);
    this._add_pmeter(M);
    var MTR = new AssignExpr(
      "MTR",
      new EmaExpr(new EmaExpr(new EmaExpr(new CloseExpr(), N), N), N)
    );
    this.addAssign(MTR);
    var TRIX = new OutputExpr(
      "TRIX",
      new MulExpr(
        new DivExpr(
          new SubExpr(MTR, new RefExpr(MTR, new ConstExpr(1))),
          new RefExpr(MTR, new ConstExpr(1))
        ),
        new ConstExpr(100)
      )
    );
    this._add_outP(TRIX);
    var MATRIX = new OutputExpr("MATRIX", new MaExpr(TRIX, M));
    this._add_outP(MATRIX);
  };

  TRIX_indtor.prototype.getName = function() {
    return "TRIX";
  };

  var BRAR_indtor = new_class(_indtor);

  BRAR_indtor.prototype._cTruct = function() {
    BRAR_indtor.__classId._cTruct.call(this);
    var N = new PExpr("N", 2, 120, 26);
    this._add_pmeter(N);
    var REF_CLOSE_1 = new AssignExpr(
      "REF_CLOSE_1",
      new RefExpr(new CloseExpr(), new ConstExpr(1))
    );
    this.addAssign(REF_CLOSE_1);
    var BR = new OutputExpr(
      "BR",
      new MulExpr(
        new DivExpr(
          new SumExpr(
            new MaxExpr(
              new ConstExpr(0),
              new SubExpr(new HighExpr(), REF_CLOSE_1)
            ),
            N
          ),
          new SumExpr(
            new MaxExpr(
              new ConstExpr(0),
              new SubExpr(REF_CLOSE_1, new LowExpr())
            ),
            N
          )
        ),
        new ConstExpr(100)
      )
    );
    this._add_outP(BR);
    var AR = new OutputExpr(
      "AR",
      new MulExpr(
        new DivExpr(
          new SumExpr(new SubExpr(new HighExpr(), new OpenExpr()), N),
          new SumExpr(new SubExpr(new OpenExpr(), new LowExpr()), N)
        ),
        new ConstExpr(100)
      )
    );
    this._add_outP(AR);
  };

  BRAR_indtor.prototype.getName = function() {
    return "BRAR";
  };

  var VR_indtor = new_class(_indtor);

  VR_indtor.prototype._cTruct = function() {
    VR_indtor.__classId._cTruct.call(this);
    var N = new PExpr("N", 2, 100, 26);
    var M = new PExpr("M", 2, 100, 6);
    this._add_pmeter(N);
    this._add_pmeter(M);
    var REF_CLOSE_1 = new AssignExpr(
      "REF_CLOSE_1",
      new RefExpr(new CloseExpr(), new ConstExpr(1))
    );
    this.addAssign(REF_CLOSE_1);
    var TH = new AssignExpr(
      "TH",
      new SumExpr(
        new IfExpr(
          new GtExpr(new CloseExpr(), REF_CLOSE_1),
          new VolumeExpr(),
          new ConstExpr(0)
        ),
        N
      )
    );
    this.addAssign(TH);
    var TL = new AssignExpr(
      "TL",
      new SumExpr(
        new IfExpr(
          new LtExpr(new CloseExpr(), REF_CLOSE_1),
          new VolumeExpr(),
          new ConstExpr(0)
        ),
        N
      )
    );
    this.addAssign(TL);
    var TQ = new AssignExpr(
      "TQ",
      new SumExpr(
        new IfExpr(
          new EqExpr(new CloseExpr(), REF_CLOSE_1),
          new VolumeExpr(),
          new ConstExpr(0)
        ),
        N
      )
    );
    this.addAssign(TQ);
    var VR = new OutputExpr(
      "VR",
      new MulExpr(
        new DivExpr(
          new AddExpr(new MulExpr(TH, new ConstExpr(2)), TQ),
          new AddExpr(new MulExpr(TL, new ConstExpr(2)), TQ)
        ),
        new ConstExpr(100)
      )
    );
    this._add_outP(VR);
    var MAVR = new OutputExpr("MAVR", new MaExpr(VR, M));
    this._add_outP(MAVR);
  };

  VR_indtor.prototype.getName = function() {
    return "VR";
  };

  var OBV_indtor = new_class(_indtor);

  OBV_indtor.prototype._cTruct = function() {
    OBV_indtor.__classId._cTruct.call(this);
    var M = new PExpr("M", 2, 100, 30);
    this._add_pmeter(M);
    var REF_CLOSE_1 = new AssignExpr(
      "REF_CLOSE_1",
      new RefExpr(new CloseExpr(), new ConstExpr(1))
    );
    this.addAssign(REF_CLOSE_1);
    var VA = new AssignExpr(
      "VA",
      new IfExpr(
        new GtExpr(new CloseExpr(), REF_CLOSE_1),
        new VolumeExpr(),
        new NegExpr(new VolumeExpr())
      )
    );
    this.addAssign(VA);
    var OBV = new OutputExpr(
      "OBV",
      new SumExpr(
        new IfExpr(
          new EqExpr(new CloseExpr(), REF_CLOSE_1),
          new ConstExpr(0),
          VA
        ),
        new ConstExpr(0)
      )
    );
    this._add_outP(OBV);
    var MAOBV = new OutputExpr("MAOBV", new MaExpr(OBV, M));
    this._add_outP(MAOBV);
  };

  OBV_indtor.prototype.getName = function() {
    return "OBV";
  };

  var _EMV_indtor = new_class(_indtor);

  _EMV_indtor.prototype._cTruct = function() {
    _EMV_indtor.__classId._cTruct.call(this);
    var N = new PExpr("N", 2, 90, 14);
    var M = new PExpr("M", 2, 60, 9);
    this._add_pmeter(N);
    this._add_pmeter(M);
    var VOLUME = new AssignExpr(
      "VOLUME",
      new DivExpr(new MaExpr(new VolumeExpr(), N), new VolumeExpr())
    );
    this.addAssign(VOLUME);
    var MID = new AssignExpr(
      "MID",
      new MulExpr(
        new DivExpr(
          new SubExpr(
            new AddExpr(new HighExpr(), new LowExpr()),
            new RefExpr(
              new AddExpr(new HighExpr(), new LowExpr()),
              new ConstExpr(1)
            )
          ),
          new AddExpr(new HighExpr(), new LowExpr())
        ),
        new ConstExpr(100)
      )
    );
    this.addAssign(MID);
    var EMV = new OutputExpr(
      "EMV",
      new MaExpr(
        new DivExpr(
          new MulExpr(
            MID,
            new MulExpr(VOLUME, new SubExpr(new HighExpr(), new LowExpr()))
          ),
          new MaExpr(new SubExpr(new HighExpr(), new LowExpr()), N)
        ),
        N
      )
    );
    this._add_outP(EMV);
    var MAEMV = new OutputExpr("MAEMV", new MaExpr(EMV, M));
    this._add_outP(MAEMV);
  };

  _EMV_indtor.prototype.getName = function() {
    return "EMV";
  };

  var RSI_indtor = new_class(_indtor);

  RSI_indtor.prototype._cTruct = function() {
    RSI_indtor.__classId._cTruct.call(this);
    var N1 = new PExpr("N1", 2, 120, 6);
    var N2 = new PExpr("N2", 2, 250, 12);
    var N3 = new PExpr("N3", 2, 500, 24);
    this._add_pmeter(N1);
    this._add_pmeter(N2);
    this._add_pmeter(N3);
    var LC = new AssignExpr(
      "LC",
      new RefExpr(new CloseExpr(), new ConstExpr(1))
    );
    this.addAssign(LC);
    var CLOSE_LC = new AssignExpr("CLOSE_LC", new SubExpr(new CloseExpr(), LC));
    this.addAssign(CLOSE_LC);
    this._add_outP(
      new OutputExpr(
        "RSI1",
        new MulExpr(
          new DivExpr(
            new SmaExpr(
              new MaxExpr(CLOSE_LC, new ConstExpr(0)),
              N1,
              new ConstExpr(1)
            ),
            new SmaExpr(new AbsExpr(CLOSE_LC), N1, new ConstExpr(1))
          ),
          new ConstExpr(100)
        )
      )
    );
    this._add_outP(
      new OutputExpr(
        "RSI2",
        new MulExpr(
          new DivExpr(
            new SmaExpr(
              new MaxExpr(CLOSE_LC, new ConstExpr(0)),
              N2,
              new ConstExpr(1)
            ),
            new SmaExpr(new AbsExpr(CLOSE_LC), N2, new ConstExpr(1))
          ),
          new ConstExpr(100)
        )
      )
    );
    this._add_outP(
      new OutputExpr(
        "RSI3",
        new MulExpr(
          new DivExpr(
            new SmaExpr(
              new MaxExpr(CLOSE_LC, new ConstExpr(0)),
              N3,
              new ConstExpr(1)
            ),
            new SmaExpr(new AbsExpr(CLOSE_LC), N3, new ConstExpr(1))
          ),
          new ConstExpr(100)
        )
      )
    );
  };

  RSI_indtor.prototype.getName = function() {
    return "RSI";
  };

  var WR_indtor = new_class(_indtor);

  WR_indtor.prototype._cTruct = function() {
    WR_indtor.__classId._cTruct.call(this);
    var N = new PExpr("N", 2, 100, 10);
    var N1 = new PExpr("N1", 2, 100, 6);
    this._add_pmeter(N);
    this._add_pmeter(N1);
    var HHV = new AssignExpr("HHV", new HhvExpr(new HighExpr(), N));
    this.addAssign(HHV);
    var HHV1 = new AssignExpr("HHV1", new HhvExpr(new HighExpr(), N1));
    this.addAssign(HHV1);
    var LLV = new AssignExpr("LLV", new LlvExpr(new LowExpr(), N));
    this.addAssign(LLV);
    var LLV1 = new AssignExpr("LLV1", new LlvExpr(new LowExpr(), N1));
    this.addAssign(LLV1);
    var WR1 = new OutputExpr(
      "WR1",
      new MulExpr(
        new DivExpr(new SubExpr(HHV, new CloseExpr()), new SubExpr(HHV, LLV)),
        new ConstExpr(100)
      )
    );
    this._add_outP(WR1);
    var WR2 = new OutputExpr(
      "WR2",
      new MulExpr(
        new DivExpr(
          new SubExpr(HHV1, new CloseExpr()),
          new SubExpr(HHV1, LLV1)
        ),
        new ConstExpr(100)
      )
    );
    this._add_outP(WR2);
  };

  WR_indtor.prototype.getName = function() {
    return "WR";
  };

  var SAR_indtor = new_class(_indtor);

  SAR_indtor.prototype._cTruct = function() {
    SAR_indtor.__classId._cTruct.call(this);
    var N = new ConstExpr(4);
    var MIN = new ConstExpr(2);
    var STEP = new ConstExpr(2);
    var MAX = new ConstExpr(20);
    this._add_outP(
      new OutputExpr(
        "SAR",
        new SarExpr(N, MIN, STEP, MAX),
        _out_put_style.SARPoint
      )
    );
  };

  SAR_indtor.prototype.getName = function() {
    return "SAR";
  };

  var KDJ_indtor = new_class(_indtor);

  KDJ_indtor.prototype._cTruct = function() {
    KDJ_indtor.__classId._cTruct.call(this);
    var N = new PExpr("N", 2, 90, 9);
    var M1 = new PExpr("M1", 2, 30, 3);
    var M2 = new PExpr("M2", 2, 30, 3);
    this._add_pmeter(N);
    this._add_pmeter(M1);
    this._add_pmeter(M2);
    var HHV = new AssignExpr("HHV", new HhvExpr(new HighExpr(), N));
    this.addAssign(HHV);
    var LLV = new AssignExpr("LLV", new LlvExpr(new LowExpr(), N));
    this.addAssign(LLV);
    var RSV = new AssignExpr(
      "RSV",
      new MulExpr(
        new DivExpr(new SubExpr(new CloseExpr(), LLV), new SubExpr(HHV, LLV)),
        new ConstExpr(100)
      )
    );
    this.addAssign(RSV);
    var K = new OutputExpr("K", new SmaExpr(RSV, M1, new ConstExpr(1)));
    this._add_outP(K);
    var D = new OutputExpr("D", new SmaExpr(K, M2, new ConstExpr(1)));
    this._add_outP(D);
    var J = new OutputExpr(
      "J",
      new SubExpr(
        new MulExpr(K, new ConstExpr(3)),
        new MulExpr(D, new ConstExpr(2))
      )
    );
    this._add_outP(J);
  };

  KDJ_indtor.prototype.getName = function() {
    return "KDJ";
  };

  var ROC_indtor = new_class(_indtor);

  ROC_indtor.prototype._cTruct = function() {
    ROC_indtor.__classId._cTruct.call(this);
    var N = new PExpr("N", 2, 120, 12);
    var M = new PExpr("M", 2, 60, 6);
    this._add_pmeter(N);
    this._add_pmeter(M);
    var REF_CLOSE_N = new AssignExpr(
      "REF_CLOSE_N",
      new RefExpr(new CloseExpr(), N)
    );
    this.addAssign(REF_CLOSE_N);
    var ROC = new OutputExpr(
      "ROC",
      new MulExpr(
        new DivExpr(new SubExpr(new CloseExpr(), REF_CLOSE_N), REF_CLOSE_N),
        new ConstExpr(100)
      )
    );
    this._add_outP(ROC);
    var MAROC = new OutputExpr("MAROC", new MaExpr(ROC, M));
    this._add_outP(MAROC);
  };

  ROC_indtor.prototype.getName = function() {
    return "ROC";
  };

  var MTM_indtor = new_class(_indtor);

  MTM_indtor.prototype._cTruct = function() {
    MTM_indtor.__classId._cTruct.call(this);
    var N = new PExpr("N", 2, 120, 12);
    var M = new PExpr("M", 2, 60, 6);
    this._add_pmeter(N);
    this._add_pmeter(M);
    var MTM = new OutputExpr(
      "MTM",
      new SubExpr(new CloseExpr(), new RefExpr(new CloseExpr(), N))
    );
    this._add_outP(MTM);
    var MTMMA = new OutputExpr("MTMMA", new MaExpr(MTM, M));
    this._add_outP(MTMMA);
  };

  MTM_indtor.prototype.getName = function() {
    return "MTM";
  };

  var BOLL_indtor = new_class(_indtor);

  BOLL_indtor.prototype._cTruct = function() {
    BOLL_indtor.__classId._cTruct.call(this);
    var N = new PExpr("N", 2, 120, 20);
    this._add_pmeter(N);
    var STD_CLOSE_N = new AssignExpr(
      "STD_CLOSE_N",
      new StdExpr(new CloseExpr(), N)
    );
    this.addAssign(STD_CLOSE_N);
    var BOLL = new OutputExpr("BOLL", new MaExpr(new CloseExpr(), N));
    this._add_outP(BOLL);
    var UB = new OutputExpr(
      "UB",
      new AddExpr(BOLL, new MulExpr(new ConstExpr(2), STD_CLOSE_N))
    );
    this._add_outP(UB);
    var LB = new OutputExpr(
      "LB",
      new SubExpr(BOLL, new MulExpr(new ConstExpr(2), STD_CLOSE_N))
    );
    this._add_outP(LB);
  };

  BOLL_indtor.prototype.getName = function() {
    return "BOLL";
  };

  var PSY_indtor = new_class(_indtor);

  PSY_indtor.prototype._cTruct = function() {
    PSY_indtor.__classId._cTruct.call(this);
    var N = new PExpr("N", 2, 100, 12);
    var M = new PExpr("M", 2, 100, 6);
    this._add_pmeter(N);
    this._add_pmeter(M);
    var PSY = new OutputExpr(
      "PSY",
      new MulExpr(
        new DivExpr(
          new CountExpr(
            new GtExpr(
              new CloseExpr(),
              new RefExpr(new CloseExpr(), new ConstExpr(1))
            ),
            N
          ),
          N
        ),
        new ConstExpr(100)
      )
    );
    this._add_outP(PSY);
    var PSYMA = new OutputExpr("PSYMA", new MaExpr(PSY, M));
    this._add_outP(PSYMA);
  };

  PSY_indtor.prototype.getName = function() {
    return "PSY";
  };

  var STOCHRSI_indtor = new_class(_indtor);

  STOCHRSI_indtor.prototype._cTruct = function() {
    STOCHRSI_indtor.__classId._cTruct.call(this);
    var N = new PExpr("N", 3, 100, 14);
    var M = new PExpr("M", 3, 100, 14);
    var P1 = new PExpr("P1", 2, 50, 3);
    var P2 = new PExpr("P2", 2, 50, 3);
    this._add_pmeter(N);
    this._add_pmeter(M);
    this._add_pmeter(P1);
    this._add_pmeter(P2);
    var LC = new AssignExpr(
      "LC",
      new RefExpr(new CloseExpr(), new ConstExpr(1))
    );
    this.addAssign(LC);
    var CLOSE_LC = new AssignExpr("CLOSE_LC", new SubExpr(new CloseExpr(), LC));
    this.addAssign(CLOSE_LC);
    var RSI = new AssignExpr(
      "RSI",
      new MulExpr(
        new DivExpr(
          new SmaExpr(
            new MaxExpr(CLOSE_LC, new ConstExpr(0)),
            N,
            new ConstExpr(1)
          ),
          new SmaExpr(new AbsExpr(CLOSE_LC), N, new ConstExpr(1))
        ),
        new ConstExpr(100)
      )
    );
    this.addAssign(RSI);
    var STOCHRSI = new OutputExpr(
      "STOCHRSI",
      new MulExpr(
        new DivExpr(
          new MaExpr(new SubExpr(RSI, new LlvExpr(RSI, M)), P1),
          new MaExpr(new SubExpr(new HhvExpr(RSI, M), new LlvExpr(RSI, M)), P1)
        ),
        new ConstExpr(100)
      )
    );
    this._add_outP(STOCHRSI);
    this._add_outP(new _range_put("MA", new MaExpr(STOCHRSI, P2)));
  };

  STOCHRSI_indtor.prototype.getName = function() {
    return "StochRSI";
  };

  /**
   * Created by Administrator on 2015/3/16.
   */
  var Pushing = {
    State: {
      Uninitial: 0,
      Disable: 1,
      Enable: 2
    },
    state: 0,
    marketFrom: "",
    type: "",
    moneyType: "",
    coinVol: "",
    time: "",
    Response: function(marketFrom, type, coinVol, data) {
      if (Pushing.state != Pushing.State.Enable) return;
      if (
        Pushing.marketFrom != marketFrom ||
        Pushing.type != type ||
        Pushing.coinVol != coinVol
      )
        return;
      _Global._KData = data;
      if (_chart_man.getInstance().getChart()._money_type == 1) {
        var rate = _chart_man.getInstance().getChart()._usd_cny_rate;
        for (var i in _Global._KData) {
          var e = _Global._KData[i];
          e[1] = parseFloat((e[1] * rate).toFixed(2));
          e[2] = parseFloat((e[2] * rate).toFixed(2));
          e[3] = parseFloat((e[3] * rate).toFixed(2));
          e[4] = parseFloat((e[4] * rate).toFixed(2));
        }
      }
      try {
        if (!_Global.chartMgr.updateData("frame0.k0", _Global._KData)) {
          Pushing.Switch();
          _chart_man.getInstance().redraw("All", true);
          return;
        }
      } catch (_) {
        Pushing.Switch();
        _chart_man.getInstance().redraw("All", true);
        return;
      }
      clear_refresh_counter();
      _chart_man.getInstance().redraw("All", true);
    },
    Start: function(callback) {
      Pushing.state = Pushing.State.Enable;
      Pushing.PushFrom = callback;
      _chart_man
        .getInstance()
        .getChart()
        .updateDataAndDisplay2();
    },
    Stop: function() {
      Pushing.state = Pushing.State.Disable;
      _chart_man
        .getInstance()
        .getChart()
        .updateDataAndDisplay2();
    },
    Switch: function() {}
  };

  /**
   * Created by Administrator on 2014/11/19.
   */
  var Chart = new_class();

  Chart._future_btc_market_num = new Array("0", "-1", "-1", "-1", "-1");

  Chart._future_ltc_market_num = new Array("1", "-1", "-1", "-1", "-1");

  Chart.PushNameVar = {};

  function getCoinType(str) {
    return parseInt(str.toString().charAt(8));
  }

  Chart.prototype._cTruct = function() {
    this._data = null;
    this._charStyle = "CandleStick";
    this._depthData = {
      array: null,
      asks_count: 0,
      bids_count: 0,
      asks_si: 0,
      asks_ei: 0,
      bids_si: 0,
      bids_ei: 0
    };
    this._time = "2";
    this._market_from = "13";
    this._usd_cny_rate = 1;
    this._money_type = 0;
    this._contract_unit = 1;
    this.strIsLine = false;
    this.strCurrentMarket = 20141017001;
    this.strCurrentMarketType = 1;
  };

  Chart.prototype.setTitle = function() {};

  Chart.prototype.setCurrentList = function() {};

  Chart.prototype.setKlineIndex = function(type) {
    this._market_from = type;
    this.updateDataAndDisplay();
  };

  Chart.prototype.setCurrentCoin = function(coin) {
    this._market_from = coin.toString();
    this.updateDataAndDisplay();
  };

  Chart.prototype.setFutureList = function(content) {
    var btc = $("#chart_symbols_btc").find("span");
    var btc_li = $("#chart_symbols_btc").find("li");
    this.btc_obj = {};
    var ltc = $("#chart_symbols_ltc").find("span");
    var ltc_li = $("#chart_symbols_ltc").find("li");
    this.ltc_obj = {};
    for (var i = 1; i <= 4; i++) {
      this.btc_obj[i.toString()] = {};
      this.btc_obj[i.toString()].id = 0;
      this.btc_obj[i.toString()].type = 0;
      this.btc_obj[i.toString()].text = $(btc[2 * i - 1]);
      this.btc_obj[i.toString()].obj = $(btc_li[i - 1]);
      this.btc_obj[i.toString()].obj.css("display", "none");
      this.btc_obj[i.toString()].obj.attr("name", "0");
      this.ltc_obj[i.toString()] = {};
      this.ltc_obj[i.toString()].id = 0;
      this.ltc_obj[i.toString()].type = 0;
      this.ltc_obj[i.toString()].text = $(ltc[2 * i - 1]);
      this.ltc_obj[i.toString()].obj = $(ltc_li[i - 1]);
      this.ltc_obj[i.toString()].obj.css("display", "none");
      this.ltc_obj[i.toString()].obj.attr("name", "0");
    }
    for (var i = 0; i < content.length; i++) {
      var id = content[i].contractID;
      var type = content[i].type;
      if (getCoinType(id) == 0) {
        this.btc_obj[type].id = id;
        this.btc_obj[type].type = type;
        this.btc_obj[type].text.html(id.toString().slice(4, 8));
        this.btc_obj[type].obj.attr("name", id.toString());
        this.btc_obj[type].obj.css("display", "block");
        Chart._future_btc_market_num[type] = id
          .toString()
          .slice(id.toString().length - 2);
      } else if (getCoinType(id) == 1) {
        this.ltc_obj[type].id = id;
        this.ltc_obj[type].type = type;
        this.ltc_obj[type].text.html(id.toString().slice(4, 8));
        this.ltc_obj[type].obj.attr("name", id.toString());
        this.ltc_obj[type].obj.css("display", "block");
        Chart._future_ltc_market_num[type] = id
          .toString()
          .slice(id.toString().length - 2);
      }
    }
    for (var i = 0; i < Chart._future_btc_market_num.length; i++) {
      var tmp = Chart._future_btc_market_num[i].toString();
      if (tmp != "-1") Chart.PushNameVar[tmp] = "btc_" + Chart.PushNameCon[i];
    }
    for (var i = 0; i < Chart._future_ltc_market_num.length; i++) {
      var tmp = Chart._future_ltc_market_num[i].toString();
      if (tmp != "-1") Chart.PushNameVar[tmp] = "ltc_" + Chart.PushNameCon[i];
    }
  };

  Chart.prototype.updateDataAndDisplay = function() {
    Pushing.Switch();
  };

  Chart.prototype.updateDataAndDisplay2 = function() {
    _Global.mark_from = this._market_from;
    _Global.time_type = this._time;
    _Global.limit = "1000";
    this.setTitle();
    _chart_man
      .getInstance()
      .setCurrentDataSource(
        "frame0.k0",
        "行情图" +
          "." +
          this._market_from +
          "." +
          this._time +
          "." +
          this._money_type +
          "." +
          this._contract_unit
      );
    _chart_man.getInstance().setNormalMode();
    var f = _Global.chartMgr.getDataSource("frame0.k0").getLastDate();
    if (f == -1) {
      _Global.rParam = setHttpRequestParam(
        _Global.mark_from,
        _Global.time_type,
        "1000",
        null
      );
      RequestData(true);
    } else {
      _Global.rParam = setHttpRequestParam(
        _Global.mark_from,
        _Global.time_type,
        null,
        f.toString()
      );
      RequestData();
    }
    _chart_man.getInstance().redraw("All", false);
  };

  Chart.prototype.setCurrentFutureNoRaise = function(content) {
    $("#chart_dsy li a").removeClass("selected");
    var _alias = content;
    var _type = 0;
    var btc_li = $("#chart_symbols_btc").find("li");
    var ltc_li = $("#chart_symbols_ltc").find("li");
    btc_li.each(function() {
      var str = $(this).attr("name");
      if (_alias.toString() == str) {
        $("#chart_dsy .chart_dt_one").html($(this).html());
        $(this)
          .find("a")
          .addClass("selected");
      }
    });
    ltc_li.each(function() {
      var str = $(this).attr("name");
      if (_alias.toString() == str) {
        $("#chart_dsy .chart_dt_one").html($(this).html());
        $(this)
          .find("a")
          .addClass("selected");
      }
    });
    for (var i in this.btc_obj) {
      if (this.btc_obj[i].id == _alias) {
        _type = this.ltc_obj[i].type;
        this._market_from = Chart._future_btc_market_num[this.btc_obj[i].type];
        this.strCurrentMarket = _alias;
        this.strCurrentMarketType = this.btc_obj[i].type;
        this.setTitle();
        break;
      }
    }
    for (var i in this.ltc_obj) {
      if (this.ltc_obj[i].id == _alias) {
        _type = this.ltc_obj[i].type;
        this._market_from = Chart._future_ltc_market_num[this.ltc_obj[i].type];
        this.strCurrentMarket = _alias;
        this.strCurrentMarketType = this.ltc_obj[i].type;
        this.setTitle();
        break;
      }
    }
    this.updateDataAndDisplay();
  };

  Chart.prototype.setCurrentFuture = function(content) {
    $("#chart_dsy li a").removeClass("selected");
    var _alias = content;
    var _type = 0;
    var btc_li = $("#chart_symbols_btc").find("li");
    var ltc_li = $("#chart_symbols_ltc").find("li");
    btc_li.each(function() {
      var str = $(this).attr("name");
      if (_alias.toString() == str) {
        $("#chart_dsy .chart_dt_one").html($(this).html());
        $(this)
          .find("a")
          .addClass("selected");
      }
    });
    ltc_li.each(function() {
      var str = $(this).attr("name");
      if (_alias.toString() == str) {
        $("#chart_dsy .chart_dt_one").html($(this).html());
        $(this)
          .find("a")
          .addClass("selected");
      }
    });
    for (var i in this.btc_obj) {
      if (this.btc_obj[i].id == _alias) {
        _type = this.ltc_obj[i].type;
        this._market_from = Chart._future_btc_market_num[this.btc_obj[i].type];
        this.strCurrentMarket = _alias;
        this.strCurrentMarketType = this.btc_obj[i].type;
        this.setTitle();
        break;
      }
    }
    for (var i in this.ltc_obj) {
      if (this.ltc_obj[i].id == _alias) {
        _type = this.ltc_obj[i].type;
        this._market_from = Chart._future_ltc_market_num[this.ltc_obj[i].type];
        this.strCurrentMarket = _alias;
        this.strCurrentMarketType = this.ltc_obj[i].type;
        this.setTitle();
        break;
      }
    }
    var a = {};
    a.command = "set current future";
    a.content = _alias;
    $("#chart_output_interface_text").val(JSON.stringify(a));
    $("#chart_output_interface_submit").submit();
    window._current_future_change.raise(_alias, _type);
    this.updateDataAndDisplay();
  };

  Chart.prototype.setCurrentContractUnit = function(contractUnit) {
    if (contractUnit == "btc") {
      if (this._contract_unit == 0) return;
      this._contract_unit = 0;
    } else if (contractUnit == "piece") {
      if (this._contract_unit == 1) return;
      this._contract_unit = 1;
    }
    this.updateDataAndDisplay();
  };

  Chart.prototype.setCurrentMoneyType = function(moneyType) {
    if (moneyType == "usd") {
      if (this._money_type == 0) return;
      this._money_type = 0;
    } else if (moneyType == "cny") {
      if (this._money_type == 1) return;
      this._money_type = 1;
    }
    this.updateDataAndDisplay();
  };

  Chart.prototype.setCurrentPeriod = function(period) {
    this._time = _Global.pMap[period];
    this.updateDataAndDisplay();
  };

  Chart.prototype.updateDataSource = function(data) {
    this._data = data;
    _chart_man.getInstance().updateData("frame0.k0", this._data);
  };

  Chart.prototype.updateDepth = function(array) {
    // console.log(array)
    if (array == null) return;
    if (!array.asks || !array.buys) return;
    var _data = this._depthData;
    _data.array = [];
    array.asks.reverse();

    for (var i = 0; i < array.asks.length; i++) {
      var data = {};
      data.rate = array.asks[i][0];
      data.amount = array.asks[i][1];
      _data.array.push(data);
    }
    for (var i = 0; i < array.buys.length; i++) {
      var data = {};
      data.rate = array.buys[i][0];
      data.amount = array.buys[i][1];
      _data.array.push(data);
    }
    _data.asks_count = array.asks.length;
    _data.bids_count = array.buys.length;
    _data.asks_si = _data.asks_count - 1;
    _data.asks_ei = 0;
    _data.bids_si = _data.asks_count;
    _data.bids_ei = _data.asks_count + _data.bids_count - 1;
    for (var i = _data.asks_si; i >= _data.asks_ei; i--) {
      if (i == _data.asks_si) {
        _data.array[i].amounts = _data.array[i].amount;
      } else {
        _data.array[i].amounts =
          _data.array[i + 1].amounts + _data.array[i].amount;
      }
    }
    for (var i = _data.bids_si; i <= _data.bids_ei; i++) {
      if (i == _data.bids_si) {
        _data.array[i].amounts = _data.array[i].amount;
      } else {
        _data.array[i].amounts =
          _data.array[i - 1].amounts + _data.array[i].amount;
      }
    }
    //console.log(_data.array)
    _chart_man.getInstance().redraw("All", true);
  };

  Chart.prototype.setMain_indtor = function(indicName) {
    this._main_indtor = indicName;
    if (indicName == "NONE") {
      _chart_man.getInstance().removeMain_indtor("frame0.k0");
    } else {
      _chart_man.getInstance().setMain_indtor("frame0.k0", indicName);
    }
    _chart_man.getInstance().redraw("All", true);
  };

  Chart.prototype.set_indtor = function(index, indicName) {
    if (indicName == "NONE") {
      var index = 2;
      if (Template.displayVolume == false) index = 1;
      var areaName = _chart_man.getInstance().get_iName("frame0.k0", index);
      if (areaName != "") _chart_man.getInstance().remove_indtor(areaName);
    } else {
      var index = 2;
      if (Template.displayVolume == false) index = 1;
      var areaName = _chart_man.getInstance().get_iName("frame0.k0", index);
      if (areaName == "") {
        Template.create_indtorChartComps("frame0.k0", indicName);
      } else {
        _chart_man.getInstance().set_indtor(areaName, indicName);
      }
    }
    _chart_man.getInstance().redraw("All", true);
  };

  Chart.prototype.add_indtor = function(indicName) {
    _chart_man.getInstance().add_indtor(indicName);
    _chart_man.getInstance().redraw("All", true);
  };

  Chart.prototype.remove_indtor = function(indicName) {
    var areaName = _chart_man.getInstance().get_iName(2);
    _chart_man.getInstance().remove_indtor(areaName);
    _chart_man.getInstance().redraw("All", true);
  };

  var CName = new_class();

  CName.prototype._cTruct = function(name) {
    this._names = [];
    this._comps = [];
    if (name instanceof CName) {
      this._names = name._names;
      this._comps = name._comps;
    } else {
      var comps = name.split(".");
      var dotNum = comps.length - 1;
      if (dotNum > 0) {
        this._comps = comps;
        this._names.push(comps[0]);
        for (var i = 1; i <= dotNum; i++) {
          this._names.push(this._names[i - 1] + "." + comps[i]);
        }
      } else {
        this._comps.push(name);
        this._names.push(name);
      }
    }
  };

  CName.prototype.getCompAt = function(index) {
    if (index >= 0 && index < this._comps.length) return this._comps[index];
    return "";
  };

  CName.prototype.getName = function(index) {
    if (index < 0) {
      if (this._names.length > 0) return this._names[this._names.length - 1];
    } else if (index < this._names.length) {
      return this._names[index];
    }
    return "";
  };

  var _Named_object = new_class();

  _Named_object.prototype._cTruct = function(name) {
    this._name = name;
    this._nameObj = new CName(name);
  };

  _Named_object.prototype.getFrameName = function() {
    return this._nameObj.getName(0);
  };

  _Named_object.prototype.getDataSourceName = function() {
    return this._nameObj.getName(1);
  };

  _Named_object.prototype.getAreaName = function() {
    return this._nameObj.getName(2);
  };

  _Named_object.prototype.getName = function() {
    return this._nameObj.getName(-1);
  };

  _Named_object.prototype.getNameObject = function() {
    return this._nameObj;
  };

  var _chart_area = new_class(_Named_object);

  _chart_area.prototype._cTruct = function(name) {
    _chart_area.__classId._cTruct.call(this, name);
    this._left = 0;
    this._top = 0;
    this._right = 0;
    this._bottom = 0;
    this._changed = false;
    this._highlighted = false;
    this._pressed = false;
    this._selected = false;
    this.Measuring = new mEves();
  };

  _chart_area.DockStyle = {
    Left: 0,
    Top: 1,
    Right: 2,
    Bottom: 3,
    Fill: 4
  };

  _chart_area.prototype.getDockStyle = function() {
    return this._dockStyle;
  };

  _chart_area.prototype.setDockStyle = function(dockStyle) {
    this._dockStyle = dockStyle;
  };

  _chart_area.prototype.getLeft = function() {
    return this._left;
  };

  _chart_area.prototype.getTop = function() {
    return this._top;
  };

  _chart_area.prototype.setTop = function(v) {
    if (this._top != v) {
      this._top = v;
      this._changed = true;
    }
  };

  _chart_area.prototype.getRight = function() {
    return this._right;
  };

  _chart_area.prototype.getBottom = function() {
    return this._bottom;
  };

  _chart_area.prototype.setBottom = function(v) {
    if (this._bottom != v) {
      this._bottom = v;
      this._changed = true;
    }
  };

  _chart_area.prototype.getCenter = function() {
    return (this._left + this._right) >> 1;
  };

  _chart_area.prototype.getMiddle = function() {
    return (this._top + this._bottom) >> 1;
  };

  _chart_area.prototype.getWidth = function() {
    return this._right - this._left;
  };

  _chart_area.prototype.getHeight = function() {
    return this._bottom - this._top;
  };

  _chart_area.prototype.getRect = function() {
    return {
      X: this._left,
      Y: this._top,
      Width: this._right - this._left,
      Height: this._bottom - this._top
    };
  };

  _chart_area.prototype.contains = function(x, y) {
    if (x >= this._left && x < this._right)
      if (y >= this._top && y < this._bottom) return [this];
    return null;
  };

  _chart_area.prototype.getMeasuredWidth = function() {
    return this._measuredWidth;
  };

  _chart_area.prototype.getMeasuredHeight = function() {
    return this._measuredHeight;
  };

  _chart_area.prototype.setMeasuredDimension = function(width, height) {
    this._measuredWidth = width;
    this._measuredHeight = height;
  };

  _chart_area.prototype.measure = function(context, width, height) {
    this._measuredWidth = 0;
    this._measuredHeight = 0;
    this.Measuring.raise(this, {
      Width: width,
      Height: height
    });
    if (this._measuredWidth == 0 && this._measuredHeight == 0)
      this.setMeasuredDimension(width, height);
  };

  _chart_area.prototype.layout = function(
    left,
    top,
    right,
    bottom,
    forceChange
  ) {
    left <<= 0;
    if (this._left != left) {
      this._left = left;
      this._changed = true;
    }
    top <<= 0;
    if (this._top != top) {
      this._top = top;
      this._changed = true;
    }
    right <<= 0;
    if (this._right != right) {
      this._right = right;
      this._changed = true;
    }
    bottom <<= 0;
    if (this._bottom != bottom) {
      this._bottom = bottom;
      this._changed = true;
    }
    if (forceChange) this._changed = true;
  };

  _chart_area.prototype.isChanged = function() {
    return this._changed;
  };

  _chart_area.prototype.setChanged = function(v) {
    this._changed = v;
  };

  _chart_area.prototype.isHighlighted = function() {
    return this._highlighted;
  };

  _chart_area.prototype.getHighlightedArea = function() {
    return this._highlighted ? this : null;
  };

  _chart_area.prototype.highlight = function(area) {
    this._highlighted = this == area;
    return this._highlighted ? this : null;
  };

  _chart_area.prototype.isPressed = function() {
    return this._pressed;
  };

  _chart_area.prototype.setPressed = function(v) {
    this._pressed = v;
  };

  _chart_area.prototype.isSelected = function() {
    return this._selected;
  };

  _chart_area.prototype.getSelectedArea = function() {
    return this._selected ? this : null;
  };

  _chart_area.prototype.select = function(area) {
    this._selected = this == area;
    return this._selected ? this : null;
  };

  _chart_area.prototype.onMouseMove = function(x, y) {
    return null;
  };

  _chart_area.prototype.onMouseLeave = function(x, y) {};

  _chart_area.prototype.onMouseDown = function(x, y) {
    return null;
  };

  _chart_area.prototype.onMouseUp = function(x, y) {
    return null;
  };

  var _main_area = new_class(_chart_area);

  _main_area.prototype._cTruct = function(name) {
    _main_area.__classId._cTruct.call(this, name);
    this._dragStarted = false;
    this._oldX = 0;
    this._oldY = 0;
    this._passMoveEventToToolManager = true;
  };

  _main_area.prototype.onMouseMove = function(x, y) {
    var mgr = _chart_man.getInstance();
    if (mgr._capturingMouseArea == this)
      if (this._dragStarted == false)
        if (Math.abs(this._oldX - x) > 1 || Math.abs(this._oldY - y) > 1)
          this._dragStarted = true;
    if (this._dragStarted) {
      mgr.hideCursor();
      if (mgr.onToolMouseDrag(this.getFrameName(), x, y)) return this;
      mgr.getTimeline(this.getDataSourceName()).move(x - this._oldX);
      return this;
    }
    if (
      this._passMoveEventToToolManager &&
      mgr.onToolMouseMove(this.getFrameName(), x, y)
    ) {
      mgr.hideCursor();
      return this;
    }
    switch (mgr._drawingTool) {
      case _chart_man.DrawingTool.Cursor:
        mgr.showCursor();
        break;

      case _chart_man.DrawingTool.CrossCursor:
        if (mgr.showCrossCursor(this, x, y)) mgr.hideCursor();
        else mgr.showCursor();
        break;

      default:
        mgr.hideCursor();
        break;
    }
    return this;
  };

  _main_area.prototype.onMouseLeave = function(x, y) {
    this._dragStarted = false;
    this._passMoveEventToToolManager = true;
  };

  _main_area.prototype.onMouseDown = function(x, y) {
    var mgr = _chart_man.getInstance();
    mgr.getTimeline(this.getDataSourceName()).startMove();
    this._oldX = x;
    this._oldY = y;
    this._dragStarted = false;
    if (mgr.onToolMouseDown(this.getFrameName(), x, y))
      this._passMoveEventToToolManager = false;
    return this;
  };

  _main_area.prototype.onMouseUp = function(x, y) {
    var mgr = _chart_man.getInstance();
    var ret = null;
    if (this._dragStarted) {
      this._dragStarted = false;
      ret = this;
    }
    if (mgr.onToolMouseUp(this.getFrameName(), x, y)) ret = this;
    this._passMoveEventToToolManager = true;
    return ret;
  };

  var _indtorArea = new_class(_chart_area);

  _indtorArea.prototype._cTruct = function(name) {
    _indtorArea.__classId._cTruct.call(this, name);
    this._dragStarted = false;
    this._oldX = 0;
    this._oldY = 0;
  };

  _indtorArea.prototype.onMouseMove = function(x, y) {
    var mgr = _chart_man.getInstance();
    if (mgr._capturingMouseArea == this)
      if (this._dragStarted == false)
        if (this._oldX != x || this._oldY != y) this._dragStarted = true;
    if (this._dragStarted) {
      mgr.hideCursor();
      mgr.getTimeline(this.getDataSourceName()).move(x - this._oldX);
      return this;
    }
    switch (mgr._drawingTool) {
      case _chart_man.DrawingTool.CrossCursor:
        if (mgr.showCrossCursor(this, x, y)) mgr.hideCursor();
        else mgr.showCursor();
        break;

      default:
        mgr.showCursor();
        break;
    }
    return this;
  };

  _indtorArea.prototype.onMouseLeave = function(x, y) {
    this._dragStarted = false;
  };

  _indtorArea.prototype.onMouseDown = function(x, y) {
    var mgr = _chart_man.getInstance();
    mgr.getTimeline(this.getDataSourceName()).startMove();
    this._oldX = x;
    this._oldY = y;
    this._dragStarted = false;
    return this;
  };

  _indtorArea.prototype.onMouseUp = function(x, y) {
    if (this._dragStarted) {
      this._dragStarted = false;
      return this;
    }
    return null;
  };

  var _main_range_area = new_class(_chart_area);

  _main_range_area.prototype._cTruct = function(name) {
    _main_range_area.__classId._cTruct.call(this, name);
  };

  _main_range_area.prototype.onMouseMove = function(x, y) {
    _chart_man.getInstance().showCursor();
    return this;
  };

  var _ind_ange_area = new_class(_chart_area);

  _ind_ange_area.prototype._cTruct = function(name) {
    _ind_ange_area.__classId._cTruct.call(this, name);
  };

  _ind_ange_area.prototype.onMouseMove = function(x, y) {
    _chart_man.getInstance().showCursor();
    return this;
  };

  var TimelineArea = new_class(_chart_area);

  TimelineArea.prototype._cTruct = function(name) {
    TimelineArea.__classId._cTruct.call(this, name);
  };

  TimelineArea.prototype.onMouseMove = function(x, y) {
    _chart_man.getInstance().showCursor();
    return this;
  };

  var _chart_area_group = new_class(_chart_area);

  _chart_area_group.prototype._cTruct = function(name) {
    _chart_area_group.__classId._cTruct.call(this, name);
    this._areas = [];
    this._highlightedArea = null;
    this._selectedArea = null;
  };

  _chart_area_group.prototype.contains = function(x, y) {
    var areas;
    var a,
      i,
      cnt = this._areas.length;
    for (i = 0; i < cnt; i++) {
      a = this._areas[i];
      areas = a.contains(x, y);
      if (areas != null) {
        areas.push(this);
        return areas;
      }
    }
    return _chart_area_group.__classId.contains(x, y);
  };

  _chart_area_group.prototype.getAreaCount = function() {
    return this._areas.length;
  };

  _chart_area_group.prototype.getAreaAt = function(index) {
    if (index < 0 || index >= this._areas.length) return null;
    return this._areas[index];
  };

  _chart_area_group.prototype.addArea = function(area) {
    this._areas.push(area);
  };

  _chart_area_group.prototype.removeArea = function(area) {
    var i,
      cnt = this._areas.length;
    for (i = 0; i < cnt; i++) {
      if (area == this._areas[i]) {
        this._areas.splice(i);
        this.setChanged(true);
        break;
      }
    }
  };

  _chart_area_group.prototype.getGridColor = function() {
    return this._gridColor;
  };

  _chart_area_group.prototype.setGridColor = function(c) {
    this._gridColor = c;
  };

  _chart_area_group.prototype.getHighlightedArea = function() {
    if (this._highlightedArea != null)
      return this._highlightedArea.getHighlightedArea();
    return null;
  };

  _chart_area_group.prototype.highlight = function(area) {
    this._highlightedArea = null;
    var e,
      i,
      cnt = this._areas.length;
    for (i = 0; i < cnt; i++) {
      e = this._areas[i].highlight(area);
      if (e != null) {
        this._highlightedArea = e;
        return this;
      }
    }
    return null;
  };

  _chart_area_group.prototype.getSelectedArea = function() {
    if (this._selectedArea != null) return this._selectedArea.getSelectedArea();
    return null;
  };

  _chart_area_group.prototype.select = function(area) {
    this._selectedArea = null;
    var e,
      i,
      cnt = this._areas.length;
    for (i = 0; i < cnt; i++) {
      e = this._areas[i].select(area);
      if (e != null) {
        this._selectedArea = e;
        return this;
      }
    }
    return null;
  };

  _chart_area_group.prototype.onMouseLeave = function(x, y) {
    var i,
      cnt = this._areas.length;
    for (i = 0; i < cnt; i++) this._areas[i].onMouseLeave(x, y);
  };

  _chart_area_group.prototype.onMouseUp = function(x, y) {
    var a,
      i,
      cnt = this._areas.length;
    for (i = 0; i < cnt; i++) {
      a = this._areas[i].onMouseUp(x, y);
      if (a != null) return a;
    }
    return null;
  };

  var TableLayout = new_class(_chart_area_group);

  TableLayout.prototype._cTruct = function(name) {
    TableLayout.__classId._cTruct.call(this, name);
    this._nextRowId = 0;
    this._focusedRowIndex = -1;
  };

  TableLayout.prototype.getNextRowId = function() {
    return this._nextRowId++;
  };

  TableLayout.prototype.measure = function(context, width, height) {
    this.setMeasuredDimension(width, height);
    var rowH,
      prevH = 0,
      totalH = 0;
    var h, rows;
    var rh = [];
    var i,
      cnt = this._areas.length;
    for (i = 0; i < cnt; i += 2) {
      rowH = this._areas[i].getHeight();
      if (rowH == 0) {
        if (i == 0) {
          rows = (cnt + 1) >> 1;
          var n = rows * 2 + 5;
          var nh = ((height / n) * 2) << 0;
          h = height;
          for (i = rows - 1; i > 0; i--) {
            rh.unshift(nh);
            h -= nh;
          }
          rh.unshift(h);
          break;
        } else if (i == 2) {
          rowH = prevH / 3;
        } else {
          rowH = prevH;
        }
      }
      totalH += rowH;
      prevH = rowH;
      rh.push(rowH);
    }
    if (totalH > 0) {
      var rate = height / totalH;
      rows = (cnt + 1) >> 1;
      h = height;
      for (i = rows - 1; i > 0; i--) {
        rh[i] *= rate;
        h -= rh[i];
      }
      rh[0] = h;
    }
    var nw = 8;
    var minRW = 64;
    var maxRW = Math.min(240, width >> 1);
    var rw = minRW;
    var mgr = _chart_man.getInstance();
    var timeline = mgr.getTimeline(this.getDataSourceName());
    if (timeline.getFirstIndex() >= 0) {
      var firstIndexes = [];
      for (rw = minRW; rw < maxRW; rw += nw)
        firstIndexes.push(
          timeline.calcFirstIndex(timeline.calcColumnCount(width - rw))
        );
      var lastIndex = timeline.getLastIndex();
      var dpNames = [".main", ".secondary"];
      var minmaxes = new Array(firstIndexes.length);
      var iArea, iIndex;
      for (
        iArea = 0, iIndex = 0, rw = minRW;
        iArea < this._areas.length && iIndex < firstIndexes.length;
        iArea += 2
      ) {
        var area = this._areas[iArea];
        var plotter = mgr.getPlotter(area.getName() + "Range.main");
        for (var iDp in dpNames) {
          var dp = mgr.getDataProvider(area.getName() + dpNames[iDp]);
          if (dp == undefined) continue;
          dp.calcRange(firstIndexes, lastIndex, minmaxes, null);
          while (iIndex < firstIndexes.length) {
            var minW = plotter.getRequiredWidth(context, minmaxes[iIndex].min);
            var maxW = plotter.getRequiredWidth(context, minmaxes[iIndex].max);
            if (Math.max(minW, maxW) < rw) break;
            iIndex++;
            rw += nw;
          }
        }
      }
    }
    for (i = 1; i < this._areas.length; i += 2) {
      this._areas[i].measure(context, rw, rh[i >> 1]);
    }
    var lw = width - rw;
    for (i = 0; i < this._areas.length; i += 2) {
      this._areas[i].measure(context, lw, rh[i >> 1]);
    }
  };

  TableLayout.prototype.layout = function(
    left,
    top,
    right,
    bottom,
    forceChange
  ) {
    TableLayout.__classId.layout.call(
      this,
      left,
      top,
      right,
      bottom,
      forceChange
    );
    if (this._areas.length < 1) return;
    var area;
    var center = left + this._areas[0].getMeasuredWidth();
    var t = top,
      b;
    if (!forceChange) forceChange = this.isChanged();
    var i,
      cnt = this._areas.length;
    for (i = 0; i < cnt; i++) {
      area = this._areas[i];
      b = t + area.getMeasuredHeight();
      area.layout(left, t, center, b, forceChange);
      i++;
      area = this._areas[i];
      area.layout(center, t, this.getRight(), b, forceChange);
      t = b;
    }
    this.setChanged(false);
  };

  TableLayout.prototype.drawGrid = function(context) {
    if (this._areas.length < 1) return;
    var mgr = _chart_man.getInstance();
    var theme = mgr.getTheme(this.getFrameName());
    context.fillStyle = theme.getColor(Theme.Co.Grid1);
    context.fillRect(
      this._areas[0].getRight(),
      this.getTop(),
      1,
      this.getHeight()
    );
    var i,
      cnt = this._areas.length - 2;
    for (i = 0; i < cnt; i += 2)
      context.fillRect(
        this.getLeft(),
        this._areas[i].getBottom(),
        this.getWidth(),
        1
      );
    if (!mgr.getCaptureMouseWheelDirectly()) {
      for (i = 0, cnt += 2; i < cnt; i += 2) {
        if (this._areas[i].isSelected()) {
          context.strokeStyle = theme.getColor(Theme.Co._indtor1);
          context.strokeRect(
            this.getLeft() + 0.5,
            this.getTop() + 0.5,
            this.getWidth() - 1,
            this.getHeight() - 1
          );
          break;
        }
      }
    }
  };

  TableLayout.prototype.highlight = function(area) {
    this._highlightedArea = null;
    var e,
      i,
      cnt = this._areas.length;
    for (i = 0; i < cnt; i++) {
      e = this._areas[i];
      if (e == area) {
        i &= ~1;
        e = this._areas[i];
        e.highlight(e);
        this._highlightedArea = e;
        i++;
        e = this._areas[i];
        e.highlight(null);
        e.highlight(e);
      } else {
        e.highlight(null);
      }
    }
    return this._highlightedArea != null ? this : null;
  };

  TableLayout.prototype.select = function(area) {
    this._selectedArea = null;
    var e,
      i,
      cnt = this._areas.length;
    for (i = 0; i < cnt; i++) {
      e = this._areas[i];
      if (e == area) {
        i &= ~1;
        e = this._areas[i];
        e.select(e);
        this._selectedArea = e;
        i++;
        e = this._areas[i];
        e.select(e);
      } else {
        e.select(null);
      }
    }
    return this._selectedArea != null ? this : null;
  };

  TableLayout.prototype.onMouseMove = function(x, y) {
    if (this._focusedRowIndex >= 0) {
      var upper = this._areas[this._focusedRowIndex];
      var lower = this._areas[this._focusedRowIndex + 2];
      var d = y - this._oldY;
      if (d == 0) return this;
      var upperBottom = this._oldUpperBottom + d;
      var lowerTop = this._oldLowerTop + d;
      if (
        upperBottom - upper.getTop() >= 60 &&
        lower.getBottom() - lowerTop >= 60
      ) {
        upper.setBottom(upperBottom);
        lower.setTop(lowerTop);
      }
      return this;
    }
    var i,
      cnt = this._areas.length - 2;
    for (i = 0; i < cnt; i += 2) {
      var b = this._areas[i].getBottom();
      if (y >= b - 4 && y < b + 4) {
        _chart_man.getInstance().showCursor("n-resize");
        return this;
      }
    }
    return null;
  };

  TableLayout.prototype.onMouseLeave = function(x, y) {
    this._focusedRowIndex = -1;
  };

  TableLayout.prototype.onMouseDown = function(x, y) {
    var i,
      cnt = this._areas.length - 2;
    for (i = 0; i < cnt; i += 2) {
      var b = this._areas[i].getBottom();
      if (y >= b - 4 && y < b + 4) {
        this._focusedRowIndex = i;
        this._oldY = y;
        this._oldUpperBottom = b;
        this._oldLowerTop = this._areas[i + 2].getTop();
        return this;
      }
    }
    return null;
  };

  TableLayout.prototype.onMouseUp = function(x, y) {
    if (this._focusedRowIndex >= 0) {
      this._focusedRowIndex = -1;
      var i,
        cnt = this._areas.length;
      var height = [];
      for (i = 0; i < cnt; i += 2) {
        height.push(this._areas[i].getHeight());
      }
      ChartSettings.get().charts.areaHeight = height;
      ChartSettings.save();
    }
    return this;
  };

  var _dockable_layout = new_class(_chart_area_group);

  _dockable_layout.prototype._cTruct = function(name) {
    _dockable_layout.__classId._cTruct.call(this, name);
  };

  _dockable_layout.prototype.measure = function(context, width, height) {
    _dockable_layout.__classId.measure.call(this, context, width, height);
    width = this.getMeasuredWidth();
    height = this.getMeasuredHeight();
    for (var i in this._areas) {
      var area = this._areas[i];
      area.measure(context, width, height);
      switch (area.getDockStyle()) {
        case _chart_area.DockStyle.left:
        case _chart_area.DockStyle.Right:
          width -= area.getMeasuredWidth();
          break;

        case _chart_area.DockStyle.Top:
        case _chart_area.DockStyle.Bottom:
          height -= area.getMeasuredHeight();
          break;

        case _chart_area.DockStyle.Fill:
          width = 0;
          height = 0;
          break;
      }
    }
  };

  _dockable_layout.prototype.layout = function(
    left,
    top,
    right,
    bottom,
    forceChange
  ) {
    _dockable_layout.__classId.layout.call(
      this,
      left,
      top,
      right,
      bottom,
      forceChange
    );
    left = this.getLeft();
    top = this.getTop();
    right = this.getRight();
    bottom = this.getBottom();
    var w, h;
    if (!forceChange) forceChange = this.isChanged();
    for (var i in this._areas) {
      var area = this._areas[i];
      switch (area.getDockStyle()) {
        case _chart_area.DockStyle.left:
          w = area.getMeasuredWidth();
          area.layout(left, top, left + w, bottom, forceChange);
          left += w;
          break;

        case _chart_area.DockStyle.Top:
          h = area.getMeasuredHeight();
          area.layout(left, top, right, top + h, forceChange);
          top += h;
          break;

        case _chart_area.DockStyle.Right:
          w = area.getMeasuredWidth();
          area.layout(right - w, top, right, bottom, forceChange);
          right -= w;
          break;

        case _chart_area.DockStyle.Bottom:
          h = area.getMeasuredHeight();
          area.layout(left, bottom - h, right, bottom, forceChange);
          bottom -= h;
          break;

        case _chart_area.DockStyle.Fill:
          area.layout(left, top, right, bottom, forceChange);
          left = right;
          top = bottom;
          break;
      }
    }
    this.setChanged(false);
  };

  _dockable_layout.prototype.drawGrid = function(context) {
    var mgr = _chart_man.getInstance();
    var theme = mgr.getTheme(this.getFrameName());
    var left = this.getLeft();
    var top = this.getTop();
    var right = this.getRight();
    var bottom = this.getBottom();
    context.fillStyle = theme.getColor(this._gridColor);
    for (var i in this._areas) {
      var area = this._areas[i];
      switch (area.getDockStyle()) {
        case _chart_area.DockStyle.Left:
          context.fillRect(area.getRight(), top, 1, bottom - top);
          left += area.getWidth();
          break;

        case _chart_area.DockStyle.Top:
          context.fillRect(left, area.getBottom(), right - left, 1);
          top += area.getHeight();
          break;

        case _chart_area.DockStyle.Right:
          context.fillRect(area.getLeft(), top, 1, bottom - top);
          right -= area.getWidth();
          break;

        case _chart_area.DockStyle.Bottom:
          context.fillRect(left, area.getTop(), right - left, 1);
          bottom -= area.getHeight();
          break;
      }
    }
  };

  var _chart_man = new_class();

  _chart_man.DrawingTool = {
    Cursor: 0,
    CrossCursor: 1,
    DrawLines: 2,
    DrawFibRetrace: 3,
    DrawFibFans: 4,
    SegLine: 5,
    StraightLine: 6,
    ArrowLine: 7,
    RayLine: 8,
    HoriStraightLine: 9,
    HoriRayLine: 10,
    HoriSegLine: 11,
    VertiStraightLine: 12,
    PriceLine: 13,
    BiParallelLine: 14,
    BiParallelRayLine: 15,
    TriParallelLine: 16,
    BandLine: 17
  };

  _chart_man._instance = null;

  _chart_man.getInstance = function() {
    if (_chart_man._instance == null) _chart_man._instance = new _chart_man();
    return _chart_man._instance;
  };

  _chart_man.prototype._cTruct = function() {
    this._dataSources = {};
    this._dataSourceCache = {};
    this._dataProviders = {};
    this._frames = {};
    this._areas = {};
    this._timelines = {};
    this._ranges = {};
    this._plotters = {};
    this._themes = {};
    this._titles = {};
    this._frameMousePos = {};
    this._dsChartStyle = {};
    this._dragStarted = false;
    this._oldX = 0;
    this._fake_indtors = {};
    this._captureMouseWheelDirectly = true;
    this._chart = {};
    this._chart.defaultFrame = new Chart();
    this._drawingTool = _chart_man.DrawingTool["CrossCursor"];
    this._beforeDrawingTool = this._drawingTool;
    this._language = def.lang;
    this._mainCanvas = null;
    this._overlayCanvas = null;
    this._mainContext = null;
    this._overlayContext = null;
  };

  /**
   * redraw.
   * @param layer
   *   "all", "main", "overlay"
   */
  _chart_man.prototype.redraw = function(layer, refresh) {
    if (layer == undefined || refresh) layer = "All";
    if (layer == "All" || layer == "MainCanvas") {
      if (refresh) {
        this.getFrame("frame0").setChanged(true);
        this._mainContext.clearRect(
          0,
          0,
          this._mainCanvas.width,
          this._mainCanvas.height
        );
      }
      this.layout(
        this._mainContext,
        "frame0",
        0,
        0,
        this._mainCanvas.width,
        this._mainCanvas.height
      );
      this.drawMain("frame0", this._mainContext);
    }
    if (layer == "All" || layer == "OverlayCanvas") {
      this._overlayContext.clearRect(
        0,
        0,
        this._overlayCanvas.width,
        this._overlayCanvas.height
      );
      this.drawOverlay("frame0", this._overlayContext);
    }
  };

  /**
   * bindCanvas.
   * @param layer
   *   "main", "overlay"
   */
  _chart_man.prototype.bindCanvas = function(layer, canvas) {
    if (layer == "main") {
      this._mainCanvas = canvas;
      this._mainContext = canvas.getContext("2d");
    } else if (layer == "overlay") {
      this._overlayCanvas = canvas;
      this._overlayContext = canvas.getContext("2d");
      if (this._captureMouseWheelDirectly)
        $(this._overlayCanvas).bind("mousewheel", mouseWheel);
    }
  };

  _chart_man.prototype.getCaptureMouseWheelDirectly = function() {
    return this._captureMouseWheelDirectly;
  };

  _chart_man.prototype.setCaptureMouseWheelDirectly = function(v) {
    this._captureMouseWheelDirectly = v;
    if (v) $(this._overlayCanvas).bind("mousewheel", mouseWheel);
    else $(this._overlayCanvas).unbind("mousewheel");
  };

  _chart_man.prototype.getChart = function(nouseParam) {
    return this._chart["defaultFrame"];
  };

  _chart_man.prototype.init = function() {
    delete this._ranges["frame0.k0.indic1"];
    delete this._ranges["frame0.k0.indic1Range"];
    delete this._areas["frame0.k0.indic1"];
    delete this._areas["frame0.k0.indic1Range"];
    DefaultTemplate.loadTemplate(
      "frame0.k0",
      "行情图",
      "frame0.order",
      "0.order",
      "frame0.trade",
      "0.trade"
    );
    this.redraw("All", true);
  };

  _chart_man.prototype.setCurrentDrawingTool = function(paramTool) {
    this._drawingTool = _chart_man.DrawingTool[paramTool];
    this.setRunningMode(this._drawingTool);
  };

  _chart_man.prototype.getLanguage = function() {
    return this._language;
  };

  _chart_man.prototype.setLanguage = function(lang) {
    this._language = lang;
  };

  /**
   * Property: ThemeName.
   * @param lang:
   *     "Dark" "Light"
   */
  _chart_man.prototype.setThemeName = function(frameName, themeName) {
    if (themeName == undefined) themeName = "Dark";
    var theme;
    switch (themeName) {
      case "Light":
        theme = new LightTheme();
        break;

      default:
        themeName = "Dark";
        theme = new DarkTheme();
        break;
    }
    this._themeName = themeName;
    this.setTheme(frameName, theme);
    this.getFrame(frameName).setChanged(true);
  };

  /**
   * Property: ChartStyle.
   * @param style:
   *     "CandleStick" "CandleStickHLC" "OHLC"
   */
  _chart_man.prototype.getChartStyle = function(dsName) {
    var chartStyle = this._dsChartStyle[dsName];
    if (chartStyle == undefined) return "CandleStick";
    return chartStyle;
  };

  _chart_man.prototype.setChartStyle = function(dsName, style) {
    if (this._dsChartStyle[dsName] == style) return;
    var areaName = dsName + ".main";
    var dpName = areaName + ".main";
    var plotterName = areaName + ".main";
    var dp, plotter;
    switch (style) {
      case "CandleStick":
      case "CandleStickHLC":
      case "OHLC":
        dp = this.getDataProvider(dpName);
        if (dp == undefined || !iITance(dp, MainDataProvider)) {
          dp = new MainDataProvider(dpName);
          this.setDataProvider(dpName, dp);
          dp.updateData();
        }
        this.setMain_indtor(dsName, ChartSettings.get().charts.mIndic);
        switch (style) {
          case "CandleStick":
            plotter = new CandlestickPlotter(plotterName);
            break;

          case "CandleStickHLC":
            plotter = new Candlesticklotter(plotterName);
            break;

          case "OHLC":
            plotter = new OHLCPlotter(plotterName);
            break;
        }
        this.setPlotter(plotterName, plotter);
        plotter = new MinMaxPlotter(areaName + ".decoration");
        this.setPlotter(plotter.getName(), plotter);
        break;

      case "Line":
        dp = new _i_data_prov(dpName);
        this.setDataProvider(dp.getName(), dp);
        dp.set_indtor(new hlcInd());
        this.removeMain_indtor(dsName);
        plotter = new _indtorPlotter(plotterName);
        this.setPlotter(plotterName, plotter);
        this.removePlotter(areaName + ".decoration");
        break;
    }
    this.getArea(plotter.getAreaName()).setChanged(true);
    this._dsChartStyle[dsName] = style;
  };

  _chart_man.prototype.setNormalMode = function() {
    this._drawingTool = this._beforeDrawingTool;
    $(".chart_dropdown_data").removeClass("chart_dropdown-hover");
    $("#C_tp .C_tp_button").removeClass("selected");
    $("#chart_CrossCursor")
      .parent()
      .addClass("selected");
    if (this._drawingTool == _chart_man.DrawingTool.Cursor) {
      this.showCursor();
      $("#mode a").removeClass("selected");
      $("#C_tp .C_tp_button").removeClass("selected");
      $("#chart_Cursor")
        .parent()
        .addClass("selected");
    } else {
      this.hideCursor();
    }
  };

  _chart_man.prototype.setRunningMode = function(mode) {
    var pds = this.getDataSource("frame0.k0");
    var curr_o = pds.getCurrentToolObject();
    if (curr_o != null && curr_o.state != CToolObject.state.AfterDraw) {
      pds.delToolObject();
    }
    if (pds.getToolObjectCount() > 10) {
      this.setNormalMode();
      return;
    }
    this._drawingTool = mode;
    if (mode == _chart_man.DrawingTool.Cursor) {
      this.showCursor();
    } else {
    }
    switch (mode) {
      case _chart_man.DrawingTool.Cursor: {
        this._beforeDrawingTool = mode;
        break;
      }

      case _chart_man.DrawingTool.ArrowLine: {
        pds.addToolObject(new CArrowLineObject("frame0.k0"));
        break;
      }

      case _chart_man.DrawingTool.BandLine: {
        pds.addToolObject(new CBandLineObject("frame0.k0"));
        break;
      }

      case _chart_man.DrawingTool.BiParallelLine: {
        pds.addToolObject(new CBiParallelLineObject("frame0.k0"));
        break;
      }

      case _chart_man.DrawingTool.BiParallelRayLine: {
        pds.addToolObject(new CBiParallelRayLineObject("frame0.k0"));
        break;
      }

      case _chart_man.DrawingTool.CrossCursor: {
        this._beforeDrawingTool = mode;
        break;
      }

      case _chart_man.DrawingTool.DrawFibFans: {
        pds.addToolObject(new CFibFansObject("frame0.k0"));
        break;
      }

      case _chart_man.DrawingTool.DrawFibRetrace: {
        pds.addToolObject(new CFibRetraceObject("frame0.k0"));
        break;
      }

      case _chart_man.DrawingTool.DrawLines: {
        pds.addToolObject(new CStraightLineObject("frame0.k0"));
        break;
      }

      case _chart_man.DrawingTool.HoriRayLine: {
        pds.addToolObject(new CHoriRayLineObject("frame0.k0"));
        break;
      }

      case _chart_man.DrawingTool.HoriSegLine: {
        pds.addToolObject(new CHoriSegLineObject("frame0.k0"));
        break;
      }

      case _chart_man.DrawingTool.HoriStraightLine: {
        pds.addToolObject(new CHoriStraightLineObject("frame0.k0"));
        break;
      }

      case _chart_man.DrawingTool.PriceLine: {
        pds.addToolObject(new CPriceLineObject("frame0.k0"));
        break;
      }

      case _chart_man.DrawingTool.RayLine: {
        pds.addToolObject(new CRayLineObject("frame0.k0"));
        break;
      }

      case _chart_man.DrawingTool.SegLine: {
        pds.addToolObject(new CSegLineObject("frame0.k0"));
        break;
      }

      case _chart_man.DrawingTool.StraightLine: {
        pds.addToolObject(new CStraightLineObject("frame0.k0"));
        break;
      }

      case _chart_man.DrawingTool.TriParallelLine: {
        pds.addToolObject(new CTriParallelLineObject("frame0.k0"));
        break;
      }

      case _chart_man.DrawingTool.VertiStraightLine: {
        pds.addToolObject(new CVertiStraightLineObject("frame0.k0"));
        break;
      }
    }
  };

  _chart_man.prototype.getTitle = function(dsName) {
    return this._titles[dsName];
  };

  _chart_man.prototype.setTitle = function(dsName, title) {
    this._titles[dsName] = title;
  };

  _chart_man.prototype.setCurrentDataSource = function(dsName, dsAlias) {
    var cached = this.getCachedDataSource(dsAlias);
    if (cached != null) {
      this.setDataSource(dsName, cached, true);
    } else {
      var ds = this.getDataSource(dsName);
      if (ds != null) {
        if (iITance(ds, _main_data_source)) {
          cached = new _main_data_source(dsAlias);
        } else if (iITance(ds, CLiveOrderDataSource)) {
          cached = new CLiveOrderDataSource(dsAlias);
        } else if (iITance(ds, CLiveTradeDataSource)) {
          cached = new CLiveTradeDataSource(dsAlias);
        }
        this.setDataSource(dsName, cached, true);
        this.setCachedDataSource(dsAlias, cached);
      }
    }
  };

  _chart_man.prototype.getDataSource = function(name) {
    return this._dataSources[name];
  };

  _chart_man.prototype.setDataSource = function(name, ds, forceRefresh) {
    this._dataSources[name] = ds;
    if (forceRefresh) this.updateData(name, null);
  };

  _chart_man.prototype.getCachedDataSource = function(name) {
    return this._dataSourceCache[name];
  };

  _chart_man.prototype.setCachedDataSource = function(name, ds) {
    this._dataSourceCache[name] = ds;
  };

  _chart_man.prototype.getDataProvider = function(name) {
    return this._dataProviders[name];
  };

  _chart_man.prototype.setDataProvider = function(name, dp) {
    this._dataProviders[name] = dp;
  };

  _chart_man.prototype.removeDataProvider = function(name) {
    delete this._dataProviders[name];
  };

  _chart_man.prototype.getFrame = function(name) {
    return this._frames[name];
  };

  _chart_man.prototype.setFrame = function(name, frame) {
    this._frames[name] = frame;
  };

  _chart_man.prototype.removeFrame = function(name) {
    delete this._frames[name];
  };

  _chart_man.prototype.getArea = function(name) {
    return this._areas[name];
  };

  _chart_man.prototype.setArea = function(name, area) {
    this._areas[name] = area;
  };

  _chart_man.prototype.removeArea = function(name) {
    delete this._areas[name];
  };

  _chart_man.prototype.getTimeline = function(name) {
    return this._timelines[name];
  };

  _chart_man.prototype.setTimeline = function(name, timeline) {
    this._timelines[name] = timeline;
  };

  _chart_man.prototype.removeTimeline = function(name) {
    delete this._timelines[name];
  };

  _chart_man.prototype.getRange = function(name) {
    return this._ranges[name];
  };

  _chart_man.prototype.setRange = function(name, range) {
    this._ranges[name] = range;
  };

  _chart_man.prototype.removeRange = function(name) {
    delete this._ranges[name];
  };

  _chart_man.prototype.getPlotter = function(name) {
    return this._plotters[name];
  };

  _chart_man.prototype.setPlotter = function(name, plotter) {
    this._plotters[name] = plotter;
  };

  _chart_man.prototype.removePlotter = function(name) {
    delete this._plotters[name];
  };

  _chart_man.prototype.getTheme = function(name) {
    return this._themes[name];
  };

  _chart_man.prototype.setTheme = function(name, theme) {
    this._themes[name] = theme;
  };

  _chart_man.prototype.getFrameMousePos = function(name, point) {
    if (this._frameMousePos[name] != undefined) {
      point.x = this._frameMousePos[name].x;
      point.y = this._frameMousePos[name].y;
    } else {
      point.x = -1;
      point.y = -1;
    }
  };

  _chart_man.prototype.setFrameMousePos = function(name, px, py) {
    this._frameMousePos[name] = {
      x: px,
      y: py
    };
  };
  // 绘制指标线
  _chart_man.prototype.drawArea = function(context, area, plotterNames) {
    var areaName = area.getNameObject().getCompAt(2);
    if (areaName == "timeline") {
      if (area.getHeight() < 20) return;
    } else {
      if (area.getHeight() < 30) return;
    }
    if (area.getWidth() < 30) return;
    areaName = area.getName();
    var plotter;
    var i,
      cnt = plotterNames.length;
    for (i = 0; i < cnt; i++) {
      plotter = this._plotters[areaName + plotterNames[i]];
      if (plotter != undefined) plotter.Draw(context);
    }
  };

  _chart_man.prototype.drawAreaMain = function(context, area) {
    var ds = this._dataSources[area.getDataSourceName()];
    var plotterNames;
    if (ds.getDataCount() < 1) plotterNames = [".background"];
    else plotterNames = [".background", ".grid", ".main", ".secondary"];
    this.drawArea(context, area, plotterNames);
    area.setChanged(false);
  };

  _chart_man.prototype.drawAreaOverlay = function(context, area) {
    var ds = this._dataSources[area.getDataSourceName()];
    var plotterNames;
    if (ds.getDataCount() < 1) plotterNames = [".selection"];
    else plotterNames = [".decoration", ".selection", ".info", ".tool"];
    this.drawArea(context, area, plotterNames);
  };

  _chart_man.prototype.drawMain = function(frameName, context) {
    drawn = false;
    if (!drawn) {
      for (var it in this._areas) {
        if (
          this._areas[it].getFrameName() == frameName &&
          !iITance(this._areas[it], _chart_area_group)
        )
          this.drawAreaMain(context, this._areas[it]);
      }
    }
    var e;
    for (var i in this._timelines) {
      e = this._timelines[i];
      if (e.getFrameName() == frameName) e.setUpdated(false);
    }
    for (var i in this._ranges) {
      e = this._ranges[i];
      if (e.getFrameName() == frameName) e.setUpdated(false);
    }
    for (var i in this._areas) {
      e = this._areas[i];
      if (e.getFrameName() == frameName) e.setChanged(false);
    }
  };

  _chart_man.prototype.drawOverlay = function(frameName, context) {
    for (var n in this._areas) {
      var area = this._areas[n];
      if (iITance(area, _chart_area_group))
        if (area.getFrameName() == frameName) area.drawGrid(context);
    }
    for (var n in this._areas) {
      var area = this._areas[n];
      if (iITance(area, _chart_area_group) == false)
        if (area.getFrameName() == frameName)
          this.drawAreaOverlay(context, area);
    }
  };

  _chart_man.prototype.updateData = function(dsName, data) {
    var ds = this.getDataSource(dsName);
    if (ds == undefined) return;
    if (data != null) {
      if (!ds.update(data)) return false;
      if (ds.getUpdateMode() == DataSource.UpdateMode.DoNothing) return true;
    } else {
      ds.setUpdateMode(DataSource.UpdateMode.Refresh);
    }
    var timeline = this.getTimeline(dsName);
    if (timeline != undefined) timeline.update();
    if (ds.getDataCount() < 1) return true;
    var dpNames = [".main", ".secondary"];
    var area, areaName;
    for (var n in this._areas) {
      area = this._areas[n];
      if (iITance(area, _chart_area_group)) continue;
      if (area.getDataSourceName() != dsName) continue;
      areaName = area.getName();
      for (var i = 0; i < dpNames.length; i++) {
        var dp = this.getDataProvider(areaName + dpNames[i]);
        if (dp != undefined) dp.updateData();
      }
    }
    return true;
  };

  _chart_man.prototype.updateRange = function(dsName) {
    var ds = this.getDataSource(dsName);
    if (ds.getDataCount() < 1) return;
    var dpNames = [".main", ".secondary"];
    var area, areaName;
    for (var n in this._areas) {
      area = this._areas[n];
      if (iITance(area, _chart_area_group)) continue;
      if (area.getDataSourceName() != dsName) continue;
      areaName = area.getName();
      for (var i = 0; i < dpNames.length; i++) {
        var dp = this.getDataProvider(areaName + dpNames[i]);
        if (dp != undefined) dp.updateRange();
      }
      var timeline = this.getTimeline(dsName);
      if (timeline != undefined && timeline.getMaxItemCount() > 0) {
        var range = this.getRange(areaName);
        if (range != undefined) range.update();
      }
    }
  };

  _chart_man.prototype.layout = function(
    context,
    frameName,
    left,
    top,
    right,
    bottom
  ) {
    var frame = this.getFrame(frameName);
    frame.measure(context, right - left, bottom - top);
    frame.layout(left, top, right, bottom);
    for (var n in this._timelines) {
      var e = this._timelines[n];
      if (e.getFrameName() == frameName) e.onLayout();
    }
    for (var n in this._dataSources) {
      if (n.substring(0, frameName.length) == frameName) this.updateRange(n);
    }
  };

  _chart_man.prototype.SelectRange = function(pArea, y) {
    var it;
    for (var ee in this._ranges) {
      var _1 = this._ranges[ee].getAreaName();
      var _2 = pArea.getName();
      if (_1 == _2) this._ranges[ee].selectAt(y);
      else this._ranges[ee].unselect();
    }
  };

  _chart_man.prototype.scale = function(s) {
    if (this._highlightedFrame == null) return;
    var hiArea = this._highlightedFrame.getHighlightedArea();
    if (this.getRange(hiArea.getName()) != undefined) {
      var dsName = hiArea.getDataSourceName();
      var timeline = this.getTimeline(dsName);
      if (timeline != null) {
        timeline.scale(s);
        this.updateRange(dsName);
      }
    }
  };

  _chart_man.prototype.showCursor = function(cursor) {
    if (cursor === undefined) cursor = "default";
    this._mainCanvas.style.cursor = cursor;
    this._overlayCanvas.style.cursor = cursor;
  };

  _chart_man.prototype.hideCursor = function() {
    this._mainCanvas.style.cursor = "none";
    this._overlayCanvas.style.cursor = "none";
  };

  _chart_man.prototype.showCrossCursor = function(area, x, y) {
    var e = this.getRange(area.getName());
    if (e != undefined) {
      e.selectAt(y);
      e = this.getTimeline(area.getDataSourceName());
      if (e != undefined) if (e.selectAt(x)) return true;
    }
    return false;
  };

  _chart_man.prototype.hideCrossCursor = function(exceptTimeline) {
    if (exceptTimeline != null) {
      for (var n in this._timelines) {
        var e = this._timelines[n];
        if (e != exceptTimeline) e.unselect();
      }
    } else {
      for (var n in this._timelines) this._timelines[n].unselect();
    }
    for (var n in this._ranges) this._ranges[n].unselect();
  };

  _chart_man.prototype.clearHighlight = function() {
    if (this._highlightedFrame != null) {
      this._highlightedFrame.highlight(null);
      this._highlightedFrame = null;
    }
  };

  _chart_man.prototype.onToolMouseMove = function(frameName, x, y) {
    var ret = false;
    frameName += ".";
    for (var n in this._dataSources) {
      if (n.indexOf(frameName) == 0) {
        var ds = this._dataSources[n];
        if (iITance(ds, _main_data_source))
          if (ds.toolManager.acceptMouseMoveEvent(x, y)) ret = true;
      }
    }
    return ret;
  };

  _chart_man.prototype.onToolMouseDown = function(frameName, x, y) {
    var ret = false;
    frameName += ".";
    for (var n in this._dataSources) {
      if (n.indexOf(frameName) == 0) {
        var ds = this._dataSources[n];
        if (iITance(ds, _main_data_source))
          if (ds.toolManager.acceptMouseDownEvent(x, y)) ret = true;
      }
    }
    return ret;
  };

  _chart_man.prototype.onToolMouseUp = function(frameName, x, y) {
    var ret = false;
    frameName += ".";
    for (var n in this._dataSources) {
      if (n.indexOf(frameName) == 0) {
        var ds = this._dataSources[n];
        if (iITance(ds, _main_data_source))
          if (ds.toolManager.acceptMouseUpEvent(x, y)) ret = true;
      }
    }
    return ret;
  };

  _chart_man.prototype.onToolMouseDrag = function(frameName, x, y) {
    var ret = false;
    frameName += ".";
    for (var n in this._dataSources) {
      if (n.indexOf(frameName) == 0) {
        var ds = this._dataSources[n];
        if (iITance(ds, _main_data_source))
          if (ds.toolManager.acceptMouseDownMoveEvent(x, y)) ret = true;
      }
    }
    return ret;
  };

  _chart_man.prototype.onMouseMove = function(frameName, x, y, drag) {
    var frame = this.getFrame(frameName);
    if (frame === undefined) return;
    this.setFrameMousePos(frameName, x, y);
    this.hideCrossCursor();
    if (this._highlightedFrame != frame) this.clearHighlight();
    if (this._capturingMouseArea != null) {
      this._capturingMouseArea.onMouseMove(x, y);
      return;
    }
    var areas = frame.contains(x, y);
    if (areas == null) return;
    var a,
      i,
      cnt = areas.length;
    for (i = cnt - 1; i >= 0; i--) {
      a = areas[i];
      a = a.onMouseMove(x, y);
      if (a != null) {
        if (!iITance(a, _chart_area_group)) {
          frame.highlight(a);
          this._highlightedFrame = frame;
        }
        return;
      }
    }
  };

  _chart_man.prototype.onMouseLeave = function(frameName, x, y, move) {
    var frame = this.getFrame(frameName);
    if (frame == undefined) return;
    this.setFrameMousePos(frameName, x, y);
    this.hideCrossCursor();
    this.clearHighlight();
    if (this._capturingMouseArea != null) {
      this._capturingMouseArea.onMouseLeave(x, y);
      this._capturingMouseArea = null;
    }
    this._dragStarted = false;
  };

  _chart_man.prototype.onMouseDown = function(frameName, x, y) {
    var frame = this.getFrame(frameName);
    if (frame == undefined) return;
    var areas = frame.contains(x, y);
    if (areas == null) return;
    var a,
      i,
      cnt = areas.length;
    for (i = cnt - 1; i >= 0; i--) {
      a = areas[i];
      a = a.onMouseDown(x, y);
      if (a != null) {
        this._capturingMouseArea = a;
        return;
      }
    }
  };

  _chart_man.prototype.onMouseUp = function(frameName, x, y) {
    var frame = this.getFrame(frameName);
    if (frame == undefined) return;
    if (this._capturingMouseArea) {
      if (
        this._capturingMouseArea.onMouseUp(x, y) == null &&
        this._dragStarted == false
      ) {
        if (this._selectedFrame != null && this._selectedFrame != frame)
          this._selectedFrame.select(null);
        if (this._capturingMouseArea.isSelected()) {
          if (!this._captureMouseWheelDirectly)
            $(this._overlayCanvas).unbind("mousewheel");
          frame.select(null);
          this._selectedFrame = null;
        } else {
          if (this._selectedFrame != frame)
            if (!this._captureMouseWheelDirectly)
              $(this._overlayCanvas).bind("mousewheel", mouseWheel);
          frame.select(this._capturingMouseArea);
          this._selectedFrame = frame;
        }
      }
      this._capturingMouseArea = null;
      this._dragStarted = false;
    }
  };

  _chart_man.prototype.deleteToolObject = function() {
    var pDPTool = this.getDataSource("frame0.k0");
    var selectObject = pDPTool.getSelectToolObjcet();
    if (selectObject != null) pDPTool.delSelectToolObject();
    var currentObject = pDPTool.getCurrentToolObject();
    if (
      currentObject != null &&
      currentObject.getState() != CToolObject.state.AfterDraw
    ) {
      pDPTool.delToolObject();
    }
    this.setNormalMode();
  };

  _chart_man.prototype.unloadTemplate = function(frameName) {
    var frame = this.getFrame(frameName);
    if (frame == undefined) return;
    for (var n in this._dataSources) {
      if (n.match(frameName + ".")) delete this._dataSources[n];
    }
    for (var n in this._dataProviders) {
      if (this._dataProviders[n].getFrameName() == frameName)
        delete this._dataProviders[n];
    }
    delete this._frames[frameName];
    for (var n in this._areas) {
      if (this._areas[n].getFrameName() == frameName) delete this._areas[n];
    }
    for (var n in this._timelines) {
      if (this._timelines[n].getFrameName() == frameName)
        delete this._timelines[n];
    }
    for (var n in this._ranges) {
      if (this._ranges[n].getFrameName() == frameName) delete this._ranges[n];
    }
    for (var n in this._plotters) {
      if (this._plotters[n].getFrameName() == frameName)
        delete this._plotters[n];
    }
    delete this._themes[frameName];
    delete this._frameMousePos[frameName];
  };

  _chart_man.prototype.create_indtorAndRange = function(
    areaName,
    indicName,
    notLoadSettings
  ) {
    var indic, range;
    switch (indicName) {
      case "MA":
        indic = new __indtor();
        range = new _positive_range(areaName);
        break;

      case "EMA":
        indic = new _new_indtor();
        range = new _positive_range(areaName);
        break;

      case "VOLUME":
        indic = new _vo_indtor();
        range = new ZeroBased_positive_range(areaName);
        break;

      case "MACD":
        indic = new _MACD_indtor();
        range = new _zero_centeredR(areaName);
        break;

      case "DMI":
        indic = new _DMI_indtor();
        range = new PercentageRange(areaName);
        break;

      case "DMA":
        indic = new D__indtor();
        range = new Range(areaName);
        break;

      case "TRIX":
        indic = new TRIX_indtor();
        range = new Range(areaName);
        break;

      case "BRAR":
        indic = new BRAR_indtor();
        range = new Range(areaName);
        break;

      case "VR":
        indic = new VR_indtor();
        range = new Range(areaName);
        break;

      case "OBV":
        indic = new OBV_indtor();
        range = new Range(areaName);
        break;

      case "EMV":
        indic = new _EMV_indtor();
        range = new Range(areaName);
        break;

      case "RSI":
        indic = new RSI_indtor();
        range = new PercentageRange(areaName);
        break;

      case "WR":
        indic = new WR_indtor();
        range = new PercentageRange(areaName);
        break;

      case "SAR":
        indic = new SAR_indtor();
        range = new _positive_range(areaName);
        break;

      case "KDJ":
        indic = new KDJ_indtor();
        range = new PercentageRange(areaName);
        break;

      case "ROC":
        indic = new ROC_indtor();
        range = new Range(areaName);
        break;

      case "MTM":
        indic = new MTM_indtor();
        range = new Range(areaName);
        break;

      case "BOLL":
        indic = new BOLL_indtor();
        range = new Range(areaName);
        break;

      case "PSY":
        indic = new PSY_indtor();
        range = new Range(areaName);
        break;

      case "StochRSI":
        indic = new STOCHRSI_indtor();
        range = new PercentageRange(areaName);
        break;

      default:
        return null;
    }
    if (!notLoadSettings)
      indic.setParameters(ChartSettings.get().indics[indicName]);
    return {
      indic: indic,
      range: range
    };
  };

  _chart_man.prototype.setMain_indtor = function(dsName, indicName) {
    var areaName = dsName + ".main";
    var dp = this.getDataProvider(areaName + ".main");
    if (dp == undefined || !iITance(dp, MainDataProvider)) return false;
    var indic;
    switch (indicName) {
      case "MA":
        indic = new __indtor();
        break;

      case "EMA":
        indic = new _new_indtor();
        break;

      case "BOLL":
        indic = new BOLL_indtor();
        break;

      case "SAR":
        indic = new SAR_indtor();
        break;

      default:
        return false;
    }
    indic.setParameters(ChartSettings.get().indics[indicName]);
    var indicDpName = areaName + ".secondary";
    var indicDp = this.getDataProvider(indicDpName);
    if (indicDp == undefined) {
      indicDp = new _i_data_prov(indicDpName);
      this.setDataProvider(indicDp.getName(), indicDp);
    }
    indicDp.set_indtor(indic);
    var plotter = this.getPlotter(indicDpName);
    if (plotter == undefined) {
      plotter = new _indtorPlotter(indicDpName);
      this.setPlotter(plotter.getName(), plotter);
    }
    this.getArea(areaName).setChanged(true);
    return true;
  };

  _chart_man.prototype.set_indtor = function(areaName, indicName) {
    var area = this.getArea(areaName);
    if (area == undefined || area.getNameObject().getCompAt(2) == "main")
      return false;
    var dp = this.getDataProvider(areaName + ".secondary");
    if (dp == undefined || !iITance(dp, _i_data_prov)) return false;
    var ret = this.create_indtorAndRange(areaName, indicName);
    if (ret == null) return false;
    var indic = ret.indic;
    var range = ret.range;
    this.removeDataProvider(areaName + ".main");
    this.removePlotter(areaName + ".main");
    this.removeRange(areaName);
    this.removePlotter(areaName + "Range.decoration");
    dp.set_indtor(indic);
    this.setRange(areaName, range);
    range.setPaddingTop(20);
    range.setPaddingBottom(4);
    range.setMinInterval(20);
    if (iITance(indic, _vo_indtor)) {
      var plotter = new LastVolumePlotter(areaName + "Range.decoration");
      this.setPlotter(plotter.getName(), plotter);
    } else if (iITance(indic, BOLL_indtor) || iITance(indic, SAR_indtor)) {
      var dp = new MainDataProvider(areaName + ".main");
      this.setDataProvider(dp.getName(), dp);
      dp.updateData();
      var plotter = new OHLCPlotter(areaName + ".main");
      this.setPlotter(plotter.getName(), plotter);
    }
    return true;
  };

  _chart_man.prototype.removeMain_indtor = function(dsName) {
    var areaName = dsName + ".main";
    var indicDpName = areaName + ".secondary";
    var indicDp = this.getDataProvider(indicDpName);
    if (indicDp == undefined || !iITance(indicDp, _i_data_prov)) return;
    this.removeDataProvider(indicDpName);
    this.removePlotter(indicDpName);
    this.getArea(areaName).setChanged(true);
  };

  _chart_man.prototype.remove_indtor = function(areaName) {
    var area = this.getArea(areaName);
    if (area == undefined || area.getNameObject().getCompAt(2) == "main")
      return;
    var dp = this.getDataProvider(areaName + ".secondary");
    if (dp == undefined || !iITance(dp, _i_data_prov)) return;
    var rangeAreaName = areaName + "Range";
    var rangeArea = this.getArea(rangeAreaName);
    if (rangeArea == undefined) return;
    var tableLayout = this.getArea(area.getDataSourceName() + ".charts");
    if (tableLayout == undefined) return;
    tableLayout.removeArea(area);
    this.removeArea(areaName);
    tableLayout.removeArea(rangeArea);
    this.removeArea(rangeAreaName);
    for (var n in this._dataProviders) {
      if (this._dataProviders[n].getAreaName() == areaName)
        this.removeDataProvider(n);
    }
    for (var n in this._ranges) {
      if (this._ranges[n].getAreaName() == areaName) this.removeRange(n);
    }
    for (var n in this._plotters) {
      if (this._plotters[n].getAreaName() == areaName) this.removePlotter(n);
    }
    for (var n in this._plotters) {
      if (this._plotters[n].getAreaName() == rangeAreaName)
        this.removePlotter(n);
    }
  };

  /**
   * get_indtorParameters
   *     获取指标的ParamExpr数组
   * @param indicName
   * @returns {*}
   */
  _chart_man.prototype.get_indtorParameters = function(indicName) {
    var indic = this._fake_indtors[indicName];
    if (indic == undefined) {
      var ret = this.create_indtorAndRange("", indicName);
      if (ret == null) return null;
      this._fake_indtors[indicName] = indic = ret.indic;
    }
    var params = [];
    var i,
      cnt = indic.getPCount();
    for (i = 0; i < cnt; i++) params.push(indic.getParameterAt(i));
    return params;
  };

  _chart_man.prototype.set_indtorParameters = function(indicName, params) {
    var n, indic;
    for (n in this._dataProviders) {
      var dp = this._dataProviders[n];
      if (iITance(dp, _i_data_prov) == false) continue;
      indic = dp.get_indtor();
      if (indic.getName() == indicName) {
        indic.setParameters(params);
        dp.refresh();
        this.getArea(dp.getAreaName()).setChanged(true);
      }
    }
    indic = this._fake_indtors[indicName];
    if (indic == undefined) {
      var ret = this.create_indtorAndRange("", indicName, true);
      if (ret == null) return;
      this._fake_indtors[indicName] = indic = ret.indic;
    }
    indic.setParameters(params);
  };

  _chart_man.prototype.get_iName = function(dsName, index) {
    var tableLayout = this.getArea(dsName + ".charts");
    var cnt = tableLayout.getAreaCount() >> 1;
    if (index < 0 || index >= cnt) return "";
    return tableLayout.getAreaAt(index << 1).getName();
  };

  var Timeline = new_class(_Named_object);

  Timeline._ItemWidth = [
    1,
    3,
    3,
    5,
    5,
    7,
    9,
    11,
    13,
    15,
    17,
    19,
    21,
    23,
    25,
    27,
    29
  ];

  Timeline._SpaceWidth = [1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 7, 7, 7];

  Timeline.PADDING_LEFT = 4;

  Timeline.PADDING_RIGHT = 8;

  Timeline.prototype._cTruct = function(name) {
    Timeline.__classId._cTruct.call(this, name);
    this._updated = false;
    this._innerLeft = 0;
    this._innerWidth = 0;
    this._firstColumnLeft = 0;
    this._scale = 3;
    this._lastScale = -1;
    this._maxItemCount = 0;
    this._maxIndex = 0;
    this._firstIndex = -1;
    this._selectedIndex = -1;
    this._savedFirstIndex = -1;
  };

  Timeline.prototype.isLatestShown = function() {
    return this.getLastIndex() == this._maxIndex;
  };

  Timeline.prototype.isUpdated = function() {
    return this._updated;
  };

  Timeline.prototype.setUpdated = function(v) {
    this._updated = v;
  };

  Timeline.prototype.getItemWidth = function() {
    return Timeline._ItemWidth[this._scale];
  };

  Timeline.prototype.getSpaceWidth = function() {
    return Timeline._SpaceWidth[this._scale];
  };

  Timeline.prototype.getColumnWidth = function() {
    return this.getSpaceWidth() + this.getItemWidth();
  };

  Timeline.prototype.getInnerWidth = function() {
    return this._innerWidth;
  };

  Timeline.prototype.getItemLeftOffset = function() {
    return this.getSpaceWidth();
  };

  Timeline.prototype.getItemCenterOffset = function() {
    return this.getSpaceWidth() + (this.getItemWidth() >> 1);
  };

  Timeline.prototype.getFirstColumnLeft = function() {
    return this._firstColumnLeft;
  };

  Timeline.prototype.getMaxItemCount = function() {
    return this._maxItemCount;
  };

  Timeline.prototype.getFirstIndex = function() {
    return this._firstIndex;
  };

  Timeline.prototype.getLastIndex = function() {
    return Math.min(this._firstIndex + this._maxItemCount, this._maxIndex);
  };

  Timeline.prototype.getSelectedIndex = function() {
    return this._selectedIndex;
  };

  Timeline.prototype.getMaxIndex = function() {
    return this._maxIndex;
  };

  Timeline.prototype.calcColumnCount = function(w) {
    return Math.floor(w / this.getColumnWidth()) << 0;
  };

  Timeline.prototype.calcFirstColumnLeft = function(maxItemCount) {
    return (
      this._innerLeft + this._innerWidth - this.getColumnWidth() * maxItemCount
    );
  };

  Timeline.prototype.calcFirstIndexAlignRight = function(
    oldFirstIndex,
    oldMaxItemCount,
    newMaxItemCount
  ) {
    return Math.max(
      0,
      oldFirstIndex +
        Math.max(oldMaxItemCount, 1) -
        Math.max(newMaxItemCount, 1)
    );
  };

  Timeline.prototype.calcFirstIndex = function(newMaxItemCount) {
    return this.validateFirstIndex(
      this.calcFirstIndexAlignRight(
        this._firstIndex,
        this._maxItemCount,
        newMaxItemCount
      ),
      newMaxItemCount
    );
  };

  Timeline.prototype.updateMaxItemCount = function() {
    var newMaxItemCount = this.calcColumnCount(this._innerWidth);
    var newFirstIndex;
    if (this._maxItemCount < 1) {
      newFirstIndex = this.calcFirstIndex(newMaxItemCount);
    } else if (this._lastScale == this._scale) {
      newFirstIndex = this.validateFirstIndex(
        this._firstIndex - (newMaxItemCount - this._maxItemCount)
      );
    } else {
      var focusedIndex =
        this._selectedIndex >= 0
          ? this._selectedIndex
          : this.getLastIndex() - 1;
      newFirstIndex = this.validateFirstIndex(
        focusedIndex -
          Math.round(
            ((focusedIndex - this._firstIndex) * newMaxItemCount) /
              this._maxItemCount
          )
      );
    }
    this._lastScale = this._scale;
    if (this._firstIndex != newFirstIndex) {
      if (this._selectedIndex == this._firstIndex)
        this._selectedIndex = newFirstIndex;
      this._firstIndex = newFirstIndex;
      this._updated = true;
    }
    if (this._maxItemCount != newMaxItemCount) {
      this._maxItemCount = newMaxItemCount;
      this._updated = true;
    }
    this._firstColumnLeft = this.calcFirstColumnLeft(newMaxItemCount);
  };

  Timeline.prototype.validateFirstIndex = function(firstIndex, maxItemCount) {
    if (this._maxIndex < 1) return -1;
    if (firstIndex < 0) return 0;
    var lastFirst = Math.max(0, this._maxIndex - 1);
    if (firstIndex > lastFirst) return lastFirst;
    return firstIndex;
  };

  Timeline.prototype.validateSelectedIndex = function() {
    if (this._selectedIndex < this._firstIndex) this._selectedIndex = -1;
    else if (this._selectedIndex >= this.getLastIndex())
      this._selectedIndex = -1;
  };

  Timeline.prototype.onLayout = function() {
    var mgr = _chart_man.getInstance();
    var area = mgr.getArea(this.getDataSourceName() + ".main");
    if (area != null) {
      this._innerLeft = area.getLeft() + Timeline.PADDING_LEFT;
      var w = Math.max(
        0,
        area.getWidth() - (Timeline.PADDING_LEFT + Timeline.PADDING_RIGHT)
      );
      if (this._innerWidth != w) {
        this._innerWidth = w;
        this.updateMaxItemCount();
      }
    }
  };

  Timeline.prototype.toIndex = function(x) {
    return this._firstIndex + this.calcColumnCount(x - this._firstColumnLeft);
  };

  Timeline.prototype.toColumnLeft = function(index) {
    return (
      this._firstColumnLeft + this.getColumnWidth() * (index - this._firstIndex)
    );
  };

  Timeline.prototype.toItemLeft = function(index) {
    return this.toColumnLeft(index) + this.getItemLeftOffset();
  };

  Timeline.prototype.toItemCenter = function(index) {
    return this.toColumnLeft(index) + this.getItemCenterOffset();
  };

  Timeline.prototype.selectAt = function(x) {
    this._selectedIndex = this.toIndex(x);
    this.validateSelectedIndex();
    return this._selectedIndex >= 0;
  };

  Timeline.prototype.unselect = function() {
    this._selectedIndex = -1;
  };

  Timeline.prototype.update = function() {
    var mgr = _chart_man.getInstance();
    var ds = mgr.getDataSource(this.getDataSourceName());
    var oldMaxIndex = this._maxIndex;
    this._maxIndex = ds.getDataCount();
    switch (ds.getUpdateMode()) {
      case DataSource.UpdateMode.Refresh:
        if (this._maxIndex < 1) this._firstIndex = -1;
        else
          this._firstIndex = Math.max(this._maxIndex - this._maxItemCount, 0);
        this._selectedIndex = -1;
        this._updated = true;
        break;

      case DataSource.UpdateMode.Append:
        var lastIndex = this.getLastIndex();
        var erasedCount = ds.getErasedCount();
        if (lastIndex < oldMaxIndex) {
          if (erasedCount > 0) {
            this._firstIndex = Math.max(this._firstIndex - erasedCount, 0);
            if (this._selectedIndex >= 0) {
              this._selectedIndex -= erasedCount;
              this.validateSelectedIndex();
            }
            this._updated = true;
          }
        } else if (lastIndex == oldMaxIndex) {
          this._firstIndex += this._maxIndex - oldMaxIndex;
          if (this._selectedIndex >= 0) {
            this._selectedIndex -= erasedCount;
            this.validateSelectedIndex();
          }
          this._updated = true;
        }
        break;
    }
  };

  Timeline.prototype.move = function(x) {
    if (this.isLatestShown())
      _chart_man
        .getInstance()
        .getArea(this.getDataSourceName() + ".mainRange")
        .setChanged(true);
    this._firstIndex = this.validateFirstIndex(
      this._savedFirstIndex - this.calcColumnCount(x),
      this._maxItemCount
    );
    this._updated = true;
    if (this._selectedIndex >= 0) this.validateSelectedIndex();
  };

  Timeline.prototype.startMove = function() {
    this._savedFirstIndex = this._firstIndex;
  };

  Timeline.prototype.scale = function(s) {
    this._scale += s;
    if (this._scale < 0) this._scale = 0;
    else if (this._scale >= Timeline._ItemWidth.length)
      this._scale = Timeline._ItemWidth.length - 1;
    this.updateMaxItemCount();
    if (this._selectedIndex >= 0) this.validateSelectedIndex();
  };

  var Range = new_class(_Named_object);

  Range.prototype._cTruct = function(name) {
    Range.__classId._cTruct.call(this, name);
    this._updated = true;
    this._minValue = Number.MAX_VALUE;
    this._maxValue = -Number.MAX_VALUE;
    this._outerMinValue = Number.MAX_VALUE;
    this._outerMaxValue = -Number.MAX_VALUE;
    this._ratio = 0;
    this._top = 0;
    this._bottom = 0;
    this._paddingTop = 0;
    this._paddingBottom = 0;
    this._minInterval = 36;
    this._selectedPosition = -1;
    this._selectedValue = -Number.MAX_VALUE;
    this._gradations = [];
  };

  Range.prototype.isUpdated = function() {
    return this._updated;
  };

  Range.prototype.setUpdated = function(v) {
    this._updated = v;
  };

  Range.prototype.getMinValue = function() {
    return this._minValue;
  };

  Range.prototype.getMaxValue = function() {
    return this._maxValue;
  };

  Range.prototype.getRange = function() {
    return this._maxValue - this._minValue;
  };

  Range.prototype.getOuterMinValue = function() {
    return this._outerMinValue;
  };

  Range.prototype.getOuterMaxValue = function() {
    return this._outerMaxValue;
  };

  Range.prototype.getOuterRange = function() {
    return this._outerMaxValue - this._outerMinValue;
  };

  Range.prototype.getHeight = function() {
    return Math.max(0, this._bottom - this._top);
  };

  Range.prototype.getGradations = function() {
    return this._gradations;
  };

  Range.prototype.getMinInterval = function() {
    return this._minInterval;
  };

  Range.prototype.setMinInterval = function(v) {
    this._minInterval = v;
  };

  Range.prototype.getSelectedPosition = function() {
    if (this._selectedPosition >= 0) return this._selectedPosition;
    if (this._selectedValue > -Number.MAX_VALUE)
      return this.toY(this._selectedValue);
    return -1;
  };

  Range.prototype.getSelectedValue = function() {
    if (this._selectedValue > -Number.MAX_VALUE) return this._selectedValue;
    var mgr = _chart_man.getInstance();
    var area = mgr.getArea(this.getAreaName());
    if (area == null) return -Number.MAX_VALUE;
    if (
      this._selectedPosition < area.getTop() + 12 ||
      this._selectedPosition >= area.getBottom() - 4
    )
      return -Number.MAX_VALUE;
    return this.toValue(this._selectedPosition);
  };

  Range.prototype.setPaddingTop = function(p) {
    this._paddingTop = p;
  };

  Range.prototype.setPaddingBottom = function(p) {
    this._paddingBottom = p;
  };

  Range.prototype.toValue = function(y) {
    return this._maxValue - (y - this._top) / this._ratio;
  };

  Range.prototype.toY = function(value) {
    if (this._ratio > 0)
      return (
        this._top + Math.floor((this._maxValue - value) * this._ratio + 0.5)
      );
    return this._top;
  };

  Range.prototype.toHeight = function(value) {
    return Math.floor(value * this._ratio + 1.5);
  };

  Range.prototype.update = function() {
    var min = Number.MAX_VALUE;
    var max = -Number.MAX_VALUE;
    var mgr = _chart_man.getInstance();
    var dp,
      dpNames = [".main", ".secondary"];
    for (var i = 0; i < dpNames.length; i++) {
      dp = mgr.getDataProvider(this.getName() + dpNames[i]);
      if (dp != null) {
        min = Math.min(min, dp.getMinValue());
        max = Math.max(max, dp.getMaxValue());
      }
    }
    var r = {
      min: min,
      max: max
    };
    this.preSetRange(r);
    this.setRange(r.min, r.max);
  };

  Range.prototype.select = function(v) {
    this._selectedValue = v;
    this._selectedPosition = -1;
  };

  Range.prototype.selectAt = function(y) {
    this._selectedPosition = y;
    this._selectedValue = -Number.MAX_VALUE;
  };

  Range.prototype.unselect = function() {
    this._selectedPosition = -1;
    this._selectedValue = -Number.MAX_VALUE;
  };

  Range.prototype.preSetRange = function(r) {
    if (r.min == r.max) {
      r.min = -1;
      r.max = 1;
    }
  };

  Range.prototype.setRange = function(minValue, maxValue) {
    var mgr = _chart_man.getInstance();
    var area = mgr.getArea(this.getAreaName());
    if (
      this._minValue == minValue &&
      this._maxValue == maxValue &&
      !area.isChanged()
    )
      return;
    this._updated = true;
    this._minValue = minValue;
    this._maxValue = maxValue;
    this._gradations = [];
    var top = area.getTop() + this._paddingTop;
    var bottom = area.getBottom() - (this._paddingBottom + 1);
    if (top >= bottom) {
      this._minValue = this._maxValue;
      return;
    }
    this._top = top;
    this._bottom = bottom;
    if (this._maxValue > this._minValue)
      this._ratio = (bottom - top) / (this._maxValue - this._minValue);
    else {
      this._ratio = 1e-9;
    }
    this._outerMinValue = this.toValue(area.getBottom());
    this._outerMaxValue = this.toValue(area.getTop());
    this.updateGradations();
  };

  Range.prototype.calcInterval = function() {
    var H = this.getHeight();
    var h = this.getMinInterval();
    if (H / h <= 1) h = H >> 1;
    var d = this.getRange();
    var i = 0;
    while (i > -2 && Math.floor(d) < d) {
      d *= 10;
      i--;
    }
    var m, c;
    for (; ; i++) {
      c = Math.pow(10, i);
      m = c;
      if (this.toHeight(m) > h) break;
      m = 2 * c;
      if (this.toHeight(m) > h) break;
      m = 5 * c;
      if (this.toHeight(m) > h) break;
    }
    return m;
  };

  Range.prototype.updateGradations = function() {
    this._gradations = [];
    var interval = this.calcInterval();
    if (interval <= 0) return;
    var v = Math.floor(this.getMaxValue() / interval) * interval;
    do {
      this._gradations.push(v);
      v -= interval;
    } while (v > this.getMinValue());
  };

  var _positive_range = new_class(Range);

  _positive_range.prototype._cTruct = function(name) {
    _positive_range.__classId._cTruct.call(this, name);
  };

  _positive_range.prototype.preSetRange = function(r) {
    if (r.min < 0) r.min = 0;
    if (r.max < 0) r.max = 0;
  };

  var ZeroBased_positive_range = new_class(Range);

  ZeroBased_positive_range.prototype._cTruct = function(name) {
    ZeroBased_positive_range.__classId._cTruct.call(this, name);
  };

  ZeroBased_positive_range.prototype.preSetRange = function(r) {
    r.min = 0;
    if (r.max < 0) r.max = 0;
  };

  var MainRange = new_class(Range);

  MainRange.prototype._cTruct = function(name) {
    MainRange.__classId._cTruct.call(this, name);
  };

  MainRange.prototype.preSetRange = function(r) {
    var mgr = _chart_man.getInstance();
    var timeline = mgr.getTimeline(this.getDataSourceName());
    var dIndex = timeline.getMaxIndex() - timeline.getLastIndex();
    if (dIndex < 25) {
      var ds = mgr.getDataSource(this.getDataSourceName());
      var data = ds.getDataAt(ds.getDataCount() - 1);
      var d = ((r.max - r.min) / 4) * (1 - dIndex / 25);
      r.min = Math.min(r.min, Math.max(data.low - d, 0));
      r.max = Math.max(r.max, data.high + d);
    }
    if (r.min > 0) {
      var a = r.max / r.min;
      if (a < 1.012) {
        var m = (r.max + r.min) / 2;
        r.max = m * 1.006;
        r.min = m * 0.994;
      } else if (a < 1.024) {
        var m = (r.max + r.min) / 2;
        var c = a - 1;
        r.max = m * (1 + c);
        r.min = m * (1 - c);
      } else if (a < 1.048) {
        var m = (r.max + r.min) / 2;
        r.max = m * 1.024;
        r.min = m * 0.976;
      }
    }
    if (r.min < 0) r.min = 0;
    if (r.max < 0) r.max = 0;
  };

  var _zero_centeredR = new_class(Range);

  _zero_centeredR.prototype._cTruct = function(name) {
    _zero_centeredR.__classId._cTruct.call(this, name);
  };

  _zero_centeredR.prototype.calcInterval = function(area) {
    var h = this.getMinInterval();
    if (area.getHeight() / h < 2) return 0;
    var r = this.getRange();
    var i;
    for (i = 3; ; i += 2) {
      if (this.toHeight(r / i) <= h) break;
    }
    i -= 2;
    return r / i;
  };

  _zero_centeredR.prototype.updateGradations = function() {
    this._gradations = [];
    var mgr = _chart_man.getInstance();
    var area = mgr.getArea(this.getAreaName());
    var interval = this.calcInterval(area);
    if (interval <= 0) return;
    var v = interval / 2;
    do {
      this._gradations.push(v);
      this._gradations.push(-v);
      v += interval;
    } while (v <= this.getMaxValue());
  };

  _zero_centeredR.prototype.preSetRange = function(r) {
    var abs = Math.max(Math.abs(r.min), Math.abs(r.max));
    r.min = -abs;
    r.max = abs;
  };

  var PercentageRange = new_class(Range);

  PercentageRange.prototype._cTruct = function(name) {
    PercentageRange.__classId._cTruct.call(this, name);
  };

  PercentageRange.prototype.updateGradations = function() {
    this._gradations = [];
    var mgr = _chart_man.getInstance();
    var area = mgr.getArea(this.getAreaName());
    var interval = 10;
    var h = Math.floor(this.toHeight(interval));
    if (h << 2 > area.getHeight()) return;
    var v = Math.ceil(this.getMinValue() / interval) * interval;
    if (v == 0) v = 0;
    if (h << 2 < 24) {
      if (h << 1 < 8) return;
      do {
        if (v == 20 || v == 80) this._gradations.push(v);
        v += interval;
      } while (v < this.getMaxValue());
    } else {
      do {
        if (h < 8) {
          if (v == 20 || v == 50 || v == 80) this._gradations.push(v);
        } else {
          if (v == 0 || v == 20 || v == 50 || v == 80 || v == 100)
            this._gradations.push(v);
        }
        v += interval;
      } while (v < this.getMaxValue());
    }
  };

  var DataSource = new_class(_Named_object);

  DataSource.prototype._cTruct = function(name) {
    DataSource.__classId._cTruct.call(this, name);
  };

  DataSource.UpdateMode = {
    DoNothing: 0,
    Refresh: 1,
    Update: 2,
    Append: 3
  };

  DataSource.prototype.getUpdateMode = function() {
    return this._updateMode;
  };

  DataSource.prototype.setUpdateMode = function(mode) {
    this._updateMode = mode;
  };

  DataSource.prototype.getCacheSize = function() {
    return 0;
  };

  DataSource.prototype.getDataCount = function() {
    return 0;
  };

  var _main_data_source = new_class(DataSource);

  _main_data_source.prototype._cTruct = function(name) {
    _main_data_source.__classId._cTruct.call(this, name);
    this._erasedCount = 0;
    this._dataItems = [];
    this._decimalDigits = 0;
    this.toolManager = new CToolManager(name);
  };

  _main_data_source.prototype.getCacheSize = function() {
    return this._dataItems.length;
  };

  _main_data_source.prototype.getDataCount = function() {
    return this._dataItems.length;
  };

  _main_data_source.prototype.getUpdatedCount = function() {
    return this._updatedCount;
  };

  _main_data_source.prototype.getAppendedCount = function() {
    return this._appendedCount;
  };

  _main_data_source.prototype.getErasedCount = function() {
    return this._erasedCount;
  };

  _main_data_source.prototype.getDecimalDigits = function() {
    return this._decimalDigits;
  };

  _main_data_source.prototype.calcDecimalDigits = function(v) {
    var str = "" + fixDe(v);
    var i = str.indexOf(".");
    if (i < 0) return 0;
    return str.length - 1 - i;
  };

  _main_data_source.prototype.getLastDate = function() {
    var count = this.getDataCount();
    if (count < 1) return -1;
    return this.getDataAt(count - 1).date;
  };

  _main_data_source.prototype.getDataAt = function(index) {
    return this._dataItems[index];
  };

  _main_data_source.prototype.update = function(data) {
    this._updatedCount = 0;
    this._appendedCount = 0;
    this._erasedCount = 0;
    this._dataItems = [];
    var len = this._dataItems.length;
    if (len > 0) {
      var lastIndex = len - 1;
      var lastItem = this._dataItems[lastIndex];
      var e,
        i,
        cnt = data.length;
      for (i = 0; i < cnt; i++) {
        e = data[i];
        if (e[0] == lastItem.date) {
          if (
            lastItem.open == e[1] &&
            lastItem.high == e[2] &&
            lastItem.low == e[3] &&
            lastItem.close == e[4] &&
            lastItem.volume == e[5]
          ) {
            this.setUpdateMode(DataSource.UpdateMode.DoNothing);
          } else {
            this.setUpdateMode(DataSource.UpdateMode.Update);
            this._dataItems[lastIndex] = {
              date: e[0],
              open: e[1],
              high: e[2],
              low: e[3],
              close: e[4],
              volume: e[5]
            };
            this._updatedCount++;
          }
          i++;
          if (i < cnt) {
            this.setUpdateMode(DataSource.UpdateMode.Append);
            for (; i < cnt; i++, this._appendedCount++) {
              e = data[i];
              this._dataItems.push({
                date: e[0],
                open: e[1],
                high: e[2],
                low: e[3],
                close: e[4],
                volume: e[5]
              });
            }
          }
          return true;
        }
      }
      if (cnt < 1e3) {
        this.setUpdateMode(DataSource.UpdateMode.DoNothing);
        return false;
      }
    }
    this.setUpdateMode(DataSource.UpdateMode.Refresh);
    this._dataItems = [];
    var d,
      n,
      e,
      i,
      cnt = data.length;
    for (i = 0; i < cnt; i++) {
      e = data[i];
      for (n = 1; n <= 4; n++) {
        d = this.calcDecimalDigits(e[n]);
        if (this._decimalDigits < d) this._decimalDigits = d;
      }
      this._dataItems.push({
        date: e[0],
        open: e[1],
        high: e[2],
        low: e[3],
        close: e[4],
        volume: e[5]
      });
    }
    return true;
  };

  _main_data_source.prototype.select = function(id) {
    this.toolManager.selecedObject = id;
  };

  _main_data_source.prototype.unselect = function() {
    this.toolManager.selecedObject = -1;
  };

  _main_data_source.prototype.addToolObject = function(toolObject) {
    this.toolManager.addToolObject(toolObject);
  };

  _main_data_source.prototype.delToolObject = function() {
    this.toolManager.delCurrentObject();
  };

  _main_data_source.prototype.getToolObject = function(index) {
    return this.toolManager.getToolObject(index);
  };

  _main_data_source.prototype.getToolObjectCount = function() {
    return this.toolManager.toolObjects.length;
  };

  _main_data_source.prototype.getCurrentToolObject = function() {
    return this.toolManager.getCurrentObject();
  };

  _main_data_source.prototype.getSelectToolObjcet = function() {
    return this.toolManager.getSelectedObject();
  };

  _main_data_source.prototype.delSelectToolObject = function() {
    this.toolManager.delSelectedObject();
  };

  var DataProvider = new_class(_Named_object);

  DataProvider.prototype._cTruct = function(name) {
    DataProvider.__classId._cTruct.call(this, name);
    this._minValue = 0;
    this._maxValue = 0;
    this._minValueIndex = -1;
    this._maxValueIndex = -1;
  };

  DataProvider.prototype.getMinValue = function() {
    return this._minValue;
  };

  DataProvider.prototype.getMaxValue = function() {
    return this._maxValue;
  };

  DataProvider.prototype.getMinValueIndex = function() {
    return this._minValueIndex;
  };

  DataProvider.prototype.getMaxValueIndex = function() {
    return this._maxValueIndex;
  };

  DataProvider.prototype.calcRange = function(
    firstIndexes,
    lastIndex,
    minmaxes,
    indexes
  ) {
    var min = Number.MAX_VALUE;
    var max = -Number.MAX_VALUE;
    var minIndex = -1;
    var maxIndex = -1;
    var minmax = {};
    var i = lastIndex - 1;
    var n = firstIndexes.length - 1;
    for (; n >= 0; n--) {
      var first = firstIndexes[n];
      if (i < first) {
        minmaxes[n] = {
          min: min,
          max: max
        };
      } else {
        for (; i >= first; i--) {
          if (this.getMinMaxAt(i, minmax) == false) continue;
          if (min > minmax.min) {
            min = minmax.min;
            minIndex = i;
          }
          if (max < minmax.max) {
            max = minmax.max;
            maxIndex = i;
          }
        }
        minmaxes[n] = {
          min: min,
          max: max
        };
      }
      if (indexes != null) {
        indexes[n] = {
          minIndex: minIndex,
          maxIndex: maxIndex
        };
      }
    }
  };

  DataProvider.prototype.updateRange = function() {
    var mgr = _chart_man.getInstance();
    var timeline = mgr.getTimeline(this.getDataSourceName());
    var firstIndexes = [timeline.getFirstIndex()];
    var minmaxes = [{}];
    var indexes = [{}];
    this.calcRange(firstIndexes, timeline.getLastIndex(), minmaxes, indexes);
    this._minValue = minmaxes[0].min;
    this._maxValue = minmaxes[0].max;
    this._minValueIndex = indexes[0].minIndex;
    this._maxValueIndex = indexes[0].maxIndex;
  };

  var MainDataProvider = new_class(DataProvider);

  MainDataProvider.prototype._cTruct = function(name) {
    MainDataProvider.__classId._cTruct.call(this, name);
    this._candlestickDS = null;
  };

  MainDataProvider.prototype.updateData = function() {
    var mgr = _chart_man.getInstance();
    var ds = mgr.getDataSource(this.getDataSourceName());
    if (!iITance(ds, _main_data_source)) return;
    this._candlestickDS = ds;
  };

  MainDataProvider.prototype.getMinMaxAt = function(index, minmax) {
    var data = this._candlestickDS.getDataAt(index);
    minmax.min = data.low;
    minmax.max = data.high;
    return true;
  };

  var _i_data_prov = new_class(DataProvider);

  _i_data_prov.prototype.get_indtor = function() {
    return this.__indtor;
  };

  _i_data_prov.prototype.set_indtor = function(v) {
    this.__indtor = v;
    this.refresh();
  };

  _i_data_prov.prototype.refresh = function() {
    var mgr = _chart_man.getInstance();
    var ds = mgr.getDataSource(this.getDataSourceName());
    if (ds.getDataCount() < 1) return;
    var indic = this.__indtor;
    var i,
      last = ds.getDataCount();
    indic.clear();
    indic.reserve(last);
    for (i = 0; i < last; i++) indic.execute(ds, i);
  };

  _i_data_prov.prototype.updateData = function() {
    var mgr = _chart_man.getInstance();
    var ds = mgr.getDataSource(this.getDataSourceName());
    if (ds.getDataCount() < 1) return;
    var indic = this.__indtor;
    var mode = ds.getUpdateMode();
    switch (mode) {
      case DataSource.UpdateMode.Refresh: {
        this.refresh();
        break;
      }

      case DataSource.UpdateMode.Append: {
        indic.reserve(ds.getAppendedCount());
      }

      case DataSource.UpdateMode.Update: {
        var i,
          last = ds.getDataCount();
        var cnt = ds.getUpdatedCount() + ds.getAppendedCount();
        for (i = last - cnt; i < last; i++) indic.execute(ds, i);
        break;
      }
    }
  };

  _i_data_prov.prototype.getMinMaxAt = function(index, minmax) {
    minmax.min = Number.MAX_VALUE;
    minmax.max = -Number.MAX_VALUE;
    var result,
      valid = false;
    var i,
      cnt = this.__indtor.getOutputCount();
    for (i = 0; i < cnt; i++) {
      result = this.__indtor.getOutputAt(i).execute(index);
      if (isNaN(result) == false) {
        valid = true;
        if (minmax.min > result) minmax.min = result;
        if (minmax.max < result) minmax.max = result;
      }
    }
    return valid;
  };

  var theCId = 0;

  var theme_font_id = 0;

  var Theme = new_class();

  Theme.prototype.getColor = function(which) {
    return this._clors[which];
  };

  Theme.prototype.getFont = function(which) {
    return this._fonts[which];
  };

  Theme.Co = {
    Positive: theCId++,
    Negative: theCId++,
    PositiveDark: theCId++,
    NegativeDark: theCId++,
    Unchanged: theCId++,
    Background: theCId++,
    Cursor: theCId++,
    RangeMark: theCId++,
    _indtor0: theCId++,
    _indtor1: theCId++,
    _indtor2: theCId++,
    _indtor3: theCId++,
    Grid0: theCId++,
    Grid1: theCId++,
    Grid2: theCId++,
    Grid3: theCId++,
    Grid4: theCId++,
    TextPositive: theCId++,
    TextNegative: theCId++,
    Text0: theCId++,
    Text1: theCId++,
    Text2: theCId++,
    Text3: theCId++,
    Text4: theCId++,
    LineColorNormal: theCId++,
    LineColorSelected: theCId++,
    CircleColorFill: theCId++,
    CircleColorStroke: theCId++
  };

  Theme.Font = {
    Default: theme_font_id++
  };

  var DarkTheme = new_class(Theme);

  DarkTheme.prototype._cTruct = function() {
    this._clors = [];
    this._clors[Theme.Co.Positive] = def.rise;
    this._clors[Theme.Co.Negative] = def.fall;
    this._clors[Theme.Co.PositiveDark] = "#004718";
    this._clors[Theme.Co.NegativeDark] = "#3b0e08";
    this._clors[Theme.Co.Unchanged] = "#fff";
    this._clors[Theme.Co.Background] = "#0a0a0a";
    this._clors[Theme.Co.Cursor] = "#aaa";
    this._clors[Theme.Co.RangeMark] = "#f9ee30";
    this._clors[Theme.Co._indtor0] = "#ddd";
    this._clors[Theme.Co._indtor1] = "#f9ee30";
    this._clors[Theme.Co._indtor2] = "#f600ff";
    this._clors[Theme.Co._indtor3] = "#6bf";
    this._clors[Theme.Co.Grid0] = "#333";
    this._clors[Theme.Co.Grid1] = "#444";
    this._clors[Theme.Co.Grid2] = "#666";
    this._clors[Theme.Co.Grid3] = "#888";
    this._clors[Theme.Co.Grid4] = "#aaa";
    this._clors[Theme.Co.TextPositive] = "#1bd357";
    this._clors[Theme.Co.TextNegative] = "#ff6f5e";
    this._clors[Theme.Co.Text0] = "#444";
    this._clors[Theme.Co.Text1] = "#666";
    this._clors[Theme.Co.Text2] = "#888";
    this._clors[Theme.Co.Text3] = "#aaa";
    this._clors[Theme.Co.Text4] = "#ccc";
    this._clors[Theme.Co.LineColorNormal] = "#a6a6a6";
    this._clors[Theme.Co.LineColorSelected] = "#ffffff";
    this._clors[Theme.Co.CircleColorFill] = "#000000";
    this._clors[Theme.Co.CircleColorStroke] = "#ffffff";
    this._fonts = [];
    this._fonts[Theme.Font.Default] = "12px Tahoma";
  };

  var LightTheme = new_class(Theme);

  LightTheme.prototype._cTruct = function() {
    this._clors = [];
    this._clors[Theme.Co.Positive] = def.rise;
    this._clors[Theme.Co.Negative] = def.fall;
    this._clors[Theme.Co.PositiveDark] = def.fall;
    this._clors[Theme.Co.NegativeDark] = def.rise;
    this._clors[Theme.Co.Unchanged] = "#283552";
    this._clors[Theme.Co.Background] = "#283552";
    this._clors[Theme.Co.Cursor] = "#aaa"; //鼠标十字线
    this._clors[Theme.Co.RangeMark] = "#f27935"; //当前价格
    this._clors[Theme.Co._indtor0] = "#2fd2b2"; //MA...
    this._clors[Theme.Co._indtor1] = "#ffb400"; //当前价格横线
    this._clors[Theme.Co._indtor2] = "#e849b9";
    this._clors[Theme.Co._indtor3] = "#1478c8";
    this._clors[Theme.Co.Grid0] = "#415480"; //虚线
    this._clors[Theme.Co.Grid1] = "#415480"; //各区块分割线
    this._clors[Theme.Co.Grid2] = "#ccc";
    this._clors[Theme.Co.Grid3] = "#999"; //当前鼠标的纵向日期边框
    this._clors[Theme.Co.Grid4] = "#aaa";
    this._clors[Theme.Co.TextPositive] = "#53b37b";
    this._clors[Theme.Co.TextNegative] = "#db5542";
    this._clors[Theme.Co.Text0] = "#ccc";
    this._clors[Theme.Co.Text1] = "#aaa";
    this._clors[Theme.Co.Text2] = "#ddd"; //时间刻度颜色
    this._clors[Theme.Co.Text3] = "#fff"; //鼠标刻度右边当前价格颜色
    this._clors[Theme.Co.Text4] = "#eee"; //日期刻度、各种信息颜色
    this._clors[Theme.Co.LineColorNormal] = "#8c8c8c";
    this._clors[Theme.Co.LineColorSelected] = "#393c40";
    this._clors[Theme.Co.CircleColorFill] = "#ffffff";
    this._clors[Theme.Co.CircleColorStroke] = "#393c40";
    this._fonts = [];
    this._fonts[Theme.Font.Default] = "12px Tahoma";
  };

  var TemplateMeasuringHandler = new_class();

  TemplateMeasuringHandler.onMeasuring = function(sender, args) {
    var width = args.Width;
    var height = args.Height;
    var areaName = sender.getNameObject().getCompAt(2);
    if (areaName == "timeline") sender.setMeasuredDimension(width, 22);
  };

  var Template = new_class();

  Template.displayVolume = true;

  Template.createCandlestickDataSource = function(dsAlias) {
    return new _main_data_source(dsAlias);
  };

  Template.createLiveOrderDataSource = function(dsAlias) {
    return new CLiveOrderDataSource(dsAlias);
  };

  Template.createLiveTradeDataSource = function(dsAlias) {
    return new CLiveTradeDataSource(dsAlias);
  };

  Template.createDataSource = function(dsName, dsAlias, createFunc) {
    var mgr = _chart_man.getInstance();
    if (mgr.getCachedDataSource(dsAlias) == null)
      mgr.setCachedDataSource(dsAlias, createFunc(dsAlias));
    mgr.setCurrentDataSource(dsName, dsAlias);
    mgr.updateData(dsName, null);
  };

  Template.createTableComps = function(dsName) {
    Template.createMainChartComps(dsName);
    if (Template.displayVolume)
      Template.create_indtorChartComps(dsName, "VOLUME");
    Template.createTimelineComps(dsName);
  };

  Template.createMainChartComps = function(dsName) {
    var mgr = _chart_man.getInstance();
    var tableLayout = mgr.getArea(dsName + ".charts");
    var areaName = dsName + ".main";
    var rangeAreaName = areaName + "Range";
    var area = new _main_area(areaName);
    mgr.setArea(areaName, area);
    tableLayout.addArea(area);
    var rangeArea = new _main_range_area(rangeAreaName);
    mgr.setArea(rangeAreaName, rangeArea);
    tableLayout.addArea(rangeArea);
    var dp = new MainDataProvider(areaName + ".main");
    mgr.setDataProvider(dp.getName(), dp);
    mgr.setMain_indtor(dsName, "MA");
    var range = new MainRange(areaName);
    mgr.setRange(range.getName(), range);
    range.setPaddingTop(28);
    range.setPaddingBottom(12);
    var plotter = new _main_areaBackgroundPlotter(areaName + ".background");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new CGridPlotter(areaName + ".grid");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new CandlestickPlotter(areaName + ".main");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new MinMaxPlotter(areaName + ".decoration");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new MainInfoPlotter(areaName + ".info");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new SelectionPlotter(areaName + ".selection");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new CDynamicLinePlotter(areaName + ".tool");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new RangeAreaBackgroundPlotter(areaName + "Range.background");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new COrderGraphPlotter(areaName + "Range.grid");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new RangePlotter(areaName + "Range.main");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new RangeSelectionPlotter(areaName + "Range.selection");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new LastClosePlotter(areaName + "Range.decoration");
    mgr.setPlotter(plotter.getName(), plotter);
  };

  Template.create_indtorChartComps = function(dsName, indicName) {
    var mgr = _chart_man.getInstance();
    var tableLayout = mgr.getArea(dsName + ".charts");
    var areaName = dsName + ".indic" + tableLayout.getNextRowId();
    var rangeAreaName = areaName + "Range";
    var area = new _indtorArea(areaName);
    mgr.setArea(areaName, area);
    tableLayout.addArea(area);
    var rowIndex = tableLayout.getAreaCount() >> 1;
    var heights = ChartSettings.get().charts.areaHeight;
    if (heights.length > rowIndex) {
      var a, i;
      for (i = 0; i < rowIndex; i++) {
        a = tableLayout.getAreaAt(i << 1);
        a.setTop(0);
        a.setBottom(heights[i]);
      }
      area.setTop(0);
      area.setBottom(heights[rowIndex]);
    }
    var rangeArea = new _ind_ange_area(rangeAreaName);
    mgr.setArea(rangeAreaName, rangeArea);
    tableLayout.addArea(rangeArea);
    var dp = new _i_data_prov(areaName + ".secondary");
    mgr.setDataProvider(dp.getName(), dp);
    if (mgr.set_indtor(areaName, indicName) == false) {
      mgr.remove_indtor(areaName);
      return;
    }
    var plotter = new _main_areaBackgroundPlotter(areaName + ".background");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new CGridPlotter(areaName + ".grid");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _indtorPlotter(areaName + ".secondary");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new _indtorInfoPlotter(areaName + ".info");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new SelectionPlotter(areaName + ".selection");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new RangeAreaBackgroundPlotter(areaName + "Range.background");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new RangePlotter(areaName + "Range.main");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new RangeSelectionPlotter(areaName + "Range.selection");
    mgr.setPlotter(plotter.getName(), plotter);
  };

  Template.createTimelineComps = function(dsName) {
    var mgr = _chart_man.getInstance();
    var plotter;
    var timeline = new Timeline(dsName);
    mgr.setTimeline(timeline.getName(), timeline);
    plotter = new TimelineAreaBackgroundPlotter(
      dsName + ".timeline.background"
    );
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new TimelinePlotter(dsName + ".timeline.main");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new TimelineSelectionPlotter(dsName + ".timeline.selection");
    mgr.setPlotter(plotter.getName(), plotter);
  };

  Template.createLiveOrderComps = function(dsName) {
    var mgr = _chart_man.getInstance();
    var plotter;
    plotter = new BackgroundPlotter(dsName + ".main.background");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new CLiveOrderPlotter(dsName + ".main.main");
    mgr.setPlotter(plotter.getName(), plotter);
  };

  Template.createLiveTradeComps = function(dsName) {
    var mgr = _chart_man.getInstance();
    var plotter;
    plotter = new BackgroundPlotter(dsName + ".main.background");
    mgr.setPlotter(plotter.getName(), plotter);
    plotter = new CLiveTradePlotter(dsName + ".main.main");
    mgr.setPlotter(plotter.getName(), plotter);
  };

  var DefaultTemplate = new_class(Template);

  DefaultTemplate.loadTemplate = function(
    dsName,
    dsAlias,
    dsNameOrder,
    dsAliasOrder,
    dsNameTrade,
    dsAliasTrade
  ) {
    var mgr = _chart_man.getInstance();
    var settings = ChartSettings.get();
    var frameName = new CName(dsName).getCompAt(0);
    mgr.unloadTemplate(frameName);
    Template.createDataSource(
      dsName,
      dsAlias,
      Template.createCandlestickDataSource
    );
    var frame = new _dockable_layout(frameName);
    mgr.setFrame(frame.getName(), frame);
    mgr.setArea(frame.getName(), frame);
    frame.setGridColor(Theme.Co.Grid1);
    var area = new TimelineArea(dsName + ".timeline");
    mgr.setArea(area.getName(), area);
    frame.addArea(area);
    area.setDockStyle(_chart_area.DockStyle.Bottom);
    area.Measuring.addHandler(area, TemplateMeasuringHandler.onMeasuring);
    var tableLayout = new TableLayout(dsName + ".charts");
    mgr.setArea(tableLayout.getName(), tableLayout);
    tableLayout.setDockStyle(_chart_area.DockStyle.Fill);
    frame.addArea(tableLayout);
    Template.createTableComps(dsName);
    mgr.setThemeName(frameName, settings.theme);
    return mgr;
  };

  var Plotter = new_class(_Named_object);

  Plotter.prototype._cTruct = function(name) {
    Plotter.__classId._cTruct.call(this, name);
  };

  Plotter.isChrome = navigator.userAgent.toLowerCase().match(/chrome/) != null;

  Plotter.drawLine = function(context, x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo((x1 << 0) + 0.5, (y1 << 0) + 0.5);
    context.lineTo((x2 << 0) + 0.5, (y2 << 0) + 0.5);
    context.stroke();
  };

  Plotter.drawLines = function(context, points) {
    var i,
      cnt = points.length;
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (i = 1; i < cnt; i++) context.lineTo(points[i].x, points[i].y);
    if (Plotter.isChrome) {
      context.moveTo(points[0].x, points[0].y);
      for (i = 1; i < cnt; i++) context.lineTo(points[i].x, points[i].y);
    }
    context.stroke();
  };

  Plotter.drawDashedLine = function(
    context,
    x1,
    y1,
    x2,
    y2,
    dashLen,
    dashSolid
  ) {
    if (dashLen < 2) dashLen = 2;
    var dX = x2 - x1;
    var dY = y2 - y1;
    context.beginPath();
    if (dY == 0) {
      var count = (dX / dashLen + 0.5) << 0;
      for (var i = 0; i < count; i++) {
        context.rect(x1, y1, dashSolid, 1);
        x1 += dashLen;
      }
      context.fill();
    } else {
      var count = (Math.sqrt(dX * dX + dY * dY) / dashLen + 0.5) << 0;
      dX = dX / count;
      dY = dY / count;
      var dashX = (dX * dashSolid) / dashLen;
      var dashY = (dY * dashSolid) / dashLen;
      for (var i = 0; i < count; i++) {
        context.moveTo(x1 + 0.5, y1 + 0.5);
        context.lineTo(x1 + 0.5 + dashX, y1 + 0.5 + dashY);
        x1 += dX;
        y1 += dY;
      }
      context.stroke();
    }
  };

  Plotter.createHorzDashedLine = function(
    context,
    x1,
    x2,
    y,
    dashLen,
    dashSolid
  ) {
    if (dashLen < 2) dashLen = 2;
    var dX = x2 - x1;
    var count = (dX / dashLen + 0.5) << 0;
    for (var i = 0; i < count; i++) {
      context.rect(x1, y, dashSolid, 1);
      x1 += dashLen;
    }
  };

  Plotter.createRectangles = function(context, rects) {
    context.beginPath();
    var e,
      i,
      cnt = rects.length;
    for (i = 0; i < cnt; i++) {
      e = rects[i];
      context.rect(e.x, e.y, e.w, e.h);
    }
  };

  Plotter.createPolygon = function(context, points) {
    context.beginPath();
    context.moveTo(points[0].x + 0.5, points[0].y + 0.5);
    var i,
      cnt = points.length;
    for (i = 1; i < cnt; i++)
      context.lineTo(points[i].x + 0.5, points[i].y + 0.5);
    context.closePath();
  };

  Plotter.drawString = function(context, str, rect) {
    var w = context.measureText(str).width;
    if (rect.w < w) return false;
    context.fillText(str, rect.x, rect.y);
    rect.x += w;
    rect.w -= w;
    return true;
  };

  var BackgroundPlotter = new_class(Plotter);

  BackgroundPlotter.prototype._cTruct = function(name) {
    BackgroundPlotter.__classId._cTruct.call(this, name);
    this._color = Theme.Co.Background;
  };

  BackgroundPlotter.prototype.getColor = function() {
    return this._color;
  };

  BackgroundPlotter.prototype.setColor = function(c) {
    this._color = c;
  };

  BackgroundPlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var area = mgr.getArea(this.getAreaName());
    var theme = mgr.getTheme(this.getFrameName());
    //context.fillStyle = theme.getColor(this._color);
    context.fillStyle = "transparent";
    context.fillRect(
      area.getLeft(),
      area.getTop(),
      area.getWidth(),
      area.getHeight()
    );
  };

  var _main_areaBackgroundPlotter = new_class(BackgroundPlotter);

  _main_areaBackgroundPlotter.prototype._cTruct = function(name) {
    _main_areaBackgroundPlotter.__classId._cTruct.call(this, name);
  };

  _main_areaBackgroundPlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var area = mgr.getArea(this.getAreaName());
    var timeline = mgr.getTimeline(this.getDataSourceName());
    var range = mgr.getRange(this.getAreaName());
    var theme = mgr.getTheme(this.getFrameName());
    var rect = area.getRect();
    if (!area.isChanged() && !timeline.isUpdated() && !range.isUpdated()) {
      var first = timeline.getFirstIndex();
      var last = timeline.getLastIndex() - 2;
      var start = Math.max(first, last);
      rect.X = timeline.toColumnLeft(start);
      rect.Width = area.getRight() - rect.X;
    }
    //context.fillStyle = theme.getColor(this._color);
    context.fillStyle = "transparent";
    context.fillRect(rect.X, rect.Y, rect.Width, rect.Height);
  };

  var RangeAreaBackgroundPlotter = new_class(BackgroundPlotter);

  RangeAreaBackgroundPlotter.prototype._cTruct = function(name) {
    RangeAreaBackgroundPlotter.__classId._cTruct.call(this, name);
  };

  RangeAreaBackgroundPlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var areaName = this.getAreaName();
    var area = mgr.getArea(areaName);
    var range = mgr.getRange(
      areaName.substring(0, areaName.lastIndexOf("Range"))
    );
    var isMainRange = range.getNameObject().getCompAt(2) == "main";
    if (isMainRange) {
    } else {
      if (!area.isChanged() && !range.isUpdated()) return;
    }
    var theme = mgr.getTheme(this.getFrameName());
    context.fillStyle = theme.getColor(this._color);
    context.fillRect(
      area.getLeft(),
      area.getTop(),
      area.getWidth(),
      area.getHeight()
    );
  };

  var TimelineAreaBackgroundPlotter = new_class(BackgroundPlotter);

  TimelineAreaBackgroundPlotter.prototype._cTruct = function(name) {
    TimelineAreaBackgroundPlotter.__classId._cTruct.call(this, name);
  };

  TimelineAreaBackgroundPlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var area = mgr.getArea(this.getAreaName());
    var timeline = mgr.getTimeline(this.getDataSourceName());
    if (!area.isChanged() && !timeline.isUpdated()) return;
    var theme = mgr.getTheme(this.getFrameName());
    context.fillStyle = theme.getColor(this._color);
    context.fillRect(
      area.getLeft(),
      area.getTop(),
      area.getWidth(),
      area.getHeight()
    );
  };

  var CGridPlotter = new_class(_Named_object);

  CGridPlotter.prototype._cTruct = function(name) {
    CGridPlotter.__classId._cTruct.call(this, name);
  };

  CGridPlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var area = mgr.getArea(this.getAreaName());
    var timeline = mgr.getTimeline(this.getDataSourceName());
    var range = mgr.getRange(this.getAreaName());
    var clipped = false;
    if (!area.isChanged() && !timeline.isUpdated() && !range.isUpdated()) {
      var first = timeline.getFirstIndex();
      var last = timeline.getLastIndex();
      var start = Math.max(first, last - 2);
      var left = timeline.toColumnLeft(start);
      context.save();
      context.rect(
        left,
        area.getTop(),
        area.getRight() - left,
        area.getHeight()
      );
      context.clip();
      clipped = true;
    }
    var theme = mgr.getTheme(this.getFrameName());
    context.fillStyle = theme.getColor(Theme.Co.Grid0);
    context.beginPath();
    var dashLen = 12,
      dashSolid = 3;
    if (Plotter.isChrome) {
      dashLen = 4;
      dashSolid = 1;
    }
    var gradations = range.getGradations();
    // 技术指标表格横线
    for (var n in gradations)
      Plotter.createHorzDashedLine(
        context,
        area.getLeft(),
        area.getRight(),
        range.toY(gradations[n]),
        dashLen,
        dashSolid
      );
    context.fill();
    if (clipped) context.restore();
  };

  var CandlestickPlotter = new_class(_Named_object);

  CandlestickPlotter.prototype._cTruct = function(name) {
    CandlestickPlotter.__classId._cTruct.call(this, name);
  };

  // 主图表矩形绘制
  CandlestickPlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var ds = mgr.getDataSource(this.getDataSourceName());
    if (ds.getDataCount() < 1) return;
    var area = mgr.getArea(this.getAreaName());
    var timeline = mgr.getTimeline(this.getDataSourceName());
    var range = mgr.getRange(this.getAreaName());
    if (range.getRange() == 0) return;
    var theme = mgr.getTheme(this.getFrameName());
    var dark = iITance(theme, DarkTheme);
    var first = timeline.getFirstIndex();
    var last = timeline.getLastIndex();
    var start;
    if (area.isChanged() || timeline.isUpdated() || range.isUpdated())
      start = first;
    else start = Math.max(first, last - 2);
    var cW = timeline.getColumnWidth();
    var iW = timeline.getItemWidth();
    var left = timeline.toItemLeft(start);
    var center = timeline.toItemCenter(start);
    var strokePosRects = [];
    var fillPosRects = [];
    var fillUchRects = [];
    var fillNegRects = [];
    for (var i = start; i < last; i++) {
      var data = ds.getDataAt(i);
      var high = range.toY(data.high);
      var low = range.toY(data.low);
      var open = data.open;
      var close = data.close;
      if (close > open) {
        var top = range.toY(close);
        var bottom = range.toY(open);
        var iH = Math.max(bottom - top, 1);
        if (iH > 1 && iW > 1 && dark)
          strokePosRects.push({
            x: left + 0.5,
            y: top + 0.5,
            w: iW - 1,
            h: iH - 1
          });
        else
          fillPosRects.push({
            x: left,
            y: top,
            w: Math.max(iW, 1),
            h: Math.max(iH, 1)
          });
        if (data.high > close) {
          high = Math.min(high, top - 1);
          fillPosRects.push({
            x: center,
            y: high,
            w: 1,
            h: top - high
          });
        }
        if (open > data.low) {
          low = Math.max(low, bottom + 1);
          fillPosRects.push({
            x: center,
            y: bottom,
            w: 1,
            h: low - bottom
          });
        }
      } else if (close == open) {
        var top = range.toY(close);
        fillUchRects.push({
          x: left,
          y: top,
          w: Math.max(iW, 1),
          h: 1
        });
        if (data.high > close) high = Math.min(high, top - 1);
        if (open > data.low) low = Math.max(low, top + 1);
        if (high < low)
          fillUchRects.push({
            x: center,
            y: high,
            w: 1,
            h: low - high
          });
      } else {
        var top = range.toY(open);
        var bottom = range.toY(close);
        var iH = Math.max(bottom - top, 1);
        fillNegRects.push({
          x: left,
          y: top,
          w: Math.max(iW, 1),
          h: Math.max(iH, 1)
        });
        if (data.high > open) high = Math.min(high, top - 1);
        if (close > data.low) low = Math.max(low, bottom + 1);
        if (high < low)
          fillNegRects.push({
            x: center,
            y: high,
            w: 1,
            h: low - high
          });
      }
      left += cW;
      center += cW;
    }
    // 着色（填充颜色？边框颜色？红？绿？）
    if (strokePosRects.length > 0) {
      context.strokeStyle = theme.getColor(Theme.Co.Positive);
      Plotter.createRectangles(context, strokePosRects);
      context.stroke();
    }
    if (fillPosRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Co.Positive);
      Plotter.createRectangles(context, fillPosRects);
      context.fill();
    }
    if (fillUchRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Co.Negative);
      Plotter.createRectangles(context, fillUchRects);
      context.fill();
    }
    if (fillNegRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Co.Negative);
      Plotter.createRectangles(context, fillNegRects);
      context.fill();
    }
  };

  var Candlesticklotter = new_class(Plotter);

  Candlesticklotter.prototype._cTruct = function(name) {
    Candlesticklotter.__classId._cTruct.call(this, name);
  };

  // 绘制矩形，style 控制进入的另一个，似乎长得一样。
  Candlesticklotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var ds = mgr.getDataSource(this.getDataSourceName());
    if (!iITance(ds, _main_data_source) || ds.getDataCount() < 1) return;
    var area = mgr.getArea(this.getAreaName());
    var timeline = mgr.getTimeline(this.getDataSourceName());
    var range = mgr.getRange(this.getAreaName());
    if (range.getRange() == 0) return;
    var theme = mgr.getTheme(this.getFrameName());
    var dark = iITance(theme, DarkTheme);
    var first = timeline.getFirstIndex();
    var last = timeline.getLastIndex();
    var start;
    if (area.isChanged() || timeline.isUpdated() || range.isUpdated())
      start = first;
    else start = Math.max(first, last - 2);
    var cW = timeline.getColumnWidth();
    var iW = timeline.getItemWidth();
    var left = timeline.toItemLeft(start);
    var center = timeline.toItemCenter(start);
    var strokePosRects = [];
    var fillPosRects = [];
    var fillUchRects = [];
    var fillNegRects = [];
    for (var i = start; i < last; i++) {
      var data = ds.getDataAt(i);
      var high = range.toY(data.high);
      var low = range.toY(data.low);
      var open = data.open;
      if (i > 0) open = ds.getDataAt(i - 1).close;
      var close = data.close;
      if (close > open) {
        var top = range.toY(close);
        var bottom = range.toY(open);
        var iH = Math.max(bottom - top, 1);
        if (iH > 1 && iW > 1 && dark)
          strokePosRects.push({
            x: left + 0.5,
            y: top + 0.5,
            w: iW - 1,
            h: iH - 1
          });
        else
          fillPosRects.push({
            x: left,
            y: top,
            w: Math.max(iW, 1),
            h: Math.max(iH, 1)
          });
        if (data.high > close) {
          high = Math.min(high, top - 1);
          fillPosRects.push({
            x: center,
            y: high,
            w: 1,
            h: top - high
          });
        }
        if (open > data.low) {
          low = Math.max(low, bottom + 1);
          fillPosRects.push({
            x: center,
            y: bottom,
            w: 1,
            h: low - bottom
          });
        }
      } else if (close == open) {
        var top = range.toY(close);
        fillUchRects.push({
          x: left,
          y: top,
          w: Math.max(iW, 1),
          h: 1
        });
        if (data.high > close) high = Math.min(high, top - 1);
        if (open > data.low) low = Math.max(low, top + 1);
        if (high < low)
          fillUchRects.push({
            x: center,
            y: high,
            w: 1,
            h: low - high
          });
      } else {
        var top = range.toY(open);
        var bottom = range.toY(close);
        var iH = Math.max(bottom - top, 1);
        fillNegRects.push({
          x: left,
          y: top,
          w: Math.max(iW, 1),
          h: Math.max(iH, 1)
        });
        if (data.high > open) high = Math.min(high, top - 1);
        if (close > data.low) low = Math.max(low, bottom + 1);
        if (high < low)
          fillNegRects.push({
            x: center,
            y: high,
            w: 1,
            h: low - high
          });
      }
      left += cW;
      center += cW;
    }
    if (strokePosRects.length > 0) {
      context.strokeStyle = theme.getColor(Theme.Co.Positive);
      Plotter.createRectangles(context, strokePosRects);
      context.stroke();
    }
    if (fillPosRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Co.Positive);
      Plotter.createRectangles(context, fillPosRects);
      context.fill();
    }
    if (fillUchRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Co.Negative);
      Plotter.createRectangles(context, fillUchRects);
      context.fill();
    }
    if (fillNegRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Co.Negative);
      Plotter.createRectangles(context, fillNegRects);
      context.fill();
    }
  };

  var OHLCPlotter = new_class(Plotter);

  OHLCPlotter.prototype._cTruct = function(name) {
    OHLCPlotter.__classId._cTruct.call(this, name);
  };

  // 技术指标 SAR
  OHLCPlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var ds = mgr.getDataSource(this.getDataSourceName());
    if (!iITance(ds, _main_data_source) || ds.getDataCount() < 1) return;
    var area = mgr.getArea(this.getAreaName());
    var timeline = mgr.getTimeline(this.getDataSourceName());
    var range = mgr.getRange(this.getAreaName());
    if (range.getRange() == 0) return;
    var theme = mgr.getTheme(this.getFrameName());
    var first = timeline.getFirstIndex();
    var last = timeline.getLastIndex();
    var start;
    if (area.isChanged() || timeline.isUpdated() || range.isUpdated())
      start = first;
    else start = Math.max(first, last - 2);
    var cW = timeline.getColumnWidth();
    var iW = (timeline.getItemWidth() >> 1) + 1;
    var left = timeline.toItemLeft(start) - 1;
    var center = timeline.toItemCenter(start);
    var right = center + 1;
    var fillPosRects = [];
    var fillUchRects = [];
    var fillNegRects = [];
    for (var i = start; i < last; i++) {
      var data = ds.getDataAt(i);
      var high = range.toY(data.high);
      var low = range.toY(data.low);
      var iH = Math.max(low - high, 1);
      if (data.close > data.open) {
        var top = range.toY(data.close);
        var bottom = range.toY(data.open);
        fillPosRects.push({
          x: center,
          y: high,
          w: 1,
          h: iH
        });
        fillPosRects.push({
          x: left,
          y: bottom,
          w: iW,
          h: 1
        });
        fillPosRects.push({
          x: right,
          y: top,
          w: iW,
          h: 1
        });
      } else if (data.close == data.open) {
        var y = range.toY(data.close);
        fillUchRects.push({
          x: center,
          y: high,
          w: 1,
          h: iH
        });
        fillUchRects.push({
          x: left,
          y: y,
          w: iW,
          h: 1
        });
        fillUchRects.push({
          x: right,
          y: y,
          w: iW,
          h: 1
        });
      } else {
        var top = range.toY(data.open);
        var bottom = range.toY(data.close);
        fillNegRects.push({
          x: center,
          y: high,
          w: 1,
          h: iH
        });
        fillNegRects.push({
          x: left,
          y: top,
          w: iW,
          h: 1
        });
        fillNegRects.push({
          x: right,
          y: bottom,
          w: iW,
          h: 1
        });
      }
      left += cW;
      center += cW;
      right += cW;
    }
    if (fillPosRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Co.Positive);
      Plotter.createRectangles(context, fillPosRects);
      context.fill();
    }
    if (fillUchRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Co.Negative);
      Plotter.createRectangles(context, fillUchRects);
      context.fill();
    }
    if (fillNegRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Co.Negative);
      Plotter.createRectangles(context, fillNegRects);
      context.fill();
    }
  };

  var MainInfoPlotter = new_class(Plotter);

  // MainInfoPlotter._dsAliasToString = {
  //     "01w":"周线",
  //     "03d":"3天线",
  //     "01d":"日线",
  //     "12h":"12小时",
  //     "06h":"6小时",
  //     "04h":"4小时",
  //     "02h":"2小时",
  //     "01h":"1小时",
  //     "30m":"30分钟",
  //     "15m":"15分钟",
  //     "05m":"5分钟",
  //     "03m":"3分钟",
  //     "01m":"1分钟",
  //     "1month":"月线"
  // };

  // MainInfoPlotter._dsAliasToString2 = {
  //     "01w":"1w",
  //     "03d":"3d",
  //     "01d":"1d",
  //     "12h":"12h",
  //     "06h":"6h",
  //     "04h":"4h",
  //     "02h":"2h",
  //     "01h":"1h",
  //     "30m":"30m",
  //     "15m":"15m",
  //     "05m":"5m",
  //     "03m":"3m",
  //     "01m":"1m",
  //     "1month":"1month"
  // };

  MainInfoPlotter.prototype._cTruct = function(name) {
    MainInfoPlotter.__classId._cTruct.call(this, name);
  };

  function format_time(v) {
    return v < 10 ? "0" + v.toString() : v.toString();
  }
  // 数据文字 draw
  MainInfoPlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var area = mgr.getArea(this.getAreaName());
    var timeline = mgr.getTimeline(this.getDataSourceName());
    var ds = mgr.getDataSource(this.getDataSourceName());
    var theme = mgr.getTheme(this.getFrameName());
    context.font = theme.getFont(Theme.Font.Default);
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = theme.getColor(Theme.Co.Text4);
    var rect = {
      x: area.getLeft() + 4,
      y: area.getTop() + 2,
      w: area.getWidth() - 8,
      h: 20
    };
    var selIndex = timeline.getSelectedIndex();
    if (selIndex < 0) return;
    var data = ds.getDataAt(selIndex);
    var digits = ds.getDecimalDigits();
    var time = new Date(data.date);
    var year = time.getFullYear();
    var month = format_time(time.getMonth() + 1);
    var date = format_time(time.getDate());
    var hour = format_time(time.getHours());
    var minute = format_time(time.getMinutes());
    var lang = mgr.getLanguage();

    // “开高低收” 字符串
    if (
      !Plotter.drawString(
        context,
        lan[lang].others.data +
          ": " +
          year +
          "-" +
          month +
          "-" +
          date +
          "  " +
          hour +
          ":" +
          minute,
        rect
      )
    )
      return;
    if (
      !Plotter.drawString(
        context,
        "  " + lan[lang].others.o + ": " + data.open.toFixed(digits),
        rect
      )
    )
      return;
    if (
      !Plotter.drawString(
        context,
        "  " + lan[lang].others.h + ": " + data.high.toFixed(digits),
        rect
      )
    )
      return;
    if (
      !Plotter.drawString(
        context,
        "  " + lan[lang].others.l + ": " + data.low.toFixed(digits),
        rect
      )
    )
      return;
    if (
      !Plotter.drawString(
        context,
        "  " + lan[lang].others.c + ": " + data.close.toFixed(digits),
        rect
      )
    )
      return;
    if (selIndex > 0) {
      if (!Plotter.drawString(context, lan[lang].others.cf + "  : ", rect))
        return;
      var prev = ds.getDataAt(selIndex - 1);
      var change = ((data.close - prev.close) / prev.close) * 100;
      if (change >= 0) {
        change = " " + change.toFixed(2);
        // 跌幅字颜色
        context.fillStyle = theme.getColor(Theme.Co.TextPositive);
      } else {
        change = change.toFixed(2);
        // 涨幅字颜色
        context.fillStyle = theme.getColor(Theme.Co.TextNegative);
      }
      // 涨幅数据${num}%
      if (!Plotter.drawString(context, change, rect)) return;
      context.fillStyle = theme.getColor(Theme.Co.Text4);
      if (!Plotter.drawString(context, " %", rect)) return;
    }
    var amplitude = ((data.high - data.low) / data.low) * 100;
    // 振幅数据
    if (
      !Plotter.drawString(
        context,
        lan[lang].others.af + "  : " + amplitude.toFixed(2) + " %",
        rect
      )
    )
      return;
    if (
      !Plotter.drawString(
        context,
        lan[lang].others.v + "  : " + data.volume.toFixed(2),
        rect
      )
    )
      return;

    // 数据： MA7，MA30
    var dp = mgr.getDataProvider(this.getAreaName() + ".secondary");
    if (dp == undefined) return;
    var indic = dp.get_indtor();
    var n,
      cnt = indic.getOutputCount();
    for (n = 0; n < cnt; n++) {
      var out = indic.getOutputAt(n);
      var v = out.execute(selIndex);
      if (isNaN(v)) continue;
      var info = "  " + out.getName() + ": " + v.toFixed(digits);
      var color = out.getColor();
      if (color === undefined) color = Theme.Co._indtor0 + n;
      context.fillStyle = theme.getColor(color);
      if (!Plotter.drawString(context, info, rect)) return;
    }
  };

  var _indtorPlotter = new_class(_Named_object);

  _indtorPlotter.prototype._cTruct = function(name) {
    _indtorPlotter.__classId._cTruct.call(this, name);
  };

  // 绘制心电图
  _indtorPlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var area = mgr.getArea(this.getAreaName());
    var timeline = mgr.getTimeline(this.getDataSourceName());
    var range = mgr.getRange(this.getAreaName());
    if (range.getRange() == 0) return;
    var dp = mgr.getDataProvider(this.getName());
    if (!iITance(dp, _i_data_prov)) return;
    var theme = mgr.getTheme(this.getFrameName());
    var cW = timeline.getColumnWidth();
    var first = timeline.getFirstIndex();
    var last = timeline.getLastIndex();
    var start;
    if (area.isChanged() || timeline.isUpdated() || range.isUpdated())
      start = first;
    else start = Math.max(first, last - 2);
    var indic = dp.get_indtor();
    var out,
      n,
      outCount = indic.getOutputCount();
    // 根据 style 值判断柱状皮肤
    for (n = 0; n < outCount; n++) {
      out = indic.getOutputAt(n);
      var style = out.getStyle();
      if (style == _out_put_style.VolumeStick) {
        this.drawVolumeStick(
          context,
          theme,
          mgr.getDataSource(this.getDataSourceName()),
          start,
          last,
          timeline.toItemLeft(start),
          cW,
          timeline.getItemWidth(),
          range
        );
      } else if (style == _out_put_style.MACDStick) {
        this.drawMACDStick(
          context,
          theme,
          out,
          start,
          last,
          timeline.toItemLeft(start),
          cW,
          timeline.getItemWidth(),
          range
        );
      } else if (style == _out_put_style.SARPoint) {
        this.drawSARPoint(
          context,
          theme,
          out,
          start,
          last,
          timeline.toItemCenter(start),
          cW,
          timeline.getItemWidth(),
          range
        );
      }
    }
    var left = timeline.toColumnLeft(start);
    var center = timeline.toItemCenter(start);
    context.save();
    context.rect(left, area.getTop(), area.getRight() - left, area.getHeight());
    context.clip();
    context.translate(0.5, 0.5);
    for (n = 0; n < outCount; n++) {
      var x = center;
      out = indic.getOutputAt(n);
      if (out.getStyle() == _out_put_style.Line) {
        var v,
          points = [];
        if (start > first) {
          v = out.execute(start - 1);
          if (isNaN(v) == false)
            points.push({
              x: x - cW,
              y: range.toY(v)
            });
        }
        for (var i = start; i < last; i++, x += cW) {
          v = out.execute(i);
          if (isNaN(v) == false)
            points.push({
              x: x,
              y: range.toY(v)
            });
        }
        if (points.length > 0) {
          var color = out.getColor();
          if (color == undefined) color = Theme.Co._indtor0 + n;
          context.strokeStyle = theme.getColor(color);
          Plotter.drawLines(context, points);
        }
      }
    }
    context.restore();
  };

  // Volume 矩形绘制（第二个）
  _indtorPlotter.prototype.drawVolumeStick = function(
    context,
    theme,
    ds,
    first,
    last,
    startX,
    cW,
    iW,
    range
  ) {
    var dark = iITance(theme, DarkTheme);
    var left = startX;
    var bottom = range.toY(0);
    var strokePosRects = []; // 绿色 空心 负
    var fillPosRects = []; // 绿色 填充 负
    var fillNegRects = []; // 红色 填充 正
    for (var i = first; i < last; i++) {
      var data = ds.getDataAt(i);
      var top = range.toY(data.volume);
      var iH = range.toHeight(data.volume);
      if (data.close > data.open) {
        if (iH > 1 && iW > 1 && dark) {
          strokePosRects.push({
            x: left + 0.5,
            y: top + 0.5,
            w: iW - 1,
            h: iH - 1
          });
        } else {
          fillPosRects.push({
            x: left,
            y: top,
            w: Math.max(iW, 1),
            h: Math.max(iH, 1)
          });
        }
      } else if (data.close == data.open) {
        if (i > 0 && data.close >= ds.getDataAt(i - 1).close) {
          if (iH > 1 && iW > 1 && dark) {
            strokePosRects.push({
              x: left + 0.5,
              y: top + 0.5,
              w: iW - 1,
              h: iH - 1
            });
          } else {
            fillPosRects.push({
              x: left,
              y: top,
              w: Math.max(iW, 1),
              h: Math.max(iH, 1)
            });
          }
        } else {
          fillNegRects.push({
            x: left,
            y: top,
            w: Math.max(iW, 1),
            h: Math.max(iH, 1)
          });
        }
      } else {
        fillNegRects.push({
          x: left,
          y: top,
          w: Math.max(iW, 1),
          h: Math.max(iH, 1)
        });
      }
      left += cW;
    }
    if (strokePosRects.length > 0) {
      context.strokeStyle = theme.getColor(Theme.Co.Positive);
      Plotter.createRectangles(context, strokePosRects);
      context.stroke();
    }
    if (fillPosRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Co.Positive);
      Plotter.createRectangles(context, fillPosRects);
      context.fill();
    }
    if (fillNegRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Co.Negative);
      Plotter.createRectangles(context, fillNegRects);
      context.fill();
    }
  };

  // MACD 矩形绘制
  _indtorPlotter.prototype.drawMACDStick = function(
    context,
    theme,
    output,
    first,
    last,
    startX,
    cW,
    iW,
    range
  ) {
    var left = startX;
    var middle = range.toY(0);
    var strokePosRects = [];
    var strokeNegRects = [];
    var fillPosRects = [];
    var fillNegRects = [];
    var prevMACD = first > 0 ? output.execute(first - 1) : NaN;
    for (var i = first; i < last; i++) {
      var MACD = output.execute(i);
      if (MACD >= 0) {
        var iH = range.toHeight(MACD);
        if ((i == 0 || MACD >= prevMACD) && iH > 1 && iW > 1)
          strokePosRects.push({
            x: left + 0.5,
            y: middle - iH + 0.5,
            w: iW - 1,
            h: iH - 1
          });
        else
          fillPosRects.push({
            x: left,
            y: middle - iH,
            w: Math.max(iW, 1),
            h: Math.max(iH, 1)
          });
      } else {
        var iH = range.toHeight(-MACD);
        if ((i == 0 || MACD >= prevMACD) && iH > 1 && iW > 1)
          strokeNegRects.push({
            x: left + 0.5,
            y: middle + 0.5,
            w: iW - 1,
            h: iH - 1
          });
        else
          fillNegRects.push({
            x: left,
            y: middle,
            w: Math.max(iW, 1),
            h: Math.max(iH, 1)
          });
      }
      prevMACD = MACD;
      left += cW;
    }
    if (strokePosRects.length > 0) {
      context.strokeStyle = theme.getColor(Theme.Co.Positive);
      Plotter.createRectangles(context, strokePosRects);
      context.stroke();
    }
    if (strokeNegRects.length > 0) {
      context.strokeStyle = theme.getColor(Theme.Co.Negative);
      Plotter.createRectangles(context, strokeNegRects);
      context.stroke();
    }
    if (fillPosRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Co.Positive);
      Plotter.createRectangles(context, fillPosRects);
      context.fill();
    }
    if (fillNegRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Co.Negative);
      Plotter.createRectangles(context, fillNegRects);
      context.fill();
    }
  };

  // 画圆圈，暂时没有使用。
  _indtorPlotter.prototype.drawSARPoint = function(
    context,
    theme,
    output,
    first,
    last,
    startX,
    cW,
    iW,
    range
  ) {
    var r = iW >> 1;
    if (r < 0.5) r = 0.5;
    if (r > 4) r = 4;
    var center = startX;
    var right = center + r;
    var endAngle = 2 * Math.PI;
    context.save();
    context.translate(0.5, 0.5);
    context.strokeStyle = theme.getColor(Theme.Co._indtor3);
    context.beginPath();
    for (var i = first; i < last; i++) {
      var y = range.toY(output.execute(i));
      context.moveTo(right, y);
      context.arc(center, y, r, 0, endAngle);
      center += cW;
      right += cW;
    }
    context.stroke();
    context.restore();
  };

  var _indtorInfoPlotter = new_class(Plotter);

  _indtorInfoPlotter.prototype._cTruct = function(name) {
    _indtorInfoPlotter.__classId._cTruct.call(this, name);
  };

  _indtorInfoPlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var area = mgr.getArea(this.getAreaName());
    var timeline = mgr.getTimeline(this.getDataSourceName());
    var dp = mgr.getDataProvider(this.getAreaName() + ".secondary");
    var theme = mgr.getTheme(this.getFrameName());
    // 控制定位
    context.font = theme.getFont(Theme.Font.Default);
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = theme.getColor(Theme.Co.Text4);
    var rect = {
      x: area.getLeft() + 4,
      y: area.getTop() + 2,
      w: area.getWidth() - 8,
      h: 20
    };
    var indic = dp.get_indtor();
    var title;

    // Volume 和 技术指标各个图表 title
    switch (indic.getPCount()) {
      case 0:
        title = indic.getName();
        break;

      case 1:
        title =
          indic.getName() + "(" + indic.getParameterAt(0).getValue() + ")";
        break;

      case 2:
        title =
          indic.getName() +
          "(" +
          indic.getParameterAt(0).getValue() +
          "," +
          indic.getParameterAt(1).getValue() +
          ")";
        break;

      case 3:
        title =
          indic.getName() +
          "(" +
          indic.getParameterAt(0).getValue() +
          "," +
          indic.getParameterAt(1).getValue() +
          "," +
          indic.getParameterAt(2).getValue() +
          ")";
        break;

      case 4:
        title =
          indic.getName() +
          "(" +
          indic.getParameterAt(0).getValue() +
          "," +
          indic.getParameterAt(1).getValue() +
          "," +
          indic.getParameterAt(2).getValue() +
          "," +
          indic.getParameterAt(3).getValue() +
          ")";
        break;

      default:
        return;
    }
    if (!Plotter.drawString(context, title, rect)) return;
    var selIndex = timeline.getSelectedIndex();
    if (selIndex < 0) return;
    var out, v, info, color;
    var n,
      cnt = indic.getOutputCount();

    // Volume 和 技术指标各个图表 title 旁边数据字符串
    for (n = 0; n < cnt; n++) {
      out = indic.getOutputAt(n);
      v = out.execute(selIndex);
      if (isNaN(v)) continue;
      info = "  " + out.getName() + ": " + v.toFixed(2);
      color = out.getColor();
      if (color === undefined) color = Theme.Co._indtor0 + n;
      context.fillStyle = theme.getColor(color);
      if (!Plotter.drawString(context, info, rect)) return;
    }
  };

  var MinMaxPlotter = new_class(_Named_object);

  MinMaxPlotter.prototype._cTruct = function(name) {
    MinMaxPlotter.__classId._cTruct.call(this, name);
  };

  MinMaxPlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var ds = mgr.getDataSource(this.getDataSourceName());
    if (ds.getDataCount() < 1) return;
    var timeline = mgr.getTimeline(this.getDataSourceName());
    if (timeline.getInnerWidth() < timeline.getColumnWidth()) return;
    var range = mgr.getRange(this.getAreaName());
    if (range.getRange() == 0) return;
    var dp = mgr.getDataProvider(this.getAreaName() + ".main");
    var first = timeline.getFirstIndex();
    var center = (first + timeline.getLastIndex()) >> 1;
    var theme = mgr.getTheme(this.getFrameName());
    context.font = theme.getFont(Theme.Font.Default);
    context.textBaseline = "middle";
    context.fillStyle = theme.getColor(Theme.Co.Text4);
    context.strokeStyle = theme.getColor(Theme.Co.Text4);
    var digits = ds.getDecimalDigits();
    this.drawMark(
      context,
      dp.getMinValue(),
      digits,
      range.toY(dp.getMinValue()),
      first,
      center,
      dp.getMinValueIndex(),
      timeline
    );
    this.drawMark(
      context,
      dp.getMaxValue(),
      digits,
      range.toY(dp.getMaxValue()),
      first,
      center,
      dp.getMaxValueIndex(),
      timeline
    );
  };

  // 带箭头的数据
  MinMaxPlotter.prototype.drawMark = function(
    context,
    v,
    digits,
    y,
    first,
    center,
    index,
    timeline
  ) {
    var arrowStart, arrowStop, _arrowStop;
    var textStart;
    if (index > center) {
      context.textAlign = "right";
      arrowStart = timeline.toItemCenter(index) - 4;
      arrowStop = arrowStart - 7;
      _arrowStop = arrowStart - 3;
      textStart = arrowStop - 4;
    } else {
      context.textAlign = "left";
      arrowStart = timeline.toItemCenter(index) + 4;
      arrowStop = arrowStart + 7;
      _arrowStop = arrowStart + 3;
      textStart = arrowStop + 4;
    }
    Plotter.drawLine(context, arrowStart, y, arrowStop, y);
    Plotter.drawLine(context, arrowStart, y, _arrowStop, y + 2);
    Plotter.drawLine(context, arrowStart, y, _arrowStop, y - 2);
    context.fillText(String.fromFloat(v, digits), textStart, y);
  };

  var TimelinePlotter = new_class(Plotter);

  TimelinePlotter.prototype._cTruct = function(name) {
    TimelinePlotter.__classId._cTruct.call(this, name);
  };

  TimelinePlotter.TP_MINUTE = 60 * 1e3;

  TimelinePlotter.TP_HOUR = 60 * TimelinePlotter.TP_MINUTE;

  TimelinePlotter.TP_DAY = 24 * TimelinePlotter.TP_HOUR;

  TimelinePlotter.TIME_INTERVAL = [
    5 * TimelinePlotter.TP_MINUTE,
    10 * TimelinePlotter.TP_MINUTE,
    15 * TimelinePlotter.TP_MINUTE,
    30 * TimelinePlotter.TP_MINUTE,
    TimelinePlotter.TP_HOUR,
    2 * TimelinePlotter.TP_HOUR,
    3 * TimelinePlotter.TP_HOUR,
    6 * TimelinePlotter.TP_HOUR,
    12 * TimelinePlotter.TP_HOUR,
    TimelinePlotter.TP_DAY,
    2 * TimelinePlotter.TP_DAY
  ];

  TimelinePlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var area = mgr.getArea(this.getAreaName());
    var timeline = mgr.getTimeline(this.getDataSourceName());
    if (!area.isChanged() && !timeline.isUpdated()) return;
    var ds = mgr.getDataSource(this.getDataSourceName());
    if (ds.getDataCount() < 2) return;
    var timeInterval = ds.getDataAt(1).date - ds.getDataAt(0).date;
    var n,
      cnt = TimelinePlotter.TIME_INTERVAL.length;
    for (n = 0; n < cnt; n++) {
      if (timeInterval < TimelinePlotter.TIME_INTERVAL[n]) break;
    }
    for (; n < cnt; n++) {
      if (TimelinePlotter.TIME_INTERVAL[n] % timeInterval == 0)
        if (
          (TimelinePlotter.TIME_INTERVAL[n] / timeInterval) *
            timeline.getColumnWidth() >
          60
        )
          break;
    }
    var first = timeline.getFirstIndex();
    var last = timeline.getLastIndex();
    var d = new Date();
    var local_utc_diff = d.getTimezoneOffset() * 60 * 1e3;
    var theme = mgr.getTheme(this.getFrameName());
    context.font = theme.getFont(Theme.Font.Default);
    context.textAlign = "center";
    context.textBaseline = "middle";
    var lang = mgr.getLanguage();
    var gridRects = [];
    var top = area.getTop();
    var middle = area.getMiddle();
    for (var i = first; i < last; i++) {
      var utcDate = ds.getDataAt(i).date;
      var localDate = utcDate - local_utc_diff;
      var time = new Date(utcDate);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      var hour = time.getHours();
      var minute = time.getMinutes();
      var text = "";
      if (n < cnt) {
        var m = Math.max(
          TimelinePlotter.TP_DAY,
          TimelinePlotter.TIME_INTERVAL[n]
        );
        if (localDate % m == 0) {
          text =
            lan[lang].time[month] + "  " + date.toString() + lan[lang].time.d;
          context.fillStyle = theme.getColor(Theme.Co.Text4);
        } else if (localDate % TimelinePlotter.TIME_INTERVAL[n] == 0) {
          var strMinute = minute.toString();
          if (minute < 10) strMinute = "0" + strMinute;
          text = hour.toString() + ":" + strMinute;
          context.fillStyle = theme.getColor(Theme.Co.Text2);
        }
      } else if (date == 1 && hour < timeInterval / TimelinePlotter.TP_HOUR) {
        if (month == 1) {
          text = year.toString() + lan[lang].time.y;
        } else {
          text = lan[lang].time[month];
        }
        context.fillStyle = theme.getColor(Theme.Co.Text4);
      }
      if (text.length > 0) {
        var x = timeline.toItemCenter(i);
        gridRects.push({
          x: x,
          y: top,
          w: 1,
          h: 4
        });
        context.fillText(text, x, middle);
      }
    }
    if (gridRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Co.Grid1);
      Plotter.createRectangles(context, gridRects);
      context.fill();
    }
  };

  var RangePlotter = new_class(_Named_object);

  RangePlotter.prototype._cTruct = function(name) {
    RangePlotter.__classId._cTruct.call(this, name);
  };

  RangePlotter.prototype.getRequiredWidth = function(context, v) {
    var mgr = _chart_man.getInstance();
    var theme = mgr.getTheme(this.getFrameName());
    context.font = theme.getFont(Theme.Font.Default);
    return context.measureText((Math.floor(v) + 0.88).toString()).width + 16;
  };

  // 右侧标注
  RangePlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var areaName = this.getAreaName();
    var area = mgr.getArea(areaName);
    var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
    var range = mgr.getRange(rangeName);
    if (range.getRange() == 0) return;
    var isMainRange = range.getNameObject().getCompAt(2) == "main";
    if (isMainRange) {
    } else {
      if (!area.isChanged() && !range.isUpdated()) return;
    }
    var gradations = range.getGradations();
    if (gradations.length == 0) return;
    var left = area.getLeft();
    var right = area.getRight();
    var center = area.getCenter();
    var theme = mgr.getTheme(this.getFrameName());
    context.font = theme.getFont(Theme.Font.Default);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = theme.getColor(Theme.Co.Text2);
    var gridRects = [];
    for (var n in gradations) {
      var y = range.toY(gradations[n]);
      gridRects.push({
        x: left,
        y: y,
        w: 6,
        h: 1
      });
      gridRects.push({
        x: right - 6,
        y: y,
        w: 6,
        h: 1
      });
      context.fillText(String.fromFloat(gradations[n], 2), center, y);
    }
    if (gridRects.length > 0) {
      context.fillStyle = theme.getColor(Theme.Co.Grid1);
      Plotter.createRectangles(context, gridRects);
      context.fill();
    }
  };

  /**
   * Created by Administrator on 2014/10/11.
   */

  // 深度图
  var COrderGraphPlotter = new_class(_Named_object);

  COrderGraphPlotter.prototype._cTruct = function(name) {
    COrderGraphPlotter.__classId._cTruct.call(this, name);
  };

  COrderGraphPlotter.prototype.Draw = function(context) {
    return this._Draw_(context);
  };

  COrderGraphPlotter.prototype._Draw_ = function(context) {
    if (this.Update() == false) return;
    if (this.updateData() == false) return;

    // 深度图位置数据
    this.m_top = this.m_pArea.getTop();
    this.m_bottom = this.m_pArea.getBottom();
    // 左边框距离屏幕左侧距离
    this.m_left = this.m_pArea.getLeft();
    // 右边框距离屏幕左侧距离
    this.m_right = this.m_pArea.getRight();

    context.save();
    context.rect(
      this.m_left,
      this.m_top,
      this.m_right - this.m_left,
      this.m_bottom - this.m_top
    );
    context.clip();
    var all = _chart_man.getInstance().getChart()._depthData;
    this.x_offset = 0;
    this.y_offset = 0;
    var ask_tmp = {};
    var bid_tmp = {};

    ask_tmp.x = this.m_left + all.array[this.m_ask_si].amounts * this.m_Step;
    ask_tmp.y = this.m_pRange.toY(all.array[this.m_ask_si].rate);
    bid_tmp.x = this.m_left + all.array[this.m_bid_si].amounts * this.m_Step;
    bid_tmp.y = this.m_pRange.toY(all.array[this.m_bid_si].rate);

    if (Math.abs(ask_tmp.y - bid_tmp.y) < 1) {
      this.y_offset = 1;
    }
    this.x_offset = 1;
    this.DrawBackground(context);
    this.UpdatePoints();
    this.FillBlack(context);
    this.DrawGradations(context);
    this.DrawLine(context);
    context.restore();
  };

  // 深度图渐变着色
  COrderGraphPlotter.prototype.DrawBackground = function(context) {
    context.fillStyle = this.m_pTheme.getColor(Theme.Co.Background);
    context.fillRect(
      this.m_left,
      this.m_top,
      this.m_right - this.m_left,
      this.m_bottom - this.m_top
    );
    var all = _chart_man.getInstance().getChart()._depthData;
    if (this.m_mode == 0) {
      var ask_bottom =
        this.m_pRange.toY(all.array[this.m_ask_si].rate) - this.y_offset;
      var bid_top =
        this.m_pRange.toY(all.array[this.m_bid_si].rate) + this.y_offset;
      var ask_gradient = context.createLinearGradient(
        this.m_left,
        0,
        this.m_right,
        0
      );
      ask_gradient.addColorStop(0, this.m_pTheme.getColor(Theme.Co.Background));
      ask_gradient.addColorStop(
        1,
        this.m_pTheme.getColor(Theme.Co.PositiveDark)
      );
      context.fillStyle = ask_gradient;
      context.fillRect(
        this.m_left,
        this.m_top,
        this.m_right - this.m_left,
        ask_bottom - this.m_top
      );
      var bid_gradient = context.createLinearGradient(
        this.m_left,
        0,
        this.m_right,
        0
      );
      bid_gradient.addColorStop(0, this.m_pTheme.getColor(Theme.Co.Background));
      bid_gradient.addColorStop(
        1,
        this.m_pTheme.getColor(Theme.Co.NegativeDark)
      );
      context.fillStyle = bid_gradient;
      context.fillRect(
        this.m_left,
        bid_top,
        this.m_right - this.m_left,
        this.m_bottom - bid_top
      );
    } else if (this.m_mode == 1) {
      var ask_gradient = context.createLinearGradient(
        this.m_left,
        0,
        this.m_right,
        0
      );
      ask_gradient.addColorStop(0, this.m_pTheme.getColor(Theme.Co.Background));
      ask_gradient.addColorStop(
        1,
        this.m_pTheme.getColor(Theme.Co.PositiveDark)
      );
      context.fillStyle = ask_gradient;
      context.fillRect(
        this.m_left,
        this.m_top,
        this.m_right - this.m_left,
        this.m_bottom - this.m_top
      );
    } else if (this.m_mode == 2) {
      var bid_gradient = context.createLinearGradient(
        this.m_left,
        0,
        this.m_right,
        0
      );
      bid_gradient.addColorStop(0, this.m_pTheme.getColor(Theme.Co.Background));
      bid_gradient.addColorStop(
        1,
        this.m_pTheme.getColor(Theme.Co.NegativeDark)
      );
      context.fillStyle = bid_gradient;
      context.fillRect(
        this.m_left,
        this.m_top,
        this.m_right - this.m_left,
        this.m_bottom - this.m_top
      );
    }
  };

  // 深度图画线
  COrderGraphPlotter.prototype.DrawLine = function(context) {
    if (this.m_mode == 0 || this.m_mode == 1) {
      context.strokeStyle = this.m_pTheme.getColor(Theme.Co.Positive);
      context.beginPath();
      context.moveTo(
        Math.floor(this.m_ask_points[0].x) + 0.5,
        Math.floor(this.m_ask_points[0].y) + 0.5
      );
      for (var i = 1; i < this.m_ask_points.length; i++) {
        context.lineTo(
          Math.floor(this.m_ask_points[i].x) + 0.5,
          Math.floor(this.m_ask_points[i].y) + 0.5
        );
      }
      context.stroke();
    }
    if (this.m_mode == 0 || this.m_mode == 2) {
      context.strokeStyle = this.m_pTheme.getColor(Theme.Co.Negative);
      context.beginPath();
      context.moveTo(
        this.m_bid_points[0].x + 0.5,
        this.m_bid_points[0].y + 0.5
      );
      for (var i = 1; i < this.m_bid_points.length; i++) {
        context.lineTo(
          this.m_bid_points[i].x + 0.5,
          this.m_bid_points[i].y + 0.5
        );
      }
      context.stroke();
    }
  };

  COrderGraphPlotter.prototype.UpdatePoints = function() {
    var all = _chart_man.getInstance().getChart()._depthData;
    this.m_ask_points = [];
    var index_ask = {};
    index_ask.x = Math.floor(this.m_left);
    index_ask.y = Math.floor(
      this.m_pRange.toY(all.array[this.m_ask_si].rate) - this.y_offset
    );
    this.m_ask_points.push(index_ask);
    var ask_p_i = 0;
    for (var i = this.m_ask_si; i >= this.m_ask_ei; i--) {
      var index0 = {};
      var index1 = {};
      if (i == this.m_ask_si) {
        index0.x = Math.floor(
          this.m_left + all.array[i].amounts * this.m_Step + this.x_offset
        );
        index0.y = Math.floor(
          this.m_pRange.toY(all.array[i].rate) - this.y_offset
        );
        this.m_ask_points.push(index0);
        ask_p_i = 1;
      } else {
        index0.x = Math.floor(
          this.m_left + all.array[i].amounts * this.m_Step + this.x_offset
        );
        index0.y = Math.floor(this.m_ask_points[ask_p_i].y);
        index1.x = Math.floor(index0.x);
        index1.y = Math.floor(
          this.m_pRange.toY(all.array[i].rate) - this.y_offset
        );
        this.m_ask_points.push(index0);
        ask_p_i++;
        this.m_ask_points.push(index1);
        ask_p_i++;
      }
    }
    this.m_bid_points = [];
    var index_bid = {};
    index_bid.x = Math.floor(this.m_left);
    index_bid.y = Math.ceil(
      this.m_pRange.toY(all.array[this.m_bid_si].rate) + this.y_offset
    );
    this.m_bid_points.push(index_bid);
    var bid_p_i = 0;
    for (var i = this.m_bid_si; i <= this.m_bid_ei; i++) {
      var index0 = {};
      var index1 = {};
      if (i == this.m_bid_si) {
        index0.x = Math.floor(
          this.m_left + all.array[i].amounts * this.m_Step + this.x_offset
        );
        index0.y = Math.ceil(
          this.m_pRange.toY(all.array[i].rate) + this.y_offset
        );
        this.m_bid_points.push(index0);
        bid_p_i = 1;
      } else {
        index0.x = Math.floor(
          this.m_left + all.array[i].amounts * this.m_Step + this.x_offset
        );
        index0.y = Math.ceil(this.m_bid_points[bid_p_i].y);
        index1.x = Math.floor(index0.x);
        index1.y = Math.ceil(
          this.m_pRange.toY(all.array[i].rate) + this.x_offset
        );
        this.m_bid_points.push(index0);
        bid_p_i++;
        this.m_bid_points.push(index1);
        bid_p_i++;
      }
    }
  };

  COrderGraphPlotter.prototype.updateData = function() {
    var all = _chart_man.getInstance().getChart()._depthData;
    if (all.array == null) return false;
    if (all.array.length <= 100) return false;
    var minRange = this.m_pRange.getOuterMinValue();
    var maxRange = this.m_pRange.getOuterMaxValue();
    this.m_ask_si = all.asks_si;
    this.m_ask_ei = all.asks_si;
    for (var i = all.asks_si; i >= all.asks_ei; i--) {
      if (all.array[i].rate < maxRange) this.m_ask_ei = i;
      else break;
    }
    this.m_bid_si = all.bids_si;
    this.m_bid_ei = all.bids_si;
    for (var i = all.bids_si; i <= all.bids_ei; i++) {
      if (all.array[i].rate > minRange) this.m_bid_ei = i;
      else break;
    }
    if (this.m_ask_ei == this.m_ask_si) this.m_mode = 2;
    else if (this.m_bid_ei == this.m_bid_si) this.m_mode = 1;
    else this.m_mode = 0;
    this.m_Step = this.m_pArea.getWidth();
    if (this.m_mode == 0) {
      /*
             * View: B     --------    T
             * Data: Lo      -----     Hi
             */
      if (this.m_ask_ei == all.asks_ei && this.m_bid_ei == all.bids_ei) {
        this.m_Step /= Math.min(
          all.array[this.m_ask_ei].amounts,
          all.array[this.m_bid_ei].amounts
        );
      } else if (this.m_ask_ei != all.asks_ei && this.m_bid_ei == all.bids_ei) {
        this.m_Step /= all.array[this.m_bid_ei].amounts;
      } else if (this.m_ask_ei == all.asks_ei && this.m_bid_ei != all.bids_ei) {
        this.m_Step /= all.array[this.m_ask_ei].amounts;
      } else if (this.m_ask_ei != all.asks_ei && this.m_bid_ei != all.bids_ei) {
        this.m_Step /= Math.max(
          all.array[this.m_ask_ei].amounts,
          all.array[this.m_bid_ei].amounts
        );
      }
    } else if (this.m_mode == 1) {
      this.m_Step /= all.array[this.m_ask_ei].amounts;
    } else if (this.m_mode == 2) {
      this.m_Step /= all.array[this.m_bid_ei].amounts;
    }
    return true;
  };

  COrderGraphPlotter.prototype.Update = function() {
    this.m_pMgr = _chart_man.getInstance();
    var areaName = this.getAreaName();
    this.m_pArea = this.m_pMgr.getArea(areaName);
    if (this.m_pArea == null) return false;
    var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
    this.m_pRange = this.m_pMgr.getRange(rangeName);
    if (this.m_pRange == null || this.m_pRange.getRange() == 0) return false;
    this.m_pTheme = this.m_pMgr.getTheme(this.getFrameName());
    if (this.m_pTheme == null) return false;
    return true;
  };

  COrderGraphPlotter.prototype.DrawGradations = function(context) {
    var mgr = _chart_man.getInstance();
    var areaName = this.getAreaName();
    var area = mgr.getArea(areaName);
    var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
    var range = mgr.getRange(rangeName);
    if (range.getRange() == 0) return;
    var gradations = range.getGradations();
    if (gradations.length == 0) return;
    var left = area.getLeft();
    var right = area.getRight();
    var gridRects = [];
    for (var n in gradations) {
      var y = range.toY(gradations[n]);
      gridRects.push({
        x: left,
        y: y,
        w: 6,
        h: 1
      });
      gridRects.push({
        x: right - 6,
        y: y,
        w: 6,
        h: 1
      });
    }
    if (gridRects.length > 0) {
      var theme = mgr.getTheme(this.getFrameName());
      context.fillStyle = theme.getColor(Theme.Co.Grid1);
      Plotter.createRectangles(context, gridRects);
      context.fill();
    }
  };

  COrderGraphPlotter.prototype.FillBlack = function(context) {
    var ask_point = this.m_ask_points;
    var bid_point = this.m_bid_points;
    var ask_first_add = {};
    var ask_last_add = {};
    ask_first_add.x = this.m_right;
    ask_first_add.y = ask_point[0].y;
    ask_last_add.x = this.m_right;
    ask_last_add.y = ask_point[ask_point.length - 1].y;
    var bid_first_add = {};
    var bid_last_add = {};
    bid_first_add.x = this.m_right;
    bid_first_add.y = bid_point[0].y - 1;
    bid_last_add.x = this.m_right;
    bid_last_add.y = bid_point[bid_point.length - 1].y;
    ask_point.unshift(ask_first_add);
    ask_point.push(ask_last_add);
    bid_point.unshift(bid_first_add);
    bid_point.push(bid_last_add);
    context.fillStyle = this.m_pTheme.getColor(Theme.Co.Background);
    context.beginPath();
    context.moveTo(
      Math.floor(ask_point[0].x) + 0.5,
      Math.floor(ask_point[0].y) + 0.5
    );
    for (var i = 1; i < ask_point.length; i++) {
      context.lineTo(
        Math.floor(ask_point[i].x) + 0.5,
        Math.floor(ask_point[i].y) + 0.5
      );
    }
    context.fill();
    context.beginPath();
    context.moveTo(
      Math.floor(bid_point[0].x) + 0.5,
      Math.floor(bid_point[0].y) + 0.5
    );
    for (var i = 1; i < bid_point.length; i++) {
      context.lineTo(
        Math.floor(bid_point[i].x) + 0.5,
        Math.floor(bid_point[i].y) + 0.5
      );
    }
    context.fill();
    ask_point.shift();
    ask_point.pop();
    bid_point.shift();
    bid_point.pop();
  };

  COrderGraphPlotter.prototype.DrawTickerGraph = function(context) {
    return;
    var mgr = _chart_man.getInstance();
    var ds = mgr.getDataSource(this.getDataSourceName());
    var ticker = ds._dataItems[ds._dataItems.length - 1].close;
    var p1x = this.m_left + 1;
    var p1y = this.m_pRange.toY(ticker);
    var p2x = p1x + 5;
    var p2y = p1y + 2.5;
    var p3x = p1x + 5;
    var p3y = p1y - 2.5;
    context.fillStyle = this.m_pTheme.getColor(Theme.Co.Mark);
    context.strokeStyle = this.m_pTheme.getColor(Theme.Co.Mark);
  };

  var LastVolumePlotter = new_class(Plotter);

  LastVolumePlotter.prototype._cTruct = function(name) {
    LastVolumePlotter.__classId._cTruct.call(this, name);
  };

  LastVolumePlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var timeline = mgr.getTimeline(this.getDataSourceName());
    var areaName = this.getAreaName();
    var area = mgr.getArea(areaName);
    var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
    var range = mgr.getRange(rangeName);
    if (range.getRange() == 0) return;
    var ds = mgr.getDataSource(this.getDataSourceName());
    if (ds.getDataCount() < 1) return;
    var theme = mgr.getTheme(this.getFrameName());
    context.font = theme.getFont(Theme.Font.Default);
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillStyle = theme.getColor(Theme.Co.RangeMark);
    context.strokeStyle = theme.getColor(Theme.Co.RangeMark);
    var v = ds.getDataAt(ds.getDataCount() - 1).volume;
    var y = range.toY(v);
    var left = area.getLeft() + 1;
    Plotter.drawLine(context, left, y, left + 7, y);
    Plotter.drawLine(context, left, y, left + 3, y + 2);
    Plotter.drawLine(context, left, y, left + 3, y - 2);
    context.fillText(String.fromFloat(v, 2), left + 10, y);
  };

  /**
   * Created by Administrator on 2014/11/28.
   */
  var LastClosePlotter = new_class(Plotter);

  LastClosePlotter.prototype._cTruct = function(name) {
    LastClosePlotter.__classId._cTruct.call(this, name);
  };

  LastClosePlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var timeline = mgr.getTimeline(this.getDataSourceName());
    var areaName = this.getAreaName();
    var area = mgr.getArea(areaName);
    var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
    var range = mgr.getRange(rangeName);
    if (range.getRange() == 0) return;
    var ds = mgr.getDataSource(this.getDataSourceName());
    if (ds.getDataCount() < 1) return;
    var v = ds._dataItems[ds._dataItems.length - 1].close;
    if (v <= range.getMinValue() || v >= range.getMaxValue()) return;
    var theme = mgr.getTheme(this.getFrameName());
    context.font = theme.getFont(Theme.Font.Default);
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillStyle = theme.getColor(Theme.Co.RangeMark);
    context.strokeStyle = theme.getColor(Theme.Co.RangeMark);
    var y = range.toY(v);
    var left = area.getLeft() + 1;
    Plotter.drawLine(context, left, y, left + 7, y);
    Plotter.drawLine(context, left, y, left + 3, y + 2);
    Plotter.drawLine(context, left, y, left + 3, y - 2);
    context.fillText(String.fromFloat(v, ds.getDecimalDigits()), left + 10, y);
  };

  var SelectionPlotter = new_class(Plotter);

  SelectionPlotter.prototype._cTruct = function(name) {
    SelectionPlotter.__classId._cTruct.call(this, name);
  };

  SelectionPlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    if (mgr._drawingTool != _chart_man.DrawingTool.CrossCursor) return;
    var area = mgr.getArea(this.getAreaName());
    var timeline = mgr.getTimeline(this.getDataSourceName());
    if (timeline.getSelectedIndex() < 0) {
      return;
    }
    var range = mgr.getRange(this.getAreaName());
    var theme = mgr.getTheme(this.getFrameName());
    context.strokeStyle = theme.getColor(Theme.Co.Cursor);
    var x = timeline.toItemCenter(timeline.getSelectedIndex());
    Plotter.drawLine(context, x, area.getTop() - 1, x, area.getBottom());
    var pos = range.getSelectedPosition();
    if (pos >= 0)
      Plotter.drawLine(context, area.getLeft(), pos, area.getRight(), pos);
  };

  var TimelineSelectionPlotter = new_class(_Named_object);

  TimelineSelectionPlotter.MonthConvert = {
    1: "Jan.",
    2: "Feb.",
    3: "Mar.",
    4: "Apr.",
    5: "May.",
    6: "Jun.",
    7: "Jul.",
    8: "Aug.",
    9: "Sep.",
    10: "Oct.",
    11: "Nov.",
    12: "Dec."
  };

  TimelineSelectionPlotter.prototype._cTruct = function(name) {
    TimelineSelectionPlotter.__classId._cTruct.call(this, name);
  };

  TimelineSelectionPlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var area = mgr.getArea(this.getAreaName());
    var timeline = mgr.getTimeline(this.getDataSourceName());
    if (timeline.getSelectedIndex() < 0) return;
    var ds = mgr.getDataSource(this.getDataSourceName());
    if (!iITance(ds, _main_data_source)) return;
    var theme = mgr.getTheme(this.getFrameName());
    var lang = mgr.getLanguage();
    var x = timeline.toItemCenter(timeline.getSelectedIndex());
    context.fillStyle = theme.getColor(Theme.Co.Background);
    context.fillRect(x - 52.5, area.getTop() + 2.5, 106, 18);
    context.strokeStyle = theme.getColor(Theme.Co.Grid3);
    context.strokeRect(x - 52.5, area.getTop() + 2.5, 106, 18);
    context.font = theme.getFont(Theme.Font.Default);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = theme.getColor(Theme.Co.Text4);
    var time = new Date(ds.getDataAt(timeline.getSelectedIndex()).date);
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var strMonth = month.toString();
    var strDate = date.toString();
    var strHour = hour.toString();
    var strMinute = minute.toString();
    if (minute < 10) strMinute = "0" + strMinute;
    var text = "";
    text =
      lan[lang].time[strMonth] +
      strDate +
      lan[lang].time.d +
      "  " +
      strHour +
      ":" +
      strMinute;
    context.fillText(text, x, area.getMiddle());
  };

  var RangeSelectionPlotter = new_class(_Named_object);

  RangeSelectionPlotter.prototype._cTruct = function(name) {
    RangeSelectionPlotter.__classId._cTruct.call(this, name);
  };

  RangeSelectionPlotter.prototype.Draw = function(context) {
    var mgr = _chart_man.getInstance();
    var areaName = this.getAreaName();
    var area = mgr.getArea(areaName);
    var timeline = mgr.getTimeline(this.getDataSourceName());
    if (timeline.getSelectedIndex() < 0) return;
    var rangeName = areaName.substring(0, areaName.lastIndexOf("Range"));
    var range = mgr.getRange(rangeName);
    if (range.getRange() == 0 || range.getSelectedPosition() < 0) return;
    var v = range.getSelectedValue();
    if (v == -Number.MAX_VALUE) return;
    var y = range.getSelectedPosition();
    Plotter.createPolygon(context, [
      {
        x: area.getLeft(),
        y: y
      },
      {
        x: area.getLeft() + 5,
        y: y + 10
      },
      {
        x: area.getRight() - 3,
        y: y + 10
      },
      {
        x: area.getRight() - 3,
        y: y - 10
      },
      {
        x: area.getLeft() + 5,
        y: y - 10
      }
    ]);
    var theme = mgr.getTheme(this.getFrameName());
    context.fillStyle = theme.getColor(Theme.Co.Background);
    context.fill();
    context.strokeStyle = theme.getColor(Theme.Co.Grid4);
    context.stroke();
    context.font = theme.getFont(Theme.Font.Default);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = theme.getColor(Theme.Co.Text3);
    var digits = 2;
    if (range.getNameObject().getCompAt(2) == "main")
      digits = mgr.getDataSource(this.getDataSourceName()).getDecimalDigits();
    context.fillText(String.fromFloat(v, digits), area.getCenter(), y);
  };

  var ChartSettings = {};

  ChartSettings.checkVersion = function() {
    var currentVersion = 1;
    currentVersion = 2;
    if (ChartSettings._data.ver < currentVersion) {
      ChartSettings._data.ver = 2;
      var charts = ChartSettings._data.charts;
      charts.period_weight = {};
      charts.period_weight["line"] = 8;
      charts.period_weight["0"] = 7;
      charts.period_weight["1"] = 6;
      charts.period_weight["2"] = 5;
      charts.period_weight["9"] = 4;
      charts.period_weight["10"] = 3;
      charts.period_weight["3"] = 2;
      charts.period_weight["4"] = 1;
      charts.period_weight["7"] = 0;
      charts.period_weight["11"] = 0;
      charts.period_weight["12"] = 0;
      charts.period_weight["13"] = 0;
      charts.period_weight["14"] = 0;
      charts.period_weight["15"] = 0;
    }
    currentVersion = 3;
    if (ChartSettings._data.ver < currentVersion) {
      ChartSettings._data.ver = 3;
      var charts = ChartSettings._data.charts;
      charts.areaHeight = [];
    }
  };

  ChartSettings.get = function() {
    if (ChartSettings._data == undefined) {
      ChartSettings.init();
      ChartSettings.load();
      ChartSettings.checkVersion();
    }
    return ChartSettings._data;
  };

  ChartSettings.init = function() {
    var _indic_param = {};
    var _name = new Array(
      "MA",
      "EMA",
      "VOLUME",
      "MACD",
      "KDJ",
      "StochRSI",
      "RSI",
      "DMI",
      "OBV",
      "BOLL",
      "DMA",
      "TRIX",
      "BRAR",
      "VR",
      "EMV",
      "WR",
      "ROC",
      "MTM",
      "PSY"
    );
    for (var i = 0; i < _name.length; i++) {
      var _value = _chart_man
        .getInstance()
        .create_indtorAndRange("", _name[i], true);
      if (_value == null) continue;
      _indic_param[_name[i]] = [];
      var param = _value.indic.getParameters();
      for (var j = 0; j < param.length; j++) {
        _indic_param[_name[i]].push(param[j]);
      }
    }
    var _chart_style = "CandleStick";
    var _m_indic = "MA";
    var _indic = new Array("VOLUME", "MACD");
    var _time = def.defTime;
    var _frame = {};
    _frame.chartStyle = _chart_style;
    _frame.mIndic = _m_indic;
    _frame.indics = _indic;
    _frame.indicsStatus = "close";
    _frame.period = _time;
    ChartSettings._data = {
      ver: 1,
      charts: _frame,
      indics: _indic_param,
      theme: "Dark"
    };
    ChartSettings.checkVersion();
  };

  ChartSettings.load = function() {
    if (document.cookie.length <= 0) return;
    var start = document.cookie.indexOf("chartSettings=");
    if (start == -1) return;
    start += "chartSettings=".length;
    var end = document.cookie.indexOf(";", start);
    if (end == -1) end = document.cookie.length;
    var json = unescape(document.cookie.substring(start, end));
    ChartSettings._data = JSON.parse(json);
  };

  ChartSettings.save = function() {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + 365);
    document.cookie =
      "chartSettings=" +
      escape(JSON.stringify(ChartSettings._data)) +
      ";expires=" +
      exdate.toGMTString();
  };

  var CPoint = new_class(_Named_object);

  CPoint.state = {
    Hide: 0,
    Show: 1,
    Highlight: 2
  };

  CPoint.prototype._cTruct = function(name) {
    CPoint.__classId._cTruct.call(this, name);
    this.pos = {
      index: -1,
      value: -1
    };
    this.state = CPoint.state.Hide;
  };

  CPoint.prototype.getChartObjects = function() {
    var ppMgr = _chart_man.getInstance();
    var ppCDS = ppMgr.getDataSource("frame0.k0");
    if (ppCDS == null || !iITance(ppCDS, _main_data_source)) return null;
    var ppTimeline = ppMgr.getTimeline("frame0.k0");
    if (ppTimeline == null) return null;
    var ppRange = ppMgr.getRange("frame0.k0.main");
    if (ppRange == null) return null;
    return {
      pMgr: ppMgr,
      pCDS: ppCDS,
      pTimeline: ppTimeline,
      pRange: ppRange
    };
  };

  CPoint.prototype.setPosXY = function(x, y) {
    var pObj = this.getChartObjects();
    var i = pObj.pTimeline.toIndex(x);
    var v = pObj.pRange.toValue(y);
    var result = this.snapValue(i, v);
    if (result != null) v = result;
    this.setPosIV(i, v);
  };

  CPoint.prototype.setPosXYNoSnap = function(x, y) {
    var pObj = this.getChartObjects();
    var i = pObj.pTimeline.toIndex(x);
    var v = pObj.pRange.toValue(y);
    this.setPosIV(i, v);
  };

  CPoint.prototype.setPosIV = function(i, v) {
    this.pos = {
      index: i,
      value: v
    };
  };

  CPoint.prototype.getPosXY = function() {
    var pObj = this.getChartObjects();
    var _x = pObj.pTimeline.toItemCenter(this.pos.index);
    var _y = pObj.pRange.toY(this.pos.value);
    return {
      x: _x,
      y: _y
    };
  };

  CPoint.prototype.getPosIV = function() {
    return {
      i: this.pos.index,
      v: this.pos.value
    };
  };

  CPoint.prototype.setState = function(s) {
    this.state = s;
  };

  CPoint.prototype.getState = function() {
    return this.state;
  };

  CPoint.prototype.isSelected = function(x, y) {
    var xy = this.getPosXY();
    if (x < xy.x - 4 || x > xy.x + 4 || y < xy.y - 4 || y > xy.y + 4)
      return false;
    this.setState(CPoint.state.Highlight);
    return true;
  };

  CPoint.prototype.snapValue = function(i, v) {
    var pObj = this.getChartObjects();
    var result = null;
    var first = Math.floor(pObj.pTimeline.getFirstIndex());
    var last = Math.floor(pObj.pTimeline.getLastIndex());
    if (i < first || i > last) return result;
    var y = pObj.pRange.toY(v);
    var pData = pObj.pCDS.getDataAt(i);
    if (pData == null || pData == undefined) return result;
    var pDataPre = null;
    if (i > 0) pDataPre = pObj.pCDS.getDataAt(i - 1);
    else pDataPre = pObj.pCDS.getDataAt(i);
    var candleStickStyle = pObj.pMgr.getChartStyle(pObj.pCDS.getFrameName());
    var open = pObj.pRange.toY(pData.open);
    var high = pObj.pRange.toY(pData.high);
    var low = pObj.pRange.toY(pData.low);
    var close = pObj.pRange.toY(pData.close);
    if (candleStickStyle === "CandleStickHLC") {
      open = pObj.pRange.toY(pDataPre.close);
    }
    var dif_open = Math.abs(open - y);
    var dif_high = Math.abs(high - y);
    var dif_low = Math.abs(low - y);
    var dif_close = Math.abs(close - y);
    if (dif_open <= dif_high && dif_open <= dif_low && dif_open <= dif_close) {
      if (dif_open < 6) result = pData.open;
    }
    if (dif_high <= dif_open && dif_high <= dif_low && dif_high <= dif_close) {
      if (dif_high < 6) result = pData.high;
    }
    if (dif_low <= dif_open && dif_low <= dif_high && dif_low <= dif_close) {
      if (dif_low < 6) result = pData.low;
    }
    if (
      dif_close <= dif_open &&
      dif_close <= dif_high &&
      dif_close <= dif_low
    ) {
      if (dif_close < 6) result = pData.close;
    }
    return result;
  };

  var CToolObject = new_class(_Named_object);

  CToolObject.state = {
    BeforeDraw: 0,
    Draw: 1,
    AfterDraw: 2
  };

  CToolObject.prototype._cTruct = function(name) {
    CToolObject.__classId._cTruct.call(this, name);
    this.drawer = null;
    this.state = CToolObject.state.BeforeDraw;
    this.points = [];
    this.step = 0;
  };

  CToolObject.prototype.getChartObjects = function() {
    var ppMgr = _chart_man.getInstance();
    var ppCDS = ppMgr.getDataSource("frame0.k0");
    if (ppCDS == null || !iITance(ppCDS, _main_data_source)) return null;
    var ppTimeline = ppMgr.getTimeline("frame0.k0");
    if (ppTimeline == null) return null;
    var ppArea = ppMgr.getArea("frame0.k0.main");
    if (ppArea == null) return null;
    var ppRange = ppMgr.getRange("frame0.k0.main");
    if (ppRange == null) return null;
    return {
      pMgr: ppMgr,
      pCDS: ppCDS,
      pTimeline: ppTimeline,
      pArea: ppArea,
      pRange: ppRange
    };
  };

  CToolObject.prototype.isValidMouseXY = function(x, y) {
    var pObj = this.getChartObjects();
    var areaPos = {
      left: pObj.pArea.getLeft(),
      top: pObj.pArea.getTop(),
      right: pObj.pArea.getRight(),
      bottom: pObj.pArea.getBottom()
    };
    if (
      x < areaPos.left ||
      x > areaPos.right ||
      y < areaPos.top ||
      y > areaPos.bottom
    )
      return false;
    return true;
  };

  CToolObject.prototype.getPlotter = function() {
    return this.drawer;
  };

  CToolObject.prototype.setState = function(s) {
    this.state = s;
  };

  CToolObject.prototype.getState = function() {
    return this.state;
  };

  CToolObject.prototype.addPoint = function(point) {
    this.points.push(point);
  };

  CToolObject.prototype.getPoint = function(i) {
    return this.points[i];
  };

  CToolObject.prototype.acceptMouseMoveEvent = function(x, y) {
    if (this.isValidMouseXY(x, y) == false) return false;
    if (this.state == CToolObject.state.BeforeDraw) {
      this.setBeforeDrawPos(x, y);
    } else if (this.state == CToolObject.state.Draw) {
      this.setDrawPos(x, y);
    } else if (this.state == CToolObject.state.AfterDraw) {
      this.setAfterDrawPos(x, y);
    }
    return true;
  };

  CToolObject.prototype.acceptMouseDownEvent = function(x, y) {
    if (this.isValidMouseXY(x, y) == false) return false;
    if (this.state == CToolObject.state.BeforeDraw) {
      this.setDrawPos(x, y);
      this.setState(CToolObject.state.Draw);
    } else if (this.state == CToolObject.state.Draw) {
      this.setAfterDrawPos(x, y);
      if (this.step == 0) this.setState(CToolObject.state.AfterDraw);
    } else if (this.state == CToolObject.state.AfterDraw) {
      if (CToolObject.prototype.isSelected.call(this, x, y)) {
        this.setDrawPos(x, y);
        this.setState(CToolObject.state.Draw);
      } else {
        this.oldx = x;
        this.oldy = y;
      }
    }
    return true;
  };

  CToolObject.prototype.acceptMouseDownMoveEvent = function(x, y) {
    if (this.isValidMouseXY(x, y) == false) return false;
    if (this.state == CToolObject.state.Draw) {
      this.setDrawPos(x, y);
    } else if (this.state == CToolObject.state.AfterDraw) {
      var pObj = this.getChartObjects();
      var _width = pObj.pTimeline.getItemWidth();
      var _height = pObj.pRange;
      if (Math.abs(x - this.oldx) < _width && Math.abs(y - this.oldy) == 0)
        return true;
      var _old_x = pObj.pTimeline.toIndex(this.oldx);
      var _old_y = pObj.pRange.toValue(this.oldy);
      var _new_x = pObj.pTimeline.toIndex(x);
      var _new_y = pObj.pRange.toValue(y);
      this.oldx = x;
      this.oldy = y;
      var _dif_x = _new_x - _old_x;
      var _dif_y = _new_y - _old_y;
      for (var index in this.points) {
        this.points[index].pos.index += _dif_x;
        this.points[index].pos.value += _dif_y;
      }
    }
    return true;
  };

  CToolObject.prototype.acceptMouseUpEvent = function(x, y) {
    if (this.isValidMouseXY(x, y) == false) return false;
    if (this.state == CToolObject.state.Draw) {
      this.setAfterDrawPos(x, y);
      if (this.step == 0) this.setState(CToolObject.state.AfterDraw);
      return true;
    }
    return false;
  };

  CToolObject.prototype.setBeforeDrawPos = function(x, y) {
    for (var index in this.points) {
      this.points[index].setPosXY(x, y);
      this.points[index].setState(CPoint.state.Show);
    }
  };

  CToolObject.prototype.setDrawPos = function(x, y) {
    for (var index in this.points) {
      if (this.points[index].getState() == CPoint.state.Highlight) {
        this.points[index].setPosXY(x, y);
      }
    }
  };

  CToolObject.prototype.setAfterDrawPos = function(x, y) {
    if (this.step != 0) this.step -= 1;
    for (var index in this.points) {
      this.points[index].setState(CPoint.state.Hide);
    }
    if (this.step == 0) {
      var pObj = this.getChartObjects();
      pObj.pMgr.setNormalMode();
    }
  };

  CToolObject.prototype.isSelected = function(x, y) {
    var isFind = false;
    for (var index in this.points) {
      if (this.points[index].isSelected(x, y)) {
        this.points[index].setState(CPoint.state.Highlight);
        isFind = true;
        break;
      }
    }
    if (isFind == true) {
      this.select();
      return true;
    }
    return false;
  };

  CToolObject.prototype.select = function() {
    for (var index in this.points) {
      if (this.points[index].getState() == CPoint.state.Hide) {
        this.points[index].setState(CPoint.state.Show);
      }
    }
  };

  CToolObject.prototype.unselect = function() {
    for (var index in this.points) {
      if (this.points[index].getState() != CPoint.state.Hide) {
        this.points[index].setState(CPoint.state.Hide);
      }
    }
  };

  CToolObject.prototype.calcDistance = function(point1, point2, point3) {
    var xa = point1.getPosXY().x;
    var ya = point1.getPosXY().y;
    var xb = point2.getPosXY().x;
    var yb = point2.getPosXY().y;
    var xc = point3.getPosXY().x;
    var yc = point3.getPosXY().y;
    var a1 = xa - xc;
    var a2 = ya - yc;
    var b1 = xb - xc;
    var b2 = yb - yc;
    var area = Math.abs(a1 * b2 - a2 * b1);
    var len = Math.sqrt(Math.pow(xb - xa, 2) + Math.pow(yb - ya, 2));
    return area / len;
  };

  CToolObject.prototype.calcGap = function(r, x, y) {
    var xa = r.sx;
    var ya = r.sy;
    var xb = r.ex;
    var yb = r.ey;
    var xc = x;
    var yc = y;
    var a1 = xa - xc;
    var a2 = ya - yc;
    var b1 = xb - xc;
    var b2 = yb - yc;
    var area = Math.abs(a1 * b2 - a2 * b1);
    var len = Math.sqrt(Math.pow(xb - xa, 2) + Math.pow(yb - ya, 2));
    return area / len;
  };

  CToolObject.prototype.isWithRect = function(point1, point2, point3) {
    var sx = point1.getPosXY().x;
    var sy = point1.getPosXY().y;
    var ex = point2.getPosXY().x;
    var ey = point2.getPosXY().y;
    var x = point3.getPosXY().x;
    var y = point3.getPosXY().y;
    if (sx > ex) {
      sx += 4;
      ex -= 4;
    } else {
      sx -= 4;
      ex += 4;
    }
    if (sy > ey) {
      sy += 4;
      ey -= 4;
    } else {
      sy -= 4;
      ey += 4;
    }
    if (sx <= x && ex >= x && sy <= y && ey >= y) return true;
    if (sx >= x && ex <= x && sy <= y && ey >= y) return true;
    if (sx <= x && ex >= x && sy >= y && ey <= y) return true;
    if (sx >= x && ex <= x && sy >= y && ey <= y) return true;
    return false;
  };

  CBiToolObject = new_class(CToolObject);

  CBiToolObject.prototype._cTruct = function(name) {
    CBiToolObject.__classId._cTruct.call(this, name);
    this.addPoint(new CPoint(name));
    this.addPoint(new CPoint(name));
  };

  CBiToolObject.prototype.setBeforeDrawPos = function(x, y) {
    this.step = 1;
    CBiToolObject.__classId.setBeforeDrawPos.call(this, x, y);
    this.getPoint(0).setState(CPoint.state.Show);
    this.getPoint(1).setState(CPoint.state.Highlight);
  };

  CTriToolObject = new_class(CToolObject);

  CTriToolObject.prototype._cTruct = function(name) {
    CTriToolObject.__classId._cTruct.call(this, name);
    this.addPoint(new CPoint(name));
    this.addPoint(new CPoint(name));
    this.addPoint(new CPoint(name));
  };

  CTriToolObject.prototype.setBeforeDrawPos = function(x, y) {
    this.step = 2;
    CBiToolObject.__classId.setBeforeDrawPos.call(this, x, y);
    this.getPoint(0).setState(CPoint.state.Show);
    this.getPoint(1).setState(CPoint.state.Show);
    this.getPoint(2).setState(CPoint.state.Highlight);
  };

  CTriToolObject.prototype.setAfterDrawPos = function(x, y) {
    if (this.step != 0) this.step -= 1;
    if (this.step == 0) {
      for (var index in this.points) {
        this.points[index].setState(CPoint.state.Hide);
      }
    } else {
      this.getPoint(0).setState(CPoint.state.Show);
      this.getPoint(1).setState(CPoint.state.Highlight);
      this.getPoint(2).setState(CPoint.state.Show);
    }
    if (this.step == 0) {
      var pObj = this.getChartObjects();
      pObj.pMgr.setNormalMode();
    }
  };

  var CBandLineObject = new_class(CBiToolObject);

  CBandLineObject.prototype._cTruct = function(name) {
    CBandLineObject.__classId._cTruct.call(this, name);
    this.drawer = new DrawBandLinesPlotter(name, this);
  };

  CBandLineObject.prototype.isSelected = function(x, y) {
    if (CBandLineObject.__classId.isSelected.call(this, x, y) == true)
      return true;
    var c = new CPoint("frame0.k0");
    c.setPosXY(x, y);
    var sx = this.getPoint(0).getPosXY().x;
    var sy = this.getPoint(0).getPosXY().y;
    var ex = this.getPoint(1).getPosXY().x;
    var ey = this.getPoint(1).getPosXY().y;
    var fibSequence = [100, 87.5, 75, 62.5, 50, 37.5, 25, 12.5, 0];
    for (var i = 0; i < fibSequence.length; i++) {
      var stage_y = sy + ((100 - fibSequence[i]) / 100) * (ey - sy);
      if (stage_y < y + 4 && stage_y > y - 4) {
        this.select();
        return true;
      }
    }
    return false;
  };

  var CBiParallelLineObject = new_class(CTriToolObject);

  CBiParallelLineObject.prototype._cTruct = function(name) {
    CBiParallelLineObject.__classId._cTruct.call(this, name);
    this.drawer = new DrawBiParallelLinesPlotter(name, this);
  };

  CBiParallelLineObject.prototype.isSelected = function(x, y) {
    if (CTriParallelLineObject.__classId.isSelected.call(this, x, y) == true)
      return true;
    var _0x = this.getPoint(0).getPosXY().x;
    var _0y = this.getPoint(0).getPosXY().y;
    var _1x = this.getPoint(1).getPosXY().x;
    var _1y = this.getPoint(1).getPosXY().y;
    var _2x = this.getPoint(2).getPosXY().x;
    var _2y = this.getPoint(2).getPosXY().y;
    var _a = {
      x: _0x - _1x,
      y: _0y - _1y
    };
    var _b = {
      x: _0x - _2x,
      y: _0y - _2y
    };
    var _c = {
      x: _a.x + _b.x,
      y: _a.y + _b.y
    };
    var _3x = _0x - _c.x;
    var _3y = _0y - _c.y;
    var r1 = {
      sx: _0x,
      sy: _0y,
      ex: _2x,
      ey: _2y
    };
    var r2 = {
      sx: _1x,
      sy: _1y,
      ex: _3x,
      ey: _3y
    };
    if (this.calcGap(r1, x, y) > 4 && this.calcGap(r2, x, y) > 4) return false;
    return true;
  };

  var CBiParallelRayLineObject = new_class(CTriToolObject);

  CBiParallelRayLineObject.prototype._cTruct = function(name) {
    CBiParallelRayLineObject.__classId._cTruct.call(this, name);
    this.drawer = new DrawBiParallelRayLinesPlotter(name, this);
  };

  CBiParallelRayLineObject.prototype.isSelected = function(x, y) {
    if (CTriParallelLineObject.__classId.isSelected.call(this, x, y) == true)
      return true;
    var _0x = this.getPoint(0).getPosXY().x;
    var _0y = this.getPoint(0).getPosXY().y;
    var _1x = this.getPoint(1).getPosXY().x;
    var _1y = this.getPoint(1).getPosXY().y;
    var _2x = this.getPoint(2).getPosXY().x;
    var _2y = this.getPoint(2).getPosXY().y;
    var _a = {
      x: _0x - _1x,
      y: _0y - _1y
    };
    var _b = {
      x: _0x - _2x,
      y: _0y - _2y
    };
    var _c = {
      x: _a.x + _b.x,
      y: _a.y + _b.y
    };
    var _3x = _0x - _c.x;
    var _3y = _0y - _c.y;
    var r1 = {
      sx: _0x,
      sy: _0y,
      ex: _2x,
      ey: _2y
    };
    var r2 = {
      sx: _1x,
      sy: _1y,
      ex: _3x,
      ey: _3y
    };
    if (
      (r1.ex > r1.sx && x > r1.sx - 4) ||
      (r1.ex < r1.sx && x < r1.sx + 4) ||
      (r2.ex > r2.sx && x > r2.sx - 4) ||
      (r2.ex < r2.sx && x < r2.sx + 4)
    ) {
      if (this.calcGap(r1, x, y) > 4 && this.calcGap(r2, x, y) > 4) {
        return false;
      }
    } else {
      return false;
    }
    this.select();
    return true;
  };

  var CFibFansObject = new_class(CBiToolObject);

  CFibFansObject.prototype._cTruct = function(name) {
    CFibFansObject.__classId._cTruct.call(this, name);
    this.drawer = new DrawFibFansPlotter(name, this);
  };

  CFibFansObject.prototype.isSelected = function(x, y) {
    if (CFibFansObject.__classId.isSelected.call(this, x, y) == true)
      return true;
    var c = new CPoint("frame0.k0");
    c.setPosXY(x, y);
    var sx = this.getPoint(0).getPosXY().x;
    var sy = this.getPoint(0).getPosXY().y;
    var ex = this.getPoint(1).getPosXY().x;
    var ey = this.getPoint(1).getPosXY().y;
    var pObj = this.getChartObjects();
    var areaPos = {
      left: pObj.pArea.getLeft(),
      top: pObj.pArea.getTop(),
      right: pObj.pArea.getRight(),
      bottom: pObj.pArea.getBottom()
    };
    var fibFansSequence = [0, 38.2, 50, 61.8];
    for (var i = 0; i < fibFansSequence.length; i++) {
      var stageY = sy + ((100 - fibFansSequence[i]) / 100) * (ey - sy);
      var tempStartPt = {
        x: sx,
        y: sy
      };
      var tempEndPt = {
        x: ex,
        y: stageY
      };
      var crossPt = getRectCrossPt(areaPos, tempStartPt, tempEndPt);
      var lenToStartPt =
        Math.pow(crossPt[0].x - sx, 2) + Math.pow(crossPt[0].y - sy, 2);
      var lenToEndPt =
        Math.pow(crossPt[0].x - ex, 2) + Math.pow(crossPt[0].y - ey, 2);
      var tempCrossPt =
        lenToStartPt > lenToEndPt
          ? {
              x: crossPt[0].x,
              y: crossPt[0].y
            }
          : {
              x: crossPt[1].x,
              y: crossPt[1].y
            };
      if (tempCrossPt.x > sx && x < sx) continue;
      if (tempCrossPt.x < sx && x > sx) continue;
      var a = new CPoint("frame0.k0");
      a.setPosXY(sx, sy);
      var b = new CPoint("frame0.k0");
      b.setPosXY(tempCrossPt.x, tempCrossPt.y);
      if (this.calcDistance(a, b, c) > 4) continue;
      this.select();
      return true;
    }
    return false;
  };

  var CFibRetraceObject = new_class(CBiToolObject);

  CFibRetraceObject.prototype._cTruct = function(name) {
    CFibRetraceObject.__classId._cTruct.call(this, name);
    this.drawer = new DrawFibRetracePlotter(name, this);
  };

  CFibRetraceObject.prototype.isSelected = function(x, y) {
    if (CFibRetraceObject.__classId.isSelected.call(this, x, y) == true)
      return true;
    var c = new CPoint("frame0.k0");
    c.setPosXY(x, y);
    var sx = this.getPoint(0).getPosXY().x;
    var sy = this.getPoint(0).getPosXY().y;
    var ex = this.getPoint(1).getPosXY().x;
    var ey = this.getPoint(1).getPosXY().y;
    var fibSequence = [100, 78.6, 61.8, 50, 38.2, 23.6, 0];
    for (var i = 0; i < fibSequence.length; i++) {
      var stage_y = sy + ((100 - fibSequence[i]) / 100) * (ey - sy);
      if (stage_y < y + 4 && stage_y > y - 4) {
        this.select();
        return true;
      }
    }
    return false;
  };

  var CHoriRayLineObject = new_class(CBiToolObject);

  CHoriRayLineObject.prototype._cTruct = function(name) {
    CHoriRayLineObject.__classId._cTruct.call(this, name);
    this.drawer = new DrawHoriRayLinesPlotter(name, this);
  };

  CHoriRayLineObject.prototype.setDrawPos = function(x, y) {
    if (this.points[0].getState() == CPoint.state.Highlight) {
      this.points[0].setPosXY(x, y);
      this.points[1].setPosXYNoSnap(
        this.points[1].getPosXY().x,
        this.points[0].getPosXY().y
      );
      return;
    }
    if (this.points[1].getState() == CPoint.state.Highlight) {
      this.points[1].setPosXY(x, y);
      this.points[0].setPosXYNoSnap(
        this.points[0].getPosXY().x,
        this.points[1].getPosXY().y
      );
    }
  };

  CHoriRayLineObject.prototype.isSelected = function(x, y) {
    if (CHoriRayLineObject.__classId.isSelected.call(this, x, y) == true)
      return true;
    var c = new CPoint("frame0.k0");
    c.setPosXY(x, y);
    var sy = this.getPoint(0).getPosXY().y;
    var sx = this.getPoint(0).getPosXY().x;
    var ex = this.getPoint(1).getPosXY().x;
    if (y > sy + 4 || y < sy - 4) return false;
    if (ex > sx && x < sx - 4) return false;
    if (ex < sx && x > sx + 4) return false;
    this.select();
    return true;
  };

  var CHoriSegLineObject = new_class(CBiToolObject);

  CHoriSegLineObject.prototype._cTruct = function(name) {
    CHoriSegLineObject.__classId._cTruct.call(this, name);
    this.drawer = new DrawHoriSegLinesPlotter(name, this);
  };

  CHoriSegLineObject.prototype.setDrawPos = function(x, y) {
    if (this.points[0].getState() == CPoint.state.Highlight) {
      this.points[0].setPosXY(x, y);
      this.points[1].setPosXYNoSnap(
        this.points[1].getPosXY().x,
        this.points[0].getPosXY().y
      );
      return;
    }
    if (this.points[1].getState() == CPoint.state.Highlight) {
      this.points[1].setPosXY(x, y);
      this.points[0].setPosXYNoSnap(
        this.points[0].getPosXY().x,
        this.points[1].getPosXY().y
      );
    }
  };

  CHoriSegLineObject.prototype.isSelected = function(x, y) {
    if (CHoriSegLineObject.__classId.isSelected.call(this, x, y) == true)
      return true;
    var c = new CPoint("frame0.k0");
    c.setPosXY(x, y);
    var sy = this.getPoint(0).getPosXY().y;
    var sx = this.getPoint(0).getPosXY().x;
    var ex = this.getPoint(1).getPosXY().x;
    if (y > sy + 4 || y < sy - 4) return false;
    if (sx > ex && (x > sx + 4 || x < ex - 4)) return false;
    if (sx < ex && (x < sx - 4 || x > ex + 4)) return false;
    this.select();
    return true;
  };

  var CHoriStraightLineObject = new_class(CBiToolObject);

  CHoriStraightLineObject.prototype._cTruct = function(name) {
    CHoriStraightLineObject.__classId._cTruct.call(this, name);
    this.drawer = new DrawHoriStraightLinesPlotter(name, this);
  };

  CHoriStraightLineObject.prototype.setDrawPos = function(x, y) {
    for (var index in this.points) {
      this.points[index].setPosXY(x, y);
    }
  };

  CHoriStraightLineObject.prototype.isSelected = function(x, y) {
    if (CHoriStraightLineObject.__classId.isSelected.call(this, x, y) == true)
      return true;
    var c = new CPoint("frame0.k0");
    c.setPosXY(x, y);
    var sy = this.getPoint(0).getPosXY().y;
    if (y > sy + 4 || y < sy - 4) return false;
    this.select();
    return true;
  };

  var CRayLineObject = new_class(CBiToolObject);

  CRayLineObject.prototype._cTruct = function(name) {
    CRayLineObject.__classId._cTruct.call(this, name);
    this.drawer = new DrawRayLinesPlotter(name, this);
  };

  CRayLineObject.prototype.isSelected = function(x, y) {
    if (CRayLineObject.__classId.isSelected.call(this, x, y) == true)
      return true;
    var c = new CPoint("frame0.k0");
    c.setPosXY(x, y);
    var sx = this.getPoint(0).getPosXY().x;
    var ex = this.getPoint(1).getPosXY().x;
    if (ex > sx && x < sx - 4) return false;
    if (ex < sx && x > sx + 4) return false;
    if (this.calcDistance(this.getPoint(0), this.getPoint(1), c) < 4) {
      this.select();
      return true;
    }
    return false;
  };

  var CSegLineObject = new_class(CBiToolObject);

  CSegLineObject.prototype._cTruct = function(name) {
    CSegLineObject.__classId._cTruct.call(this, name);
    this.drawer = new DrawSegLinesPlotter(name, this);
  };

  CSegLineObject.prototype.isSelected = function(x, y) {
    if (CSegLineObject.__classId.isSelected.call(this, x, y) == true)
      return true;
    var c = new CPoint("frame0.k0");
    c.setPosXY(x, y);
    if (this.isWithRect(this.getPoint(0), this.getPoint(1), c) == false)
      return false;
    if (this.calcDistance(this.getPoint(0), this.getPoint(1), c) < 4) {
      this.select();
      return true;
    }
    return false;
  };

  var CStraightLineObject = new_class(CBiToolObject);

  CStraightLineObject.prototype._cTruct = function(name) {
    CStraightLineObject.__classId._cTruct.call(this, name);
    this.drawer = new DrawStraightLinesPlotter(name, this);
  };

  CStraightLineObject.prototype.isSelected = function(x, y) {
    if (CStraightLineObject.__classId.isSelected.call(this, x, y) == true)
      return true;
    var c = new CPoint("frame0.k0");
    c.setPosXY(x, y);
    if (this.calcDistance(this.getPoint(0), this.getPoint(1), c) < 4) {
      this.select();
      return true;
    }
    return false;
  };

  var CTriParallelLineObject = new_class(CTriToolObject);

  CTriParallelLineObject.prototype._cTruct = function(name) {
    CTriParallelLineObject.__classId._cTruct.call(this, name);
    this.drawer = new DrawTriParallelLinesPlotter(name, this);
  };

  CTriParallelLineObject.prototype.isSelected = function(x, y) {
    if (CTriParallelLineObject.__classId.isSelected.call(this, x, y) == true)
      return true;
    var pObj = this.getChartObjects();
    var _0x = this.getPoint(0).getPosXY().x;
    var _0y = this.getPoint(0).getPosXY().y;
    var _1x = this.getPoint(1).getPosXY().x;
    var _1y = this.getPoint(1).getPosXY().y;
    var _2x = this.getPoint(2).getPosXY().x;
    var _2y = this.getPoint(2).getPosXY().y;
    var _a = {
      x: _0x - _1x,
      y: _0y - _1y
    };
    var _b = {
      x: _0x - _2x,
      y: _0y - _2y
    };
    var _c = {
      x: _a.x + _b.x,
      y: _a.y + _b.y
    };
    var _3x = _0x - _c.x;
    var _3y = _0y - _c.y;
    var r1 = {
      sx: _0x,
      sy: _0y,
      ex: _2x,
      ey: _2y
    };
    var r2 = {
      sx: _1x,
      sy: _1y,
      ex: _3x,
      ey: _3y
    };
    var _i = {
      x: _0x - _1x,
      y: _0y - _1y
    };
    var _j = {
      x: _2x - _3x,
      y: _2y - _3y
    };
    var _ri = {
      x: _1x - _0x,
      y: _1y - _0y
    };
    var _rj = {
      x: _3x - _2x,
      y: _3y - _2y
    };
    var _4x = Math.abs(_ri.x - _0x);
    var _4y = Math.abs(_ri.y - _0y);
    var _5x = Math.abs(_rj.x - _2x);
    var _5y = Math.abs(_rj.y - _2y);
    var r3 = {
      sx: _4x,
      sy: _4y,
      ex: _5x,
      ey: _5y
    };
    if (
      this.calcGap(r1, x, y) > 4 &&
      this.calcGap(r2, x, y) > 4 &&
      this.calcGap(r3, x, y) > 4
    )
      return false;
    this.select();
    return true;
  };

  var CVertiStraightLineObject = new_class(CBiToolObject);

  CVertiStraightLineObject.prototype._cTruct = function(name) {
    CVertiStraightLineObject.__classId._cTruct.call(this, name);
    this.drawer = new DrawVertiStraightLinesPlotter(name, this);
  };

  CVertiStraightLineObject.prototype.setDrawPos = function(x, y) {
    for (var index in this.points) {
      this.points[index].setPosXY(x, y);
    }
  };

  CVertiStraightLineObject.prototype.isSelected = function(x, y) {
    if (CVertiStraightLineObject.__classId.isSelected.call(this, x, y) == true)
      return true;
    var c = new CPoint("frame0.k0");
    c.setPosXY(x, y);
    var sx = this.getPoint(0).getPosXY().x;
    if (x > sx + 4 || x < sx - 4) return false;
    this.select();
    return true;
  };

  var CPriceLineObject = new_class(CSegLineObject);

  CPriceLineObject.prototype._cTruct = function(name) {
    CPriceLineObject.__classId._cTruct.call(this, name);
    this.drawer = new DrawPriceLinesPlotter(name, this);
  };

  CPriceLineObject.prototype.setDrawPos = function(x, y) {
    for (var index in this.points) {
      this.points[index].setPosXY(x, y);
    }
  };

  CPriceLineObject.prototype.isSelected = function(x, y) {
    if (CFibRetraceObject.__classId.isSelected.call(this, x, y) == true)
      return true;
    var c = new CPoint("frame0.k0");
    c.setPosXY(x, y);
    var sx = this.getPoint(0).getPosXY().x;
    var sy = this.getPoint(0).getPosXY().y;
    var ex = this.getPoint(1).getPosXY().x;
    var ey = this.getPoint(1).getPosXY().y;
    if (x < sx - 4) return false;
    if (y >= sy + 4 || y <= sy - 4) return false;
    this.select();
    return true;
  };

  var CArrowLineObject = new_class(CSegLineObject);

  CArrowLineObject.prototype._cTruct = function(name) {
    CArrowLineObject.__classId._cTruct.call(this, name);
    this.drawer = new DrawArrowLinesPlotter(name, this);
  };

  var CToolManager = new_class(_Named_object);

  CToolManager.prototype._cTruct = function(name) {
    CToolManager.__classId._cTruct.call(this, name);
    this.selectedObject = -1;
    this.toolObjects = [];
  };

  CToolManager.prototype.getToolObjectCount = function() {
    return this.toolObjects.length;
  };

  CToolManager.prototype.addToolObject = function(o) {
    this.toolObjects.push(o);
  };

  CToolManager.prototype.getToolObject = function(i) {
    if (i < this.toolObjects.length && i >= 0) return this.toolObjects[i];
    return null;
  };

  CToolManager.prototype.getCurrentObject = function() {
    return this.getToolObject(this.getToolObjectCount() - 1);
  };

  CToolManager.prototype.getSelectedObject = function() {
    return this.getToolObject(this.selectedObject);
  };

  CToolManager.prototype.delCurrentObject = function() {
    this.toolObjects.splice(this.getToolObjectCount() - 1, 1);
  };

  CToolManager.prototype.delSelectedObject = function() {
    this.toolObjects.splice(this.selectedObject, 1);
    this.selectedObject = -1;
  };

  CToolManager.prototype.acceptMouseMoveEvent = function(x, y) {
    if (this.selectedObject == -1) {
      var curr = this.toolObjects[this.getToolObjectCount() - 1];
      if (curr != null && curr.getState() != CToolObject.state.AfterDraw)
        return curr.acceptMouseMoveEvent(x, y);
    } else {
      var sel = this.toolObjects[this.selectedObject];
      if (sel.getState() == CToolObject.state.Draw)
        return sel.acceptMouseMoveEvent(x, y);
      sel.unselect();
      this.selectedObject = -1;
    }
    for (var index in this.toolObjects) {
      if (this.toolObjects[index].isSelected(x, y)) {
        this.selectedObject = index;
        return false;
      }
    }
    return false;
  };

  CToolManager.prototype.acceptMouseDownEvent = function(x, y) {
    this.mouseDownMove = false;
    if (this.selectedObject == -1) {
      var curr = this.toolObjects[this.getToolObjectCount() - 1];
      if (curr != null && curr.getState() != CToolObject.state.AfterDraw)
        return curr.acceptMouseDownEvent(x, y);
    } else {
      var sel = this.toolObjects[this.selectedObject];
      if (sel.getState() != CToolObject.state.BeforeDraw)
        return sel.acceptMouseDownEvent(x, y);
    }
    return false;
  };

  CToolManager.prototype.acceptMouseDownMoveEvent = function(x, y) {
    this.mouseDownMove = true;
    if (this.selectedObject == -1) {
      var curr = this.toolObjects[this.getToolObjectCount() - 1];
      if (curr != null && curr.getState() == CToolObject.state.Draw)
        return curr.acceptMouseDownMoveEvent(x, y);
      return false;
    } else {
      var sel = this.toolObjects[this.selectedObject];
      if (sel.getState() != CToolObject.state.BeforeDraw) {
        if (sel.acceptMouseDownMoveEvent(x, y) == true) {
          var point = this.toolObjects[this.selectedObject].points;
          for (var i = 0; i < point.length; i++) {
            if (
              point[i].state == CPoint.state.Highlight ||
              point[i].state == CPoint.state.Show
            ) {
              return true;
            }
          }
        }
        return true;
      }
    }
  };

  CToolManager.prototype.acceptMouseUpEvent = function(x, y) {
    if (this.mouseDownMove == true) {
      if (this.selectedObject == -1) {
        var curr = this.toolObjects[this.getToolObjectCount() - 1];
        if (curr != null && curr.getState() == CToolObject.state.Draw)
          return curr.acceptMouseUpEvent(x, y);
        return true;
      } else {
        var sel = this.toolObjects[this.selectedObject];
        if (sel.getState() != CToolObject.state.BeforeDraw)
          return sel.acceptMouseUpEvent(x, y);
      }
    }
    if (this.selectedObject != -1) {
      return true;
    }
    var curr = this.toolObjects[this.getToolObjectCount() - 1];
    if (curr != null) {
      if (curr.getState() == CToolObject.state.Draw) return true;
      if (!curr.isValidMouseXY(x, y)) {
        return false;
      }
      if (curr.isSelected(x, y)) {
        return true;
      }
    }
    return false;
  };

  var CToolPlotter = new_class(_Named_object);

  CToolPlotter.prototype._cTruct = function(name, toolObject) {
    CToolPlotter.__classId._cTruct.call(this, name);
    this.toolObject = toolObject;
    var pMgr = _chart_man.getInstance();
    var pArea = pMgr.getArea("frame0.k0.main");
    if (pArea == null) {
      this.areaPos = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      return;
    }
    this.areaPos = {
      left: pArea.getLeft(),
      top: pArea.getTop(),
      right: pArea.getRight(),
      bottom: pArea.getBottom()
    };
    this.crossPt = {};
    this.normalSize = 4;
    this.selectedSize = 6;
    this.cursorLen = 4;
    this.cursorGapLen = 3;
    this.theme = _chart_man.getInstance().getTheme(this.getFrameName());
  };

  CToolPlotter.prototype.drawCursor = function(context) {
    this.drawCrossCursor(context);
  };

  CToolPlotter.prototype.drawCrossCursor = function(context) {
    context.strokeStyle = this.theme.getColor(Theme.Co.LineColorNormal);
    context.fillStyle = this.theme.getColor(Theme.Co.LineColorNormal);
    var tempPt = this.toolObject.getPoint(0).getPosXY();
    if (tempPt == null) {
      return;
    }
    var x = tempPt.x;
    var y = tempPt.y;
    var cursorLen = this.cursorLen;
    var cursorGapLen = this.cursorGapLen;
    context.fillRect(x, y, 1, 1);
    Plotter.drawLine(
      context,
      x - cursorLen - cursorGapLen,
      y,
      x - cursorGapLen,
      y
    );
    Plotter.drawLine(
      context,
      x + cursorLen + cursorGapLen,
      y,
      x + cursorGapLen,
      y
    );
    Plotter.drawLine(
      context,
      x,
      y - cursorLen - cursorGapLen,
      x,
      y - cursorGapLen
    );
    Plotter.drawLine(
      context,
      x,
      y + cursorLen + cursorGapLen,
      x,
      y + cursorGapLen
    );
  };

  CToolPlotter.prototype.drawCircle = function(context, center, radius) {
    var centerX = center.x;
    var centerY = center.y;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = this.theme.getColor(Theme.Co.CircleColorFill);
    context.fill();
    context.stroke();
  };

  CToolPlotter.prototype.drawCtrlPt = function(context) {
    context.strokeStyle = this.theme.getColor(Theme.Co.CircleColorStroke);
    for (var i = 0; i < this.ctrlPtsNum; i++) {
      this.drawCircle(context, this.ctrlPts[1][i], this.normalSize);
    }
  };

  CToolPlotter.prototype.highlightCtrlPt = function(context) {
    context.strokeStyle = this.theme.getColor(Theme.Co.CircleColorStroke);
    for (var i = 0; i < this.ctrlPtsNum; i++) {
      if (this.toolObject.getPoint(i).getState() == CPoint.state.Highlight)
        this.drawCircle(context, this.ctrlPts[1][i], this.selectedSize);
    }
  };

  CToolPlotter.prototype.drawFibRayLines = function(
    context,
    startPoint,
    endPoint
  ) {
    for (var i = 0; i < this.fiboFansSequence.length; i++) {
      var stageY =
        startPoint.y +
        ((100 - this.fiboFansSequence[i]) / 100) * (endPoint.y - startPoint.y);
      var tempStartPt = {
        x: startPoint.x,
        y: startPoint.y
      };
      var tempEndPt = {
        x: endPoint.x,
        y: stageY
      };
      this.drawRayLines(context, tempStartPt, tempEndPt);
    }
  };

  CToolPlotter.prototype.drawRayLines = function(
    context,
    startPoint,
    endPoint
  ) {
    this.getAreaPos();
    var tempStartPt = {
      x: startPoint.x,
      y: startPoint.y
    };
    var tempEndPt = {
      x: endPoint.x,
      y: endPoint.y
    };
    var crossPt = getRectCrossPt(this.areaPos, tempStartPt, tempEndPt);
    var tempCrossPt;
    if (endPoint.x == startPoint.x) {
      if (endPoint.y == startPoint.y) {
        tempCrossPt = endPoint;
      } else {
        tempCrossPt =
          endPoint.y > startPoint.y
            ? {
                x: crossPt[1].x,
                y: crossPt[1].y
              }
            : {
                x: crossPt[0].x,
                y: crossPt[0].y
              };
      }
    } else {
      tempCrossPt =
        endPoint.x > startPoint.x
          ? {
              x: crossPt[1].x,
              y: crossPt[1].y
            }
          : {
              x: crossPt[0].x,
              y: crossPt[0].y
            };
    }
    Plotter.drawLine(
      context,
      startPoint.x,
      startPoint.y,
      tempCrossPt.x,
      tempCrossPt.y
    );
  };

  CToolPlotter.prototype.lenBetweenPts = function(pt1, pt2) {
    return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
  };

  CToolPlotter.prototype.getCtrlPts = function() {
    for (var i = 0; i < this.ctrlPtsNum; i++) {
      this.ctrlPts[0][i] = this.toolObject.getPoint(i);
    }
  };

  CToolPlotter.prototype.updateCtrlPtPos = function() {
    for (var i = 0; i < this.ctrlPtsNum; i++) {
      this.ctrlPts[1][i] = this.ctrlPts[0][i].getPosXY();
    }
  };

  CToolPlotter.prototype.getAreaPos = function() {
    var pMgr = _chart_man.getInstance();
    var pArea = pMgr.getArea("frame0.k0.main");
    if (pArea == null) {
      this.areaPos = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      return;
    }
    this.areaPos = {
      left: Math.floor(pArea.getLeft()),
      top: Math.floor(pArea.getTop()),
      right: Math.floor(pArea.getRight()),
      bottom: Math.floor(pArea.getBottom())
    };
  };

  CToolPlotter.prototype.updateDraw = function(context) {
    context.strokeStyle = this.theme.getColor(Theme.Co.LineColorNormal);
    this.draw(context);
    this.drawCtrlPt(context);
  };

  CToolPlotter.prototype.finishDraw = function(context) {
    context.strokeStyle = this.theme.getColor(Theme.Co.LineColorNormal);
    this.draw(context);
  };

  CToolPlotter.prototype.highlight = function(context) {
    context.strokeStyle = this.theme.getColor(Theme.Co.LineColorSelected);
    this.draw(context);
    this.drawCtrlPt(context);
    this.highlightCtrlPt(context);
  };

  var DrawStraightLinesPlotter = new_class(CToolPlotter);

  DrawStraightLinesPlotter.prototype._cTruct = function(name, toolObject) {
    DrawStraightLinesPlotter.__classId._cTruct.call(this, name, toolObject);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 2;
    this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
    this.getCtrlPts();
  };

  DrawStraightLinesPlotter.prototype.draw = function(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    this.endPoint = this.ctrlPts[1][1];
    if (
      this.startPoint.x == this.endPoint.x &&
      this.startPoint.y == this.endPoint.y
    ) {
      Plotter.drawLine(
        context,
        this.areaPos.left,
        this.startPoint.y,
        this.areaPos.right,
        this.startPoint.y
      );
    } else {
      this.crossPt = getRectCrossPt(
        this.areaPos,
        this.startPoint,
        this.endPoint
      );
      Plotter.drawLine(
        context,
        this.crossPt[0].x,
        this.crossPt[0].y,
        this.crossPt[1].x,
        this.crossPt[1].y
      );
    }
  };

  var DrawSegLinesPlotter = new_class(CToolPlotter);

  DrawSegLinesPlotter.prototype._cTruct = function(name, toolObject) {
    DrawSegLinesPlotter.__classId._cTruct.call(this, name, toolObject);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 2;
    this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
    this.getCtrlPts();
  };

  DrawSegLinesPlotter.prototype.draw = function(context) {
    this.updateCtrlPtPos();
    this.startPoint = this.ctrlPts[1][0];
    this.endPoint = this.ctrlPts[1][1];
    if (
      this.startPoint.x == this.endPoint.x &&
      this.startPoint.y == this.endPoint.y
    ) {
      this.endPoint.x += 1;
    }
    Plotter.drawLine(
      context,
      this.startPoint.x,
      this.startPoint.y,
      this.endPoint.x,
      this.endPoint.y
    );
  };

  var DrawRayLinesPlotter = new_class(CToolPlotter);

  DrawRayLinesPlotter.prototype._cTruct = function(name, toolObject) {
    DrawRayLinesPlotter.__classId._cTruct.call(this, name);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 2;
    this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
    this.getCtrlPts();
  };

  DrawRayLinesPlotter.prototype.draw = function(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    this.endPoint = this.ctrlPts[1][1];
    if (
      this.startPoint.x == this.endPoint.x &&
      this.startPoint.y == this.endPoint.y
    ) {
      this.endPoint.x += 1;
    }
    this.drawRayLines(context, this.startPoint, this.endPoint);
  };

  var DrawArrowLinesPlotter = new_class(CToolPlotter);

  DrawArrowLinesPlotter.prototype._cTruct = function(name, toolObject) {
    DrawArrowLinesPlotter.__classId._cTruct.call(this, name, toolObject);
    this.toolObject = toolObject;
    this.arrowSizeRatio = 0.03;
    this.arrowSize = 4;
    this.crossPt = {
      x: -1,
      y: -1
    };
    this.ctrlPtsNum = 2;
    this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
    this.getCtrlPts();
  };

  DrawArrowLinesPlotter.prototype.drawArrow = function(
    context,
    startPoint,
    endPoint
  ) {
    var len = this.lenBetweenPts(startPoint, endPoint);
    var vectorA = [endPoint.x - startPoint.x, endPoint.y - startPoint.y];
    this.crossPt.x = startPoint.x + (1 - this.arrowSize / len) * vectorA[0];
    this.crossPt.y = startPoint.y + (1 - this.arrowSize / len) * vectorA[1];
    var vectorAautho = [-vectorA[1], vectorA[0]];
    var Aautho = {
      x: vectorAautho[0],
      y: vectorAautho[1]
    };
    var origin = {
      x: 0,
      y: 0
    };
    vectorAautho[0] =
      (this.arrowSize * Aautho.x) / this.lenBetweenPts(Aautho, origin);
    vectorAautho[1] =
      (this.arrowSize * Aautho.y) / this.lenBetweenPts(Aautho, origin);
    var arrowEndPt = [
      this.crossPt.x + vectorAautho[0],
      this.crossPt.y + vectorAautho[1]
    ];
    Plotter.drawLine(
      context,
      endPoint.x,
      endPoint.y,
      arrowEndPt[0],
      arrowEndPt[1]
    );
    arrowEndPt = [
      this.crossPt.x - vectorAautho[0],
      this.crossPt.y - vectorAautho[1]
    ];
    Plotter.drawLine(
      context,
      endPoint.x,
      endPoint.y,
      arrowEndPt[0],
      arrowEndPt[1]
    );
  };

  DrawArrowLinesPlotter.prototype.draw = function(context) {
    this.updateCtrlPtPos();
    this.startPoint = this.ctrlPts[1][0];
    this.endPoint = this.ctrlPts[1][1];
    if (
      this.startPoint.x == this.endPoint.x &&
      this.startPoint.y == this.endPoint.y
    ) {
      this.endPoint.x += 1;
    }
    Plotter.drawLine(
      context,
      this.startPoint.x,
      this.startPoint.y,
      this.endPoint.x,
      this.endPoint.y
    );
    this.drawArrow(context, this.startPoint, this.endPoint);
  };

  var DrawHoriStraightLinesPlotter = new_class(CToolPlotter);

  DrawHoriStraightLinesPlotter.prototype._cTruct = function(name, toolObject) {
    DrawHoriStraightLinesPlotter.__classId._cTruct.call(this, name);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 1;
    this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
    this.getCtrlPts();
  };

  DrawHoriStraightLinesPlotter.prototype.draw = function(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    Plotter.drawLine(
      context,
      this.areaPos.left,
      this.startPoint.y,
      this.areaPos.right,
      this.startPoint.y
    );
  };

  var DrawHoriRayLinesPlotter = new_class(CToolPlotter);

  DrawHoriRayLinesPlotter.prototype._cTruct = function(name, toolObject) {
    DrawHoriRayLinesPlotter.__classId._cTruct.call(this, name);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 2;
    this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
    this.getCtrlPts();
  };

  DrawHoriRayLinesPlotter.prototype.draw = function(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    this.endPoint = this.ctrlPts[1][1];
    if (this.startPoint.x == this.endPoint.x) {
      Plotter.drawLine(
        context,
        this.startPoint.x,
        this.startPoint.y,
        this.areaPos.right,
        this.startPoint.y
      );
    } else {
      var tempEndPt = {
        x: this.endPoint.x,
        y: this.startPoint.y
      };
      this.drawRayLines(context, this.startPoint, tempEndPt);
    }
  };

  var DrawHoriSegLinesPlotter = new_class(CToolPlotter);

  DrawHoriSegLinesPlotter.prototype._cTruct = function(name, toolObject) {
    DrawHoriSegLinesPlotter.__classId._cTruct.call(this, name, toolObject);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 2;
    this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
    this.getCtrlPts();
  };

  DrawHoriSegLinesPlotter.prototype.draw = function(context) {
    this.updateCtrlPtPos();
    this.startPoint = this.ctrlPts[1][0];
    this.endPoint = this.ctrlPts[1][1];
    this.endPoint.y = this.startPoint.y;
    if (
      this.startPoint.x == this.endPoint.x &&
      this.startPoint.y == this.endPoint.y
    ) {
      Plotter.drawLine(
        context,
        this.startPoint.x,
        this.startPoint.y,
        this.endPoint.x + 1,
        this.startPoint.y
      );
    } else {
      Plotter.drawLine(
        context,
        this.startPoint.x,
        this.startPoint.y,
        this.endPoint.x,
        this.startPoint.y
      );
    }
  };

  var DrawVertiStraightLinesPlotter = new_class(CToolPlotter);

  DrawVertiStraightLinesPlotter.prototype._cTruct = function(name, toolObject) {
    DrawVertiStraightLinesPlotter.__classId._cTruct.call(this, name);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 1;
    this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
    this.getCtrlPts();
  };

  DrawVertiStraightLinesPlotter.prototype.draw = function(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    Plotter.drawLine(
      context,
      this.startPoint.x,
      this.areaPos.top,
      this.startPoint.x,
      this.areaPos.bottom
    );
  };

  var DrawPriceLinesPlotter = new_class(CToolPlotter);

  DrawPriceLinesPlotter.prototype._cTruct = function(name, toolObject) {
    DrawPriceLinesPlotter.__classId._cTruct.call(this, name);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 1;
    this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
    this.getCtrlPts();
  };

  DrawPriceLinesPlotter.prototype.draw = function(context) {
    context.font = "12px Tahoma";
    context.textAlign = "left";
    context.fillStyle = this.theme.getColor(Theme.Co.LineColorNormal);
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    var text = this.ctrlPts[0][0].getPosIV().v;
    Plotter.drawLine(
      context,
      this.startPoint.x,
      this.startPoint.y,
      this.areaPos.right,
      this.startPoint.y
    );
    context.fillText(
      text.toFixed(2),
      this.startPoint.x + 2,
      this.startPoint.y - 15
    );
  };

  var ParallelLinesPlotter = new_class(CToolPlotter);

  ParallelLinesPlotter.prototype._cTruct = function(name, toolObject) {
    ParallelLinesPlotter.__classId._cTruct.call(this, name);
    this.toolObject = toolObject;
  };

  ParallelLinesPlotter.prototype.getParaPt = function() {
    var vectorA = [];
    vectorA[0] = this.endPoint.x - this.startPoint.x;
    vectorA[1] = this.endPoint.y - this.startPoint.y;
    var vectorB = [];
    vectorB[0] = this.paraStartPoint.x - this.startPoint.x;
    vectorB[1] = this.paraStartPoint.y - this.startPoint.y;
    this.paraEndPoint = {
      x: -1,
      y: -1
    };
    this.paraEndPoint.x = vectorA[0] + vectorB[0] + this.startPoint.x;
    this.paraEndPoint.y = vectorA[1] + vectorB[1] + this.startPoint.y;
  };

  var DrawBiParallelLinesPlotter = new_class(ParallelLinesPlotter);

  DrawBiParallelLinesPlotter.prototype._cTruct = function(name, toolObject) {
    DrawBiParallelLinesPlotter.__classId._cTruct.call(this, name, toolObject);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 3;
    this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
    this.getCtrlPts();
  };

  DrawBiParallelLinesPlotter.prototype.draw = function(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    this.paraStartPoint = this.ctrlPts[1][1];
    this.endPoint = this.ctrlPts[1][2];
    this.getParaPt();
    this.getAreaPos();
    this.crossPt0 = getRectCrossPt(
      this.areaPos,
      this.startPoint,
      this.endPoint
    );
    Plotter.drawLine(
      context,
      this.crossPt0[0].x,
      this.crossPt0[0].y,
      this.crossPt0[1].x,
      this.crossPt0[1].y
    );
    this.crossPt1 = getRectCrossPt(
      this.areaPos,
      this.paraStartPoint,
      this.paraEndPoint
    );
    Plotter.drawLine(
      context,
      this.crossPt1[0].x,
      this.crossPt1[0].y,
      this.crossPt1[1].x,
      this.crossPt1[1].y
    );
  };

  var DrawBiParallelRayLinesPlotter = new_class(ParallelLinesPlotter);

  DrawBiParallelRayLinesPlotter.prototype._cTruct = function(name, toolObject) {
    DrawBiParallelRayLinesPlotter.__classId._cTruct.call(
      this,
      name,
      toolObject
    );
    this.toolObject = toolObject;
    this.ctrlPtsNum = 3;
    this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
    this.getCtrlPts();
  };

  DrawBiParallelRayLinesPlotter.prototype.draw = function(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    this.paraStartPoint = this.ctrlPts[1][1];
    this.endPoint = this.ctrlPts[1][2];
    if (
      this.startPoint.x == this.endPoint.x &&
      this.startPoint.y == this.endPoint.y
    ) {
      this.endPoint.x += 1;
    }
    this.getParaPt();
    this.drawRayLines(context, this.startPoint, this.endPoint);
    this.drawRayLines(context, this.paraStartPoint, this.paraEndPoint);
  };

  var DrawTriParallelLinesPlotter = new_class(ParallelLinesPlotter);

  DrawTriParallelLinesPlotter.prototype._cTruct = function(name, toolObject) {
    DrawTriParallelLinesPlotter.__classId._cTruct.call(this, name, toolObject);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 3;
    this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
    this.getCtrlPts();
  };

  DrawTriParallelLinesPlotter.prototype.draw = function(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    this.paraStartPoint = this.ctrlPts[1][1];
    this.endPoint = this.ctrlPts[1][2];
    var vectorA = [];
    vectorA[0] = this.endPoint.x - this.startPoint.x;
    vectorA[1] = this.endPoint.y - this.startPoint.y;
    var vectorB = [];
    vectorB[0] = this.paraStartPoint.x - this.startPoint.x;
    vectorB[1] = this.paraStartPoint.y - this.startPoint.y;
    this.para1EndPoint = {
      x: -1,
      y: -1
    };
    this.para2EndPoint = {
      x: -1,
      y: -1
    };
    this.para2StartPoint = {
      x: -1,
      y: -1
    };
    this.para1EndPoint.x = vectorA[0] + vectorB[0] + this.startPoint.x;
    this.para1EndPoint.y = vectorA[1] + vectorB[1] + this.startPoint.y;
    this.para2StartPoint.x = this.startPoint.x - vectorB[0];
    this.para2StartPoint.y = this.startPoint.y - vectorB[1];
    this.para2EndPoint.x = this.endPoint.x - vectorB[0];
    this.para2EndPoint.y = this.endPoint.y - vectorB[1];
    this.getAreaPos();
    this.crossPt0 = getRectCrossPt(
      this.areaPos,
      this.startPoint,
      this.endPoint
    );
    Plotter.drawLine(
      context,
      this.crossPt0[0].x,
      this.crossPt0[0].y,
      this.crossPt0[1].x,
      this.crossPt0[1].y
    );
    this.crossPt1 = getRectCrossPt(
      this.areaPos,
      this.paraStartPoint,
      this.para1EndPoint
    );
    Plotter.drawLine(
      context,
      this.crossPt1[0].x,
      this.crossPt1[0].y,
      this.crossPt1[1].x,
      this.crossPt1[1].y
    );
    this.crossPt2 = getRectCrossPt(
      this.areaPos,
      this.para2StartPoint,
      this.para2EndPoint
    );
    Plotter.drawLine(
      context,
      this.crossPt2[0].x,
      this.crossPt2[0].y,
      this.crossPt2[1].x,
      this.crossPt2[1].y
    );
  };

  var BandLinesPlotter = new_class(CToolPlotter);

  BandLinesPlotter.prototype._cTruct = function(name, toolObject) {
    BandLinesPlotter.__classId._cTruct.call(this, name);
    this.toolObject = toolObject;
    this.ctrlPtsNum = 2;
    this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
    this.getCtrlPts();
  };

  BandLinesPlotter.prototype.drawLinesAndInfo = function(
    context,
    startPoint,
    endPoint
  ) {
    context.font = "12px Tahoma";
    context.textAlign = "left";
    context.fillStyle = this.theme.getColor(Theme.Co.LineColorNormal);
    var text;
    if (this.toolObject.state == CToolObject.state.Draw) {
      this.startPtValue = this.toolObject.getPoint(0).getPosIV().v;
      this.endPtValue = this.toolObject.getPoint(1).getPosIV().v;
    }
    this.getAreaPos();
    for (var i = 0; i < this.fiboSequence.length; i++) {
      var stageY =
        startPoint.y +
        ((100 - this.fiboSequence[i]) / 100) * (endPoint.y - startPoint.y);
      if (stageY > this.areaPos.bottom) continue;
      var stageYvalue =
        this.startPtValue +
        ((100 - this.fiboSequence[i]) / 100) *
          (this.endPtValue - this.startPtValue);
      Plotter.drawLine(
        context,
        this.areaPos.left,
        stageY,
        this.areaPos.right,
        stageY
      );
      text = this.fiboSequence[i].toFixed(1) + "% " + stageYvalue.toFixed(1);
      context.fillText(text, this.areaPos.left + 2, stageY - 15);
    }
  };

  BandLinesPlotter.prototype.draw = function(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    this.endPoint = this.ctrlPts[1][1];
    this.drawLinesAndInfo(context, this.startPoint, this.endPoint);
  };

  var DrawFibRetracePlotter = new_class(BandLinesPlotter);

  DrawFibRetracePlotter.prototype._cTruct = function(name, toolObject) {
    DrawFibRetracePlotter.__classId._cTruct.call(this, name, toolObject);
    this.toolObject = toolObject;
    this.fiboSequence = [100, 78.6, 61.8, 50, 38.2, 23.6, 0];
  };

  var DrawBandLinesPlotter = new_class(BandLinesPlotter);

  DrawBandLinesPlotter.prototype._cTruct = function(name, toolObject) {
    DrawBandLinesPlotter.__classId._cTruct.call(this, name, toolObject);
    this.toolObject = toolObject;
    this.fiboSequence = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
  };

  var DrawFibFansPlotter = new_class(CToolPlotter);

  DrawFibFansPlotter.prototype._cTruct = function(name, toolObject) {
    DrawFibFansPlotter.__classId._cTruct.call(this, name);
    this.toolObject = toolObject;
    this.fiboFansSequence = [0, 38.2, 50, 61.8];
    this.ctrlPtsNum = 2;
    this.ctrlPts = new Array(new Array(this.ctrlPtsNum), new Array(2));
    this.getCtrlPts();
  };

  DrawFibFansPlotter.prototype.drawLinesAndInfo = function(
    context,
    startPoint,
    endPoint
  ) {
    this.drawFibRayLines(context, startPoint, endPoint);
  };

  DrawFibFansPlotter.prototype.draw = function(context) {
    this.updateCtrlPtPos();
    this.getAreaPos();
    this.startPoint = this.ctrlPts[1][0];
    this.endPoint = this.ctrlPts[1][1];
    if (
      this.startPoint.x == this.endPoint.x &&
      this.startPoint.y == this.endPoint.y
    ) {
      this.endPoint.x += 1;
    }
    this.drawLinesAndInfo(context, this.startPoint, this.endPoint);
  };

  var CDynamicLinePlotter = new_class(_Named_object);

  CDynamicLinePlotter.prototype._cTruct = function(name) {
    CDynamicLinePlotter.__classId._cTruct.call(this, name);
    this.flag = true;
    this.context = _chart_man.getInstance()._overlayContext;
  };

  CDynamicLinePlotter.prototype.getAreaPos = function() {
    var pMgr = _chart_man.getInstance();
    var pArea = pMgr.getArea("frame0.k0.main");
    if (pArea == null) {
      this.areaPos = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
      return;
    }
    this.areaPos = {
      left: Math.floor(pArea.getLeft()),
      top: Math.floor(pArea.getTop()),
      right: Math.floor(pArea.getRight()),
      bottom: Math.floor(pArea.getBottom())
    };
  };

  CDynamicLinePlotter.prototype.Draw = function(context) {
    this.getAreaPos();
    var pMgr = _chart_man.getInstance();
    var pTDP = pMgr.getDataSource(this.getDataSourceName());
    if (pTDP == null || !iITance(pTDP, _main_data_source)) return;
    this.context.save();
    this.context.rect(
      this.areaPos.left,
      this.areaPos.top,
      this.areaPos.right - this.areaPos.left,
      this.areaPos.bottom - this.areaPos.top
    );
    this.context.clip();
    var count = pTDP.getToolObjectCount();
    for (var i = 0; i < count; i++) {
      var toolObject = pTDP.getToolObject(i);
      var state = toolObject.getState();
      switch (state) {
        case CToolObject.state.BeforeDraw:
          toolObject.getPlotter().theme = _chart_man
            .getInstance()
            .getTheme(this.getFrameName());
          toolObject.getPlotter().drawCursor(this.context);
          break;

        case CToolObject.state.Draw:
          toolObject.getPlotter().theme = _chart_man
            .getInstance()
            .getTheme(this.getFrameName());
          toolObject.getPlotter().updateDraw(this.context);
          break;

        case CToolObject.state.AfterDraw:
          toolObject.getPlotter().theme = _chart_man
            .getInstance()
            .getTheme(this.getFrameName());
          toolObject.getPlotter().finishDraw(this.context);
          break;

        default:
          break;
      }
    }
    var sel = pTDP.getSelectToolObjcet();
    if (sel != null && sel != CToolObject.state.Draw)
      sel.getPlotter().highlight(this.context);
    this.context.restore();
    return;
  };

  function KLineMouseEvent() {
    $(document).ready(function() {
      function __resize() {
        // 返回浏览器用户代理字符串，判断是否为火狐浏览器。
        if (navigator.userAgent.indexOf("Firefox") >= 0) {
          setTimeout(on_size, 200);
        } else {
          on_size();
        }
      }
      __resize();
      $(window).resize(__resize);
      $("#chart_overlayCanvas").bind("contextmenu", function(e) {
        e.cancelBubble = true;
        e.returnValue = false;
        e.preventDefault();
        e.stopPropagation();
        return false;
      });
      $("#chart_input_interface").submit(function(e) {
        e.preventDefault();
        var text = $("#chart_input_interface_text").val();
        var json_text = JSON.parse(text);
        var command = json_text.command;
        var content = json_text.content;
        switch (command) {
          case "set future list":
            _chart_man
              .getInstance()
              .getChart()
              .setFutureList(content);
            break;

          case "set current depth":
            _chart_man
              .getInstance()
              .getChart()
              .updateDepth(content);
            break;

          case "set current future":
            break;

          case "set current language":
            chart_switch_language(content);
            break;

          case "set current theme":
            break;

          default:
            break;
        }
      });
      $("#chart_dsy li").click(function() {
        $("#chart_dsy li a").removeClass("selected");
        $(this)
          .find("a")
          .addClass("selected");
        $(".chart_dropdown_data").removeClass("chart_dropdown-hover");
        $(".chart_dt_one").removeClass("chart_dropdown-hover");
        var content = $(this).attr("name");
        _chart_man
          .getInstance()
          .getChart()
          .setCurrentFuture(content);
      });
      $("#chart_container .chart_dropdown .chart_dt_one")
        .mouseover(function() {
          var container = $("#chart_container");
          var title = $(this);
          var dropdown = title.next();
          var containerLeft = container.offset().left;
          var titleLeft = title.offset().left;
          var containerWidth = container.width();
          var titleWidth = title.width();
          var dropdownWidth = dropdown.width();
          var d = ((dropdownWidth - titleWidth) / 2) << 0;
          if (titleLeft - d < containerLeft + 4) {
            d = titleLeft - containerLeft - 4;
          } else if (
            titleLeft + titleWidth + d >
            containerLeft + containerWidth - 4
          ) {
            d +=
              titleLeft +
              titleWidth +
              d -
              (containerLeft + containerWidth - 4) +
              19;
          } else {
            d += 4;
          }
          dropdown.css({
            "margin-left": -d
          });
          title.addClass("chart_dropdown-hover");
          dropdown.addClass("chart_dropdown-hover");
        })
        .mouseout(function() {
          $(this)
            .next()
            .removeClass("chart_dropdown-hover");
          $(this).removeClass("chart_dropdown-hover");
        });
      $(".chart_dropdown_data")
        .mouseover(function() {
          $(this).addClass("chart_dropdown-hover");
          $(this)
            .prev()
            .addClass("chart_dropdown-hover");
        })
        .mouseout(function() {
          $(this)
            .prev()
            .removeClass("chart_dropdown-hover");
          $(this).removeClass("chart_dropdown-hover");
        });
      $("#chart_btn_parameter_settings").click(function() {
        $("#chart_parameter_settings").addClass("clicked");
        $(".chart_dropdown_data").removeClass("chart_dropdown-hover");
        $("#chart_parameter_settings")
          .find("th")
          .each(function() {
            var name = $(this).html();
            var index = 0;
            var tmp = ChartSettings.get();
            var value = tmp.indics[name];
            $(this.nextElementSibling)
              .find("input")
              .each(function() {
                if (value != null && index < value.length) {
                  $(this).val(value[index]);
                }
                index++;
              });
          });
      });
      $("#close_settings").click(function() {
        $("#chart_parameter_settings").removeClass("clicked");
      });
      $("#chart_container .chart_tt a").click(function() {
        switch_period(
          $(this)
            .parent()
            .attr("name")
        );
      });
      $("#chart_show_tools").click(function() {
        if ($(this).hasClass("selected")) {
          switch_tools("off");
        } else {
          switch_tools("on");
        }
      });
      $("#C_tp .C_tp_button").click(function() {
        $(".chart_dropdown_data").removeClass("chart_dropdown-hover");
        $("#C_tp .C_tp_button").removeClass("selected");
        $(this).addClass("selected");
        var name = $(this)
          .children()
          .attr("name");
        _Global.chartMgr.setRunningMode(_chart_man.DrawingTool[name]);
      });
      $("#chart_si").click(function() {
        if ($(this).hasClass("selected")) {
          switch_indic("off");
        } else {
          switch_indic("on");
        }
      });
      $("#chart_tabbar li a").click(function() {
        $("#chart_tabbar li a").removeClass("selected");
        $(this).addClass("selected");
        var name = $(this).attr("name");
        var tmp = ChartSettings.get();
        tmp.charts.indics[1] = name;
        ChartSettings.save();
        if (Template.displayVolume == false)
          _chart_man
            .getInstance()
            .getChart()
            .set_indtor(1, name);
        else
          _chart_man
            .getInstance()
            .getChart()
            .set_indtor(2, name);
      });
      $("#chart_select_chart_style a").click(function() {
        $("#chart_select_chart_style a").removeClass("selected");
        $(this).addClass("selected");
        var tmp = ChartSettings.get();
        tmp.charts.chartStyle = $(this)[0].innerHTML;
        ChartSettings.save();
        var mgr = _chart_man.getInstance();
        mgr.setChartStyle("frame0.k0", $(this).html());
        mgr.redraw("All", true);
      });
      $("#chart_dropdown_themes li").click(function() {
        $("#chart_dropdown_themes li a").removeClass("selected");
        var name = $(this).attr("name");
        if (name == "chart_themes_dark") {
          switch_theme("dark");
        } else if (name == "chart_themes_light") {
          switch_theme("light");
        }
      });
      $("#chart_select_main__indtor a").click(function() {
        $("#chart_select_main__indtor a").removeClass("selected");
        $(this).addClass("selected");
        var name = $(this).attr("name");
        var tmp = ChartSettings.get();
        tmp.charts.mIndic = name;
        ChartSettings.save();
        var mgr = _chart_man.getInstance();
        if (!mgr.setMain_indtor("frame0.k0", name))
          mgr.removeMain_indtor("frame0.k0");
        mgr.redraw("All", true);
      });
      $("#chart_tSkin a").click(function() {
        $("#chart_tSkin a").removeClass("selected");
        if ($(this).attr("name") == "dark") {
          switch_theme("dark");
        } else if ($(this).attr("name") == "light") {
          switch_theme("light");
        }
      });
      $("#chart_select_theme li a").click(function() {
        $("#chart_select_theme a").removeClass("selected");
        if ($(this).attr("name") == "dark") {
          switch_theme("dark");
        } else if ($(this).attr("name") == "light") {
          switch_theme("light");
        }
      });
      $("#chart_enable_tools li a").click(function() {
        $("#chart_enable_tools a").removeClass("selected");
        if ($(this).attr("name") == "on") {
          switch_tools("on");
        } else if ($(this).attr("name") == "off") {
          switch_tools("off");
        }
      });
      $("#chart_enabl_new_indtor li a").click(function() {
        $("#chart_enabl_new_indtor a").removeClass("selected");
        if ($(this).attr("name") == "on") {
          switch_indic("on");
        } else if ($(this).attr("name") == "off") {
          switch_indic("off");
        }
      });
      $(document).keyup(function(e) {
        if (e.keyCode == 46) {
          _chart_man.getInstance().deleteToolObject();
          _chart_man.getInstance().redraw("OverlayCanvas", false);
        }
      });
      $("#chart_overlayCanvas")
        .mousemove(function(e) {
          var r = e.target.getBoundingClientRect();
          var x = e.clientX - r.left;
          var y = e.clientY - r.top;
          var mgr = _chart_man.getInstance();
          if (_Global.button_down == true) {
            mgr.onMouseMove("frame0", x, y, true);
            mgr.redraw("All", true);
          } else {
            mgr.onMouseMove("frame0", x, y, false);
            mgr.redraw("OverlayCanvas");
          }
        })
        .mouseleave(function(e) {
          var r = e.target.getBoundingClientRect();
          var x = e.clientX - r.left;
          var y = e.clientY - r.top;
          var mgr = _chart_man.getInstance();
          mgr.onMouseLeave("frame0", x, y, false);
          mgr.redraw("OverlayCanvas");
        })
        .mouseup(function(e) {
          if (e.which != 1) {
            return;
          }
          _Global.button_down = false;
          var r = e.target.getBoundingClientRect();
          var x = e.clientX - r.left;
          var y = e.clientY - r.top;
          var mgr = _chart_man.getInstance();
          mgr.onMouseUp("frame0", x, y);
          mgr.redraw("All", true);
        })
        .mousedown(function(e) {
          if (e.which != 1) {
            _chart_man.getInstance().deleteToolObject();
            _chart_man.getInstance().redraw("OverlayCanvas", false);
            return;
          }
          _Global.button_down = true;
          var r = e.target.getBoundingClientRect();
          var x = e.clientX - r.left;
          var y = e.clientY - r.top;
          _chart_man.getInstance().onMouseDown("frame0", x, y);
        });
      $("#chart_parameter_settings :input").change(function() {
        var name = $(this).attr("name");
        var index = 0;
        var valueArray = [];
        var mgr = _chart_man.getInstance();
        $("#chart_parameter_settings :input").each(function() {
          if ($(this).attr("name") == name) {
            if (
              $(this).val() != "" &&
              $(this).val() != null &&
              $(this).val() != undefined
            ) {
              var i = parseInt($(this).val());
              valueArray.push(i);
            }
            index++;
          }
        });
        if (valueArray.length != 0) {
          mgr.set_indtorParameters(name, valueArray);
          var value = mgr.get_indtorParameters(name);
          var cookieArray = [];
          index = 0;
          $("#chart_parameter_settings :input").each(function() {
            if ($(this).attr("name") == name) {
              if (
                $(this).val() != "" &&
                $(this).val() != null &&
                $(this).val() != undefined
              ) {
                $(this).val(value[index].getValue());
                cookieArray.push(value[index].getValue());
              }
              index++;
            }
          });
          var tmp = ChartSettings.get();
          tmp.indics[name] = cookieArray;
          ChartSettings.save();
          mgr.redraw("All", true);
        }
      });
      $("#chart_parameter_settings button").click(function() {
        var name = $(this)
          .parents("tr")
          .children("th")
          .html();
        var index = 0;
        var value = _chart_man.getInstance().get_indtorParameters(name);
        var valueArray = [];
        $(this)
          .parent()
          .prev()
          .children("input")
          .each(function() {
            if (value != null && index < value.length) {
              $(this).val(value[index].getDefValue());
              valueArray.push(value[index].getDefValue());
            }
            index++;
          });
        _chart_man.getInstance().set_indtorParameters(name, valueArray);
        var tmp = ChartSettings.get();
        tmp.indics[name] = valueArray;
        ChartSettings.save();
        _chart_man.getInstance().redraw("All", false);
      });
    });
  }

  var refresh_counter = 0;

  var refresh_handler = setInterval(refresh_function, 1e3);

  function refresh_function() {
    refresh_counter++;
    var lang = _chart_man.getInstance().getLanguage();
    if (refresh_counter > 3600) {
      var num = new Number(refresh_counter / 3600);
      if (lang == "en") {
        $("#chart_updated_time_text").html(num.toFixed(0) + "h");
      } else {
        $("#chart_updated_time_text").html(num.toFixed(0) + "小时");
      }
    } else if (refresh_counter > 60 && refresh_counter <= 3600) {
      var num = new Number(refresh_counter / 60);
      if (lang == "en") {
        $("#chart_updated_time_text").html(num.toFixed(0) + "m");
      } else {
        $("#chart_updated_time_text").html(num.toFixed(0) + "分钟");
      }
    } else if (refresh_counter <= 60) {
      if (lang == "en") {
        $("#chart_updated_time_text").html(refresh_counter + "s");
      } else {
        $("#chart_updated_time_text").html(refresh_counter + "秒");
      }
    }
  }

  function clear_refresh_counter() {
    window.clearInterval(refresh_handler);
    refresh_counter = 0;
    var lang = _chart_man.getInstance().getLanguage();
    if (lang == "en") {
      $("#chart_updated_time_text").html(refresh_counter + "s");
    } else {
      $("#chart_updated_time_text").html(refresh_counter + "秒");
    }
    refresh_handler = setInterval(refresh_function, 1e3);
  }
  function AbortRequest() {
    if (_Global.ghReqest && _Global.ghReqest.readyState != 4) {
      _Global.ghReqest.abort();
    }
  }

  function TwoSecondThread() {
    var f = _Global.chartMgr.getDataSource("frame0.k0").getLastDate();
    if (f == -1) {
      _Global.rParam = setHttpRequestParam(
        _Global.mark_from,
        _Global.time_type,
        "1000",
        null
      );
    } else {
      _Global.rParam = setHttpRequestParam(
        _Global.mark_from,
        _Global.time_type,
        null,
        f.toString()
      );
    }
    RequestData();
  }

  function readCookie() {
    ChartSettings.get();
    ChartSettings.save();
    var tmp = ChartSettings.get();
    _chart_man.getInstance().setChartStyle("frame0.k0", tmp.charts.chartStyle);
    var period = tmp.charts.period;
    switch_period(period);
    $("#C_" + period + " a").addClass("selected");
    if (tmp.charts.indicsStatus == "close") {
      switch_indic("off");
    } else if (tmp.charts.indicsStatus == "open") {
      switch_indic("on");
    }
    var main_indic = $("#chart_select_main__indtor");
    main_indic.find("a").each(function() {
      if ($(this).attr("name") == tmp.charts.mIndic) {
        $(this).addClass("selected");
      }
    });
    var chart_style = $("#chart_select_chart_style");
    chart_style.find("a").each(function() {
      if ($(this)[0].innerHTML == tmp.charts.chartStyle) {
        $(this).addClass("selected");
      }
    });
    _chart_man
      .getInstance()
      .getChart()
      .setMain_indtor(tmp.charts.mIndic);
    _chart_man.getInstance().setThemeName("frame0", tmp.theme);
    switch_tools("off");
    if (tmp.theme == "Dark") {
      switch_theme("dark");
    } else if (tmp.theme == "Light") {
      switch_theme("light");
    }
  }

  var main = (function() {
    window.onPushingStarted = function(callback) {
      Pushing.Start(callback);
    };
    window.onPushingResponse = function(marketFrom, type, coinVol, data) {
      Pushing.Response(marketFrom, type, coinVol, data);
    };
    window.onPushingStop = function() {
      Pushing.Stop();
    };
    window._KlineIndex = function(content) {
      Template.displayVolume = false;
      refreshTemplate();
      readCookie();
      if (content == 0)
        _chart_man
          .getInstance()
          .getChart()
          .setKlineIndex("17");
      else if (content == 3)
        _chart_man
          .getInstance()
          .getChart()
          .setKlineIndex("18");
      else return;
    };
    window._display_future_list = function() {
      $("#chart_dsy")[0].style.display = "block";
    };
    window._set_current_language = function(content) {
      chart_switch_language(content);
    };
    window._set_current_depth = function(content) {
      _chart_man
        .getInstance()
        .getChart()
        .updateDepth(content);
    };
    window._set_current_coin = function(content) {
      _chart_man
        .getInstance()
        .getChart()
        .setCurrentCoin(content);
    };
    window._set_current_url = function(content) {
      _Global.url = content;
    };
    window._set_future_list = function(content) {
      _chart_man
        .getInstance()
        .getChart()
        .setFutureList(content);
    };
    window._set_current_future = function(contractID) {
      _chart_man
        .getInstance()
        .getChart()
        .setCurrentFuture(contractID);
    };
    window._set_init_current_future = function(contractID) {
      _chart_man
        .getInstance()
        .getChart()
        .setCurrentFutureNoRaise(contractID);
    };
    window._set_current_contract_unit = function(str) {
      _chart_man
        .getInstance()
        .getChart()
        .setCurrentContractUnit(str);
    };
    window._set_money_type = function(str) {
      _chart_man
        .getInstance()
        .getChart()
        .setCurrentMoneyType(str);
    };
    window._set_usd_cny_rate = function(rate) {
      _chart_man.getInstance().getChart()._usd_cny_rate = rate;
    };
    window._setCaptureMouseWheelDirectly = function(b) {
      _chart_man.getInstance().setCaptureMouseWheelDirectly(b);
    };
    window._current_future_change = new mEves();
    window._current_theme_change = new mEves();
    /*
         window._current_future_change.addHandler(o, func);
         window._current_theme_change.addHandler(o, func);
         window._current_future_change.raise(content);
         window._current_theme_change.raise(content);
         */
    chart_switch_language(def.lang);
    KLineMouseEvent();
    _chart_man
      .getInstance()
      .bindCanvas("main", document.getElementById("chart_mainCanvas"));
    _chart_man
      .getInstance()
      .bindCanvas("overlay", document.getElementById("chart_overlayCanvas"));
    _Global.rParam = "marketFrom=13" + "&type=2" + "&limit=1000";
    _Global.mark_from = "13";
    _Global.time_type = "2";
    _Global.limit = "1000";
    refreshTemplate();
    on_size();
    readCookie();
    $("#chart_container").css({
      visibility: "visible"
    });
  })();

  function setHttpRequestParam(mark_from, time_type, limit, since) {
    var str = "marketFrom=" + mark_from + "&type=" + time_type;
    if (limit != null) str += "&limit=" + limit;
    else str += "&since=" + since;
    switch (_chart_man.getInstance().getChart()._contract_unit) {
      case 0:
        str += "&coinVol=1";
        break;

      case 1:
        str += "&coinVol=0";
        break;
    }
    return str;
  }

  function refreshTemplate() {
    _Global.chartMgr = DefaultTemplate.loadTemplate(
      "frame0.k0",
      "行情图" + _Global.mark_from + _Global.time_type,
      "frame0.order",
      "0.order",
      "frame0.trade",
      "0.trade"
    );
    _chart_man.getInstance().redraw("All", true);
  }

  function getRectCrossPt(rect, startPt, endPt) {
    var crossPt;
    var firstPt = {
      x: -1,
      y: -1
    };
    var secondPt = {
      x: -1,
      y: -1
    };
    var xdiff = endPt.x - startPt.x;
    var ydiff = endPt.y - startPt.y;
    if (Math.abs(xdiff) < 2) {
      firstPt = {
        x: startPt.x,
        y: rect.top
      };
      secondPt = {
        x: endPt.x,
        y: rect.bottom
      };
      crossPt = [firstPt, secondPt];
      return crossPt;
    }
    var k = ydiff / xdiff;
    secondPt.x = rect.right;
    secondPt.y = startPt.y + (rect.right - startPt.x) * k;
    firstPt.x = rect.left;
    firstPt.y = startPt.y + (rect.left - startPt.x) * k;
    crossPt = [firstPt, secondPt];
    return crossPt;
  }

  function chart_switch_language(lang) {
    var item;
    for (var i = 0; i < lan[lang].kTxt.length; i++) {
      item = lan[lang].kTxt[i];
      $("." + item[0]) && $("." + item[0]).text(item[1]);
    }
    _chart_man.getInstance().setLanguage(lang);
    _chart_man
      .getInstance()
      .getChart()
      .setTitle();
  }

  function on_size() {
    // var width = window.innerWidth;
    var width = 738;
    // var height = window.innerHeight;
    var height = 454;
    // 屏幕全部元素内容
    var container = $("#chart_container");
    container.css({
      width: width + "px",
      height: height + "px"
    });
    // 定义屏幕中四大块元素。
    // 上方工具栏
    var toolBar = $("#chart_toolbar");
    // 划线工具栏
    var toolPanel = $("#C_tp");
    // 画布
    var canvasGroup = $("#chart_canvasGroup");
    // 底栏（技术指标）
    var tabBar = $("#chart_tabbar");
    // 划线工具栏和底栏的隐藏状态
    var toolPanelShown = toolPanel[0].style.display != "inline" ? false : true;
    var tabBarShown = tabBar[0].style.display != "block" ? false : true;
    // 各个模块长宽数据以及定位数据
    var toolBarRect = {};
    toolBarRect.x = 0;
    toolBarRect.y = 0;
    toolBarRect.w = width;
    toolBarRect.h = 29;
    var toolPanelRect = {};
    toolPanelRect.x = 0;
    toolPanelRect.y = toolBarRect.h + 1;
    toolPanelRect.w = toolPanelShown ? 32 : 0;
    toolPanelRect.h = height - toolPanelRect.y;
    var tabBarRect = {};
    tabBarRect.w = toolPanelShown ? width - (toolPanelRect.w + 1) : width;
    tabBarRect.h = tabBarShown ? 22 : -1;
    tabBarRect.x = width - tabBarRect.w;
    tabBarRect.y = height - (tabBarRect.h + 1);
    var canvasGroupRect = {};
    canvasGroupRect.x = tabBarRect.x;
    canvasGroupRect.y = toolPanelRect.y;
    canvasGroupRect.w = tabBarRect.w;
    canvasGroupRect.h = tabBarRect.y - toolPanelRect.y;
    toolBar.css({
      left: toolBarRect.x + "px",
      top: toolBarRect.y + "px",
      width: toolBarRect.w + "px",
      height: toolBarRect.h + "px"
    });
    if (toolPanelShown) {
      toolPanel.css({
        left: toolPanelRect.x + "px",
        top: toolPanelRect.y + "px",
        width: toolPanelRect.w + "px",
        height: toolPanelRect.h + "px"
      });
    }
    canvasGroup.css({
      left: canvasGroupRect.x + "px",
      top: canvasGroupRect.y + "px",
      width: canvasGroupRect.w + "px",
      height: canvasGroupRect.h + "px"
    });
    // 主画布以及覆盖画布
    var mainCanvas = $("#chart_mainCanvas")[0];
    var overlayCanvas = $("#chart_overlayCanvas")[0];
    mainCanvas.width = canvasGroupRect.w;
    mainCanvas.height = canvasGroupRect.h;
    overlayCanvas.width = canvasGroupRect.w;
    overlayCanvas.height = canvasGroupRect.h;
    if (tabBarShown) {
      tabBar.css({
        left: tabBarRect.x + "px",
        top: tabBarRect.y + "px",
        width: tabBarRect.w + "px",
        height: tabBarRect.h + "px"
      });
    }
    var dlgSettings = $("#chart_parameter_settings");
    dlgSettings.css({
      left: (width - dlgSettings.width()) >> 1,
      top: (height - dlgSettings.height()) >> 1
    });
    // “正在读取数据...” Loading
    var dlgLoading = $("#C_loading");
    dlgLoading.css({
      left: (width - dlgLoading.width()) >> 1,
      top: (height - dlgLoading.height()) >> 2
    });
    var domElemCache = $("#chart_dom_elem_cache");
    var rowTheme = $("#chart_select_theme")[0];
    var rowTools = $("#chart_enable_tools")[0];
    var rowIndic = $("#chart_enabl_new_indtor")[0];
    var dropDownSymbols = $("#chart_dsy");
    var periodsVert = $("#chart_toolbar_periods_vert");
    var periodsHorz = $("#chart_tph")[0];
    var showIndic = $("#chart_si")[0];
    var showTools = $("#chart_show_tools")[0];
    var selectTheme = $("#chart_tSkin")[0];
    var dropDownSettings = $("#chart_tset");
    var dropDownSymbolsNW = 4 + 20;
    var periodsVertNW = dropDownSymbolsNW + 10;
    var periodsHorzNW = periodsVertNW + periodsHorz.offsetWidth;
    var showIndicNW = periodsHorzNW + showIndic.offsetWidth + 4;
    var showToolsNW = showIndicNW + showTools.offsetWidth + 4;
    var selectThemeNW = showToolsNW + 10;
    var dropDownSettingsW = 10 + 128;
    dropDownSymbolsNW += dropDownSettingsW;
    periodsVertNW += dropDownSettingsW;
    periodsHorzNW += dropDownSettingsW;
    showIndicNW += dropDownSettingsW;
    showToolsNW += dropDownSettingsW;
    selectThemeNW += dropDownSettingsW;
    if (width < periodsHorzNW) {
      domElemCache.append(periodsHorz);
    } else {
      periodsVert.after(periodsHorz);
    }
    if (width < showIndicNW) {
      domElemCache.append(showIndic);
    } else {
      dropDownSettings.before(showIndic);
    }
    if (width < showToolsNW) {
      domElemCache.append(showTools);
    } else {
      dropDownSettings.before(showTools);
    }
    if (width < selectThemeNW) {
      domElemCache.append(selectTheme);
    } else {
      dropDownSettings.before(selectTheme);
    }
    _chart_man.getInstance().redraw("All", true);
  }

  function mouseWheel(e, delta) {
    _chart_man.getInstance().scale(delta > 0 ? 1 : -1);
    _chart_man.getInstance().redraw("All", true);
    return false;
  }

  function switch_theme(name) {
    name = def.skin;
    $("#chart_tSkin a").removeClass("selected");
    $("#chart_select_theme a").removeClass("selected");
    if (name == "dark") {
      $("#chart_tSkin")
        .find("a")
        .each(function() {
          if ($(this).attr("name") == "dark") {
            $(this).addClass("selected");
          }
        });
      $("#chart_select_theme a").each(function() {
        if ($(this).attr("name") == "dark") {
          $(this).addClass("selected");
        }
      });
      $("#chart_container").attr("class", "dark");
      $("#kline_logo").removeClass("kline_logo_weight");
      $("#kline_logo").addClass("kline_logo_black");
      _chart_man.getInstance().setThemeName("frame0", "Dark");
      var tmp = ChartSettings.get();
      tmp.theme = "Dark";
      ChartSettings.save();
      $("#chart_canvasGroup").removeClass("cg_white");
      $("#chart_canvasGroup").addClass("cg_black");
    } else if (name == "light") {
      $("#chart_tSkin")
        .find("a")
        .each(function() {
          if ($(this).attr("name") == "light") {
            $(this).addClass("selected");
          }
        });
      $("#chart_select_theme a").each(function() {
        if ($(this).attr("name") == "light") {
          $(this).addClass("selected");
        }
      });
      $("#chart_container").attr("class", "light");
      $("#kline_logo").removeClass("kline_logo_black");
      $("#kline_logo").addClass("kline_logo_weight");
      _chart_man.getInstance().setThemeName("frame0", "Light");
      var tmp = ChartSettings.get();
      tmp.theme = "Light";
      ChartSettings.save();
      $("#chart_canvasGroup").removeClass("cg_black");
      $("#chart_canvasGroup").addClass("cg_white");
    }
    var a = {};
    a.command = "set current theme";
    a.content = name;
    $("#chart_output_interface_text").val(JSON.stringify(a));
    $("#chart_output_interface_submit").submit();
    window._current_theme_change.raise(name);
    _chart_man.getInstance().redraw();
  }

  function switch_tools(name) {
    $(".chart_dropdown_data").removeClass("chart_dropdown-hover");
    $("#C_tp .C_tp_button").removeClass("selected");
    $("#chart_enable_tools a").removeClass("selected");
    if (name == "on") {
      $("#chart_show_tools").addClass("selected");
      $("#chart_enable_tools a").each(function() {
        if ($(this).attr("name") == "on") {
          $(this).addClass("selected");
        }
      });
      $("#C_tp")[0].style.display = "inline";
      if (
        _chart_man.getInstance()._drawingTool == _chart_man.DrawingTool.Cursor
      ) {
        $("#chart_Cursor")
          .parent()
          .addClass("selected");
      } else if (
        _chart_man.getInstance()._drawingTool ==
        _chart_man.DrawingTool.CrossCursor
      ) {
        $("#chart_CrossCursor")
          .parent()
          .addClass("selected");
      }
    } else if (name == "off") {
      $("#chart_show_tools").removeClass("selected");
      $("#chart_enable_tools a").each(function() {
        if ($(this).attr("name") == "off") {
          $(this).addClass("selected");
        }
      });
      $("#C_tp")[0].style.display = "none";
      _chart_man
        .getInstance()
        .setRunningMode(_chart_man.getInstance()._beforeDrawingTool);
      _chart_man.getInstance().redraw("All", true);
    }
    on_size();
  }

  function switch_indic(name) {
    $("#chart_enabl_new_indtor a").removeClass("selected");
    if (name == "on") {
      $("#chart_enabl_new_indtor a").each(function() {
        if ($(this).attr("name") == "on") {
          $(this).addClass("selected");
        }
      });
      $("#chart_si").addClass("selected");
      var tmp = ChartSettings.get();
      tmp.charts.indicsStatus = "open";
      ChartSettings.save();
      var value = tmp.charts.indics[1];
      if (Template.displayVolume == false)
        _chart_man
          .getInstance()
          .getChart()
          .set_indtor(2, value);
      else
        _chart_man
          .getInstance()
          .getChart()
          .set_indtor(2, value);
      $("#chart_tabbar")
        .find("a")
        .each(function() {
          if ($(this).attr("name") == value) $(this).addClass("selected");
        });
      $("#chart_tabbar")[0].style.display = "block";
    } else if (name == "off") {
      $("#chart_enabl_new_indtor a").each(function() {
        if ($(this).attr("name") == "off") {
          $(this).addClass("selected");
        }
      });
      $("#chart_si").removeClass("selected");
      _chart_man
        .getInstance()
        .getChart()
        .set_indtor(2, "NONE");
      var tmp = ChartSettings.get();
      tmp.charts.indicsStatus = "close";
      ChartSettings.save();
      $("#chart_tabbar")[0].style.display = "none";
      $("#chart_tabbar a").removeClass("selected");
    }
    on_size();
  }

  function switch_period(name) {
    $("#chart_container .chart_tt a").removeClass("selected");
    $("#chart_toolbar_periods_vert ul a").removeClass("selected");
    $("#chart_container .chart_tt a").each(function() {
      if (
        $(this)
          .parent()
          .attr("name") == name
      ) {
        $(this).addClass("selected");
      }
    });
    $("#chart_toolbar_periods_vert ul a").each(function() {
      if (
        $(this)
          .parent()
          .attr("name") == name
      ) {
        $(this).addClass("selected");
      }
    });
    //console.log(name);
    _Global.period = name;
    _chart_man.getInstance().showCursor();
    calcPeriodWeight(name);
    name == "line" ? (isLine = name) : (isLine = null);
    lastTimeS && tradJs.request_req();
  }

  function IsSupportedBrowers() {
    function isCanvasSupported() {
      var elem = document.createElement("canvas");
      return !!(elem.getContext && elem.getContext("2d"));
    }
    if (!isCanvasSupported()) return false;
    return true;
  }

  function calcPeriodWeight(period) {
    var index = period;
    if (period != "line") index = _Global.pMap[_Global.tagMapPeriod[period]];
    var period_weight = ChartSettings.get().charts.period_weight;
    for (var i in period_weight) {
      if (period_weight[i] > period_weight[index]) {
        period_weight[i] -= 1;
      }
    }
    period_weight[index] = 8;
    ChartSettings.save();
    $("#chart_tph")
      .find("li")
      .each(function() {
        var a = $(this).attr("name");
        var i = a;
        if (a != "line") i = _Global.pMap[_Global.tagMapPeriod[a]];
        if (period_weight[i] == 0) {
          $(this).css("display", "none");
        } else {
          $(this).css("display", "inline-block");
        }
      });
  }
}

// tv -end

var tradJs = {
  init: function() {
    this.market = "";
    this.symbolList = [];
    this.symbolOBJ = {};
    this.sdnum = "0";
    this.isUnsub = false;
    this.isChart = false;
    this.isLogin = $("#userLoginEd").length === 1 ? true : false;
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
      m: localStorage.getItem("m") || false,
      s: localStorage.getItem("s") || false
    };
    this.doNext = null;
    this.nextNum = 1;
    this.clockClick = true;
    this.swidthKline = 1;
    this.event();
    this.marketTitle();
    // this.initDom()
    this.marketWs();
  },
  event: function() {
    var _this = this;

    $("input").focus(function() {
      $(this).css("border", "1px solid #7496e6");
    });
    $("input").blur(function() {
      $(this).css("border", "");
    });
    // 筛选市场
    $("#market-search").on("input propertychange", function(e) {
      var key = $(this)
        .val()
        .toUpperCase();
      var textDom = $(".market-box .tr-mName s");
      for (var i = textDom.length - 1; i >= 0; i--) {
        var text = $(textDom[i]).text();
        if (text.indexOf(key) === -1) {
          $(textDom[i])
            .parents("li")
            .hide();
        } else {
          $(textDom[i])
            .parents("li")
            .show();
        }
      }
    });
    // 自选货币对
    $(document).on("click", ".market-box .tr-mName i", function(e) {
      var _target = $(e.target),
        _targetName = _target.next("s").attr("data");
      var myMarket = localStorage.getItem("myMarket")
        ? localStorage.getItem("myMarket").split(",")
        : [];
      if (_target.hasClass("select-mini")) {
        _target.addClass("select-ed");
        _target.removeClass("select-mini");
        myMarket.push(_targetName);
        localStorage.setItem("myMarket", myMarket);
      } else {
        _target.addClass("select-mini");
        _target.removeClass("select-ed");
        myMarket = myMarket.filter(function(item, index, array) {
          return item != _targetName;
        });
        localStorage.setItem("myMarket", myMarket);
        if (_this.market === "select") {
          _target.parents("tr").remove();
        }
      }
    });
    // 切换市场
    $(document).on("click", ".tr-tabs li", function(e) {
      if (_this.symbolList.length) {
        _this.marketSend("unsub");
        _this.symbolList = [];
      }
      var _target = $(e.currentTarget);
      _this.market = _target.attr("id").split("-")[1];
      $(".tr-tabs li").removeClass("selected");
      _target.addClass("selected");
      $(".select-more .type-more s")
        .eq(0)
        .trigger("click");
      _this.marketList();
    });
    // 渲染价格
    $(document).on("click", ".tr-mPrice", function(e) {
      if (!_this.isLogin) return;
      var _target = $(e.currentTarget);
      var val = parseFloat(_target.find(".show-def").text());
      $("#getCountPrice")
        .val(_target.find(".show-def").text())
        .change();
      $("#getBasePrice")
        .val(_target.find(".show-def").text())
        .change();
      _this.inputPriceBuy = val;
      _this.inputPriceSell = val;
    });
    // 切换涨跌&成交量
    $(document).on("click", ".select-more", function(e) {
      var _targetTith = $(e.currentTarget);
      var _target = $(e.target);
      if (_target.parent("p.type-more").hasClass("type-more")) {
        $(".select-more .res-text").text(_target.text());
        $(".select-more").attr(_target.attr("data-name"));
        $(".type-more").hide();
        if (_target.attr("data-name") === "rose") {
          $(".select-more .rose_icon").show();
          $(".tr-mZdvol")
            .find(".tr-rose")
            .show();
          $(".tr-mZdvol")
            .find(".tr-vol")
            .hide();
        } else if (_target.attr("data-name") === "vol") {
          $(".select-more .rose_icon").hide();
          $(".tr-mZdvol")
            .find(".tr-vol")
            .show();
          $(".tr-mZdvol")
            .find(".tr-rose")
            .hide();
        }
      } else {
        if (
          $(".type-more")
            .attr("style")
            .indexOf("none") > -1
        ) {
          $(".type-more").show();
        } else {
          $(".type-more").hide();
        }
      }
    });
    // 切换货币对
    $(document).on("click", ".market-box .tr-mName s", function(e) {
      // 是否切换过市场
      if (_this.isUnsub === true) {
        _this.pageSend("unsub");
        _this.pageSendnewDeal("unsub");
        _this.pageSendDepth("unsub");
        isTreadingView === "0" && _this.subData("unsub");
        isTreadingView === "1" && _this.subDataTv("unsub");
        if (_this.sdnum != "0") {
          _this.sdnum = "0";
          _this.pageSendDepth("unsub");
        }
        _this.isChart = false;
      } else {
        _this.isUnsub = true;
      }
      var _target = $(e.currentTarget);
      var symbolName = _target.attr("data");
      _this.symbolOBJ = {
        symbol: _target
          .parents("li")
          .attr("id")
          .split("-")[1],
        symbolN: symbolName,
        symbolA: symbolName.split("/")[0],
        symbolB: symbolName.split("/")[1],
        price:
          _w_.ruleD[
            _target
              .parents("li")
              .attr("id")
              .split("-")[1]
          ].price,
        volume:
          _w_.ruleD[
            _target
              .parents("li")
              .attr("id")
              .split("-")[1]
          ].volume,
        depth:
          _w_.ruleD[
            symbolName.split("/")[0].toLowerCase() +
              symbolName.split("/")[1].toLowerCase()
          ].depth
      };

      $("#changDepth").html(
        '<option value="0">' +
          _this.symbolOBJ.depth.split(",")[0] +
          '</option>\
              <option value="1">' +
          _this.symbolOBJ.depth.split(",")[1] +
          '</option>\
              <option value="2">' +
          _this.symbolOBJ.depth.split(",")[2] +
          "</option>"
      );

      if ($(".tab-xj").hasClass("selected")) {
        //指定文案
        $("#getCountCoin").attr(
          "placeholder",
          xjmrMsg + "(" + _this.symbolOBJ.symbolA + ")"
        );
        $("#getBaseCoin").attr(
          "placeholder",
          xjmcMsg + "(" + _this.symbolOBJ.symbolA + ")"
        );
      }
      if ($(".tab-sj").hasClass("selected")) {
        $("#getCountCoin").attr(
          "placeholder",
          sjmrMsg + "(" + _this.symbolOBJ.symbolB.toUpperCase() + ")"
        );
        $("#getBaseCoin").attr(
          "placeholder",
          sjmcMsg + "(" + _this.symbolOBJ.symbolA.toUpperCase() + ")"
        );
      }
      //指定买入和卖出价格文案
      $("#getCountPrice").attr(
        "placeholder",
        mrjgMsg + "(" + _this.symbolOBJ.symbolB.toUpperCase() + ")"
      );
      $("#getBasePrice").attr(
        "placeholder",
        mcjgMsg + "(" + _this.symbolOBJ.symbolB.toUpperCase() + ")"
      );

      $(".market-box li").removeClass("selected");
      _target.parents("li").addClass("selected");
      _this.pageSend("sub");
      _this.pageSendDepth("sub");
      if (isTreadingView === "0") {
        _this.request_req();
      } else if (isTreadingView === "1") {
        _GlobalTV.name = _this.symbolOBJ.symbol;
        _GlobalTV._KData = [];
        openTradeview();
        // treading_req()
      }
      _this.eachartDef();
      _this.initDom();

      $(".tr-top")
        .find(".tr-top-title")
        .text(_this.symbolOBJ.symbolN);
      $(".newDel-list .tr-list-title .tr-mPrice")
        .find("s")
        .text(_this.symbolOBJ.symbolB);
      $(".newDel-list .tr-list-title .tr-mZdvol")
        .find("s")
        .text(_this.symbolOBJ.symbolA);
      $(".depth-list .tr-list-title .tr-mName")
        .find("s")
        .text(_this.symbolOBJ.symbolA);
      $(".depth-list .tr-list-title .tr-mPrice")
        .find("s")
        .text(_this.symbolOBJ.symbolB);
      $(".depth-list .tr-list-title .tr-mZdvol")
        .find("s")
        .text(_this.symbolOBJ.symbolA);
      $(".thisSymbolA").text(_this.symbolOBJ.symbolA);
      $(".button-jy s").text(" " + _this.symbolOBJ.symbolA);
      $(".newDel-box")
        .find("li")
        .removeAttr("class")
        .find("span")
        .text("--");
      $(".depth-sell")
        .find("span")
        .text("--");
      $(".depth-buy")
        .find("span")
        .text("--");
      $(".tr-newPrice").html("--");

      _this.defmarket = {
        m: localStorage.setItem(
          "m",
          $(".market-title li.selected")
            .attr("id")
            .split("-")[1]
        ),
        s: localStorage.setItem(
          "s",
          _target
            .parents("li")
            .attr("id")
            .split("-")[1]
        )
      };
    });
    // 切换深度
    $("#changDepth").on("change", function() {
      var num = $("#changDepth")
        .find("option:selected")
        .val();
      if (_this.sdnum !== "0" && _this.sdnum != num) {
        _this.pageSendDepth("unsub");
        _this.sdnum = num;
        _this.pageSendDepth("sub");
      } else if (_this.sdnum === "0" && _this.sdnum != num) {
        _this.sdnum = num;
        _this.pageSendDepth("sub");
      }
    });
    // 切换深度图展示种类
    $(".switch-list i").on("click", function(e) {
      var _target = $(e.currentTarget);
      $(".depth-buy")
        .removeClass("hideHieght")
        .removeClass("showBuy")
        .removeClass("heightDef")
        .scrollTop(0);
      $(".depth-sell")
        .removeClass("hideHieght")
        .removeClass("showSell")
        .removeClass("heightDef");
      $(".depth-sell ul").removeClass("heightDef");
      if (_target.hasClass("switch-red")) {
        $(".depth-buy").addClass("hideHieght");
        $(".depth-sell").addClass("showSell");
        $(".showSell ul").scrollTop(20 * 150);
      } else if (_target.hasClass("switch-blue")) {
        $(".depth-sell").addClass("hideHieght");
        $(".depth-buy").addClass("showBuy");
      }
    });
    // 切换K线图和深度图
    $(".tabs-chart span").on("click", function(e) {
      var _target = $(e.target);
      $(".tabs-chart span").removeClass("selected");
      _target.addClass("selected");
      if (isTreadingView === "0") {
        if (_target.hasClass("j-kline")) {
          $("#klineBox").show();
          $("#depthBox").hide();
        } else if (_target.hasClass("j-depth")) {
          $("#klineBox").hide();
          $("#depthBox").show();
        }
      } else if (isTreadingView === "1") {
        $("#klineBox").hide();
        if (_target.hasClass("j-kline")) {
          $("#depthBox").hide();
        } else if (_target.hasClass("j-depth")) {
          $("#depthBox").show();
        }
      }
      var num = $("#changDepth")
        .find("option:selected")
        .val();
      if (_this.sdnum !== "0" && _this.sdnum != num) {
        _this.pageSendDepth("unsub");
        _this.sdnum = num;
        _this.pageSendDepth("sub");
      } else if (_this.sdnum === "0" && _this.sdnum != num) {
        _this.sdnum = num;
        _this.pageSendDepth("sub");
      }
    });
    $(".j-getdown").on("click", function() {
      window.location.href =
        _w_.baseUrl +
        "/export_all_trade.html?page=" +
        _this.nextNum +
        "&symbol=" +
        _this.symbolOBJ.symbol +
        "&timestamp=" +
        new Date().getTime();
    });
    // 切换我的挂单
    $(".mywork-tabs li").on("click", function(e) {
      var _target = $(e.target);
      if (_target.hasClass("historytrade-tab")) {
        $(".j-addMore").hide();
        $(".j-getdown").show();
      } else {
        $(".j-addMore").show();
        $(".j-getdown").hide();
      }
      $(".mywork-tabs li").removeClass("selected");
      _target.addClass("selected");
      _this.odre = _target.attr("name");
      $(".userOder-list").css("opacity", "0.4");
      setTimeout(function() {
        $(".userOder-list").css("opacity", "1");
      }, 200);
      _this.userOderList(1);
      _this.next = false;
    });
    // 展开账单明细
    $(document).on("click", ".list-con", function(e) {
      var _tar = $(e.target);
      var _tarCU = $(e.currentTarget);
      var _next = $('tr.subList[name="' + _tarCU.attr("name") + '"]');
      if (_next.attr("style") && _next.attr("style").indexOf("none") > -1) {
        $("tr.subList").attr("style", "display:none");
        _next.removeAttr("style");
      } else {
        _next.attr("style", "display:none");
      }
      if (_tar.attr("id") && _tar.attr("id").indexOf("cancel_") > -1) {
        // myconfirm(defDom.cancelTxt,_this.doNext,defDom.cancelTitle)
        _this.doNext = function() {
          var order_id = _tar.attr("id").split("_")[1];
          var data = {
            orderId: order_id,
            symbol: _this.symbolOBJ.symbol
          };
          $.ajax({
            url:
              _w_.baseUrl +
              "/web/order/cancel.do?symbol=" +
              _this.symbolOBJ.symbol +
              "&orderId=" +
              order_id,
            type: "post",
            contentType: "application/json;charset=utf-8",
            // data: JSON.stringify(data),
            success: function(data) {
              if (data.code != "0") {
                _this.myalert(data.msg, "");
              } else if (data.code == "0") {
                _this.userOderList(1);
                /**从新获取账户余额 Add By fu*/
                _this.drawData();
              }
            }
          });
        };
        myconfirm(
          defDom.cancelTxt,
          _this.doNext,
          defDom.cancelTitle,
          baseType.confirm,
          baseType.cancelStr
        );
      }
    });
    // 切换密码输入框
    $(document).on("focus", "#password-buy,#password_sell", function() {
      $(this).attr("type", "password");
    });
    // 现价市价模块切换 tab
    $(".transaction-tabs").on("click", "li", function(e) {
      var _target = $(e.target);
      $(".transaction-tabs")
        .children(".selected")
        .removeClass("selected");
      _target.addClass("selected");
      _this.inputPriceBuy = null;
      _this.inputVolumeBuy = null;
      _this.inputPriceSell = null;
      _this.inputVolumeSell = null;
      $(".transaction-input input").val("");
      if (_target.hasClass("tab-xj")) {
        $(".transaction-xj").css("display", "block");
        $(".transaction-sj").css("display", "none");
        $(".sjTxt").hide();
        //指定文案
        $("#getCountCoin").attr(
          "placeholder",
          xjmrMsg + "(" + _this.symbolOBJ.symbolA.toUpperCase() + ")"
        );
        $("#getBaseCoin").attr(
          "placeholder",
          xjmcMsg + "(" + _this.symbolOBJ.symbolA.toUpperCase() + ")"
        );
        $(".xjTxt").show();
        $(".transaction-price")
          .show()
          .css("color", "")
          .find("s")
          .text("--");
        $(".transaction-treadNum").show();
      }
      if (_target.hasClass("tab-sj")) {
        $(".transaction-xj").css("display", "none");
        $(".transaction-sj").css("display", "block");
        $(".sjTxt").show();
        $(".xjTxt").hide();
        //指定文案
        $("#getCountCoin").attr(
          "placeholder",
          sjmrMsg + "(" + _this.symbolOBJ.symbolB.toUpperCase() + ")"
        );
        $("#getBaseCoin").attr(
          "placeholder",
          sjmcMsg + "(" + _this.symbolOBJ.symbolA.toUpperCase() + ")"
        );
        $(".transaction-treadNum").hide();
      }
      if (_this.draging === "buy") {
        _this.judgeDom(0);
      } else {
        _this.judgeDom(0);
        _this.draging = "buy";
        _this.judgeDom(0);
      }
    });
    // 买卖框输入校验
    $(".tr-transaction").on("input propertychange change", "input", function(
      e
    ) {
      var _target = $(e.currentTarget);
      if (!_target.hasClass("tread-input")) return;
      _this.marketType = $(".transaction-tabs .selected").hasClass("tab-xj")
        ? "xj"
        : "sj";
      _this.draging = _target
        .parents("div.transaction-buy")
        .hasClass("transaction-buy")
        ? "buy"
        : "sell";
      // 校验输入规则：1、大于0，2、少于14位,3、小数点后精度可配置
      var fixVal = parseFloat(_target.val());
      if (fixVal < 0 || fixVal + "" === "NaN") {
        _target.val("");
        _this.judgeDom(0);
        $(".transaction-" + _this.draging)
          .find(".transaction-price s")
          .text("--");
        $(".transaction-" + _this.draging)
          .find(".transaction-price")
          .css("color", "");
      } else if ((fixVal + "").length > 14) {
        _target.val((fixVal + "").slice(0, 14));
      }
      var thisId = _target.attr("id");
      // 判断小数点后精度
      var floatLength = (fixVal + "").split(".")[1];
      if ((fixVal + "").indexOf("e") >= 0) {
        floatLength = fixVal;
      }
      if (floatLength) {
        if (thisId === "getCountPrice" || thisId === "getBasePrice") {
          floatLength.length > _this.symbolOBJ.price &&
            _target.val(_w_.fixD(fixVal, _this.symbolOBJ.symbol, "price"));
        } else if (thisId === "getCountCoin" || thisId === "getBaseCoin") {
          floatLength.length > _this.symbolOBJ.volume &&
            _target.val(_w_.fixD(fixVal, _this.symbolOBJ.symbol, "volume"));
        }
      }

      // 符合规则后，进行计算
      var legitimateVal = parseFloat(_target.val());
      if (thisId === "getCountPrice") {
        _this.inputPriceBuy = legitimateVal;
      } else if (thisId === "getCountCoin") {
        _this.inputVolumeBuy = legitimateVal;
      } else if (thisId === "getBasePrice") {
        _this.inputPriceSell = legitimateVal;
      } else if (thisId === "getBaseCoin") {
        _this.inputVolumeSell = legitimateVal;
      }
      // 限价，买入规则
      if (
        _this.marketType === "xj" &&
        _this.draging === "buy" &&
        _this.inputVolumeBuy &&
        _this.inputPriceBuy &&
        _this.countCoin
      ) {
        var perLeftX =
          ((_this.inputPriceBuy * _this.inputVolumeBuy) / _this.countCoin) *
          100;
        perLeftX > 100 && (perLeftX = 100);
        _this.judgeDom(perLeftX);
        var jyeB = _this.fixVoluem(_this.inputPriceBuy * _this.inputVolumeBuy);
        $(".transaction-" + _this.draging)
          .find(".transaction-price s")
          .text(jyeB + " " + _this.symbolOBJ.symbolB);
        if (parseFloat(jyeB) > _this.countCoin) {
          $(".transaction-" + _this.draging)
            .find(".transaction-price")
            .css("color", "#ff0000");
        } else {
          $(".transaction-" + _this.draging)
            .find(".transaction-price")
            .css("color", "");
        }
      }
      // 限价，卖出规则
      if (
        _this.marketType === "xj" &&
        _this.draging === "sell" &&
        _this.inputVolumeSell &&
        _this.baseCoin
      ) {
        var perLeftX = (_this.inputVolumeSell / _this.baseCoin) * 100;
        perLeftX > 100 && (perLeftX = 100);
        _this.judgeDom(perLeftX);

        if (_this.inputPriceSell) {
          var jyeS = _this.fixVoluem(
            _this.inputPriceSell * _this.inputVolumeSell
          );
          $(".transaction-" + _this.draging)
            .find(".transaction-price s")
            .text(jyeS + " " + _this.symbolOBJ.symbolB);
          if (_this.inputVolumeSell > _this.baseCoin) {
            $(".transaction-" + _this.draging)
              .find(".transaction-price")
              .css("color", "#ff0000");
          } else {
            $(".transaction-" + _this.draging)
              .find(".transaction-price")
              .css("color", "");
          }
        }
      }
      // 市价，买入规则
      if (
        _this.marketType === "sj" &&
        _this.draging === "buy" &&
        _this.inputVolumeBuy &&
        _this.countCoin
      ) {
        var perLeftX = (_this.inputVolumeBuy / _this.countCoin) * 100;
        perLeftX > 100 && (perLeftX = 100);
        _this.judgeDom(perLeftX);
      }
      // 市价，卖出规则
      if (
        _this.marketType === "sj" &&
        _this.draging === "sell" &&
        _this.inputVolumeSell &&
        _this.baseCoin
      ) {
        var perLeftX = (_this.inputVolumeSell / _this.baseCoin) * 100;
        perLeftX > 100 && (perLeftX = 100);
        _this.judgeDom(perLeftX);
      }
    });

    // 拖拽 2.0
    $(document).on("mousedown mouseup mousemove", function(event) {
      if (!_this.isLogin) return;
      var _target = $(event.target);
      if (event.type === "mousedown" && _target.hasClass("drag-step")) {
        _this.marketType = $(".transaction-tabs .selected").hasClass("tab-xj")
          ? "xj"
          : "sj";
        _this.draging = _target
          .parents("div.transaction-buy")
          .hasClass("transaction-buy")
          ? "buy"
          : "sell";

        // 限价、买入，没有价格
        if (
          _this.marketType === "xj" &&
          _this.draging === "buy" &&
          (!_this.inputPriceBuy || !_this.countCoin)
        ) {
          return;
        }
        // 限价、卖出，没有价格
        if (
          _this.marketType === "xj" &&
          _this.draging === "sell" &&
          !_this.baseCoin
        ) {
          return;
        }
        // 市价、买入，没有量
        if (
          _this.marketType === "sj" &&
          _this.draging === "buy" &&
          !_this.countCoin
        ) {
          return;
        }
        // 市价、卖出，没有量
        if (
          _this.marketType === "xj" &&
          _this.draging === "sell" &&
          !_this.baseCoin
        ) {
          return;
        }
        _this.mx = event.clientX;
        _this.initX = parseFloat(_target.css("left"));
        _this.isMove = true;
        _this.draging = _target
          .parents("div.transaction-buy")
          .hasClass("transaction-buy")
          ? "buy"
          : "sell";
      }
      if (event.type === "mousemove" && _this.isMove) {
        _this.computedWidth(event.clientX);
      }
      if (event.type === "mouseup") {
        _this.isMove = false;
      }
    });

    // 拖拽模块中点击圆点距离数据渲染
    $(".transaction-drag i").on("click", function(e) {
      if (!_this.isLogin) return;
      var _target = $(e.target);
      _this.marketType = $(".transaction-tabs .selected").hasClass("tab-xj")
        ? "xj"
        : "sj";
      _this.draging = _target
        .parents("div.transaction-buy")
        .hasClass("transaction-buy")
        ? "buy"
        : "sell";
      // 限价、买入，没有价格
      if (
        _this.marketType === "xj" &&
        _this.draging === "buy" &&
        (!_this.inputPriceBuy || !_this.countCoin)
      ) {
        return;
      }
      // 限价、卖出，没有价格
      if (
        _this.marketType === "xj" &&
        _this.draging === "sell" &&
        !_this.baseCoin
      ) {
        return;
      }
      // 市价、买入，没有量
      if (
        _this.marketType === "sj" &&
        _this.draging === "buy" &&
        !_this.countCoin
      ) {
        return;
      }
      // 市价、卖出，没有量
      if (
        _this.marketType === "xj" &&
        _this.draging === "sell" &&
        !_this.baseCoin
      ) {
        return;
      }
      var _left = "";
      if (_target.hasClass("drag-stepx")) {
        _left = "0";
      } else if (_target.hasClass("drag-step0")) {
        _left = "25";
      } else if (_target.hasClass("drag-step1")) {
        _left = "50";
      } else if (_target.hasClass("drag-step2")) {
        _left = "75";
      } else if (_target.hasClass("drag-step3")) {
        _left = "100";
      }
      _this.judgeDom(_left);
      // 限价，买入规则
      if (_this.marketType === "xj" && _this.draging === "buy") {
        var voNum = _w_.fixD(
          ((_left / 100) * _this.countCoin) / _this.inputPriceBuy,
          _this.symbolOBJ.symbol,
          "volume"
        );
        $("#getCountCoin").val(voNum);
        _this.inputVolumeBuy = parseFloat(voNum);
        $("#transBuyCoin s").text(
          _this.fixVoluem(_this.inputPriceBuy * voNum) +
            " " +
            _this.symbolOBJ.symbolB
        );
        if (_this.inputVolumeBuy * _this.inputPriceBuy > _this.countCoin) {
          $(".transaction-" + _this.draging)
            .find(".transaction-price")
            .css("color", "#ff0000");
        } else {
          $(".transaction-" + _this.draging)
            .find(".transaction-price")
            .css("color", "");
        }
      }
      // 限价，卖出规则
      if (_this.marketType === "xj" && _this.draging === "sell") {
        var voNum = _w_.fixD(
          (_left / 100) * _this.baseCoin,
          _this.symbolOBJ.symbol,
          "volume"
        );
        $("#getBaseCoin").val(voNum);
        _this.inputVolumeSell = parseFloat(voNum);
        $("#transSellCoin s").text(
          _this.fixVoluem(_this.inputPriceSell * voNum) +
            " " +
            _this.symbolOBJ.symbol
        );
        if (_this.inputVolumeSell * _this.inputPriceSell > _this.baseCoin) {
          $(".transaction-" + _this.draging)
            .find(".transaction-price")
            .css("color", "#ff0000");
        } else {
          $(".transaction-" + _this.draging)
            .find(".transaction-price")
            .css("color", "");
        }
      }
      // 市价，买入规则
      if (_this.marketType === "sj" && _this.draging === "buy") {
        var voNum = _w_.fixD(
          (_left / 100) * _this.countCoin,
          _this.symbolOBJ.symbol,
          "volume"
        );
        $("#getCountCoin").val(voNum);
        _this.inputVolumeBuy = parseFloat(voNum);
      }
      // 市价，卖出规则
      if (_this.marketType === "sj" && _this.draging === "sell") {
        var voNum = _w_.fixD(
          (_left / 100) * _this.baseCoin,
          _this.symbolOBJ.symbol,
          "volume"
        );
        $("#getBaseCoin").val(voNum);
        _this.inputVolumeBuy = parseFloat(voNum);
      }
    });

    $(".j-addMore").on("click", function() {
      $(".mywork-tabs .selected").trigger("click");
    });
    $(".button-jy").on("click", function(e) {
      if (!_this.isLogin || !_this.clockClick) {
        return;
      }
      _this.clockClick = false;
      var _target = $(e.target);
      var data = {};
      var capital_pword =
        defPass.exchangeVerify === 1
          ? false
          : _target
              .parents(".transaction-pavsbtn")
              .find("input")
              .val();

      var type = $(".tab-xj").hasClass("selected") ? 1 : 2;
      var side, volume, price;
      if (_target.parents("div.transaction-buy").hasClass("transaction-buy")) {
        side = "BUY";
        volume = $("#getCountCoin").val();
        price = $("#getCountPrice").val();
      } else {
        side = "SELL";
        volume = $("#getBaseCoin").val();
        price = $("#getBasePrice").val();
      }
      data.side = side;
      data.volume = volume;
      data.type = type;
      data.symbol = _this.symbolOBJ.symbol;
      capital_pword && (data.capitalPword = capital_pword);
      if (type === 1) {
        data.price = price;
      }
      if (parseFloat(data.price) <= 0 || parseFloat(data.volume) <= 0) {
        return;
      }
      $.ajax({
        url: _w_.baseUrl + "/web/order/create",
        type: "post",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(data),
        success: function(data) {
          _this.clockClick = true;
          if (data.code === "0") {
            defPass.exchangeVerify === 2 &&
              $(".transaction-button").removeClass("transaction-pavsbtn");
            $("#getCountCoin").val("");
            $("#getBaseCoin").val("");
            $("#password-buy").val("");
            $("#password_sell").val("");
            $("#transSellCoin s").text("--");
            $("#transBuyCoin s").text("--");
            // $('.neworder-tab').trigger('click')
            _this.initDom();
          } else {
            if (data.code === "3") {
              location.href = "login.html";
            } else {
              _this.myalert(data.msg, "");
            }
          }
        }
      });
    });
    // 自定义弹框删除按钮点击事件
    $(document).on("click", ".unt-btn .small-btn", function() {
      _this.deleteRemain();
    });
  },
  // 获取现价市价实时价格
  drawData: function() {
    var _this = this;
    $.ajax({
      url: _w_.baseUrl + "/web/account/symbol/balance",
      type: "get",
      data: {
        symbol: _this.symbolOBJ.symbol
      },
      success: function(data) {
        if (data.code != 0) {
          return;
        }
        _this.countCoin = parseFloat(data.data.countCoinBalance);
        _this.baseCoin = parseFloat(data.data.baseCoinBalance);
        _this.price = parseFloat(data.data.price);
        // _this.minVolume = parseFloat(data.data.minVolume)
        // _this.minPrice = parseFloat(data.data.minPrice)
        $("#countCoin s").text(
          data.data.countCoinBalance + " " + _this.symbolOBJ.symbolB
        );
        $("#baseCoin s").text(
          data.data.baseCoinBalance + " " + _this.symbolOBJ.symbolA
        );
        $(".transaction-service .gd")
          .find("s")
          .text("0");
        $(".transaction-service .cd")
          .find("s")
          .text("0");
      },
      error: function(e) {
        console.log(e);
      }
    });
  },
  // 获取拖拽的百分比
  computedWidth: function(moveClientX) {
    var dx = moveClientX - this.mx;
    this.leftX = this.initX + dx;

    this.perLeftX = (this.leftX / 304) * 100; // 换算成百分比（未加 %）
    if (this.perLeftX < 0) {
      this.perLeftX = 0;
      this.leftX = 0;
    }
    if (this.perLeftX > 100) {
      this.perLeftX = 100;
      this.leftX = 304;
    }

    this.judgeDom(this.perLeftX);
    // 限价，买入规则
    if (this.marketType === "xj" && this.draging === "buy") {
      var voNum = _w_.fixD(
        ((this.leftX / 304) * this.countCoin) / this.inputPriceBuy,
        this.symbolOBJ.symbol,
        "volume"
      );
      $("#getCountCoin").val(voNum);
      this.inputVolumeBuy = parseFloat(voNum);
      $("#transBuyCoin s").text(
        this.fixVoluem(this.inputPriceBuy * voNum) +
          " " +
          this.symbolOBJ.symbolB
      );
      if (this.inputVolumeBuy * this.inputPriceBuy > this.countCoin) {
        $(".transaction-" + this.draging)
          .find(".transaction-price")
          .css("color", "#ff0000");
      } else {
        $(".transaction-" + this.draging)
          .find(".transaction-price")
          .css("color", "");
      }
    }
    // 限价，卖出规则
    if (this.marketType === "xj" && this.draging === "sell") {
      var voNum = _w_.fixD(
        (this.leftX / 304) * this.baseCoin,
        this.symbolOBJ.symbol,
        "volume"
      );
      $("#getBaseCoin").val(voNum);
      this.inputVolumeSell = parseFloat(voNum);
      $("#transSellCoin s").text(
        this.fixVoluem(this.inputPriceSell * voNum) +
          " " +
          this.symbolOBJ.symbolB
      );
      if (this.inputVolumeSell * this.inputPriceSell > this.baseCoin) {
        $(".transaction-" + this.draging)
          .find(".transaction-price")
          .css("color", "#ff0000");
      } else {
        $(".transaction-" + this.draging)
          .find(".transaction-price")
          .css("color", "");
      }
    }
    // 市价，买入规则
    if (this.marketType === "sj" && this.draging === "buy") {
      var voNum = _w_.fixD(
        (this.leftX / 304) * this.countCoin,
        this.symbolOBJ.symbol,
        "volume"
      );
      $("#getCountCoin").val(voNum);
      this.inputVolumeBuy = parseFloat(voNum);
    }
    // 市价，卖出规则
    if (this.marketType === "sj" && this.draging === "sell") {
      var voNum = _w_.fixD(
        (this.leftX / 304) * this.baseCoin,
        this.symbolOBJ.symbol,
        "volume"
      );
      $("#getBaseCoin").val(voNum);
      this.inputVolumeBuy = parseFloat(voNum);
    }
  },
  // 渲染拖动距离数据渲染
  judgeDom: function(perLeftX) {
    $("div.transaction-" + this.draging)
      .find(".drag-cover")
      .css("width", perLeftX + "%");
    $("div.transaction-" + this.draging)
      .find(".drag-step")
      .css("left", perLeftX + "%");
  },
  // 初始化我的订单
  initDom: function() {
    if (this.isLogin) {
      this.inputPriceBuy = null;
      this.inputVolumeBuy = null;
      this.inputPriceSell = null;
      this.inputVolumeSell = null;
      $(".j-noLogin").hide();
      $(".neworder-tab").trigger("click");
      $(".button-jy").removeClass("disabled_button");
      $(".transaction-content input")
        .val("")
        .removeClass("no-drop");
      $(".transaction-price s").text("--");
      $(".transaction-drag").removeClass("cursor");
      this.drawData();
      // 是否显示资金密码
      defPass.verifyFlag === 1 &&
        $(".transaction-button").addClass("transaction-pavsbtn");
    } else {
      $(".tr-mywork-box").hide();
      $(".j-noLogin").show();
      $(".transaction-content input")
        .attr("disabled", "disabled")
        .addClass("no-drop");
      $(".transaction-drag").css("cursor", "no-drop");
      $(".button-jy").addClass("disabled_button");
    }
  },
  // 渲染我的订单
  userOderList: function(page) {
    var _this = this;
    var domList = "",
      url = "";
    if (this.odre === "neworder") {
      url = _w_.baseUrl + "/web/new_order";
    } else if (this.odre === "allorder") {
      url = _w_.baseUrl + "/web/all_order";
    } else if (this.odre === "historytrade") {
      url = _w_.baseUrl + "/web/all_trade";
    }
    var p = page || 1;
    $.ajax({
      url: url,
      type: "get",
      data: {
        pageSize: 20,
        page: p,
        symbol: this.symbolOBJ.symbol
      },
      success: function(data) {
        if (data.code != 0) {
          return;
        }
        if (!_this.next) {
          _this.next = true;
          _this.count = data.data.count;
          _this.nextPage();
        }
        if (data.data.count <= 0) {
          $(".userOder-list").html(
            '<tr class="list-con"><td>' + defDom.noData + "</td></tr>"
          );
          return;
        }
        if (_this.odre !== "historytrade") {
          var domList = "";
          for (var i = 0; i < data.data.orderList.length; i++) {
            var hisList = "",
              historyDom = "",
              cancel = "";
            var d = data.data.orderList[i];
            var tradeList = d.tradeList;
            //如果是市价买单
            d.price = _w_.fixD(d.price, _this.symbolOBJ.symbol, "price");
            d.total_price = _w_.fixD(
              d.total_price,
              _this.symbolOBJ.symbol,
              "price"
            );
            d.avg_price = _w_.fixD(
              d.avg_price,
              _this.symbolOBJ.symbol,
              "price"
            );

            d.volume = _w_.fixD(d.volume, _this.symbolOBJ.symbol, "volume");
            d.deal_volume = _w_.fixD(
              d.deal_volume,
              _this.symbolOBJ.symbol,
              "volume"
            );
            d.remain_volume = _w_.fixD(
              d.remain_volume,
              _this.symbolOBJ.symbol,
              "volume"
            );
            if (tradeList.length) {
              for (var x = 0; x < tradeList.length; x++) {
                hisList =
                  hisList +
                  "<tr><td>" +
                  tradeList[x].id +
                  "</td><td>" +
                  tradeList[x].ctime +
                  "</td><td>" +
                  _w_.fixD(
                    tradeList[x].volume,
                    _this.symbolOBJ.symbol,
                    "volume"
                  ) +
                  " " +
                  d.baseCoin.toUpperCase() +
                  "</td><td>" +
                  _w_.fixD(
                    tradeList[x].deal_price,
                    _this.symbolOBJ.symbol,
                    "price"
                  ) +
                  " " +
                  d.countCoin.toUpperCase() +
                  "</td><td>" +
                  _w_.fixD(
                    tradeList[x].price,
                    _this.symbolOBJ.symbol,
                    "price"
                  ) +
                  " " +
                  d.countCoin.toUpperCase() +
                  "</td><td>" +
                  _w_.fixD(tradeList[x].fee, _this.symbolOBJ.symbol, "price") +
                  " " +
                  tradeList[x].feeCoin.toUpperCase() +
                  "</td></tr>";
              }
              historyDom =
                '<tr class="subList" style="display:none" name="list-' +
                i +
                '"><td colspan="10" class="subList-td"><table>' +
                defDom.titleHis +
                hisList +
                "</table></td></tr>";
            }
            if (d.status === 0 || d.status === 1 || d.status === 3) {
              cancel =
                ' / <span class="cancel_Deal" id="cancel_' +
                d.id +
                '">' +
                defDom.cancel +
                "</span>";
            }
            if (d.type == 2) {
              if (d.side == "BUY") {
                domList =
                  domList +
                  '<tr class="list-con" name="list-' +
                  i +
                  '"><td>' +
                  d.created_at +
                  '</td><td class="col-red">' +
                  d.side_msg +
                  "</td><td>" +
                  d.price +
                  " " +
                  "</td><td>" +
                  d.volume +
                  " " +
                  d.baseCoin.toUpperCase() +
                  "</td><td>" +
                  d.total_price +
                  " " +
                  d.countCoin.toUpperCase() +
                  "</td><td>" +
                  d.deal_volume +
                  " " +
                  d.baseCoin.toUpperCase() +
                  "</td><td>" +
                  d.avg_price +
                  " " +
                  d.countCoin.toUpperCase() +
                  "</td><td>" +
                  d.remain_volume +
                  " " +
                  d.countCoin.toUpperCase() +
                  "</td><td>" +
                  d.source_msg +
                  "</td><td>" +
                  d.status_msg +
                  cancel +
                  "</td></tr>" +
                  historyDom;
              } else {
                domList =
                  domList +
                  '<tr class="list-con" name="list-' +
                  i +
                  '"><td>' +
                  d.created_at +
                  '</td><td class="col-fall">' +
                  d.side_msg +
                  "</td><td>" +
                  d.price +
                  " " +
                  "</td><td>" +
                  d.volume +
                  " " +
                  d.baseCoin.toUpperCase() +
                  "</td><td>" +
                  d.total_price +
                  " " +
                  d.countCoin.toUpperCase() +
                  "</td><td>" +
                  d.deal_volume +
                  " " +
                  d.baseCoin.toUpperCase() +
                  "</td><td>" +
                  d.avg_price +
                  " " +
                  d.countCoin.toUpperCase() +
                  "</td><td>" +
                  d.remain_volume +
                  " " +
                  d.baseCoin.toUpperCase() +
                  "</td><td>" +
                  d.source_msg +
                  "</td><td>" +
                  d.status_msg +
                  cancel +
                  "</td></tr>" +
                  historyDom;
              }
            } else {
              if (d.side == "BUY") {
                domList =
                  domList +
                  '<tr class="list-con" name="list-' +
                  i +
                  '"><td>' +
                  d.created_at +
                  '</td><td class="col-red">' +
                  d.side_msg +
                  "</td><td>" +
                  d.price +
                  " " +
                  d.countCoin.toUpperCase() +
                  "</td><td>" +
                  d.volume +
                  " " +
                  d.baseCoin.toUpperCase() +
                  "</td><td>" +
                  d.total_price +
                  " " +
                  d.countCoin.toUpperCase() +
                  "</td><td>" +
                  d.deal_volume +
                  " " +
                  d.baseCoin.toUpperCase() +
                  "</td><td>" +
                  d.avg_price +
                  " " +
                  d.countCoin.toUpperCase() +
                  "</td><td>" +
                  d.remain_volume +
                  " " +
                  d.baseCoin.toUpperCase() +
                  "</td><td>" +
                  d.source_msg +
                  "</td><td>" +
                  d.status_msg +
                  cancel +
                  "</td></tr>" +
                  historyDom;
              } else {
                domList =
                  domList +
                  '<tr class="list-con" name="list-' +
                  i +
                  '"><td>' +
                  d.created_at +
                  '</td><td class="col-fall">' +
                  d.side_msg +
                  "</td><td>" +
                  d.price +
                  " " +
                  d.countCoin.toUpperCase() +
                  "</td><td>" +
                  d.volume +
                  " " +
                  d.baseCoin.toUpperCase() +
                  "</td><td>" +
                  d.total_price +
                  " " +
                  d.countCoin.toUpperCase() +
                  "</td><td>" +
                  d.deal_volume +
                  " " +
                  d.baseCoin.toUpperCase() +
                  "</td><td>" +
                  d.avg_price +
                  " " +
                  d.countCoin.toUpperCase() +
                  "</td><td>" +
                  d.remain_volume +
                  " " +
                  d.baseCoin.toUpperCase() +
                  "</td><td>" +
                  d.source_msg +
                  "</td><td>" +
                  d.status_msg +
                  cancel +
                  "</td></tr>" +
                  historyDom;
              }
            }
          }
          $(".userOder-list")
            .html(defDom.titleOder)
            .append(domList);
        } else {
          var hisListTd = "";
          for (var y = 0; y < data.data.resultList.length; y++) {
            var d = data.data.resultList[y];
            hisListTd =
              hisListTd +
              '<tr class="list-con"><td>' +
              d.id +
              "</td><td>" +
              d.ctime +
              "</td><td>" +
              d.volume +
              " " +
              _this.symbolOBJ.symbolA.toUpperCase() +
              "</td><td>" +
              d.deal_price +
              " " +
              _this.symbolOBJ.symbolB.toUpperCase() +
              "</td><td>" +
              d.price +
              " " +
              _this.symbolOBJ.symbolB.toUpperCase() +
              "</td><td>" +
              d.fee +
              " " +
              d.feeCoin.toUpperCase() +
              "</td></tr>";
          }
          $(".userOder-list")
            .html(defDom.titleHis)
            .append(hisListTd);
        }
      }
    });
    $(".tr-mywork-box").show();
  },
  // 渲染分页
  nextPage: function() {
    var _this = this;
    var endPage = this.count % 20 === 0 ? 0 : 1;
    var pages = parseInt(this.count / 20) + endPage;
    $(".paginationsbox").pagination({
      pages: pages,
      cssStyle: "light-theme",
      displayedPages: 5,
      edges: 1,
      onPageClick: function(pageNumber, event) {
        _this.nextNum = pageNumber;
        _this.userOderList(pageNumber);
      },
      onInit: function() {
        // Callback triggered immediately after initialization
      }
    });
  },
  pageSend: function(type) {
    // 24小时
    this.ws.send(
      JSON.stringify({
        event: type,
        params: {
          channel: "market_" + this.symbolOBJ.symbol + "_ticker",
          cb_id: this.symbolOBJ.symbol
        }
      })
    );
    if (type === "sub") {
      // 成交历史
      this.ws.send(
        JSON.stringify({
          event: "req",
          params: {
            channel: "market_" + this.symbolOBJ.symbol + "_trade_ticker",
            cb_id: this.symbolOBJ.symbol,
            top: 150
          }
        })
      );
    }
  },
  pageSendDepth: function(type) {
    // 深度
    this.ws.send(
      JSON.stringify({
        event: type,
        params: {
          channel:
            "market_" + this.symbolOBJ.symbol + "_depth_step" + this.sdnum,
          cb_id: this.symbolOBJ.symbol
        }
      })
    );
  },
  pageSendnewDeal: function(type) {
    // 最新成交
    this.ws.send(
      JSON.stringify({
        event: type,
        params: {
          channel: "market_" + this.symbolOBJ.symbol + "_trade_ticker",
          cb_id: this.symbolOBJ.symbol
        }
      })
    );
  },
  // 顶部数据
  pageTop: function(data) {
    var tt = $(".tr-top");
    var ttPrice = tt.find(".tt-price");
    var oldClose = parseFloat(ttPrice.text());
    if (oldClose + "" != "NaN") {
      if (data.close > oldClose) {
        ttPrice.addClass("col-red").removeClass("col-fall");
        $(".tr-newPrice")
          .addClass("tran-rise")
          .removeClass("tran-drop");
      } else if (data.close < oldClose) {
        ttPrice.addClass("col-fall").removeClass("col-red");
        $(".tr-newPrice")
          .addClass("tran-drop")
          .removeClass("tran-rise");
      } else {
        ttPrice.removeClass("col-fall").removeClass("col-red");
        $(".tr-newPrice")
          .removeClass("tran-rise")
          .removeClass("tran-drop");
      }
    }
    ttPrice.text(
      _w_.fixD(data.close, this.symbolOBJ.symbol, "price") +
        _w_.fixRate(data.close, this.symbolOBJ.symbol, true)
    );
    $(".tr-newPrice").text(
      this.symbolOBJ.symbolB +
        " " +
        _w_.fixD(data.close, this.symbolOBJ.symbol, "price") +
        _w_.fixRate(data.close, this.symbolOBJ.symbol, true)
    );

    var ttrose = tt.find(".tt-rose");
    var rose = Math.round(data.rose * 10000) / 100;
    if (data.rose < 0) {
      ttrose.addClass("col-fall").removeClass("col-red");
    } else if (data.rose > 0) {
      ttrose.addClass("col-red").removeClass("col-fall");
    } else {
      ttrose.removeClass("col-red").removeClass("col-fall");
      rose = "0.00";
    }
    ttrose.text(rose + "%");
    tt.find(".tt-high").text(
      _w_.fixD(data.high, this.symbolOBJ.symbol, "price")
    );
    tt.find(".tt-low").text(_w_.fixD(data.low, this.symbolOBJ.symbol, "price"));
    tt.find(".tt-vol").text(
      _w_.fixD(data.vol, this.symbolOBJ.symbol, "volume") +
        " " +
        this.symbolOBJ.symbolA
    );
    tt.find(".tt-amount").text(
      _w_.fixD(data.amount, this.symbolOBJ.symbol, "price") +
        " " +
        this.symbolOBJ.symbolB
    );
  },
  // 最新成交
  pagenewDeal: function(data) {
    var res =
      data.event_rep && data.event_rep === "rep" ? data.data : data.tick.data;
    var listDom = "";

    for (var i = 0; i < res.length; i++) {
      var color = res[i].side === "BUY" ? "col-red" : "col-fall";
      var bgColor = i % 2 === 0 ? "baColor" : "";
      var ts = new Date(res[i].ts);
      var getHours = ts.getHours() < 10 ? "0" + ts.getHours() : ts.getHours();
      var getMinutes =
        ts.getMinutes() < 10 ? "0" + ts.getMinutes() : ts.getMinutes();
      var getSeconds =
        ts.getSeconds() < 10 ? "0" + ts.getSeconds() : ts.getSeconds();
      var tsTime = getHours + ":" + getMinutes + ":" + getSeconds;
      listDom =
        listDom +
        '<li class="' +
        bgColor +
        '"><span class="tr-mName">' +
        tsTime +
        '</span><span class="tr-mPrice"><s class="show-def">' +
        _w_.fixD(res[i].price, this.symbolOBJ.symbol, "price") +
        '</s><s class="show-hover">' +
        _w_.fixRate(res[i].price, this.symbolOBJ.symbol, false) +
        '</s></span><span class="tr-mZdvol ' +
        color +
        '">' +
        _w_.fixD(res[i].vol, this.symbolOBJ.symbol, "volume") +
        "</span></li>";
    }
    var newDealBox = $(".newDel-box");
    if (newDealBox.find("li").length <= res.length) {
      newDealBox.html("");
    } else {
      for (var x = 0; x < res.length; x++) {
        newDealBox
          .children("li")
          .eq(-1)
          .remove();
      }
    }
    newDealBox.prepend(listDom);
  },
  //深度
  pageDepth: function(data) {
    var buyDom = "",
      buyAdd = "";
    var arrayAll = data.buys.concat(data.asks);
    var width = 0;
    for (var i = 0; i < arrayAll.length; i++) {
      arrayAll[i][1] > width && (width = arrayAll[i][1]);
    }
    for (var i = 0; i < 150; i++) {
      var widthDom = 100;
      if (data.buys[i]) {
        if (data.buys[i][1] < width) {
          widthDom = (data.buys[i][1] / width) * 100;
        }
        if (i === 0) {
          buyAdd = data.buys[i][1];
        } else {
          buyAdd = buyAdd + data.buys[i][1];
        }
        buyDom =
          buyDom +
          '<li><span class="tr-mPrice col-red"><s class="show-def">' +
          _w_.fixD(data.buys[i][0], this.symbolOBJ.symbol, "price") +
          '</s><s class="show-hover">' +
          _w_.fixRate(data.buys[i][0], this.symbolOBJ.symbol, false) +
          '</s></span><span class="tr-mName">' +
          _w_.fixD(data.buys[i][1], this.symbolOBJ.symbol, "volume") +
          '</span><span class="tr-mZdvol">' +
          _w_.fixD(buyAdd, this.symbolOBJ.symbol, "volume") +
          '</span><span class="tr-bg" style="width:' +
          widthDom +
          '%"></span></li>';
      } else {
        buyDom =
          buyDom +
          '<li><span class="tr-mPrice">--</span><span class="tr-mName">--</span><span class="tr-mZdvol">--</span></li>';
      }
    }
    $(".depth-buy").html(buyDom);

    var askDom = "",
      askAdd = "";
    for (var i = 0; i < 150; i++) {
      if (data.asks[i]) {
        var widthDom = 100;
        if (data.asks[i][1] < width) {
          widthDom = (data.asks[i][1] / width) * 100;
        }

        if (i === 0) {
          askAdd = data.asks[i][1];
        } else {
          askAdd = askAdd + data.asks[i][1];
        }
        askDom =
          '<li><span class="tr-mPrice col-fall"><s class="show-def">' +
          _w_.fixD(data.asks[i][0], this.symbolOBJ.symbol, "price") +
          '</s><s class="show-hover">' +
          _w_.fixRate(data.asks[i][0], this.symbolOBJ.symbol, false) +
          '</s></span><span class="tr-mName">' +
          _w_.fixD(data.asks[i][1], this.symbolOBJ.symbol, "volume") +
          '</span><span class="tr-mZdvol">' +
          _w_.fixD(askAdd, this.symbolOBJ.symbol, "volume") +
          '</span><span class="tr-bg" style="width:' +
          widthDom +
          '%"></span></li>' +
          askDom;
      } else {
        askDom =
          '<li><span class="tr-mPrice">--</span><span class="tr-mName">--</span><span class="tr-mZdvol">--</span></li>' +
          askDom;
      }
    }
    $(".depth-sell ul").html(askDom);
  },
  //深度图
  chartDepth: function(array) {
    if (array == null) return;
    if (!array.asks && !array.buys) return;
    var depthData = {
      asksArr: [],
      buysArr: [],
      start: null,
      end: null
    };
    var xPriceAsk = [],
      xPriceBuy = [];
    var news = array.asks;
    var newAsks = null;
    for (var i = 0; i < news.length; i++) {
      if (i == 0) {
        newAsks = parseFloat(news[i][1].toFixed(3));
      } else {
        newAsks = parseFloat((newAsks + news[i][1]).toFixed(3));
      }
      depthData.asksArr.push([
        parseFloat(_w_.fixD(news[i][0], this.symbolOBJ.symbol, "price")),
        newAsks
      ]);
    }
    // debugger;
    var buys = array.buys;
    var newBuys = null;
    for (var i = 0; i < array.buys.length; i++) {
      if (i == 0) {
        newBuys = parseFloat(array.buys[i][1].toFixed(3));
      } else {
        newBuys = parseFloat((newBuys + array.buys[i][1]).toFixed(3));
      }
      depthData.buysArr.push([
        parseFloat(_w_.fixD(array.buys[i][0], this.symbolOBJ.symbol, "price")),
        newBuys
      ]);
    }
    depthData.buysArr.reverse();
    depthData.start = depthData.buysArr[0] && depthData.buysArr[0][0];
    depthData.end =
      depthData.asksArr[depthData.asksArr.length - 1] &&
      depthData.asksArr[depthData.asksArr.length - 1][0];
    // console.log(depthData)
    this.eachart(depthData);
  },
  // 深度图
  eachart: function(data) {
    this.myChart.setOption({
      xAxis: {
        min: data.start,
        max: data.end
      },
      series: [
        {
          data: data.buysArr
        },
        {
          data: data.asksArr
        }
      ]
    });
  },
  // 深度图
  eachartDef: function() {
    this.myChart = echarts.init(document.querySelector("#depthBox"));
    this.myChart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            width: 0.5
          }
        }
      },
      grid: {
        show: true,
        borderColor: "#415480",
        borderWidth: 0.5,
        containLabel: true,
        left: 5,
        top: 30,
        right: 0,
        bottom: 0
      },
      legend: {},
      animation: false,
      xAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          lineStyle: {
            color: "#ddd"
          }
        },
        axisLabel: {
          color: "#ddd",
          showMaxLabel: false,
          showMinLabel: false
        },
        type: "value",
        splitLine: {
          lineStyle: {
            color: ["rgba(153,153,153,0.07)"]
          }
        }
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          lineStyle: {
            color: "#ddd"
          }
        },
        axisLabel: {
          color: "#ddd"
        },
        type: "value",
        splitLine: {
          lineStyle: {
            color: ["rgba(153,153,153,0.07)"]
          }
        }
      },
      series: [
        {
          type: "line",
          smooth: true,
          symbol: "none",
          itemStyle: {
            normal: {
              color: "#5bd288"
            }
          },
          lineStyle: {
            normal: {
              color: "#5bd288",
              width: 0.5
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(103,175,90,0.8)" },
                { offset: 1, color: "rgba(103,175,90,0.8)" }
              ])
            }
          },
          data: []
        },
        {
          type: "line",
          smooth: true,
          symbol: "none",
          lineStyle: {
            normal: {
              color: "#f97564",
              width: 0.5
            }
          },
          itemStyle: {
            normal: {
              color: "#f97564"
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(204,95,97,0.8)" },
                { offset: 1, color: "rgba(204,95,97,0.8)" }
              ])
            }
          },
          data: []
        }
      ]
    });
  },
  // 市场列表
  marketTitle: function() {
    var marketTitle = "";
    for (key in _w_._market) {
      marketTitle =
        marketTitle +
        '<li id="market-' +
        key +
        '">' +
        key.toUpperCase() +
        "</li>";
    }
    $(".market-title").append(marketTitle);
    !this.defmarket.m &&
      (this.defmarket.m = $(".market-title li")
        .eq(1)
        .text()
        .toLowerCase());
    $("#market-" + this.defmarket.m).trigger("click");
  },
  // 市场货币对列表
  marketList: function() {
    var symbots = "";
    var market = _w_._market[this.market];
    if (this.market === "myMarket") {
      // 渲染自选数据
      var myMarket = localStorage.getItem("myMarket");
      if (myMarket) {
        var myList = [];
        var muMarketList = myMarket.split(",");
        for (var i = 0; i < muMarketList.length; i++) {
          var s = muMarketList[i].split("/");
          myList.push({
            name: muMarketList[i],
            key: s[0].toLowerCase() + s[1].toLowerCase()
          });
        }
        market = myList;
      } else {
        $(".market-box").html(
          '<li class="no-dataList">' + defDom.noMyMarket + "</li>"
        );
        return false;
      }
    }
    if (market && market.length) {
      var lS = localStorage.getItem("myMarket");
      var isMy = "select-mini";
      for (var i = 0; i < market.length; i++) {
        this.symbolList.push(market[i].key);
        if (lS) {
          lS.split(",").filter(function(item, index, array) {
            if (item === market[i].name) {
              isMy = "select-ed";
            }
          });
        }
        var subDom =
          '<span class="tr-mName"><i class="' +
          isMy +
          '"></i><s data="' +
          market[i].name +
          '">' +
          market[i].name.split("/")[0] +
          "</s></span>";
        if (this.market === "myMarket") {
          var subDom =
            '<span class="tr-mName"><s data="' +
            market[i].name +
            '">' +
            market[i].name.split("/")[0] +
            "/" +
            "<b>" +
            market[i].name.split("/")[1] +
            "</b></s></span>";
        }
        symbots =
          symbots +
          '<li id="symbots-' +
          market[i].key +
          '">' +
          subDom +
          '<span class="tr-mPrice"><s class="show-def">--</s><s class="show-hover">--</s></span><span class="tr-mZdvol"><b class="tr-rose">--</b><b class="tr-vol">--</b></span></li>';
        isMy = "select-mini";
      }
      $(".market-box").html(symbots);

      this.ws && this.marketSend("sub");
    }
  },
  // 市场列表ws请求
  marketSend: function(type) {
    // for (var b = 0; b < this.symbolList.length; b++) {
    //   if (type === 'unsub' && this.symbolOBJ.symbol === this.symbolList[b]){
    //     continue
    //   } else {
    //     this.ws.send(
    //         JSON.stringify({
    //           event: type,
    //           params: {
    //             channel: 'market_' + this.symbolList[b] + '_ticker',
    //             cb_id: this.symbolList[b]
    //           }
    //         })
    //       )
    //   }
    // }
    // if (type === 'unsub') {
    //   this.symbolList = []
    // }
    this.ws.send(
      JSON.stringify({
        event: type,
        params: {
          channel: "market_ethbtc_kline_1min",
          cb_id: "ethbtc"
        }
      })
    );
  },
  // 请求K线历史数据
  request_req: function() {
    // 选择是否是分时
    isLine === "line" && (_Global.scale[_Global.period] = "1min");
    lastTimeS = _Global.scale[_Global.period];
    // 切换刻度-已经有其他刻度的图表；
    this.ws.send(
      JSON.stringify({
        event: "req",
        params: {
          channel: "market_ethbtc_kline_1min",
          cb_id: "ethbtc"
        }
      })
    );
  },
  // 请求实时 K 线数据
  subData: function(subType) {
    this.ws.send(
      JSON.stringify({
        event: subType,
        params: {
          channel: "market_ethbtc_kline_1min",
          cb_id: "ethbtc"
        }
      })
    );
  },
  // 请求实时 K 线数据
  subDataTv: function(subType) {
    this.ws.send(
      JSON.stringify({
        event: subType,
        params: {
          channel: "market_ethbtc_kline_1min",
          cb_id: "ethbtc"
        }
      })
    );
  },
  // 市场列表ws链接
  marketWs: function() {
    this.ws = new WebSocket(_w_.wsUrl);
    this.ws.binaryType = "arraybuffer";
    this.ws.onopen = function(evt) {
      this.marketSend("req");
      if (this.defmarket.s) {
        $("#symbots-" + this.defmarket.s) &&
          $("#symbots-" + this.defmarket.s)
            .find(".tr-mName s")
            .trigger("click");
      } else {
        $(".market-box li").eq(0) &&
          $(".market-box li")
            .eq(0)
            .find(".tr-mName s")
            .trigger("click");
      }
      openTradeview();
    }.bind(this);
    this.ws.onmessage = function(evt) {
      var data = _w_.fixM(evt.data, this.ws);
      console.log(data);
      var symbol = data.channel && data.channel.split("_")[1];
      if (data && data.channel && data.channel.indexOf("_kline_") > -1) {
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
            _GlobalTV._KData = array;
            this.subDataTv("sub");
            newData = true;
            setTimeout(function(){
                window.onDataCallback(_GlobalTV._KData, noData);
                console.log(onDataCallback)
            },500)
          } else {
            this.subDataTv("sub");
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
      } else {
        // 其他
        if (data.event_rep && data.event_rep === "rep") {
          // 历史数据
          this.pagenewDeal(data);
          this.pageSendnewDeal("sub");
        } else if (data && data.tick) {
          if (data.channel.indexOf(this.symbolOBJ.symbol) < 0) {
            return;
          }
        }
      }
    }.bind(this);
  },
  //弹框显示提示
  myalert: function(msg, tempfun, title, submitStr) {
    $("#remindDiv").css({
      width: "100%",
      height: "100%",
      position: "fixed",
      left: "0",
      top: "0",
      background: "rgba(0,0,0,0.2)",
      display: "block",
      "z-index": "9999"
    });
    //初始化文案
    if (!title) {
      title = baseType.tips;
    }
    if (!submitStr) {
      submitStr = baseType.confirm;
    }
    this.alertFun = tempfun;
    var htmlStart =
      '<div class="pop-reminder-box" id="myAlert"><div class="hd"><h6>' +
      title +
      '</h6></div><div class="pop-reminder-con"><div class="pop-unt">';
    var htmlEnd =
      '</div><div class="unt-btn"><a href="##" title="" class="small-btn">' +
      submitStr +
      "</a></div></div></div>";
    $("#remindDiv").html(htmlStart + msg + htmlEnd);
  },
  //根据id删除弹框
  deleteRemain: function() {
    $("#remindDiv").css("display", "none");
    if (this.alertFun) {
      this.alertFun();
      this.alertFun = null;
    }
    // window.location.reload()
  },
  fixVoluem: function(d) {
    if ((d + "").toLowerCase().indexOf("e") > -1) {
      var a = (d + "").toLowerCase().split("e"),
        b = a[0],
        c = Math.abs(parseFloat(a[1])),
        d2 = "",
        h = b.length,
        i;
      if (a[0].split(".")[1]) {
        b = a[0].split(".")[0] + a[0].split(".")[1];
        h = a[0].split(".")[0].length;
      }
      for (i = 0; i < c - h; i++) {
        d2 = d2 + "0";
      }
      d = "0." + d2 + b;
    }
    if (d + "".indexOf(".") && (d + "").length > 14) {
      var dS = (d + "").split(".");
      if (dS[0].length <= 12) {
        var dS2 = dS[1].slice(0, 13 - dS[0].length);
        var ds2Length = dS2.length;
        for (var i = 0; i < ds2Length; i++) {
          if (dS2.slice(-1) != "0") {
            break;
          }
          dS2 = dS2.slice(0, dS2.length - 1);
        }
        var temp = dS2 ? "." + dS2 : "";
        d = dS[0] + temp;
      } else if (dS[0].length > 12) {
        d = dS[0];
      }
    }
    return d;
  }
};
tradJs.init();
