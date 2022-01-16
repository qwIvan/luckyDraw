//抽奖人员名单
var allPerson = "156****6929;吴乐;189****7580;王炳宇;高小东;MAN WU;ElisaYazidi;朱汇祺;周泽南;JimmyLiu;叶健毅;徐凯;小麦;黄孟柱;肖俊贤;李满;金鑫淼;陈卓希;Echo;支颀龙;武恒平;陆晖;邓子斌;秦圆圆;杜宏新;陈建荣;赖晓琳;郭良俊;金鑫;杨子瑜;佘雨泽;廖小姐;罗功建;李城;廖海柱;庞子扬;古翠文;冯亮;陈秀茹;罗维樵;Ashley;刘舒友;周锦容;陈嘉文;李汶泽;丘惜银;杨武;黄卓仪;黄德淞;梁峰;mozeny;欧文浩;陈海潮;王磊;林振芳;陈先生;黄嘉琳;沈煜;韦杏仪;张文杰;钟嘉瑶;吕翔桢;杨瓦砾;高子龙;龚德阳;邹志明;贝果贝果;134****6701;郑桂洪;柯富城;霍钠彦;冯小姐;188****7990;朱法安;邓皓天;高东鹏;简智华;刘媛媛;吴一帆;侯先生;黄力澄;冯茗楷;彬;龙玺同;卢锴鸿;罗思源;王钰;Lava;ANNA;陈泓钰;黄金生;黄志;邓飞龙;梁健昆;邝伟鹏;何可帆;肖国强;陈蓝蓝;蔡婕;Jancy;单楚然;李彬;158****1118;李黎明;陈学声;朱华;樊智勇;宁晓健;肖启健;何小姐;谭磊;李放;黄旭辉;黄楚婷;詹瑞璋;李嘉骏;安静;李尚贤;吴昊;Angel;RS;谢小海;志维;刘晓聪;齐瑶;陈玉彬;陈颜;卢小姐;冯跃琦;孟狄;崔明辉;邓民豪;潘宏远;汪桂桢;黄纪智;杨耀武;吴欢;张金宁;潘鲁彤;刘格城;陈华;严黎明;智勇;林艺杰;何熹恒;麦;何先生;吴海鹏;董亚;占鹏伟;谢桂研;林光纪;唐熙;黄春和;刘亮;张颖;黄彩蝶;张瀚;陈润富;谭薪烊;吴毅凡;莫振翰;陈浩贤;黄锐填;谢广嗣;刘   毅;马菀远;黄丽梅;刘满;陈汉钗;李雪梅;邹林;崔入文;朱荣佳;戴景昊;蒋俊彬;肖先生;美美;曾子燕;王汀;丁家明;TerryLam;唐超;麦月克;Neo;黄泽贤;唐松炎;陈晞;谢孟吉;陈锦文;陈俊浩;MrPang;黎智辉;娜星;周靖杰;邬先生;何知勤;Rope;叶增健;姚文斌;蓝天澤;吴松锐;吴志洪;黄越;罗发杰;陈启泽;谢小姐;银。;磊戈;胡磊;pinna;张志坚;高司捷;谢安琪;袁杰昀;曾晓帆;陈建辉;吴兆麟;晏玮;何加一;杜壁奇;袁嘉祺;曾蓓慧;许生;李嘉雄;梁炳豪;缪家成;兔子;冯锵健;strawleave;Hlynford;折耳;刘澳秋;陈泓烨;张伟龙";
//领导人员名单
var leaderArr = [];
//未中奖人员名单
var remainPerson = allPerson.toString().split(";");
//中奖人员名单
var luckyMan = [];
var timer;//定时器
var times = 1;//抽奖次数,如果不是第一次，不加粗显示领导姓名
$(function () {
    iconAnimation();
    //开始抽奖
    $("#btnStart").on("click", function () {
        //判断是开始还是结束
        if ($("#btnStart").text() === "开始") {
            if (!$("#txtNum").val()) {
                showDialog("请输入中奖人数");
                return false;
            }
            if ($("#txtNum").val() > 49) {
                showDialog("一次最多只能输入49人");
                return false;
            }
            if ($("#txtNum").val() > remainPerson.length) {
                showDialog("当前抽奖人数大于奖池总人数<br>当前抽奖人数：<b>" + $("#txtNum").val() + "</b>人,奖池人数：<b>" + remainPerson.length + "</b>人");
                return false;
            }
            $("#result").fadeOut();
            //显示动画框，隐藏中奖框
            $("#luckyDrawing").show().next().addClass("hide");
            move();
            $("#btnStart").text("停止");
            $("#bgLuckyDrawEnd").removeClass("bg");
        }
        else {
            $("#btnStart").text("开始");//设置按钮文本为开始
            var luckyDrawNum = $("#txtNum").val();
            startLuckDraw();//抽奖开始

            $("#luckyDrawing").fadeOut();
            clearInterval(timer);//停止输入框动画展示
            $("#luckyDrawing").val(luckyMan[luckyMan.length - 1]);//输入框显示最后一个中奖名字
            $("#result").fadeIn().find("div").removeClass().addClass("p" + luckyDrawNum);//隐藏输入框，显示中奖框
            $("#bgLuckyDrawEnd").addClass("bg");//添加中奖背景光辉
            $("#txtNum").attr("placeholder", "输入中奖人数(" + remainPerson.length + ")");
        }
    });

    $("#btnReset").on("click", function () {
        //确认重置对话框
        var confirmReset = false;
        showConfirm("确认重置吗？所有已中奖的人会重新回到抽奖池！", function () {
            //熏置未中奖人员名单
            remainPerson = allPerson.toString().split(";");
            //中奖人数框置空
            $("#txtNum").val("").attr("placeholder", "请输入中奖人数");
            $("#showName").val("");
            //隐藏中奖名单,然后显示抽奖框
            $("#result").fadeOut();//.prev().fadeIn()
            $("#bgLuckyDrawEnd").removeClass("bg");//移除背景光辉
            times++;
            console.log(times);

        });
    });
});

