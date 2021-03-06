﻿define( function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        $(".mip-360doc-script-backgroundgrey").click(closeceng);
        $(".mip-360doc-script-p_header_fx").click(share);
        $(".mip-360doc-script-bds_wx").click(wxshare);
        $(".mip-360doc-script-guanbi").click(closeartnew);
        getRefNum();
        $(".mip-360doc-script-wxggalink").html("<span class=\"mip-360doc-script-pic\"><img src=\"http://www.360doc.cn/images/a1.png?t=2016032801\" class=\"pic2\"/></span><span class=\"mip-360doc-script-pic\"><img src=\"http://www.360doc.cn/images/a2.png?t=2016032801\"  class=\"pic2\"/></span>");
        var index = 1;
        var $_picn = $(".mip-360doc-script-pic").length;
        if ($_picn > 1) {
            $(".mip-360doc-script-pic").eq(0).css("display", "inline").siblings(".mip-360doc-script-pic").hide();
        }
        $(".mip-360doc-script-box960").css("display", "");
        setone();       
    };

    //第三方分享
    function share() {
        if ($(".mip-360doc-script-headejbox").css("display") == "none" || $(".mip-360doc-script-headejbox").css("display") == "") {
            $(".mip-360doc-script-headejbox").show();
            $(".mip-360doc-script-share-bar").css("display", "");
            $(".mip-360doc-script-backgroundgrey").css("display", "block");
            $(".mip-360doc-script-xt1").hide();
            $(".mip-360doc-script-boxtop").hide();
        }
        else {
            $(".mip-360doc-script-headejbox").hide();
            $(".mip-360doc-script-share-bar").hide();
            $(".backgroundgrey").hide();
            $(".mip-360doc-script-xt1").show();
            $(".mip-360doc-script-boxtop").hide();
        }
    }
    //广告轮播
    function setone() {
      var t=  setTimeout(function () {
          show(1);
          clearTimeout(t);
            settwo();
        }, 3000);
    }
    //广告轮播
    function settwo() {
       var t =  setTimeout(function () {
            show(0);
            clearTimeout(t);
            setone();
        }, 4000);
    }
    function show(index) {
        $(".mip-360doc-script-pic").eq(index).css("display", "inline").siblings(".mip-360doc-script-pic").css("display", "none");
    }
    //获取评论数
    function getRefNum() {
        var artid = getID();
        if (artid == "")
            return;

      
        $.ajax({
            type: 'POST',
            url: 'https://transfer.360doc.cn/ajax/Handler.ashx',
            data: "id=" + artid,
            success: function (data) {
                var useridref = data.split("|");
                if (useridref[1] != null && useridref[1] != "") {
                    $(".mip-360doc-script-refnum").html(useridref[1]);
                }
                else {
                    $(".mip-360doc-script-refnum").html('0');
                }            
                $(".mip-360doc-script-xh1").html("献花(" + useridref[3] + ")");
            },
            error: function () {}
        })

    }
    //获取文章id
    function getID() {
        var url = $(".mip-360doc-script-p_header_sc").attr('href');
        
        if (url.indexOf("360doc") < 0)
            return "";
        var index = url.indexOf("artid=");
        if (index <= 0)
            return "";
        var index2 = url.indexOf("&", index);
        if (index2 <= 0)
            return "";  
        var artid = url.substr(index + 6, index2 - index - 6);

        return artid;
    }

    //关闭遮罩层
    function closeartnew() {
        $(".mip-360doc-script-box960").hide();
    }
    if (navigator.userAgent.toLowerCase().indexOf("ucbrowser") > -1) {

        $(".mip-360doc-script-p_header_nav2").width("69%");
    }

    //关闭分享层
    function closeceng() {
        $(".mip-360doc-script-headejbox").hide();
        $(".mip-360doc-script-backgroundgrey").hide();
        $(".mip-360doc-script-xt1").show();
        $(".mip-360doc-script-boxtop").hide();
    }

    //分享到微信地址
    function wxshare() {
        $(".mip-360doc-script-boxtop").show();
        $(".mip-360doc-script-share-bar").hide();
    }   
        
    return customElem;
});

