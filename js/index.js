//抽奖人员名单
var allPerson = "囧;林敏;钟思彦;严惠涛;文一帆;陈升;洪城江;叶先生;谢伟;炘渊;邓逸诚;徐孟晗;张洪银;孟帅;廖豪兴;马曦丽;陈燕玲;秦鑫炎;江碧莹;林志杰;陈鹏莉;郑佳欣;吴欣洋;陈丽敏;贝多芬;陈晓琳;姜开;梁志刚;苏;嚴;陈喆涵;Jane;谭颖诗;潘豪辉;翁娟燕;钟钰铟;陈星媛;陈忠兴;张丙涛;马思怡;李海森;吴德权;王炳宇;杨键宇;方耿帆;张桂滨;文沄;Dobriq Huang;Wang Diyu;鱼丸;严浩儿;黎泽楷;刘阳;初延泽;俞斌;鹿诚龙;陈震磊;朱飞静;蔡朝东;董链梅;胡家宁;陈敏骏;周民帅;陈宗力;李福祥;石晓薇;卢锴鸿;梁智鹏;向少奕;田孟秋;黄琳;杨一诺;何女士;陈廷峰;周龙华;邹骁盛;蓝凯慧;seven;潘政峰;赵昕;Owen;谈剑;余波;康林;桃小萌;丘成志;张阳;鹏哥;李秋晓;袁进;印木之;杨健辉;谢家炜;齐声;Aidan;詹瑞璋;郑伟;琪楂丁丁;11;陈嘉琪;李绍兴;李恒辉;C27;Andy;罗恒;樊智勇;黄越;吴志洪;Baal;吴显衡;廖煜嵘;李彬;谭凯阳;陈江峰;李权;苏睿霖;WinkeyWong;陆旸;洪镇;张秋龙;郭志军;奥德彪;叶增健;Yang Liu;和生;潘乾;何宏涛;安静;XY;吴;孔;何加一;王宇;李奎;陈春喜;林海;代宪层;银。;何志仁;陈博钊;智勇;黄昱;Jacky Cai;唐源;唐心儿;苏泽恩;冯茗楷;侯先生;graveyard;王一乔;Leo;邓豪;JaronTam;Tiffany Sun ;李元;马泽敏;王浩洋;Joly";
//领导人员名单
var leaderArr = [];
//未中奖人员名单
var remainPerson = allPerson.toString().split(";");
console.log('length', remainPerson.length)
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
            $("#txtNum").attr("placeholder", "输入中奖人数");
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