//抽奖主程序
function startLuckDraw() {
    //抽奖人数
    var luckyDrawNum = $("#txtNum").val();
    if (luckyDrawNum > remainPerson.length) {
        alert("抽奖人数大于奖池人数！请修改人数。或者点重置开始将新一轮抽奖！");
        return false;
    }
    //随机中奖人
    var randomPerson = getRandomArrayElements(remainPerson, luckyDrawNum);
    var tempHtml = "";
    $.each(randomPerson, function (i, person) {
        if (leaderArr.indexOf(person) > -1 && times == 1) {
            tempHtml += "<span><b>" + person + "</b></span>";
        }
        else {
            tempHtml += "<span>" + person + "</span>";
        }
    });
    $("#result>div").html(tempHtml);
    //剩余人数剔除已中奖名单
    remainPerson = remainPerson.delete(randomPerson);
    //中奖人员
    luckyMan = luckyMan.concat(randomPerson);
    //设置抽奖人数框数字为空
    $("#txtNum").val("");
}

//参考这篇文章：http://www.html-js.com/article/JS-rookie-rookie-learned-to-fly-in-a-moving-frame-beating-figures
//跳动的数字
function move() {
    var $showName = $("#showName"); //显示内容的input的ID
    var interTime = 30;//设置间隔时间
    timer = setInterval(function () {
        var i = GetRandomNum(0, remainPerson.length);
        $showName.val(remainPerson[i]);//输入框赋值
    }, interTime);
}

//顶上的小图标，随机动画
function iconAnimation() {
    var interTime = 200;//设置间隔时间
    var $icon = $("#iconDiv>span");
    var arrAnimatoin = ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "wobble", "tada"];
    var timer2 = setInterval(function () {
        var i = GetRandomNum(0, $icon.length);
        var j = GetRandomNum(0, arrAnimatoin.length);
        //console.log("i:" + i + ",j:" + j);
        $($icon[i]).removeClass().stop().addClass("animated " + arrAnimatoin[j]);//输入框赋值
    }, interTime);

}
